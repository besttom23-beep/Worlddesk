import {readFile,writeFile,rename} from 'node:fs/promises';
import {parseFeed,parseXinhuaIndex,combineResults} from './news-core.mjs';
const root=new URL('../',import.meta.url),file=new URL('public/data/news.json',root);
const feeds=JSON.parse(await readFile(new URL('config/feeds.json',root),'utf8'));
let previous={items:[],sources:[]};try{previous=JSON.parse(await readFile(file,'utf8'));}catch{}
async function getSource(source){
  for(let attempt=0;attempt<2;attempt++){
    try{const response=await fetch(source.url,{headers:{'User-Agent':'TheWorldDesk/1.0 (noncommercial headline reader)','Accept':'application/atom+xml,application/rss+xml,application/xml,text/xml,text/html'},signal:AbortSignal.timeout(18000)});if(!response.ok)throw Error(`HTTP ${response.status}`);const text=await response.text();if(text.length>5*1024*1024)throw Error('Response too large');const items=source.kind==='xinhua-index'?parseXinhuaIndex(text,source):parseFeed(text,source);if(!items.length)throw Error('No recent dated items');console.log(`${source.name}: ${items.length} recent headlines`);return{source,items};}
    catch(error){if(attempt===1){const message=error.cause?.code||error.message;console.warn(`${source.name}: ${message}; keeping eligible saved headlines`);return{source,error:message};}}
  }
}
const results=await Promise.all(feeds.map(getSource));
const data=combineResults(results,previous);
const temp=new URL('public/data/news.pending.json',root);
await writeFile(temp,JSON.stringify(data,null,2)+'\n','utf8');await rename(temp,file);
console.log(`${data.items.length} headlines; ${data.sources.filter(s=>s.ok).length}/${feeds.length} sources updated.`);
if(!data.items.length)process.exitCode=1;
