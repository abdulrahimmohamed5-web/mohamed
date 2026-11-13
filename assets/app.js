/* MAHMOUD JUMP - shared code for all pages (home + one page per day) */
(function(){
/* ===== Settings ===== */
// WhatsApp number in international format, digits only (Egypt = 20 + number without the leading 0)
var WHATSAPP_NUMBER='201070446972';
var WHATSAPP_MESSAGE='Hi Coach Mahmoud, I saw your training videos and I want to start online coaching.';
// Order of the days (used for the day buttons and the Prev/Next links).
// To add a day: add it here + create its page (copy any day page, e.g. sunday.html).
var DAYS=[['friday','Friday']];

var H=window.MJ_HOOKS||{};
var href=H.href||function(k){return k==='home'?'index.html':k+'.html'};
var poster=H.poster||function(n){return 'posters/'+n+'.jpg'};
var video=H.video||function(n){return 'videos/'+n+'.mp4'};
var WA='<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C9 3 3.3 8.6 3.3 15.5c0 2.4.7 4.6 1.9 6.5L3 29l7.2-2.1a13 13 0 0 0 5.8 1.4c7 0 12.7-5.6 12.7-12.5S23 3 16 3zm5.800 15.100c-.3-.2-1.900-.9-2.200-1s-.5-.2-.7.200-.8 1-1 1.200-.4.200-.7.100a8.500 8.500 0 0 1-4.200-3.700c-.3-.6.300-.5.900-1.700.1-.2.100-.4 0-.5l-1-2.300c-.3-.6-.5-.5-.7-.5h-.6a1.200 1.200 0 0 0-.9.400 3.800 3.800 0 0 0-1.200 2.800 6.600 6.600 0 0 0 1.400 3.500c.2.200 2.500 3.900 6.100 5.300 2.300.9 3.100.8 3.700.7a3.100 3.100 0 0 0 2-1.400 2.500 2.500 0 0 0 .2-1.400c-.1-.1-.3-.2-.6-.4z"/></svg>';
var FAB='<svg viewBox="0 0 32 32"><path d="M16 3C9 3 3.3 8.6 3.3 15.5c0 2.4.7 4.6 1.9 6.5L3 29l7.2-2.1a13 13 0 0 0 5.8 1.4c7 0 12.700-5.600 12.700-12.500S23 3 16 3zm5.800 15.100c-.3-.2-1.900-.9-2.200-1s-.5-.2-.7.200-.8 1-1 1.200-.4.200-.7.100a8.500 8.500 0 0 1-4.200-3.700c-.3-.6.300-.5.900-1.700.1-.2.100-.4 0-.5l-1-2.300c-.3-.6-.5-.5-.7-.5h-.6a1.200 1.200 0 0 0-.9.400 3.800 3.800 0 0 0-1.200 2.800 6.600 6.600 0 0 0 1.400 3.500c.2.200 2.500 3.900 6.100 5.300 2.300.9 3.100.8 3.700.7a3.100 3.100 0 0 0 2-1.400 2.500 2.500 0 0 0 .2-1.400c-.1-.1-.3-.2-.6-.4z"/></svg>';
var modal,player,verr,visible=[],idx=-1;

function waLink(){return 'https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(WHATSAPP_MESSAGE)}
function waBtn(cls,label){return '<a class="btn btn-wa '+cls+'" data-wa href="#" target="_blank" rel="noopener noreferrer">'+WA+label+'</a>'}

function shell(inner){
  return '<header><a class="brand" href="'+href('home')+'"><strong>MAHMOUD <span>JUMP</span></strong></a>'
   +'<div class="nav"><a class="home" href="https://abdonassary22-png.github.io/portfilo/">\u2190 Main Website</a>'+waBtn('btn-sm','WhatsApp')+'</div></header>'
   +'<main>'+inner+'</main>'
   +'<footer>\u00a9 '+new Date().getFullYear()+' MAHMOUD JUMP \u2022 TRAINING VIDEOS</footer>'
   +'<a class="fab" data-wa href="#" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">'+FAB+'</a>'
   +'<div class="modal" id="modal" role="dialog" aria-modal="true" aria-label="Exercise video"><div class="modal-inner">'
   +'<div class="modal-head"><strong id="modal-title"></strong><button class="close" id="close">\u2715 Close</button></div>'
   +'<div class="video-wrap"><video id="player" controls playsinline loop preload="none"></video><div class="verr" id="verr">Could not load this video.<br>Check your connection and try again.</div></div>'
   +'<div class="modal-foot"><div class="nv"><button id="prev">\u2190 Prev</button><button id="next">Next \u2192</button></div>'
   +'<a data-wa href="#" target="_blank" rel="noopener noreferrer">Ask coach</a></div></div></div>';
}
function cta(){
  return '<section class="cta"><h2>READY TO <span>LEVEL UP?</span></h2><p>Get a personal plan, form checks and weekly follow-up. Send me a message and let\'s start.</p>'+waBtn('','Chat on WhatsApp')+'</section>';
}

function homeInner(){
  var cards=DAYS.map(function(d){
    return '<a class="daycard" href="'+href(d[0])+'"><span class="dn">'+d[1].slice(0,3).toUpperCase()+'</span><strong>'+d[1]+'</strong><span class="go">Open workout \u2192</span></a>';
  }).join('');
  return '<section class="hero"><div class="eyebrow">ONLINE COACHING \u2022 WORKOUT LIBRARY</div><h1>TRAINING <span>VIDEOS.</span></h1>'
   +'<p>Your complete weekly workout plan. Choose a day and tap any exercise to watch it right here. Want a plan built for you? Message me on WhatsApp.</p>'
   +waBtn('','Start coaching on WhatsApp')+'</section><div class="days">'+cards+'</div>'+cta();
}
function dayInner(cfg){
  var i=DAYS.findIndex(function(d){return d[0]===cfg.day});
  var tabs=DAYS.map(function(d){return '<a href="'+href(d[0])+'"'+(d[0]===cfg.day?' class="active" aria-current="page"':'')+'>'+d[1]+'</a>'}).join('');
  var prev=i>0?'<a href="'+href(DAYS[i-1][0])+'">\u2190 '+DAYS[i-1][1]+'</a>':'<span></span>';
  var next=i>=0&&i<DAYS.length-1?'<a href="'+href(DAYS[i+1][0])+'">'+DAYS[i+1][1]+' \u2192</a>':'<span></span>';
  return '<section class="hero"><div class="eyebrow">WORKOUT DAY</div><h1>'+cfg.title.toUpperCase()+' <span>WORKOUT.</span></h1>'
   +'<p>Tap any exercise to watch it right here. Want a plan built for you? Message me on WhatsApp.</p></section>'
   +(DAYS.length>1?'<nav class="tabs" aria-label="Days">'+tabs+'<a href="'+href('home')+'">\u2302 Home</a></nav>':'')
   +'<div class="grid" id="grid"></div>'
   +(DAYS.length>1?'<div class="daypager">'+prev+next+'</div>':'')+cta()
   +'<p class="note">Sets/reps are shown as supplied. Handstand and planche variations require appropriate skill level and supervision; train within your ability.</p>';
}

function renderGrid(cfg){
  var grid=document.getElementById('grid');
  visible=cfg.workouts;
  if(!visible.length){var e=document.createElement('p');e.className='empty';e.textContent='Videos for '+cfg.title+' are coming soon.';grid.append(e);return}
  visible.forEach(function(w,i){ // w = [title, dose, file]
    var card=document.createElement('article');card.className='card';
    var thumb=document.createElement('button');thumb.className='thumb';
    var badge=document.createElement('span');badge.className='badge';badge.textContent=cfg.title.toUpperCase();
    if(w[2]){
      thumb.setAttribute('aria-label','Watch '+w[0]);
      var img=document.createElement('img');img.src=poster(w[2]);img.alt='Preview of '+w[0];img.loading='lazy';
      var play=document.createElement('span');play.className='play';play.textContent='\u25b6';
      thumb.append(img,play,badge);thumb.onclick=function(){openVideo(i)};
    }else{
      thumb.classList.add('soon');thumb.disabled=true;
      var s=document.createElement('span');s.className='soon-label';s.textContent='VIDEO COMING SOON';
      thumb.append(s,badge);
    }
    var content=document.createElement('div');content.className='content';
    var title=document.createElement('h3');title.textContent=(i+1)+'. '+w[0];
    var meta=document.createElement('div');meta.className='meta';
    if(w[1]){var dose=document.createElement('span');dose.className='dose';dose.textContent=w[1];meta.append(dose)}
    if(w[2]){var t=document.createElement('span');t.className='watch';t.textContent='\u25b6 Watch';meta.append(t)}
    content.append(title,meta);card.append(thumb,content);grid.append(card);
  });
}

function step(dir){ // next/prev playable video in this day
  var j=idx;
  for(var n=0;n<visible.length;n++){j=(j+dir+visible.length)%visible.length;if(visible[j][2])return j}
  return idx;
}
function openVideo(i){
  idx=i;var w=visible[i];
  document.getElementById('modal-title').textContent=w[1]?w[0]+' \u2022 '+w[1]:w[0];
  verr.classList.remove('show');
  player.src=video(w[2]);
  player.poster=poster(w[2]);
  modal.classList.add('open');document.body.style.overflow='hidden';
  var p=player.play();if(p&&p.catch)p.catch(function(){});
}
function closeVideo(){modal.classList.remove('open');player.pause();player.removeAttribute('src');player.load();document.body.style.overflow=''}

document.addEventListener('keydown',function(e){
  if(!modal||!modal.classList.contains('open'))return;
  if(e.key==='Escape')closeVideo();
  if(e.key==='ArrowRight')openVideo(step(1));
  if(e.key==='ArrowLeft')openVideo(step(-1));
});

function mount(cfg){
  document.body.style.overflow='';
  document.body.innerHTML=shell(cfg.day?dayInner(cfg):homeInner());
  document.querySelectorAll('[data-wa]').forEach(function(a){a.href=waLink()});
  modal=document.getElementById('modal');player=document.getElementById('player');verr=document.getElementById('verr');
  player.addEventListener('error',function(){if(player.getAttribute('src'))verr.classList.add('show')});
  document.getElementById('close').onclick=closeVideo;
  document.getElementById('next').onclick=function(){openVideo(step(1))};
  document.getElementById('prev').onclick=function(){openVideo(step(-1))};
  modal.addEventListener('click',function(e){if(e.target===modal)closeVideo()});
  if(cfg.day)renderGrid(cfg);
}
window.MJ={mount:mount};
})();
