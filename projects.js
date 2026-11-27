const $=s=>document.querySelector(s);
// Both language versions use the same project destinations.
const projectUrls = {
  perdiknas: null,
  'hr-mobile': null,
  ecommerce: null
};
function renderProject(p,i){
 const container = document.createElement('article');
 container.className = 'card project-card';
 const card = document.createElement('button');
 card.className = 'project-details';
 card.type = 'button';
 container.append(card);
 card.innerHTML='<div aria-hidden="true" class="thumb '+['olive','violet','blue'][i % 3]+'">'+(previews[i] || '')+'</div><div class="cardcopy"><span class="category">'+p.type+'</span><h3>'+p.name+'</h3><p>'+p.summary+'</p></div>';
 card.onclick=()=>{$('#bodydetail').innerHTML='<div class="eyebrow">'+p.type+'</div><h2>'+p.name+'<span>.</span></h2><p>'+p.detail+'</p><p><b>'+copy.stage+'</b> · '+p.status+'</p><p>'+p.tech+'</p><small>'+copy.illustration+'</small>';$('#detail').showModal()};
 const destination = projectUrls[p.id];
 const english = document.documentElement.lang === 'en';
 const action = document.createElement(destination ? 'a' : 'button');
 action.className = 'outline project-link';
 action.textContent = english ? 'Open project' : 'Buka proyek';
 action.setAttribute('aria-label', action.textContent + ' · ' + p.name);
 container.append(action);
 if (destination) {
   action.href = destination;
   action.target = '_blank';
   action.rel = 'noopener noreferrer';
 } else {
   action.type = 'button';
   action.disabled = true;
   const note = document.createElement('small');
   note.className = 'project-link-note';
   note.id = 'link-status-' + p.id;
   note.textContent = english ? 'Link not yet available' : 'Tautan belum tersedia';
   action.setAttribute('aria-describedby', note.id);
   container.append(note);
 }
 $('#cards').append(container);
}
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.close').onclick=()=>d.close();d.onclick=e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}});
const featuredCount = 3;
const pageSize = 3;
const pagination = $('#pagination');
if (!pagination) {
  projects.slice(0, featuredCount).forEach(renderProject);
} else {
  const en = document.documentElement.lang === 'en';
  const url = new URL(location.href);
  const requested = Number(url.searchParams.get('page'));
  const total = Math.max(1, Math.ceil(projects.length / pageSize));
  const current = Number.isInteger(requested) ? Math.min(total, Math.max(1, requested)) : 1;
  const offset = (current - 1) * pageSize;
  projects.slice(offset, offset + pageSize).forEach((project, index) => renderProject(project, offset + index));
  const query = current === 1 ? '' : '?page=' + current;
  if (url.searchParams.has('page') && url.search !== query) history.replaceState(null, '', url.pathname + query + url.hash);
  document.querySelectorAll('.languages a').forEach(link => { link.search = query; });
  $('#project-count').textContent = projects.length + (en ? ' projects' : ' proyek');
  $('#page-state').textContent = en ? 'Page ' + current + ' of ' + total : 'Halaman ' + current + ' dari ' + total;
  function pageControl(label, page) {
    const enabled = page >= 1 && page <= total;
    const control = document.createElement(enabled ? 'a' : 'span');
    control.className = 'page-control';
    control.textContent = label;
    if (enabled) control.href = url.pathname + (page === 1 ? '' : '?page=' + page);
    else control.setAttribute('aria-disabled', 'true');
    return control;
  }
  pagination.prepend(pageControl(en ? 'Previous' : 'Sebelumnya', current - 1));
  pagination.append(pageControl(en ? 'Next' : 'Berikutnya', current + 1));
}
