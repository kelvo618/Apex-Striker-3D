"use strict";
let cardTxt='';function card(p){cardTxt='';const r=rnd();if(r<.04||(p.yc==1&&r<.35)){p.red=1;cardTxt=' · RED CARD '+p.name;p.g.visible=false;p.x=p.z=999;if(ctrl==p)swap(true)}else if(r<.3){p.yc=(p.yc||0)+1;cardTxt=' · YELLOW '+p.name}}
function mv(p,tx,tz,dt,sp){const dx=tx-p.x,dz=tz-p.z,d=Math.hypot(dx,dz);let vx=0,vz=0;if(d>.4){const s=(4.2+p.a.spd*.045)*(sp&&p.st>5?1.3:1)*(.75+.25*p.st/100)*(p.team.home?1:DIFF[SV.diff].spd);vx=dx/d*s;vz=dz/d*s}
 p.vx+=(vx-p.vx)*Math.min(1,8*dt);p.vz+=(vz-p.vz)*Math.min(1,8*dt);p.st=cl(p.st+(sp&&d>.5?-14:6)*dt,0,100)}
function ai(p,dt){const T=p.team,oT=teams[T===teams[0]?1:0],s=T.side,own=owner&&owner.team==T,opn=owner&&owner.team!=T;p.think-=dt;
 if(p.gk){if(owner==p){mv(p,p.x,p.z,dt,0);if(p.think<=0){p.think=.6;pass(p,0)}return}const bx=-s*(Math.abs(ball.x-(-s*HW))<16?44.5:47.5);mv(p,bx,cl(ball.z*.35,-4.5,4.5),dt,0);return}
 if(owner==p){const gx=s*HW;let dx=gx-p.x,dz=-p.z*.3,o=nearest(oT,p.x,p.z),od=Math.hypot(o.x-p.x,o.z-p.z);if(od<5){dz+=(p.z-o.z>=0?1:-1)*12}const d=Math.hypot(dx,dz)||1;mv(p,p.x+dx/d*5,p.z+dz/d*5,dt,od<9);
  if(p.think<=0){p.think=.35+rnd()*.4;const dg=Math.hypot(gx-p.x,p.z);if(dg<T.fx.sd&&rnd()<.65)shoot(p,.4+rnd()*.6,0);else if((od<5&&rnd()<T.fx.ps)||p.gk)pass(p,rnd()<.3?1:0)}return}
 const n1=nearest(T,ball.x,ball.z,null),near=n1==p||(T.fx.pr==2&&nearest(T,ball.x,ball.z,n1)==p),fp=fpos(p);
 if(owner&&opn&&near){mv(p,owner.x,owner.z,dt,1);if(Math.hypot(owner.x-p.x,owner.z-p.z)<1.8&&rnd()<dt*1.5*(p.team.home?1:DIFF[SV.diff].tk))tackle(p);return}
 if(!owner&&near){mv(p,ball.x,ball.z,dt,1);return}
 let tx=fp[0]+ball.x*.3+s*T.fx.off,tz=fp[1]+ball.z*.25;if(own&&p.i>5)tx+=s*10;if(owner&&opn&&p.i<=4&&p.i>0)tx-=s*2;
 mv(p,cl(tx,-48,48),cl(tz,-29,29),dt,0)}
