"use strict";
// ---------- input ----------
const K={},A={sprint:0,hold:0,jx:0,jy:0};
const KM={KeyJ:'pass',KeyL:'thru',Space:'tackle',KeyE:'switch',KeyK:'shoot'};
addEventListener('keydown',e=>{if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();if(e.repeat)return;K[e.code]=1;if(KM[e.code])act(KM[e.code],1)});
addEventListener('keyup',e=>{K[e.code]=0;if(e.code=='KeyK')act('shoot',0)});
document.querySelectorAll('.tb').forEach(b=>{const a=b.dataset.a;b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);a=='sprint'?A.sprint=1:act(a,1)});const up=()=>{a=='sprint'?A.sprint=0:a=='shoot'&&act('shoot',0)};b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up)});
const jy=$('#joy'),kn=$('#knob');let jid=null;
function jm(e){const r=jy.getBoundingClientRect(),x=(e.clientX-r.left-65)/50,y=(e.clientY-r.top-65)/50,l=Math.hypot(x,y),k=l>1?1/l:1;A.jx=x*k;A.jy=-y*k;kn.style.left=40+A.jx*40+'px';kn.style.top=40-A.jy*40+'px'}
const jz=$('#jz');jz.addEventListener('pointerdown',e=>{jid=e.pointerId;jz.setPointerCapture(jid);jy.style.left=(e.clientX-65)+'px';jy.style.top=(e.clientY-65)+'px';jy.style.bottom='auto';jm(e)});jz.addEventListener('pointermove',e=>{if(e.pointerId==jid)jm(e)});
const jr=e=>{jid=null;A.jx=A.jy=0;kn.style.left=kn.style.top='40px';jy.style.left='4vw';jy.style.top='auto';jy.style.bottom='6vh'};jz.addEventListener('pointerup',jr);jz.addEventListener('pointercancel',jr);
function inp(){let x=A.jx+(K.KeyD||K.ArrowRight?1:0)-(K.KeyA||K.ArrowLeft?1:0),y=A.jy+(K.KeyW||K.ArrowUp?1:0)-(K.KeyS||K.ArrowDown?1:0);const l=Math.hypot(x,y);if(l>1){x/=l;y/=l}return[x,-y,l]}
