export const TOPICS={politics:'Politics',conflict:'Conflict',ai:'AI & tech',business:'Business',world:'World'};
export function safeUrl(value){try{const u=new URL(value);return u.protocol==='https:'?u.href:null;}catch{return null;}}
export function escapeHtml(value=''){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function validItems(items){if(!Array.isArray(items))return[];return items.filter(x=>x&&typeof x.title==='string'&&x.title.trim()&&safeUrl(x.url)&&typeof x.source==='string'&&Array.isArray(x.topics)).map(x=>({...x,topics:x.topics.filter(t=>Object.hasOwn(TOPICS,t))}));}
export function filterItems(items,topic){return topic==='all'?items:items.filter(x=>x.topics.includes(topic));}
export function articleDate(item){const date=item.publishedAt||item.publishedDate;return date&&Number.isFinite(Date.parse(date))?new Date(date):null;}
export function formatTime(item,now=Date.now()){const date=articleDate(item);if(!date)return'Date not supplied';if(!item.publishedAt)return date.toLocaleDateString('en-GB',{day:'numeric',month:'short',timeZone:'UTC'});const m=Math.max(0,Math.floor((now-date)/60000));if(m<1)return'Just published';if(m<60)return`${m}m ago`;if(m<1440)return`${Math.floor(m/60)}h ago`;return date.toLocaleDateString('en-GB',{day:'numeric',month:'short'});}
export function editionState(data,now=Date.now()){const time=Date.parse(data?.generatedAt);if(!Number.isFinite(time))return'empty';return now-time>24*60*60*1000?'stale':'current';}
