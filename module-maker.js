(() => {
  const root = document.getElementById('modulemaker-view');
  if (!root) return;

  const STORAGE_KEY = 'hireflowTeacherCreatedModules';
  const account = () => typeof getCurrentAccount === 'function' ? getCurrentAccount() : {};
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const readModules = () => {
    try { const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(value) ? value : []; }
    catch { return []; }
  };
  const saveModules = modules => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(modules)); return true; }
    catch { window.showToast?.('Could not save this module. The content may be too large for browser storage.'); return false; }
  };
  const templates = {
    blank: { title: '', category: 'General', description: '', duration: '30 minutes', objectives: '', blocks: [{type:'heading',value:'Learning objectives',caption:''},{type:'text',value:'Add an introduction to your module here.',caption:''}] },
    lesson: { title: 'Foundations of the Topic', category: 'Lesson', description: 'A guided lesson with clear concepts and practical takeaways.', duration: '45 minutes', objectives: 'Explain the core idea; apply it to a practical example.', blocks: [{type:'heading',value:'Start with the essentials',caption:''},{type:'text',value:'Introduce the topic, explain why it matters, and connect it to learners’ experience.',caption:''},{type:'callout',value:'Key idea: keep the learning focused, practical, and inclusive.',caption:''},{type:'list',value:'Understand the core concept\nIdentify a real-world example\nApply the idea in your own work',caption:''},{type:'quote',value:'What is one new idea you can put into practice?',caption:''}] },
    workshop: { title: 'Practical Skills Workshop', category: 'Workshop', description: 'A hands-on learning experience that moves from demonstration to practice.', duration: '60 minutes', objectives: 'Practice a useful skill; reflect on feedback and next steps.', blocks: [{type:'heading',value:'The challenge',caption:''},{type:'text',value:'Describe the scenario and what learners should accomplish.',caption:''},{type:'callout',value:'Try it: pause here and write down your first approach.',caption:''},{type:'heading',value:'Reflect and improve',caption:''},{type:'text',value:'Invite learners to reflect on what worked, what was difficult, and what they would change.',caption:''}] },
    guide: { title: 'Step-by-Step Field Guide', category: 'Quick guide', description: 'A concise guide learners can refer back to while completing a task.', duration: '20 minutes', objectives: 'Follow the process and check the quality of the result.', blocks: [{type:'heading',value:'Before you begin',caption:''},{type:'list',value:'Gather the information you need\nReview the goal and criteria\nChoose a quiet place to focus',caption:''},{type:'heading',value:'Follow these steps',caption:''},{type:'list',value:'Step 1: describe the first action\nStep 2: complete the main task\nStep 3: review your work',caption:''},{type:'callout',value:'Quality check: does your result meet the goal?',caption:''}] }
  };
  let activeId = '';
  let blocks = [];
  let draggedBlock = -1;
  let builderFocus = false;
  let previousSidebarCollapsed = false;

  const safeImage = value => {
    const url = String(value || '').trim();
    return /^(https?:\/\/|data:image\/(png|jpeg|gif|webp);base64,|\/|\.\/)/i.test(url) ? url : '';
  };
  const renderBlockPreview = block => {
    const content = escapeHtml(block.value).replace(/\n/g, '<br>');
    if (block.type === 'heading') return `<h2>${content || 'Section heading'}</h2>`;
    if (block.type === 'text') return `<p>${content || 'Your lesson text will appear here.'}</p>`;
    if (block.type === 'quote') return `<blockquote>${content || 'Add a reflection prompt or quote.'}</blockquote>`;
    if (block.type === 'callout') return `<aside class="mm-callout">${content || 'Add a key takeaway.'}</aside>`;
    if (block.type === 'list') return `<ul>${String(block.value || '').split('\n').filter(Boolean).map(item => `<li>${escapeHtml(item)}</li>`).join('') || '<li>Add list items on separate lines.</li>'}</ul>`;
    if (block.type === 'image') { const src = safeImage(block.value); return src ? `<figure><img src="${escapeHtml(src)}" alt="${escapeHtml(block.caption || 'Module image')}"><figcaption>${escapeHtml(block.caption || '')}</figcaption></figure>` : '<div class="mm-image-placeholder">Add an image URL or upload an image</div>'; }
    if (block.type === 'video') { const url = safeImage(block.value); return url ? `<p class="mm-link-preview">Video resource: <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a></p>` : '<p>Add a video link for learners.</p>'; }
    return '<hr>';
  };
  const blockTitle = type => ({heading:'Heading',text:'Text',image:'Image',quote:'Reflection / quote',list:'Checklist',callout:'Key takeaway',video:'Video link',divider:'Divider'})[type] || 'Content';

  function setBuilderFocus(enabled) {
    const app = document.getElementById('app-shell');
    if (enabled && !builderFocus) {
      previousSidebarCollapsed = app?.classList.contains('sidebar-collapsed') || false;
    }
    builderFocus = enabled;
    app?.classList.toggle('mm-builder-fullscreen', enabled);
    app?.classList.toggle('sidebar-collapsed', enabled || previousSidebarCollapsed);
    const collapseButton = document.querySelector('.sidebar-collapse-button');
    if (collapseButton) {
      collapseButton.setAttribute('aria-expanded', String(!enabled && !previousSidebarCollapsed));
      collapseButton.setAttribute('aria-label', enabled || previousSidebarCollapsed ? 'Expand left panel' : 'Collapse left panel');
      collapseButton.textContent = enabled || previousSidebarCollapsed ? '›' : '‹';
    }
  }

  function ensureLivePreview() {
    if (document.querySelector('[data-mm-live-preview]')) return;
    const preview = document.createElement('section');
    preview.className = 'mm-live-preview';
    preview.dataset.mmLivePreview = '';
    preview.hidden = true;
    preview.setAttribute('role', 'dialog');
    preview.setAttribute('aria-modal', 'true');
    preview.setAttribute('aria-label', 'Live module preview');
    preview.innerHTML = '<button type="button" class="mm-live-close" data-mm-live-close aria-label="Close live preview">×</button><div data-mm-live-content></div>';
    document.body.append(preview);
  }

  function updateLivePreview() {
    const content = document.querySelector('[data-mm-live-content]');
    const values = collectForm();
    if (!content || !values) return;
    content.innerHTML = `<article class="mm-student-paper"><p class="eyebrow">${escapeHtml(values.category || 'LEARNING MODULE')} · ${escapeHtml(values.duration || 'SELF-PACED')}</p><h1>${escapeHtml(values.title || 'Your module title')}</h1><p class="mm-student-intro">${escapeHtml(values.description || 'Your module description will appear here.')}</p>${values.objectives ? `<section class="mm-objectives"><strong>Learning objectives</strong><p>${escapeHtml(values.objectives)}</p></section>` : ''}<div class="mm-student-content">${values.blocks.map(renderBlockPreview).join('')}</div></article>`;
  }

  function renderMaker() {
    const teacher = account();
    if (teacher.role !== 'teacher') {
      root.innerHTML = '<section class="mm-access-message"><span>✦</span><h1>Module Maker</h1><p>This workspace is available to teachers.</p></section>';
      return;
    }
    const mine = readModules().filter(item => item.teacherEmail === teacher.email);
    const published = mine.filter(item => item.status === 'published').length;
    root.innerHTML = `<div class="mm-page${builderFocus ? ' mm-editor-focus' : ''}"><header class="mm-hero"><div><p class="eyebrow">TEACHER WORKSPACE · CONTENT STUDIO</p><h1>Module Maker</h1><p>Build a polished learning experience, save it as a draft, then publish it to your class Learning Hub.</p></div><div class="mm-hero-stats"><button type="button" class="mm-stat-link" data-mm-show-modules aria-label="View your ${mine.length} saved modules"><strong>${mine.length}</strong>Modules</button><span><strong>${published}</strong>Published</span></div>${builderFocus ? '<button type="button" class="mm-live-button" data-mm-live-open aria-controls="mm-live-preview">Live view</button>' : ''}</header>
      <div class="mm-layout"><aside class="mm-library"><div class="mm-library-heading"><div><p class="eyebrow">YOUR LIBRARY</p><h2>My modules</h2></div><button type="button" class="mm-primary" data-mm-new>＋ New module</button></div>
      <div class="mm-module-list" data-mm-saved-modules>${mine.length ? mine.slice().sort((a,b)=>String(b.updatedAt||'').localeCompare(String(a.updatedAt||''))).map(item=>`<article class="mm-module-card ${item.id===activeId?'is-selected':''}"><span class="mm-status ${item.status==='published'?'is-published':''}">${item.status==='published'?'Published':'Draft'}</span><h3>${escapeHtml(item.title || 'Untitled module')}</h3><p>${escapeHtml(item.description || 'Add a short module description.')}</p><small>${escapeHtml(item.category || 'General')} · Updated ${item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'just now'}</small><div class="mm-card-actions"><button type="button" data-mm-edit="${escapeHtml(item.id)}">Edit</button>${item.status==='published'?`<button type="button" data-mm-unpublish="${escapeHtml(item.id)}">Unpublish</button>`:`<button type="button" data-mm-publish="${escapeHtml(item.id)}">Publish</button>`}<button type="button" class="mm-delete" data-mm-delete="${escapeHtml(item.id)}" aria-label="Delete ${escapeHtml(item.title || 'module')}">Delete</button></div></article>`).join('') : '<div class="mm-empty"><span>✦</span><strong>Your module drafts will live here</strong><p>Start with a template, add lesson blocks, and save your work at any time.</p></div>'}</div></aside>
             <section class="mm-editor-shell"><div class="mm-editor-top"><div><p class="eyebrow">MODULE EDITOR</p><h2>${activeId ? 'Edit your module' : 'Create a learning module'}</h2>${builderFocus ? '<button type="button" class="mm-secondary mm-exit-focus" data-mm-exit-focus>← Back to module library</button>' : ''}</div><label class="mm-template-select">Start from a template<select data-mm-template><option value="">Choose a template</option><option value="lesson">Guided lesson</option><option value="workshop">Practical workshop</option><option value="guide">Step-by-step guide</option></select></label></div>
      <form class="mm-form" data-mm-form><div class="mm-details-grid"><label>Module title<input name="title" required maxlength="120" placeholder="e.g. Fair and effective interviewing"></label><label>Category<input name="category" maxlength="50" placeholder="e.g. Recruitment skills"></label><label class="mm-span-two">Short description<textarea name="description" required rows="2" maxlength="300" placeholder="What will learners explore in this module?"></textarea></label><label>Estimated time<input name="duration" maxlength="40" placeholder="e.g. 30 minutes"></label><label>Learning objectives<textarea name="objectives" rows="2" maxlength="500" placeholder="What should learners know or be able to do?"></textarea></label></div>
      <div class="mm-content-heading"><div><p class="eyebrow">LESSON CONTENT</p><h3>Build your learning experience</h3><p>Drag blocks to reorder. Add images, prompts, checklists, and more.</p></div><span class="mm-block-count" data-mm-count>${blocks.length} blocks</span></div>
      <div class="mm-toolbar" role="toolbar" aria-label="Add content block"><span>＋ Add block</span>${['heading','text','image','quote','list','callout','video','divider'].map(type=>`<button type="button" draggable="true" data-mm-add="${type}" title="Add ${blockTitle(type)}">${({heading:'H',text:'T',image:'▧',quote:'❞',list:'☷',callout:'✦',video:'▶',divider:'―'})[type]} <span>${blockTitle(type)}</span></button>`).join('')}</div>
      <div class="mm-blocks" data-mm-blocks>${blocks.map((block,index)=>`<article class="mm-block-editor" draggable="true" data-mm-block="${index}"><header><span class="mm-drag-handle" aria-label="Drag to reorder">⠿</span><strong>${blockTitle(block.type)}</strong><span class="mm-block-controls"><button type="button" data-mm-up="${index}" aria-label="Move up" ${index===0?'disabled':''}>↑</button><button type="button" data-mm-down="${index}" aria-label="Move down" ${index===blocks.length-1?'disabled':''}>↓</button><button type="button" data-mm-remove="${index}" aria-label="Remove block">×</button></span></header><div class="mm-block-fields">${block.type==='divider'?'<p class="mm-divider-note">A visual divider will appear in your module.</p>':block.type==='image'?`<label>Image URL<input data-mm-value="${index}" value="${escapeHtml(block.value)}" placeholder="https://example.com/image.jpg"></label><label>Or upload an image<input type="file" accept="image/png,image/jpeg,image/gif,image/webp" data-mm-upload="${index}"></label><label>Image caption<input data-mm-caption="${index}" value="${escapeHtml(block.caption)}" maxlength="160" placeholder="Describe the image"></label>`:block.type==='video'?`<label>Video URL<input data-mm-value="${index}" value="${escapeHtml(block.value)}" type="url" placeholder="https://…"></label>`:block.type==='heading'?`<label>Section heading<input data-mm-value="${index}" value="${escapeHtml(block.value)}" maxlength="120" placeholder="Section heading"></label>`:`<label>${block.type==='list'?'One list item per line':blockTitle(block.type)}<textarea data-mm-value="${index}" rows="${block.type==='list'?4:3}" maxlength="1800" placeholder="Write your ${blockTitle(block.type).toLowerCase()}…">${escapeHtml(block.value)}</textarea></label>`}</div><div class="mm-block-preview"><small>PREVIEW</small>${renderBlockPreview(block)}</div></article>`).join('')}</div>
             <div class="mm-editor-footer"><span data-mm-save-status>Changes are saved when you click Save draft.</span><div><button type="button" class="mm-secondary" data-mm-save>Save draft</button><button type="button" class="mm-primary" data-mm-publish-current>Publish to Learning Hub <span aria-hidden="true">→</span></button></div></div></form></section></div>`;
    const selected = mine.find(item => item.id === activeId);
    if (selected) populateForm(selected);
    ensureLivePreview();
    updateLivePreview();
  }

  function populateForm(item) {
    const form = root.querySelector('[data-mm-form]');
    if (!form) return;
    for (const name of ['title','category','description','duration','objectives']) if (form.elements[name]) form.elements[name].value = item[name] || '';
  }
  function collectForm() {
    const form = root.querySelector('[data-mm-form]');
    if (!form) return null;
    const data = new FormData(form);
    return {title:String(data.get('title')||'').trim(),category:String(data.get('category')||'General').trim()||'General',description:String(data.get('description')||'').trim(),duration:String(data.get('duration')||'').trim(),objectives:String(data.get('objectives')||'').trim(),blocks:blocks.map(block=>({...block}))};
  }
  function persist(status = 'draft', rerender = true) {
    const values = collectForm();
    if (!values) return false;
    if (!values.title || !values.description) { window.showToast?.('Add a module title and short description before saving.'); root.querySelector('[name="title"]')?.focus(); return false; }
    const teacher = account(), all = readModules(), now = new Date().toISOString();
    let record = all.find(item => item.id === activeId && item.teacherEmail === teacher.email);
    if (!record) { activeId = `module-${Date.now()}-${Math.random().toString(36).slice(2,7)}`; record = {id:activeId,createdAt:now}; }
    const next = {...record,...values,id:activeId,teacherEmail:teacher.email,teacherName:teacher.name||'Teacher',teacherCode:teacher.teacherCode||'',subject:teacher.subject||'',status,updatedAt:now,publishedAt:status==='published'?(record.publishedAt||now):record.publishedAt||''};
    const updated = all.filter(item=>item.id!==activeId); updated.unshift(next);
        if (!saveModules(updated)) return false;
     if (rerender) {
       setBuilderFocus(false);
       renderMaker();
     }
    return true;
  }
  function loadTemplate(name) {
    const template = templates[name];
    if (!template) return;
    blocks = template.blocks.map(block=>({...block}));
    renderMaker();
    const form = root.querySelector('[data-mm-form]');
    if (!form) return;
    for (const field of ['title','category','description','duration','objectives']) if (form.elements[field]) form.elements[field].value = template[field] || '';
    window.showToast?.('Template loaded. Customize it and save your draft.');
  }
  function startNew(templateName = 'blank') {
    activeId = '';
    setBuilderFocus(true);
    blocks = templates[templateName].blocks.map(block=>({...block}));
    renderMaker();
    if (templateName !== 'blank') loadTemplate(templateName);
    root.querySelector('[name="title"]')?.focus();
  }
  function renderPublishedHub() {
    const hub = document.getElementById('learning-view');
    if (!hub) return;
    hub.querySelector('[data-mm-published-list]')?.remove();
    hub.querySelector('[data-mm-student-module]')?.remove();
    const viewer = account(), all = readModules();
    const related = all.filter(item => item.status === 'published' && (viewer.role === 'teacher'
      ? item.teacherEmail === viewer.email
      : viewer.role === 'student' && String(item.teacherCode||'').trim().toUpperCase() === String(viewer.teacherCode||'').trim().toUpperCase() && String(item.subject||'').trim().toLowerCase() === String(viewer.subject||'').trim().toLowerCase()));
    if (!related.length) return;
    const panel = document.createElement('section');
    panel.className = 'mm-hub-panel'; panel.dataset.mmPublishedList = '';
    panel.innerHTML = `<div class="mm-hub-heading"><div><p class="eyebrow">${viewer.role==='teacher'?'YOUR PUBLISHED MODULES':'YOUR CLASSROOM'}</p><h2>${viewer.role==='teacher'?'Published learning modules':'Learning modules from your teacher'}</h2><p>${viewer.role==='teacher'?'These modules are visible to students in your class.':'Open a module to begin learning.'}</p></div><span>${related.length} module${related.length===1?'':'s'}</span></div><div class="mm-hub-grid">${related.map(item=>`<article class="mm-hub-card"><span class="mm-status is-published">${escapeHtml(item.category||'Learning module')}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p><div><small>${escapeHtml(item.duration||'Self-paced')} · By ${escapeHtml(item.teacherName||'Teacher')}</small><button type="button" data-mm-open="${escapeHtml(item.id)}">Open module <span aria-hidden="true">→</span></button></div></article>`).join('')}</div>`;
    hub.append(panel);
    const overlay = document.createElement('section');
    overlay.className = 'mm-student-module'; overlay.dataset.mmStudentModule = ''; overlay.hidden = true;
    hub.append(overlay);
  }

  root.addEventListener('submit',event=>{if(event.target.matches('[data-mm-form]')){event.preventDefault();if(persist('draft'))window.showToast?.('Module draft saved.');}});
  root.addEventListener('input',event=>{
    const target=event.target;
    if(target.matches('[data-mm-value]')) {const index=Number(target.dataset.mmValue);if(blocks[index])blocks[index].value=target.value;const preview=target.closest('.mm-block-editor')?.querySelector('.mm-block-preview');if(preview)preview.innerHTML=`<small>PREVIEW</small>${renderBlockPreview(blocks[index])}`;}
    if(target.matches('[data-mm-caption]')) {const index=Number(target.dataset.mmCaption);if(blocks[index])blocks[index].caption=target.value;const preview=target.closest('.mm-block-editor')?.querySelector('.mm-block-preview');if(preview)preview.innerHTML=`<small>PREVIEW</small>${renderBlockPreview(blocks[index])}`;}
         if(target.closest('[data-mm-form]')) {const status=root.querySelector('[data-mm-save-status]');if(status)status.textContent='Unsaved changes';updateLivePreview();}
   });
  root.addEventListener('change',event=>{
         if(event.target.matches('[data-mm-template]')) {const value=event.target.value;event.target.value='';if(value)loadTemplate(value);}
     if(event.target.matches('[data-mm-upload]')) {const file=event.target.files?.[0],index=Number(event.target.dataset.mmUpload);if(!file||!blocks[index])return;if(file.size>1200000){window.showToast?.('Choose an image smaller than 1.2 MB.');event.target.value='';return;}const reader=new FileReader();reader.onload=()=>{blocks[index].value=String(reader.result||'');renderMaker();};reader.readAsDataURL(file);}
     if(event.target.closest('[data-mm-form]')) updateLivePreview();
   });
  root.addEventListener('click',event=>{
         if(event.target.closest('[data-mm-new]')){startNew();return;}
     if(event.target.closest('[data-mm-exit-focus]')){setBuilderFocus(false);renderMaker();return;}
     if(event.target.closest('[data-mm-live-open]')){ensureLivePreview();updateLivePreview();document.querySelector('[data-mm-live-preview]').hidden=false;document.querySelector('[data-mm-live-close]')?.focus();return;}
           if(event.target.closest('[data-mm-show-modules]')){root.querySelector('[data-mm-saved-modules]')?.scrollIntoView({behavior:'smooth',block:'start'});return;}
     const add=event.target.closest('[data-mm-add]');if(add){blocks.push({type:add.dataset.mmAdd,value:'',caption:''});renderMaker();root.querySelector(`[data-mm-remove="${blocks.length-1}"]`)?.closest('.mm-block-editor')?.scrollIntoView({block:'nearest',behavior:'smooth'});return;}
    const remove=event.target.closest('[data-mm-remove]');if(remove){blocks.splice(Number(remove.dataset.mmRemove),1);renderMaker();return;}
    const move=event.target.closest('[data-mm-up], [data-mm-down]');if(move){const index=Number(move.dataset.mmUp??move.dataset.mmDown),next=index+(move.hasAttribute('data-mm-up')?-1:1);if(next>=0&&next<blocks.length){[blocks[index],blocks[next]]=[blocks[next],blocks[index]];renderMaker();}return;}
    if(event.target.closest('[data-mm-save]')){if(persist('draft'))window.showToast?.('Module draft saved.');return;}
    if(event.target.closest('[data-mm-publish-current]')){if(persist('published')){renderPublishedHub();window.showToast?.('Module published to your class Learning Hub.');}return;}
         const edit=event.target.closest('[data-mm-edit]');if(edit){const item=readModules().find(module=>module.id===edit.dataset.mmEdit);if(item){activeId=item.id;blocks=(item.blocks||[]).map(block=>({...block}));renderMaker();}return;}
    const publish=event.target.closest('[data-mm-publish]');if(publish){const all=readModules(),teacher=account(),item=all.find(module=>module.id===publish.dataset.mmPublish&&module.teacherEmail===teacher.email);if(item){item.status='published';item.publishedAt=new Date().toISOString();item.updatedAt=item.publishedAt;if(saveModules(all)){renderMaker();renderPublishedHub();window.showToast?.('Module published to your class Learning Hub.');}}return;}
    const unpublish=event.target.closest('[data-mm-unpublish]');if(unpublish){const all=readModules(),item=all.find(module=>module.id===unpublish.dataset.mmUnpublish&&module.teacherEmail===account().email);if(item){item.status='draft';item.updatedAt=new Date().toISOString();if(saveModules(all)){if(activeId===item.id)activeId='';renderMaker();renderPublishedHub();window.showToast?.('Module unpublished and returned to drafts.');}}return;}
    const del=event.target.closest('[data-mm-delete]');if(del){const all=readModules().filter(module=>!(module.id===del.dataset.mmDelete&&module.teacherEmail===account().email));if(saveModules(all)){if(activeId===del.dataset.mmDelete)activeId='';renderMaker();renderPublishedHub();window.showToast?.('Module deleted.');}return;}
  });
  root.addEventListener('dragstart',event=>{const block=event.target.closest('[data-mm-block]');if(block){draggedBlock=Number(block.dataset.mmBlock);event.dataTransfer.effectAllowed='move';event.dataTransfer.setData('text/plain',String(draggedBlock));return;}const add=event.target.closest('[data-mm-add]');if(add){event.dataTransfer.setData('text/plain',`new:${add.dataset.mmAdd}`);event.dataTransfer.effectAllowed='copy';}});
  root.addEventListener('dragover',event=>{if(event.target.closest('[data-mm-block]')||event.target.closest('[data-mm-blocks]'))event.preventDefault();});
  root.addEventListener('drop',event=>{const target=event.target.closest('[data-mm-block]');if(!target)return;event.preventDefault();const data=event.dataTransfer.getData('text/plain');if(data.startsWith('new:')){blocks.splice(Number(target.dataset.mmBlock),0,{type:data.slice(4),value:'',caption:''});}else{const from=Number(data),to=Number(target.dataset.mmBlock);if(Number.isInteger(from)&&from!==to&&blocks[from]){const [block]=blocks.splice(from,1);blocks.splice(to,0,block);}}draggedBlock=-1;renderMaker();});
  root.addEventListener('dragend',()=>{draggedBlock=-1;});

  document.addEventListener('learning-view-rendered',renderPublishedHub);
     document.addEventListener('click',event=>{
     if(event.target.closest('[data-mm-live-close]')){const preview=document.querySelector('[data-mm-live-preview]');if(preview)preview.hidden=true;return;}
     const navigation=event.target.closest('[data-view]');
     if(navigation&&navigation.dataset.view!=='modulemaker'&&builderFocus){setBuilderFocus(false);}
     const open=event.target.closest('[data-mm-open]');
    if(open){const item=readModules().find(module=>module.id===open.dataset.mmOpen&&module.status==='published');if(!item)return;const overlay=document.querySelector('[data-mm-student-module]');if(!overlay)return;overlay.innerHTML=`<button type="button" class="mm-close-module" data-mm-close aria-label="Close module">×</button><article class="mm-student-paper"><p class="eyebrow">${escapeHtml(item.category||'LEARNING MODULE')} · ${escapeHtml(item.duration||'SELF-PACED')}</p><h1>${escapeHtml(item.title)}</h1><p class="mm-student-intro">${escapeHtml(item.description)}</p>${item.objectives?`<section class="mm-objectives"><strong>Learning objectives</strong><p>${escapeHtml(item.objectives)}</p></section>`:''}<div class="mm-student-content">${(item.blocks||[]).map(block=>renderBlockPreview(block)).join('')}</div><footer>Created by ${escapeHtml(item.teacherName||'Teacher')}</footer></article>`;overlay.hidden=false;document.body.classList.add('mm-module-open');overlay.querySelector('[data-mm-close]')?.focus();return;}
    if(event.target.closest('[data-mm-close]')){const overlay=document.querySelector('[data-mm-student-module]');if(overlay)overlay.hidden=true;document.body.classList.remove('mm-module-open');}
  });
     document.addEventListener('keydown',event=>{if(event.key==='Escape'){const preview=document.querySelector('[data-mm-live-preview]');if(preview&&!preview.hidden){preview.hidden=true;return;}const overlay=document.querySelector('[data-mm-student-module]');if(overlay&&!overlay.hidden){overlay.hidden=true;document.body.classList.remove('mm-module-open');}}});
  window.addEventListener('storage',event=>{if(event.key===STORAGE_KEY){renderPublishedHub();if(!root.hidden&&account().role==='teacher')renderMaker();}});
  document.addEventListener('workspace-opened',()=>{if(account().role==='teacher')renderMaker();renderPublishedHub();});
  root.addEventListener('module-maker-open',renderMaker);
  if(account().role==='teacher')renderMaker();
})();
