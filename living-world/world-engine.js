/* Living World 0.14 review candidate: opt-in seasonal artwork, landscape motion and weather with existing Hub scene state. */
const FILENAMES={solaria:'valley-solaria.webp',lost:'valley-lost.webp',sakura:'valley-sakura.webp',corsair:'valley-corsair.webp',mystic:'valley-mystic.webp',clockwork:'valley-clockwork.webp',cyber:'valley-cyber.webp',mars:'valley-mars.webp',foundry:'foundry-master.webp',descent:'foundry-descent.webp',winter:'valley-winter.webp',thaw:'valley-thaw.webp',blossom:'valley-blossom.webp',green:'valley-green.webp',harvest:'valley-master.webp',earlyfall:'valley-earlyfall.webp',latefall:'valley-latefall.webp'};
const urlFor=season=>new URL('./assets/'+FILENAMES[season],import.meta.url).href;
export function seasonForDate(date=new Date()){
  const m=date.getMonth()+1,d=date.getDate();
  if(m===12||m<=2)return 'winter';
  if(m===3||m===4&&d<=10)return 'thaw';
  if(m===4||m===5&&d<=15)return 'blossom';
  if(m<=8)return 'green';
  if(m===9||m===10&&d<=10)return 'harvest';
  if(m===10||m===11&&d<=10)return 'earlyfall';
  return 'latefall';
}
const SEASONS=new Set(['winter','thaw','blossom','green','harvest','earlyfall','latefall']);
// Annual decorative calendar; independent of the Hub's existing special-day state.
const EVENTS=Object.freeze({
 '01-01':['newyear','New Year','fireworks'], '02-14':['valentine','Valentine’s Day','hearts'],
 '02-27':['creatures','Creature celebration','creatures'], '03-10':['retro','Retro game day','pixels'],
 '03-14':['pi','Pi Day','math'], '03-17':['green','St. Patrick’s Day','clover'],
 '04-01':['fools','April Fools’ Day','gravity'], '04-07':['sakura','Sakura festival','lanterns','sakura'],
 '04-22':['earth','Earth Day','greenery','solaria'], '05-04':['space','Space adventure day','stars'],
 '05-22':['arcade','Classic arcade day','pixels'], '06-06':['blocks','Puzzle block day','blocks'],
 '06-07':['sixseven','Secret 67 day','math67'], '06-08':['lost','Prehistoric discovery day','embers','lost'],
 '06-14':['flags','Flag Day','flags'], '06-19':['juneteenth','Juneteenth','lanterns'],
 '06-23':['speed','Speed day','comets'], '07-04':['independence','Independence Day','fireworks'],
 '07-20':['mars','Space exploration day','stars','mars'], '09-19':['corsair','Pirate adventure day','coins','corsair'],
 '10-21':['cyber','Future city day','pixels','cyber'], '10-31':['halloween','Halloween','bats','mystic'],
 '11-10':['clockwork','Clockwork festival','gears','clockwork'], '11-11':['remembrance','Remembrance Day','quiet'],
 '12-31':['nye','New Year’s Eve','fireworks']
});
const WORLD_DATES=Object.freeze(Object.fromEntries(Object.entries(EVENTS).filter(([,v])=>v[3]).map(([k,v])=>[k,v[3]])));
export function eventForDate(date=new Date()){
 const m=date.getMonth()+1,d=date.getDate(),key=String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0');
 let e=EVENTS[key];
 if(!e&&m===11&&date.getDay()===4&&d>=22&&d<=28)e=['harvestfest','Thanksgiving','harvest'];
 if(!e&&m===5&&date.getDay()===1&&d>=25)e=['memorial','Memorial Day','quiet'];
 if(!e&&m===12&&d>=20&&d<=30)e=['winterfest','Winter lights','lights'];
 return e?{id:e[0],name:e[1],effect:e[2],world:e[3]||'valley'}:null;
}
export function worldForDate(date=new Date()){return eventForDate(date)?.world||'valley'}
const ordinarySeason=()=>SEASONS.has(document.body.dataset.season)?document.body.dataset.season:seasonForDate(sceneDate());
const ALTERNATES=new Set(Object.values(WORLD_DATES));
const isAlternate=key=>ALTERNATES.has(key);
function sceneDate(){return new Date()}
// Follow the actual Hub's calendar preferences: explicit season/holiday previews
// take priority over the optional scheduled calendar. Dev-only fixtures may simulate dates.
function calendarEnabled(){
 const holiday=document.getElementById('valley-holiday')?.value;
 const season=document.getElementById('valley-season')?.value;
 return (!holiday||holiday==='auto')&&(!season||season==='auto');
}
function selected(){
 const choice=calendarEnabled()?worldForDate(sceneDate()):'valley';
 return isAlternate(choice)?choice:ordinarySeason();
}
function activeEvent(){return calendarEnabled()?eventForDate(sceneDate()):null}
function syncLegacy(){
 const ds=document.body.dataset,e=activeEvent(),current=nodes[0]?.dataset.season;
 if(!current)return;
 const existingCelebration=(ds.holiday&&ds.holiday!=='none')||(ds.rainbow&&ds.rainbow!=='none')||['pumpkin','jet','santa','flags'].some(k=>ds[k]==='yes');
 // Leave an explicitly selected legacy holiday visible, unless Mars is actually displayed.
 // Otherwise avoid duplicate automatic celebrations and duplicate storm-only lightning.
 const suppress=current==='mars'||(e&&!['quiet','none'].includes(e.effect))||(ds.sky==='storm'&&!existingCelebration);
 if(ds.pfLwWorld!==current)ds.pfLwWorld=current;
 const flag=suppress?'off':'on';if(ds.pfLwLegacyFestival!==flag)ds.pfLwLegacyFestival=flag;
}
function syncEvent(){const e=activeEvent();for(const n of nodes){n.dataset.event=e?.id||'none';n.dataset.eventEffect=e?.effect||'none'}syncLegacy();}
const STYLE=`
body[data-motion="off"] .pf-lw-legacy-animals *,body[data-pf-lw-cave="full"] .valley-backdrop .pf-lw-legacy-animals *{animation:none!important}@media(prefers-reduced-motion:reduce){.pf-lw-legacy-animals *{animation:none!important}}
.pf-lw-legacy-animals{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:3}body[data-pf-lw][data-wildlife="deer"] .pf-lw-legacy-animals .animal-deer{display:none!important}body[data-pf-lw-world]:is([data-pf-lw-world="mars"],[data-pf-lw-world="cyber"],[data-pf-lw-world="mystic"],[data-pf-lw-world="clockwork"],[data-pf-lw-world="solaria"],[data-pf-lw-world="lost"],[data-pf-lw-world="sakura"],[data-pf-lw-world="corsair"]) .pf-lw-legacy-animals{display:none!important}

/* Integration guards for the real Hub. Original mode is not affected. */
body[data-pf-lw] :is(.valley-backdrop,.hero-landscape) > .valley-svg{display:none!important}
body[data-pf-lw][data-pf-lw-legacy-festival="off"] :is(#festival-page-canvas,#festival-canvas){visibility:hidden!important}
body[data-pf-lw][data-pf-lw-cave="full"] #festival-page-canvas{visibility:hidden!important}
body[data-pf-lw][data-pf-lw-cave="transition"] #festival-page-canvas{clip-path:inset(0 0 var(--pf-lw-cave-cover,0%) 0)}
body[data-pf-lw][data-pf-lw-world="mars"] :is(.valley-backdrop,.hero-landscape) > .astronomy-svg{visibility:hidden!important}
body[data-pf-lw][data-pf-lw-world="mars"] .valley-backdrop::before{opacity:0!important}
body[data-pf-lw] :is(.valley-backdrop,.hero-landscape) > .pf-lw-landscape{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden;isolation:isolate}
body[data-pf-lw] .pf-lw-landscape > img{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:none;object-fit:cover;object-position:54% 50%;filter:var(--pf-lw-light,none);transition:filter 1.1s ease}
body[data-pf-lw] .pf-lw-motion{position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;filter:var(--pf-lw-light,none);transition:filter 1.1s ease}
body[data-pf-lw][data-motion="off"] .pf-lw-motion{display:none}
@media(prefers-reduced-motion:reduce){body[data-pf-lw] .pf-lw-motion{display:none}}
body[data-pf-lw] .pf-lw-landscape::after{content:'';position:absolute;inset:0;pointer-events:none;background:var(--pf-lw-tint,linear-gradient(180deg,#d9edff08,transparent 55%,#15291f14));opacity:1}
body[data-pf-lw][data-time="dawn"],body[data-pf-lw][data-time="day"][data-solar="dawn"]{--pf-lw-light:brightness(.79) saturate(.84) contrast(.95);--pf-lw-tint:radial-gradient(ellipse at 9% 45%,#ffd59c7a,transparent 55%),linear-gradient(180deg,#8c7fa752 0%,#ffb58e45 43%,#213e4e35 79%)}
body[data-pf-lw][data-time="dusk"],body[data-pf-lw][data-time="day"][data-solar="dusk"]{--pf-lw-light:brightness(.68) saturate(.92) contrast(1.07);--pf-lw-tint:radial-gradient(ellipse at 85% 40%,#ffad605f,transparent 57%),linear-gradient(180deg,#5f4c8f55,#d56c5559 40%,#172a4149 84%)}
body[data-pf-lw][data-time="night"]{--pf-lw-light:brightness(.31) saturate(.56) contrast(1.09) hue-rotate(12deg);--pf-lw-tint:radial-gradient(ellipse at 52% 24%,#638bb833,transparent 48%),linear-gradient(180deg,#06153170 0%,#1e3f692e 47%,#03101c6b 100%)}
/* weather lighting is separate from the existing time-of-day palette */
body[data-pf-lw] .pf-lw-landscape > img{filter:var(--pf-lw-light,brightness(1)) var(--pf-lw-weather-light,brightness(1))}
body[data-pf-lw] .pf-lw-landscape::after{background:var(--pf-lw-weather-veil,linear-gradient(transparent,transparent)),var(--pf-lw-tint,linear-gradient(180deg,#d9edff08,transparent 55%,#15291f14))}
body[data-pf-lw][data-sky="cloudy"]{--pf-lw-weather-light:brightness(.77) saturate(.68);--pf-lw-weather-veil:linear-gradient(180deg,#b3c3d46b,transparent 62%)}
body[data-pf-lw]:is([data-sky="drizzle"],[data-sky="rain"],[data-sky="sleet"],[data-sky="freezing"],[data-sky="hail"]){--pf-lw-weather-light:brightness(.70) saturate(.65);--pf-lw-weather-veil:linear-gradient(180deg,#697e9566,#afc7d52e 45%,#193b4b25 100%)}
body[data-pf-lw][data-sky="storm"]{--pf-lw-weather-light:brightness(.54) saturate(.57) contrast(1.05);--pf-lw-weather-veil:linear-gradient(180deg,#243652a3,#6b849a24 65%,#17263835)}
body[data-pf-lw][data-sky="snow"]{--pf-lw-weather-light:saturate(.57) brightness(.87);--pf-lw-weather-veil:linear-gradient(180deg,#d6e5f260,transparent 65%,#dae8f52f)}
body[data-pf-lw][data-sky="fog"]{--pf-lw-weather-light:saturate(.53) contrast(.76);--pf-lw-weather-veil:linear-gradient(180deg,#cadadf35 0%,#dce7e890 44%,#d1e3e66f 66%,transparent 95%)}
body[data-pf-lw][data-sky="frost"]{--pf-lw-weather-light:saturate(.72) brightness(.94);--pf-lw-weather-veil:linear-gradient(180deg,transparent 43%,#d8edff30 78%,#a0cfef25)}
body[data-pf-lw] .hero-landscape > .pf-lw-landscape > img{object-position:54% 42%}
body[data-pf-lw][data-motion="off"] .pf-lw-landscape > img{transition:none}
@media(prefers-reduced-motion:reduce){body[data-pf-lw] .pf-lw-landscape > img{transition:none}}
@media(max-width:600px){body[data-pf-lw] .pf-lw-landscape > img{object-position:55% 50%}}

/* v0.8 alternate-world lighting. The illustrations already contain luminous twilight. */
body[data-pf-lw] .pf-lw-landscape[data-season="cyber"]{--pf-lw-light:brightness(1.03) saturate(.95);--pf-lw-tint:linear-gradient(180deg,#72aee316,transparent 70%)}
body[data-pf-lw]:is([data-time="dawn"],[data-time="day"][data-solar="dawn"]) .pf-lw-landscape[data-season="cyber"]{--pf-lw-light:brightness(.93) saturate(.88);--pf-lw-tint:linear-gradient(180deg,#ef9b6c32,transparent 65%)}
body[data-pf-lw]:is([data-time="dusk"],[data-time="day"][data-solar="dusk"]) .pf-lw-landscape[data-season="cyber"]{--pf-lw-light:brightness(.88) saturate(1.1);--pf-lw-tint:linear-gradient(180deg,#bd71d32b,transparent 75%)}
body[data-pf-lw][data-time="night"] .pf-lw-landscape[data-season="cyber"]{--pf-lw-light:brightness(.63) saturate(1.16);--pf-lw-tint:linear-gradient(180deg,#061c6555,transparent 65%)}
body[data-pf-lw] .pf-lw-landscape[data-season="mars"]{--pf-lw-light:brightness(1) saturate(.9);--pf-lw-tint:linear-gradient(180deg,#bb6d2912,transparent 70%);--pf-lw-weather-light:brightness(1);--pf-lw-weather-veil:linear-gradient(transparent,transparent)}
body[data-pf-lw]:is([data-time="dawn"],[data-time="day"][data-solar="dawn"]) .pf-lw-landscape[data-season="mars"]{--pf-lw-light:brightness(.86) saturate(.83);--pf-lw-tint:linear-gradient(180deg,#e99b6c38,transparent 70%)}
body[data-pf-lw]:is([data-time="dusk"],[data-time="day"][data-solar="dusk"]) .pf-lw-landscape[data-season="mars"]{--pf-lw-light:brightness(.82) saturate(1.09);--pf-lw-tint:linear-gradient(180deg,#ad492d38,transparent 65%)}
body[data-pf-lw][data-time="night"] .pf-lw-landscape[data-season="mars"]{--pf-lw-light:brightness(.55) saturate(.76);--pf-lw-tint:linear-gradient(180deg,#1d234657,transparent 65%)}
body[data-pf-lw]:is([data-sky="wind"],[data-sky="storm"],[data-sky="rain"],[data-sky="fog"],[data-sky="hail"]) .pf-lw-landscape[data-season="mars"]{--pf-lw-weather-light:brightness(.81) saturate(.76);--pf-lw-weather-veil:linear-gradient(180deg,#b47b5940,#bb754848 68%,transparent)}
body[data-pf-lw] .pf-lw-landscape:is([data-season="cyber"],[data-season="mars"]) .pf-lw-motion{filter:none}

/* v0.9: preserve the baked artwork's light sources while the Hub time state changes. */
body[data-pf-lw] .pf-lw-landscape[data-season="mystic"]{--pf-lw-light:brightness(1) saturate(1.04);--pf-lw-tint:linear-gradient(180deg,#b99aff12,transparent 60%)}
body[data-pf-lw]:is([data-time="dawn"],[data-time="day"][data-solar="dawn"]) .pf-lw-landscape[data-season="mystic"]{--pf-lw-light:brightness(.89) saturate(.91);--pf-lw-tint:linear-gradient(180deg,#ffd1ad34,transparent 70%)}
body[data-pf-lw]:is([data-time="dusk"],[data-time="day"][data-solar="dusk"]) .pf-lw-landscape[data-season="mystic"]{--pf-lw-light:brightness(.82) saturate(1.12);--pf-lw-tint:linear-gradient(180deg,#9274cd36,transparent 65%)}
body[data-pf-lw][data-time="night"] .pf-lw-landscape[data-season="mystic"]{--pf-lw-light:brightness(.48) saturate(.88);--pf-lw-tint:linear-gradient(180deg,#171d644a,transparent 65%)}
body[data-pf-lw] .pf-lw-landscape[data-season="clockwork"]{--pf-lw-light:brightness(1) saturate(.93);--pf-lw-tint:linear-gradient(180deg,#d7a86c12,transparent 60%)}
body[data-pf-lw]:is([data-time="dawn"],[data-time="day"][data-solar="dawn"]) .pf-lw-landscape[data-season="clockwork"]{--pf-lw-light:brightness(.90) saturate(.87);--pf-lw-tint:linear-gradient(180deg,#efc2a228,transparent 70%)}
body[data-pf-lw]:is([data-time="dusk"],[data-time="day"][data-solar="dusk"]) .pf-lw-landscape[data-season="clockwork"]{--pf-lw-light:brightness(.80) saturate(1.06);--pf-lw-tint:linear-gradient(180deg,#964e3938,transparent 65%)}
body[data-pf-lw][data-time="night"] .pf-lw-landscape[data-season="clockwork"]{--pf-lw-light:brightness(.45) saturate(.82);--pf-lw-tint:linear-gradient(180deg,#152b4c64,transparent 65%)}
body[data-pf-lw] .pf-lw-landscape:is([data-season="mystic"],[data-season="clockwork"]) .pf-lw-motion{filter:none}
body[data-pf-lw] .pf-lw-landscape[data-season="solaria"]{--pf-lw-tint:linear-gradient(180deg,#78ceb812,transparent 65%)}
body[data-pf-lw] .pf-lw-landscape[data-season="lost"]{--pf-lw-tint:linear-gradient(180deg,#e4ac7312,transparent 65%)}
body[data-pf-lw] .pf-lw-landscape[data-season="sakura"]{--pf-lw-tint:linear-gradient(180deg,#e3a5c912,transparent 65%)}
body[data-pf-lw] .pf-lw-landscape[data-season="corsair"]{--pf-lw-tint:linear-gradient(180deg,#e6b77312,transparent 65%)}
/* Static festive grading remains visible when motion is off. No flashing effects. */
body[data-pf-lw] .pf-lw-landscape:is([data-event-effect="lanterns"],[data-event-effect="lights"],[data-event-effect="harvest"])::after{box-shadow:inset 0 0 70px #f4b96122}
body[data-pf-lw] .pf-lw-landscape[data-event-effect="quiet"]::after{box-shadow:inset 0 0 75px #c3d5df18}
body[data-pf-lw] .pf-lw-landscape[data-event-effect="hearts"]::after{box-shadow:inset 0 0 90px #ff74a525}
`;
let sheet=null,nodes=[],observer=null,prepared=null,requestID=0,requested=null,calendarTimer=null;
const cache=new Map();
function load(season){
  if(cache.has(season))return cache.get(season);
  const assetURL=urlFor(season);
  const promise=new Promise((resolve,reject)=>{
    const img=new Image();
    img.onload=()=>resolve({season,url:assetURL});
    img.onerror=()=>reject(new Error('Season artwork unavailable: '+season));
    img.src=assetURL;
  }).catch(error=>{cache.delete(season);throw error});
  cache.set(season,promise);return promise;
}
async function loadWithFallback(season){
  try{return await load(season)}catch(error){if(isAlternate(season))return loadWithFallback(ordinarySeason());if(season==='harvest')throw error;return load('harvest')}
}
export async function prepare(){prepared=await loadWithFallback(selected());return prepared}
function display(asset){
  for(const node of nodes){const img=node.firstElementChild; if(img.src!==asset.url)img.src=asset.url;node.dataset.season=asset.season;}
  syncLegacy();
}
async function refresh(){
  if(!sheet)return;
  syncEvent();const season=selected();if(season===requested)return;
  requested=season;const id=++requestID;
  try{const asset=await loadWithFallback(season);if(sheet&&id===requestID)display(asset)}catch(error){/* Keep last usable scene; original is still available. */}
}
function remove(){stopUnderground();stopMotion();delete document.body.dataset.pfLwWorld;delete document.body.dataset.pfLwLegacyFestival;delete document.body.dataset.pfLwCave;document.body.style?.removeProperty?.('--pf-lw-cave-cover');++requestID;requested=null;observer?.disconnect();observer=null;nodes.forEach(n=>n.remove());nodes=[];sheet?.remove();sheet=null;document.removeEventListener('visibilitychange',refresh);document.removeEventListener('change',scenePreferenceChanged);if(calendarTimer!==null){window.clearInterval(calendarTimer);calendarTimer=null;}}
function scenePreferenceChanged(e){if(['valley-season','valley-holiday','valley-sky','valley-time'].includes(e.target?.id))refresh()}
export function activate(mode){
  if(!['enhanced','ultra'].includes(mode))return;
  const hosts=[...document.querySelectorAll('.valley-backdrop,.hero-landscape')];
  if(!hosts.length)throw new Error('Living World scene hosts not found');
  if(!prepared)throw new Error('Living World must prepare artwork before activation');
  if(!sheet){
    sheet=document.createElement('style');sheet.id='pf-lw-world-style';sheet.textContent=STYLE;document.head.append(sheet);
    for(const host of hosts){
      const layer=document.createElement('div');layer.className='pf-lw-landscape';layer.setAttribute('aria-hidden','true');
      const img=document.createElement('img');img.alt='';img.draggable=false;img.width=1672;img.height=941;img.decoding='async';layer.append(img);nodes.push(layer);
      const original=[...host.children].find(n=>n.tagName.toLowerCase()==='svg'&&n.classList.contains('valley-svg'))||[...host.children].find(n=>n.tagName.toLowerCase()==='svg');
      if(original)original.after(layer);else host.prepend(layer);const animals=original?.querySelector('.wildlife-layer');if(animals){const overlay=document.createElementNS('http://www.w3.org/2000/svg','svg');overlay.setAttribute('viewBox',original.getAttribute('viewBox'));overlay.setAttribute('preserveAspectRatio',original.getAttribute('preserveAspectRatio')||'xMidYMid slice');overlay.classList.add('pf-lw-legacy-animals');overlay.append(animals.cloneNode(true));layer.append(overlay);}
    }
    display(prepared);requested=prepared.season;syncEvent();
    observer=new MutationObserver(refresh);observer.observe(document.body,{attributes:true,attributeFilter:['data-season','data-holiday','data-sky','data-rainbow','data-pumpkin','data-jet','data-santa','data-flags']});
    document.addEventListener('visibilitychange',refresh);document.addEventListener('change',scenePreferenceChanged);
    if(typeof window!=='undefined'&&typeof window.setInterval==='function')calendarTimer=window.setInterval(refresh,60000);
  }
  document.body.dataset.pfLw=mode;startMotion();motion?.schedule();startUnderground();refresh();
}
document.addEventListener('pf-lw-mode',e=>{if(e.detail?.mode==='original')remove()});

/* v0.4 motion: all geometry uses the same uncropped master image coordinate system.
   No external requests, no input capture, no per-object DOM nodes. */
const MW=1672,MH=941;
const ROAD=[[.032,.548],[.07,.547],[.105,.545],[.14,.537],[.175,.530],[.203,.524],[.221,.516],[.228,.510],[.216,.502]];
const RIVER=[[.452,.507],[.484,.511],[.456,.525],[.458,.545],[.492,.567],[.56,.594],[.628,.617],[.716,.64],[.792,.671],[.865,.685],[.94,.698],[1,.703],[1,.789],[.96,.777],[.902,.752],[.836,.733],[.766,.711],[.706,.682],[.63,.65],[.563,.629],[.506,.601],[.459,.573],[.416,.552],[.416,.531]];
const RIVER_GLINTS=[[.443,.541],[.46,.545],[.482,.569],[.513,.588],[.549,.604],[.584,.618],[.62,.635],[.66,.647],[.70,.667],[.735,.683],[.773,.695],[.814,.708],[.849,.72],[.884,.733],[.92,.743],[.956,.756],[.991,.762]];
const LAMPS=[[.91,.535],[.879,.54],[.306,.491],[.342,.49],[.508,.471],[.593,.45],[.735,.485],[.758,.482],[.395,.455],[.648,.469],[.42,.486],[.84,.488]];
const DEER_PATH=[[.795,.438],[.805,.438],[.815,.439],[.824,.438],[.835,.438]];
const frac=n=>n-Math.floor(n), clamp=(n,a,b)=>Math.max(a,Math.min(b,n)), mix=(a,b,t)=>a+(b-a)*t;
function hash(n){return frac(Math.sin(n*127.1+39.74)*43758.5453)}
export function coverGeometry(w,h,iw=MW,ih=MH,px=.54,py=.5){const scale=Math.max(w/iw,h/ih);return {scale,x:(w-iw*scale)*px,y:(h-ih*scale)*py,width:iw*scale,height:ih*scale}}
export function routePoint(route,t){const u=clamp(t,0,1)*(route.length-1),i=Math.min(Math.floor(u),route.length-2),f=u-i,a=route[i],b=route[i+1];return {x:mix(a[0],b[0],f)*MW,y:mix(a[1],b[1],f)*MH,angle:Math.atan2((b[1]-a[1])*MH,(b[0]-a[0])*MW)}}
export function motionBudget(mode,intensity='normal',weak=false){const ultra=mode==='ultra'&&!weak, factor=intensity==='subtle'?.55:intensity==='lively'?1.2:1;return {fps:weak?15:ultra?30:24,dpr:ultra?1.5:1,pixels:ultra?1800000:950000,clouds:ultra?4:2,glints:Math.round((ultra?36:18)*factor),birds:Math.round((ultra?7:4)*factor),leaves:Math.round((ultra?14:5)*factor),traffic:ultra?3:1,patches:ultra,wildlife:ultra||!weak}}
/* v0.13 adaptive quality: sustained render pressure lowers the budget;
   sustained headroom recovers one step. Pause resets measurement, not quality. */
export function createGovernor(device={}){
 const modest=(Number(device.deviceMemory)>0&&Number(device.deviceMemory)<=4)||(Number(device.hardwareConcurrency)>0&&Number(device.hardwareConcurrency)<=2);
 let level=modest?1:0,pressure=0,headroom=0;
 return {get level(){return level},reset(){pressure=0;headroom=0},sample(dt,cost,fps){
  if(!Number.isFinite(dt)||!Number.isFinite(cost)||dt<=0)return level;
  const target=1000/fps, overloaded=dt>target*1.8||cost>target*.70, comfortable=dt<=target*1.35&&cost<target*.30;
  if(overloaded){pressure+=1;headroom=0}else{pressure=Math.max(0,pressure-1);headroom=comfortable?headroom+1:0}
  if(pressure>=10&&level<2){level++;pressure=0;headroom=0}
  if(headroom>=120&&level>(modest?1:0)){level--;pressure=0;headroom=0}return level;
 }};
}
export function adaptiveBudget(mode,intensity,level=0,visible=1,cave=false){
 const effective=level===0?mode:'enhanced',weak=level>=2, b=(cave?foundryBudget:motionBudget)(effective,intensity,weak);
 if(level===1){b.dpr=Math.min(b.dpr,.85);b.pixels=650000;b.fps=24}
 if(weak){b.dpr=.65;b.pixels=380000;b.fps=15}
 b.pixels=Math.floor(b.pixels/Math.max(1,visible));return {...b,effective,weak};
}
const renderNow=()=>typeof performance!=='undefined'?performance.now():Date.now();
const deviceHints=()=>typeof navigator!=='undefined'?navigator:{};
function shrinkCanvas(canvas,ctx){ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);canvas.width=1;canvas.height=1}
function releasePatches(s){for(const p of s.patches||[]){if(p?.c){p.c.width=1;p.c.height=1}}s.patches=[];s.patchSrc=null}
function path(ctx,points){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x*MW,y*MH):ctx.moveTo(x*MW,y*MH));ctx.closePath()}
function ellipse(ctx,x,y,rx,ry,color){ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=color;ctx.fill()}
function cloud(ctx,x,y,rx,ry,alpha){ctx.save();ctx.translate(x,y);ctx.scale(rx,ry);const g=ctx.createRadialGradient(0,0,.05,0,0,1);g.addColorStop(0,`rgba(242,249,255,${alpha})`);g.addColorStop(.42,`rgba(226,239,250,${alpha*.6})`);g.addColorStop(1,'rgba(226,239,250,0)');ctx.fillStyle=g;ctx.fillRect(-1,-1,2,2);ctx.restore()}
function makePatch(img,box){const [x,y,w,h]=box, c=document.createElement('canvas');c.width=Math.round(w*MW);c.height=Math.round(h*MH);const p=c.getContext('2d');if(!p)return null;
 p.drawImage(img,x*img.naturalWidth,y*img.naturalHeight,w*img.naturalWidth,h*img.naturalHeight,0,0,c.width,c.height);p.globalCompositeOperation='destination-in';p.save();p.translate(c.width/2,c.height/2);p.scale(c.width/2,c.height/2);const g=p.createRadialGradient(0,0,.05,0,0,1);g.addColorStop(0,'#fff');g.addColorStop(.56,'#ffffffd9');g.addColorStop(1,'#ffffff00');p.fillStyle=g;p.fillRect(-1,-1,2,2);p.restore();return {c,x:x*MW,y:y*MH};}
function branchSway(ctx,s,t,wind){const img=s.layer.firstElementChild;if(!img?.complete||!img.naturalWidth)return;
 if(s.patchSrc!==img.src){releasePatches(s);s.patches=[[.085,.035,.16,.16],[.32,.67,.17,.16],[.60,.75,.17,.17]].map(b=>makePatch(img,b)).filter(Boolean);s.patchSrc=img.src}
 for(let i=0;i<s.patches.length;i++){const p=s.patches[i],a=(i===0?2.2:1.35)*wind;ctx.drawImage(p.c,p.x+Math.sin(t*.85+i*1.7)*a,p.y+Math.sin(t*.62+i)*a*.48)}
}
function drawTraffic(ctx,t,b,night){for(let i=0;i<b.traffic;i++){const dur=[48,56,76][i],p=frac(t/dur+i*.37+.19),rev=i===1,u=rev?1-p:p;
 // Vehicles fade in/out at the visible ends of the winding road.
 const fade=Math.min(1,p*12,(1-p)*12),q=routePoint(ROAD,u),z=mix(1,.44,u),a=q.angle+(rev?Math.PI:0),truck=i===1,tractor=i===2;
 ctx.save();ctx.translate(q.x,q.y-1.2*z);ctx.rotate(a);ctx.scale(z,z);ctx.globalAlpha=fade*.95;
 const length=truck?17:tractor?12:13;ellipse(ctx,0,2,length*.57,2.6,'#17232b80');ctx.fillStyle='#22292c';ctx.fillRect(-length*.4,1.6,3.1,2.7);ctx.fillRect(length*.22,1.6,3,2.7);
 ctx.fillStyle=tractor?'#55794a':truck?'#d7cbb5':'#a23d31';ctx.fillRect(-length/2,-2,length,4.8);ctx.fillStyle=truck?'#8d9799':'#c9d7df';ctx.fillRect(-1,-3.8,4.4,2.8);ctx.fillStyle='#5b7280';ctx.fillRect(1.1,-2,2.1,2.3);
 if(night){ctx.fillStyle='#fff5bc';ctx.fillRect(length/2-1,-1.3,2.4,2);ctx.fillStyle='#ef5f48';ctx.fillRect(-length/2,-1.5,1.7,2.1)}ctx.restore();}}
function drawBirds(ctx,t,b,sky,night){if(night||['storm','drizzle','rain','snow','hail','freezing','sleet','fog','wind'].includes(sky))return;const phase=frac(t/46+.15);if(phase>.86)return;
 for(let i=0;i<b.birds;i++){const x=(.24+phase*.78-i*.014)*MW,y=(.21+Math.sin(phase*4.9)*.023+Math.floor(i/2)*.012+(i%2)*.007)*MH;
 if(x>MW+14)continue;const size=3.4+hash(i+16)*2.7,flap=Math.sin(t*5.1+i*.74)*size*.7;ctx.save();ctx.translate(x,y);ctx.globalAlpha=Math.min(1,phase*14,(.86-phase)*14)*.82;ctx.strokeStyle='#263b48';ctx.lineWidth=1.15;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-size,-flap);ctx.quadraticCurveTo(-size*.6,-flap-1,0,1);ctx.quadraticCurveTo(size*.6,-flap-1,size,-flap);ctx.stroke();ctx.restore();}}
function drawDeer(ctx,t,night,season){const phase=frac(t/77+.36);if(phase<.25||phase>.65||night||season==='winter')return;for(let i=0;i<2;i++){const q=routePoint(DEER_PATH,clamp((phase-.25)/.4-i*.15,0,1));ctx.save();ctx.translate(q.x,q.y);ctx.scale(.65,.65);ctx.globalAlpha=Math.min(.85,(phase-.25)*15,(.65-phase)*15);ctx.fillStyle='#816044';ellipse(ctx,-1,-4,5.5,2.7,'#816044');ctx.beginPath();ctx.moveTo(1,-5);ctx.lineTo(4,-10);ctx.lineTo(7,-10);ctx.lineTo(7.8,-8.4);ctx.lineTo(4.5,-7.6);ctx.lineTo(3,-3);ctx.fill();ctx.strokeStyle='#504735';ctx.lineWidth=1.2;for(let j=0;j<4;j++){const xx=j<2?-4:2,step=Math.sin(t*5+j*1.7+i)*1.2;ctx.beginPath();ctx.moveTo(xx,-2);ctx.lineTo(xx+step,2.4);ctx.stroke()}ctx.restore()}}
/* v0.5 weather: resolved scene attributes only. No additional weather service.
   One shared canvas per scene; normalized master coordinates for fog and water,
   viewport coordinates for precipitation so cover-cropping never creates gaps. */
const WEATHER=Object.freeze({
 sunny:    {rain:0,snow:0,ice:0,mist:0,overcast:0,wind:0.8},
 partly:   {rain:0,snow:0,ice:0,mist:.08,overcast:.13,wind:1},
 cloudy:   {rain:0,snow:0,ice:0,mist:.22,overcast:.66,wind:1.05},
 drizzle:  {rain:.30,snow:0,ice:0,mist:.38,overcast:.60,wind:1.05},
 rain:     {rain:.85,snow:0,ice:0,mist:.48,overcast:.78,wind:1.45},
 storm:    {rain:1,snow:0,ice:0,mist:.56,overcast:1,wind:2.15,lightning:true},
 snow:     {rain:0,snow:1,ice:0,mist:.38,overcast:.52,wind:1.15},
 sleet:    {rain:.43,snow:.38,ice:.4,mist:.36,overcast:.76,wind:1.4},
 freezing: {rain:.42,snow:0,ice:.25,mist:.40,overcast:.69,wind:1.1,frost:true},
 hail:     {rain:.36,snow:0,ice:1,mist:.32,overcast:.85,wind:1.7},
 fog:      {rain:0,snow:0,ice:0,mist:1,overcast:.40,wind:.48},
 wind:     {rain:0,snow:0,ice:0,mist:.13,overcast:.25,wind:2.4},
 frost:    {rain:0,snow:0,ice:0,mist:.35,overcast:.08,wind:.65,frost:true}
});
export function weatherProfile(sky){return Object.hasOwn(WEATHER,sky)?WEATHER[sky]:WEATHER.partly}
export function weatherBudget(mode,intensity='normal',weak=false){const ultra=mode==='ultra'&&!weak,f=intensity==='subtle'?.55:intensity==='lively'?1.2:1;return {rain:Math.round((weak?58:ultra?240:125)*f),snow:Math.round((weak?45:ultra?155:80)*f),ice:Math.round((weak?20:ultra?65:32)*f),mist:weak?2:ultra?7:4,clouds:weak?2:ultra?6:3,ripples:weak?4:ultra?18:9,wind:weak?5:ultra?18:9,lightning:!weak};}
function weatherMist(ctx,t,p,b,night){
 if(p.overcast>.2){ // soft layered cloud banks sit above the actual mountains
  for(let i=0;i<b.clouds;i++){const x=(frac(t*.003*p.wind+hash(i+473))*1.4-.2)*MW,y=(.06+hash(i+481)*.14)*MH;cloud(ctx,x,y,220+hash(i+461)*160,55+hash(i+488)*42,p.overcast*(night?.23:.36));}
 }
 if(p.mist<.2)return;
 // Fog banks hug the foothills and river, with varying depth, rather than a full-page white screen.
 for(let i=0;i<b.mist;i++){const phase=frac(t*.008*p.wind+hash(i+510)),x=(-.25+phase*1.5)*MW,y=(.40+hash(i+522)*.22)*MH;cloud(ctx,x,y,(.22+hash(i+534)*.16)*MW,(.021+hash(i+536)*.041)*MH,p.mist*(night?.24:.43));}
 if(p.rain>.25){ // wet river ripples, clipped to the original water corridor
  ctx.save();path(ctx,RIVER);ctx.clip();for(let i=0;i<b.ripples;i++){const q=RIVER_GLINTS[i%RIVER_GLINTS.length],phase=frac(t*.8+hash(i+570)),x=(q[0]+(hash(i+577)-.5)*.014)*MW,y=q[1]*MH;ctx.strokeStyle=`rgba(208,232,243,${(1-phase)*.45*p.rain})`;ctx.lineWidth=.8;ctx.beginPath();ctx.ellipse(x,y,2+phase*8,.7+phase*2,0,0,Math.PI*2);ctx.stroke()}ctx.restore();
 }
}
// A single, short, localized distant fork with a slow fade, no screen-wide flash.
export function lightningStrength(t){const cycle=Math.floor(t/31),start=9+hash(cycle+811)*14,p=t%31-start;return p>=0&&p<.8?Math.sin(Math.PI*p/.8)*.65:0}
function weatherLightning(ctx,t,p,b){if(!p.lightning||!b.lightning)return;const a=lightningStrength(t);if(a<=0)return;const x=(.64+hash(Math.floor(t/31)+847)*.20)*MW,y=.13*MH;ctx.save();cloud(ctx,x,y+45,95,49,a*.38);ctx.strokeStyle=`rgba(221,235,255,${a})`;ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-22,y+27);ctx.lineTo(x+2,y+36);ctx.lineTo(x-16,y+74);ctx.moveTo(x+2,y+36);ctx.lineTo(x+23,y+52);ctx.lineTo(x+12,y+65);ctx.stroke();ctx.restore()}
function weatherParticles(ctx,t,p,b,w,h,night){
 // Use a capped render resolution and scale sizes independently of DPR.
 const unit=clamp(Math.min(w/1200,h/675),.55,1.5), countFactor=clamp(w*h/(900*500),.35,1);
 const rain=Math.round(b.rain*p.rain*countFactor),snow=Math.round(b.snow*p.snow*countFactor),ice=Math.round(b.ice*p.ice*countFactor);
 for(let layer=0;layer<3;layer++){
  const depth=[.48,.78,1.1][layer],speed=[.55,.82,1.16][layer],alpha=[.19,.31,.46][layer]*(night?1.25:1);
  const n=Math.floor(rain/3)+(layer<rain%3?1:0);if(!n)continue;
  ctx.strokeStyle=`rgba(204,229,247,${alpha})`;ctx.lineWidth=depth*unit;ctx.beginPath();
  for(let i=0;i<n;i++){const k=i+layer*313,phase=frac(t*(.48+hash(k+650)*.36)*speed+hash(k+601)),x=frac(hash(k+607)+t*.038*p.wind*depth)*w,y=phase*h,len=(7+hash(k+623)*12)*depth*unit;ctx.moveTo(x,y);ctx.lineTo(x-len*.29*p.wind,y-len)}ctx.stroke();
 }
 for(let i=0;i<snow;i++){const d=[.45,.8,1.25][i%3],phase=frac(hash(i+701)+t*(.024+hash(i+708)*.023)*d),x=frac(hash(i+712)+t*.007*p.wind*d+Math.sin(t*.8+i)*.013*d)*w,y=phase*h,r=(1.1+hash(i+725)*1.5)*d*unit;ctx.fillStyle=`rgba(250,253,255,${.33+d*.28})`;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
 for(let i=0;i<ice;i++){const phase=frac(hash(i+750)+t*(.56+hash(i+751)*.27)),x=frac(hash(i+756)+t*.023*p.wind)*w,y=phase*h,r=(.8+hash(i+765)*1.35)*unit;ctx.strokeStyle='#b7d9f0b0';ctx.lineWidth=unit;ctx.beginPath();ctx.moveTo(x-r*p.wind,y-r*2);ctx.lineTo(x,y);ctx.stroke();ellipse(ctx,x,y,r,r,'#edf7ffd1')}
 if(p.wind>1.8){ctx.strokeStyle='rgba(236,246,238,.18)';ctx.lineWidth=unit;ctx.beginPath();for(let i=0;i<b.wind;i++){const phase=frac(t*.18+hash(i+782)),x=phase*w,y=(.49+hash(i+785)*.43)*h;ctx.moveTo(x,y);ctx.quadraticCurveTo(x+18*unit,y-5*unit,x+34*unit,y-2*unit)}ctx.stroke()}
}

/* Alternate motion: do not animate Earth's orchard/deer/roads on the new geography. */
const ALT_ROUTES={cyberRail:[[.60,.447],[.70,.450],[.81,.424],[.91,.390],[1,.365]],cyberAir:[[.12,.20],[.35,.16],[.62,.18],[.89,.12]],marsRoad:[[.245,.842],[.278,.848],[.315,.863],[.354,.882],[.405,.882]],marsAir:[[.12,.31],[.32,.20],[.62,.18],[.88,.23]]};
const ALT_WATER={cyber:[[.41,.56],[.45,.60],[.49,.625],[.56,.655],[.65,.688],[.74,.72],[.84,.76],[.94,.79]],mars:[[.36,.66],[.40,.70],[.45,.73],[.49,.77],[.54,.80],[.61,.83],[.67,.85]]};
const ALT_LIGHTS={cyber:[[.722,.20],[.725,.31],[.768,.41],[.51,.41],[.25,.43],[.85,.515],[.905,.52]],mars:[[.35,.51],[.38,.54],[.71,.50],[.82,.51],[.93,.58],[.55,.68]]};
export function alternateBudget(mode,intensity='normal',weak=false){const u=mode==='ultra'&&!weak,f=intensity==='subtle'?.6:intensity==='lively'?1.2:1;return {air:weak?1:u?3:1,lights:weak?3:u?7:4,dust:Math.round((weak?12:u?70:34)*f),reflections:weak?4:u?18:9,rail:u?2:1,rovers:u?2:1};}
export function marsDustStrength(sky){const p=weatherProfile(sky);return clamp(.20+p.wind*.16+p.rain*.32+p.mist*.35+p.ice*.18,.25,1)}
function altAircraft(ctx,route,t,n,mars){for(let i=0;i<n;i++){const phase=frac(t/(26+7*i)+i*.37+.15),q=routePoint(route,phase),a=Math.min(1,phase*10,(1-phase)*10);ctx.save();ctx.translate(q.x,q.y+Math.sin(t*.75+i)*6);ctx.globalAlpha=a*.85;ctx.fillStyle=mars?'#d9ab79':'#a7c7dc';ctx.beginPath();ctx.moveTo(-12,0);ctx.lineTo(-5,-4);ctx.lineTo(8,-3);ctx.lineTo(13,1);ctx.lineTo(4,4);ctx.lineTo(-8,3);ctx.closePath();ctx.fill();ellipse(ctx,1,-3,4,2,'#263747');glow(ctx,-10,3,15,4,mars?'255,183,91':'65,220,255',.45);ellipse(ctx,-8,3,2,1.5,mars?'#ffd499':'#83e9ff');ctx.restore()}}
function drawAlternate(ctx,t,b,state,world){const night=state.night,ab=alternateBudget(state.mode,state.intensity,state.weak),mars=world==='mars';
 const water=ALT_WATER[world];for(let i=0;i<ab.reflections;i++){const q=water[i%water.length],phase=frac(t*.35+hash(i+1400)),x=(q[0]+(hash(i+1410)-.5)*.008)*MW,y=(q[1]+(hash(i+1430)-.5)*.01)*MH;ctx.strokeStyle=`rgba(${mars?'255,192,116':i%2?'88,233,255':'244,115,230'},${Math.sin(phase*Math.PI)*.6})`;ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x+5+hash(i+1440)*14,y);ctx.stroke()}
 const lights=ALT_LIGHTS[world];for(let i=0;i<Math.min(ab.lights,lights.length);i++){const [x,y]=lights[i],a=.18+.19*(.5+.5*Math.sin(t*.55+i*1.8));glow(ctx,x*MW,y*MH,14,17,mars?'255,196,102':i%2?'240,103,255':'56,203,255',a);}
 altAircraft(ctx,mars?ALT_ROUTES.marsAir:ALT_ROUTES.cyberAir,t,ab.air,mars);
 if(mars){for(let i=0;i<ab.rovers;i++){const phase=frac(state.trafficClock/38+i*.42+.22),q=routePoint(ALT_ROUTES.marsRoad,phase);ctx.save();ctx.translate(q.x,q.y);ctx.globalAlpha=Math.min(1,phase*8,(1-phase)*8);ctx.fillStyle='#252025';ctx.fillRect(-10,0,20,5);ctx.fillStyle='#786c62';ctx.fillRect(-8,-5,16,6);ctx.fillStyle='#e5ba94';ctx.fillRect(-5,-9,9,4);ellipse(ctx,-6,4,3.5,3.5,'#282024');ellipse(ctx,6,4,3.5,3.5,'#282024');glow(ctx,10,-2,10,4,'255,198,110',.50);ctx.restore()}}
 else{for(let i=0;i<ab.rail;i++){const phase=frac(state.trafficClock/18+i*.45+.28),q=routePoint(ALT_ROUTES.cyberRail,phase),next=routePoint(ALT_ROUTES.cyberRail,Math.min(1,phase+.015)),angle=Math.atan2(next.y-q.y,next.x-q.x);ctx.save();ctx.translate(q.x,q.y-7);ctx.rotate(angle);ctx.globalAlpha=Math.min(.9,phase*10,(1-phase)*10);for(let j=0;j<3;j++){ctx.fillStyle='#324460';ctx.fillRect(-22-j*28,-6,25,10);ctx.fillStyle='#72ddff';ctx.fillRect(-19-j*28,-3,17,3);ctx.fillStyle='#d874ff';ctx.fillRect(-20-j*28,3,19,1.5)}ctx.restore()}}
}
function marsDust(ctx,t,b,w,h,sky){const strength=marsDustStrength(sky),n=Math.round(b.dust*strength),unit=clamp(Math.min(w/1200,h/675),.5,1.5);for(let i=0;i<n;i++){const x=frac(hash(i+1890)+t*.027*strength*(.5+hash(i+1892)))*w,y=(.27+.70*hash(i+1893)+Math.sin(t*.65+i)*.018)*h;ctx.fillStyle=`rgba(242,168,107,${.10+hash(i+1894)*.20})`;ctx.beginPath();ctx.arc(x,y,(.6+hash(i+1895)*1.4)*unit,0,Math.PI*2);ctx.fill()}if(strength>.7){for(let i=0;i<3;i++){const x=(frac(t*.009+hash(i+1701))*1.4-.2)*w;glow(ctx,x,h*(.58+i*.12),w*.33,h*.08,'210,130,77',strength*.19)}}}

/* v0.9 — magic and steam share the existing cropped canvas, not an additional loop. */
const FANTASY={
 mystic:{air:[[.36,.19],[.49,.16],[.65,.20],[.78,.23]],falls:[[.75,.085,.12],[.78,.325,.08],[.856,.33,.05],[.912,.35,.05]],lights:[[.132,.266],[.42,.42],[.516,.393],[.639,.55],[.81,.27],[.927,.21],[.90,.525],[.115,.81]],water:[[.434,.51],[.46,.55],[.55,.59],[.65,.627],[.75,.656],[.86,.69],[.95,.73]]},
 clockwork:{air:[[.30,.145],[.45,.105],[.63,.11],[.80,.16],[.97,.19]],rail:[[.045,.543],[.11,.535],[.17,.525],[.21,.506],[.223,.49],[.212,.477]],steam:[[.291,.25,.8],[.295,.25,.6],[.414,.38,1],[.93,.22,.8],[.945,.218,.85],[.973,.42,1],[.134,.44,.8]],gears:[{x:.728,y:.57,r:31,speed:.37}],lights:[[.577,.36],[.74,.285],[.69,.419],[.901,.51],[.135,.77],[.685,.83]],water:[[.45,.50],[.48,.54],[.55,.58],[.63,.62],[.73,.65],[.85,.70],[.94,.74]]}
};
export function fantasyBudget(mode,intensity='normal',weak=false){const u=mode==='ultra'&&!weak,f=intensity==='subtle'?.6:intensity==='lively'?1.2:1;return {air:weak?1:u?2:1,motes:Math.round((weak?6:u?36:18)*f),water:weak?6:u?24:12,lights:weak?3:u?8:5,steam:Math.round((weak?6:u?30:15)*f),gears:u?1:0,rail:1}}
function fantasyDragon(ctx,q,t,i,alpha){const flap=Math.sin(t*2.4+i)*7;ctx.save();ctx.translate(q.x,q.y);ctx.globalAlpha=alpha*.75;ctx.fillStyle='#383557';ctx.beginPath();ctx.moveTo(0,1);ctx.quadraticCurveTo(-8,-10-flap,-26,-10-flap);ctx.lineTo(-19,1);ctx.lineTo(-12,-2);ctx.lineTo(-5,4);ctx.lineTo(0,1);ctx.quadraticCurveTo(10,-10-flap,24,-9-flap);ctx.lineTo(19,1);ctx.lineTo(11,-2);ctx.lineTo(6,4);ctx.closePath();ctx.fill();ellipse(ctx,0,1,10,2.2,'#302834');ellipse(ctx,9,-1,3,2,'#302834');ctx.strokeStyle='#302834';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-8,2);ctx.quadraticCurveTo(-17,8,-28,3);ctx.stroke();ctx.restore()}
function fantasyAirship(ctx,q,t,i,alpha){ctx.save();ctx.translate(q.x,q.y+Math.sin(t*.6+i)*4);ctx.globalAlpha=alpha*.88;ellipse(ctx,0,0,25,9,'#b9a790');ctx.strokeStyle='#8b5d2c';ctx.lineWidth=1.2;ctx.beginPath();ctx.ellipse(0,0,25,9,0,0,Math.PI*2);ctx.stroke();for(let x=-15;x<=15;x+=10){ctx.beginPath();ctx.moveTo(x,-8);ctx.lineTo(x,8);ctx.stroke()}ctx.fillStyle='#68472b';ctx.fillRect(-8,8,16,6);ctx.fillStyle='#fbd49a';ctx.fillRect(-5,9,3,2);ctx.fillRect(2,9,3,2);ctx.beginPath();ctx.moveTo(-23,0);ctx.lineTo(-32,-6);ctx.lineTo(-32,7);ctx.closePath();ctx.fill();ctx.restore()}
function drawFantasy(s,t,state,world){const ctx=s.ctx,g=FANTASY[world],mystic=world==='mystic',b=fantasyBudget(state.mode,state.intensity,state.weak),night=state.night,p=weatherProfile(state.sky),a=mystic?'100,221,255':'255,192,105';
 for(let i=0;i<b.water;i++){const q=g.water[i%g.water.length],f=frac(t*.3+hash(i+2200)),x=(q[0]+(hash(i+2201)-.5)*.008)*MW,y=(q[1]+(hash(i+2202)-.5)*.012)*MH;ctx.strokeStyle=`rgba(${a},${Math.sin(f*Math.PI)*.58})`;ctx.lineWidth=1.35;ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x+5+hash(i+2210)*12,y);ctx.stroke()}
 for(let i=0;i<Math.min(b.lights,g.lights.length);i++){const [x,y]=g.lights[i];glow(ctx,x*MW,y*MH,12,18,mystic?(i%3===0?'255,211,134':'112,221,255'):'255,174,65',.18+.13*Math.sin(t*.6+i)+ (night?.16:0))}
 if(p.overcast<.96&&p.mist<.85){for(let i=0;i<b.air;i++){const f=frac(t/(mystic?42+i*13:70+i*17)+.18+i*.53),q=routePoint(g.air,f),fade=Math.min(1,f*9,(1-f)*9);if(mystic)fantasyDragon(ctx,q,t,i,fade);else fantasyAirship(ctx,q,t,i,fade)}}
 if(mystic){for(const [x,y,len] of g.falls){ctx.save();ctx.beginPath();ctx.rect(x*MW-5,y*MH,10,len*MH);ctx.clip();for(let i=0;i<(state.mode==='ultra'&&!state.weak?6:3);i++){const f=frac(t*.83+i*.23),yy=(y+f*len)*MH;ctx.strokeStyle=`rgba(181,238,255,${Math.sin(f*Math.PI)*.42})`;ctx.lineWidth=1.1;ctx.beginPath();ctx.moveTo(x*MW-3+i,yy);ctx.lineTo(x*MW-3+i,yy+11);ctx.stroke()}ctx.restore()}
  for(let i=0;i<b.motes;i++){const f=frac(t*.07+hash(i+2290)),x=(.06+hash(i+2291)*.86+Math.sin(t*.45+i)*.012)*MW,y=(.88-hash(i+2292)*.28-f*.07)*MH;glow(ctx,x,y,4,4,i%3?'255,220,127':'111,223,255',Math.sin(f*Math.PI)*.43);ellipse(ctx,x,y,1.2,1.2,`rgba(255,239,184,${Math.sin(f*Math.PI)*.7})`)}}
 else{for(let i=0;i<b.steam;i++){const [x,y,k]=g.steam[i%g.steam.length],f=frac(t*.10+hash(i+2350)),rx=(4+18*f)*k;glow(ctx,x*MW+f*18*p.wind,y*MH-f*63*k,rx,rx*.79,'228,223,208',Math.sin(f*Math.PI)*.24)}
  const f=frac(state.trafficClock/23+.07),q=routePoint(g.rail,f);ctx.save();ctx.translate(q.x,q.y-6);ctx.rotate(q.angle);ctx.globalAlpha=Math.min(1,f*12,(1-f)*12);ctx.fillStyle='#4d3928';ctx.fillRect(-19,-7,29,9);ctx.fillStyle='#b17b3c';ctx.fillRect(-17,-7,10,6);ctx.fillRect(-4,-10,8,9);ctx.fillStyle='#f8d49a';ctx.fillRect(-15,-6,5,3);ellipse(ctx,-12,3,3,3,'#2d2723');ellipse(ctx,4,3,3,3,'#2d2723');glow(ctx,10,-3,10,4,'255,210,120',.55);ctx.restore();
  const img=s.layer.firstElementChild;if(b.gears&&img.complete&&img.naturalWidth){if(s.fantasyGearSrc!==img.src){s.fantasyGearSrc=img.src;s.fantasyGears=g.gears.map(gear=>sourceGear(img,gear))}for(let i=0;i<Math.min(b.gears,g.gears.length);i++){const gear=g.gears[i],patch=s.fantasyGears[i];if(!patch)continue;ctx.save();ctx.translate(gear.x*MW,gear.y*MH);ctx.rotate(t*gear.speed);ctx.globalAlpha=.9;ctx.drawImage(patch,-gear.r,-gear.r);ctx.restore()}}}
}

/* v0.10 — additional alternate realities, using the shared motion canvas. */
const BEYOND={
 solaria:{water:[[.40,.57],[.48,.61],[.60,.65],[.73,.70],[.87,.75]],falls:[[.62,.55,.09],[.80,.70,.025]],route:[[.62,.44],[.76,.42],[.88,.38],[.97,.35]],lights:[[.72,.14],[.89,.51],[.54,.40]],color:'114,244,215'},
 lost:{water:[[.30,.59],[.46,.61],[.57,.69],[.73,.79],[.91,.85]],falls:[[.23,.39,.16]],route:[[.32,.19],[.49,.16],[.67,.20],[.87,.17]],lights:[[.82,.17]],color:'255,193,115'},
 sakura:{water:[[.35,.56],[.48,.62],[.61,.67],[.74,.73],[.88,.79]],falls:[[.62,.34,.10],[.80,.30,.11]],route:[[.37,.56],[.48,.61],[.61,.67],[.74,.73],[.88,.79]],lights:[[.14,.40],[.29,.69],[.84,.45],[.80,.23]],color:'255,184,206'},
 corsair:{water:[[.48,.87],[.60,.87],[.72,.85],[.84,.88]],falls:[],route:[[.48,.85],[.60,.85],[.72,.84],[.84,.87]],lights:[[.10,.38],[.66,.43]],color:'255,211,130'}
};
export function beyondBudget(mode,intensity='normal',weak=false){let u=mode==='ultra'&&!weak,f=intensity==='subtle'?.55:intensity==='lively'?1.2:1;return {water:weak?5:u?24:12,particles:Math.round((weak?7:u?40:18)*f),vehicles:weak?1:u?2:1}}
function sail(ctx,q,t,alpha,pirate){ctx.save();ctx.translate(q.x,q.y+Math.sin(t*1.1)*1.8);ctx.globalAlpha=alpha;ctx.fillStyle='#513b2c';ctx.beginPath();ctx.moveTo(-19,-2);ctx.lineTo(19,-2);ctx.lineTo(12,6);ctx.lineTo(-12,6);ctx.closePath();ctx.fill();ctx.strokeStyle='#513b2c';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,-26);ctx.stroke();ctx.fillStyle=pirate?'#ded1ae':'#f0c6aa';ctx.beginPath();ctx.moveTo(1,-25);ctx.quadraticCurveTo(16,-16,11,-7);ctx.lineTo(1,-6);ctx.closePath();ctx.fill();ctx.restore()}
function drawBeyond(s,t,state,world){const ctx=s.ctx,g=BEYOND[world],b=beyondBudget(state.mode,state.intensity,state.weak),p=weatherProfile(state.sky);
 for(let i=0;i<b.water;i++){let q=g.water[i%g.water.length],f=frac(t*.32+hash(i+4100)),x=(q[0]+(hash(i+4101)-.5)*.03)*MW,y=(q[1]+(hash(i+4102)-.5)*.025)*MH;ctx.strokeStyle=`rgba(${g.color},${Math.sin(f*Math.PI)*.55})`;ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(x-6,y);ctx.lineTo(x+10,y);ctx.stroke()}
 for(const [x,y,len] of g.falls){for(let i=0;i<5;i++){let f=frac(t*.74+i*.21);ctx.strokeStyle=`rgba(220,246,255,${Math.sin(f*Math.PI)*.45})`;ctx.beginPath();ctx.moveTo(x*MW+i*2,(y+len*f)*MH);ctx.lineTo(x*MW+i*2,(y+len*f)*MH+8);ctx.stroke()}}
 for(const [x,y] of g.lights)glow(ctx,x*MW,y*MH,15,13,g.color,.15+.10*Math.sin(t*.7)+(state.night?.15:0));
 if(world==='sakura'){for(let i=0;i<b.particles;i++){let x=frac(hash(i+4300)+t*.012*p.wind)*MW,y=frac(hash(i+4301)+t*.018)*MH;ctx.save();ctx.translate(x,y);ctx.rotate(t*.6+i);ellipse(ctx,0,0,3.3,1.7,'#f8a8cacc');ctx.restore()}}
 if(world==='lost'){for(let i=0;i<b.particles;i++){let f=frac(t*.08+hash(i+4400));glow(ctx,(.83+f*.035)*MW,(.16-f*.12)*MH,9+f*19,7+f*14,'113,104,101',Math.sin(f*Math.PI)*.16)} }
 for(let i=0;i<b.vehicles;i++){let f=frac(t/(world==='corsair'?65:40)+i*.49+.14),q=routePoint(g.route,f),alpha=Math.min(1,f*10,(1-f)*10);if(world==='lost'){if(p.overcast<.9)fantasyDragon(ctx,q,t,i,alpha)}else if(world==='solaria'){ctx.save();ctx.translate(q.x,q.y-5);ctx.rotate(q.angle);ctx.globalAlpha=alpha;for(let j=0;j<3;j++){ctx.fillStyle='#e3f2e9';ctx.fillRect(-20-j*23,-5,21,8);ctx.fillStyle='#377b9d';ctx.fillRect(-18-j*23,-3,17,3)}ctx.restore()}else sail(ctx,q,t,alpha,world==='corsair')}
}

/* v0.11: calendar animations share the existing surface canvas and scheduler. */
export function eventBudget(mode,intensity='normal',weak=false){return Math.max(3,Math.round((weak?5:mode==='ultra'?22:12)*(intensity==='subtle'?.6:intensity==='lively'?1.2:1)))}
function eventShape(ctx,kind,x,y,size,t){ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(t)*.16);ctx.lineWidth=1.3;
 if(kind==='hearts'){ctx.fillStyle='#f7a2b9';ctx.beginPath();ctx.moveTo(0,size*.8);ctx.bezierCurveTo(-size*1.6,-size*.1,-size*.6,-size,0,-size*.35);ctx.bezierCurveTo(size*.6,-size,size*1.6,-size*.1,0,size*.8);ctx.fill()}
 else if(kind==='clover'||kind==='greenery'){for(let j=0;j<3;j++)ellipse(ctx,Math.cos(j*2.094)*size*.5,Math.sin(j*2.094)*size*.5,size*.58,size*.43,'#87c75c');}
 else if(kind==='lanterns'||kind==='lights'){glow(ctx,0,0,size*3,size*3,'255,187,88',.24);ctx.fillStyle='#ffd48b';ctx.fillRect(-size*.5,-size*.65,size,size*1.3);ctx.fillStyle='#9e6337';ctx.fillRect(-size*.65,-size*.75,size*1.3,1.6);ctx.fillRect(-size*.65,size*.65,size*1.3,1.6)}
 else if(kind==='pixels'||kind==='blocks'){ctx.fillStyle=['#76deda','#f9c36c','#a4a0ef'][Math.floor(t)%3];ctx.fillRect(-size,-size,size,size);ctx.fillRect(0,-size,size,size);ctx.fillRect(0,0,size,size);if(kind==='blocks')ctx.fillRect(size,0,size,size)}
 else if(kind==='math'||kind==='math67'){ctx.fillStyle='#ffe4a1';ctx.font=`${size*2.5}px system-ui`;ctx.textAlign='center';ctx.fillText(kind==='math67'?'67':['π','∞','√','+'][Math.floor(t)%4],0,0)}
 else if(kind==='bats'||kind==='creatures'){ctx.fillStyle=kind==='bats'?'#282139':'#c9b1f0';const wing=Math.sin(t*3)*size*.6;ctx.beginPath();ctx.moveTo(-size*2,wing);ctx.quadraticCurveTo(-size,-size,0,0);ctx.quadraticCurveTo(size,-size,size*2,wing);ctx.quadraticCurveTo(size*.7,0,0,size*.6);ctx.quadraticCurveTo(-size*.7,0,-size*2,wing);ctx.fill()}
 else if(kind==='coins'||kind==='gears'){ctx.strokeStyle='#efc782';ctx.beginPath();ctx.ellipse(0,0,size,size*.8,0,0,Math.PI*2);ctx.stroke();if(kind==='gears'){for(let j=0;j<8;j++){ctx.save();ctx.rotate(j*Math.PI/4+t*.2);ctx.fillStyle='#efc782';ctx.fillRect(-1,-size-2,2,4);ctx.restore()}}else{ctx.fillStyle='#efc782';ctx.fillRect(-1,-size*.5,2,size)}}
 else if(kind==='flags'){ctx.fillStyle='#f4e3d9';ctx.fillRect(-size,-size*.5,size*2,size);ctx.fillStyle='#a93f45';for(let j=0;j<3;j++)ctx.fillRect(-size,-size*.5+j*size/3,size*2,size/6);ctx.fillStyle='#445f91';ctx.fillRect(-size,-size*.5,size*.8,size*.55)}
 else if(kind==='harvest'){ellipse(ctx,0,0,size,size*.82,'#df9254');ctx.strokeStyle='#b8a16a';ctx.beginPath();ctx.moveTo(0,-size*.7);ctx.lineTo(2,-size-2);ctx.stroke()}
 else {ctx.strokeStyle=kind==='embers'?'#ebb17d':'#cce8ff';ctx.beginPath();ctx.moveTo(-size,0);ctx.lineTo(size,0);ctx.moveTo(0,-size);ctx.lineTo(0,size);ctx.stroke()}
 ctx.restore();}
export function drawEvent(ctx,t,effect,state){if(!effect||['none','quiet'].includes(effect))return;const n=eventBudget(state.mode,state.intensity,state.weak),p=weatherProfile(state.sky);
 if(effect==='fireworks'){if(p.overcast>.8)return;for(let b=0;b<(state.mode==='ultra'&&!state.weak?3:2);b++){const f=frac(t/14+b*.33),x=(.25+b*.24)*MW,y=(.12+hash(b+5200)*.15)*MH;if(f>.64)continue;const u=f/.64,r=12+u*68,alpha=Math.sin(u*Math.PI)*.60;ctx.save();ctx.globalAlpha=alpha;ctx.strokeStyle=['#f4d48e','#a8dcf5','#eda2b5'][b];ctx.lineWidth=1.4;for(let i=0;i<n;i++){const a=i*2*Math.PI/n;ctx.beginPath();ctx.moveTo(x+Math.cos(a)*r*.87,y+Math.sin(a)*r*.87+u*u*18);ctx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r+u*u*18);ctx.stroke()}ctx.restore()}return}
 if(['stars','comets'].includes(effect)){if(p.overcast>.7)return;for(let i=0;i<Math.max(2,Math.floor(n/4));i++){const f=frac(t/22+hash(i+5340)),x=(.12+hash(i+5341)*.65+f*.18)*MW,y=(.06+hash(i+5342)*.14+f*.12)*MH;ctx.save();ctx.globalAlpha=Math.sin(f*Math.PI)*.56;ctx.strokeStyle='#cfeaff';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x-24,y-10);ctx.lineTo(x,y);ctx.stroke();ctx.restore()}return}
 for(let i=0;i<n;i++){const f=frac(t*(.025+hash(i+5310)*.016)+hash(i+5320)),x=(.06+frac(hash(i+5330)+f*.14)*.86)*MW;let y=(.12+hash(i+5350)*.19+f*.26)*MH;if(['lanterns','lights','gravity'].includes(effect))y=(.66-f*.52)*MH;if(['harvest','greenery','clover','coins','gears'].includes(effect))y=(.59+hash(i+5360)*.22-f*.04)*MH;ctx.save();ctx.globalAlpha=Math.sin(f*Math.PI)*.48;eventShape(ctx,effect,x,y,2.4+hash(i+5370)*3,t+i);ctx.restore()}
}

/* v0.12: one deterministic daily discovery opportunity, no replay on refresh. */
const DISCOVERIES=['ufo','rocket','meteors','aurora','balloon','wildlife','dragon','airship','foundry','67','anomaly'];
function rareHash(str){let h=2166136261;for(const c of str){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
export function rarePlan(date=new Date()){
 const key=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
 if(eventForDate(date)||rareHash(key+'chance')%100>=22)return null;
 const kind=DISCOVERIES[rareHash(key+'kind')%DISCOVERIES.length];
 const nocturnal=['aurora','meteors'].includes(kind),start=(nocturnal?19*60:7*60)+rareHash(key+'minute')%(nocturnal?240:660);
 return {kind,start:start*60,duration:100};
}
export function rareAt(date=new Date()){const p=rarePlan(date),sec=date.getHours()*3600+date.getMinutes()*60+date.getSeconds();return p&&sec>=p.start&&sec<p.start+p.duration?{kind:p.kind,progress:(sec-p.start)/p.duration}:null}
let rareSecond=-1,rareCached=null;
function activeRare(){const sec=Math.floor(Date.now()/1000);if(sec!==rareSecond){rareSecond=sec;rareCached=rareAt(new Date())}return rareCached}
export function rareAllowed(kind,state,cave=false){if(kind==='foundry')return cave;if(cave)return false;if(state.season==='mars')return ['ufo','rocket','anomaly','67'].includes(kind);if(['meteors','aurora'].includes(kind)&&!state.night)return false;if(['balloon','wildlife'].includes(kind)&&state.night)return false;return !['storm','fog','hail','freezing','sleet','snow','rain','drizzle'].includes(state.sky)||['67','anomaly'].includes(kind)}
export function drawRare(ctx,t,rare,state,cave=false){if(!rare||!rareAllowed(rare.kind,state,cave)||state.weak)return;const k=rare.kind,u=rare.progress??frac(t/18),a=Math.min(1,u*8,(1-u)*8),x=(.13+.73*u)*MW,y=(.18+.035*Math.sin(u*6))*MH;ctx.save();ctx.globalAlpha=a*.8;
 if(k==='ufo'){glow(ctx,x,y,45,18,'110,221,255',.25);ellipse(ctx,x,y,22,5,'#839cb0');ellipse(ctx,x,y-5,10,6,'#b6e2e9');for(let i=-2;i<=2;i++)ellipse(ctx,x+i*7,y+2,1.5,1.5,'#83f5ff')}
 else if(k==='rocket'){const xx=.81*MW,yy=(.47-u*.65)*MH;glow(ctx,xx,yy+15,13,35,'255,180,80',.5);ctx.fillStyle='#dedee6';ctx.fillRect(xx-3,yy-11,6,20);ellipse(ctx,xx,yy-11,3,5,'#d9e9ef');for(let i=0;i<15;i++)cloud(ctx,xx+Math.sin(i+t)*4,yy+20+i*6,4+i*.6,5+i*.7,.20*(1-i/15))}
 else if(k==='meteors'){for(let i=0;i<5;i++){const f=frac(u*5+i*.31),xx=(.22+hash(i+990)*.49+f*.12)*MW,yy=(.04+hash(i+991)*.12+f*.16)*MH;ctx.strokeStyle=`rgba(218,238,255,${Math.sin(f*Math.PI)*.8})`;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(xx-42,yy-23);ctx.lineTo(xx,yy);ctx.stroke()}}
 else if(k==='aurora'){for(let i=0;i<9;i++){ctx.strokeStyle=`rgba(${i%2?'97,209,174':'100,153,230'},.12)`;ctx.lineWidth=11;ctx.beginPath();for(let j=0;j<=30;j++){let xx=MW*j/30,yy=(.05+i*.013+.045*Math.sin(j*.24+t*.25+i*.13))*MH;j?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy)}ctx.stroke()}}
 else if(k==='balloon'){ellipse(ctx,x,y,15,20,'#c88842');ellipse(ctx,x-5,y,7,19,'#e6b668');ctx.strokeStyle='#76573a';ctx.beginPath();ctx.moveTo(x-5,y+18);ctx.lineTo(x-3,y+28);ctx.moveTo(x+5,y+18);ctx.lineTo(x+3,y+28);ctx.stroke();ctx.fillStyle='#81552f';ctx.fillRect(x-4,y+28,8,6)}
 else if(k==='wildlife'){drawDeer(ctx,77*(.31+u*.27-.36),false,'green')}
 else if(k==='dragon'){fantasyDragon(ctx,{x,y},t,0,a)}
 else if(k==='airship'){fantasyAirship(ctx,{x,y},t,0,a)}
 else if(k==='foundry'){const xx=.739*MW,yy=.803*MH;glow(ctx,xx,yy,85,55,'53,216,255',.3+.1*Math.sin(t));for(let i=0;i<12;i++){const f=frac(u*3+i/12),angle=i*2.399;ellipse(ctx,xx+Math.cos(angle)*f*55,yy+Math.sin(angle)*f*32,2,2,'#a7edff')}}
 else if(k==='67'){ctx.font='bold 17px system-ui';ctx.fillStyle='#ffe7a4';ctx.textAlign='center';ctx.fillText('67',.89*MW,.52*MH);glow(ctx,.89*MW,.52*MH,20,14,'255,207,98',.15)}
 else if(k==='anomaly'){const xx=.72*MW,yy=.19*MH;ctx.strokeStyle='#96e5d9';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(xx,yy,24+8*Math.sin(t),12,0,0,Math.PI*2);ctx.stroke();glow(ctx,xx,yy,34,16,'141,203,230',.12)}
 ctx.restore();}

function drawLandscape(s,t,b,state){const {ctx,canvas}=s;const {season,sky,night,wind}=state;const p=weatherProfile(sky),wb=state.weatherBudget;const rect=s.layer.getBoundingClientRect();if(rect.width<=0||rect.height<=0)return;
 const density=Math.min(window.devicePixelRatio||1,b.dpr,Math.sqrt(b.pixels/(rect.width*rect.height)));const w=Math.max(1,Math.floor(rect.width*density)),h=Math.max(1,Math.floor(rect.height*density));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}
 const img=s.layer.firstElementChild;const pos=getComputedStyle(img).objectPosition.split(/\s+/).map(v=>parseFloat(v)/100);const fit=coverGeometry(w,h,MW,MH,Number.isFinite(pos[0])?pos[0]:.54,Number.isFinite(pos[1])?pos[1]:.5);
 ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,w,h);ctx.save();ctx.setTransform(fit.scale,0,0,fit.scale,fit.x,fit.y);
 if(isAlternate(season)){if(BEYOND[season])drawBeyond(s,t,state,season);else if(FANTASY[season])drawFantasy(s,t,state,season);else drawAlternate(ctx,t,b,state,season);if(season!=='mars'){weatherMist(ctx,t,p,{...wb,ripples:0},night);weatherLightning(ctx,t,p,wb)}drawEvent(ctx,t,state.eventEffect,state);drawRare(ctx,t,state.rare,state);ctx.restore();ctx.save();ctx.setTransform(1,0,0,1,0,0);if(season==='mars')marsDust(ctx,t,alternateBudget(state.mode,state.intensity,state.weak),w,h,sky);else weatherParticles(ctx,t,p,wb,w,h,night);ctx.restore();return}
 // Feathered live-image patches keep the subtle tree movement aligned with the source photograph.
 if(b.patches&&!night)branchSway(ctx,s,t,wind);
 // Low-opacity, elongated atmospheric wisps drift across the open sky, not the terrain.
 if(!night&&p.overcast<.5&&p.mist<.7){for(let i=0;i<b.clouds;i++){const p=frac(t/(140+i*27)*wind+i*.24+.36),x=(-.16+1.36*p)*MW,y=(.09+hash(i+21)*.092)*MH,rx=73+hash(i+36)*55;cloud(ctx,x,y,rx,15+hash(i+63)*9,.19);cloud(ctx,x+rx*.45,y+3,rx*.65,12,.13)}}
 // River highlights are clipped to the water corridor and never drift over orchards.
 ctx.save();path(ctx,RIVER);ctx.clip();for(let i=0;i<b.glints;i++){const q=RIVER_GLINTS[i%RIVER_GLINTS.length],phase=frac(t*(.12+hash(i)*.09)+hash(i+100)),x=(q[0]+(phase-.5)*.026)*MW,y=(q[1]+(hash(i+89)-.5)*.014)*MH,amp=Math.sin(phase*Math.PI),len=(2.5+hash(i+23)*9)*(q[0]*.65+.5);ctx.strokeStyle=`rgba(${night?'192,215,244':'249,253,255'},${amp*(night?.32:.63)})`;ctx.lineWidth=.7+hash(i+2)*.75;ctx.beginPath();ctx.moveTo(x-len,y);ctx.lineTo(x+len,y-.4);ctx.stroke()}ctx.restore();
 // Wind-carried blossoms/leaves remain in the foreground; no autumn leaves in winter.
 if(!night&&['blossom','green','harvest','earlyfall','latefall'].includes(season)){for(let i=0;i<b.leaves;i++){const p=frac(t*(.047+hash(i+53)*.018)*wind+hash(i+10)),x=(.025+p*.31+hash(i+61)*.06)*MW,y=(.10+hash(i+82)*.17+p*.23+Math.sin(t*1.2+i)*.009)*MH;ctx.save();ctx.translate(x,y);ctx.rotate(t*.9+i);ctx.globalAlpha=Math.sin(Math.PI*p)*.66;ellipse(ctx,0,0,season==='blossom'?2.9:3.2,1.5,season==='blossom'?'#ffe4ed':['earlyfall','latefall','harvest'].includes(season)?'#c39b42':'#6e8e40');ctx.restore()}}
 drawTraffic(ctx,state.trafficClock,b,night);drawBirds(ctx,t,b,sky,night);if(b.wildlife&&(!document.body.dataset.wildlife||document.body.dataset.wildlife==='deer')&&p.rain<.3&&p.ice===0&&p.mist<.7&&p.snow===0)drawDeer(ctx,t,night,season);
 if(night){for(let i=0;i<LAMPS.length;i++){const [x,y]=LAMPS[i];const a=.73+Math.sin(t*.7+i)*.15;cloud(ctx,x*MW,y*MH,5,4,a*.7);ellipse(ctx,x*MW,y*MH,1.8,1.35,`rgba(255,226,146,${a})`)}}
 weatherMist(ctx,t,p,wb,night);weatherLightning(ctx,t,p,wb);drawEvent(ctx,t,state.eventEffect,state);drawRare(ctx,t,state.rare,state);ctx.restore();
 ctx.save();ctx.setTransform(1,0,0,1,0,0);weatherParticles(ctx,t,p,wb,w,h,night);ctx.restore();}
let motion=null,caveOccludesSurface=false,caveRendering=false;
function startMotion(){if(!sheet||motion||typeof window==='undefined'||typeof requestAnimationFrame!=='function')return;
 const states=[];for(const layer of nodes){const canvas=document.createElement('canvas');canvas.className='pf-lw-motion';canvas.setAttribute('aria-hidden','true');const ctx=canvas.getContext?.('2d');if(!ctx)continue;layer.append(canvas);states.push({layer,canvas,ctx,visible:true,surface:layer.parentElement?.classList.contains('valley-backdrop')||layer.parent?.className==='valley-backdrop',patchSrc:null,patches:[]})}if(!states.length)return;
 const mq=window.matchMedia?.('(prefers-reduced-motion: reduce)');let raf=0,last=0,clock=0,trafficClock=0,dead=false;const governor=createGovernor(deviceHints());
 const enabled=()=>!dead&&!document.hidden&&!mq?.matches&&document.body.dataset.motion!=='off'&&['enhanced','ultra'].includes(document.body.dataset.pfLw)&&states.some(s=>s.visible&&!(s.surface&&caveOccludesSurface));
 function clear(){for(const s of states){shrinkCanvas(s.canvas,s.ctx);releasePatches(s)}governor.reset()}
 function schedule(){if(enabled()){if(!raf){last=0;raf=requestAnimationFrame(frame)}}else{if(raf)cancelAnimationFrame(raf);raf=0;last=0;clear()}}
 function frame(now){raf=0;if(!enabled()){clear();last=0;return}const ds=document.body.dataset,visible=states.filter(s=>s.visible&&!(s.surface&&caveOccludesSurface)),b=adaptiveBudget(ds.pfLw,ds.intensity,governor.level,visible.length+(caveRendering?1:0)),weak=b.weak;if(!last)last=now-1000/b.fps;const dt=now-last;
 if(dt>=1000/b.fps-1){last=now;clock+=Math.min(dt,100)/1000;const started=renderNow();const sky=ds.sky||'partly',profile=weatherProfile(sky);trafficClock+=Math.min(dt,100)/1000*(profile.rain>.4||profile.ice>.3||profile.mist>.7?.72:1);const state={sky,trafficClock,mode:b.effective,intensity:ds.intensity,weak,night:ds.time==='night',wind:weatherProfile(sky).wind*(ds.intensity==='subtle'?.72:1),season:ds.season,weatherBudget:weatherBudget(b.effective,ds.intensity,weak)};try{const rare=activeRare();for(const s of states){if(!visible.includes(s)){if(s.canvas.width>1)shrinkCanvas(s.canvas,s.ctx);releasePatches(s);continue}if(!b.patches)releasePatches(s);drawLandscape(s,clock,b,{...state,season:s.layer.dataset.season||state.season,eventEffect:s.layer.dataset.eventEffect,rare})}governor.sample(dt,renderNow()-started,b.fps)}catch(e){dead=true;clear();return}}
 raf=requestAnimationFrame(frame)}
 const vis=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>{for(const e of entries){const s=states.find(s=>s.layer===e.target);if(s){s.visible=e.isIntersecting;if(!s.visible){shrinkCanvas(s.canvas,s.ctx);releasePatches(s)}}}schedule()}):null;states.forEach(s=>vis?.observe(s.layer));
 const stateWatch=new MutationObserver(schedule);stateWatch.observe(document.body,{attributes:true,attributeFilter:['data-motion','data-pf-lw','data-intensity','data-sky']});document.addEventListener('visibilitychange',schedule);mq?.addEventListener?.('change',schedule);
 motion={schedule,dispose(){dead=true;if(raf)cancelAnimationFrame(raf);raf=0;vis?.disconnect();stateWatch.disconnect();document.removeEventListener('visibilitychange',schedule);mq?.removeEventListener?.('change',schedule);for(const s of states){s.canvas.remove();s.canvas.width=1;s.canvas.height=1;releasePatches(s)}}};schedule();}
function stopMotion(){motion?.dispose();motion=null}

/* v0.7: source-aligned foundry motion. All positions reference the same 1672x941 artwork.
   A static cave remains available when motion is off or canvas fails. */
const FOUNDRY={
 gears:[{x:.562,y:.338,r:39,speed:.19},{x:.825,y:.337,r:40,speed:-.27}],
 steam:[[.779,.182,1],[.883,.060,1.25],[.335,.587,.65]],
 falls:[{x:.456,y:.607,w:.019,h:.133},{x:.416,y:.411,w:.014,h:.091},{x:.359,y:.252,w:.013,h:.041}],
 crystals:[[.171,.223],[.328,.860],[.739,.803],[.517,.774],[.131,.728]],
 furnaces:[[.845,.138,28,82],[.974,.831,44,39],[.847,.233,15,42]],
 lamps:[[.058,.116],[.446,.385],[.586,.387],[.770,.27],[.972,.376],[.778,.60],[.355,.644]],
 bridges:[[[.27,.399],[.42,.399],[.57,.399]],[[.550,.658],[.607,.653],[.615,.651]],[[.735,.656],[.850,.657],[.961,.666]]],
 track:[[.315,.987],[.280,.948],[.240,.918],[.204,.889],[.170,.863]],
 river:[[.363,.779],[.410,.803],[.458,.829],[.525,.858],[.598,.868],[.677,.899],[.730,.942]],
 lift:{x:.661,top:.258,bottom:.446}, crane:{x:.304,y:.190,bottom:.292}
};
export function foundryBudget(mode,intensity='normal',weak=false){const b=motionBudget(mode,intensity,weak),u=mode==='ultra'&&!weak,f=intensity==='subtle'?.55:intensity==='lively'?1.25:1;return {...b,gears:u?2:1,workers:u?6:3,steam:Math.ceil((u?22:10)*f),water:Math.ceil((u?35:18)*f),sparks:Math.ceil((u?15:7)*f),lights:u?FOUNDRY.lamps.length:4,crane:u,crystals:u?5:3};}
function glow(ctx,x,y,rx,ry,color,a){ctx.save();ctx.translate(x,y);ctx.scale(rx,ry);const g=ctx.createRadialGradient(0,0,0,0,0,1);g.addColorStop(0,`rgba(${color},${a})`);g.addColorStop(.38,`rgba(${color},${a*.45})`);g.addColorStop(1,`rgba(${color},0)`);ctx.fillStyle=g;ctx.fillRect(-1,-1,2,2);ctx.restore()}
function sourceGear(img,g){const side=g.r*2,c=document.createElement('canvas');c.width=c.height=side;const p=c.getContext?.('2d');if(!p)return null;const kx=img.naturalWidth/MW,ky=img.naturalHeight/MH;p.drawImage(img,(g.x*MW-g.r)*kx,(g.y*MH-g.r)*ky,side*kx,side*ky,0,0,side,side);p.globalCompositeOperation='destination-in';const mask=p.createRadialGradient(g.r,g.r,g.r*.62,g.r,g.r,g.r);mask.addColorStop(0,'#fff');mask.addColorStop(.75,'#fff');mask.addColorStop(1,'#ffffff00');p.fillStyle=mask;p.fillRect(0,0,side,side);return c}
function foundryGears(ctx,s,t,b){if(!s.picture.complete||!s.picture.naturalWidth)return;if(!s.gears)s.gears=FOUNDRY.gears.map(g=>sourceGear(s.picture,g));for(let i=0;i<b.gears;i++){const g=FOUNDRY.gears[i],patch=s.gears[i];if(!patch)continue;ctx.save();ctx.translate(g.x*MW,g.y*MH);ctx.rotate(t*g.speed);ctx.globalAlpha=.96;ctx.drawImage(patch,-g.r,-g.r);ctx.restore()}}
function foundryWater(ctx,t,b){for(const f of FOUNDRY.falls){const x=f.x*MW,y=f.y*MH,w=f.w*MW,h=f.h*MH;ctx.save();ctx.beginPath();ctx.rect(x-w/2,y,w,h);ctx.clip();ctx.lineCap='round';for(let i=0;i<Math.ceil(b.water/3);i++){const xx=x+(hash(i+307)-.5)*w,yy=y+frac(t*(.43+hash(i+54)*.38)+hash(i+761))*h;ctx.strokeStyle=`rgba(180,232,247,${.1+hash(i+711)*.29})`;ctx.lineWidth=1+hash(i+453)*1.8;ctx.beginPath();ctx.moveTo(xx,yy);ctx.lineTo(xx+.7,yy+7+hash(i+751)*13);ctx.stroke()}ctx.restore();glow(ctx,x,y+h,22,9,'119,205,239',.13+.035*Math.sin(t*2))}
 for(let i=0;i<b.water;i++){const q=routePoint(FOUNDRY.river,frac(hash(i+822)+t*.023)),a=.13+.13*Math.sin(t*2.1+i);ctx.strokeStyle=`rgba(156,223,242,${a})`;ctx.lineWidth=1.1;ctx.beginPath();ctx.moveTo(q.x-3-hash(i+68)*8,q.y+Math.sin(i)*4);ctx.quadraticCurveTo(q.x,q.y-1,q.x+5+hash(i+671)*9,q.y);ctx.stroke()}}
function foundrySteam(ctx,t,b){for(let i=0;i<b.steam;i++){const [x,y,size]=FOUNDRY.steam[i%FOUNDRY.steam.length],p=frac(t*(.10+hash(i+353)*.07)+hash(i+420));const a=Math.sin(p*Math.PI)*.19;glow(ctx,x*MW+Math.sin(p*3+i*.3)*p*16,y*MH-p*72*size,(5+p*23)*size,(7+p*16)*size,'197,202,203',a)}}
function foundryLights(ctx,t,b){for(const [x,y,rx,ry] of FOUNDRY.furnaces){const a=.10+.035*Math.sin(t*2.2+x*22)+.017*Math.sin(t*4.7);glow(ctx,x*MW,y*MH,rx,ry,'255,140,37',a)}for(let i=0;i<b.crystals;i++){const [x,y]=FOUNDRY.crystals[i],a=.12+.05*Math.sin(t*1.5+i*1.2);glow(ctx,x*MW,y*MH,27,24,'37,188,255',a)}for(let i=0;i<b.lights;i++){const [x,y]=FOUNDRY.lamps[i];glow(ctx,x*MW,y*MH,13,17,'255,195,86',.12+.04*Math.sin(t*1.8+i))}}
function foundrySparks(ctx,t,b){const points=[[.893,.598],[.126,.406],[.972,.855]];for(let i=0;i<b.sparks;i++){const [x,y]=points[i%points.length],p=frac(t*(.65+hash(i+145)*.6)+hash(i+716));if(p>.46)continue;const f=p/.46,dx=(hash(i+43)-.5)*23*f,dy=-23*f+25*f*f;ctx.strokeStyle=`rgba(255,${Math.round(173+hash(i+23)*75)},83,${(1-f)*.68})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x*MW+dx,y*MH+dy);ctx.lineTo(x*MW+dx*.91,y*MH+dy+2.8);ctx.stroke()}}
function worker(ctx,q,t,i){const z=i%3===2?1.12:.77,dir=Math.cos(q.angle)>=0?1:-1,step=Math.sin(t*5.4+i*1.3)*2.0;ctx.save();ctx.translate(q.x,q.y);ctx.scale(dir*z,z);ellipse(ctx,0,0,4.7,1.2,'#100e0bb0');ctx.strokeStyle='#252323';ctx.lineWidth=2;ctx.lineCap='round';for(const o of [-1,1]){ctx.beginPath();ctx.moveTo(o*1.25,-5);ctx.lineTo(o*step+o,-.4);ctx.stroke()}ctx.fillStyle=i%2?'#7c5a34':'#45535b';ctx.fillRect(-2.8,-12,5.6,7.4);ctx.strokeStyle='#9d7954';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(2.4,-11);ctx.lineTo(4+step*.4,-6.5);ctx.stroke();ellipse(ctx,0,-14,2.4,2.6,'#9e6b43');ellipse(ctx,0,-15.6,3.5,1.5,'#ce9b4b');if(i%2===0)ellipse(ctx,2.2,-15,1.1,1.0,'#ffed9e');ctx.restore()}
function foundryWorkers(ctx,t,b){for(let i=0;i<b.workers;i++){const route=FOUNDRY.bridges[i%FOUNDRY.bridges.length],p=frac(t/(36+i*3)+i*.26+.12),u=p<.5?p*2:2-p*2,q=routePoint(route,u);if(p>=.5)q.angle+=Math.PI;worker(ctx,q,t,i)}}
function foundryCart(ctx,t){const p=frac(t/32+.27),u=p<.5?1-p*2:(p-.5)*2,q=routePoint(FOUNDRY.track,u),z=mix(1.1,.48,u);ctx.save();ctx.translate(q.x,q.y-4*z);ctx.scale(z,z);const dir=Math.cos(q.angle)>=0?1:-1;ctx.scale(dir,1);ellipse(ctx,0,5,14,3,'#100e0cc0');for(const v of [-8,8]){ellipse(ctx,v,3,4,4,'#29282a');ellipse(ctx,v,3,2,2,'#aa7743')}ctx.fillStyle='#7a492c';ctx.beginPath();ctx.moveTo(-14,-10);ctx.lineTo(14,-10);ctx.lineTo(9,0);ctx.lineTo(-9,0);ctx.closePath();ctx.fill();ctx.strokeStyle='#c99759';ctx.lineWidth=1.3;ctx.stroke();for(const x of [-7,0,7]){ctx.fillStyle='#62bbe5';ctx.beginPath();ctx.moveTo(x-4,-10);ctx.lineTo(x,-20+hash(x+20)*5);ctx.lineTo(x+4,-10);ctx.fill()}glow(ctx,0,-12,16,10,'61,205,255',.18);ctx.restore()}
function foundryLift(ctx,t){const {x,top,bottom}=FOUNDRY.lift,p=frac(t/23+.16),f=(1-Math.cos(p*Math.PI*2))/2,y=mix(top,bottom,f)*MH,X=x*MW;ctx.save();ctx.strokeStyle='#a27e4d90';ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(X,top*MH-7);ctx.lineTo(X,y-9);ctx.stroke();ctx.fillStyle='#422f20';ctx.fillRect(X-8,y-10,16,17);ctx.fillStyle='#fbb95378';ctx.fillRect(X-6,y-8,12,12);ctx.strokeStyle='#d6a55d';ctx.lineWidth=1.4;ctx.strokeRect(X-8,y-10,16,17);ctx.beginPath();ctx.moveTo(X,y-10);ctx.lineTo(X,y+7);ctx.stroke();glow(ctx,X,y,18,15,'255,178,65',.19);ctx.restore()}
function foundryCrane(ctx,t){const {x,y,bottom}=FOUNDRY.crane,X=x*MW+Math.sin(t*.38)*7,Y=y*MH,low=mix(Y+14,bottom*MH,(1+Math.sin(t*.51))/2);ctx.strokeStyle='#bca17cba';ctx.lineWidth=1.25;ctx.beginPath();ctx.moveTo(x*MW,Y);ctx.lineTo(X,low);ctx.stroke();ctx.strokeStyle='#db9949';ctx.lineWidth=2.1;ctx.beginPath();ctx.arc(X+2,low+3,3.4,0,Math.PI*1.5);ctx.stroke();ctx.fillStyle='#8c5c39';ctx.fillRect(X-5,low+5,10,6)}
export function drawFoundry(s,t,b){const {ctx,canvas,picture}=s,rect=s.stage.getBoundingClientRect();if(rect.width<=0||rect.height<=0)return;const d=Math.min(window.devicePixelRatio||1,b.dpr,Math.sqrt(b.pixels/(rect.width*rect.height))),w=Math.max(1,Math.floor(rect.width*d)),h=Math.max(1,Math.floor(rect.height*d));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}const pos=getComputedStyle(picture).objectPosition.split(/\s+/).map(v=>parseFloat(v)/100),fit=coverGeometry(w,h,MW,MH,Number.isFinite(pos[0])?pos[0]:.5,Number.isFinite(pos[1])?pos[1]:.46);ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,w,h);ctx.save();ctx.setTransform(fit.scale,0,0,fit.scale,fit.x,fit.y);foundryGears(ctx,s,t,b);foundryWater(ctx,t,b);foundrySteam(ctx,t,b);foundryLights(ctx,t,b);foundryWorkers(ctx,t,b);foundryCart(ctx,t);foundryLift(ctx,t);if(b.crane)foundryCrane(ctx,t);foundrySparks(ctx,t,b);drawRare(ctx,t,activeRare(),{weak:b.fps===15},true);ctx.restore()}
function startFoundryMotion(root,stage,picture,mq){const canvas=document.createElement('canvas');canvas.className='pf-lw-foundry-motion';canvas.setAttribute('aria-hidden','true');const ctx=canvas.getContext?.('2d');if(!ctx)return null;stage.append(canvas);const s={canvas,ctx,stage,picture,gears:null};let raf=0,last=0,clock=0,dead=false;const governor=createGovernor(deviceHints());
 const enabled=()=>!dead&&root.dataset.visible==='yes'&&!document.hidden&&!mq?.matches&&document.body.dataset.motion!=='off'&&['enhanced','ultra'].includes(document.body.dataset.pfLw);
 function clear(){shrinkCanvas(canvas,ctx);s.gears=null;governor.reset()}
 function schedule(){if(enabled()){if(!raf){last=0;raf=requestAnimationFrame(frame)}}else{if(raf)cancelAnimationFrame(raf);raf=0;last=0;clear()}}
 function frame(now){raf=0;if(!enabled()){clear();last=0;return}const ds=document.body.dataset,b=adaptiveBudget(ds.pfLw,ds.intensity,governor.level,caveOccludesSurface?1:3,true);if(!last)last=now-1000/b.fps;const dt=now-last;if(dt>=1000/b.fps-1){last=now;clock+=Math.min(dt,100)/1000;const started=renderNow();try{drawFoundry(s,clock,b);governor.sample(dt,renderNow()-started,b.fps)}catch(e){dead=true;clear();return}}raf=requestAnimationFrame(frame)}
 return {schedule,dispose(){dead=true;if(raf)cancelAnimationFrame(raf);raf=0;canvas.remove();canvas.width=canvas.height=1;s.gears=null}};
}

/* v0.6: underground visual zone. No wrapping, moving or replacement of the roadmap DOM.
   The fixed decorative layer moves up as the real #planned-section approaches the viewport.
   Assets are independent of surface weather and selected season. */
const CAVE_STYLE=`
body[data-pf-lw] .pf-lw-underground{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:3;isolation:isolate;visibility:hidden}
body[data-pf-lw] .pf-lw-underground[data-visible="yes"]{visibility:visible}
body[data-pf-lw] .pf-lw-underground .pf-lw-cave-stage{position:absolute;inset:0;background:#1a1b20;transform:translate3d(0,var(--pf-lw-cave-y,100%),0);clip-path:polygon(0 1.1%,9% 2.6%,18% 1.3%,25% 3%,36% 1%,48% 2.3%,61% .6%,72% 2%,84% 1%,93% 2.3%,100% 0,100% 100%,0 100%);overflow:hidden}
body[data-pf-lw] .pf-lw-underground[data-depth="full"] .pf-lw-cave-stage{clip-path:none}
body[data-pf-lw] .pf-lw-cave-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 46%;display:block;max-width:none;filter:brightness(.90) saturate(.95)}
body[data-pf-lw] .pf-lw-foundry-motion{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;filter:brightness(.90) saturate(.95)}
body[data-pf-lw][data-motion="off"] .pf-lw-foundry-motion{display:none}
@media(prefers-reduced-motion:reduce){body[data-pf-lw] .pf-lw-foundry-motion{display:none}}
body[data-pf-lw] .pf-lw-cave-stage::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#090e2055 0%,#0a15202a 30%,#07132230 65%,#090f19a0 100%);pointer-events:none}
body[data-pf-lw] .pf-lw-cave-roof{position:absolute;top:0;left:0;width:100%;height:clamp(95px,23vh,240px);object-fit:cover;object-position:50% 15%;max-width:none;display:block;opacity:var(--pf-lw-roof-opacity,1);mask-image:linear-gradient(#000 0%,#000 23%,transparent 100%);filter:brightness(.84);z-index:1}
body[data-pf-lw] .pf-lw-cave-stage::before{content:'';position:absolute;top:0;left:0;right:0;height:14%;z-index:2;background:linear-gradient(180deg,#3b241cc2,#19141965 40%,transparent);opacity:var(--pf-lw-roof-opacity,1);pointer-events:none}
@media(max-width:650px){body[data-pf-lw] .pf-lw-cave-image{object-position:57% 46%}}
`;
let underground=null;
// Enter from below as the roadmap approaches; remain underground as the roadmap is read.
// Once the roadmap has scrolled above the viewport the scene gently returns to surface.
export function undergroundProgress(top,bottom,height,reduced=false){
 if(!Number.isFinite(top)||!Number.isFinite(bottom)||!Number.isFinite(height)||height<=0||bottom<=top)return 0;
 const unit=v=>v>=1-1e-9?1:Math.max(0,Math.min(1,v));
 if(reduced)return top<=height*.60&&bottom>height*.14?1:0;
 return Math.min(unit((height*1.13-top)/(height*.93)),unit((bottom+height*.24)/(height*.48)));
}
function startUnderground(){
 if(underground||typeof window==='undefined'||typeof window.addEventListener!=='function')return;
 const section=document.getElementById('planned-section');
 if(!section)return;
 const host=document.querySelector?.('.valley-backdrop');if(!host)return;
 const mq=window.matchMedia?.('(prefers-reduced-motion: reduce)');
 let dead=false,frame=0,started=false,failed=false,root=null,stage=null,roof=null,style=null,nearObserver=null,layoutObserver=null,motionObserver=null,foundryMotion=null;
 const sceneMode=()=>['enhanced','ultra'].includes(document.body.dataset.pfLw);
 function state(){const rect=section.getBoundingClientRect();const height=window.innerHeight||document.documentElement.clientHeight||0;const reduced=!!mq?.matches||document.body.dataset.motion==='off';return {rect,height,reduced,progress:undergroundProgress(rect.top,rect.bottom,height,reduced)}}
 function paint(){if(dead||!root)return;const {progress:p}=state();const full=p>=.999;
  caveRendering=p>0;const depth=full?'full':p>0?'transition':'surface';if(document.body.dataset.pfLwCave!==depth)document.body.dataset.pfLwCave=depth;document.body.style?.setProperty?.('--pf-lw-cave-cover',`${p*100}%`);root.dataset.visible=p>0?'yes':'no';root.dataset.depth=full?'full':'transition';
  if(caveOccludesSurface!==full){caveOccludesSurface=full;motion?.schedule()}
  foundryMotion?.schedule();
  stage.style.setProperty('--pf-lw-cave-y',`${(1-p)*100}%`);
  stage.style.setProperty('--pf-lw-roof-opacity',String(Math.max(0,1-p*1.23)));
 }
 function requestPaint(){if(dead||!sceneMode())return;foundryMotion?.schedule();if(frame||document.hidden)return;frame=requestAnimationFrame(update)}
 function update(){frame=0;if(dead||!sceneMode())return;const {rect,height}=state();
  if(!started&&!failed&&rect.bottom>rect.top&&height>0&&rect.top<height*1.85&&rect.bottom>-height*.5)beginLoad();
  paint();
 }
 function beginLoad(){
  if(dead||started||failed||!sceneMode())return;started=true;
  // The cavern is required; a failed optional roof must not prevent the main image.
  load('foundry').then(asset=>{
   if(dead||!sceneMode())return;
   style=document.createElement('style');style.id='pf-lw-cave-style';style.textContent=CAVE_STYLE;document.head.append(style);
   root=document.createElement('div');root.className='pf-lw-underground';root.setAttribute('aria-hidden','true');root.dataset.visible='no';
   stage=document.createElement('div');stage.className='pf-lw-cave-stage';root.append(stage);
   const picture=document.createElement('img');picture.className='pf-lw-cave-image';picture.alt='';picture.draggable=false;picture.decoding='async';picture.width=1672;picture.height=941;picture.src=asset.url;stage.append(picture);
   host.append(root);foundryMotion=startFoundryMotion(root,stage,picture,mq);paint();
   load('descent').then(a=>{if(dead||!stage)return;roof=document.createElement('img');roof.className='pf-lw-cave-roof';roof.alt='';roof.draggable=false;roof.src=a.url;stage.append(roof)}).catch(()=>{});
  }).catch(()=>{if(!dead){failed=true;started=false}});
 }
 // Scroll/resize are coalesced. Content changes above the roadmap may move its bounds.
 window.addEventListener('scroll',requestPaint,{passive:true});window.addEventListener('resize',requestPaint,{passive:true});document.addEventListener('visibilitychange',requestPaint);
 mq?.addEventListener?.('change',requestPaint);
 if(typeof IntersectionObserver==='function'){nearObserver=new IntersectionObserver(requestPaint,{rootMargin:'85% 0px 50% 0px'});nearObserver.observe(section)}
 if(typeof ResizeObserver==='function'){layoutObserver=new ResizeObserver(requestPaint);layoutObserver.observe(section);layoutObserver.observe(document.body)}
 if(typeof MutationObserver==='function'){motionObserver=new MutationObserver(requestPaint);motionObserver.observe(document.body,{attributes:true,attributeFilter:['data-motion','data-pf-lw','data-intensity']})}
 underground={dispose(){dead=true;foundryMotion?.dispose();foundryMotion=null;caveOccludesSurface=false;caveRendering=false;if(frame)cancelAnimationFrame(frame);frame=0;nearObserver?.disconnect();layoutObserver?.disconnect();motionObserver?.disconnect();window.removeEventListener('scroll',requestPaint);window.removeEventListener('resize',requestPaint);document.removeEventListener('visibilitychange',requestPaint);mq?.removeEventListener?.('change',requestPaint);root?.remove();style?.remove();root=stage=roof=style=null;}};
 requestPaint();
}
function stopUnderground(){underground?.dispose();underground=null}
