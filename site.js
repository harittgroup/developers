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
if(f.elements.hp&&f.elements.hp.value)return;
var d={name:v('name'),email:v('email'),company:v('company'),site:v('site'),services:svcs,budget:v('budget'),timeline:v('timeline'),desc:v('desc'),src:'developers.haritt.com/contact',status:'new'};
var b=f.querySelector('button[type=submit]'),bh=b.innerHTML,er=document.getElementById('enqErr');b.disabled=true;b.textContent='Sending…';er.style.display='none';
var id='';for(var i=0;i<20;i++)id+='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random()*62)];
var fl={};Object.keys(d).forEach(function(k){if(d[k])fl[k]={stringValue:d[k]}});
fetch('https://firestore.googleapis.com/v1/projects/harsh-reset/databases/(default)/documents:commit?key=AIzaSyDggasAVdqpvamkn1xeex2NmPUqG9JiZJ4',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({writes:[{update:{name:'projects/harsh-reset/databases/(default)/documents/enquiries/'+id,fields:fl},updateTransforms:[{fieldPath:'at',setToServerValue:'REQUEST_TIME'}],currentDocument:{exists:false}}]})})
.then(function(r){if(!r.ok)throw new Error(r.status);
var h='';if(h){try{fetch(h,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(Object.assign({id:id},d)),keepalive:true}).catch(function(){})}catch(x){}}
var ok=document.getElementById('ok');ok.querySelector('b').textContent=d.name.split(' ')[0];ok.querySelector('i').textContent=d.email;
f.querySelectorAll('.ff,.fr,button[type=submit],.fnote').forEach(function(x){x.style.display='none'});ok.style.display='block';ok.scrollIntoView({block:'center',behavior:'smooth'})})
.catch(function(){b.disabled=false;b.innerHTML=bh;er.style.display='block';
var mt='mailto:developers@haritt.com?subject='+encodeURIComponent('Project enquiry: '+(d.company||d.name))+'&body='+encodeURIComponent('Name: '+d.name+'\nEmail: '+d.email+'\nCompany: '+(d.company||'-')+'\nWebsite: '+(d.site||'-')+'\nServices: '+svcs+'\nBudget: '+d.budget+'\nTimeline: '+d.timeline+'\n\n'+d.desc);er.querySelector('a').href=mt;location.href=mt})});})();