"use strict";
// ---------- teams / players ----------
function tacFx(t){return{off:[-5,0,4,8][t.m]+[0,5,-2,-7][t.d]+(t.a==3?-3:0),pr:t.d==1?2:1,ps:[.7,.9,.5,.6][t.a],sd:[22,18,28,26][t.a]}}
const STK=t=>t.ps.find(p=>p.role=='ST')||t.ps[10];
function kit(i,o){let s=TEAMS[i][2],a=TEAMS[i][3];if(o!=null){const c1=new THREE.Color(s),c2=new THREE.Color(TEAMS[o][2]);if(Math.abs(c1.r-c2.r)+Math.abs(c1.g-c2.g)+Math.abs(c1.b-c2.b)<.9){const t=s;s=a;a=t}}return[s,a]}
function mkTeam(idx,side,home,k,form){const T={idx,side,home,k,form,ps:[],score:0,tac:home?SV.tac:{a:rnd()*4|0,d:SV.diff>=2?1:rnd()*4|0,m:1+(rnd()*3|0)},get fx(){return tacFx(this.tac)}},sk=mat(0xe0ac84),sh=mat(k[0]),sr=mat(k[1]),sc=mat(k[0]),bt=mat(0x111111);
 for(let i=0;i<11;i++){const gk=i==0,g=new THREE.Group(),role=ROLES[form].split(' ')[i],base=TEAMS[idx][4][gk||role=='CB'||role=='LB'||role=='RB'?2:role=='ST'||role=='LW'||role=='RW'?0:1];
  const shirt=gk?mat(0xff8c1a):sh;mesh(new THREE.CylinderGeometry(.32,.28,.8,8),shirt,0,1.35,0,g);mesh(new THREE.CylinderGeometry(.29,.31,.35,8),sr,0,.85,0,g);mesh(new THREE.SphereGeometry(.2,8,6),sk,0,1.93,0,g);mesh(new THREE.SphereGeometry(.205,8,4,0,6.3,0,1.3),mat(0x2a1a10),0,1.95,0,g);
  const legs=[],arms=[];[-1,1].forEach(s=>{const l=new THREE.Group();l.position.set(s*.14,.8,0);mesh(new THREE.CylinderGeometry(.09,.07,.7,6),sc,0,-.35,0,l);mesh(new THREE.BoxGeometry(.14,.1,.3),bt,0,-.72,.06,l);g.add(l);legs.push(l);
   const a=new THREE.Group();a.position.set(s*.4,1.62,0);mesh(new THREE.CylinderGeometry(.06,.06,.6,5),sk,0,-.3,0,a);g.add(a);arms.push(a)});
  const nc=document.createElement('canvas');nc.width=nc.height=64;const nx=nc.getContext('2d');nx.fillStyle=hex(k[1]);nx.font='bold 48px sans-serif';nx.textAlign='center';nx.fillText(i+1,32,50);const nb=new THREE.Mesh(new THREE.PlaneGeometry(.5,.5),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(nc),transparent:true}));nb.position.set(0,1.4,-.34);nb.rotation.y=Math.PI;g.add(nb);g.scale.setScalar(1.2);scene.add(g);const r=()=>cl(Math.round(base+(rnd()-.5)*16),50,95),p={g,legs,arms,team:T,i,role,a:{spd:r(),sht:r(),pas:r(),dri:r(),str:r(),sta:r(),def:r()},x:0,z:0,vx:0,vz:0,fx:T.home?1:-1,fz:0,st:100,cdT:0,cdK:0,think:0,ph:rnd()*6,gk};
  p.ovr=Math.round((p.a.spd+p.a.sht+p.a.pas+p.a.dri+p.a.str+p.a.sta+p.a.def)/7);p.name=FN[(idx*3+i*5)%14][0]+'. '+LN[(idx*5+i*3+(home?0:2))%14];T.ps.push(p);players.push(p)}return T}
function fpos(p){const f=FORM[p.team.form][p.i];return[p.team.side*f[0]*47,f[1]*27]}
