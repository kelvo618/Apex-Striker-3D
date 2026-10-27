"use strict";
// ---------- UI ----------
function show(id){document.querySelectorAll('.scr').forEach(e=>e.classList.toggle('on',e.id==id));if(id=='menu')$('#mst').textContent=`W ${SV.w}  D ${SV.d}  L ${SV.l}  Coins ${SV.coins}`;if(id=='set'){$('#sq').value=S.q;$('#sc').value=S.cam;$('#sl').value=S.len;setBtn()}snd('u')}
function setBtn(){$('#bs').textContent='Sound: '+(S.snd?'On':'Off');$('#ba').textContent='Crowd ambience: '+(S.amb?'On':'Off')}
function tg(k){S[k]=S[k]?0:1;ss();setBtn();if(k=='amb')ambience(!!M)}
$('#sq').onchange=e=>{S.q=+e.target.value;ss()};$('#sc').onchange=e=>{S.cam=+e.target.value;ss()};$('#sl').onchange=e=>{S.len=+e.target.value;ss()};
function fs(){try{const d=document.documentElement;document.fullscreenElement?document.exitFullscreen():d.requestFullscreen()}catch(e){console.warn(e)}}
let opp=1,mode='qm';
function teamScr(m){mode=m;$('#go').textContent=m=='qm'?'Kick Off':'Save & Back';$('#opsel').parentElement.style.display=m=='qm'?'':'none';rCards();tacUI();show('teams')}
function rCards(){const c=$('#cards');c.innerHTML='';TEAMS.forEach((t,i)=>{const d=document.createElement('div');d.className='card'+(i==SV.team?' me':'')+(i==opp&&mode=='qm'?' op':'');const o=Math.round((t[4][0]+t[4][1]+t[4][2])/3);d.innerHTML=`<div class="crest" style="background:${hex(t[2])};color:${hex(t[3])}">${t[1]}</div>${t[0]}<small>OVR ${o}</small><small>ATT ${t[4][0]} MID ${t[4][1]} DEF ${t[4][2]}</small>`;d.onclick=()=>{SV.team=i;if(opp==i)opp=(i+1)%6;sv();rCards();snd('u')};c.appendChild(d)});
$('#opsel').innerHTML=TEAMS.map((t,i)=>`<option value="${i}"${i==opp?' selected':''}>${t[0]}</option>`).join('');$('#fosel').innerHTML=Object.keys(FORM).map(f=>`<option${f==SV.form?' selected':''}>${f}</option>`).join('')}
$('#opsel').onchange=e=>{opp=+e.target.value;rCards()};$('#fosel').onchange=e=>{SV.form=e.target.value;sv()};
function tacUI(){[['dfs',['Easy','Normal','Hard','Legendary'],()=>SV.diff,v=>SV.diff=v],['tka',['Balanced','Possession','Fast attack','Counter'],()=>SV.tac.a,v=>SV.tac.a=v],['tkd',['Balanced','High press','Mid block','Deep defence'],()=>SV.tac.d,v=>SV.tac.d=v],['tkm',['Defensive','Balanced','Attacking','Ultra attacking'],()=>SV.tac.m,v=>SV.tac.m=v]].forEach(([id,o,g,st])=>{const e=$('#'+id);e.innerHTML=o.map((t,i)=>`<option value="${i}"${i==g()?' selected':''}>${t}</option>`).join('');e.onchange=()=>{st(+e.value);sv()}})}
function qm(){teamScr('qm')}
function goQM(){if(mode!='qm'){show('menu');return}if(opp==SV.team)opp=(opp+1)%6;startMatch(SV.team,opp,'qm')}
function tourScr(){const t=SV.tour,e=$('#tt'),b=$('#tg');if(!t){e.textContent=`New cup: semi-final then final.\nYou: ${TEAMS[SV.team][0]}`;b.textContent='Start tournament'}else{e.textContent=`${t.stage=='SF'?'Semi-final':'Final'}\n${TEAMS[SV.team][0]}  vs  ${TEAMS[t.opp][0]}\n`+(t.stage=='F'?'(you won your semi-final)':'');b.textContent='Play next match'}show('tour')}
function tourPlay(){if(!SV.tour){const o=[0,1,2,3,4,5].filter(i=>i!=SV.team).sort(()=>rnd()-.5);SV.tour={stage:'SF',opp:o[0],a:o[1],b:o[2]};sv()}startMatch(SV.team,SV.tour.opp,'tour')}
