"use strict";
function ballStep(dt){const b=ball,N=2,h=dt/N;
 for(let k=0;k<N;k++){
  if(owner){const p=owner;if(M.st=='goal')owner=null;else{b.x+=(p.x+p.fx*.9-b.x)*Math.min(1,18*h);b.z+=(p.z+p.fz*.9-b.z)*Math.min(1,18*h);b.y=BR;b.vx=p.vx;b.vz=p.vz;b.vy=0;lastP=p;
   if(p.gk&&p.think<=0&&p.cdK<=0){p.think=1;}continue}}
  b.vy-=22*h;b.x+=b.vx*h;b.y+=b.vy*h;b.z+=b.vz*h;
  if(b.y<BR){b.y=BR;if(b.vy<-1.5)b.vy*=-.6;else b.vy=0}
  const gd=b.y<=BR+.02?Math.exp(-1.1*h):Math.exp(-.12*h);b.vx*=gd;b.vz*=gd;
  if(M.st=='play'){
   if(Math.abs(b.x)>HW){if(Math.abs(b.z)<GW&&b.y<GH){const s=Math.sign(b.x),sc=teams.find(t=>t.side==s);sc.score++;M.st='goal';M.rt=3.5;M.conc=teams.find(t=>t!=sc);const who=lastP&&lastP.team==sc?lastP.name:'Own goal';flash('GOAL!\n'+who,3200);$('#goal').style.whiteSpace='pre';snd('g');return}
    const s=Math.sign(b.x),def=teams.find(t=>t.side==-s);if(lastP&&lastP.team==def){const c=teams.find(t=>t!=def);setPiece(s*(HW-1),Math.sign(b.z||1)*(HD-1),c,nearest(c,s*HW,b.z),'CORNER')}else{const gk=def.ps[0];setPiece(s*(HW-6),0,def,gk,'GOAL KICK')}return}
   if(Math.abs(b.z)>HD){const t=lastP?teams.find(x=>x!=lastP.team):teams[0];setPiece(cl(b.x,-HW+2,HW-2),Math.sign(b.z)*(HD-.5),t,nearest(t,b.x,Math.sign(b.z)*HD),'THROW-IN');return}
   if(!owner)for(const p of players){if(p.cdK>0||p.red)continue;const d=Math.hypot(p.x-b.x,p.z-b.z),sp=Math.hypot(b.vx,b.vz);
    if(p.gk&&d<2.2&&b.y<2.6){if(sp>11&&rnd()>.55+p.a.def/500){b.vx*=-.4;b.vz=(rnd()-.5)*10;b.vy=3;p.cdK=.5;lastP=p;snd('k')}else{owner=p;lastP=p;p.think=1.2}break}
    if(d<1.45&&b.y<1.4&&(sp<22||rnd()<.5)){owner=p;lastP=p;break}}}
 }
 ballM.position.set(b.x,b.y,b.z);ballM.rotation.x+=b.vz*dt*2;ballM.rotation.z-=b.vx*dt*2}
