"use strict";
// ---------- 3D ----------
let ax=1,R,scene,cam,light,crowd,ballM,ring,players=[],teams=[],M=null,ctrl=null,owner=null,lastP=null,paused=false,cx=0,zm=1,clk=0,last=0,lastSw=0;
const ball={x:0,y:BR,z:0,vx:0,vy:0,vz:0};
function mat(c){return new THREE.MeshLambertMaterial({color:c})}
function mesh(g,m,x,y,z,p){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;(p||0).add&&p.add(o);return o}
function disp(o){o.traverse(c=>{if(c.geometry)c.geometry.dispose();if(c.material){if(c.material.map)c.material.map.dispose();c.material.dispose()}})}
function sizeR(){if(!R)return;const w=innerWidth,h=innerHeight;R.setPixelRatio([.7,1,Math.min(devicePixelRatio,2)][S.q]);R.setSize(w,h,false);if(cam){cam.aspect=w/h;cam.updateProjectionMatrix()}}
addEventListener('resize',sizeR);addEventListener('orientationchange',()=>setTimeout(sizeR,200));
function build(){
 if(!R){try{R=new THREE.WebGLRenderer({canvas:$('#c'),antialias:!matchMedia('(pointer:coarse)').matches,powerPreference:'high-performance'})}catch(e){console.error(e);alert('WebGL is not available on this device.');return false}}
 if(scene)disp(scene);scene=new THREE.Scene();scene.background=new THREE.Color(0x8ec9ff);scene.fog=new THREE.Fog(0xa8d4ff,130,320);
 cam=new THREE.PerspectiveCamera(54,1,.5,500);R.shadowMap.enabled=S.q>0;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.0;
 scene.add(new THREE.HemisphereLight(0xdff0ff,0x3a6a2a,1.0));
 light=new THREE.DirectionalLight(0xfff0d0,1.1);light.position.set(20,50,25);
 if(S.q>0){light.castShadow=true;const m=S.q>1?2048:1024,c=light.shadow.camera;light.shadow.mapSize.set(m,m);c.left=-38;c.right=38;c.top=32;c.bottom=-32;c.near=5;c.far=130}
 scene.add(light,light.target);
 const sc=document.createElement('canvas');sc.width=4;sc.height=256;const sg=sc.getContext('2d'),g2=sg.createLinearGradient(0,0,0,256);[[0,'#3f8fe0'],[.42,'#8cc6ff'],[.5,'#e4f2ff'],[.52,'#6a8a6a'],[1,'#6a8a6a']].forEach(a=>g2.addColorStop(a[0],a[1]));sg.fillStyle=g2;sg.fillRect(0,0,4,256);scene.add(new THREE.Mesh(new THREE.SphereGeometry(300,16,12),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(sc),side:THREE.BackSide,fog:false})));
 const cv=document.createElement('canvas');cv.width=1000;cv.height=620;const g=cv.getContext('2d');
 for(let i=0;i<10;i++){g.fillStyle=i%2?'#3fa04f':'#4ab45c';g.fillRect(i*100,0,100,620)}
 for(let i=0;i<9000;i++){g.fillStyle=rnd()<.5?'#0003':'#fff1';g.fillRect(rnd()*1000,rnd()*620,2,2)}g.strokeStyle='#fff';g.lineWidth=3;const X=x=>(x+50)*10,Z=z=>(z+31)*10;
 g.strokeRect(X(-49.5),Z(-30.5),990,610);g.beginPath();g.moveTo(500,5);g.lineTo(500,615);g.stroke();g.beginPath();g.arc(500,310,91,0,7);g.stroke();
 [[-49.5,165,-20,400],[33,165,-20,400],[-49.5,55,-9,180],[44,55,-9,180]].forEach(r=>g.strokeRect(X(r[0]),Z(r[2]),r[1],r[3]));
 g.fillStyle='#fff';[[0,0],[-39,0],[39,0]].forEach(p=>{g.beginPath();g.arc(X(p[0]),Z(p[1]),5,0,7);g.fill()});
 const tx=new THREE.CanvasTexture(cv);tx.anisotropy=4;
 const pt=new THREE.Mesh(new THREE.PlaneGeometry(100,62),new THREE.MeshLambertMaterial({map:tx}));pt.rotation.x=-Math.PI/2;pt.receiveShadow=true;scene.add(pt);
 const gr=new THREE.Mesh(new THREE.PlaneGeometry(500,500),mat(0x2c6a35));gr.rotation.x=-Math.PI/2;gr.position.y=-.05;scene.add(gr);
 const wm=mat(0xeeeeee),nm=new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true,transparent:true,opacity:.35});
 [-1,1].forEach(s=>{[-GW,GW].forEach(z=>mesh(new THREE.CylinderGeometry(.1,.1,GH,6),wm,s*HW,GH/2,z,scene));const b=mesh(new THREE.CylinderGeometry(.1,.1,GW*2,6),wm,s*HW,GH,0,scene);b.rotation.x=Math.PI/2;
  const n=new THREE.Mesh(new THREE.BoxGeometry(2,GH,GW*2),nm);n.position.set(s*(HW+1),GH/2,0);scene.add(n);
  [-1,1].forEach(z=>{mesh(new THREE.CylinderGeometry(.05,.05,1.6,4),wm,s*HW,.8,z*HD,scene);mesh(new THREE.ConeGeometry(.35,.4,4),mat(0xffcc00),s*HW,1.7,z*HD,scene)})});
 const ac2=document.createElement('canvas');ac2.width=512;ac2.height=32;const a=ac2.getContext('2d');a.fillStyle='#1f6be0';a.fillRect(0,0,512,32);a.fillStyle='#fff';a.font='bold 22px sans-serif';a.fillText('APEX STRIKER  ▲  NOVA ARENA  ▲  SKYLINE',10,24);
 const at=new THREE.CanvasTexture(ac2);at.wrapS=THREE.RepeatWrapping;at.repeat.set(2,1);const am=new THREE.MeshBasicMaterial({map:at});
 [-1,1].forEach(s=>{mesh(new THREE.BoxGeometry(100,1,.3),am,0,.5,s*33,scene);mesh(new THREE.BoxGeometry(.3,1,66),am,s*54,.5,0,scene)});
 const st=S.q==0?3.2:1.8,pos=[],cm=new THREE.InstancedMesh(new THREE.BoxGeometry(.6,1,.5),new THREE.MeshLambertMaterial({color:0xffffff}),3000);let n2=0;
 for(let r=0;r<9;r++)for(let x=-50;x<=50;x+=st){[-1,1].forEach(s=>{if(n2<3000)pos.push([x,1+r*1.1,s*(36+r*1.4)])})}
 for(let r=0;r<9;r++)for(let z=-31;z<=31;z+=st){[-1,1].forEach(s=>{if(n2+pos.length<3000)pos.push([s*(57+r*1.4),1+r*1.1,z])})}
 const col=new THREE.Color(),dm=new THREE.Object3D();pos.forEach((p,i)=>{dm.position.set(p[0],p[1],p[2]);dm.updateMatrix();cm.setMatrixAt(i,dm.matrix);col.setHSL(rnd(),.6,.3+rnd()*.4);cm.setColorAt(i,col)});cm.count=pos.length;crowd=cm;scene.add(cm);
 const sm=mat(0x8b93a6),rf=mat(0xdde2ec);[-1,1].forEach(s=>{const a=new THREE.Mesh(new THREE.BoxGeometry(104,.6,16),rf),b=new THREE.Mesh(new THREE.BoxGeometry(16,.6,68),rf);a.position.set(0,16,s*46);a.rotation.x=-s*.1;b.position.set(s*66,16,0);b.rotation.z=s*.1;scene.add(a,b)});for(let r=0;r<9;r++){const h=1+r*1.1;[-1,1].forEach(s=>{const a=new THREE.Mesh(new THREE.BoxGeometry(100,h,1.4),sm),b=new THREE.Mesh(new THREE.BoxGeometry(1.4,h,64),sm);a.position.set(0,h/2-.5,s*(36+r*1.4));b.position.set(s*(57+r*1.4),h/2-.5,0);scene.add(a,b)})}
 const hc=document.createElement('canvas');hc.width=hc.height=64;const hg=hc.getContext('2d'),rg=hg.createRadialGradient(32,32,0,32,32,32);rg.addColorStop(0,'#fff');rg.addColorStop(1,'#fff0');hg.fillStyle=rg;hg.fillRect(0,0,64,64);const hm=new THREE.SpriteMaterial({map:new THREE.CanvasTexture(hc),blending:THREE.AdditiveBlending,fog:false,depthWrite:false,color:0xfff2c0,opacity:.25,transparent:true});
 [-1,1].forEach(sx=>[-1,1].forEach(sz=>{mesh(new THREE.CylinderGeometry(.5,.7,32,6),mat(0x333844),sx*62,16,sz*42,scene);mesh(new THREE.BoxGeometry(5,2,1),new THREE.MeshBasicMaterial({color:0xfffbe0}),sx*62,33,sz*42,scene).castShadow=false;const sp=new THREE.Sprite(hm);sp.scale.set(22,22,1);sp.position.set(sx*62,33,sz*42);scene.add(sp)}));
 const bc=document.createElement('canvas');bc.width=bc.height=64;const b=bc.getContext('2d');b.fillStyle='#fff';b.fillRect(0,0,64,64);b.fillStyle='#222';[[10,10],[40,14],[22,40],[50,46],[8,54]].forEach(p=>{b.beginPath();b.arc(p[0],p[1],7,0,7);b.fill()});
 ballM=mesh(new THREE.SphereGeometry(BR,12,10),new THREE.MeshLambertMaterial({map:new THREE.CanvasTexture(bc)}),0,BR,0,scene);
 ballM.scale.setScalar(1.35);ring=new THREE.Mesh(new THREE.ConeGeometry(.3,.6,4),new THREE.MeshBasicMaterial({color:0xffcc33}));ring.rotation.x=Math.PI;scene.add(ring);
 sizeR();return true}
