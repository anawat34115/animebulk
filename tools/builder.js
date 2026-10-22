// AnimeBulk article builder v2 — paste into a logged-in tab on the site. Defines window.AB.
// build(a): a = {id?, slug, title, kicker, lead, meta, cat:'workouts'|'nutrition'|'blog'|'gear', catId, crumb, html,
//   gear:[[name,desc]], gearKicker?, gearTitle?, healthText?, related:[ids], cover:mediaId, excerpt, status}
// html supports: p, h2, h3, ul/ol, table, blockquote (note box), <div data-tip="TIP" data-title="...">...</div>
window.ABinit = async () => {
const NONCE = (window.wpApiSettings && wpApiSettings.nonce) || await fetch('/wp-admin/admin-ajax.php?action=rest-nonce',{credentials:'same-origin'}).then(r=>r.text());
const H = {'Content-Type':'application/json','X-WP-Nonce':NONCE};
const api = (p,o={}) => fetch('/wp-json/wp/v2/'+p,{credentials:'same-origin',headers:H,...o}).then(async r=>({s:r.status,j:await r.json().catch(()=>null)}));
// layout source: published English Toji post (55)
const tplPost = (await api('posts/55?context=edit')).j;
const T = JSON.parse(tplPost.meta._elementor_data);
const W = c => { const out=[]; (function w(a){for(const el of a){ if(el.elType==='widget') out.push(el); if(el.elements) w(el.elements);} })([c]); return out; };
const find = (arr,id) => { let f=null; (function w(a){for(const el of a){ if(el.id===id){f=el;return;} if(el.elements) w(el.elements); if(f) return;}})(arr); return f; };
const clone = o => JSON.parse(JSON.stringify(o));
const rid = () => Math.floor(Math.random()*0xfffffff).toString(16).padStart(7,'0').slice(-7);
const reid = el => { el.id = rid(); (el.elements||[]).forEach(reid); return el; };
// prototypes from post 55: [header, hero, body, readnext, cta, footer]
const byText = (root, re, type) => W(root).find(w => (!type||w.widgetType===type) && re.test((w.settings.title||w.settings.editor||'').replace(/<[^>]+>/g,'')));
const body55 = T[2];
let col55 = body55; while(col55.elements && col55.elements.length===1 && col55.elements[0].elType==='container') col55=col55.elements[0];
const kids = col55.elements;
const firstOf = pred => clone(kids.find(pred));
const proto = {
  header: clone(T[0]), heroSec: clone(T[1]), bodySec: clone(T[2]), readSec: clone(T[3]), cta: clone(T[4]), footer: clone(T[5]),
  p: firstOf(e=>e.widgetType==='text-editor'),
  h2: firstOf(e=>e.widgetType==='heading' && e.settings.header_size!=='h3' && !/Frequently/.test(e.settings.title)),
  h3: firstOf(e=>e.widgetType==='heading' && e.settings.header_size==='h3'),
  tip: firstOf(e=>e.elType==='container' && W(e).length===3),
  note: firstOf(e=>e.elType==='container' && W(e).length===1),
  gearSec: firstOf(e=>e.elType==='container' && /REQUIRED GEAR/.test(JSON.stringify(e))),
  health: clone(kids[kids.length-1])
};
const UL = 'margin:0;padding-left:24px', LI = 'margin-bottom:10px;padding-left:4px';
const WRAP = 'overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid #2C2C33;border-radius:8px';
const TB = 'width:100%;border-collapse:collapse;margin:0;border:0';
const TH = "text-align:left;padding:12px 16px;background:#1F1F24;color:#F5F5F5;font-family:'Kanit',sans-serif;font-weight:600;font-size:15px;border-bottom:2px solid #FF2D2D;white-space:nowrap";
const TD = (bg,first) => `padding:12px 16px;background:${bg};color:${first?'#F5F5F5':'#D9D9DD'};border-bottom:1px solid #2C2C33;font-size:15px;line-height:1.6;vertical-align:top;${first?'min-width:180px':''}`;
function styleList(el){ const tag=el.tagName.toLowerCase(); const items=[...el.children].filter(c=>c.tagName==='LI').map(li=>`<li style="${LI}">${li.innerHTML}</li>`).join(''); return `<${tag} style="${UL}">${items}</${tag}>`; }
function styleTable(el){ const rows=[...el.querySelectorAll('tr')]; if(!rows.length) return el.outerHTML; const headRow = el.querySelector('thead tr') || rows[0];
  const head = [...headRow.children].map(c=>`<th style="${TH}">${c.innerHTML}</th>`).join('');
  const body = rows.filter(r=>r!==headRow).map((r,i)=>{ const bg=i%2?'#0B0B0F':'#16161B'; return '<tr>'+[...r.children].map((c,j)=>`<td style="${TD(bg,j===0)}">${c.innerHTML}</td>`).join('')+'</tr>'; }).join('');
  return `<div style="${WRAP}"><table style="${TB}"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`; }
const setText = (w,v) => { if (w.widgetType==='heading') w.settings.title=v; else if (w.widgetType==='text-editor') w.settings.editor=v; else if (w.widgetType==='button') w.settings.text=v; return w; };
function bodyWidgets(html){ const doc = new DOMParser().parseFromString('<div id=r>'+html+'</div>','text/html'); const out=[]; let pbuf=[];
  const flush=()=>{ if(pbuf.length){ out.push(setText(reid(clone(proto.p)), pbuf.join(''))); pbuf=[]; } };
  for (const el of doc.getElementById('r').children){ const t=el.tagName.toLowerCase();
    if (t==='p') { pbuf.push(el.outerHTML.replace(/^<p[^>]*>/,'<p>')); continue; } flush();
    if (t==='h2') out.push(setText(reid(clone(proto.h2)), el.innerHTML));
    else if (t==='h3') out.push(setText(reid(clone(proto.h3)), el.innerHTML));
    else if (t==='ul'||t==='ol') out.push(setText(reid(clone(proto.p)), styleList(el)));
    else if (t==='table') out.push(setText(reid(clone(proto.p)), styleTable(el)));
    else if (t==='blockquote' || el.hasAttribute('data-note')) { const n=reid(clone(proto.note)); setText(W(n)[0], el.innerHTML); out.push(n); }
    else if (el.hasAttribute('data-tip')) { const n=reid(clone(proto.tip)); const ws=W(n); setText(ws[0], el.getAttribute('data-tip')||'TIP'); setText(ws[1], el.getAttribute('data-title')||''); setText(ws[2], el.innerHTML); out.push(n); }
    else out.push(setText(reid(clone(proto.p)), el.outerHTML)); }
  flush(); return out; }
const catOf = rp => rp.categories.includes(7)?'workouts':rp.categories.includes(8)?'nutrition':rp.categories.includes(38)?'gear':'blog';
const KK={55:'WORKOUT · 01',56:'WORKOUT · 02',57:'WORKOUT · 03',58:'WORKOUT · 04',59:'WORKOUT · 05',216:'WORKOUT · 06',217:'WORKOUT · 07',218:'WORKOUT · 08',219:'WORKOUT · 09',220:'WORKOUT · 10',221:'WORKOUT · 11',60:'PROGRAM',61:'GEAR',62:'NUTRITION · 01',63:'NUTRITION · 02',64:'NUTRITION · 03',65:'BLOG · TIER LIST',186:'BLOG · GUIDE',187:'BLOG · NUTRITION',188:'BLOG · SCIENCE',299:'GEAR GUIDE · 01',300:'GEAR GUIDE · 02',301:'GEAR GUIDE · 03',302:'BLACK FRIDAY 2026'};
async function mediaUrl(id){ if(!id) return null; const m=(await api('media/'+id)).j; return m && m.source_url; }
async function readNext(related){
  const rs=reid(clone(proto.readSec)); const rw=W(rs); setText(rw[0],'KEEP LEVELING'); setText(rw[1],'Read Next');
  const cards=[]; (function w(c){ for(const e of (c.elements||[])){ if(e.settings && e.settings.link && e.elType==='container') cards.push(e); else w(e);} })(rs);
  const parent=(function fp(c){ for(const e of (c.elements||[])){ if(cards.includes(e)) return c; const r=fp(e); if(r) return r;} return null; })(rs);
  const cp=clone(cards[0]); parent.elements=parent.elements.filter(e=>!cards.includes(e));
  for (const pid of related.slice(0,3)){ const rp=(await api('posts/'+pid+'?context=edit')).j; if(!rp||!rp.id) continue;
    const c=reid(clone(cp)); c.settings.link.url='/'+catOf(rp)+'/'+rp.slug+'/'; const ws=W(c);
    const im=ws.find(w=>w.widgetType==='image'); const k=ws.filter(w=>w.widgetType!=='image');
    if (rp.featured_media) im.settings.image={url:await mediaUrl(rp.featured_media), id:rp.featured_media, source:'library'};
    setText(k[0], KK[pid] || catOf(rp).toUpperCase()); setText(k[1], rp.title.raw); setText(k[2], rp.excerpt.raw.replace(/<[^>]+>/g,'').trim()); setText(k[3],'Read more →'); parent.elements.push(c); }
  return rs; }
async function build(a){
  const doc=[reid(clone(proto.header))];
  const hero=reid(clone(proto.heroSec)); const hw=W(hero);
  setText(hw[0], `<a href="/" style="color:#A6A6AE">Home</a> / <a href="/${a.cat}/" style="color:#A6A6AE">${a.crumb}</a>`);
  setText(hw[1], a.kicker); setText(hw[2], a.title); setText(hw[3], a.lead); setText(hw[4], a.meta);
  const img = hw.find(w=>w.widgetType==='image');
  if (a.cover) img.settings.image = {url: await mediaUrl(a.cover), id: a.cover, source:'library'};
  else (function rm(c){ c.elements = (c.elements||[]).filter(e=>e.widgetType!=='image'); c.elements.forEach(rm); })(hero);
  doc.push(hero);
  const body=reid(clone(proto.bodySec)); let col=body; while(col.elements && col.elements.length===1 && col.elements[0].elType==='container') col=col.elements[0];
  col.elements = bodyWidgets(a.html);
  if (a.gear && a.gear.length){ const g=reid(clone(proto.gearSec)); const gw=W(g);
    setText(gw[0],a.gearKicker||'REQUIRED GEAR TO UNLOCK THIS ROUTINE'); setText(gw[1], a.gearTitle||'Gear Used in This Routine');
    const rows=[]; (function w(c){ for(const e of (c.elements||[])){ if(e.elType==='container' && (e.elements||[]).some(x=>x.elType==='container' && W(x).length===2)) rows.push(e); else w(e);} })(g);
    const parent = (function fp(c){ for(const e of (c.elements||[])){ if(rows.includes(e)) return c; const r=fp(e); if(r) return r;} return null; })(g);
    const rowProto = clone(rows[0]); const insertAt = parent.elements.indexOf(rows[0]); parent.elements = parent.elements.filter(e=>!rows.includes(e));
    parent.elements.splice(insertAt,0,...a.gear.map(([n,dsc])=>{ const r=reid(clone(rowProto)); const ws=W(r); setText(ws[0],n); setText(ws[1],dsc); if(ws[2]) setText(ws[2],'Store links coming soon'); return r; }));
    col.elements.push(g); }
  col.elements.push(setText(reid(clone(proto.health)), a.healthText||'The workouts and numbers in this article are general information for healthy adults, not medical advice. Talk to a doctor before starting if you have a medical condition or injury, and stop if you feel sharp pain, dizziness or chest tightness.'));
  doc.push(body);
  if (a.related && a.related.length) doc.push(await readNext(a.related));
  doc.push(reid(clone(proto.cta))); doc.push(reid(clone(proto.footer)));
  const payload = {title:a.title, slug:a.slug, excerpt:a.excerpt||a.lead, content:`<p>${a.lead}</p>\n${a.html}`, status:a.status||'publish', categories:[a.catId], template:'elementor_canvas', comment_status:'closed', ping_status:'closed',
    meta:{_elementor_data:JSON.stringify(doc), _elementor_edit_mode:'builder', _elementor_template_type:'wp-post', _elementor_page_settings: tplPost.meta._elementor_page_settings}};
  if (a.cover) payload.featured_media = a.cover;
  const r = a.id ? await api('posts/'+a.id,{method:'POST',body:JSON.stringify(payload)}) : await api('posts',{method:'POST',body:JSON.stringify(payload)});
  return [r.s, r.j && (r.j.id||r.j.code), r.j && r.j.slug, r.j && r.j.status];
}
// insert extra html before the heading whose text matches `before` (default: the FAQ heading) in an existing post
async function insert(id, html, before=/Frequently Asked Questions/){
  const p=(await api('posts/'+id+'?context=edit')).j; const d=JSON.parse(p.meta._elementor_data);
  let col=d[2]; while(col.elements && col.elements.length===1 && col.elements[0].elType==='container') col=col.elements[0];
  let idx=col.elements.findIndex(e=>e.widgetType==='heading' && before.test((e.settings.title||'').replace(/<[^>]+>/g,'')));
  if (idx<0) idx=col.elements.findIndex(e=>e.elType==='container' && /REQUIRED GEAR|WHAT YOU NEED|WHAT WE|TOOLS THAT|THE STARTER|OUR BLACK/.test(JSON.stringify(e)));
  if (idx<0) idx=col.elements.length-1;
  col.elements.splice(idx,0,...bodyWidgets(html));
  let content=p.content.raw; const ci=content.search(/<h2>Frequently Asked Questions<\/h2>/); content = ci>=0 ? content.slice(0,ci)+html+'\n'+content.slice(ci) : content+'\n'+html;
  const r=await api('posts/'+id,{method:'POST',body:JSON.stringify({content, meta:{_elementor_data:JSON.stringify(d)}})});
  return r.s; }
async function clearAll(){ const h=await fetch('/wp-admin/admin.php?page=elementor-tools').then(r=>r.text()); const dd=new DOMParser().parseFromString(h,'text/html');
  const b=[...dd.querySelectorAll('button,a')].find(b=>/Clear Files/i.test(b.textContent)); const nonce=b&&(b.dataset.nonce||'');
  const r1=await fetch('/wp-admin/admin-ajax.php',{method:'POST',body:new URLSearchParams({action:'elementor_clear_cache',_nonce:nonce})}).then(r=>r.text());
  const a=[...dd.querySelectorAll('#wpadminbar a')].find(a=>/purge_all/.test(a.getAttribute('href')||'')); let r2='-'; if(a) r2=(await fetch(a.getAttribute('href').replace(/&amp;/g,'&'))).status;
  return 'elementor:'+r1.slice(0,30)+' litespeed:'+r2; }
window.AB = {api, build, insert, readNext, bodyWidgets, clearAll, proto, W, find, H, KK, catOf};
return 'AB ready';
};
