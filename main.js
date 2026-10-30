"use strict";
addEventListener('error',e=>console.error('Game error:',e.message));
show('menu');

if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(e=>console.warn('SW',e)));
