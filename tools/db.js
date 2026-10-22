// Refresh the Anime Workout Database page (453): rebuild the JSON list from published character workouts.
// Usage (AB loaded): eval(src); await DBREFRESH();
window.DBREFRESH = async function (pageId = 453) {
  const SER = [[/toji|itadori|gojo|sukuna/, 'Jujutsu Kaisen'], [/goku|vegeta|broly/, 'Dragon Ball'], [/saitama|garou/, 'One Punch Man'], [/naruto|rock-lee/, 'Naruto'], [/levi|mikasa|eren/, 'Attack on Titan'], [/baki|yujiro/, 'Baki'], [/zoro|luffy/, 'One Piece'], [/sung-jinwoo/, 'Solo Leveling'], [/tanjiro/, 'Demon Slayer'], [/asta/, 'Black Clover'], [/guts/, 'Berserk'], [/thorfinn/, 'Vinland Saga'], [/deku|bakugo/, 'My Hero Academia'], [/escanor/, 'Seven Deadly Sins'], [/ippo/, 'Hajime no Ippo']];
  const FIX = { toji: 'Beginner to Intermediate', 'sung-jinwoo': 'Beginner', baki: 'Beginner to Intermediate', asta: 'Intermediate', guts: 'Intermediate' };
  const ps = (await AB.api('posts?categories=7&per_page=100&status=publish&context=edit&_fields=id,slug,title,excerpt,link,featured_media,meta')).j;
  const rows = [], media = {};
  for (const p of ps) {
    const raw = p.meta._elementor_data; const d = JSON.parse(raw); const hw = AB.W(d[1]); const kicker = String(hw[1] && hw[1].settings.title || ''); if (!/WORKOUT ·/.test(kicker)) continue;
    const m = raw.match(/min read[^"<]*/); const t = m ? m[0] : ''; let level = ((t.match(/Level:\s*([^·\\]+)/) || [])[1] || '').trim(); const weeks = (t.match(/(\d+)\s*weeks/) || [])[1] || '';
    const fk = Object.keys(FIX).find(k => p.slug.includes(k)); if (!level && fk) level = FIX[fk];
    const eq = new Set(); (function w(a) { for (const e of a) { if (e.elType === 'container') { const ws = AB.W(e); if (ws.length === 3 && ws[2].widgetType === 'heading' && /Amazon|Store links/.test(ws[2].settings.title || '')) { const g = (ws[0].settings.title || ''); if (/dumbbell/i.test(g)) eq.add('Dumbbells'); if (/pull-up bar/i.test(g)) eq.add('Pull-up bar'); if (/bench/i.test(g)) eq.add('Bench'); if (/band/i.test(g)) eq.add('Bands'); if (/rope/i.test(g)) eq.add('Jump rope'); if (/rings/i.test(g)) eq.add('Rings'); if (/ball/i.test(g)) eq.add('Medicine ball'); continue; } } if (e.elements) w(e.elements); } })(d);
    let img = ''; if (p.featured_media) { if (!media[p.featured_media]) { const j = (await AB.api('media/' + p.featured_media + '?_fields=source_url,media_details')).j; const sz = j.media_details && j.media_details.sizes; media[p.featured_media] = ((sz && (sz.medium_large || sz.medium)) || j).source_url; } img = media[p.featured_media].replace(location.origin, ''); }
    rows.push({ n: kicker.replace('WORKOUT · ', ''), t: p.title.raw.replace(/&#8217;/g, "'").replace(/&amp;/g, '&'), u: p.link.replace(location.origin, ''), s: (SER.find(([re]) => re.test(p.slug)) || [0, 'Other'])[1], l: level, w: weeks, eq: [...eq], x: p.excerpt.raw.replace(/<[^>]+>/g, '').trim(), img });
  }
  rows.sort((a, b) => (+a.n || 99) - (+b.n || 99));
  const pg = (await AB.api('pages/' + pageId + '?context=edit')).j; const d = JSON.parse(pg.meta._elementor_data); let ok = 0;
  const series = [...new Set(rows.map(r => r.s))].sort();
  (function w(a) { for (const e of a) { if (e.widgetType === 'html' && /id="abdb"/.test(e.settings.html || '')) { let h = e.settings.html; h = h.replace(/var D=\[[\s\S]*?\];\n/, 'var D=' + JSON.stringify(rows) + ';\n'); h = h.replace(/<select id="fs">[\s\S]*?<\/select>/, '<select id="fs"><option value="">All series</option>' + series.map(s => '<option>' + s + '</option>').join('') + '</select>'); h = h.replace(/<noscript>[\s\S]*?<\/noscript>/, '<noscript>' + rows.map(r => '<p><a href="' + r.u + '">' + r.t + '</a></p>').join('') + '</noscript>'); e.settings.html = h; ok++; } if (e.elements) w(e.elements); } })(d);
  (function w(a) { for (const e of a) { if (e.widgetType === 'heading' || e.widgetType === 'text-editor') { for (const k of ['title', 'editor']) if (e.settings[k]) e.settings[k] = e.settings[k].replace(/Filter \d+ free/, 'Filter ' + rows.length + ' free').replace(/· \d+ programs ·/, '· ' + rows.length + ' programs ·'); } if (e.elements) w(e.elements); } })(d);
  const r = await AB.api('pages/' + pageId, { method: 'POST', body: JSON.stringify({ meta: { _elementor_data: JSON.stringify(d) } }) });
  await fetch('/wp-json/rankmath/v1/updateMeta', { method: 'POST', headers: AB.H, body: JSON.stringify({ objectType: 'post', objectID: pageId, meta: { rank_math_title: 'Anime Workout Database: ' + rows.length + ' Character Plans | ANIMEBULK', rank_math_description: 'Filter ' + rows.length + ' free anime character workouts by series, level and equipment: Goku, Gojo, Saitama, Luffy, Levi, Mikasa and more. Home-friendly plans.' } }) });
  return 'db rows ' + rows.length + ' widget ' + ok + ' save ' + r.s;
};
