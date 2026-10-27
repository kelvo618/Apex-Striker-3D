"use strict";
// ---------- audio ----------
let AC=null,amb=null;
function ac(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){console.warn('audio off',e)}}if(AC&&AC.state=='suspended')AC.resume();return AC}
function tone(f,d,ty,v,f2,delay){const a=ac();if(!a||!S.snd)return;try{const t=a.currentTime+(delay||0),o=a.createOscillator(),g=a.createGain();o.type=ty||'sine';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v||.2,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d)}catch(e){}}
function snd(k){if(k=='k')tone(180,.12,'sine',.35,50);else if(k=='w'){tone(2300,.25,'square',.08);tone(2300,.4,'square',.08,2300,.3)}else if(k=='g')[523,659,784,1046].forEach((f,i)=>tone(f,.3,'triangle',.2,0,i*.12));else if(k=='u')tone(600,.06,'triangle',.15)}
function ambience(on){const a=ac();if(!a)return;try{if(on&&S.amb&&!amb){const b=a.createBuffer(1,a.sampleRate*2,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=rnd()*2-1;const s=a.createBufferSource();s.buffer=b;s.loop=true;const f=a.createBiquadFilter();f.type='lowpass';f.frequency.value=500;const g=a.createGain();g.gain.value=.05;s.connect(f);f.connect(g);g.connect(a.destination);s.start();amb=s}else if((!on||!S.amb)&&amb){amb.stop();amb=null}}catch(e){}}
