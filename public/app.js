import {reflect,formatResult} from './logic.mjs';
const $=id=>document.getElementById(id);
let current=null;
function invalidate(){current=null;$('result').hidden=true;$('empty-result').hidden=false;$('copy-status').textContent='';}
$('blocker').addEventListener('input',()=>{$('count').textContent=`${$('blocker').value.length} / 500`;$('error').hidden=true;$('blocker').removeAttribute('aria-invalid');invalidate();});
$('reflect-form').addEventListener('change',invalidate);
$('example').addEventListener('click',()=>{$('blocker').value='企画の案が3つあって、どれを進めるか決められなかった。';$('blocker').dispatchEvent(new Event('input'));$('blocker').focus();});
$('reflect-form').addEventListener('submit',e=>{e.preventDefault();try{const f=new FormData(e.currentTarget);current=reflect({domain:f.get('domain'),text:f.get('blocker'),reason:f.get('reason')});for(const k of ['summary','action','boundary','quote','basis'])$(k).textContent=current[k];$('domain-label').textContent=current.domain;$('empty-result').hidden=true;$('result').hidden=false;$('error').hidden=true;$('blocker').removeAttribute('aria-invalid');document.querySelector('.result-title').focus({preventScroll:true});if(matchMedia('(max-width:720px)').matches)$('result').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});}catch(err){invalidate();$('error').textContent=err.message;$('error').hidden=false;$('blocker').setAttribute('aria-invalid','true');$('blocker').focus();}});
$('copy').addEventListener('click',async()=>{if(!current)return;try{await navigator.clipboard.writeText(formatResult(current));$('copy-status').textContent='結果をコピーしました。';}catch{$('copy-status').textContent='コピーできませんでした。表示された結果を選択してコピーしてください。';}});
$('reset').addEventListener('click',()=>{$('reflect-form').reset();$('blocker').dispatchEvent(new Event('input'));$('blocker').focus();});
addEventListener('pageshow',()=>{$('reflect-form').reset();$('blocker').dispatchEvent(new Event('input'));});
