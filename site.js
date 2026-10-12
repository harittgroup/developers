(function(){var n=document.getElementById('nav'),m=document.getElementById('mb'),l=document.getElementById('lk');
function s(){n.classList.toggle('s',scrollY>10)}s();addEventListener('scroll',s,{passive:true});
m&&m.addEventListener('click',function(){var o=l.classList.toggle('o');m.setAttribute('aria-expanded',o)});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
var f=document.getElementById('enq');if(!f)return;
var pre=new URLSearchParams(location.search).get('service');if(pre){var c=f.querySelector('input[name=svc][value="'+pre+'"]');if(c)c.checked=true}
f.addEventListener('submit',function(e){e.preventDefault();var ok=true;
function chk(id,cond){var w=f.querySelector('[data-f='+id+']');w.classList.toggle('bad',!cond);if(!cond&&ok){ok=false;var i=w.querySelector('input,textarea');i&&i.focus()}}
var v=function(n){return (f.elements[n].value||'').trim()};
chk('name',v('name').length>1);chk('email',/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email')));chk('desc',v('desc').length>9);chk('consent',f.elements.consent.checked);
if(!ok)return;
var svcs=[].map.call(f.querySelectorAll('input[name=svc]:checked'),function(x){return x.value}).join(', ')||'Not sure yet';
var body='Name: '+v('name')+'\nEmail: '+v('email')+'\nCompany: '+(v('company')||'-')+'\nWebsite: '+(v('site')||'-')+'\nServices: '+svcs+'\nBudget: '+v('budget')+'\nTimeline: '+v('timeline')+'\n\nAbout the project:\n'+v('desc');
location.href='mailto:hello@haritt.com?subject='+encodeURIComponent('Project enquiry: '+(v('company')||v('name')))+'&body='+encodeURIComponent(body);
document.getElementById('ok').style.display='block'});})();