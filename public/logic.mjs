export const reasons = ['決められない','情報不足','時間不足','相手待ち','手を広げすぎ','その他'];
const plans = {
  '決められない': ['選ぶための基準が、まだひとつに絞れていないのかもしれません。','今ある選択肢を比べる「いちばん大切な基準」を、ひとつだけ書く。','選択肢は増やさず、まず比べる軸だけ決めましょう。'],
  '情報不足': ['先へ進むために、確かめたいことが残っていそうです。','次に進むために必要な「確認したい質問」を、ひとつだけ書く。','調べる範囲は、その質問に答えられるところまで。'],
  '時間不足': ['取りかかるための時間を、確保しにくかったのかもしれません。','この件だけに使う10分を、来週の予定にひと枠決める。','その10分で全部終わらせる必要はありません。'],
  '相手待ち': ['自分だけでは動かせない、相手の返事や確認が残っていそうです。','相手に確認したいことを、送信前の一文にまとめる。','まず下書きまで。送るかどうかは状況に合わせて決めましょう。'],
  '手を広げすぎ': ['進めたいことが重なって、入口が見えにくくなっていそうです。','この件の中から、来週最初に触るものをひとつだけ選んで書く。','残りは今ここで広げず、最初のひとつに戻りましょう。'],
  'その他': ['まだはっきりしない止まりポイントを、言葉にできました。','書いた場面の中で「自分で動かせる部分」を、ひとつだけ書く。','原因をすべて説明できなくても大丈夫。ひとつ見つかれば十分です。']
};
const signals = [
  ['相手待ち', /返事|返信|返答|承認待ち|確認待ち|連絡待ち|相手待ち/],
  ['情報不足', /情報不足|情報が足り|分からな|わからな|調べ|不明|知らな/],
  ['時間不足', /時間がな|時間不足|時間が足り|忙し|時間を取れ|時間が取れ/],
  ['手を広げすぎ', /広げすぎ|あれも|これも|多すぎ|抱えすぎ|同時に|手一杯/],
  ['決められない', /決められ|決まら|迷っ|迷う|選べな|選べず/]
];
export function reflect({domain='仕事', text='', reason=''}={}) {
  const clean=String(text).trim();
  if(!clean) throw new Error('止まっていた場面を、ひとつ書いてください。');
  if(clean.length>500) throw new Error('500文字以内で、ひとつの場面に絞ってください。');
  if(!['仕事','お金','人間関係','その他'].includes(domain)) throw new Error('分野を選び直してください。');
  if(reason && !reasons.includes(reason)) throw new Error('補助選択を選び直してください。');
  const matches=signals.filter(([,pattern])=>pattern.test(clean));
  const selected=reason||(matches.length===1?matches[0][0]:'その他');
  const [summary,action,boundary]=plans[selected];
  const excerpt=Array.from(clean); const quote=excerpt.length>90?excerpt.slice(0,90).join('')+'…':clean;
  return {domain,reason:selected,summary,action,boundary,quote,basis:reason?`「${reason}」の選択をもとに整理` : matches.length===1?`入力のキーワードから「${selected}」の整理案を表示`:'原因を決めつけず、場面の整理から始めます'};
}
export function formatResult(r){return `止まりポイント整理｜${r.domain}\n\n書いた場面：${r.quote}\n${r.summary}\n\n次の一手：${r.action}\n\n${r.boundary}`;}
