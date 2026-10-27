"use strict";
function end(){ambience(false);const a=teams[0].score,b=teams[1].score;let res,win=a>b;if(a==b){if(M.mode=='tour'){win=rnd()<.5;res=`${a}-${b} (penalties: ${win?'you win':'you lose'})`}else res=`${a}-${b} Draw`}else res=`${a}-${b} ${win?'Victory':'Defeat'}`;
 if(win&&a!=b||(a==b&&M.mode=='tour'&&win)){SV.w++;SV.coins+=30}else if(a==b){SV.d++;SV.coins+=10}else{SV.l++;SV.coins+=5}
 M.win=win;let ex='';if(M.mode=='tour'){const t=SV.tour;if(!win){SV.tour=null;ex='Eliminated.'}else if(t.stage=='SF'){const x=TEAMS[t.a][4].reduce((s,v)=>s+v,0)+rnd()*40>TEAMS[t.b][4].reduce((s,v)=>s+v,0)+rnd()*40?t.a:t.b;SV.tour={stage:'F',opp:x};ex='Into the final!'}else{SV.tour=null;SV.coins+=100;ex='CHAMPIONS! +100 coins'}}if(M.mode=='career'&&SV.career){const c=SV.career;c.res.push(a+'-'+b);c.pts+=a>b?3:a==b?1:0;c.r++;if(c.r>=5){const bn=c.pts>=12?150:c.pts*6;SV.coins+=bn;ex='Season over: '+c.pts+' pts, +'+bn+' coins'}}sv();
 $('#hud').style.display='none';$('#er').textContent=res+(ex?'\n'+ex:'');$('#er').style.whiteSpace='pre';show('end');snd('w')}
function endDone(){M=null;show('menu')}
$('#pz').onclick=()=>{paused=true;show('pause')};
function resume(){document.querySelectorAll('.scr').forEach(e=>e.classList.remove('on'));paused=false;last=performance.now()}
function quit(){M=null;paused=false;ambience(false);$('#hud').style.display='none';show('menu')}
