"use strict";
"use strict";
const $=s=>document.querySelector(s),rnd=Math.random,cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const LS={get(k,d){try{const v=localStorage.getItem('apex_'+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem('apex_'+k,JSON.stringify(v))}catch(e){}}};
let S=Object.assign({q:1,snd:1,amb:1,cam:1,len:1},LS.get('set',{}));
let SV=Object.assign({team:0,form:'4-3-3',w:0,l:0,d:0,coins:150,tour:null,career:null,owned:[],cp:null,diff:1,tac:{a:0,d:0,m:1}},LS.get('save',{}));
const sv=()=>LS.set('save',SV),ss=()=>LS.set('set',S);
const TEAMS=[['Nova United','NU',0x2f7bff,0xffffff,[80,76,74]],['Crimson Vipers','CV',0xd8232a,0x111111,[78,72,76]],['Solar Lions','SL',0xf5c400,0x222222,[74,78,72]],['Jade Titans','JT',0x14a76c,0xffffff,[72,74,80]],['Violet Storm','VS',0x8a3ffc,0xffd7ff,[77,70,70]],['Arctic Wolves','AW',0xe8f4ff,0x2a4a7a,[70,72,78]]];
const B4=[[-.55,-.7],[-.6,-.25],[-.6,.25],[-.55,.7]],B3=[[-.6,-.45],[-.65,0],[-.6,.45]],G=[-.95,0];
const FORM={'4-3-3':[G,...B4,[-.15,-.4],[-.2,0],[-.15,.4],[.4,-.65],[.5,0],[.4,.65]],
'4-4-2':[G,...B4,[-.1,-.7],[-.15,-.22],[-.15,.22],[-.1,.7],[.45,-.2],[.45,.2]],
'4-2-3-1':[G,...B4,[-.25,-.25],[-.25,.25],[.1,-.6],[.15,0],[.1,.6],[.5,0]],
'3-5-2':[G,...B3,[-.1,-.8],[-.2,-.3],[-.3,0],[-.2,.3],[-.1,.8],[.45,-.2],[.45,.2]],
'3-4-3':[G,...B3,[-.1,-.7],[-.15,-.2],[-.15,.2],[-.1,.7],[.4,-.6],[.5,0],[.4,.6]],
'5-3-2':[G,[-.5,-.85],[-.65,-.4],[-.7,0],[-.65,.4],[-.5,.85],[-.15,-.35],[-.25,0],[-.15,.35],[.45,-.2],[.45,.2]]};
const ROLES={'4-3-3':'GK LB CB CB RB CM CM CM LW ST RW','4-4-2':'GK LB CB CB RB LM CM CM RM ST ST','4-2-3-1':'GK LB CB CB RB CDM CDM LW CAM RW ST','3-5-2':'GK CB CB CB LM CM CDM CM RM ST ST','3-4-3':'GK CB CB CB LM CM CM RM LW ST RW','5-3-2':'GK LB CB CB CB RB CM CDM CM ST ST'};
if(!FORM[SV.form])SV.form='4-3-3';
const FN=['Kai','Leo','Ravi','Mateo','Jonas','Idris','Tariq','Niko','Oren','Sami','Luca','Dario','Emil','Yusuf'],LN=['Vance','Okoro','Silva','Hart','Moreau','Kade','Ito','Brandt','Reyes','Novak','Duran','Lund','Haas','Mbeki'];
const hex=c=>'#'+c.toString(16).padStart(6,'0');
const HW=50,HD=31,GW=5,GH=3.2,BR=0.4;
const DIFF=[{spd:.88,tk:.5,acc:1.6},{spd:1,tk:1,acc:1},{spd:1.07,tk:1.4,acc:.8},{spd:1.14,tk:2,acc:.55}];
