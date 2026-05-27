const cur=document.getElementById('cur'),cr=document.getElementById('cr');
document.addEventListener('mousemove',e=>{cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';cr.style.left=e.clientX+'px';cr.style.top=e.clientY+'px'});
document.querySelectorAll('a,button,.pj,.sc2,.ftab').forEach(el=>{el.addEventListener('mouseenter',()=>cr.classList.add('h'));el.addEventListener('mouseleave',()=>cr.classList.remove('h'))});
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('sc',scrollY>60));
setTimeout(()=>document.getElementById('hbg').classList.add('go'),100);
const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('vis')}),{threshold:.1});
document.querySelectorAll('.rev').forEach(r=>obs.observe(r));
document.querySelectorAll('.ftab').forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('.ftab').forEach(x=>x.classList.remove('on'));t.classList.add('on');const f=t.dataset.f;document.querySelectorAll('.pj').forEach(p=>p.classList.toggle('v',f==='all'||p.dataset.c===f))}));
function olb(el){document.getElementById('lbi').src=el.querySelector('img').src;document.getElementById('lbc').textContent=el.querySelector('.pname').textContent+' · '+el.querySelector('.ploc').textContent;document.getElementById('lb').classList.add('op');document.body.style.overflow='hidden'}
function clb(){document.getElementById('lb').classList.remove('op');document.body.style.overflow=''}
document.getElementById('lb').addEventListener('click',function(e){if(e.target===this)clb()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')clb()});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));
const ham=document.getElementById('ham'),nmob=document.getElementById('nmob'),novl=document.getElementById('nav-overlay');
if(ham){
  ham.addEventListener('click',()=>{nmob.classList.toggle('open');novl.classList.toggle('show')});
  novl.addEventListener('click',()=>{nmob.classList.remove('open');novl.classList.remove('show')});
  document.querySelectorAll('.nmob a').forEach(a=>a.addEventListener('click',()=>{nmob.classList.remove('open');novl.classList.remove('show')}));
}
