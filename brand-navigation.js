(() => {
  const app = document.getElementById('app-shell');
  const nav = document.querySelector('.top-nav');
  if (!app || !nav) return;

  const navLabels = {home:'Home',jobboard:'Job Board',ats:'Applicant Tracking System',hris:'HRIS',emailmarketing:'Email',marketing:'Email Marketing',accounts:'Account management'};
  nav.querySelectorAll('.top-nav-link[data-view]').forEach(link => {
    link.querySelector('.nav-item-icon')?.remove();
    link.setAttribute('aria-label', navLabels[link.dataset.view] || link.title || 'Navigate');
    link.title = navLabels[link.dataset.view] || link.title;
    const labelText = [...link.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent.trim()).filter(Boolean).join(' ');
    if (labelText) {
      [...link.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).forEach(node => node.remove());
      const label = document.createElement('span');
      label.className = 'nav-item-label';
      label.textContent = labelText;
      link.append(label);
    }
  });

  function addDropdown(view, label, className) {
    let wrapper = nav.querySelector(`.${className}`);
    if (!wrapper) {
      const link = nav.querySelector(`.top-nav-link[data-view="${view}"]`);
      if (!link) return null;
      wrapper = document.createElement('div');
      wrapper.className = `top-nav-dropdown ${className}`;
      const menu = document.createElement('div');
      menu.className = 'top-nav-menu';
      menu.setAttribute('aria-label', `${label} sections`);
      nav.insertBefore(wrapper, link);
      wrapper.append(link, menu);
    }
    return wrapper.querySelector('.top-nav-menu');
  }

  const jobBoardMenu = addDropdown('jobboard', 'Job Board', 'jobboard-dropdown');
  const atsMenu = addDropdown('ats', 'ATS', 'ats-dropdown');
  const hrisMenu = addDropdown('hris', 'HRIS', 'hris-dropdown');
  const dropdowns = [...nav.querySelectorAll('.top-nav-dropdown')];
  const atsWrapper = nav.querySelector('.ats-dropdown');
  const jobBoardWrapper = nav.querySelector('.jobboard-dropdown');

  function closeDropdown(wrapper) {
    wrapper?.classList.remove('menu-open');
    wrapper?.querySelector('.top-nav-link')?.setAttribute('aria-expanded', 'false');
  }

  function positionDropdownMenu(wrapper) {
    const menu = wrapper?.querySelector('.top-nav-menu');
    const trigger = wrapper?.querySelector('.top-nav-link');
    if (!menu || !trigger) return;
    const rect = trigger.getBoundingClientRect();
    const width = menu.offsetWidth || 150;
    const height = menu.offsetHeight || 100;
    menu.style.position = 'fixed';
    menu.style.left = `${Math.max(8, Math.min(rect.right + 8, window.innerWidth - width - 8))}px`;
    menu.style.top = `${Math.max(8, Math.min(rect.top, window.innerHeight - height - 8))}px`;
  }

  dropdowns.forEach(wrapper => {
    wrapper.querySelector('.top-nav-menu')?.addEventListener('click', event => {
      if (event.target.closest('button')) closeDropdown(wrapper);
    });
  });

  dropdowns.forEach(wrapper => {
    const trigger = wrapper.querySelector('.top-nav-link');
    trigger?.setAttribute('aria-haspopup', 'true');
    trigger?.setAttribute('aria-expanded', 'false');
          trigger?.addEventListener('click', () => {
      const view=trigger.dataset.view;
      const page=document.getElementById(`${view}-view`);
      if(page){page.hidden=true;page.classList.remove('active-view');}
      trigger.classList.remove('active');
      if(view==='ats')setAtsSection(null);
      if(view==='jobboard')setJobBoardSection(null);
      if(view==='hris')document.querySelectorAll('#hris-view .employee-directory,#hris-view .hris-module-panel').forEach(panel=>panel.hidden=true);
      const willOpen = !wrapper.classList.contains('menu-open');
      dropdowns.forEach(item => {
        item.classList.remove('menu-open');
        item.querySelector('.top-nav-link')?.setAttribute('aria-expanded', 'false');
      });
             if (willOpen) {
         wrapper.classList.remove('menu-dismissed');
                   wrapper.classList.add('menu-open');
          trigger.setAttribute('aria-expanded', 'true');
          positionDropdownMenu(wrapper);

       }
    });
  });
  document.addEventListener('click', event => {
    if(!event.target.closest('.sidebar-chat-actions')){
      const tray=document.getElementById('sidebar-tool-tray'),toggle=document.getElementById('sidebar-tools-toggle');
      tray?.classList.remove('is-open');
      tray?.setAttribute('aria-hidden','true');
      toggle?.setAttribute('aria-expanded','false');
    }
    if (event.target.closest('.top-nav-dropdown')) return;
    dropdowns.forEach(wrapper => {
      wrapper.classList.remove('menu-open');
      wrapper.querySelector('.top-nav-link')?.setAttribute('aria-expanded', 'false');
    });
    const accessMenu = document.querySelector('.navigation-control-menu');
    const accessToggle = document.querySelector('.navigation-control-toggle');
    if (accessMenu && !event.target.closest('.navigation-control')) {
      accessMenu.hidden = true;
      accessToggle?.setAttribute('aria-expanded', 'false');
    }
    const profileMenu = document.getElementById('profile-menu');
    const profileToggle = document.getElementById('profile-menu-toggle');
    if (profileMenu && !event.target.closest('.profile-menu-wrap')) {
      profileMenu.hidden = true;
      profileToggle?.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('click', event => {
    const accessToggle = event.target.closest('.navigation-control-toggle');
    if (accessToggle) {
      const menu = document.getElementById('student-navigation-menu');
      menu.hidden = !menu.hidden;
      accessToggle.setAttribute('aria-expanded', String(!menu.hidden));
      return;
    }
    const profileToggle = event.target.closest('#profile-menu-toggle');
    if (profileToggle) {
      const menu = document.getElementById('profile-menu');
      menu.hidden = !menu.hidden;
      profileToggle.setAttribute('aria-expanded', String(!menu.hidden));
    }
  });

  function setAtsSection(section) {
    const local = document.querySelector('#ats-view .ats-local-panel');
    const overseas = document.querySelector('#ats-view .ats-overseas-panel');
    if (!local || !overseas) return;
    local.hidden = section !== 'local';
    overseas.hidden = section !== 'overseas';
    atsMenu?.querySelectorAll('[data-ats-section]').forEach(button => {
      button.classList.toggle('active', button.dataset.atsSection === section);
      button.setAttribute('aria-pressed', String(button.dataset.atsSection === section));
    });
  }

  function setJobBoardSection(section) {
    const local = document.getElementById('local-jobs-panel');
    const overseas = document.getElementById('overseas-jobs-panel');
    const banner = document.querySelector('#jobboard-view .board-banner');
    if (!local || !overseas) return;
    local.hidden = section !== 'local';
    overseas.hidden = section !== 'overseas';
    if (banner) banner.hidden = section !== 'local';
    document.querySelectorAll('[data-job-category]').forEach(button => {
      button.classList.toggle('active', button.dataset.jobCategory === `${section}-jobs-panel`);
    });
  }

  if (jobBoardMenu && !jobBoardMenu.dataset.ready) {
    [['local', 'Local'], ['overseas', 'Overseas']].forEach(([section, label]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.dataset.jobBoardSection = section;
      button.addEventListener('click', () => {
        setJobBoardSection(section);
                switchView('jobboard');
      });
      jobBoardMenu.append(button);
    });
    jobBoardMenu.dataset.ready = 'true';
  }

  if (atsMenu && !atsMenu.dataset.ready) {
    [['local', 'Local'], ['overseas', 'Overseas']].forEach(([section, label]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.dataset.atsSection = section;
      button.addEventListener('click', () => {
        setAtsSection(section);
                switchView('ats');
      });
      atsMenu.append(button);
    });
        atsMenu.dataset.ready = 'true';
  }

  function populateMenu(menu, source, selector, key) {
    if (!menu || !source || menu.dataset.ready === 'true') return;
    source.hidden = true;
    source.querySelectorAll(selector).forEach(original => {
      const item = document.createElement('button');
      item.type = 'button';
      item.textContent = original.textContent.trim();
      item.className = original.className;
      item.addEventListener('click', () => {
        original.click();
        switchView(key === 'jobCategory' ? 'jobboard' : 'hris');
        menu.querySelectorAll('button').forEach(button => button.classList.toggle('active', button.dataset[key] === original.dataset[key]));
        
      });
      item.dataset[key] = original.dataset[key];
      item.classList.toggle('active', original.classList.contains('active'));
      menu.append(item);
    });
    menu.dataset.ready = 'true';
  }

  const workflowSteps = [
    {name: 'Passport', states: ['Confirmed', 'Onprocessed', 'Failed', 'Passed']},
    {name: 'Medical Examinations', states: ['Confirmed', 'Onprocessed', 'Failed', 'Passed']},
    {name: 'Other requirements', states: ['Complete', 'Incomplete', 'Onprocessed']},
    {name: 'Visa', states: ['Onprocessed', 'Confirmed', 'Rejected']},
    {name: 'Flight Ticket', states: ['Confirmed', 'Onhold']},
    {name: 'Overseas Employment Certificate (OEC)', states: ['Confirmed', 'Onhold']}
  ];
  const overseasRequirements = ['NBI', 'Education Credentials', 'Training & Certificates', 'E-Registration', 'PEOS'];
  const overseasKey = 'hireflowOverseasAtsCandidates';
  const projectKey = 'hireflowAtsProjects';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
    catch { return fallback; }
  };
  const write = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { return false; }
  };

  let projectSnapshot = '';
  function isWorkflowStepComplete(record, index) {
    return ['Confirmed', 'Complete'].includes(record.flow?.[index]);
  }
  function overseasProgress(record) {
    const complete = workflowSteps.reduce((total, step, index) => total + (isWorkflowStepComplete(record, index) ? 1 : 0), 0);
    return {complete, total: workflowSteps.length};
  }
  function updateOverseasProgress(card, record) {
    if (!card) return;
    const {complete} = overseasProgress(record);
    const progress = card.querySelector('[data-overseas-progress]');
    if (!progress) return;
    progress.querySelectorAll('[data-progress-step]').forEach((step, index) => {
      const done = isWorkflowStepComplete(record, index);
      step.classList.toggle('is-complete', done);
      step.querySelector('.overseas-step-marker').textContent = done ? '✓' : String(index + 1);
      step.setAttribute('aria-label', `Step ${index + 1}: ${workflowSteps[index].name} — ${done ? 'Complete' : 'Not complete'}`);
    });
    progress.querySelector('.overseas-progress-count').textContent = `${complete}/${workflowSteps.length} complete`;
  }
  function renderOverseasCandidates() {
    const list = document.querySelector('#ats-overseas-candidate-list');
    if (!list) return;
    const records = read(overseasKey, {});
    const projects = read(projectKey, []);
    const query = (document.querySelector('#ats-overseas-search')?.value || '').trim().toLowerCase();
    const projectFilter = document.querySelector('#ats-overseas-project-filter')?.value || '';
    const profiles = (typeof candidates !== 'undefined' ? candidates : []).filter(candidate => {
      const text = `${candidate.name} ${candidate.role} ${candidate.area} ${candidate.location} ${candidate.skills.join(' ')} ${candidate.summary}`.toLowerCase();
      const record = records[candidate.name] || {};
      return (!query || text.includes(query)) && (!projectFilter || record.projectId === projectFilter);
    });
    const projectOptions = `<option value="">Unassigned</option>${projects.map(project => `<option value="${escape(project.id)}">${escape(project.name)}</option>`).join('')}`;
    list.innerHTML = profiles.map(candidate => {
      const record = records[candidate.name] || {};
      const {complete, total} = overseasProgress(record);
      const resume = typeof fictionalResumeDetails === 'function' ? fictionalResumeDetails(candidate) : {};
      const resumeContact = resume.email && resume.phone ? `<div class="resume-contact-highlight"><span><strong>FICTIONAL EMAIL:</strong> <a href="mailto:${escape(resume.email)}">${escape(resume.email)}</a></span><span><strong>FICTIONAL PHONE:</strong> ${escape(resume.phone)}</span><small class="resume-contact-note">Sample resume contact details only</small></div>` : '';
      const resumePortrait = resume.portrait ? `<img class="overseas-resume-portrait" src="${escape(resume.portrait)}" alt="Fictional illustrated portrait of ${escape(candidate.name)}">` : '';
      const resumePersonal = resume.address ? `<p><strong>Address:</strong> ${escape(resume.address)}<br><strong>Birthday:</strong> ${escape(resume.birthday)} · <strong>Age:</strong> ${escape(resume.age)}</p>` : '';
      const resumeTraining = resume.training ? `<section><h3>Training &amp; certificates</h3><p>${escape(resume.training)}</p><p>${escape(resume.certificate)}</p></section><section><h3>Hobbies &amp; interests</h3><p>${escape(resume.hobbies)}</p></section>` : '';
      const flowControls = `<section class="overseas-flow-list" aria-label="Recruitment progress">${workflowSteps.map((step, index) => `<label class="overseas-flow-field"><span><b>Step ${index + 1}.</b> ${escape(step.name)}</span><select data-overseas-flow="${index}" data-candidate-name="${escape(candidate.name)}"><option value="">Not started</option>${step.states.map(state => `<option value="${escape(state)}" ${record.flow?.[index] === state ? 'selected' : ''}>${escape(state)}</option>`).join('')}</select></label>`).join('')}</section>`;
      return `<article class="overseas-candidate-card"><details><summary><span class="candidate-avatar ${escape(candidate.tone)}">${escape(candidate.initials)}</span><span class="overseas-candidate-title"><span class="overseas-candidate-name-row"><strong>${escape(candidate.name)}</strong><span class="overseas-progress" role="group" aria-label="${escape(candidate.name)} recruitment steps" data-overseas-progress><span class="overseas-stepper" role="list">${workflowSteps.map((step, index) => { const done = isWorkflowStepComplete(record, index); const shortName = ['Passport', 'Medical', 'Requirements', 'Visa', 'Flight', 'OEC'][index]; return `<span class="overseas-step${done ? ' is-complete' : ''}" role="listitem" data-progress-step="${index}" aria-label="Step ${index + 1}: ${escape(step.name)} — ${done ? 'Complete' : 'Not complete'}"><span class="overseas-step-marker">${done ? '✓' : index + 1}</span><span class="overseas-step-label">${shortName}</span></span>`; }).join('')}</span><small class="overseas-progress-count">${complete}/${total} complete</small></span></span><small>${escape(candidate.role)} · ${escape(candidate.location)}</small></span></summary><div class="overseas-candidate-backdrop" data-overseas-close></div><div class="overseas-candidate-details"><button type="button" class="overseas-details-close" data-overseas-close aria-label="Close candidate details">×</button><article class="overseas-resume-document"><header class="overseas-resume-heading">${resumePortrait}<div><h2>${escape(candidate.name)}</h2><p>${escape(candidate.role)} · ${escape(candidate.area)}</p><p>${escape(candidate.location)}${resume.address ? ` · ${escape(resume.address)}` : ''}</p></div></header>${resumeContact}<section><h3>Profile</h3><p>${escape(candidate.summary)}</p></section><section><h3>Personal details</h3>${resumePersonal || `<p>${escape(candidate.location)}</p>`}</section><section><h3>Experience</h3>${candidate.work.map(item => `<p>${escape(item)}</p>`).join('')}</section><section><h3>Education</h3><p>${escape(candidate.education)}</p></section>${resumeTraining}<section><h3>Skills</h3><div class="overseas-resume-skills">${candidate.skills.map(skill => `<span>${escape(skill)}</span>`).join('')}</div></section></article>${flowControls}<section class="overseas-candidate-tools"><h3>Candidate workspace</h3><label class="overseas-project-select">Project<select data-overseas-project="${escape(candidate.name)}">${projectOptions.replace(`value="${escape(record.projectId || '')}"`, `value="${escape(record.projectId || '')}" selected`)}</select></label><label class="overseas-notes-label">Notes<textarea data-overseas-notes="${escape(candidate.name)}" rows="4" maxlength="1500" placeholder="Add a note about this candidate...">${escape(record.notes || '')}</textarea></label></section><span class="overseas-save-state" aria-live="polite">Saved on this device</span></div></details></article>`;
    }).join('');
    const count = document.querySelector('#ats-overseas-results-count');
    if (count) count.textContent = `${profiles.length} ${profiles.length === 1 ? 'candidate' : 'candidates'}`;
    const empty = document.querySelector('#ats-overseas-empty');
    if (empty) empty.hidden = profiles.length > 0;
    list.hidden = profiles.length === 0;
  }

  function setupAts() {
    const root = document.getElementById('ats-view');
    const local = root?.querySelector(':scope > .teacher-dashboard');
    if (!local) return;
    local.classList.add('ats-local-panel');
    local.dataset.atsPanel = 'local';
    let overseas = root.querySelector(':scope > .ats-overseas-panel');
    let shouldRenderCandidates = false;
    if (!overseas) {
      shouldRenderCandidates = true;
      overseas = document.createElement('section');
      overseas.className = 'teacher-dashboard ats-overseas-panel';
      overseas.dataset.atsPanel = 'overseas';
      overseas.hidden = true;
      overseas.innerHTML = `<div class="ats-overseas-cover"><p class="eyebrow">INTERNATIONAL RECRUITMENT</p><h1>Overseas applicant pipeline</h1><p>Search candidates, organize projects, and track each recruitment requirement from passport to OEC.</p><div class="ats-cover-icons" aria-hidden="true"><span>◎</span><span>✈</span><span>✓</span></div></div><div class="ats-overseas-workspace"><div class="teacher-dashboard-head"><div><p class="eyebrow">OVERSEAS CANDIDATES</p><h2>Candidate search</h2><p>Expand a candidate card to review their resume and add notes.</p></div><strong id="ats-overseas-results-count">0 candidates</strong></div><div class="ats-overseas-toolbar"><label>Search candidates<input id="ats-overseas-search" type="search" placeholder="Name, role, skill, or keyword"></label><label>Project<select id="ats-overseas-project-filter"><option value="">All projects</option></select></label></div><h2 class="directory-title">Create project</h2><form class="ats-project-form" id="ats-overseas-project-form"><label>Project name<input name="name" required maxlength="100" placeholder="e.g. Overseas hospitality hiring"></label><button class="primary-button" type="submit">＋ Create Project</button></form><div id="ats-overseas-candidate-list" class="overseas-candidate-list"></div><div class="no-results" id="ats-overseas-empty" hidden><h3>No candidates found</h3><p>Try another search or project.</p></div><p class="teacher-privacy-note">Candidate workflow, project assignments, and notes are stored in this browser. Use fictional information only.</p></div>`;
      root.append(overseas);
    }
    const projects = read(projectKey, []);
    const nextProjectSnapshot = JSON.stringify(projects);
    if (projectSnapshot !== nextProjectSnapshot) shouldRenderCandidates = true;
    const projectFilter = overseas.querySelector('#ats-overseas-project-filter');
    if (projectFilter && projectSnapshot !== nextProjectSnapshot) {
      const selected = projectFilter.value;
      projectFilter.innerHTML = `<option value="">All projects</option>${projects.map(project => `<option value="${escape(project.id)}">${escape(project.name)}</option>`).join('')}`;
      projectFilter.value = selected;
    }
    projectSnapshot = nextProjectSnapshot;
    if (shouldRenderCandidates) renderOverseasCandidates();
    setAtsSection(atsMenu?.querySelector('[data-ats-section].active')?.dataset.atsSection || 'local');
  }

  function refreshOverseasRecruiterStats() {
    const count = document.getElementById('overseas-applicant-count');
    const rows = document.querySelectorAll('#overseas-dashboard-rows tr:not(.teacher-empty)');
    if (!count) return;
    const applications = [...rows].reduce((total, row) => {
      const value = row.cells[3]?.textContent.match(/\d+/)?.[0];
      return total + (value ? Number(value) : 0);
    }, 0);
    const next = String(applications);
    if (count.textContent !== next) count.textContent = next;
  }

  function enhance() {
    refreshOverseasRecruiterStats();
    const hrisTabs = document.querySelector('#hris-view .hris-module-tabs');
    populateMenu(hrisMenu, hrisTabs, '[data-hris-tab]', 'hrisTab');
    setupAts();
    if(!app.dataset.submenuPagesInitialized){
      setAtsSection(null);
      setJobBoardSection(null);
      document.querySelectorAll('#hris-view .employee-directory,#hris-view .hris-module-panel').forEach(panel=>panel.hidden=true);
      app.dataset.submenuPagesInitialized='true';
    }

    document.querySelectorAll('#ats-view .ats-cover, #hris-view .hris-cover').forEach(cover => {
      if (!cover.querySelector('.section-brand')) {
        const brand = document.createElement('div');
        brand.className = 'section-brand';
        brand.textContent = 'Mock-up Desk';
        cover.prepend(brand);
      }
    });

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (/hireflow/i.test(node.nodeValue)) node.nodeValue = node.nodeValue.replace(/hireflow\.?/gi, 'Mock-up Desk');
    }
  }

  window.addEventListener('resize', () => dropdowns.forEach(wrapper => {
    if (wrapper.classList.contains('menu-open')) positionDropdownMenu(wrapper);
  }));
  app.addEventListener('click', event => {
    if (event.target.closest('[data-overseas-close]')) {
      event.target.closest('.overseas-candidate-card')?.querySelector('details')?.removeAttribute('open');
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') document.querySelectorAll('.overseas-candidate-card details[open]').forEach(details => details.removeAttribute('open'));
  });
  app.addEventListener('input', event => {
    if (event.target.id === 'ats-overseas-search') renderOverseasCandidates();
    if (event.target.matches('[data-overseas-notes]')) saveOverseasField(event.target, 'notes', event.target.value);
  });
  app.addEventListener('change', event => {
    if (event.target.id === 'ats-overseas-project-filter') renderOverseasCandidates();
    if (event.target.matches('[data-overseas-flow]')) {
      const records = read(overseasKey, {}), name = event.target.dataset.candidateName;
      records[name] ||= {flow: {}};
      records[name].flow ||= {};
      records[name].flow[event.target.dataset.overseasFlow] = event.target.value;
      write(overseasKey, records);
      updateOverseasProgress(event.target.closest('.overseas-candidate-card'), records[name]);
    }
    if (event.target.matches('[data-overseas-project]')) saveOverseasField(event.target, 'projectId', event.target.value);
    if (event.target.matches('[data-overseas-requirement]')) {
      const records = read(overseasKey, {}), name = event.target.dataset.candidateName;
      records[name] ||= {flow: {}};
      records[name].requirements ||= {};
      records[name].requirements[event.target.dataset.overseasRequirement] = event.target.value;
      write(overseasKey, records);
    }
  });
  function saveOverseasField(control, field, value) {
    const records = read(overseasKey, {}), name = control.dataset.overseasNotes || control.dataset.overseasProject;
    records[name] ||= {flow: {}};
    records[name][field] = value;
    write(overseasKey, records);
  }
  app.addEventListener('submit', event => {
    if (event.target.id !== 'ats-overseas-project-form') return;
    event.preventDefault();
    const name = new FormData(event.target).get('name').trim();
    if (!name) return;
    const projects = read(projectKey, []);
    if (projects.some(project => project.name.toLowerCase() === name.toLowerCase())) {
      event.target.elements.name.setCustomValidity('A project with this name already exists.');
      event.target.elements.name.reportValidity();
      event.target.elements.name.setCustomValidity('');
      return;
    }
    projects.push({id: `project-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name});
    if (!write(projectKey, projects)) return;
    event.target.reset();
    setupAts();
  });

  const observer = new MutationObserver(enhance);
  observer.observe(app, { childList: true, subtree: true, characterData: true });
  enhance();

  const sidebarButton = document.querySelector('.sidebar-collapse-button');
  sidebarButton?.addEventListener('click', () => {
    const collapsed = app.classList.toggle('sidebar-collapsed');
    sidebarButton.setAttribute('aria-expanded', String(!collapsed));
    sidebarButton.setAttribute('aria-label', collapsed ? 'Expand left panel' : 'Collapse left panel');
    sidebarButton.textContent = collapsed ? '›' : '‹';
  });
})();
