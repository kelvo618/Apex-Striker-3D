"use strict";
// ---------- match ----------
function startMatch(me,op,md){
 if(!document.fullscreenElement&&matchMedia('(pointer:coarse)').matches){try{document.documentElement.requestFullscreen().then(()=>screen.orientation.lock('landscape')).catch(()=>{})}catch(e){}}if(!build())return;ac();players=[];owner=null;lastP=null;
 const hk=kit(me,null),ak=kit(op,me),fs=Object.keys(FORM);
 teams=[mkTeam(me,1,true,hk,SV.form),mkTeam(op,-1,false,ak,fs[Math.floor(rnd()*fs.length)])];applyRoster(teams[0]);
 M={st:'restart',half:1,t:0,hl:[60,90,120][S.len],rt:1.5,mode:md,msg:0,mt:0,over:0};
 $('#hn').textContent=TEAMS[me][1]+' ';$('#an').textContent=' '+TEAMS[op][1];$('#hs').textContent=$('#as').textContent='0';
 document.querySelectorAll('.scr').forEach(e=>e.classList.remove('on'));$('#hud').style.display='block';
 const touch=matchMedia('(pointer:coarse)').matches||'ontouchstart' in window;$('#tc').style.display=touch?'block':'none';$('#guide').style.display=touch?'none':'block';setTimeout(()=>$('#guide').style.opacity=0,9000);$('#guide').style.opacity=1;
 kickoff(teams[0]);ambience(true);paused=false;last=performance.now();if(!M.loop){M.loop=1;requestAnimationFrame(frame)}}
function ctrlInit(){}
function kickoff(t){players.forEach(p=>{const q=fpos(p);p.x=p.team.side*q[0]>-1?-p.team.side*1.5:q[0];p.z=q[1];p.vx=p.vz=0;p.fx=p.team.side;p.fz=0});
 const k=STK(t);k.x=-t.side*.8;k.z=0;ball.x=ball.z=0;ball.y=BR;ball.vx=ball.vy=ball.vz=0;owner=null;M.st='restart';M.rt=1.5;M.go=0;M.taker=k;if(t.home)ctrl=k;else ctrl=STK(teams[0]);snd('w')}
function setPiece(x,z,t,tk,msg){ball.x=x;ball.z=z;ball.y=BR;ball.vx=ball.vy=ball.vz=0;owner=null;tk.x=x-t.side*1.2;tk.z=z;M.st='restart';M.rt=1.4;M.go=0;M.taker=tk;M.q=0;flash(msg,900);if(t.home)ctrl=tk;snd('w')}
function nearest(t,x,z,ex){let b=null,d=1e9;t.ps.forEach(p=>{if(p==ex||p.red)return;const e=Math.hypot(p.x-x,p.z-z);if(e<d){d=e;b=p}});return b}
let ft=0;function flash(s,ms){const g=$('#goal');g.textContent=s;g.style.display='block';clearTimeout(ft);ft=setTimeout(()=>g.style.display='none',ms)}
function act(a,d){if(!M||paused||M.st=='goal'||M.st=='end')return;if(M.st=='restart'){if(d&&ctrl&&M.taker==ctrl){M.go=1;M.q=a;M.rt=0}return}
 if(!ctrl)return;const p=ctrl;
 if(a=='switch'&&d)swap(true);else if(a=='tackle'&&d)tackle(p);else if(a=='pass'&&d&&owner==p)pass(p,0);else if(a=='thru'&&d&&owner==p)pass(p,1);
 else if(a=='shoot'){if(d)A.hold=performance.now();else if(A.hold&&owner==p){shoot(p,cl((performance.now()-A.hold)/800,.2,1),1)}if(!d)A.hold=0}}
function swap(man){let b=null,d=1e9;teams[0].ps.forEach(p=>{if(p==ctrl||p.gk||p.red)return;const e=Math.hypot(p.x-ball.x,p.z-ball.z)-(man&&p==ctrl?0:0);if(e<d){d=e;b=p}});if(b){if(man||d<Math.hypot(ctrl.x-ball.x,ctrl.z-ball.z)-3)ctrl=b}}
function kick(p,dx,dz,sp,vy){ball.vx=dx*sp;ball.vz=dz*sp;ball.vy=vy;p.cdK=.45;if(owner==p)owner=null;lastP=p;snd('k')}
function pass(p,thru){let[ix,iz,l]=p.team.home&&p==ctrl?inp():[0,0,0];let dx=l>.2?ix:p.fx,dz=l>.2?iz:p.fz,b=null,bs=-9,tx=0,tz=0;
 p.team.ps.forEach(t=>{if(t==p||t.red)return;let ex=t.x+(thru?t.vx*.9+p.team.side*5:0),ez=t.z+(thru?t.vz*.9:0);const rx=ex-p.x,rz=ez-p.z,d=Math.hypot(rx,rz)||1,c=(rx*dx+rz*dz)/d,s=(p.team.home&&p==ctrl?c*2:c+(rx*p.team.side>0?.4:0))-d/45-(t.gk?1:0);if((c>.35||!(p.team.home&&p==ctrl))&&s>bs&&d>3){bs=s;b=t;tx=rx;tz=rz}});
 if(b){const d=Math.hypot(tx,tz)||1,n=(100-p.a.pas)/900*(p.team.home?1:DIFF[SV.diff].acc);dx=tx/d+(rnd()-.5)*n*2;dz=tz/d+(rnd()-.5)*n*2;const sp=cl(8+d*.85,10,thru?30:26)*(.8+p.a.pas/400);kick(p,dx,dz,sp,.4)}else{const d=Math.hypot(dx,dz)||1;kick(p,dx/d,dz/d,14,.3)}
 M.mt=0}
function shoot(p,pw,human){const s=p.team.side,gx=s*HW;let zt;if(human){const iz=inp()[1];zt=cl(iz*8+(rnd()-.5)*2,-4.3,4.3)}else zt=(rnd()<.5?-1:1)*(2.2+rnd()*2);
 const dx=gx-p.x,dz=zt-p.z,d=Math.hypot(dx,dz)||1,n=(100-p.a.sht)/700*(human||p.team.home?1:DIFF[SV.diff].acc);kick(p,dx/d+(rnd()-.5)*n,dz/d+(rnd()-.5)*n*1.5,(14+pw*17)*(.85+p.a.sht/330),1+pw*pw*4*rnd())}
function tackle(p){if(p.cdT>0)return;p.cdT=1;p.vx+=p.fx*5;p.vz+=p.fz*5;if(owner&&owner.team!=p.team&&Math.hypot(owner.x-p.x,owner.z-p.z)<2.3){const ch=.5+(p.a.def-owner.a.dri)/180;if(rnd()<ch){const o=owner;owner=null;lastP=p;ball.vx=p.fx*6+(rnd()-.5)*4;ball.vz=p.fz*6+(rnd()-.5)*4;ball.vy=1.5;o.cdK=.6;p.cdK=0;snd('k')}else if(rnd()<.3){const o=owner;card(p);setPiece(cl(o.x,-48,48),cl(o.z,-29,29),o.team,o,'FOUL'+cardTxt)}}}
function endHalf(){if(M.half==1){M.st='half';M.rt=3;flash('HALF TIME',2800);snd('w')}else{M.st='end';end()}}
function frame(now){requestAnimationFrame(frame);if(!M||paused){last=now;return}
 const dt=Math.min(.033,(now-last)/1000);last=now;clk+=dt;const T0=teams[0],T1=teams[1];
 if(M.st=='end')return;
 if(M.st=='half'){M.rt-=dt;if(M.rt<=0){M.half=2;M.t=0;teams.forEach(t=>t.side*=-1);kickoff(T1)}render(dt);return}
 if(M.st=='goal'){M.rt-=dt;ball.x=cl(ball.x,-HW-1.8,HW+1.8);ball.vx*=.9;ball.vz*=.9;if(M.rt<=0)kickoff(M.conc);players.forEach(p=>{p.vx*=.9;p.vz*=.9});}
 if(M.st=='restart'){M.rt-=dt;if(M.rt<=0&&(!M.taker.team.home||M.go||M.rt<-1.5)){M.st='play';owner=M.taker;lastP=owner;M.taker.cdK=0;M.taker.think=.1;const q=M.q;M.q=0;if(q)act(q,1)}}
 if(M.st=='play'){M.t+=dt;if(M.t>=M.hl)endHalf()}
 // controlled player
 players.forEach(p=>{if(p.red)return;p.cdT-=dt;p.cdK-=dt;if(p==ctrl&&(M.st=='play'||M.st=='restart')){const[ix,iz,l]=inp();mv(p,p.x+ix*10,p.z+iz*10,dt,K.ShiftLeft||K.ShiftRight||A.sprint);if(l>.15&&!(M.st=='restart')){}}else if(M.st=='play'||M.st=='restart'&&p!=M.taker)ai(p,dt);else{p.vx*=.8;p.vz*=.8}
  p.x=cl(p.x+p.vx*dt,-HW-4,HW+4);p.z=cl(p.z+p.vz*dt,-HD-3,HD+3);const sp=Math.hypot(p.vx,p.vz);if(sp>.5){p.fx=p.vx/sp;p.fz=p.vz/sp}});
 for(let i=0;i<players.length;i++)for(let j=i+1;j<players.length;j++){const a=players[i],b=players[j],dx=b.x-a.x,dz=b.z-a.z,d=Math.hypot(dx,dz);if(d<.9&&d>.01){const k=(.9-d)/2/d;a.x-=dx*k;a.z-=dz*k;b.x+=dx*k;b.z+=dz*k}}
 if(M.st=='play'||M.st=='goal')ballStep(dt);
 if(M.st=='restart'&&M.taker){ball.x=M.taker.x+M.taker.fx;ball.z=M.taker.z;ball.vx=ball.vz=0}
 if(M.st=='play'){clearTimeout(0);if(clk-lastSw>.4&&owner&&owner.team!=T0||clk-lastSw>.4&&!owner){lastSw=clk;swap(false)}if(owner&&owner.team==T0)ctrl=owner}
 players.forEach(p=>{const g=p.g;g.position.set(p.x,0,p.z);g.rotation.y=Math.atan2(p.fx,p.fz);const sp=Math.hypot(p.vx,p.vz);p.ph+=sp*dt*2.2;const sw=Math.sin(p.ph)*Math.min(1,sp/4);p.legs[0].rotation.x=sw;p.legs[1].rotation.x=-sw;p.arms[0].rotation.x=-sw*.8;p.arms[1].rotation.x=sw*.8});
 if(ctrl){ring.position.set(ctrl.x,3.1+Math.sin(clk*6)*.12,ctrl.z);ring.rotation.y=clk*3}
 hud();render(dt)}
