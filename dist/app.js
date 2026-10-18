const templates={studio:{name:'Studio',category:'Agency & creative business'},folio:{name:'Folio',category:'Portfolio & personal brand'},signal:{name:'Signal',category:'SaaS & digital products'},sunday:{name:'Sunday',category:'Commerce & lifestyle'},chapter:{name:'Chapter',category:'Editorial & publications'},gather:{name:'Gather',category:'Events & communities'}};
const grid=document.querySelector('#template-grid');
const cards=[...grid.children];
let activeFilter='all';
function updateCollection(){
  let count=0;
  cards.forEach(card=>{card.hidden=activeFilter!=='all'&&card.dataset.category!==activeFilter;if(!card.hidden)count++;});
  const mode=document.querySelector('#sort').value;
  const ordered=[...cards];
  if(mode!=='featured')ordered.sort((a,b)=>mode==='az'?a.dataset.name.localeCompare(b.dataset.name):b.dataset.name.localeCompare(a.dataset.name));
  ordered.forEach(card=>grid.append(card));
  const label=activeFilter==='all'?`Showing all ${count} templates`:`Showing ${count} ${count===1?'template':'templates'}`;
  const status=document.querySelector('#result-count');
  status.replaceChildren(document.createTextNode(label));
  const caption=document.createElement('span');caption.textContent='MORE POSSIBILITY, LESS BLANK CANVAS.';status.append(caption);
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  activeFilter=button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(filter=>{const active=filter===button;filter.classList.toggle('active',active);filter.setAttribute('aria-pressed',String(active));});
  updateCollection();
}));
document.querySelector('#sort').addEventListener('change',updateCollection);
const dialog=document.querySelector('#preview-dialog');
const frame=document.querySelector('#preview-frame');
let previousFocus=null;
function setDevice(device){frame.classList.toggle('mobile',device==='mobile');document.querySelectorAll('[data-device]').forEach(button=>{const active=button.dataset.device===device;button.classList.toggle('selected',active);button.setAttribute('aria-pressed',String(active));});}
function openPreview(id){
  const template=templates[id];if(!template)return;
  previousFocus=document.activeElement;
  document.querySelector('#preview-title').textContent=template.name;
  document.querySelector('#preview-category').textContent=template.category;
  frame.src=`templates/${id}.html`;frame.title=`${template.name} template preview`;
  const download=document.querySelector('#preview-download');download.href=`templates/${id}.html`;download.download=`forma-${id}.html`;
  document.querySelector('#preview-open').href=`templates/${id}.html`;
  setDevice('desktop');
  dialog.showModal();document.body.classList.add('modal-open');document.querySelector('.preview-close').focus();
}
document.querySelectorAll('[data-preview]').forEach(button=>button.addEventListener('click',()=>openPreview(button.dataset.preview)));
document.querySelectorAll('[data-device]').forEach(button=>button.addEventListener('click',()=>setDevice(button.dataset.device)));
document.querySelector('.preview-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');frame.removeAttribute('src');previousFocus?.focus();});
const menuToggle=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('#mobile-nav');
function closeMenu(){menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open menu');mobileNav.hidden=true;}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu');mobileNav.hidden=!open;});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
document.addEventListener('click',event=>{if(!mobileNav.hidden&&!mobileNav.contains(event.target)&&!menuToggle.contains(event.target))closeMenu();});
document.querySelector('#year').textContent=new Date().getFullYear();
