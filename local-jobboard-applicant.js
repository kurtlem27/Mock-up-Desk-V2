(() => {
  const localPanel = document.getElementById('local-jobs-panel');
  if (!localPanel) return;

  let applicantMode = false;
  let activeTab = 'jobs';
  let selectedJobId = '';
  let search = {keyword:'',classification:'',where:'',workType:'',remote:'',salary:'',date:'Any time',sort:'Relevance'};
  let jobs = [];
  let saved = [];
  let applications = [];
  const KEY = 'hireflowStudentVacancies';
  const SAVED_KEY = 'hireflowLocalApplicantSaved';
  const APP_KEY = 'hireflowLocalApplicantApplications';
  const fallbackJobs = [
    {id:'local-demo-product',title:'Junior Product Designer',company:'Northstar Studio',department:'Design',location:'Makati City, Metro Manila',salary:'₱45,000 – ₱60,000 / month',type:'Full-time',description:'Help shape accessible product experiences with a collaborative design and engineering team.'},
    {id:'local-demo-support',title:'Customer Support Specialist',company:'Harborline Services',department:'Customer Service',location:'Cebu City, Cebu',salary:'₱28,000 – ₱36,000 / month',type:'Full-time',description:'Support customers across chat and email, document feedback, and help improve service processes.'},
    {id:'local-demo-analyst',title:'Operations Analyst',company:'Brightpath Philippines',department:'Business',location:'Quezon City, Metro Manila · Hybrid',salary:'₱40,000 – ₱52,000 / month',type:'Contract',description:'Build clear reporting and help teams improve recurring operational workflows.'},
    {id:'local-demo-developer',title:'Frontend Developer',company:'Pixel Harbor Labs',department:'Information & Communication Technology',location:'Remote · Philippines',salary:'₱55,000 – ₱75,000 / month',type:'Full-time',description:'Build responsive web interfaces and reusable components with an experienced product team.'},
    {id:'local-demo-marketing',title:'Marketing Coordinator',company:'Goodwell Brands',department:'Marketing',location:'Pasig City, Metro Manila',salary:'₱32,000 – ₱42,000 / month',type:'Full-time',description:'Coordinate social, email, and community campaigns and track their performance.'}
  ];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const readArray = key => { try { const value = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } };
  const persist = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };
  const refreshJobs = () => {
    let stored = [];
    try { stored = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { stored = []; }
    jobs = [...(Array.isArray(stored) ? stored : []), ...fallbackJobs];
    saved = readArray(SAVED_KEY);
    applications = readArray(APP_KEY);
  };
  const vacancyFields = job => ({
    id:String(job.id || job.title), title:job.title || 'Sample opportunity', company:job.company || 'Local employer',
    department:job.department || job.category || 'General', location:job.location || 'Philippines',
    salary:job.salary || 'Salary not disclosed', type:job.type || 'Full-time', description:job.description || 'Role details will be shared by the employer.'
  });
  const matchedJobs = () => jobs.map(vacancyFields).filter(job => {
    const text = `${job.title} ${job.company} ${job.department} ${job.location} ${job.description}`.toLowerCase();
    const remote = /remote/i.test(job.location) ? 'Remote' : /hybrid/i.test(job.location) ? 'Hybrid' : 'On-site';
    const salaryAmount = Number((job.salary.match(/[\d,]+/) || ['0'])[0].replace(/,/g,''));
    return (!search.keyword || text.includes(search.keyword.toLowerCase())) && (!search.classification || job.department===search.classification) && (!search.where || job.location.toLowerCase().includes(search.where.toLowerCase())) && (!search.workType || job.type===search.workType) && (!search.remote || remote===search.remote) && (!search.salary || (search.salary==='under40' ? salaryAmount<40000 : search.salary==='40to60' ? salaryAmount>=40000&&salaryAmount<=60000 : salaryAmount>60000)) && (activeTab!=='saved'||saved.includes(job.id));
  }).sort((a,b)=>search.sort==='Date' ? a.title.localeCompare(b.title) : a.title.localeCompare(b.title));
  const setModeButton = () => {
    const actions = localPanel.querySelector('.board-intro-actions');
    if (!actions || actions.querySelector('[data-local-view-toggle]')) return;
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'local-applicant-toggle'; button.dataset.localViewToggle = '';
    button.textContent = 'Applicant view →';
    actions.append(button);
  };
  const render = () => {
    const root = localPanel.querySelector('.local-applicant-workspace');
    if (!root) return;
    refreshJobs();
    const filtered = matchedJobs();
    if (!filtered.some(job=>job.id===selectedJobId)) selectedJobId=filtered[0]?.id||'';
    const selected = filtered.find(job=>job.id===selectedJobId);
    const classifications = [...new Set(jobs.map(vacancyFields).map(job=>job.department))].sort();
    const detail = selected ? `<article class="local-applicant-job-detail"><div class="local-detail-company-banner"><span class="local-company-logo">${escape(selected.company.slice(0,1).toUpperCase())}</span><span>Employer profile · Sample</span></div><p class="local-job-badge">${escape(selected.department)}</p><h2>${escape(selected.title)}</h2><p class="local-detail-company">${escape(selected.company)} · ★ 4.2 · Sample reviews</p><div class="local-job-meta"><span>⌖ ${escape(selected.location)}</span><span>◷ ${escape(selected.type)}</span><span>＄ ${escape(selected.salary)}</span><span>◷ Posted recently</span></div><div class="local-detail-actions"><button type="button" class="local-primary-action" data-local-apply="${escape(selected.id)}">⚡ Quick Apply</button><button type="button" class="local-secondary-action" data-local-save="${escape(selected.id)}">${saved.includes(selected.id)?'♥ Saved':'♡ Save'}</button></div><section><h3>Job description</h3><p>${escape(selected.description)}</p></section><section><h3>Qualifications</h3><ul><li>Relevant interest or experience in ${escape(selected.department.toLowerCase())}.</li><li>Clear communication and a collaborative approach.</li><li>Willingness to learn and contribute to a supportive team.</li></ul></section><section><h3>Benefits & insights</h3><p>Sample role benefits may include onboarding support, professional development, and a collaborative work environment.</p><div class="local-insight-callout">✦ This is a fictional listing for practice. Confirm role details directly with the employer.</div></section><section class="local-company-overview"><h3>Company overview</h3><p>${escape(selected.company)} · Sample employer · Industry: ${escape(selected.department)}</p><small>Company details and review scores are illustrative demo content.</small></section></article>` : '<div class="local-applicant-empty">No matching jobs. Adjust your filters and search again.</div>';
    const cards = filtered.map(job=>`<article class="local-job-card ${job.id===selectedJobId?'selected':''}" data-local-select="${escape(job.id)}" tabindex="0" role="button" aria-label="View ${escape(job.title)}"><div class="local-card-head"><span class="local-company-logo">${escape(job.company.slice(0,1).toUpperCase())}</span><span class="local-card-badge">${job.id.startsWith('local-demo-')?'Featured':'New to you'}</span></div><h3>${escape(job.title)}</h3><p class="local-card-company">${escape(job.company)}</p><div class="local-card-meta"><span>⌖ ${escape(job.location)}</span><span>▦ ${escape(job.department)}</span><strong>${escape(job.salary)}</strong></div><ul><li>Supportive team and structured onboarding</li><li>Opportunity to grow your skills</li></ul><footer><span>Posted recently</span><button type="button" data-local-save="${escape(job.id)}" aria-label="Save ${escape(job.title)}">${saved.includes(job.id)?'♥':'♡'}</button></footer></article>`).join('');
    const content = activeTab==='applications' ? `<section class="local-activity-panel"><h2>Applied jobs</h2><p>Application status tracker · Stored in this browser</p>${applications.length?applications.map(item=>`<article><div><strong>${escape(item.title)}</strong><span>${escape(item.company)} · ${escape(item.date)}</span></div><b>${escape(item.status)}</b></article>`).join(''):'<div class="local-applicant-empty">You have no applications yet. Browse jobs and try Quick Apply.</div>'}</section>` : activeTab==='profile' ? `<section class="local-profile-view"><article class="local-profile-hero"><span class="local-profile-avatar">${escape((getCurrentAccount().name||'Applicant').split(/\s+/).map(part=>part[0]).join('').slice(0,2).toUpperCase())}</span><div><span>PROFILE VISIBILITY · STANDARD</span><h2>${escape(getCurrentAccount().name||'Applicant')}</h2><p>${escape(getCurrentAccount().address||'Add your location in your profile')} · ${escape(getCurrentAccount().email||'')}</p><p>${escape(getCurrentAccount().contact||'Add a contact number in your profile')}</p></div><button type="button" data-local-edit-profile>Edit profile</button></article><div class="local-profile-strength"><strong>Profile strength</strong><span>Complete your profile to stand out to employers.</span><div><i></i></div></div>${[['Personal summary',getCurrentAccount().hobbies||'Add a short professional summary.'],['Career history',getCurrentAccount().experience||'Add your experience.'],['Education',getCurrentAccount().education||'Add your education.'],['Licenses & certifications',getCurrentAccount().training||'Add certifications.'],['Skills',getCurrentAccount().skills||'Add skills.'],['About your next role','Add preferred salary, work type, and availability.']].map(([title,copy])=>`<article><h3>${title}</h3><p>${escape(copy)}</p></article>`).join('')}</section>` : `<form class="local-search-hero" data-local-search><label>What<input name="keyword" value="${escape(search.keyword)}" placeholder="Keywords, job title or company"></label><label>Classification<select name="classification"><option value="">All classifications</option>${classifications.map(item=>`<option ${search.classification===item?'selected':''}>${escape(item)}</option>`).join('')}</select></label><label>Where<input name="where" value="${escape(search.where)}" placeholder="City, region or remote"></label><button type="submit">Search</button><div class="local-filter-pills"><label>Work type<select name="workType"><option value="">Any work type</option>${['Full-time','Part-time','Contract','Casual','Internship'].map(item=>`<option ${search.workType===item?'selected':''}>${item}</option>`).join('')}</select></label><label>Remote<select name="remote"><option value="">Any location type</option>${['On-site','Hybrid','Remote'].map(item=>`<option ${search.remote===item?'selected':''}>${item}</option>`).join('')}</select></label><label>Salary<select name="salary"><option value="">Any salary</option><option value="under40" ${search.salary==='under40'?'selected':''}>Under ₱40,000</option><option value="40to60" ${search.salary==='40to60'?'selected':''}>₱40,000–₱60,000</option><option value="over60" ${search.salary==='over60'?'selected':''}>Over ₱60,000</option></select></label><label>Date listed<select name="date">${['Any time','Today','Last 3 days','Last 7 days','Last 14 days'].map(item=>`<option ${search.date===item?'selected':''}>${item}</option>`).join('')}</select></label><label>Sort by<select name="sort"><option ${search.sort==='Relevance'?'selected':''}>Relevance</option><option ${search.sort==='Date'?'selected':''}>Date</option></select></label></div></form><div class="local-applicant-content-grid"><section class="local-job-results"><div class="local-results-head"><strong>${filtered.length} jobs</strong><span>Sample local opportunities</span></div>${cards||'<div class="local-applicant-empty">No matching jobs found.</div>'}</section><section class="local-job-detail-wrap">${detail}</section></div>`;
    root.innerHTML = `<header class="local-applicant-header"><div class="local-applicant-brand"><span class="local-seek-mark">J</span><strong>JobWay</strong><nav><button type="button" data-local-tab="jobs" class="${activeTab==='jobs'?'active':''}">Job Search</button><button type="button" data-local-tab="profile" class="${activeTab==='profile'?'active':''}">Profile</button><button type="button" data-local-tab="jobs">Career Advice</button><button type="button" data-local-tab="jobs">Company Profiles</button></nav></div><div class="local-header-right"><button type="button" data-local-tab="saved">Saved jobs (${saved.length})</button><button type="button" data-local-tab="applications">Applications (${applications.length})</button><span>${escape((getCurrentAccount().name||'Applicant').split(' ')[0])} ▾</span></div></header><div class="local-applicant-body"><div class="local-applicant-page-heading"><div><p>LOCAL JOB SEARCH</p><h1>Find your next opportunity</h1><span>Discover jobs from local employers and manage your applications.</span></div><button type="button" class="local-return-button" data-local-return>← Recruiter view</button></div>${content}<p class="local-demo-note">Educational demo only. Listings, reviews, and application activity are fictional and stored locally.</p></div><div class="local-apply-modal" data-local-apply-modal hidden><section role="dialog" aria-modal="true" aria-labelledby="local-apply-title"><button type="button" data-local-close-apply class="local-modal-close" aria-label="Close">×</button><p>QUICK APPLY · STEP 1 OF 3</p><h2 id="local-apply-title">Review your application</h2><label><input type="checkbox" checked> Use my saved profile and resume</label><label><input type="checkbox"> Include a cover letter</label><label>Years of relevant experience<input type="number" min="0" max="60" value="0" data-local-exp></label><label>Expected monthly salary<input type="number" min="0" placeholder="e.g. 45000" data-local-salary></label><div class="local-apply-progress"><i></i></div><button type="button" data-local-submit-apply class="local-primary-action">Review & submit application</button><p data-local-apply-message role="status"></p></section></div></div>`;
  };
  const switchMode = enabled => {
    applicantMode = enabled;
    localPanel.closest('.board-view')?.classList.toggle('applicant-view-active', enabled);
    const tools = localPanel.querySelector('.recruiting-tools');
    const existing = [...localPanel.querySelectorAll(':scope > .board-panel')];
    let root = localPanel.querySelector('.local-applicant-workspace');
    if (!root) { root=document.createElement('section');root.className='local-applicant-workspace';localPanel.append(root); }
    if (tools) tools.hidden=enabled;
    existing.forEach(item=>item.hidden=enabled||!item.classList.contains('active-board-panel'));
    root.hidden=!enabled;
    if (enabled) render();
  };
  const toolbarObserver = new MutationObserver(setModeButton);
  toolbarObserver.observe(localPanel,{childList:true,subtree:true});
  setModeButton();

  document.addEventListener('click',event=>{
    if (event.target.closest('[data-local-view-toggle]')) { switchMode(!applicantMode); return; }
    if (!applicantMode) return;
    if (event.target.closest('[data-local-return]')) { switchMode(false); return; }
    const tab=event.target.closest('[data-local-tab]');
    if(tab){activeTab=tab.dataset.localTab;render();return;}
    const select=event.target.closest('[data-local-select]');
    if(select&&!event.target.closest('[data-local-save]')){selectedJobId=select.dataset.localSelect;render();return;}
    const saveButton=event.target.closest('[data-local-save]');
    if(saveButton){const id=saveButton.dataset.localSave;saved=saved.includes(id)?saved.filter(item=>item!==id):[...saved,id];persist(SAVED_KEY,saved);render();return;}
    if(event.target.closest('[data-local-edit-profile]')){document.getElementById('profile-edit-button')?.click();return;}
    const apply=event.target.closest('[data-local-apply]');
    if(apply){localPanel.querySelector('[data-local-apply-modal]').hidden=false;localPanel.querySelector('[data-local-apply-modal]').dataset.jobId=apply.dataset.localApply;return;}
    if(event.target.closest('[data-local-close-apply]')){localPanel.querySelector('[data-local-apply-modal]').hidden=true;return;}
    if(event.target.closest('[data-local-submit-apply]')){
      const modal=localPanel.querySelector('[data-local-apply-modal]'),job=jobs.map(vacancyFields).find(item=>item.id===modal.dataset.jobId);
      if(job&&!applications.some(item=>item.id===job.id)){applications.unshift({id:job.id,title:job.title,company:job.company,date:new Date().toLocaleDateString(),status:'Applied'});persist(APP_KEY,applications);modal.querySelector('[data-local-apply-message]').textContent='Application saved in this browser. No employer was contacted.';modal.querySelector('[data-local-submit-apply]').disabled=true;setTimeout(()=>{modal.hidden=true;activeTab='applications';render();},1000);}return;
    }
  });
  document.addEventListener('submit',event=>{
    if(!applicantMode||!event.target.matches('[data-local-search]'))return;
    event.preventDefault();const data=new FormData(event.target);
    search={...search,keyword:String(data.get('keyword')||''),classification:String(data.get('classification')||''),where:String(data.get('where')||''),workType:String(data.get('workType')||''),remote:String(data.get('remote')||''),salary:String(data.get('salary')||''),date:String(data.get('date')||'Any time'),sort:String(data.get('sort')||'Relevance')};
    activeTab='jobs';render();
  });
  document.addEventListener('keydown',event=>{
    const card=event.target.closest('[data-local-select]');
    if(applicantMode&&card&&event.target===card&&(event.key==='Enter'||event.key===' ')){event.preventDefault();selectedJobId=card.dataset.localSelect;render();}
  });
})();
