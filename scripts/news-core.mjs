import {XMLParser,XMLValidator} from 'fast-xml-parser';
import he from 'he';
import {createHash} from 'node:crypto';
const parser=new XMLParser({ignoreAttributes:false,attributeNamePrefix:'@_',parseTagValue:false,trimValues:true,processEntities:false});
export function plain(value){return he.decode(String(value??'').replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();}
export function httpsUrl(value,base){try{const u=new URL(plain(value),base);if(u.protocol==='http:')u.protocol='https:';return u.protocol==='https:'&&!u.username&&!u.password?u.href:null;}catch{return null;}}
export function classify(title,fallback='world'){
  const t=title.toLowerCase(),tags=[];
  if(/\b(ai|artificial intelligence|openai|deepmind|anthropic|nvidia|chatgpt|robotics|semiconductor|machine learning|technology|tech|cyber|chipmaker|chips)\b/.test(t))tags.push('ai');
  if(/\b(war|conflict|ceasefire|military|missile|troops|airstrike|invasion|gaza|ukraine|nato|nuclear|defen[cs]e|hostages|terrorist|offensive|rebels|army|armed|forces|houthi|hezbollah|hamas|clashes|warfare)\b/.test(t))tags.push('conflict');
  if(/\b(election|president|parliament|diplomac\w*|minister|government|democra\w*|politic\w*|summit|vot(?:e|er|ers|ing)|sanctions|united nations|congress|trump|xi jinping)\b/.test(t))tags.push('politics');
  if(/\b(econom\w*|market\w*|trade|business|inflation|tariff\w*|invest\w*|bank\w*|oil|stocks|finance|financial|export\w*|import\w*|currency|gdp|recession|company|companies|billion|bln)\b/.test(t))tags.push('business');
  return tags.length?tags:[fallback];
}
const array=x=>!x?[]:Array.isArray(x)?x:[x];
function stamp(value){const t=Date.parse(value);return Number.isFinite(t)?new Date(t).toISOString():null;}
export function normalizeArticle(raw,source,now=Date.now()){
  const title=plain(raw.title),url=httpsUrl(raw.url,source.url),publishedAt=stamp(raw.publishedAt),publishedDate=raw.publishedDate||null;
  if(!title||title.length<12||title.length>400||!url)return null;
  const time=Date.parse(publishedAt||publishedDate);if(!Number.isFinite(time)||time>now+3600000||now-time>7*86400000)return null;
  if(/\b(football|soccer|f1|formula one|grand prix|cricket|premier league|horoscope|tennis|nba|world animal day)\b/i.test(title))return null;
  const topics=classify(title,source.fallbackTopic);
  if(topics.length===1&&topics[0]==='world')return null;
  return {id:createHash('sha256').update(url).digest('hex').slice(0,16),title,url,source:source.name,sourceId:source.id,type:source.type||'article',publishedAt,publishedDate,topics};
}
export function parseFeed(xml,source,now=Date.now()){
  if(/<!DOCTYPE|<!ENTITY/i.test(xml))throw Error('Unexpected XML declarations');
  if(XMLValidator.validate(xml)!==true)throw Error('Invalid XML');
  const doc=parser.parse(xml);let raw;
  if(doc.rss?.channel){raw=array(doc.rss.channel.item).map(n=>({title:n.title,url:n.link,publishedAt:n.pubDate||n['dc:date']}));}
  else if(doc.feed){raw=array(doc.feed.entry).map(n=>({title:typeof n.title==='object'?n.title['#text']:n.title,url:array(n.link).find(l=>!l['@_rel']||l['@_rel']==='alternate')?.['@_href'],publishedAt:n.published||n.updated}));}
  else throw Error('Not an RSS or Atom feed');
  return raw.map(n=>normalizeArticle(n,source,now)).filter(Boolean);
}
export function parseXinhuaIndex(html,source,now=Date.now()){
  const results=[],seen=new Set();
  for(const match of html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)){
    const url=httpsUrl(match[1],source.url);if(!url||new URL(url).hostname!=='english.news.cn'||seen.has(url))continue;
    const date=url.match(/\/(20\d{2})(\d{2})(\d{2})\/[^/]+\/c\.html/);if(!date)continue;
    const title=plain(match[2]);if(!title)continue;
    const item=normalizeArticle({title,url,publishedDate:`${date[1]}-${date[2]}-${date[3]}`},source,now);
    if(item){results.push(item);seen.add(url);}
  }
  return results;
}
export function combineResults(results,previous,now=Date.now()){
  const timestamp=new Date(now).toISOString(),statuses=[],pool=[];let successes=0;
  for(const result of results){const {source,items,error}=result,oldStatus=previous.sources?.find(s=>s.id===source.id);const ok=!error&&items?.length>0;if(ok)successes++;
    const retained=ok?items:(previous.items||[]).filter(n=>n.sourceId===source.id&&now-Date.parse(n.publishedAt||n.publishedDate)<7*86400000);
    pool.push(...retained.slice(0,24));statuses.push({id:source.id,name:source.name,url:source.homepage,ok,count:retained.length,lastSuccessfulAt:ok?timestamp:oldStatus?.lastSuccessfulAt||null,error:ok?null:error||'No recent dated items'});
  }
  const seen=new Set();const sorted=pool.sort((a,b)=>Date.parse(b.publishedAt||b.publishedDate)-Date.parse(a.publishedAt||a.publishedDate));
  const items=sorted.filter(n=>{const key=n.title.toLowerCase().replace(/[^a-z0-9]/g,'');if(seen.has(n.url)||seen.has(key))return false;seen.add(n.url);seen.add(key);return true;});
  // Limit adjacent dominance without claiming editorial importance or inventing stories.
  const balanced=[];const rest=[...items];while(rest.length){let index=rest.findIndex(n=>balanced.slice(-2).filter(x=>x.source===n.source).length<2);if(index<0)index=0;balanced.push(...rest.splice(index,1));}
  return {generatedAt:successes?timestamp:previous.generatedAt||null,lastAttemptAt:timestamp,sources:statuses,items:balanced.slice(0,120)};
}
