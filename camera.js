"use strict";
function hud(){const T=teams;$('#hs').textContent=T[0].score;$('#as').textContent=T[1].score;const m=Math.floor((M.half-1)*45+M.t/M.hl*45);$('#tm').textContent=Math.min(m,M.half*45)+"'";
 if(ctrl){$('#pn').textContent=ctrl.name+' · '+ctrl.role+' · '+ctrl.ovr;$('#st').style.width=ctrl.st+'%'}}
function render(dt){const b=ball,k=Math.max(1,1.5/cam.aspect)*(S.cam?1:.78),tz=Math.abs(b.x)>32?.85:1;zm+=(tz-zm)*Math.min(1,dt*1.5);cx+=(b.x*.85-cx)*Math.min(1,dt*3.5);
 ax+=(teams[0].side-ax)*Math.min(1,dt*1.5);cam.position.set(cx,19*k*zm,31*k*zm+b.z*.25);cam.lookAt(cx,0,b.z*.4);light.position.set(cx+20,50,25);light.target.position.set(cx,0,0);light.target.updateMatrixWorld();
 crowd.position.y=M.st=='goal'?Math.abs(Math.sin(clk*9))*.25:0;R.render(scene,cam)}
