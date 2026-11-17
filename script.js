const candidates = [
  {name:'Ava Patel',initials:'AP',tone:'tone-rose',role:'Junior Product Designer',area:'Design',location:'New York, NY · Hybrid',workplace:'Hybrid',experience:2,summary:'Thoughtful product designer who turns research and complex workflows into clear, inclusive digital experiences. Enjoys collaborating closely with engineering and product teams.',work:['Product Design Intern · Northstar Studio (2023–2024) — Prototyped onboarding improvements and helped lift task completion by 18%.','Design Intern · Civic Lab (2022–2023) — Supported usability studies and created wireframes for community services.'],education:'BFA, Communication Design · Pratt Institute (2024)',skills:['Figma','Prototyping','User research','Design systems','Accessibility']},
  {name:'Noah Williams',initials:'NW',tone:'tone-purple',role:'Frontend Developer',area:'Engineering',location:'Remote · US',workplace:'Remote',experience:2,summary:'Curious frontend developer focused on accessible, responsive web applications. Brings a strong foundation in modern JavaScript and a collaborative, detail-oriented approach.',work:['Frontend Intern · Bloom & Co. (2023–2024) — Built reusable React components and improved mobile page performance.','Web Assistant · Campus Digital Studio (2022–2023) — Maintained student-facing sites and fixed accessibility issues.'],education:'BS, Computer Science · University of Washington (2024)',skills:['JavaScript','React','TypeScript','CSS','Accessibility']},
  {name:'Mia Johnson',initials:'MJ',tone:'tone-orange',role:'Marketing Coordinator',area:'Marketing',location:'Brooklyn, NY · On-site',workplace:'On-site',experience:2,summary:'Creative marketer who enjoys shaping useful stories across social, email, and community channels. Comfortable combining audience insights with practical campaign execution.',work:['Marketing Intern · Goodwell Health (2023–2024) — Coordinated campaign calendars and reported on social engagement.','Communications Assistant · Student Union (2022–2023) — Produced newsletters and supported campus events.'],education:'BA, Marketing · Fordham University (2024)',skills:['Content strategy','Social media','Copywriting','Analytics','Campaigns']},
  {name:'Ethan Chen',initials:'EC',tone:'tone-blue',role:'UX Research Assistant',area:'Design',location:'Remote · US',workplace:'Remote',experience:1,summary:'Empathetic researcher interested in making digital products easier to understand and use. Experienced in interview preparation, note synthesis, and communicating findings.',work:['Research Intern · Common Ground (2023–2024) — Helped conduct interviews and synthesized patterns into research summaries.'],education:'BS, Human-Computer Interaction · DePaul University (2024)',skills:['User interviews','Usability testing','Survey design','Figma','Synthesis']},
  {name:'Sofia Garcia',initials:'SG',tone:'tone-green',role:'People Operations Assistant',area:'People',location:'Austin, TX · Hybrid',workplace:'Hybrid',experience:2,summary:'People-first emerging HR professional motivated by welcoming employee experiences and organized processes. Brings care, discretion, and clear communication to team support.',work:['People Team Intern · Sunday Supply (2023–2024) — Organized onboarding resources and supported employee events.','Office Assistant · Student Services (2022–2023) — Coordinated appointments and responded to student inquiries.'],education:'BA, Psychology · University of Texas at Austin (2024)',skills:['Onboarding','Event coordination','Communication','Google Workspace','HR support']},
  {name:'Liam Thompson',initials:'LT',tone:'tone-yellow',role:'Business Analyst Intern',area:'Business',location:'Chicago, IL · Hybrid',workplace:'Hybrid',experience:1,summary:'Analytical business student who likes turning data into practical recommendations. Brings curiosity, strong spreadsheet skills, and a reliable approach to cross-functional work.',work:['Business Analyst Intern · Lakeview Consulting (2023–2024) — Prepared weekly reports and mapped client process improvements.'],education:'BBA, Business Analytics · DePaul University (2024)',skills:['Excel','SQL','Data visualization','Research','Process mapping']},
  {name:'Isabella Nguyen',initials:'IN',tone:'tone-purple',role:'Software Engineer',area:'Engineering',location:'San Francisco, CA · Hybrid',workplace:'Hybrid',experience:3,summary:'Early-career software engineer who enjoys building dependable tools and learning from thoughtful code reviews. Interested in product-minded teams and well-tested software.',work:['Software Engineering Intern · Forma Labs (2022–2024) — Shipped API features and wrote automated tests across two internship terms.','CS Tutor · Peer Learning Center (2021–2022) — Helped students with programming fundamentals.'],education:'BS, Computer Science · San Jose State University (2024)',skills:['Python','Java','REST APIs','Git','Unit testing']},
  {name:'Oliver Brown',initials:'OB',tone:'tone-rose',role:'Visual Designer',area:'Design',location:'Portland, OR · Remote',workplace:'Remote',experience:2,summary:'Visual designer with a flexible portfolio spanning brand identity, digital campaigns, and product illustration. Values clear collaboration and accessible visual communication.',work:['Design Intern · Little Fern Creative (2023–2024) — Created campaign assets and refreshed client brand guidelines.','Graphic Designer · Campus Arts Journal (2022–2023) — Designed layouts and promotional materials.'],education:'BDes, Graphic Design · Oregon State University (2024)',skills:['Illustrator','Photoshop','Figma','Brand identity','Typography']},
  {name:'Amara Okafor',initials:'AO',tone:'tone-orange',role:'Talent Acquisition Coordinator',area:'People',location:'Atlanta, GA · On-site',workplace:'On-site',experience:1,summary:'Organized communicator interested in fair, people-centered hiring. Experienced coordinating schedules, welcoming candidates, and keeping project details moving smoothly.',work:['Recruiting Intern · Brightside Partners (2023–2024) — Scheduled interviews and prepared candidate communications.'],education:'BA, Sociology · Georgia State University (2024)',skills:['Scheduling','Candidate care','Written communication','Coordination','Research']},
  {name:'Lucas Martin',initials:'LM',tone:'tone-blue',role:'Digital Marketing Associate',area:'Marketing',location:'Denver, CO · Hybrid',workplace:'Hybrid',experience:2,summary:'Data-aware digital marketer who combines concise storytelling with experimentation. Has supported email and paid social campaigns from briefing through performance review.',work:['Digital Marketing Intern · Trailmark Goods (2023–2024) — Built email campaigns and tracked conversion performance.','Content Assistant · Campus Recreation (2022–2023) — Published event stories and maintained social calendars.'],education:'BS, Marketing · University of Colorado Boulder (2024)',skills:['Email marketing','Google Analytics','SEO','Copywriting','Paid social']},
  {name:'Priya Shah',initials:'PS',tone:'tone-green',role:'Operations Analyst',area:'Business',location:'Boston, MA · Remote',workplace:'Remote',experience:3,summary:'Resourceful operations analyst with experience improving recurring processes and building clear reporting. Enjoys helping teams make confident decisions with reliable information.',work:['Operations Intern · Harbor Health (2022–2024) — Automated recurring reports and documented service workflows.','Project Assistant · Student Research Office (2021–2022) — Tracked project milestones and prepared summaries.'],education:'BS, Information Systems · Northeastern University (2024)',skills:['SQL','Excel','Process improvement','Reporting','Tableau']},
  {name:'Jack Robinson',initials:'JR',tone:'tone-yellow',role:'QA Engineer',area:'Engineering',location:'Raleigh, NC · On-site',workplace:'On-site',experience:2,summary:'Careful problem-solver who likes finding edge cases and improving product quality. Brings hands-on practice with test plans, bug reporting, and collaborative release checks.',work:['QA Intern · Pinecone Software (2023–2024) — Wrote test cases and documented bugs across web releases.','IT Support Assistant · Campus Technology (2022–2023) — Resolved common device and software issues.'],education:'BS, Information Technology · NC State University (2024)',skills:['Manual testing','Test plans','Jira','JavaScript','Bug reporting']}
];
const candidateTemplates = [...candidates];
const extraNames = ['Mason Davis','Chloe Wilson','Daniel Kim','Leah Martinez','Benjamin Clark','Zoe Anderson','Gabriel Lewis','Lily Robinson','Henry Walker','Nora Young','Isaac Hall','Aria Allen','Julian King','Maya Wright','Leo Scott','Layla Green','Sebastian Baker','Emily Adams','Mateo Nelson','Harper Carter','David Mitchell','Sofia Perez','Eli Roberts','Grace Turner','Samuel Phillips','Ella Campbell','Wyatt Parker','Amira Evans','Theo Edwards','Camila Collins','Ryan Stewart','Avery Morris','Nathan Rogers','Isla Cook','Aaron Morgan','Naomi Bell','Caleb Murphy','Lucy Bailey'];
extraNames.forEach((name,index)=>{
  const template=candidateTemplates[index%candidateTemplates.length];
  candidates.push({...template,name,initials:name.split(' ').map(part=>part[0]).join('').slice(0,2).toUpperCase(),experience:1+(index%5),location:['Manila, Philippines · Hybrid','Cebu, Philippines · On-site','Remote · Philippines','Quezon City, Philippines · Hybrid'][index%4],summary:`Fictional candidate with ${template.area.toLowerCase()} experience, a collaborative approach, and demonstrated interest in ${template.skills[0]}.`});
});

const AUTH_KEY = 'hireflowStudentAccounts';
const SESSION_KEY = 'hireflowStudentSession';
const views = ['home','ats','jobboard','hris','learning','quiz','accounts','emailmarketing','marketing'];
let authMode = 'login';
let toastTimer;

function booleanMatch(text,query){
  const terms=query.match(/[()]|AND|OR|NOT|[^ ()]+/gi)||[];let position=0;
  const parsePrimary=()=>{const token=terms[position++];if(token==='('){const value=parseOr();position++;return value;}if(!token)return true;if(token.toUpperCase()==='NOT')return !parsePrimary();return text.includes(token.toLowerCase());};
  const parseAnd=()=>{let value=parsePrimary();while(position<terms.length&&terms[position].toUpperCase()==='AND'){position++;value=parsePrimary()&&value;}return value;};
  const parseOr=()=>{let value=parseAnd();while(position<terms.length&&terms[position].toUpperCase()==='OR'){position++;value=parseAnd()||value;}return value;};
  try{return parseOr();}catch{return text.includes(query);}
}
function addFullscreenButton(viewId){
  const view=document.getElementById(viewId);if(!view||view.querySelector('[data-fullscreen-toggle]'))return;
  const button=document.createElement('button');button.type='button';button.className='fullscreen-toggle';button.dataset.fullscreenToggle=viewId;button.textContent='⛶ Full screen';button.setAttribute('aria-label','View this simulation in full screen');
  button.addEventListener('click',async()=>{try{if(document.fullscreenElement){await document.exitFullscreen();}else{await view.requestFullscreen();}button.textContent=document.fullscreenElement?'↙ Exit full screen':'⛶ Full screen';}catch{showToast('Full screen is not available in this browser.');}});
  view.addEventListener('fullscreenchange',()=>{button.textContent=document.fullscreenElement===view?'↙ Exit full screen':'⛶ Full screen';});
  if(viewId==='jobboard-view') document.querySelector('#jobboard-view .board-hero')?.append(button);
  else if(viewId==='ats-view'||viewId==='hris-view'){
    const cover=view.querySelector(viewId==='ats-view'?'.ats-cover':'.hris-cover');
    if(cover) cover.after(button); else view.prepend(button);
  }else view.prepend(button);
}
function showToast(message){
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function getAccounts(){
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || '[]'); }
  catch { return []; }
}

function refreshSubjectOptions(){
  const subjects = [...new Set(getAccounts().filter(account => account.role === 'teacher').map(account => account.subject).filter(Boolean))].sort();
  document.getElementById('subject-options').innerHTML = subjects.map(item => `<option value="${escapeHTML(item)}"></option>`).join('');
}

function updateSignupFields(){
  const role = document.getElementById('account-role').value;
  const teacher = role === 'teacher';
  const student = role === 'student';
  document.getElementById('subject-field').hidden = !teacher && !student;
  document.getElementById('teacher-code-field').hidden = !teacher && !student;
  document.getElementById('account-subject').required = teacher || student;
  document.getElementById('teacher-code').required = teacher || student;
  document.getElementById('teacher-code-label').textContent = teacher ? 'Create teacher code' : 'Teacher code';
  document.getElementById('teacher-code').placeholder = teacher ? 'Create a code for your students' : 'Enter the code from your teacher';
  document.getElementById('account-subject').placeholder = teacher ? 'e.g. Digital Marketing' : 'Choose the subject your teacher teaches';
  refreshSubjectOptions();
}

function setAuthMode(mode){
  authMode = mode;
  const signup = mode === 'signup';
  document.getElementById('login-tab').classList.toggle('active', !signup);
  document.getElementById('signup-tab').classList.toggle('active', signup);
  document.getElementById('login-tab').setAttribute('aria-selected', String(!signup));
  document.getElementById('signup-tab').setAttribute('aria-selected', String(signup));
  document.getElementById('auth-title').textContent = signup ? 'Create your account' : 'Welcome back';
  document.getElementById('auth-subtitle').textContent = signup ? 'Choose a student or teacher account for your learning workspace.' : 'Log in to continue exploring the recruiting simulation.';
  document.getElementById('name-field').hidden = !signup;
  document.getElementById('role-field').hidden = !signup;
  document.getElementById('account-name').required = signup;
  document.getElementById('account-password').autocomplete = signup ? 'new-password' : 'current-password';
  if(signup) updateSignupFields();
  else {
    document.getElementById('subject-field').hidden = true;
    document.getElementById('teacher-code-field').hidden = true;
    document.getElementById('account-subject').required = false;
    document.getElementById('teacher-code').required = false;
  }
  document.getElementById('auth-submit').textContent = signup ? 'Create account' : 'Log in';
  document.getElementById('auth-message').textContent = '';
}

document.getElementById('login-tab').addEventListener('click', () => setAuthMode('login'));
document.getElementById('signup-tab').addEventListener('click', () => setAuthMode('signup'));
document.getElementById('account-role').addEventListener('change', updateSignupFields);

document.getElementById('auth-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('account-name').value.trim();
  const email = document.getElementById('account-email').value.trim().toLowerCase();
  const password = document.getElementById('account-password').value;
  const message = document.getElementById('auth-message');
  const accounts = getAccounts();
  if(authMode === 'signup'){
    const role = document.getElementById('account-role').value;
    const subject = document.getElementById('account-subject').value.trim();
    const teacherCode = document.getElementById('teacher-code').value.trim().toUpperCase();
    if(accounts.some(account => account.email === email)){
      message.textContent = 'An account with this email already exists. Log in instead.';
      return;
    }
    if(role === 'teacher'){
      if(accounts.some(account => account.role === 'teacher' && account.teacherCode?.toUpperCase() === teacherCode)){
        message.textContent = 'That teacher code is already in use. Choose a different code.';
        return;
      }
    }else if(role === 'student'){
      const teacher = accounts.find(account => account.role === 'teacher' && account.teacherCode?.toUpperCase() === teacherCode);
      if(!teacher){ message.textContent = 'That teacher code was not found. Check it with your teacher.'; return; }
      if((teacher.subject || '').trim().toLowerCase() !== subject.toLowerCase()){
        message.textContent = `That code belongs to ${teacher.subject}. Enter the matching subject.`;
        return;
      }
    }
    const account = {name,email,password,role,subject:role === 'admin' ? '' : subject,teacherCode:role === 'teacher' ? teacherCode : role === 'student' ? teacherCode : ''};
    accounts.push(account);
    try { localStorage.setItem(AUTH_KEY, JSON.stringify(accounts)); }
    catch { message.textContent = 'Could not save this account in browser storage.'; return; }
    localStorage.setItem(SESSION_KEY, email);
    openWorkspace(account);
  }else{
    const account = accounts.find(item => item.email === email && item.password === password);
    if(!account){
      message.textContent = 'We could not find a matching account. Check your details or create an account.';
      return;
    }
    localStorage.setItem(SESSION_KEY, account.email);
    openWorkspace(account);
  }
});

const revealObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}}),{threshold:.08}):{observe:item=>item.classList.add('is-visible'),unobserve(){}};
function observeRevealItems(root=document){root.querySelectorAll('.candidate-card,.vacancy-card,.employee-card,.ats-project-card,.learning-resource,.quiz-card,.email-campaign-card').forEach(item=>{if(!item.classList.contains('reveal-ready')){item.classList.add('reveal-ready');revealObserver.observe(item);}});}
new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1){if(node.matches?.('.candidate-card,.vacancy-card,.employee-card,.ats-project-card,.learning-resource,.quiz-card,.email-campaign-card'))observeRevealItems(node.parentElement||document);else observeRevealItems(node);}}))).observe(document.body,{childList:true,subtree:true});
const QUIZ_TAB_KEY='hireflowQuizTabViolations';
let quizTabWasHidden=false;
function quizAttemptForm(){return document.querySelector('#quiz-view.active-view .quiz-taking-form');}
function quizAttemptKey(){const form=quizAttemptForm();if(!form)return '';const title=document.querySelector('#quiz-view .quiz-page-head h1')?.textContent?.trim()||form.querySelector('h1')?.textContent?.trim()||'active-quiz';return `${getCurrentAccount().email}::${title}`;}
function renderQuizLockManager(){
  const panel=document.getElementById('quiz-lock-manager');if(!panel)return;const account=getCurrentAccount();
  if(account.role!=='teacher'){panel.hidden=true;return;}
  const records=readStored(QUIZ_TAB_KEY,{}),students=getAccounts().filter(student=>student.role==='student'&&student.teacherCode?.toUpperCase()===(account.teacherCode||'').toUpperCase());
  const locked=Object.entries(records).filter(([key,value])=>value.locked&&students.some(student=>key.startsWith(`${student.email}::`)));
  panel.hidden=false;panel.innerHTML=`<h2>Locked quiz attempts</h2><p>Review and unlock attempts for your students.</p>${locked.length?locked.map(([key,value])=>`<article><strong>${escapeHTML(key.split('::')[0])}</strong><span>${escapeHTML(value.quiz||key.split('::').slice(1).join('::'))} · ${value.violations} tab changes</span><button type="button" class="primary-button" data-unlock-quiz="${escapeHTML(key)}">Unlock attempt</button></article>`).join(''):'<p>No locked quiz attempts.</p>'}`;
}
window.addEventListener('blur',()=>{if(quizAttemptForm())quizTabWasHidden=true;});
window.addEventListener('focus',()=>{if(quizTabWasHidden&&!document.hidden)document.dispatchEvent(new Event('visibilitychange'));});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){if(quizAttemptForm())quizTabWasHidden=true;return;}
  if(!quizTabWasHidden)return;quizTabWasHidden=false;const form=quizAttemptForm();if(!form)return;
  const key=quizAttemptKey(),records=readStored(QUIZ_TAB_KEY,{}),prior=records[key]||{violations:0,locked:false};prior.violations+=1;prior.quiz=key.split('::').slice(1).join('::');
  if(prior.violations>=2)prior.locked=true;records[key]=prior;saveStored(QUIZ_TAB_KEY,records);
  form.querySelectorAll('input,select,textarea,button[type="submit"]').forEach(control=>control.disabled=true);
  let warning=form.querySelector('.quiz-tab-warning');if(!warning){warning=document.createElement('div');warning.className='quiz-tab-warning';warning.setAttribute('role','alert');form.prepend(warning);}
  if(prior.locked){warning.innerHTML='<strong>Quiz locked.</strong> You changed tabs or windows a second time. Ask your teacher to unlock this attempt.';showToast('This quiz is locked. Contact your teacher to unlock it.');}
  else{warning.innerHTML='<strong>Warning:</strong> You are not allowed to change tabs or windows during a quiz. A second tab change will lock this attempt. <button type="button" data-resume-quiz>Continue quiz</button>';showToast('Warning: do not change tabs or windows while answering.');}
});
document.addEventListener('click',event=>{
  if(event.target.closest('[data-resume-quiz]')){const form=quizAttemptForm();if(!form)return;form.querySelectorAll('input,select,textarea,button[type="submit"]').forEach(control=>control.disabled=false);event.target.closest('.quiz-tab-warning').remove();}
  const unlock=event.target.closest('[data-unlock-quiz]');if(unlock&&getCurrentAccount().role==='teacher'){const records=readStored(QUIZ_TAB_KEY,{});delete records[unlock.dataset.unlockQuiz];saveStored(QUIZ_TAB_KEY,records);renderQuizLockManager();showToast('Quiz attempt unlocked.');}
});
const STUDENT_NAV_KEY = 'hireflowStudentNavigation';
const PROFILE_PICTURE_CHOICES = Array.from({length:6},(_,index)=>makePortrait(`Profile ${index+1}`,index));
function navigationFor(account){
  if(account.role!=='student')return null;
  const teacher=getAccounts().find(item=>item.role==='teacher'&&item.teacherCode?.toUpperCase()===(account.teacherCode||'').toUpperCase());
  const settings=readStored(STUDENT_NAV_KEY,{});
  return teacher ? settings[teacher.email] : null;
}
function renderHome(account){
  const name=escapeHTML(account.name||'there');
  document.getElementById('home-view').innerHTML=`<section class="home-hero"><p class="eyebrow">HIREFLOW LEARNING WORKSPACE</p><h1>Welcome, ${name}.</h1><p>Your recruiting and people-operations workspace is ready.</p><div class="home-shortcuts">${[['ats','Applicant Tracking System','Review candidates and projects'],['jobboard','Job Board','Explore vacancies and applicants'],['hris','HRIS','People operations workspace'],['quiz','Quiz','Continue learning']].map(([view,title,copy])=>`<button type="button" class="home-shortcut" data-home-view="${view}"><strong>${title}</strong><span>${copy}</span></button>`).join('')}</div></section>`;
}
function renderNavigationControl(account){
  const panel=document.getElementById('navigation-control');
  if(account.role!=='teacher'){panel.hidden=true;return;}
  const settings=readStored(STUDENT_NAV_KEY,{}),enabled=settings[account.email]||{};
  const destinations=[['ats','Applicant Tracking System'],['jobboard','Job Board'],['hris','HRIS'],['emailmarketing','Report Messaging'],['marketing','Email Marketing'],['quiz','Quiz'],['learning','Learning & Development']];
  panel.hidden=false;
  panel.innerHTML=`<h3>Navigation control</h3><p>Choose which sections your students can access.</p>${destinations.map(([key,label])=>`<label><input type="checkbox" data-navigation-setting="${key}" ${enabled[key]!==false?'checked':''}>${label}</label>`).join('')}<small>Settings apply to students using your teacher code.</small>`;
  panel.querySelectorAll('[data-navigation-setting]').forEach(input=>input.addEventListener('change',()=>{const all=readStored(STUDENT_NAV_KEY,{});all[account.email]={...(all[account.email]||{}),[input.dataset.navigationSetting]:input.checked};saveStored(STUDENT_NAV_KEY,all);showToast('Student navigation settings saved.');}));
}
function renderProfileEditor(){
  const account=getCurrentAccount(),form=document.getElementById('profile-form');
  form.reset();
  ['name','email','address','contact','hobbies','education','skills','experience','training'].forEach(field=>form.elements[field].value=account[field]||'');
  const choices=document.getElementById('profile-picture-picker');
  choices.innerHTML=PROFILE_PICTURE_CHOICES.map((picture,index)=>`<button type="button" class="profile-picture-choice ${account.picture===picture?'selected':''}" data-picture-index="${index}" aria-label="Choose portrait ${index+1}"><img src="${picture}" alt="Fictional portrait ${index+1}"></button>`).join('');
  form.elements.picture.value=account.picture||PROFILE_PICTURE_CHOICES[0];
  if(!account.picture)choices.querySelector('button')?.classList.add('selected');
  document.getElementById('profile-modal').hidden=false;
}
function openWorkspace(account){
  document.getElementById('auth-screen').hidden = true;
  document.getElementById('app-shell').hidden = false;
  const name = account.name || 'Student';
  const initials = name.split(/\s+/).map(part => part[0]).join('').slice(0,2).toUpperCase();
  const teacher = account.role === 'teacher';
  const admin = account.role === 'admin';
  document.getElementById('quiz-nav-label').textContent = teacher ? 'Quiz Maker' : 'Quiz';
  document.querySelector('.profile-copy small').textContent = admin ? 'Administrator' : teacher ? `Teacher · ${account.subject || ''}` : `Student · ${account.subject || ''}`;
  document.querySelector('.today-label').textContent = admin ? 'Account administration' : teacher ? 'Teacher learning mode' : 'Student learning mode';
  document.querySelector('.board-student-label').textContent = teacher ? 'Teacher workspace' : 'Student workspace';
  const studentNavigation=navigationFor(account)||{};
  document.querySelectorAll('.top-nav-link').forEach(link => {
    const view=link.dataset.view;
    link.hidden = admin ? !['home','ats','accounts','emailmarketing','marketing','hris'].includes(view) : view === 'accounts' || (account.role==='student' && studentNavigation[view]===false);
  });
  document.querySelectorAll('.nav-link').forEach(link => { link.hidden = admin || (account.role==='student' && studentNavigation[link.dataset.view]===false); });
  renderNavigationControl(account);
  renderHome(account);
  document.getElementById('user-name').textContent = name;
  document.getElementById('user-avatar').innerHTML = account.picture ? `<img src="${escapeHTML(account.picture)}" alt="">` : initials;
  document.getElementById('top-avatar').innerHTML = account.picture ? `<img src="${escapeHTML(account.picture)}" alt="">` : initials;
  document.getElementById('open-vacancy-form').hidden = account.role !== 'teacher';
  document.getElementById('open-overseas-form').hidden = !['teacher','admin'].includes(account.role);
  document.querySelectorAll('[data-open-vacancy]').forEach(button => { button.hidden = account.role !== 'teacher'; });
  renderQuizLibrary();
  renderQuizLockManager();
  renderAtsDashboard();
  renderVacancies();
  syncOverseasDashboard();
  renderHris();
  renderEmailMarketing();
  addFullscreenButton('hris-view');
  addFullscreenButton('emailmarketing-view');
  renderLearning();
  if(admin) renderAdminDashboard();
  switchView('home');
}

function switchView(name){
  if(!views.includes(name)) return;
  const role = getCurrentAccount().role;
  if(role === 'admin' && !['home','ats','accounts','emailmarketing','marketing','hris'].includes(name)) return;
  if(name === 'emailmarketing' && !['teacher','admin','student'].includes(role)) return;
  if(name === 'marketing' && !['teacher','admin','student'].includes(role)) return;
  if(role==='student' && navigationFor(getCurrentAccount())?.[name]===false) return;
  if(name === 'accounts' && role !== 'admin') return;
  if(name === 'quiz' && !['teacher','student'].includes(role)) return;
  if(['hris','learning','jobboard','ats'].includes(name) && !['teacher','student'].includes(role) && role !== 'admin') return;
  document.querySelectorAll('.view').forEach(view => view.classList.remove('active-view'));
  document.getElementById(`${name}-view`).classList.add('active-view');
  if(name==='quiz'&&role==='teacher')renderQuizLockManager();
  if(name==='jobboard'){
    addFullscreenButton('jobboard-view');
    syncOverseasDashboard();
    document.querySelectorAll('.job-category-panel').forEach(panel=>panel.hidden=panel.id!=='local-jobs-panel');
    document.querySelectorAll('.job-category-button').forEach(button=>button.classList.toggle('active',button.dataset.jobCategory==='local-jobs-panel'));
  }
  document.querySelectorAll('.nav-link, .top-nav-link').forEach(link => link.classList.toggle('active', link.dataset.view === name));
  window.scrollTo({top:0,behavior:'smooth'});
}

document.querySelectorAll('.nav-link, .top-nav-link').forEach(link => link.addEventListener('click', () => switchView(link.dataset.view)));
document.getElementById('home-view').addEventListener('click',event=>{const shortcut=event.target.closest('[data-home-view]');if(shortcut)switchView(shortcut.dataset.homeView);});
document.getElementById('profile-edit-button').addEventListener('click',renderProfileEditor);
document.getElementById('profile-modal').addEventListener('click',event=>{if(event.target===event.currentTarget||event.target.closest('[data-close-profile]'))document.getElementById('profile-modal').hidden=true;const choice=event.target.closest('[data-picture-index]');if(choice){const picture=PROFILE_PICTURE_CHOICES[Number(choice.dataset.pictureIndex)];document.querySelector('#profile-form [name="picture"]').value=picture;document.querySelectorAll('.profile-picture-choice').forEach(button=>button.classList.toggle('selected',button===choice));}});
document.getElementById('vacancy-form').addEventListener('submit',()=>setTimeout(()=>{
  const form=document.getElementById('vacancy-form'),salary=document.getElementById('vacancy-salary').value.trim(),id=document.getElementById('vacancy-id').value,vacancies=readStored(VACANCIES_KEY,[]);
  const target=vacancies.find(item=>id&&item.id===id)||[...vacancies].reverse().find(item=>item.title===document.getElementById('vacancy-title').value.trim());
  if(target&&salary){target.salary=salary;saveStored(VACANCIES_KEY,vacancies);renderVacancies();}
},0),true);
document.getElementById('profile-form').addEventListener('submit',event=>{
  event.preventDefault();const form=event.currentTarget,data=new FormData(form),email=String(data.get('email')).trim().toLowerCase(),old=getCurrentAccount(),accounts=getAccounts();
  if(accounts.some(item=>item.email===email&&item.email!==old.email)){showToast('That email is already used by another account.');return;}
  const updated={...old};['name','address','contact','hobbies','education','skills','experience','training','picture'].forEach(key=>updated[key]=String(data.get(key)||'').trim());
  updated.email=email;const index=accounts.findIndex(item=>item.email===old.email);if(index<0)return;accounts[index]=updated;
  if(saveStored(AUTH_KEY,accounts)){localStorage.setItem(SESSION_KEY,email);document.getElementById('user-name').textContent=updated.name;document.getElementById('user-avatar').innerHTML=updated.picture?`<img src="${escapeHTML(updated.picture)}" alt="">`:updated.name.split(/\s+/).map(part=>part[0]).join('').slice(0,2).toUpperCase();document.getElementById('top-avatar').innerHTML=document.getElementById('user-avatar').innerHTML;document.getElementById('profile-modal').hidden=true;renderHome(updated);showToast('Profile saved.');}
});
document.getElementById('logout-button').addEventListener('click', () => {
  clearInterval(quizTimerInterval);
  currentQuiz = null;
  localStorage.removeItem(SESSION_KEY);
  document.getElementById('app-shell').hidden = true;
  document.getElementById('auth-screen').hidden = false;
  document.getElementById('account-password').value = '';
  setAuthMode('login');
});

function selectedValues(name){
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(input => input.value);
}

function escapeHTML(value){
  return String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
}

function renderProfiles(){
  const query = document.getElementById('profile-search').value.trim().toLowerCase();
  const location = document.getElementById('profile-location').value.trim().toLowerCase();
  const careers = selectedValues('career');
  const workplaces = selectedValues('workplace');
  const minExperience = Number(document.getElementById('experience-filter').value);
  const sort = document.getElementById('profile-sort').value;
  let filtered = candidates.filter(candidate => {
    const searchable = `${candidate.name} ${candidate.role} ${candidate.area} ${candidate.location} ${candidate.summary} ${candidate.education} ${candidate.skills.join(' ')} ${candidate.work.join(' ')}`.toLowerCase();
    return (!query || searchable.includes(query)) && (!location || candidate.location.toLowerCase().includes(location) || (location.includes('remote') && candidate.workplace === 'Remote')) && (!careers.length || careers.includes(candidate.area)) && (!workplaces.length || workplaces.includes(candidate.workplace)) && candidate.experience >= minExperience;
  });
  if(sort === 'name') filtered.sort((a,b) => a.name.localeCompare(b.name));
  if(sort === 'experience') filtered.sort((a,b) => b.experience-a.experience || a.name.localeCompare(b.name));
  document.getElementById('results-count').textContent = `${filtered.length} ${filtered.length === 1 ? 'profile' : 'profiles'}`;
  const profileTabCount=document.getElementById('profile-tab-count');if(profileTabCount)profileTabCount.textContent=String(filtered.length);
  document.getElementById('no-results').hidden = filtered.length > 0;
  const list = document.getElementById('profile-list');
  list.hidden = filtered.length === 0;
  list.innerHTML = filtered.map(candidate => `
    <article class="candidate-card">
      <div class="candidate-head">
        <span class="candidate-avatar ${candidate.tone}">${escapeHTML(candidate.initials)}</span>
        <div class="candidate-title"><h3>${escapeHTML(candidate.name)}</h3><span class="candidate-role">${escapeHTML(candidate.role)} · ${escapeHTML(candidate.area)}</span></div>
        <span class="candidate-location">⌖ ${escapeHTML(candidate.location)}</span>
      </div>
      <p class="candidate-summary">${escapeHTML(candidate.summary)}</p>
      <div class="resume-details">
        <div><h4>Experience</h4>${candidate.work.map(item => `<p>${escapeHTML(item)}</p>`).join('')}</div>
        <div><h4>Education</h4><p><strong>${escapeHTML(candidate.education)}</strong></p><p>${candidate.experience} ${candidate.experience === 1 ? 'year' : 'years'} of related experience</p></div>
      </div>
      <div class="candidate-footer"><div class="skills-row">${candidate.skills.map(skill => `<span class="skill-chip">${escapeHTML(skill)}</span>`).join('')}</div><button class="review-button" type="button" data-candidate="${escapeHTML(candidate.name)}">View resume</button></div>
    </article>`).join('');
}

const profileList = document.getElementById('profile-list');
profileList.addEventListener('click', event => {
  const button = event.target.closest('.review-button');
  if(button){
    const candidate = candidates.find(item => item.name === button.dataset.candidate);
    if(candidate) openResume(candidate);
  }
});

document.getElementById('profile-search-form').addEventListener('submit', event => { event.preventDefault(); renderProfiles(); });
document.querySelectorAll('[data-search]').forEach(button => button.addEventListener('click', () => {
  document.getElementById('profile-search').value = button.dataset.search;
  renderProfiles();
}));
document.querySelectorAll('input[name="career"], input[name="workplace"]').forEach(input => input.addEventListener('change', renderProfiles));
document.getElementById('experience-filter').addEventListener('change', renderProfiles);
document.getElementById('profile-sort').addEventListener('change', renderProfiles);

document.getElementById('clear-filters').addEventListener('click', () => {
  document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(input => { input.checked = false; });
  document.getElementById('experience-filter').value = '0';
  renderProfiles();
});
document.getElementById('reset-search').addEventListener('click', () => {
  document.getElementById('profile-search').value = '';
  document.getElementById('profile-location').value = '';
  document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(input => { input.checked = false; });
  document.getElementById('experience-filter').value = '0';
  renderProfiles();
});

const VACANCIES_KEY = 'hireflowStudentVacancies';
const REVIEWS_KEY = 'hireflowStudentReviews';
const overseasJobs = [
  {title:'Hospitality Associate',company:'Clover Bay Hotels',location:'Dubai, UAE',type:'Full-time',salary:'AED 3,500–4,500 / month',description:'Support guest services and daily hotel operations. English communication and customer-service experience preferred.',category:'Hospitality'},
  {title:'Junior Care Assistant',company:'Northshore Care Group',location:'Dublin, Ireland',type:'Full-time',salary:'€13–15 / hour',description:'Assist care teams with welcoming, respectful support. Training and supervised onboarding are provided.',category:'Healthcare'},
  {title:'Farm Operations Worker',company:'Greenfield Produce',location:'Auckland, New Zealand',type:'Seasonal',salary:'NZD 24–27 / hour',description:'Help with crop care, sorting, and packing in a team-based seasonal role.',category:'Agriculture'},
  {title:'Kitchen Crew Member',company:'Harbor Table',location:'Vancouver, Canada',type:'Full-time',salary:'CAD 18–21 / hour',description:'Prepare ingredients, maintain a clean kitchen, and collaborate with the food service team.',category:'Food service'}
];
let activeCandidate = null;

function readStored(key, fallback){
  try { const value = JSON.parse(localStorage.getItem(key) || 'null'); return value ?? fallback; }
  catch { return fallback; }
}
function saveStored(key, value){
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { showToast('Could not save on this device. Storage may be full.'); return false; }
}
function getCurrentAccount(){
  const email = localStorage.getItem(SESSION_KEY);
  return getAccounts().find(item => item.email === email) || {name:'Student',email:'',role:'student',subject:'',teacherCode:''};
}
function getStudentName(){ return getCurrentAccount().name || 'Student'; }
const ATS_KEY = 'hireflowApplicantPipeline';
const APPLICATIONS_KEY = 'hireflowJobApplications';
const HRIS_KEY = 'hireflowHrisProfiles';
const LEARNING_KEY = 'hireflowLearningResources';
function readAts(){ return readStored(ATS_KEY, {}); }
function renderAtsDashboard(){
  const records=readAts(),account=getCurrentAccount(),vacancies=readStored(VACANCIES_KEY,[]),applications=readStored(APPLICATIONS_KEY,[]).filter(application=>account.role==='teacher'||application.studentEmail===account.email),projects=readStored('hireflowAtsProjects',[]);
  const vacancyOptions=`<option value="">Unassigned</option>${vacancies.map(job=>`<option value="${escapeHTML(job.id)}">${escapeHTML(job.title)}</option>`).join('')}`;
  const projectOptions=id=>`<option value="">Unassigned</option>${projects.map(project=>`<option value="${escapeHTML(project.id)}" ${project.id===id?'selected':''}>${escapeHTML(project.name)}</option>`).join('')}`;
  const decisionOptions=status=>`<option ${!status||status==='New'?'selected':''}>New</option><option ${status==='Reviewing'?'selected':''}>Reviewing</option><option ${status==='Accepted'?'selected':''}>Accepted</option><option ${status==='Rejected'?'selected':''}>Rejected</option>`;
  const sampleRows=candidates.map(candidate=>{const item=records[candidate.name]||{};return `<tr data-ats-row data-searchable="${escapeHTML(`${candidate.name} ${candidate.role} ${candidate.area} ${candidate.skills.join(' ')}`.toLowerCase())}" data-status="${escapeHTML(item.status||'New')}" data-project="${escapeHTML(item.projectId||'')}"><td><button class="ats-profile-link" type="button" data-ats-profile="${escapeHTML(candidate.name)}">${escapeHTML(candidate.name)}</button><small>Sample profile</small></td><td>${escapeHTML(candidate.role)}</td><td>${escapeHTML(candidate.name.toLowerCase().replace(/[^a-z]+/g,'.').replace(/^\.|\.$/g,'')+'@example.edu')}</td><td>+1 (555) 010-${String(candidate.name.length*113).padStart(4,'0')}</td><td><select data-ats-vacancy="${escapeHTML(candidate.name)}" aria-label="Vacancy for ${escapeHTML(candidate.name)}">${vacancyOptions.replace(`value="${escapeHTML(item.vacancyId||'')}"`,`value="${escapeHTML(item.vacancyId||'')}" selected`)}</select></td><td><select data-ats-project="${escapeHTML(candidate.name)}" aria-label="Project for ${escapeHTML(candidate.name)}">${projectOptions(item.projectId)}</select></td><td><select data-ats-status="${escapeHTML(candidate.name)}" aria-label="Decision for ${escapeHTML(candidate.name)}">${decisionOptions(item.status)}</select></td></tr>`;}).join('');
  const applicationRows=applications.map(application=>{const job=vacancies.find(item=>item.id===application.vacancyId);return `<tr data-ats-row data-applicant="true" data-searchable="${escapeHTML(`${application.studentName} ${application.studentEmail} ${job?.title||''}`.toLowerCase())}" data-status="${escapeHTML(application.status||'New')}" data-project="${escapeHTML(application.projectId||'')}"><td>${escapeHTML(application.studentName)}<small>Student applicant</small></td><td>${escapeHTML(job?.title||'Vacancy removed')}</td><td>${escapeHTML(application.studentEmail)}</td><td>${account.role==='teacher'?`<select data-application-project="${escapeHTML(application.id)}" aria-label="Project for ${escapeHTML(application.studentName)}">${projectOptions(application.projectId)}</select>`:'—'}</td><td>${account.role==='teacher'?`<select data-application-status="${escapeHTML(application.id)}" aria-label="Decision for ${escapeHTML(application.studentName)}">${decisionOptions(application.status)}</select>`:`<strong class="ats-decision">${escapeHTML(application.status||'New')}</strong>`}</td></tr>`;}).join('');
  const projectSections=projects.map(project=>{const names=Object.entries(records).filter(([,item])=>item.projectId===project.id).map(([name])=>name).concat(applications.filter(item=>item.projectId===project.id).map(item=>item.studentName));return `<article class="ats-project-card" data-project-open="${escapeHTML(project.id)}"><h3>${escapeHTML(project.name)}</h3><button type="button" class="ats-project-view" data-project-view="${escapeHTML(project.id)}">View ${names.length} tagged applicant${names.length===1?'':'s'} →</button><p>${names.length} tagged applicant${names.length===1?'':'s'}</p><ul>${names.map(name=>`<li>${escapeHTML(name)}</li>`).join('')||'<li>No applicants tagged yet.</li>'}</ul></article>`;}).join('');
  document.getElementById('ats-view').innerHTML=`<section class="teacher-dashboard ats-dashboard"><div class="ats-cover"><div class="board-topline ats-topline"><a class="board-brand" href="#ats">Mock-up Desk</a><span class="board-demo">STUDENT RECRUITING SIMULATION</span><span class="board-student-label">${account.role==='teacher'?'Teacher workspace':'Student workspace'}</span></div><p class="eyebrow">RECRUITMENT WORKFLOW</p><h1>Find, organize, and review talent</h1><p>Search applicants, assign them to hiring projects, and follow each review through your pipeline.</p></div><div class="teacher-dashboard-head"><div><p class="eyebrow">APPLICANT TRACKING SYSTEM</p><h1>Applicant pipeline</h1><p>Search projects and candidates, assign applicants, and follow each review through your pipeline.</p></div><strong>${candidates.length+applications.length} applicants</strong></div><div class="ats-toolbar"><label>Project search<input id="ats-project-search" type="search" placeholder="Search hiring projects" aria-label="Search projects"></label><label>Candidate search<input id="ats-search" type="search" placeholder="Name, role, skill, or keyword" aria-label="Search candidates"></label><label>Status<select id="ats-status-filter"><option value="">All statuses</option><option>New</option><option>Reviewing</option><option>Accepted</option><option>Rejected</option></select></label><label>Project<select id="ats-project-filter"><option value="">All projects</option>${projects.map(project=>`<option value="${escapeHTML(project.id)}">${escapeHTML(project.name)}</option>`).join('')}</select></label></div><h2 class="directory-title">Create project</h2><form class="ats-project-form" id="ats-project-form"><label>Project name<input name="name" required maxlength="100" placeholder="e.g. Summer hiring cohort"></label><button class="primary-button" type="submit">＋ Create Project</button></form><h2 class="directory-title">Job Board applications</h2><div class="teacher-table-wrap"><table class="teacher-table"><thead><tr><th>Applicant</th><th>Applied for</th><th>Email</th><th>Project Name</th><th>Decision</th></tr></thead><tbody>${applicationRows||`<tr><td colspan="5" class="teacher-empty">${account.role==='student'?'You have not applied to a vacancy yet.':'No student applications yet. Students can apply from the Job Board.'}</td></tr>`}</tbody></table></div><h2 class="directory-title">Candidate search results</h2><div class="teacher-table-wrap"><table class="teacher-table"><thead><tr><th>Applicant</th><th>Role</th><th>Email</th><th>Contact</th><th>Job Board vacancy</th><th>Project Name</th><th>Decision</th></tr></thead><tbody>${sampleRows}</tbody></table></div><h2 class="directory-title">Projects and tagged applicants</h2><div class="ats-project-list">${projectSections||'<p class="teacher-privacy-note">Create a project, then assign applicants to it using the Project Name column.</p>'}</div><p class="teacher-privacy-note">Applicant decisions and project assignments are stored locally in this browser.</p></section>`;
  const atsRoot=document.getElementById('ats-view');
  const atsLocal=document.createElement('div');atsLocal.className='ats-local-mode';
  while(atsRoot.firstElementChild)atsLocal.append(atsRoot.firstElementChild);
  const atsTabs=document.createElement('nav');atsTabs.className='ats-category-tabs';atsTabs.setAttribute('aria-label','Applicant tracking location');
  atsTabs.innerHTML='<button type="button" class="active" data-ats-category="local">Local</button><button type="button" data-ats-category="overseas">Overseas</button>';
  const overseasRecords=readStored('hireflowOverseasAts',{});
  const overseasProjectSections=projects.map(project=>{const names=Object.entries(overseasRecords).filter(([,item])=>item.projectId===project.id).map(([name])=>name);return `<article class="ats-project-card"><h3>${escapeHTML(project.name)}</h3><p>${names.length} tagged applicant${names.length===1?'':'s'}</p><ul>${names.map(name=>`<li>${escapeHTML(name)}</li>`).join('')||'<li>No applicants tagged yet.</li>'}</ul></article>`;}).join('');
  const documentTypes=['Passport','Medical','NBI','School Credentials','Certificates','PEOS','E-Reg'];
  const overseasStages=[['passport','Passport',['Passport']],['medical','Medical',['Medical']],['documents','Required documents',documentTypes.slice(2)],['visa','Visa',['Visa']],['ticket','Ticket',['Ticket']],['oec','OEC',['OEC']]];
  const overseasRows=candidates.map(candidate=>{
    const record=overseasRecords[candidate.name]||{};
    const requirements=types=>types.map(type=>{
      const safeType=type.toLowerCase().replace(/[^a-z0-9]+/g,'-');
      const sample=`FICTIONAL TRAINING SAMPLE — ${type}\nCandidate: ${candidate.name}\nThis is a fabricated document placeholder for classroom practice. It is not an official or valid document.`;
      return `<div class="ats-overseas-document"><span>${escapeHTML(type)}</span><a download="fictional-${safeType}-${escapeHTML(candidate.initials.toLowerCase())}.txt" href="data:text/plain;charset=utf-8,${encodeURIComponent(sample)}">Fictional sample attached</a></div>`;
    }).join('');
    const status=(step,label)=>`<label class="ats-overseas-status">${label}<select data-overseas-status="${escapeHTML(candidate.name)}" data-overseas-step="${step}" aria-label="${label} status for ${escapeHTML(candidate.name)}">${['confirmed','ongoing','onhold','failed'].map(value=>`<option value="${value}" ${(record[step]||'ongoing')===value?'selected':''}>${value==='onhold'?'On hold':value[0].toUpperCase()+value.slice(1)}</option>`).join('')}</select></label>`;
    const stageMenu=overseasStages.map(([key,label],index)=>`<button type="button" data-overseas-open-step="${key}">Step ${index+1} · ${escapeHTML(label)}</button>`).join('');
    const stagePages=overseasStages.map(([key,label,types],index)=>`<section class="ats-overseas-step-page" data-overseas-page="${key}" hidden><button type="button" class="ats-overseas-back" data-overseas-step-menu>← All steps</button><h4>Step ${index+1} · ${escapeHTML(label)}</h4>${status(key,`${label} status`)}<div class="ats-overseas-documents">${requirements(types)}</div></section>`).join('');
    const projectOptions=`<option value="">Unassigned</option>${projects.map(project=>`<option value="${escapeHTML(project.id)}" ${project.id===record.projectId?'selected':''}>${escapeHTML(project.name)}</option>`).join('')}`;
    const notes=(record.notes||[]).map(note=>`<li><strong>${escapeHTML(note.date||'')}</strong><span>${escapeHTML(note.text||'')}</span></li>`).join('');
    const audit=(record.audit||[]).slice().reverse().map(item=>`<li><strong>${escapeHTML(item.date||'')}</strong><span>${escapeHTML(item.text||'')}</span></li>`).join('');
    return `<article class="ats-overseas-candidate" data-overseas-candidate data-searchable="${escapeHTML(`${candidate.name} ${candidate.role} ${candidate.area} ${candidate.skills.join(' ')}`.toLowerCase())}" tabindex="0" aria-expanded="false" aria-label="Expand profile for ${escapeHTML(candidate.name)}"><header><div><h3><button type="button" class="ats-overseas-profile-link" data-overseas-profile="${escapeHTML(candidate.name)}">${escapeHTML(candidate.name)}</button></h3><p>${escapeHTML(candidate.role)} · ${escapeHTML(candidate.location)}</p></div><label class="ats-overseas-project">Project<select data-overseas-project="${escapeHTML(candidate.name)}" aria-label="Assign project for ${escapeHTML(candidate.name)}">${projectOptions}</select></label></header><div class="ats-overseas-profile-details" hidden><nav class="ats-overseas-step-menu" aria-label="Deployment steps">${stageMenu}</nav><div class="ats-overseas-step-pages">${stagePages}</div><form class="ats-overseas-note-form" data-overseas-note-form="${escapeHTML(candidate.name)}"><label>Notes<textarea data-overseas-note-text rows="2" maxlength="1000" placeholder="Add a job-related note..."></textarea></label><button type="submit">Save note</button></form><section class="ats-overseas-history"><h4>Notes &amp; audit trail</h4><ol>${notes}${audit}</ol>${!notes&&!audit?'<p>No notes or activity recorded yet.</p>':''}</section></div></article>`;
  }).join('');
  const atsOverseas=document.createElement('section');atsOverseas.className='ats-overseas-mode';atsOverseas.setAttribute('aria-label','Overseas applicant tracking');atsOverseas.hidden=true;
  atsOverseas.innerHTML=`<section class="teacher-dashboard ats-overseas-dashboard"><div class="ats-overseas-cover"><p class="eyebrow">APPLICANT TRACKING SYSTEM · OVERSEAS</p><h1>Overseas recruitment workflow</h1><p>Manage candidate projects and track deployment requirements from passport through OEC.</p></div><div class="teacher-dashboard-head"><div><p class="eyebrow">OVERSEAS APPLICANT TRACKING</p><h2>Candidate deployment</h2><p>Search candidates, create projects, and follow each candidate through six deployment steps.</p></div><strong>${candidates.length} candidates</strong></div><div class="ats-overseas-actions"><label class="ats-overseas-search">Search candidates<input type="search" id="ats-overseas-search" placeholder="Name, role, skill, or keyword"></label><label class="ats-overseas-search">Search projects<input type="search" id="ats-overseas-project-search" placeholder="Search hiring projects"></label></div><h2 class="directory-title">Create project</h2><form class="ats-project-form" id="ats-overseas-project-form"><label>Project name<input name="name" required maxlength="100" placeholder="e.g. Overseas hiring cohort"></label><button class="primary-button" type="submit">＋ Create Project</button></form><div class="ats-project-list ats-overseas-project-list">${overseasProjectSections||'<p class="teacher-privacy-note">Create a project, then assign overseas candidates using the Project selector.</p>'}</div><p class="teacher-privacy-note">All attached documents are fabricated text samples for training only. They are not official identity, medical, or clearance documents.</p><div class="ats-overseas-list">${overseasRows}</div></section>`;
  atsRoot.append(atsTabs,atsLocal,atsOverseas);
  let fullscreenButton=null;
  atsTabs.addEventListener('click',event=>{const button=event.target.closest('[data-ats-category]');if(!button)return;const local=button.dataset.atsCategory==='local';atsLocal.hidden=!local;atsOverseas.hidden=local;atsTabs.querySelectorAll('[data-ats-category]').forEach(tab=>tab.classList.toggle('active',tab===button));if(fullscreenButton){const target=local?atsLocal.querySelector('.ats-cover'):atsOverseas.querySelector('.ats-overseas-cover');target?.after(fullscreenButton);}});
  addFullscreenButton('ats-view');
  fullscreenButton=atsRoot.querySelector('[data-fullscreen-toggle="ats-view"]');
  atsLocal.querySelector('.ats-cover')?.after(fullscreenButton);
  const applyFilter=()=>{const query=(document.getElementById('ats-search')?.value||'').trim().toLowerCase(),projectQuery=(document.getElementById('ats-project-search')?.value||'').trim().toLowerCase(),status=document.getElementById('ats-status-filter')?.value||'',project=document.getElementById('ats-project-filter')?.value||'';document.querySelectorAll('#ats-local-mode [data-ats-row], .ats-local-mode [data-ats-row]').forEach(row=>{row.hidden=(!!status&&row.dataset.status!==status)||(!!project&&row.dataset.project!==project)||(!!query&&!(row.dataset.searchable||'').includes(query));});document.querySelectorAll('#ats-view .ats-project-card').forEach(card=>{card.hidden=!!projectQuery&&!card.textContent.toLowerCase().includes(projectQuery);});};
  document.getElementById('ats-search').addEventListener('input',applyFilter);document.getElementById('ats-project-search').addEventListener('input',applyFilter);document.getElementById('ats-status-filter').addEventListener('change',applyFilter);document.getElementById('ats-project-filter').addEventListener('change',applyFilter);
  const refreshOverseasProjectCards=()=>{const all=readStored('hireflowAtsProjects',[]),records=readStored('hireflowOverseasAts',{});const list=atsOverseas.querySelector('.ats-overseas-project-list');list.innerHTML=all.length?all.map(project=>{const names=Object.entries(records).filter(([,item])=>item.projectId===project.id).map(([name])=>name);return `<article class="ats-project-card"><h3>${escapeHTML(project.name)}</h3><p>${names.length} tagged applicant${names.length===1?'':'s'}</p><ul>${names.map(name=>`<li>${escapeHTML(name)}</li>`).join('')||'<li>No applicants tagged yet.</li>'}</ul></article>`;}).join(''):'<p class="teacher-privacy-note">Create a project, then assign overseas candidates using the Project selector.</p>';};
  const filterOverseas=()=>{const query=(atsOverseas.querySelector('#ats-overseas-search')?.value||'').trim().toLowerCase(),projectQuery=(atsOverseas.querySelector('#ats-overseas-project-search')?.value||'').trim().toLowerCase();atsOverseas.querySelectorAll('[data-overseas-candidate]').forEach(card=>{const selected=card.querySelector('[data-overseas-project]');const projectName=selected?.selectedOptions[0]?.textContent||'';card.hidden=!!query&&!(card.dataset.searchable+' '+projectName.toLowerCase()).includes(query);});atsOverseas.querySelectorAll('.ats-overseas-project-list .ats-project-card').forEach(card=>card.hidden=!!projectQuery&&!card.textContent.toLowerCase().includes(projectQuery));};
  atsOverseas.querySelector('#ats-overseas-search').addEventListener('input',filterOverseas);
  atsOverseas.querySelector('#ats-overseas-project-search').addEventListener('input',filterOverseas);
  const toggleOverseasProfile=card=>{const details=card.querySelector('.ats-overseas-profile-details');details.hidden=!details.hidden;card.setAttribute('aria-expanded',String(!details.hidden));card.setAttribute('aria-label',`${details.hidden?'Expand':'Collapse'} profile for ${card.querySelector('.ats-overseas-profile-link')?.textContent.trim()||'candidate'}`);};
  atsOverseas.addEventListener('click',event=>{const profileLink=event.target.closest('[data-overseas-profile]');if(profileLink){const candidate=candidates.find(item=>item.name===profileLink.dataset.overseasProfile);if(candidate)openResume(candidate);return;}const card=event.target.closest('[data-overseas-candidate]');if(card&&!event.target.closest('button,a,input,select,textarea,label,form'))toggleOverseasProfile(card);const open=event.target.closest('[data-overseas-open-step]');if(open){const stepCard=open.closest('[data-overseas-candidate]');stepCard.querySelector('.ats-overseas-step-menu').hidden=true;stepCard.querySelectorAll('[data-overseas-page]').forEach(page=>page.hidden=page.dataset.overseasPage!==open.dataset.overseasOpenStep);}const back=event.target.closest('[data-overseas-step-menu]');if(back){const stepCard=back.closest('[data-overseas-candidate]');stepCard.querySelector('.ats-overseas-step-menu').hidden=false;stepCard.querySelectorAll('[data-overseas-page]').forEach(page=>page.hidden=true);}});
  atsOverseas.addEventListener('keydown',event=>{const card=event.target.closest('[data-overseas-candidate]');if(card&&event.target===card&&(event.key==='Enter'||event.key===' ')){event.preventDefault();toggleOverseasProfile(card);}});
  const renderOverseasHistory=(card,record)=>{const history=card.querySelector('.ats-overseas-history');const notes=(record.notes||[]).map(note=>`<li><strong>${escapeHTML(note.date||'')}</strong><span>${escapeHTML(note.text||'')}</span></li>`).join('');const audit=(record.audit||[]).slice().reverse().map(item=>`<li><strong>${escapeHTML(item.date||'')}</strong><span>${escapeHTML(item.text||'')}</span></li>`).join('');history.innerHTML=`<h4>Notes &amp; audit trail</h4><ol>${notes}${audit}</ol>${!notes&&!audit?'<p>No notes or activity recorded yet.</p>':''}`;};
  atsOverseas.addEventListener('submit',event=>{const form=event.target.closest('[data-overseas-note-form]');if(form){event.preventDefault();const text=form.querySelector('[data-overseas-note-text]').value.trim();if(!text)return;const name=form.dataset.overseasNoteForm,data=readStored('hireflowOverseasAts',{}),record=data[name]||{};record.notes=record.notes||[];record.audit=record.audit||[];const date=new Date().toLocaleString();record.notes.push({date,text});record.audit.push({date,text:`Note added: ${text}`});data[name]=record;if(saveStored('hireflowOverseasAts',data)){form.reset();renderOverseasHistory(form.closest('[data-overseas-candidate]'),record);}}const projectForm=event.target.closest('#ats-overseas-project-form');if(projectForm){event.preventDefault();const name=projectForm.querySelector('[name="name"]').value.trim();if(!name)return;const all=readStored('hireflowAtsProjects',[]);const project={id:`project-${Date.now()}`,name};all.push(project);if(!saveStored('hireflowAtsProjects',all))return;atsLocal.querySelectorAll('[data-ats-project]').forEach(select=>select.add(new Option(name,project.id)));const localProjectFilter=atsLocal.querySelector('#ats-project-filter');if(localProjectFilter)localProjectFilter.add(new Option(name,project.id));atsOverseas.querySelectorAll('[data-overseas-project]').forEach(select=>select.add(new Option(name,project.id)));const localList=atsLocal.querySelector('.ats-project-list');if(localList){localList.querySelector('.teacher-privacy-note')?.remove();localList.insertAdjacentHTML('beforeend',`<article class="ats-project-card" data-project-open="${escapeHTML(project.id)}"><h3>${escapeHTML(name)}</h3><button type="button" class="ats-project-view" data-project-view="${escapeHTML(project.id)}">View 0 tagged applicants →</button><p>0 tagged applicants</p><ul><li>No applicants tagged yet.</li></ul></article>`);}const list=atsOverseas.querySelector('.ats-overseas-project-list');const empty=list.querySelector('.teacher-privacy-note');if(empty)empty.remove();list.insertAdjacentHTML('beforeend',`<article class="ats-project-card"><h3>${escapeHTML(name)}</h3><p>0 tagged applicants</p><ul><li>No applicants tagged yet.</li></ul></article>`);projectForm.reset();}});
  atsOverseas.addEventListener('change',event=>{const control=event.target.closest('[data-overseas-status],[data-overseas-project]');if(!control)return;const data=readStored('hireflowOverseasAts',{}),name=control.dataset.overseasStatus||control.dataset.overseasProject,record=data[name]||{};if(control.matches('[data-overseas-status]')){const key=control.dataset.overseasStep,old=record[key]||'ongoing';if(old!==control.value){record.audit=record.audit||[];record.audit.push({date:new Date().toLocaleString(),text:`${key[0].toUpperCase()+key.slice(1)} status changed from ${old} to ${control.value}.`});}record[key]=control.value;}else record.projectId=control.value;data[name]=record;if(saveStored('hireflowOverseasAts',data)){if(control.matches('[data-overseas-status]'))renderOverseasHistory(control.closest('[data-overseas-candidate]'),record);else{refreshOverseasProjectCards();filterOverseas();}}});
  atsLocal.addEventListener('click',event=>{const card=event.target.closest('.ats-project-card');if(!card)return;const projectId=card.dataset.projectOpen;document.getElementById('ats-project-filter').value=projectId;applyFilter();atsLocal.querySelector('.ats-toolbar')?.scrollIntoView({behavior:'smooth',block:'start'});});
}
const EMPLOYEES_KEY = 'hireflowFictionalEmployees';
function makePortrait(name,index){
  const colors=['#e6a77f','#bd8063','#f0c2a1','#9f6852','#d9a080','#f1d0ac'];
  const hair=['#30252b','#4c312b','#20252c','#693f35','#41334a'];
  const bg=['#f8dce9','#e6e0fa','#dff1eb','#ffe9d1'];
  const skin=colors[index%colors.length], dark=hair[index%hair.length], backdrop=bg[index%bg.length];
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 130"><rect width="120" height="130" rx="18" fill="${backdrop}"/><path d="M15 130c3-29 18-43 45-43s42 14 45 43" fill="#${['a84e7c','526a8a','53816b','8b674c'][index%4]}"/><path d="M29 55c0-26 12-39 31-39 22 0 34 16 31 44l-6 17H35z" fill="${dark}"/><ellipse cx="60" cy="59" rx="25" ry="31" fill="${skin}"/><path d="M35 50c2-23 13-34 29-34 17 0 27 10 29 30-13-1-22-8-29-17-7 11-17 17-29 21" fill="${dark}"/><circle cx="51" cy="60" r="2" fill="#31242a"/><circle cx="69" cy="60" r="2" fill="#31242a"/><path d="M54 75q6 5 12 0" fill="none" stroke="#945d5c" stroke-width="1.7" stroke-linecap="round"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
function seedEmployees(){
  if(localStorage.getItem(EMPLOYEES_KEY)) return;
  const roles=[['Human Resources','HR Manager'],['Human Resources','HR Recruiter'],['Human Resources','HR Admin'],['Human Resources','HR Assistant'],['Human Resources','HR Assistant'],['Marketing','Marketing Team Leader'],['Marketing','Marketing Assistant'],['Facilities','Janitor'],['Facilities','Janitor'],['Facilities','Janitor'],['Operations','Operations Manager'],['Operations','Management Trainee'],['Operations','Operations Crew'],['Operations','Operations Crew'],['Operations','Operations Crew'],['Executive','CEO']];
  const names=['Elena Brooks','Marcus Reed','Nina Flores','Caleb Morgan','Aisha Bennett','Tessa Coleman','Jordan Price','Rosa Delgado','Andre Lewis','Mei Santos','Samuel Foster','Lara Kim','Diego Ramirez','Grace Turner','Owen Campbell','Victoria Hayes'];
  const employees=roles.map(([department,position],i)=>{
    const hired=new Date(2021+(i%4),i%12,2+(i*3)%25).toISOString().slice(0,10);
    const contract={date:hired,salary:[92000,68000,54000,42000,42000,72000,48000,33000,33000,33000,98000,52000,39000,39000,39000,165000][i],terms:'Full-time employment. Compensation is paid monthly, subject to applicable deductions. Benefits and workplace policies follow the fictional company handbook.'};
    return {id:`employee-${i+1}`,name:names[i],department,position,address:`${100+i*17} Rosewood Avenue, Portland, OR`,birthday:`${1974+(i*3)%25}-${String(i%12+1).padStart(2,'0')}-${String(i*2%27+1).padStart(2,'0')}`,dateHired:hired,status:i%4===0?'Probationary':i%7===0?'Contractual':'Regular',portrait:makePortrait(names[i],i),statutory:{pagibig:`${String(1000000000+i*17321).slice(0,12)}`,sss:`${String(100000000000+i*319).slice(0,12)}`,philhealth:`${String(100000000000+i*517).slice(0,12)}`,tin:`${String(100000000+i*829).slice(0,11)}`,hmo:`HMO-${String(24000+i).padStart(5,'0')}`},salary:contract.salary,contractTerms:contract.terms,contractFileName:'',contractData:'',contractHistory:[contract],leaveBalance:{vacation:10+(i%6),sick:5+(i%5),personal:3},leaves:[{when:`2025-${String(i%12+1).padStart(2,'0')}-12`,reason:'Personal day',days:1,status:i%3===0?'Rejected':'Approved'}]};
  });
  saveStored(EMPLOYEES_KEY,employees);
}
function readEmployees(){ seedEmployees(); const list=readStored(EMPLOYEES_KEY,[]); return Array.isArray(list)?list:[]; }
function renderHris(){
  const employees=readEmployees().sort((a,b)=>a.department.localeCompare(b.department)||a.name.localeCompare(b.name));
  const departments=[...new Set(employees.map(employee=>employee.department))];
  const cards=employees.map((employee,index)=>`${index===0||employees[index-1].department!==employee.department?`<h2 class="employee-department-heading" data-employee-department="${escapeHTML(employee.department)}">${escapeHTML(employee.department)}</h2>`:''}<article class="employee-card" data-employee-department="${escapeHTML(employee.department)}"><img src="${employee.portrait}" alt="Fictional portrait of ${escapeHTML(employee.name)}"><div class="employee-card-copy"><span class="employee-department">${escapeHTML(employee.department)}</span><h3>${escapeHTML(employee.name)}</h3><p>${escapeHTML(employee.position)}</p><p class="employee-personal-meta">${escapeHTML(employee.address)}<br>Birthday: ${escapeHTML(employee.birthday)} · Hired: ${escapeHTML(employee.dateHired)}</p><span class="employee-status status-${employee.status.toLowerCase()}">${escapeHTML(employee.status)}</span></div><div class="employee-card-actions"><button type="button" data-employee-detail="statutory" data-employee-id="${escapeHTML(employee.id)}">Statutory</button><button type="button" data-employee-detail="contract" data-employee-id="${escapeHTML(employee.id)}">Contract</button><button type="button" data-employee-detail="leave" data-employee-id="${escapeHTML(employee.id)}">Leave credits</button><button type="button" class="employee-edit" data-employee-edit="${escapeHTML(employee.id)}">Edit profile</button><button type="button" class="employee-delete" data-employee-delete="${escapeHTML(employee.id)}">Delete</button></div></article>`).join('');
  document.getElementById('hris-view').innerHTML=`<section class="teacher-dashboard hris-cover hris-main-cover"><p class="eyebrow">HUMAN RESOURCES INFORMATION SYSTEM</p><h1>People, time, and payroll</h1><p>Manage employee records, timekeeping, and payroll in one training workspace.</p></section><section class="teacher-dashboard employee-directory"><div class="teacher-dashboard-head"><div><p class="eyebrow">HRIS · EMPLOYEE RECORDS</p><h1>Employee profiles</h1><p>Fictional personnel records for training. Employee records are separate from Job Board and ATS data.</p></div><button type="button" class="primary-button" data-employee-add>＋ Add Employee Profile</button></div><div class="employee-department-count">${employees.length} fictional employees · ${departments.length} departments</div><label class="hris-filter-label">Filter department <select id="employee-department-filter"><option value="">All departments</option>${departments.map(department=>`<option value="${escapeHTML(department)}">${escapeHTML(department)}</option>`).join('')}</select></label><div class="employee-grid">${cards}</div><div class="employee-modal-backdrop" id="employee-editor" hidden><section class="employee-editor" role="dialog" aria-modal="true" aria-labelledby="employee-editor-title"><button type="button" class="dialog-close" data-employee-close aria-label="Close">×</button><h2 id="employee-editor-title">Add Employee Profile</h2><form id="employee-form"><input type="hidden" name="id"><div class="form-row"><label class="form-field">Full name<input name="name" required maxlength="100"></label><label class="form-field">Position<input name="position" required maxlength="80"></label></div><div class="form-row"><label class="form-field">Department<select name="department"><option>Human Resources</option><option>Marketing</option><option>Facilities</option><option>Operations</option><option>Executive</option></select></label><label class="form-field">Status<select name="status"><option>Regular</option><option>Probationary</option><option>Contractual</option></select></label></div><div class="form-row"><label class="form-field">Address<input name="address" required maxlength="180"></label><label class="form-field">Profile picture<input name="portrait" type="file" accept="image/*"></label></div><div class="form-row"><label class="form-field">Birthday<input name="birthday" type="date" required></label><label class="form-field">Date hired<input name="dateHired" type="date" required></label></div><h3>Statutory details <small>Fictional demo values only</small></h3><div class="form-row"><label class="form-field">PAG-IBIG No.<input name="pagibig"></label><label class="form-field">SSS<input name="sss"></label></div><div class="form-row"><label class="form-field">PhilHealth<input name="philhealth"></label><label class="form-field">TIN<input name="tin"></label></div><label class="form-field">HMO No.<input name="hmo"></label><h3>Current contract</h3><div class="form-row"><label class="form-field">Monthly salary<input name="salary" type="number" min="0" step="0.01" required></label><label class="form-field">Upload contract<input name="contractFile" type="file" accept=".pdf,.doc,.docx,.txt"></label></div><label class="form-field">Terms and conditions<textarea name="contractTerms" rows="4" required maxlength="3000"></textarea></label><h3>Leave credit balance (days)</h3><div class="form-row"><label class="form-field">Vacation leave<input name="vacation" type="number" min="0" step="0.5"></label><label class="form-field">Sick leave<input name="sick" type="number" min="0" step="0.5"></label></div><label class="form-field">Personal leave<input name="personal" type="number" min="0" step="0.5"></label><button class="primary-button" type="submit">Save Employee Profile</button></form></section></div><div class="employee-modal-backdrop" id="employee-detail" hidden><section class="employee-detail-dialog" role="dialog" aria-modal="true"><button type="button" class="dialog-close" data-employee-close aria-label="Close">×</button><div id="employee-detail-content"></div></section></div></section>`;
  attachHrisModules();
  addFullscreenButton('hris-view');
}
function attachHrisModules(){
  const root=document.getElementById('hris-view'),directory=root.querySelector('.employee-directory');if(!directory||root.querySelector('.hris-module-tabs'))return;
  const employees=readEmployees(),attendance=readStored('hireflowTmisAttendance',[]),payroll=readStored('hireflowPayrollHistory',[]);
  const nav=document.createElement('nav');nav.className='hris-module-tabs';nav.setAttribute('aria-label','HRIS modules');nav.innerHTML='<button type="button" class="active" data-hris-tab="employee">Employee</button><button type="button" data-hris-tab="tmis">TMIS</button><button type="button" data-hris-tab="payroll">Payroll</button>';
  directory.before(nav);
  const tmis=document.createElement('section');tmis.className='teacher-dashboard hris-module-panel';tmis.dataset.hrisPanel='tmis';tmis.hidden=true;
  tmis.innerHTML=`<div class="hris-cover"><p class="eyebrow">TIME MANAGEMENT INFORMATION SYSTEM</p><h1>Attendance &amp; timekeeping</h1><p>Record time in/out, daily notes, and finalize a date range for payroll review.</p></div><form id="tmis-form" class="hris-profile-form"><div class="form-row"><label class="form-field">Employee<select name="employeeId" required>${employees.map(item=>`<option value="${escapeHTML(item.id)}">${escapeHTML(item.name)}</option>`).join('')}</select></label><label class="form-field">Work date<input type="date" name="date" required value="${new Date().toISOString().slice(0,10)}"></label></div><div class="form-row"><label class="form-field">Time in<input type="time" name="timeIn" required></label><label class="form-field">Time out<input type="time" name="timeOut"></label></div><label class="form-field">Daily notes<input name="notes" maxlength="300" placeholder="Attendance or timekeeping notes"></label><button class="primary-button" type="submit">Save attendance</button></form><div class="form-row tmis-finalize"><label class="form-field">From<input type="date" id="tmis-from"></label><label class="form-field">To<input type="date" id="tmis-to"></label><button class="primary-button" type="button" data-finalize-attendance>Finalize period for payroll</button></div><div class="teacher-table-wrap"><table class="teacher-table"><thead><tr><th>Employee</th><th>Date</th><th>Time in</th><th>Time out</th><th>Daily notes</th><th>Payroll status</th></tr></thead><tbody>${attendance.map(item=>`<tr><td>${escapeHTML(employees.find(employee=>employee.id===item.employeeId)?.name||'Employee')}</td><td>${escapeHTML(item.date)}</td><td>${escapeHTML(item.timeIn)}</td><td>${escapeHTML(item.timeOut||'—')}</td><td>${escapeHTML(item.notes||'—')}</td><td>${item.finalized?'Finalized':'Open'}</td></tr>`).join('')||'<tr><td colspan="6" class="teacher-empty">No attendance entries recorded.</td></tr>'}</tbody></table></div><p class="teacher-privacy-note">Fictional training data only. Finalization marks attendance for review; it does not transmit payroll.</p>`;
  const pay=document.createElement('section');pay.className='teacher-dashboard hris-module-panel';pay.dataset.hrisPanel='payroll';pay.hidden=true;
  const employeeOptions=employees.map(item=>`<option value="${escapeHTML(item.id)}">${escapeHTML(item.name)}</option>`).join('');
  pay.innerHTML=`<div class="hris-cover payroll-cover"><p class="eyebrow">PAYROLL WORKSPACE · PHILIPPINES DEMO</p><h1>Payroll &amp; payslips</h1><p>Prepare fictional monthly payroll and review employee payroll history.</p></div><form id="payroll-form" class="hris-profile-form"><div class="form-row"><label class="form-field">Employee<select name="employeeId" required>${employeeOptions}</select></label><label class="form-field">Payroll month<input type="month" name="period" required value="${new Date().toISOString().slice(0,7)}"></label></div><div class="form-row"><label class="form-field">Basic monthly pay (₱)<input name="basic" type="number" min="0" step="0.01" required></label><label class="form-field">Allowances (₱)<input name="allowances" type="number" min="0" step="0.01" value="0"></label></div><div class="form-row"><label class="form-field">Other deductions (₱)<input name="otherDeductions" type="number" min="0" step="0.01" value="0"></label><label class="form-field">Days worked<input name="daysWorked" type="number" min="0" max="31" value="22"></label></div><button class="primary-button" type="submit">Calculate &amp; save payslip</button></form><p class="teacher-privacy-note">Illustrative Philippine payroll only: the estimator uses capped SSS (5%), employee PhilHealth (2.5%), and Pag-IBIG (2% capped at ₱200). Withholding tax, 13th-month pay, overtime, leave conversions, and employer contributions require current DOLE/BIR/agency rules and qualified review; verify all amounts before use.</p><h2 class="directory-title">Payroll history</h2><div class="teacher-table-wrap"><table class="teacher-table"><thead><tr><th>Employee</th><th>Period</th><th>Gross pay</th><th>Deductions</th><th>Net pay</th><th>Payslip / report</th></tr></thead><tbody>${payroll.map(item=>`<tr><td>${escapeHTML(item.employeeName)}</td><td>${escapeHTML(item.period)}</td><td>₱${Number(item.gross).toLocaleString('en-PH',{minimumFractionDigits:2})}</td><td>₱${Number(item.deductions).toLocaleString('en-PH',{minimumFractionDigits:2})}</td><td><strong>₱${Number(item.net).toLocaleString('en-PH',{minimumFractionDigits:2})}</strong></td><td><button class="review-button" type="button" data-download-payslip="${escapeHTML(item.id)}">Download payslip</button></td></tr>`).join('')||'<tr><td colspan="6" class="teacher-empty">No payroll records yet.</td></tr>'}</tbody></table></div><button type="button" class="review-button" data-download-payroll-report>Download payroll report (CSV)</button>`;
  directory.after(tmis,pay);
}
document.getElementById('hris-view').addEventListener('click',event=>{
  const tab=event.target.closest('[data-hris-tab]');if(tab){document.querySelectorAll('#hris-view [data-hris-tab]').forEach(button=>button.classList.toggle('active',button===tab));document.querySelector('.employee-directory').hidden=tab.dataset.hrisTab!=='employee';document.querySelectorAll('#hris-view [data-hris-panel]').forEach(panel=>panel.hidden=panel.dataset.hrisPanel!==tab.dataset.hrisTab);return;}
  if(event.target.closest('[data-finalize-attendance]')){const from=document.getElementById('tmis-from').value,to=document.getElementById('tmis-to').value;if(!from||!to||from>to){showToast('Choose a valid start and end date.');return;}const entries=readStored('hireflowTmisAttendance',[]);entries.forEach(item=>{if(item.date>=from&&item.date<=to)item.finalized=true;});saveStored('hireflowTmisAttendance',entries);renderHris();document.querySelector('[data-hris-tab="tmis"]')?.click();showToast('Attendance period finalized for payroll review.');}
  const slip=event.target.closest('[data-download-payslip]');if(slip){const record=readStored('hireflowPayrollHistory',[]).find(item=>item.id===slip.dataset.downloadPayslip);if(record)downloadText(`payslip-${record.period}-${record.employeeName.replace(/[^a-z0-9]+/gi,'-')}.csv`,[['Employee',record.employeeName],['Period',record.period],['Basic pay',record.basic],['Allowances',record.allowances],['Gross pay',record.gross],['SSS employee share',record.sss],['PhilHealth employee share',record.philhealth],['Pag-IBIG employee share',record.pagibig],['Other deductions',record.otherDeductions],['Net pay',record.net]].map(row=>row.join(',')).join('\n'));}
  if(event.target.closest('[data-download-payroll-report]')){const rows=readStored('hireflowPayrollHistory',[]);downloadText('payroll-report.csv',[['Employee','Period','Gross','Deductions','Net'],...rows.map(item=>[item.employeeName,item.period,item.gross,item.deductions,item.net])].map(row=>row.map(value=>`"${String(value).replace(/"/g,'""')}"`).join(',')).join('\n'));}
});
document.getElementById('hris-view').addEventListener('submit',event=>{
  if(event.target.id==='tmis-form'){event.preventDefault();const data=new FormData(event.target),entries=readStored('hireflowTmisAttendance',[]),existing=entries.find(item=>item.employeeId===data.get('employeeId')&&item.date===data.get('date'));const record={employeeId:data.get('employeeId'),date:data.get('date'),timeIn:data.get('timeIn'),timeOut:data.get('timeOut'),notes:String(data.get('notes')||'').trim(),finalized:false};if(existing)Object.assign(existing,record);else entries.unshift(record);saveStored('hireflowTmisAttendance',entries);renderHris();document.querySelector('[data-hris-tab="tmis"]')?.click();showToast('Attendance saved.');}
  if(event.target.id==='payroll-form'){event.preventDefault();const data=new FormData(event.target),employee=readEmployees().find(item=>item.id===data.get('employeeId')),basic=Number(data.get('basic')||0),allowances=Number(data.get('allowances')||0),sss=Math.min(basic,35000)*.05,philhealth=basic*.025,pagibig=Math.min(basic*.02,200),otherDeductions=Number(data.get('otherDeductions')||0),gross=basic+allowances,deductions=sss+philhealth+pagibig+otherDeductions,rows=readStored('hireflowPayrollHistory',[]);rows.unshift({id:`pay-${Date.now()}`,employeeName:employee?.name||'Employee',period:data.get('period'),basic,allowances,gross,sss,philhealth,pagibig,otherDeductions,deductions,net:gross-deductions});saveStored('hireflowPayrollHistory',rows);renderHris();document.querySelector('[data-hris-tab="payroll"]')?.click();showToast('Illustrative payslip saved.');}
});
function downloadText(filename,text){const link=document.createElement('a');link.href=URL.createObjectURL(new Blob([text],{type:'text/csv;charset=utf-8'}));link.download=filename;link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);}
function renderEmployeeDetail(employee,tab){
  const content=document.getElementById('employee-detail-content');
  const buttons=`<div class="employee-detail-tabs"><button type="button" data-employee-detail="statutory" data-employee-id="${escapeHTML(employee.id)}">Statutory</button><button type="button" data-employee-detail="contract" data-employee-id="${escapeHTML(employee.id)}">Contract</button><button type="button" data-employee-detail="leave" data-employee-id="${escapeHTML(employee.id)}">Leave credits</button></div>`;
  let body='';
  if(tab==='statutory') body=`<h3>Statutory information</h3><dl class="employee-data-list">${[['PAG-IBIG No.',employee.statutory?.pagibig],['SSS',employee.statutory?.sss],['PhilHealth',employee.statutory?.philhealth],['TIN',employee.statutory?.tin],['HMO No.',employee.statutory?.hmo]].map(([label,value])=>`<div><dt>${label}</dt><dd>${escapeHTML(value||'Not provided')}</dd></div>`).join('')}</dl><p class="teacher-privacy-note">All statutory values are fictional sample data.</p>`;
  if(tab==='contract') body=`<h3>Contract &amp; terms</h3><p><strong>Current monthly salary:</strong> $${Number(employee.salary||0).toLocaleString()}</p><p>${escapeHTML(employee.contractTerms||'No terms recorded.')}</p>${employee.contractFileName?`<p><a class="employee-contract-link" href="${employee.contractData||'#'}" ${employee.contractData?'download="'+escapeHTML(employee.contractFileName)+'"':''}>Contract file: ${escapeHTML(employee.contractFileName)}</a></p>`:'<p>No contract file uploaded.</p>'}<h3>Contract history for ${escapeHTML(employee.position)}</h3><div class="teacher-table-wrap"><table class="teacher-table"><thead><tr><th>Effective date</th><th>Position</th><th>Monthly salary</th><th>Terms</th></tr></thead><tbody>${(employee.contractHistory||[]).map(item=>`<tr><td>${escapeHTML(item.date||'')}</td><td>${escapeHTML(item.position||employee.position)}</td><td>$${Number(item.salary||0).toLocaleString()}</td><td>${escapeHTML(item.terms||'')}</td></tr>`).join('')||'<tr><td colspan="4">No contract history.</td></tr>'}</tbody></table></div>`;
  if(tab==='leave') body=`<h3>Leave credit balance</h3><div class="leave-balance-row"><div><strong>${escapeHTML(employee.leaveBalance?.vacation??0)}</strong><span>Vacation days</span></div><div><strong>${escapeHTML(employee.leaveBalance?.sick??0)}</strong><span>Sick days</span></div><div><strong>${escapeHTML(employee.leaveBalance?.personal??0)}</strong><span>Personal days</span></div></div><h3>Rendered leave</h3><div class="teacher-table-wrap"><table class="teacher-table"><thead><tr><th>When</th><th>Reason for leave</th><th>Days</th><th>Status</th></tr></thead><tbody>${(employee.leaves||[]).map(item=>`<tr><td>${escapeHTML(item.when)}</td><td>${escapeHTML(item.reason)}</td><td>${escapeHTML(item.days)}</td><td>${escapeHTML(item.status)}</td></tr>`).join('')||'<tr><td colspan="4" class="teacher-empty">No leave records.</td></tr>'}</tbody></table></div><form class="employee-leave-form" id="employee-leave-form" data-employee-id="${escapeHTML(employee.id)}"><h4>Add rendered leave</h4><div class="form-row"><label class="form-field">When<input name="when" type="date" required></label><label class="form-field">Reason<input name="reason" required maxlength="140"></label></div><div class="form-row"><label class="form-field">Days<input name="days" type="number" min="0.5" step="0.5" required></label><label class="form-field">Status<select name="status"><option>Approved</option><option>Rejected</option></select></label></div><button class="primary-button" type="submit">Save leave record</button></form>`;
  content.innerHTML=`<div class="employee-detail-heading"><img src="${employee.portrait}" alt=""><div><p class="eyebrow">${escapeHTML(employee.department)}</p><h2>${escapeHTML(employee.name)}</h2><p>${escapeHTML(employee.position)} · ${escapeHTML(employee.status)}</p></div></div><p><strong>Address:</strong> ${escapeHTML(employee.address)} · <strong>Birthday:</strong> ${escapeHTML(employee.birthday)} · <strong>Date hired:</strong> ${escapeHTML(employee.dateHired)}</p>${buttons}${body}`;
  document.getElementById('employee-detail').hidden=false;
}
function openEmployeeEditor(employee=null){
  const backdrop=document.getElementById('employee-editor'), form=document.getElementById('employee-form');
  form.reset(); form.elements.id.value=employee?.id||'';
  document.getElementById('employee-editor-title').textContent=employee?'Edit Employee Profile':'Add Employee Profile';
  if(employee){
    for(const field of ['name','position','department','status','address','birthday','dateHired','salary','contractTerms']) form.elements[field].value=employee[field]??'';
    for(const field of ['pagibig','sss','philhealth','tin','hmo']) form.elements[field].value=employee.statutory?.[field]||'';
    for(const field of ['vacation','sick','personal']) form.elements[field].value=employee.leaveBalance?.[field]??0;
  }else{form.elements.salary.value=40000;form.elements.contractTerms.value='Full-time employment. Terms and conditions are described in the attached fictional contract.';form.elements.vacation.value=10;form.elements.sick.value=5;form.elements.personal.value=3;}
  backdrop.hidden=false;
}
const EMAIL_CAMPAIGNS_KEY='hireflowEmailCampaignDrafts';
function renderEmailMarketing(){
  const campaigns=readStored(EMAIL_CAMPAIGNS_KEY,[]);
  const items=campaigns.map(item=>`<article class="email-campaign-card"><div><p class="eyebrow">${escapeHTML(item.status||'DRAFT')} · ${escapeHTML(formattedDate(item.createdAt))}</p><h2>${escapeHTML(item.subject)}</h2><p>${escapeHTML(item.audience)} · ${escapeHTML(item.recipients||'0')} recipients</p><small>${escapeHTML(item.body)}</small></div><button type="button" class="review-button" data-email-delete="${escapeHTML(item.id)}">Delete draft</button></article>`).join('');
  document.getElementById('emailmarketing-view').innerHTML=`<section class="teacher-dashboard"><div class="teacher-dashboard-head"><div><p class="eyebrow">EMAIL MARKETING</p><h1>Email Marketing Tool</h1><p>Prepare and save fictional campaign drafts for your recruiting or class communications.</p></div></div><form class="email-campaign-form" id="email-campaign-form"><label class="form-field">Campaign name<input name="name" required maxlength="100" placeholder="e.g. New graduate opportunities"></label><div class="form-row"><label class="form-field">Subject line<input name="subject" required maxlength="160" placeholder="Your next opportunity starts here"></label><label class="form-field">Audience<select name="audience"><option>All candidates</option><option>Engineering</option><option>Design</option><option>Marketing</option><option>People &amp; HR</option><option>International talent</option></select></label></div><label class="form-field">Email content<textarea name="body" rows="7" required maxlength="4000" placeholder="Write your campaign message..."></textarea></label><label class="form-field">Estimated recipients<input name="recipients" type="number" min="0" value="0"></label><button class="primary-button" type="submit">Save campaign draft</button><p class="teacher-privacy-note">Drafts are stored in this browser. This demo does not send email.</p></form><h2 class="directory-title">Saved campaigns</h2><div class="email-campaign-list">${items||'<div class="quiz-empty"><h2>No saved campaigns</h2><p>Campaign drafts you create will appear here.</p></div>'}</div></section>`;
  addFullscreenButton('emailmarketing-view');
}
function renderLearning(){
  const account = getCurrentAccount();
  const resources = readStored(LEARNING_KEY, []);
  const cards = resources.map(resource => { const complete = (resource.completedEmails || []).includes(account.email); return `<article class="learning-resource"><div><p class="eyebrow">${escapeHTML(resource.category || 'LEARNING RESOURCE')}</p><h2>${escapeHTML(resource.title)}</h2><p>${escapeHTML(resource.description)}</p><small>Shared by ${escapeHTML(resource.authorName || 'Teacher')}${account.role === 'teacher' ? ` · ${(resource.completedEmails || []).length} completed` : ''}</small></div><div class="learning-actions">${account.role === 'student' ? `<button type="button" class="${complete ? 'quiz-text-button' : 'primary-button'}" data-learning-complete="${escapeHTML(resource.id)}" ${complete ? 'disabled' : ''}>${complete ? 'Completed' : 'Mark complete'}</button>` : ''}${account.role === 'teacher' && resource.authorEmail === account.email ? `<button type="button" class="quiz-text-button" data-learning-delete="${escapeHTML(resource.id)}">Delete</button>` : ''}</div></article>`; }).join('');
  document.getElementById('learning-view').innerHTML = `<section class="teacher-dashboard"><div class="teacher-dashboard-head"><div><p class="eyebrow">LEARNING &amp; DEVELOPMENT</p><h1>Class learning hub</h1><p>${account.role === 'teacher' ? 'Share learning activities and follow student completion.' : 'Explore learning activities shared by your teacher and track your progress.'}</p></div></div>${account.role === 'teacher' ? `<form class="learning-create-form" id="learning-create-form"><h2>Share a learning activity</h2><label class="form-field">Title<input name="title" required maxlength="100" placeholder="e.g. Interview preparation"></label><div class="form-row"><label class="form-field">Category<input name="category" maxlength="50" placeholder="e.g. Career skills"></label><label class="form-field">Instructions or resource details<input name="description" required maxlength="500" placeholder="Describe the activity"></label></div><button class="primary-button" type="submit">Share with students</button></form>` : ''}<div class="learning-resource-list">${cards || '<div class="quiz-empty"><h2>No learning activities yet</h2><p>Your teacher’s shared activities will appear here.</p></div>'}</div></section>`;
}
function storedOverseasRoles(){
  const found=[];const visit=value=>{if(Array.isArray(value)){value.forEach(visit);return;}if(value&&typeof value==='object'){if(value.joNumber)found.push(value);Object.values(value).forEach(child=>{if(child&&typeof child==='object')visit(child);});}};
  for(let index=0;index<localStorage.length;index++){try{visit(JSON.parse(localStorage.getItem(localStorage.key(index))||'null'));}catch{}}
  return [...new Map(found.map(job=>[job.id||job.joNumber,job])).values()];
}
function syncOverseasDashboard(){
  const body=document.getElementById('overseas-dashboard-rows');if(!body)return;const jobs=storedOverseasRoles();
  if(!jobs.length){body.innerHTML='<tr><td colspan="5" class="teacher-empty">No overseas roles with approved Job Order Numbers yet.</td></tr>';return;}
  const appLists=[];for(let index=0;index<localStorage.length;index++){try{const value=JSON.parse(localStorage.getItem(localStorage.key(index))||'null');if(Array.isArray(value))appLists.push(...value);}catch{}}
  body.innerHTML=jobs.map(job=>{const expired=job.expiresAt&&new Date(job.expiresAt)<new Date(),apps=appLists.filter(app=>app.overseasJobId===job.id||app.jobId===job.id||app.joNumber===job.joNumber),fileLinks=apps.map(app=>{const name=app.studentName||app.name||'Applicant';const c=candidates.find(item=>item.name===name);return c?`<button class="review-button" type="button" data-ats-profile="${escapeHTML(c.name)}">View / download ${escapeHTML(c.name)}</button>`:`<span>${escapeHTML(name)}</span>`;}).join(' ')||'—';return `<tr><td>${escapeHTML(job.joNumber)}</td><td>${escapeHTML(job.title||'Role')} · ${escapeHTML(job.location||'')}</td><td><span class="ats-decision ${expired?'rejected':'accepted'}">${expired?'Expired':`Active until ${escapeHTML(job.expiresAt?new Date(job.expiresAt).toLocaleDateString():'—')}`}</span></td><td>${apps.length} applicant${apps.length===1?'':'s'}</td><td>${fileLinks}</td></tr>`;}).join('');
}
document.getElementById('overseas-dashboard-rows').addEventListener('click',event=>{const button=event.target.closest('[data-ats-profile]');if(button){const candidate=candidates.find(item=>item.name===button.dataset.atsProfile);if(candidate)openResume(candidate);}});
document.addEventListener('submit',event=>{
  if(event.target.id!=='overseas-job-form')return;
  const data=new FormData(event.target),title=String(data.get('title')||'').trim().toLowerCase(),location=String(data.get('location')||'').trim().toLowerCase();
  const orders=[['JO-BHR-001',/cleaner/,/bahrain/],['JO-UAE-002',/waitress/,/uae|united arab emirates/],['JO-TWN-003',/factory *worker/,/taiwan/],['JO-TWN-004',/teacher/,/taiwan/],['JO-KSA-005',/domestic *helper/,/ksa|saudi/]];
  const match=orders.find(([,role,country])=>role.test(title)&&country.test(location));
  if(!match||data.get('joNumber')!==match[0]){event.preventDefault();event.stopImmediatePropagation();showToast('This role and destination must match an existing Job Order Number.');return;}
  const months=Math.min(36,Math.max(1,Number(data.get('visibilityMonths')||1))),expires=new Date();expires.setMonth(expires.getMonth()+months);event.target.elements.expiresAt.value=expires.toISOString();setTimeout(syncOverseasDashboard,250);
},true);
document.getElementById('ats-view').addEventListener('submit',event=>{
  if(event.target.id!=='ats-project-form')return;event.preventDefault();const name=new FormData(event.target).get('name').trim(),projects=readStored('hireflowAtsProjects',[]);
  if(projects.some(project=>project.name.toLowerCase()===name.toLowerCase())){showToast('A project with that name already exists.');return;}
  projects.push({id:`project-${Date.now()}`,name});if(saveStored('hireflowAtsProjects',projects)){renderAtsDashboard();showToast('Project created.');}
});
document.getElementById('ats-view').addEventListener('click',event=>{
  const profile=event.target.closest('[data-ats-profile]');if(profile){const candidate=candidates.find(item=>item.name===profile.dataset.atsProfile);if(candidate)openResume(candidate);}
  const project=event.target.closest('[data-project-view]');if(project){const select=document.getElementById('ats-project-filter');if(select){select.value=project.dataset.projectView;select.dispatchEvent(new Event('change'));document.getElementById('ats-applicant-search').value='';document.querySelector('#ats-view .teacher-table-wrap:nth-of-type(1)')?.scrollIntoView({behavior:'smooth',block:'center'});}}
});
document.getElementById('ats-view').addEventListener('change', event => {
  const applicationProject=event.target.closest('[data-application-project]');
  if(applicationProject){const apps=readStored(APPLICATIONS_KEY,[]),app=apps.find(item=>item.id===applicationProject.dataset.applicationProject);if(app){app.projectId=applicationProject.value;if(saveStored(APPLICATIONS_KEY,apps))renderAtsDashboard();}return;}
  const project=event.target.closest('[data-ats-project]');
  if(project){const records=readAts(),name=project.dataset.atsProject;records[name]={...(records[name]||{}),projectId:project.value,updatedAt:new Date().toISOString()};if(saveStored(ATS_KEY,records))renderAtsDashboard();return;}
  const applicationStatus = event.target.closest('[data-application-status]');
  if(applicationStatus && getCurrentAccount().role === 'teacher'){
    const applications = readStored(APPLICATIONS_KEY, []);
    const application = applications.find(item => item.id === applicationStatus.dataset.applicationStatus);
    if(application){ application.status = applicationStatus.value; application.updatedAt = new Date().toISOString(); if(saveStored(APPLICATIONS_KEY, applications)){ renderAtsDashboard(); showToast(`Applicant marked ${application.status.toLowerCase()}.`); } }
    return;
  }
  const status = event.target.closest('[data-ats-status]');
  const vacancy = event.target.closest('[data-ats-vacancy]');
  if(!status && !vacancy) return;
  const name = (status || vacancy).dataset.atsStatus || (status || vacancy).dataset.atsVacancy;
  const records = readAts();
  records[name] = {...(records[name] || {}), ...(status ? {status:status.value} : {vacancyId:vacancy.value}), updatedAt:new Date().toISOString()};
  if(saveStored(ATS_KEY, records)){ renderAtsDashboard(); renderVacancies(); showToast(status ? `Applicant marked ${status.value.toLowerCase()}.` : 'Applicant linked to Job Board vacancy.'); }
});
document.getElementById('hris-view').addEventListener('change',event=>{if(event.target.id==='employee-department-filter'){document.querySelectorAll('#hris-view [data-employee-department]').forEach(card=>card.hidden=!!event.target.value&&card.dataset.employeeDepartment!==event.target.value);}});
document.getElementById('hris-view').addEventListener('submit', event => {
  if(event.target.id==='employee-form'){
    event.preventDefault();
    const form=event.target, data=new FormData(form), employees=readEmployees(), id=String(data.get('id')||''), old=employees.find(person=>person.id===id);
    const portraitFile=data.get('portrait'), contractFile=data.get('contractFile');
    const saveEmployee=(portraitData=old?.portrait||makePortrait(String(data.get('name')||'Employee'),employees.length),contractData=old?.contractData||'')=>{
      const employee={...(old||{}),id:id||`employee-${Date.now()}`,name:String(data.get('name')||'').trim(),position:String(data.get('position')||'').trim(),department:String(data.get('department')||'').trim(),status:String(data.get('status')||'Regular'),address:String(data.get('address')||'').trim(),birthday:String(data.get('birthday')||''),dateHired:String(data.get('dateHired')||''),portrait:portraitData,statutory:{pagibig:String(data.get('pagibig')||'').trim(),sss:String(data.get('sss')||'').trim(),philhealth:String(data.get('philhealth')||'').trim(),tin:String(data.get('tin')||'').trim(),hmo:String(data.get('hmo')||'').trim()},salary:Number(data.get('salary')||0),contractTerms:String(data.get('contractTerms')||'').trim(),contractFileName:contractFile?.name||old?.contractFileName||'',contractData,leaveBalance:{vacation:Number(data.get('vacation')||0),sick:Number(data.get('sick')||0),personal:Number(data.get('personal')||0)},leaves:old?.leaves||[],contractHistory:old?.contractHistory||[]};
      const changed=old&&(Number(old.salary)!==employee.salary||old.contractTerms!==employee.contractTerms||old.position!==employee.position||((contractFile?.name||'')&&contractFile.name!==old.contractFileName));
      if(changed) employee.contractHistory.unshift({date:new Date().toISOString().slice(0,10),position:old.position,salary:old.salary,terms:old.contractTerms||'Previous contract'});
      if(!old||changed||!employee.contractHistory.length) employee.contractHistory.unshift({date:employee.dateHired,position:employee.position,salary:employee.salary,terms:employee.contractTerms});
      const index=employees.findIndex(person=>person.id===employee.id); if(index<0) employees.unshift(employee); else employees[index]=employee;
      if(saveStored(EMPLOYEES_KEY,employees)){document.getElementById('employee-editor').hidden=true;renderHris();showToast(old?'Employee profile saved.':'Employee profile added.');}
    };
    const readFile=(file,callback)=>{if(!file||!file.name)return callback('');if(file.size>900000){showToast('Please choose a file smaller than 900 KB for browser storage.');return;}const reader=new FileReader();reader.onload=()=>callback(String(reader.result));reader.onerror=()=>showToast('Could not read the selected file.');reader.readAsDataURL(file);};
    readFile(portraitFile,portraitData=>readFile(contractFile,contractData=>saveEmployee(portraitData||old?.portrait||makePortrait(String(data.get('name')||'Employee'),employees.length),contractData||old?.contractData||'')));
    return;
  }
  if(event.target.id==='employee-leave-form'){
    event.preventDefault();const form=event.target,data=new FormData(form),employees=readEmployees(),employee=employees.find(person=>person.id===form.dataset.employeeId);if(!employee)return;
    employee.leaves=employee.leaves||[];employee.leaves.unshift({when:String(data.get('when')),reason:String(data.get('reason')).trim(),days:Number(data.get('days')),status:String(data.get('status'))});
    if(saveStored(EMPLOYEES_KEY,employees)){renderEmployeeDetail(employee,'leave');showToast('Leave record saved.');}return;
  }
});
document.getElementById('hris-view').addEventListener('click',event=>{
  if(event.target.closest('[data-employee-add]')){openEmployeeEditor();return;}
  if(event.target.closest('[data-employee-close]')){event.target.closest('.employee-modal-backdrop').hidden=true;return;}
  const edit=event.target.closest('[data-employee-edit]');if(edit){openEmployeeEditor(readEmployees().find(person=>person.id===edit.dataset.employeeEdit));return;}
  const remove=event.target.closest('[data-employee-delete]');if(remove){const employees=readEmployees().filter(person=>person.id!==remove.dataset.employeeDelete);if(saveStored(EMPLOYEES_KEY,employees)){renderHris();showToast('Employee profile deleted.');}return;}
  const detail=event.target.closest('[data-employee-detail]');if(detail){const employee=readEmployees().find(person=>person.id===detail.dataset.employeeId);if(employee)renderEmployeeDetail(employee,detail.dataset.employeeDetail);}
});
document.getElementById('hris-view').addEventListener('keydown',event=>{if(event.key==='Escape')document.querySelectorAll('#hris-view .employee-modal-backdrop:not([hidden])').forEach(modal=>modal.hidden=true);});
document.getElementById('emailmarketing-view').addEventListener('submit',event=>{
  if(event.target.id!=='email-campaign-form')return;event.preventDefault();const data=new FormData(event.target),campaigns=readStored(EMAIL_CAMPAIGNS_KEY,[]);
  campaigns.unshift({id:`campaign-${Date.now()}`,name:String(data.get('name')).trim(),subject:String(data.get('subject')).trim(),audience:String(data.get('audience')),body:String(data.get('body')).trim(),recipients:Number(data.get('recipients')||0),status:'Draft',createdAt:new Date().toISOString()});
  if(saveStored(EMAIL_CAMPAIGNS_KEY,campaigns)){renderEmailMarketing();showToast('Campaign draft saved.');}
});
document.getElementById('emailmarketing-view').addEventListener('click',event=>{
  const button=event.target.closest('[data-email-delete]');if(!button)return;const remaining=readStored(EMAIL_CAMPAIGNS_KEY,[]).filter(item=>item.id!==button.dataset.emailDelete);if(saveStored(EMAIL_CAMPAIGNS_KEY,remaining)){renderEmailMarketing();showToast('Campaign draft deleted.');}
});
document.getElementById('learning-view').addEventListener('submit', event => {
  if(event.target.id !== 'learning-create-form' || getCurrentAccount().role !== 'teacher') return;
  event.preventDefault();
  const data = new FormData(event.target);
  const resources = readStored(LEARNING_KEY, []);
  resources.unshift({id:`learning-${Date.now()}`,title:String(data.get('title') || '').trim(),category:String(data.get('category') || '').trim(),description:String(data.get('description') || '').trim(),authorEmail:getCurrentAccount().email,authorName:getCurrentAccount().name || 'Teacher',completedEmails:[],createdAt:new Date().toISOString()});
  if(saveStored(LEARNING_KEY, resources)){ renderLearning(); showToast('Learning activity shared.'); }
});
for(const viewId of ['learning-view']) document.getElementById(viewId).addEventListener('click', event => {
  const complete = event.target.closest('[data-learning-complete]');
  const remove = event.target.closest('[data-learning-delete]');
  const resources = readStored(LEARNING_KEY, []);
  if(complete && getCurrentAccount().role === 'student'){
    const resource = resources.find(item => item.id === complete.dataset.learningComplete);
    if(resource){ resource.completedEmails = resource.completedEmails || []; if(!resource.completedEmails.includes(getCurrentAccount().email)) resource.completedEmails.push(getCurrentAccount().email); if(saveStored(LEARNING_KEY, resources)){ renderLearning(); showToast('Activity marked complete.'); } }
  }
  if(remove && getCurrentAccount().role === 'teacher'){
    const remaining = resources.filter(item => !(item.id === remove.dataset.learningDelete && item.authorEmail === getCurrentAccount().email));
    if(saveStored(LEARNING_KEY, remaining)){ renderLearning(); showToast('Learning activity deleted.'); }
  }
});
function renderAdminDashboard(){
  const accounts = getAccounts();
  const rows = accounts.map(account => `<tr data-admin-email="${escapeHTML(account.email)}"><td><input data-admin-name value="${escapeHTML(account.name || '')}" aria-label="Name"></td><td><input data-admin-email-value type="email" value="${escapeHTML(account.email)}" aria-label="Email"></td><td><select data-admin-role aria-label="Account type"><option value="student" ${account.role === 'student' ? 'selected' : ''}>Student</option><option value="teacher" ${account.role === 'teacher' ? 'selected' : ''}>Teacher</option><option value="admin" ${account.role === 'admin' ? 'selected' : ''}>Admin</option></select></td><td><input data-admin-password type="text" minlength="6" value="${escapeHTML(account.password || '')}" aria-label="Password"></td><td><input data-admin-subject value="${escapeHTML(account.subject || '')}" aria-label="Subject"></td><td><input data-admin-code value="${escapeHTML(account.teacherCode || '')}" aria-label="Teacher code"></td><td><button class="review-button" type="button" data-admin-save>Save</button> <button class="review-button" type="button" data-admin-delete>Delete</button></td></tr>`).join('');
  document.getElementById('accounts-view').innerHTML = `<section class="teacher-dashboard"><div class="teacher-dashboard-head"><div><p class="eyebrow">ADMINISTRATION</p><h1>Account management</h1><p>View and manage student, teacher, and administrator accounts in this browser.</p></div><strong>${accounts.length} account${accounts.length === 1 ? '' : 's'}</strong></div><p class="teacher-privacy-note">Changes are stored locally in this browser. Passwords in this educational demo are not secure.</p><div class="teacher-table-wrap"><table class="teacher-table"><thead><tr><th>Name</th><th>Email</th><th>Account type</th><th>Password</th><th>Subject</th><th>Teacher code</th><th>Actions</th></tr></thead><tbody>${rows || '<tr><td colspan="7" class="teacher-empty">No accounts created yet.</td></tr>'}</tbody></table></div></section>`;
}
document.getElementById('accounts-view').addEventListener('click', event => {
  const row = event.target.closest('[data-admin-email]');
  if(!row || getCurrentAccount().role !== 'admin') return;
  const accounts = getAccounts();
  const oldEmail = row.dataset.adminEmail;
  const index = accounts.findIndex(account => account.email === oldEmail);
  if(index < 0) return;
  if(event.target.closest('[data-admin-save]')){
    const updated = {...accounts[index],name:row.querySelector('[data-admin-name]').value.trim(),email:row.querySelector('[data-admin-email-value]').value.trim().toLowerCase(),role:row.querySelector('[data-admin-role]').value,password:row.querySelector('[data-admin-password]').value,subject:row.querySelector('[data-admin-subject]').value.trim(),teacherCode:row.querySelector('[data-admin-code]').value.trim()};
    if(!updated.name || !updated.email || updated.password.length < 6){ showToast('Enter a name, valid email, and password of at least 6 characters.'); return; }
    if(accounts.some((account,i) => i !== index && account.email === updated.email)){ showToast('That email is already in use.'); return; }
    if(updated.role === 'teacher' && accounts.some((account,i) => i !== index && account.role === 'teacher' && account.teacherCode?.toUpperCase() === updated.teacherCode.toUpperCase())){ showToast('That teacher code is already in use.'); return; }
    accounts[index] = updated;
    if(saveStored(AUTH_KEY, accounts)){
      if(localStorage.getItem(SESSION_KEY) === oldEmail) localStorage.setItem(SESSION_KEY, updated.email);
      renderAdminDashboard();
      showToast('Account updated.');
    }
  }
  if(event.target.closest('[data-admin-delete]')){
    accounts.splice(index,1);
    if(saveStored(AUTH_KEY, accounts)){
      if(localStorage.getItem(SESSION_KEY) === oldEmail) localStorage.removeItem(SESSION_KEY);
      renderAdminDashboard();
      showToast('Account deleted.');
    }
  }
});
function reviewKey(candidateName, email = getCurrentAccount().email){ return `${email}::${candidateName}`; }
function reviewRecords(){ return readStored(REVIEWS_KEY, {}); }
function auditEvent(record, action){
  const account = getCurrentAccount();
  record.audit = record.audit || [];
  record.audit.unshift({action, actor:account.name || 'Student', actorEmail:account.email, subject:account.subject || '', teacherCode:account.teacherCode || '', at:new Date().toISOString()});
}
function formattedDate(value){
  return new Date(value).toLocaleString([], {dateStyle:'medium',timeStyle:'short'});
}
function fictionalResumeDetails(candidate){
  const index = candidates.indexOf(candidate);
  const details = [
    ['Brooklyn, NY 11201','2002-04-18','23','Sketching, museums, and hiking','Inclusive design workshop · 2023','Google UX Design Certificate · 2024'],
    ['Seattle, WA 98105','2001-09-07','24','Open-source projects, cycling, and photography','Accessible web development bootcamp · 2023','freeCodeCamp Responsive Web Design · 2024'],
    ['Brooklyn, NY 11215','2002-01-26','24','Community events, cooking, and travel','Digital campaign strategy training · 2023','Google Analytics Certification · 2024'],
    ['Chicago, IL 60614','2003-06-11','22','Podcasts, reading, and volunteering','Human-centered research methods · 2023','UX Research Fundamentals · 2024'],
    ['Austin, TX 78701','2002-03-02','24','Gardening, yoga, and live music','People operations foundations · 2023','SHRM People Manager Qualification · 2024'],
    ['Chicago, IL 60604','2003-08-15','22','Basketball, data puzzles, and cooking','Business intelligence workshop · 2023','Microsoft Excel Associate · 2024'],
    ['San Jose, CA 95112','2001-12-04','24','Robotics, hiking, and mentoring','Cloud engineering fundamentals · 2023','AWS Cloud Practitioner · 2024'],
    ['Portland, OR 97201','2002-05-21','23','Illustration, gardening, and zines','Brand identity studio · 2023','Adobe Certified Professional · 2024'],
    ['Atlanta, GA 30303','2003-10-09','22','Book clubs, community service, and dance','Inclusive hiring workshop · 2023','Talent Acquisition Specialist · 2024'],
    ['Denver, CO 80202','2002-02-13','24','Trail running, music, and film','Email marketing and analytics training · 2023','HubSpot Email Marketing Certification · 2024'],
    ['Boston, MA 02115','2001-07-19','24','Board games, volunteering, and cooking','Process improvement fundamentals · 2023','Tableau Desktop Specialist · 2024'],
    ['Raleigh, NC 27606','2002-11-30','23','Gaming, electronics, and soccer','Software quality assurance bootcamp · 2023','ISTQB Foundation Level · 2024']
  ][Math.max(0,index) % 12];
  const birthDate = new Date(`${details[1]}T00:00:00`);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear() - (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);
  const faces = ['#f0c6a5','#d9a17b','#e8b994','#c88968','#f2d0ad','#ad7557'];
  const skin = faces[Math.max(0,index) % faces.length];
  const portrait = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 180"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#fde9f3"/><stop offset="1" stop-color="#e9dff6"/></linearGradient></defs><rect width="160" height="180" rx="20" fill="url(#bg)"/><path d="M22 180c5-38 26-56 58-56s53 18 58 56" fill="#8c5b83"/><path d="M43 69c0-32 15-49 38-49 26 0 39 20 37 52l-6 27H49z" fill="#382b31"/><ellipse cx="80" cy="77" rx="32" ry="39" fill="${skin}"/><path d="M47 67c2-32 17-45 36-45 19 0 33 11 37 37-16-2-28-11-36-21-9 14-21 22-37 29" fill="#382b31"/><circle cx="68" cy="77" r="2.5" fill="#34272b"/><circle cx="93" cy="77" r="2.5" fill="#34272b"/><path d="M72 96q9 7 18 0" fill="none" stroke="#985c58" stroke-width="2" stroke-linecap="round"/><path d="M63 68h12m9 0h12" stroke="#49343a" stroke-width="2" stroke-linecap="round"/></svg>`;
  return {address:details[0],birthday:details[1],age:String(age),hobbies:details[3],training:details[4],certificate:details[5],portrait:`data:image/svg+xml,${encodeURIComponent(portrait)}`};
}
function downloadResume(candidate){
  const details = fictionalResumeDetails(candidate);
  const content = `<!doctype html><html><meta charset="utf-8"><title>${escapeHTML(candidate.name)} — Resume</title><body><img src="${details.portrait}" alt="Fictional portrait" style="width:110px;height:120px;object-fit:cover;border-radius:12px"><h1>${escapeHTML(candidate.name)}</h1><p>${escapeHTML(candidate.role)} · ${escapeHTML(candidate.area)}</p><p>${escapeHTML(candidate.location)} · ${escapeHTML(details.address)}</p><p>Birthday: ${escapeHTML(details.birthday)} · Age: ${escapeHTML(details.age)}</p><h2>Profile</h2><p>${escapeHTML(candidate.summary)}</p><h2>Experience</h2>${candidate.work.map(item=>'<p>'+escapeHTML(item)+'</p>').join('')}<h2>Education</h2><p>${escapeHTML(candidate.education)}</p><h2>Training & certificates</h2><p>${escapeHTML(details.training)} · ${escapeHTML(details.certificate)}</p><h2>Hobbies</h2><p>${escapeHTML(details.hobbies)}</p><h2>Skills</h2><p>${candidate.skills.map(escapeHTML).join(', ')}</p></body></html>`;
  const url = URL.createObjectURL(new Blob([content],{type:'application/msword'}));
  const link = document.createElement('a'); link.href = url; link.download = `${candidate.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-resume.doc`; link.click(); URL.revokeObjectURL(url);
}
document.getElementById('download-resume').addEventListener('click', () => { if(activeCandidate) downloadResume(activeCandidate); });
function openResume(candidate){
  activeCandidate = candidate;
  const info = fictionalResumeDetails(candidate);
  const data = reviewRecords()[reviewKey(candidate.name)] || {status:'New',notes:[],audit:[]};
  document.getElementById('resume-modal-name').textContent = candidate.name;
  document.getElementById('resume-document-content').innerHTML = `<div class="resume-profile-head"><img class="resume-portrait" src="${info.portrait}" alt="Fictional illustrated portrait of ${escapeHTML(candidate.name)}"><div><h1>${escapeHTML(candidate.name)}</h1><p class="document-role">${escapeHTML(candidate.role)} · ${escapeHTML(candidate.area)}</p><p class="document-location">${escapeHTML(candidate.location)}</p></div></div><section><h3>Profile</h3><p>${escapeHTML(candidate.summary)}</p></section><section><h3>Personal details</h3><p><strong>Address:</strong> ${escapeHTML(info.address)}<br><strong>Birthday:</strong> ${escapeHTML(info.birthday)} · <strong>Age:</strong> ${escapeHTML(info.age)}</p></section><section><h3>Experience</h3>${candidate.work.map(item => `<p>${escapeHTML(item)}</p>`).join('')}</section><section><h3>Education</h3><p>${escapeHTML(candidate.education)}</p></section><section><h3>Training &amp; certificates</h3><p>${escapeHTML(info.training)}</p><p>${escapeHTML(info.certificate)}</p></section><section><h3>Hobbies &amp; interests</h3><p>${escapeHTML(info.hobbies)}</p></section><section><h3>Skills</h3><div class="document-skills">${candidate.skills.map(skill => `<span>${escapeHTML(skill)}</span>`).join('')}</div></section>`;
  document.getElementById('note-id').value = '';
  document.getElementById('note-text').value = '';
  document.getElementById('note-submit').textContent = 'Save note';
  renderCandidateReview(data);
  document.getElementById('resume-modal').hidden = false;
}
function renderCandidateReview(data){
  const sharedStatus = readAts()[activeCandidate?.name]?.status || data.status || 'New';
  document.getElementById('candidate-current-status').textContent = `Status: ${sharedStatus}`;
  document.querySelectorAll('.status-actions button').forEach(button => button.classList.toggle('selected', button.dataset.status === sharedStatus));
  const notes = data.notes || [];
  const audit = data.audit || [];
  const list = document.getElementById('audit-list');
  list.innerHTML = `<li class="note-entry"><div class="audit-entry-top"><strong>Notes (${notes.length})</strong></div>${notes.length ? notes.map(note => `<article class="saved-note"><p>${escapeHTML(note.text)}</p><div class="saved-note-meta">${escapeHTML(note.author || 'Student')} · ${formattedDate(note.updatedAt || note.createdAt)}</div><div class="note-actions"><button type="button" data-note-edit="${escapeHTML(note.id)}">Edit</button><button type="button" data-note-delete="${escapeHTML(note.id)}">Delete</button></div></article>`).join('') : '<p class="empty-note">No notes yet. Add feedback above.</p>'}</li>${audit.map(item => `<li class="audit-entry"><span class="audit-dot"></span><div><strong>${escapeHTML(item.action)}</strong><p>${escapeHTML(item.actor)} · ${formattedDate(item.at)}</p></div></li>`).join('')}`;
}
function closeModal(modal){ modal.hidden = true; }

const OVERSEAS_KEY='hireflowOverseasRecruiterJobs';
function readOverseasJobs(){
  const existing=readStored(OVERSEAS_KEY,null);if(Array.isArray(existing))return existing;
  const initial=overseasJobs.map((job,index)=>({...job,id:`overseas-${index+1}`,recruiterNotes:'Fictional listing. Review destination requirements and candidate eligibility during sourcing.',createdAt:new Date(Date.now()-index*86400000).toISOString(),status:'Open'}));
  saveStored(OVERSEAS_KEY,initial);return initial;
}
function renderOverseasJobs(){
  const list=document.getElementById('overseas-job-list');if(!list)return;
  const jobs=readOverseasJobs(), recruiter=['teacher','admin'].includes(getCurrentAccount().role);
  document.getElementById('overseas-job-count').textContent=jobs.length;
  list.innerHTML=jobs.map(job=>`<article class="vacancy-card overseas-vacancy"><div class="vacancy-card-head"><span class="vacancy-icon">✈</span><div><p class="eyebrow">${escapeHTML(job.category)} · ${escapeHTML(job.location)} · ${escapeHTML(job.status||'Open')}</p><h3>${escapeHTML(job.title)}</h3><strong>${escapeHTML(job.company)}</strong></div><span class="vacancy-type">${escapeHTML(job.type)}</span></div><p class="vacancy-meta">Compensation: ${escapeHTML(job.salary)} · Posted ${escapeHTML(formattedDate(job.createdAt))}</p><p class="vacancy-description">${escapeHTML(job.description)}</p><p class="recruiter-notes"><strong>Recruiter notes:</strong> ${escapeHTML(job.recruiterNotes||'No sourcing notes added.')}</p>${recruiter?`<div class="vacancy-actions"><button type="button" data-overseas-edit="${escapeHTML(job.id)}">Edit role</button><button type="button" data-overseas-delete="${escapeHTML(job.id)}">Delete role</button></div>`:'<div class="recruiter-listing-label">Recruiter listing · Sourcing and placement information</div>'}</article>`).join('')||'<div class="vacancy-empty"><h3>No overseas roles</h3><p>Post an international role to start recruiter sourcing.</p></div>';
}
function renderVacancies(){
  const vacancies = readStored(VACANCIES_KEY, []);
  const pipeline = readAts();
  const applications = readStored(APPLICATIONS_KEY, []);
  const account = getCurrentAccount();
  document.getElementById('vacancy-tab-count').textContent = vacancies.length;
  document.getElementById('vacancy-empty').hidden = vacancies.length > 0;
  document.getElementById('vacancy-list').innerHTML = vacancies.map(job => {
    const applicantCount = Object.values(pipeline).filter(item => item.vacancyId === job.id).length + applications.filter(item => item.vacancyId === job.id).length;
    const myApplication = applications.find(item => item.vacancyId === job.id && item.studentEmail === account.email);
    const actions = account.role === 'student' ? (myApplication ? `<span class="ats-decision ${myApplication.status === 'Accepted' ? 'accepted' : myApplication.status === 'Rejected' ? 'rejected' : ''}">Application: ${escapeHTML(myApplication.status || 'New')}</span>` : `<button type="button" class="primary-button" data-apply-vacancy="${escapeHTML(job.id)}">Apply</button>`) : `<button type="button" data-edit-vacancy="${escapeHTML(job.id)}">Edit position</button><button type="button" data-delete-vacancy="${escapeHTML(job.id)}">Delete</button>`;
    return `<article class="vacancy-card"><div class="vacancy-card-head"><span class="vacancy-icon">↗</span><div><p class="eyebrow">${escapeHTML(job.department)}</p><h3>${escapeHTML(job.title)}</h3></div><span class="vacancy-type">${escapeHTML(job.type)}</span></div><p class="vacancy-meta">⌖ ${escapeHTML(job.location)} <span>·</span> Posted ${formattedDate(job.createdAt)} · ${applicantCount} applicant${applicantCount === 1 ? '' : 's'} in ATS</p><p class="vacancy-description">${escapeHTML(job.description || 'No additional position details provided.')}</p><div class="vacancy-actions">${actions}</div></article>`;
  }).join('');
  renderAtsDashboard();
}
function showBoardPanel(name){
  document.querySelectorAll('.board-panel').forEach(panel => { panel.hidden = panel.id !== `${name}-panel`; panel.classList.toggle('active-board-panel', panel.id === `${name}-panel`); });
  document.querySelectorAll('.tool-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.boardPanel === name));
  if(name === 'vacancies') renderVacancies();
}
function openVacancyForm(job){
  const form = document.getElementById('vacancy-form');
  form.reset();
  document.getElementById('vacancy-id').value = job?.id || '';
  document.getElementById('vacancy-modal-title').textContent = job ? 'Edit vacancy' : 'Post a vacancy';
  document.getElementById('vacancy-submit').textContent = job ? 'Save changes' : 'Save vacancy';
  document.getElementById('vacancy-title').value = job?.title || '';
  document.getElementById('vacancy-department').value = job?.department || '';
  document.getElementById('vacancy-location').value = job?.location || '';
  document.getElementById('vacancy-type').value = job?.type || 'Full-time';
  document.getElementById('vacancy-description').value = job?.description || '';
  document.getElementById('vacancy-message').textContent = '';
  document.getElementById('vacancy-modal').hidden = false;
  document.getElementById('vacancy-title').focus();
}

document.querySelectorAll('.tool-tab').forEach(tab => tab.addEventListener('click', () => showBoardPanel(tab.dataset.boardPanel)));
document.querySelectorAll('[data-job-category]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.job-category-panel').forEach(panel => { panel.hidden = panel.id !== button.dataset.jobCategory; });
  document.querySelectorAll('.job-category-button').forEach(item => item.classList.toggle('active', item === button));
  if(button.dataset.jobCategory === 'overseas-jobs-panel') renderOverseasJobs();
}));
document.getElementById('overseas-job-list').addEventListener('click',event=>{
  if(!['teacher','admin'].includes(getCurrentAccount().role))return;
  const edit=event.target.closest('[data-overseas-edit]'),remove=event.target.closest('[data-overseas-delete]'),jobs=readOverseasJobs();
  if(edit){const job=jobs.find(item=>item.id===edit.dataset.overseasEdit),form=document.getElementById('overseas-job-form');if(!job)return;form.reset();for(const key of ['id','title','company','location','category','type','salary','description','recruiterNotes'])form.elements[key].value=job[key]||'';document.getElementById('overseas-form-title').textContent='Edit overseas role';document.getElementById('overseas-job-modal').hidden=false;return;}
  if(remove){const remaining=jobs.filter(item=>item.id!==remove.dataset.overseasDelete);if(saveStored(OVERSEAS_KEY,remaining)){renderOverseasJobs();showToast('Overseas role deleted.');}}
});
document.getElementById('open-overseas-form').addEventListener('click',()=>{if(!['teacher','admin'].includes(getCurrentAccount().role))return;const form=document.getElementById('overseas-job-form');form.reset();form.elements.id.value='';document.getElementById('overseas-form-title').textContent='Post overseas role';document.getElementById('overseas-job-modal').hidden=false;});
document.getElementById('overseas-job-form').addEventListener('submit',event=>{
  event.preventDefault();if(!['teacher','admin'].includes(getCurrentAccount().role))return;const data=new FormData(event.target),jobs=readOverseasJobs(),id=String(data.get('id')||''),old=jobs.find(item=>item.id===id),job={id:id||`overseas-${Date.now()}`,title:String(data.get('title')).trim(),company:String(data.get('company')).trim(),location:String(data.get('location')).trim(),category:String(data.get('category')).trim(),type:String(data.get('type')),salary:String(data.get('salary')).trim(),description:String(data.get('description')).trim(),recruiterNotes:String(data.get('recruiterNotes')||'').trim(),createdAt:old?.createdAt||new Date().toISOString(),status:old?.status||'Open'};
  const updated=old?jobs.map(item=>item.id===id?job:item):[job,...jobs];if(saveStored(OVERSEAS_KEY,updated)){closeModal(document.getElementById('overseas-job-modal'));renderOverseasJobs();showToast(old?'Overseas role updated.':'Overseas role posted.');}
});
document.querySelectorAll('#open-vacancy-form, [data-open-vacancy]').forEach(button => button.addEventListener('click', () => openVacancyForm()));
document.getElementById('vacancy-form').addEventListener('submit', event => {
  event.preventDefault();
  const vacancies = readStored(VACANCIES_KEY, []);
  const id = document.getElementById('vacancy-id').value;
  const old = vacancies.find(job => job.id === id);
  const job = {id:id || `vacancy-${Date.now()}`,title:document.getElementById('vacancy-title').value.trim(),department:document.getElementById('vacancy-department').value.trim(),location:document.getElementById('vacancy-location').value.trim(),type:document.getElementById('vacancy-type').value,description:document.getElementById('vacancy-description').value.trim(),createdAt:old?.createdAt || new Date().toISOString(),updatedAt:new Date().toISOString()};
  const updated = old ? vacancies.map(item => item.id === id ? job : item) : [job,...vacancies];
  if(saveStored(VACANCIES_KEY, updated)){ closeModal(document.getElementById('vacancy-modal')); renderVacancies(); showBoardPanel('vacancies'); showToast(old ? 'Vacancy updated.' : 'Vacancy saved.'); }
});
document.getElementById('vacancy-list').addEventListener('click', event => {
  const apply = event.target.closest('[data-apply-vacancy]');
  const edit = event.target.closest('[data-edit-vacancy]');
  const remove = event.target.closest('[data-delete-vacancy]');
  const vacancies = readStored(VACANCIES_KEY, []);
  if(apply && getCurrentAccount().role === 'student'){
    const account = getCurrentAccount();
    const applications = readStored(APPLICATIONS_KEY, []);
    if(!applications.some(item => item.vacancyId === apply.dataset.applyVacancy && item.studentEmail === account.email)){
      const job = vacancies.find(item => item.id === apply.dataset.applyVacancy);
      if(job){ applications.unshift({id:`application-${Date.now()}`,vacancyId:job.id,studentEmail:account.email,studentName:account.name || 'Student',status:'New',createdAt:new Date().toISOString()}); if(saveStored(APPLICATIONS_KEY, applications)){ renderVacancies(); showToast('Your application was submitted.'); } }
    }
  }
  if(edit){ const job = vacancies.find(item => item.id === edit.dataset.editVacancy); if(job) openVacancyForm(job); }
  if(remove){ const remaining = vacancies.filter(item => item.id !== remove.dataset.deleteVacancy); if(saveStored(VACANCIES_KEY, remaining)){ renderVacancies(); showToast('Vacancy deleted.'); } }
});
document.getElementById('note-form').addEventListener('submit', event => {
  event.preventDefault();
  if(!activeCandidate) return;
  const text = document.getElementById('note-text').value.trim();
  if(!text) return;
  const records = reviewRecords();
  const record = records[reviewKey(activeCandidate.name)] || {status:'New',notes:[],audit:[]};
  const editId = document.getElementById('note-id').value;
  const timestamp = new Date().toISOString();
  if(editId){
    const account = getCurrentAccount();
    record.notes = record.notes.map(note => note.id === editId ? {...note,text,author:getStudentName(),authorEmail:account.email,updatedAt:timestamp} : note);
    auditEvent(record, 'Edited a review note');
  }else{
    const account = getCurrentAccount();
    record.notes.unshift({id:`note-${Date.now()}`,text,author:getStudentName(),authorEmail:account.email,createdAt:timestamp});
    auditEvent(record, 'Added a review note');
  }
  records[reviewKey(activeCandidate.name)] = record;
  if(saveStored(REVIEWS_KEY, records)){ document.getElementById('note-id').value = ''; document.getElementById('note-text').value = ''; document.getElementById('note-submit').textContent = 'Save note'; renderCandidateReview(record); showToast('Review note saved.'); }
});
document.getElementById('audit-list').addEventListener('click', event => {
  if(!activeCandidate) return;
  const records = reviewRecords();
  const record = records[reviewKey(activeCandidate.name)] || {status:'New',notes:[],audit:[]};
  const edit = event.target.closest('[data-note-edit]');
  const remove = event.target.closest('[data-note-delete]');
  if(edit){ const note = record.notes.find(item => item.id === edit.dataset.noteEdit); if(note){ document.getElementById('note-id').value = note.id; document.getElementById('note-text').value = note.text; document.getElementById('note-submit').textContent = 'Save changes'; document.getElementById('note-text').focus(); } }
  if(remove){ record.notes = record.notes.filter(item => item.id !== remove.dataset.noteDelete); auditEvent(record, 'Deleted a review note'); records[reviewKey(activeCandidate.name)] = record; if(saveStored(REVIEWS_KEY, records)){ renderCandidateReview(record); showToast('Review note deleted.'); } }
});
document.querySelectorAll('.status-actions button').forEach(button => button.addEventListener('click', () => {
  if(!activeCandidate) return;
  const records = reviewRecords();
  const record = records[reviewKey(activeCandidate.name)] || {status:'New',notes:[],audit:[]};
  const pipeline = readAts();
  if((pipeline[activeCandidate.name]?.status || 'New') === button.dataset.status) return;
  record.status = button.dataset.status;
  auditEvent(record, `Changed candidate status to ${record.status}`);
  records[reviewKey(activeCandidate.name)] = record;
  pipeline[activeCandidate.name] = {...(pipeline[activeCandidate.name] || {}),status:record.status,updatedAt:new Date().toISOString()};
  if(saveStored(REVIEWS_KEY, records) && saveStored(ATS_KEY, pipeline)){ renderCandidateReview(record); renderAtsDashboard(); showToast(`Candidate marked ${record.status.toLowerCase()}.`); }
}));
document.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', () => closeModal(button.closest('.modal-backdrop'))));
document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.addEventListener('click', event => { if(event.target === backdrop) closeModal(backdrop); }));
document.addEventListener('keydown', event => { if(event.key === 'Escape') document.querySelectorAll('.modal-backdrop:not([hidden])').forEach(closeModal); });

const QUIZZES_KEY = 'hireflowLearningQuizzes';
const QUIZ_RESPONSES_KEY = 'hireflowLearningQuizResponses';
const quizWorkspace = document.getElementById('quiz-workspace');
let quizDraft = [];
let currentQuiz = null;
let activeResultsQuizId = null;
let quizTimeLimitMinutes = 0;
let quizAutoSubmit = true;
let quizAssignedStudents = [];
let quizTimerInterval = null;

function makeQuestion(){
  return {id:`question-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,title:'Untitled question',type:'multiple',required:true,points:1,options:[{id:`option-${Math.random().toString(36).slice(2,7)}`,text:'Option 1'},{id:`option-${Math.random().toString(36).slice(2,7)}`,text:'Option 2'}],correctAnswers:[],answerKey:''};
}
function readQuizzes(){
  const quizzes = readStored(QUIZZES_KEY, []);
  return Array.isArray(quizzes) ? quizzes : [];
}
function readQuizResponses(){
  const responses = readStored(QUIZ_RESPONSES_KEY, {});
  return responses && typeof responses === 'object' ? responses : {};
}
function submissionForStudent(quizId, email){
  return (readQuizResponses()[quizId] || []).find(submission => submission.email === email) || null;
}
function studentsForTeacher(account = getCurrentAccount()){
  return getAccounts().filter(student => student.role === 'student'
    && student.teacherCode?.toUpperCase() === account.teacherCode?.toUpperCase()
    && student.subject?.trim().toLowerCase() === account.subject?.trim().toLowerCase());
}
function renderQuizLibrary(){
  activeResultsQuizId = null;
  const account = getCurrentAccount();
  const availableQuizzes = readQuizzes().filter(quiz => account.role === 'teacher'
    ? quiz.authorEmail === account.email
    : account.role === 'student' && (Array.isArray(quiz.assignedStudentEmails)
      ? quiz.assignedStudentEmails.includes(account.email)
      : quiz.authorTeacherCode?.toUpperCase() === account.teacherCode?.toUpperCase() && quiz.subject?.trim().toLowerCase() === account.subject?.trim().toLowerCase()));
  const quizzes = availableQuizzes.sort((a,b) => (b.updatedAt || b.createdAt || '').localeCompare(a.updatedAt || a.createdAt || ''));
  quizWorkspace.innerHTML = `<div class="quiz-page-head"><div><p class="eyebrow">LEARNING WORKSPACE</p><h1>${account.role === 'teacher' ? 'Quiz Maker' : 'Quiz'}</h1><p>${account.role === 'teacher' ? 'Create class quizzes and review student scores.' : 'Complete quizzes assigned to your class.'}</p></div>${account.role === 'teacher' ? '<button class="primary-button" type="button" data-quiz-action="create">＋ Create a quiz</button>' : ''}</div><div class="quiz-library-filters"><label>Find a quiz<input type="search" data-quiz-filter placeholder="Search by quiz title"></label><label>Filter<select data-quiz-status-filter>${account.role === 'teacher' ? '<option value="all">All quizzes</option><option value="responses">Has responses</option><option value="no-responses">No responses</option>' : '<option value="all">All quizzes</option><option value="available">Not submitted</option><option value="submitted">Submitted</option>'}</select></label></div><div class="quiz-library" id="quiz-library">${quizzes.length ? quizzes.map(quiz => {
    const owner = quiz.authorEmail === account.email;
    const submissions = (readQuizResponses()[quiz.id] || []).length;
    const studentSubmission = account.role === 'student' ? submissionForStudent(quiz.id, account.email) : null;
    const studentStatus = studentSubmission ? `Submitted · ${studentSubmission.score} / ${studentSubmission.autoPoints} pts` : 'Not submitted';
    return `<article class="quiz-card" data-quiz-title="${escapeHTML(quiz.title.toLowerCase())}" data-quiz-submitted="${studentSubmission ? 'yes' : 'no'}" data-quiz-responses="${submissions > 0 ? 'yes' : 'no'}"><div class="quiz-card-mark">✓</div><div class="quiz-card-copy"><h2>${escapeHTML(quiz.title)}</h2><p>${escapeHTML(quiz.description || 'No description')}</p><span>${(quiz.questions || []).length} questions · Created ${escapeHTML(formattedDate(quiz.createdAt || quiz.updatedAt || new Date().toISOString()))} · ${owner ? `${submissions} submission${submissions === 1 ? '' : 's'} · Created by you` : `Created by ${escapeHTML(quiz.authorName || 'Teacher')}`}${account.role === 'student' ? ` · <strong class="quiz-status">${escapeHTML(studentStatus)}</strong>` : ''}</span></div><div class="quiz-card-actions">${account.role === 'student' && !studentSubmission ? `<button type="button" class="primary-button" data-quiz-action="take" data-quiz-id="${escapeHTML(quiz.id)}">Take quiz</button>` : ''}${owner && account.role === 'teacher' ? `<button type="button" data-quiz-action="results" data-quiz-id="${escapeHTML(quiz.id)}">Results</button><button type="button" data-quiz-action="edit" data-quiz-id="${escapeHTML(quiz.id)}">Edit</button><button type="button" data-quiz-action="delete" data-quiz-id="${escapeHTML(quiz.id)}">Delete</button>` : ''}</div></article>`;
  }).join('') : `<div class="quiz-empty"><span>✓</span><h2>${account.role === 'teacher' ? 'No quizzes yet' : 'No quizzes assigned yet'}</h2><p>${account.role === 'teacher' ? 'Create a quiz to assign it to students in your class.' : 'Your teacher’s quizzes will appear here when assigned to your class.'}</p>${account.role === 'teacher' ? '<button class="primary-button" type="button" data-quiz-action="create">Create your first quiz</button>' : ''}</div>`}</div>`;
}
function applyQuizLibraryFilters(){
  const query = quizWorkspace.querySelector('[data-quiz-filter]')?.value.trim().toLowerCase() || '';
  const filter = quizWorkspace.querySelector('[data-quiz-status-filter]')?.value || 'all';
  const teacher = getCurrentAccount().role === 'teacher';
  quizWorkspace.querySelectorAll('.quiz-card').forEach(card => {
    const titleMatch = card.dataset.quizTitle.includes(query);
    const statusMatch = filter === 'all' || (teacher ? filter === 'responses' ? card.dataset.quizResponses === 'yes' : card.dataset.quizResponses === 'no' : filter === 'submitted' ? card.dataset.quizSubmitted === 'yes' : card.dataset.quizSubmitted === 'no');
    card.hidden = !titleMatch || !statusMatch;
  });
}
quizWorkspace.addEventListener('input', event => { if(event.target.matches('[data-quiz-filter]')) applyQuizLibraryFilters(); });
quizWorkspace.addEventListener('change', event => { if(event.target.matches('[data-quiz-status-filter]')) applyQuizLibraryFilters(); });
function captureQuizDraft(){
  const timeLimit = quizWorkspace.querySelector('[name="quiz-time-limit"]');
  const autoSubmit = quizWorkspace.querySelector('[name="quiz-auto-submit"]');
  if(timeLimit) quizTimeLimitMinutes = Math.min(180, Math.max(0, Number(timeLimit.value) || 0));
  if(autoSubmit) quizAutoSubmit = autoSubmit.checked;
  quizDraft = [...quizWorkspace.querySelectorAll('.quiz-question-editor')].map(card => {
    const type = card.querySelector('[data-q-type]').value;
    const options = [...card.querySelectorAll('[data-option-row]')].map(row => ({id:row.dataset.optionRow,text:row.querySelector('[data-option-text]').value.trim()}));
    const correctAnswers = [...card.querySelectorAll('[data-correct]:checked')].map(input => input.value);
    return {id:card.dataset.questionId,title:card.querySelector('[data-q-title]').value.trim(),type,required:card.querySelector('[data-q-required]').checked,points:Math.min(100,Math.max(1,Number(card.querySelector('[data-q-points]').value) || 1)),options,correctAnswers,answerKey:card.querySelector('[data-answer-key]')?.value.trim() || ''};
  });
}
function renderQuizBuilder(quiz = null){
  if(!quiz){ quizTimeLimitMinutes = 0; quizAutoSubmit = true; }
  else if(Object.prototype.hasOwnProperty.call(quiz,'timeLimitMinutes')){
    quizTimeLimitMinutes = Number(quiz.timeLimitMinutes) || 0;
    quizAutoSubmit = quiz.autoSubmit !== false;
  }
  quizDraft = quiz ? (quiz.questions || []).map(question => ({...question,options:(question.options || []).map(option => typeof option === 'string' ? {id:`option-${Math.random().toString(36).slice(2,7)}`,text:option} : option),correctAnswers:question.correctAnswers || (question.correctAnswer ? [question.correctAnswer] : [])})) : [makeQuestion()];
  if(quiz && Object.prototype.hasOwnProperty.call(quiz,'assignedStudentEmails')) quizAssignedStudents = [...quiz.assignedStudentEmails];
  else if(quiz?.id) quizAssignedStudents = studentsForTeacher().map(student => student.email);
  else if(!quiz) quizAssignedStudents = [];
  const roster = studentsForTeacher();
  const choiceTypes = ['multiple','checkboxes','dropdown'];
  quizWorkspace.innerHTML = `<div class="quiz-page-head"><div><p class="eyebrow">QUIZ BUILDER</p><h1>${currentQuiz ? 'Edit quiz' : 'Create a quiz'}</h1><p>Choose question types, set correct answers, and assign points. Saved quizzes are assigned to students in your class.</p></div><button class="quiz-text-button" type="button" data-quiz-action="back">← All quizzes</button></div><form id="quiz-builder-form" class="quiz-builder-form"><section class="quiz-title-card"><label>Quiz title<input name="quiz-title" type="text" required maxlength="120" placeholder="Untitled quiz" value="${escapeHTML(quiz?.title || '')}"></label><label>Description <span class="optional-label">(optional)</span><textarea name="quiz-description" rows="2" maxlength="500" placeholder="Add instructions or context">${escapeHTML(quiz?.description || '')}</textarea></label><label>Teacher code<input type="text" value="${escapeHTML(getCurrentAccount().teacherCode || '')}" readonly></label><div class="quiz-settings-row"><label>Time limit in minutes <span class="optional-label">(0 = no timer)</span><input name="quiz-time-limit" type="number" min="0" max="180" value="${escapeHTML(quizTimeLimitMinutes)}"></label><label class="quiz-autosubmit-setting"><input name="quiz-auto-submit" type="checkbox" ${quizAutoSubmit ? 'checked' : ''}> Automatically submit when time is up</label></div></section><section class="quiz-title-card quiz-assignment-card"><h2>Assign to students</h2><p>${roster.length ? 'Tick the students who should receive this quiz.' : 'No student accounts match your teacher code and subject yet.'}</p><div class="quiz-student-roster">${roster.map(student => `<label><input type="checkbox" name="assigned-students" value="${escapeHTML(student.email)}" ${quizAssignedStudents.includes(student.email) ? 'checked' : ''}><span><strong>${escapeHTML(student.name || 'Student')}</strong><small>${escapeHTML(student.email)}</small></span></label>`).join('')}</div></section><div id="quiz-question-editors">${quizDraft.map((question,index) => {
    const choices = choiceTypes.includes(question.type);
    const multipleCorrect = question.type === 'checkboxes';
    const choiceMarkup = choices ? `<div class="quiz-options-editor"><div class="quiz-answer-hint">${multipleCorrect ? 'Select all correct answers' : 'Select the correct answer'}</div>${question.options.map(option => `<div class="quiz-option-editor" data-option-row="${escapeHTML(option.id)}"><input class="correct-control" type="${multipleCorrect ? 'checkbox' : 'radio'}" name="correct-${escapeHTML(question.id)}" data-correct value="${escapeHTML(option.id)}" ${question.correctAnswers.includes(option.id) ? 'checked' : ''} aria-label="Mark as correct answer"><input type="text" data-option-text value="${escapeHTML(option.text)}" maxlength="160" aria-label="Answer choice"><button type="button" class="remove-option" data-remove-option="${escapeHTML(option.id)}" aria-label="Remove choice">×</button></div>`).join('')}<button class="add-option-button" type="button" data-add-option>＋ Add option</button></div>` : question.type === 'short' ? `<label class="answer-key-field">Correct answer <span class="optional-label">(leave blank for manual review)</span><input type="text" data-answer-key value="${escapeHTML(question.answerKey || '')}" maxlength="500" placeholder="Enter the expected answer"></label>` : '<p class="manual-review-hint">Paragraph responses are saved for manual review and are not automatically scored.</p>';
    return `<article class="quiz-question-editor" data-question-id="${escapeHTML(question.id)}"><div class="quiz-question-top"><span class="question-number">Question ${index + 1}</span><button type="button" class="remove-question" data-remove-question aria-label="Remove question">Remove</button></div><textarea class="question-title-input" data-q-title rows="2" maxlength="500" required aria-label="Question text">${escapeHTML(question.title)}</textarea><div class="question-settings"><label>Question type<select data-q-type><option value="multiple" ${question.type === 'multiple' ? 'selected' : ''}>Multiple choice</option><option value="checkboxes" ${question.type === 'checkboxes' ? 'selected' : ''}>Checkboxes</option><option value="dropdown" ${question.type === 'dropdown' ? 'selected' : ''}>Dropdown</option><option value="short" ${question.type === 'short' ? 'selected' : ''}>Short answer</option><option value="paragraph" ${question.type === 'paragraph' ? 'selected' : ''}>Paragraph</option></select></label><label class="points-setting">Points<input type="number" data-q-points min="1" max="100" value="${escapeHTML(question.points || 1)}"></label><label class="required-setting"><input type="checkbox" data-q-required ${question.required ? 'checked' : ''}> Required</label></div>${choiceMarkup}</article>`;
  }).join('')}</div><button type="button" class="add-question-button" data-quiz-action="add-question">＋ Add question</button><div class="quiz-builder-footer"><button type="button" class="quiz-text-button" data-quiz-action="back">Cancel</button><button class="primary-button" type="submit">Save quiz</button></div></form>`;
}
function captureQuizAssignments(){
  quizAssignedStudents = [...quizWorkspace.querySelectorAll('[name="assigned-students"]:checked')].map(input => input.value);
}
function createQuiz(){
  if(getCurrentAccount().role !== 'teacher') return;
  captureQuizAssignments();
  const current = getCurrentAccount();
  const roster = studentsForTeacher(current);
  if(roster.length && !quizAssignedStudents.length){ showToast('Select at least one student to assign this quiz.'); return; }
  const quiz = {id:`quiz-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,title:quizWorkspace.querySelector('[name="quiz-title"]').value.trim(),description:quizWorkspace.querySelector('[name="quiz-description"]').value.trim(),questions:quizDraft,timeLimitMinutes:Math.min(180,Math.max(0,Number(quizWorkspace.querySelector('[name="quiz-time-limit"]').value) || 0)),autoSubmit:quizWorkspace.querySelector('[name="quiz-auto-submit"]').checked,authorEmail:current.email,authorName:current.name || 'Teacher',authorTeacherCode:current.teacherCode || '',teacherCode:current.teacherCode || '',assignedStudentEmails:[...quizAssignedStudents],subject:current.subject || '',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
  const quizzes = readQuizzes();
  const existing = quizzes.find(item => item.id === currentQuiz?.id);
  if(existing){
    quiz.id = existing.id;
    quiz.createdAt = existing.createdAt;
    quiz.authorEmail = existing.authorEmail;
    quiz.authorName = existing.authorName;
    const index = quizzes.findIndex(item => item.id === existing.id);
    quizzes[index] = quiz;
  }else quizzes.unshift(quiz);
  if(saveStored(QUIZZES_KEY, quizzes)){ currentQuiz = null; renderQuizLibrary(); showToast(existing ? 'Quiz updated for your class.' : 'Quiz assigned to your class.'); }
}
function beginQuiz(quiz){
  if(getCurrentAccount().role !== 'student' || submissionForStudent(quiz.id, getCurrentAccount().email)) return;
  currentQuiz = quiz;
  quizWorkspace.innerHTML = `<div class="quiz-page-head"><div><p class="eyebrow">QUIZ</p><h1>${escapeHTML(quiz.title)}</h1><p>${escapeHTML(quiz.description || 'Answer all required questions, then submit to see your score.')}</p></div><button class="quiz-text-button" type="button" data-quiz-action="back">← All quizzes</button></div><form id="quiz-taking-form" class="quiz-taking-form"><div class="quiz-taker-note">Questions marked <strong>*</strong> are required. Your answers are saved in this browser.</div>${Number(quiz.timeLimitMinutes) > 0 ? `<div class="quiz-timer" id="quiz-timer" role="timer" aria-live="polite">Time remaining: <strong></strong></div>` : ''}${(quiz.questions || []).map((question,index) => {
    let answers = '';
    if(['multiple','checkboxes','dropdown'].includes(question.type)){
      const optionList = (question.options || []).map(option => typeof option === 'string' ? {id:option,text:option} : option);
      if(question.type === 'dropdown') answers = `<select name="answer-${escapeHTML(question.id)}" ${question.required ? 'data-required="true"' : ''}><option value="">Choose an answer</option>${optionList.map(option => `<option value="${escapeHTML(option.id)}">${escapeHTML(option.text)}</option>`).join('')}</select>`;
      else answers = `<div class="quiz-choice-list">${optionList.map(option => `<label class="quiz-answer-choice"><input type="${question.type === 'checkboxes' ? 'checkbox' : 'radio'}" name="answer-${escapeHTML(question.id)}" value="${escapeHTML(option.id)}"><span>${escapeHTML(option.text)}</span></label>`).join('')}</div>`;
    }else if(question.type === 'short') answers = `<input class="quiz-text-answer" type="text" name="answer-${escapeHTML(question.id)}" maxlength="1000" placeholder="Your answer" ${question.required ? 'data-required="true"' : ''}>`;
    else answers = `<textarea class="quiz-text-answer" name="answer-${escapeHTML(question.id)}" rows="4" maxlength="3000" placeholder="Your answer" ${question.required ? 'data-required="true"' : ''}></textarea>`;
    return `<section class="quiz-question-take" data-take-question="${escapeHTML(question.id)}"><h2>${index+1}. ${escapeHTML(question.title)}${question.required ? ' <span>*</span>' : ''}</h2>${answers}</section>`;
  }).join('')}<div class="quiz-submit-row"><button class="primary-button" type="submit">Submit answers</button></div></form>`;
  startQuizTimer(quiz);
}
function startQuizTimer(quiz){
  clearInterval(quizTimerInterval);
  const timer = document.getElementById('quiz-timer');
  const minutes = Number(quiz.timeLimitMinutes) || 0;
  if(!timer || minutes <= 0) return;
  const deadline = Date.now() + minutes * 60 * 1000;
  const update = () => {
    const remaining = Math.max(0, deadline - Date.now());
    const seconds = Math.ceil(remaining / 1000);
    timer.querySelector('strong').textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2,'0')}`;
    if(remaining <= 0){
      clearInterval(quizTimerInterval);
      if(quiz.autoSubmit !== false){
        timer.textContent = 'Time is up — submitting your quiz…';
        submitQuiz({preventDefault(){},currentTarget:document.getElementById('quiz-taking-form')},true);
      }else timer.textContent = 'Time is up — submit your answers when ready.';
    }
  };
  update();
  if(Date.now() < deadline) quizTimerInterval = setInterval(update, 1000);
}
function exportQuizResults(quiz){
  const submissions = readQuizResponses()[quiz.id] || [];
  const assignedEmails = Array.isArray(quiz.assignedStudentEmails) ? quiz.assignedStudentEmails : studentsForTeacher().map(student => student.email);
  const students = getAccounts().filter(account => account.role === 'student' && assignedEmails.includes(account.email));
  const questions = quiz.questions || [];
  const cell = value => { let text = String(value ?? ''); if(/^[=+@-]/.test(text)) text = `'${text}`; return `"${text.replace(/"/g,'""')}"`; };
  const header = ['Quiz','Student','Email','Status','Score','Automatically graded points','Manual review points','Submitted at',...questions.map((question,index)=>`Q${index+1}: ${question.title}`)];
  const rows = students.map(student => {
    const submission = submissions.find(item => item.email === student.email);
    const answers = questions.map(question => {
      const values = submission?.answers?.[question.id] || [];
      return values.map(value => { const option = (question.options || []).find(item => (typeof item === 'string' ? item : item.id) === value); return option ? (typeof option === 'string' ? option : option.text) : value; }).join('; ');
    });
    return [quiz.title,student.name || 'Student',student.email,submission ? 'Submitted' : 'Not submitted',submission?.score ?? '',submission?.autoPoints ?? '',submission?.manualPoints ?? '',submission?.submittedAt ? formattedDate(submission.submittedAt) : '',...answers];
  });
  const csv = '\uFEFF' + [header,...rows].map(row => row.map(cell).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
  const link = document.createElement('a'); link.href = url; link.download = `${quiz.title.toLowerCase().replace(/[^a-z0-9]+/g,'-') || 'quiz'}-results.csv`; link.click(); URL.revokeObjectURL(url);
}
function applyQuizResultFilters(){
  const query = quizWorkspace.querySelector('[data-result-filter]')?.value.trim().toLowerCase() || '';
  const status = quizWorkspace.querySelector('[data-result-status-filter]')?.value || 'all';
  quizWorkspace.querySelectorAll('[data-result-name]').forEach(row => { row.hidden = !row.dataset.resultName.includes(query) || (status !== 'all' && row.dataset.resultStatus !== status); });
}
function renderQuizResults(quiz){
  const submissions = readQuizResponses()[quiz.id] || [];
  const assignedEmails = Array.isArray(quiz.assignedStudentEmails) ? quiz.assignedStudentEmails : studentsForTeacher().map(student => student.email);
  const assignedStudents = getAccounts().filter(account => account.role === 'student' && assignedEmails.includes(account.email));
  const studentRows = assignedStudents.map(student => {
    const submission = submissions.find(item => item.email === student.email);
    return `<tr data-result-name="${escapeHTML(`${student.name || 'Student'} ${student.email}`.toLowerCase())}" data-result-status="${submission ? 'submitted' : 'pending'}"><td>${escapeHTML(student.name || 'Student')}</td><td>${escapeHTML(student.email)}</td><td>${submission ? 'Submitted' : 'Not submitted'}</td><td>${submission ? `${submission.score} / ${submission.autoPoints} pts${submission.manualPoints ? ` · ${submission.manualPoints} pending` : ''}` : '—'}</td><td>${submission ? escapeHTML(formattedDate(submission.submittedAt)) : '—'}</td></tr>`;
  }).join('');
  const rows = submissions.length ? submissions.map(submission => `<article class="quiz-submission-card" data-result-name="${escapeHTML(`${submission.name || 'Student'} ${submission.email || ''}`.toLowerCase())}" data-result-status="submitted"><div class="quiz-submission-head"><div><strong>${escapeHTML(submission.name || 'Student')}</strong><span>${escapeHTML(submission.email || 'No email')} · ${escapeHTML(formattedDate(submission.submittedAt))}</span></div><b>${submission.score} / ${submission.autoPoints} pts${submission.manualPoints ? ` · ${submission.manualPoints} pending` : ''}</b></div><details><summary>View answers</summary><ol>${(quiz.questions || []).map(question => {
    const values = submission.answers?.[question.id] || [];
    const options = question.options || [];
    const readable = values.map(value => {
      const option = options.find(item => (typeof item === 'string' ? item : item.id) === value);
      return option ? (typeof option === 'string' ? option : option.text) : value;
    }).join(', ') || 'No answer';
    return `<li><strong>${escapeHTML(question.title)}</strong><p>${escapeHTML(readable)}</p></li>`;
  }).join('')}</ol></details></article>`).join('') : '<div class="quiz-empty"><h2>No responses yet</h2><p>Submissions will appear here when someone completes this quiz.</p></div>';
  const roster = `<section class="quiz-roster-results"><h2>Assigned students</h2><div class="teacher-table-wrap"><table class="teacher-table"><thead><tr><th>Student</th><th>Email</th><th>Status</th><th>Score</th><th>Submitted</th></tr></thead><tbody>${studentRows || '<tr><td colspan="5" class="teacher-empty">No students assigned to this quiz.</td></tr>'}</tbody></table></div></section>`;
  quizWorkspace.innerHTML = `<div class="quiz-page-head"><div><p class="eyebrow">RESPONSE SUMMARY</p><h1>${escapeHTML(quiz.title)}</h1><p>${submissions.length} submission${submissions.length === 1 ? '' : 's'} · scores are saved in this browser.</p></div><button class="quiz-text-button" type="button" data-quiz-action="back">← All quizzes</button></div><div class="quiz-results-toolbar"><label>Search students<input type="search" data-result-filter placeholder="Name or email"></label><label>Status<select data-result-status-filter><option value="all">All students</option><option value="submitted">Submitted</option><option value="pending">Not submitted</option></select></label><button class="primary-button" type="button" data-download-quiz-results>Download Excel file</button></div>${roster}<div class="quiz-results-list"><h2>Submission history</h2>${rows}</div>`;
}
function normalizedAnswer(value){ return String(value || '').trim().toLocaleLowerCase().replace(/\s+/g,' '); }
function submitQuiz(event, timeExpired = false){
  event.preventDefault();
  const quiz = currentQuiz;
  if(!quiz) return;
  if(submissionForStudent(quiz.id, getCurrentAccount().email)){
    clearInterval(quizTimerInterval);
    renderQuizLibrary();
    showToast('This quiz has already been submitted.');
    currentQuiz = null;
    return;
  }
  clearInterval(quizTimerInterval);
  const form = event.target || event.currentTarget;
  for(const question of quiz.questions){
    if(timeExpired) break;
    if(!question.required) continue;
    const values = [...form.querySelectorAll(`[name="answer-${CSS.escape(question.id)}"]`)].filter(input => input.type !== 'checkbox' && input.type !== 'radio' ? input.value.trim() : input.checked);
    if(!values.length){ showToast(`Please answer required question: ${question.title}`); form.querySelector(`[name="answer-${CSS.escape(question.id)}"]`)?.focus(); return; }
  }
  const formData = new FormData(form);
  const responses = {};
  quiz.questions.forEach(question => { responses[question.id] = formData.getAll(`answer-${question.id}`).map(value => String(value)); });
  let earned = 0;
  let autoPoints = 0;
  let manualPoints = 0;
  quiz.questions.forEach(question => {
    const answer = responses[question.id] || [];
    const points = Math.max(1,Number(question.points) || 1);
    if(['multiple','dropdown','checkboxes'].includes(question.type)){
      autoPoints += points;
      const correct = question.correctAnswers || (question.correctAnswer ? [question.correctAnswer] : []);
      if(correct.length && answer.length === correct.length && answer.every(value => correct.includes(value)) && correct.every(value => answer.includes(value))) earned += points;
    }else if(question.type === 'short' && question.answerKey){
      autoPoints += points;
      if(normalizedAnswer(answer[0]) === normalizedAnswer(question.answerKey)) earned += points;
    }else manualPoints += points;
  });
  const allResponses = readQuizResponses();
  const submissions = allResponses[quiz.id] || [];
  submissions.push({id:`response-${Date.now()}`,email:getCurrentAccount().email,name:getCurrentAccount().name || 'Student',answers:responses,score:earned,autoPoints,manualPoints,submittedAt:new Date().toISOString()});
  allResponses[quiz.id] = submissions;
  if(!saveStored(QUIZ_RESPONSES_KEY, allResponses)) return;
  quizWorkspace.innerHTML = `<section class="quiz-result"><div class="quiz-result-icon">✓</div><p class="eyebrow">RESPONSE RECORDED</p><h1>Quiz submitted</h1><p>Your answers have been saved in this browser.</p><div class="quiz-score"><strong>${earned} / ${autoPoints}</strong><span>points automatically graded</span></div>${manualPoints ? `<p class="manual-score-note">${manualPoints} point${manualPoints === 1 ? '' : 's'} require manual review.</p>` : '<p class="manual-score-note">All questions were automatically graded.</p>'}<div class="quiz-result-actions"><button type="button" class="primary-button" data-quiz-action="back">Back to quizzes</button></div></section>`;
  currentQuiz = null;
}
quizWorkspace.addEventListener('input', event => { if(event.target.matches('[data-result-filter]')) applyQuizResultFilters(); });
quizWorkspace.addEventListener('change', event => { if(event.target.matches('[data-result-status-filter]')) applyQuizResultFilters(); });
quizWorkspace.addEventListener('click', event => {
  if(event.target.closest('[data-download-quiz-results]')){
    const quiz = readQuizzes().find(item => item.id === activeResultsQuizId);
    if(quiz && getCurrentAccount().role === 'teacher' && quiz.authorEmail === getCurrentAccount().email) exportQuizResults(quiz);
    return;
  }
  const actionButton = event.target.closest('[data-quiz-action]');
  if(actionButton){
    const action = actionButton.dataset.quizAction;
    const id = actionButton.dataset.quizId;
    if(action === 'create' && getCurrentAccount().role === 'teacher'){ currentQuiz = null; renderQuizBuilder(); }
    if(action === 'back'){ currentQuiz = null; renderQuizLibrary(); }
    if(action === 'add-question'){ captureQuizDraft(); quizDraft.push(makeQuestion()); renderQuizBuilder({questions:quizDraft,title:quizWorkspace.querySelector('[name="quiz-title"]').value,description:quizWorkspace.querySelector('[name="quiz-description"]').value}); }
    if(action === 'take'){ const quiz = readQuizzes().find(item => item.id === id); if(quiz) beginQuiz(quiz); }
    if(action === 'results'){ const quiz = readQuizzes().find(item => item.id === id); if(getCurrentAccount().role === 'teacher' && quiz && quiz.authorEmail === getCurrentAccount().email){ activeResultsQuizId = quiz.id; renderQuizResults(quiz); } }
    if(action === 'edit'){ const quiz = readQuizzes().find(item => item.id === id); if(getCurrentAccount().role === 'teacher' && quiz && quiz.authorEmail === getCurrentAccount().email){ currentQuiz = quiz; renderQuizBuilder(quiz); } }
    if(action === 'delete'){ const quizzes = readQuizzes(); if(getCurrentAccount().role === 'teacher' && quizzes.some(item => item.id === id && item.authorEmail === getCurrentAccount().email)){ if(saveStored(QUIZZES_KEY,quizzes.filter(item => item.id !== id))){ renderQuizLibrary(); showToast('Quiz deleted.'); } } }
    return;
  }
  const card = event.target.closest('.quiz-question-editor');
  if(!card) return;
  if(event.target.closest('[data-remove-question]')){
    captureQuizDraft();
    if(quizDraft.length > 1){ quizDraft = quizDraft.filter(question => question.id !== card.dataset.questionId); renderQuizBuilder({questions:quizDraft,title:quizWorkspace.querySelector('[name="quiz-title"]').value,description:quizWorkspace.querySelector('[name="quiz-description"]').value}); }
    else showToast('A quiz needs at least one question.');
  }
  if(event.target.closest('[data-add-option]')){
    captureQuizDraft();
    const question = quizDraft.find(item => item.id === card.dataset.questionId);
    question.options.push({id:`option-${Math.random().toString(36).slice(2,8)}`,text:`Option ${question.options.length + 1}`});
    renderQuizBuilder({questions:quizDraft,title:quizWorkspace.querySelector('[name="quiz-title"]').value,description:quizWorkspace.querySelector('[name="quiz-description"]').value});
  }
  const removeOption = event.target.closest('[data-remove-option]');
  if(removeOption){
    captureQuizDraft();
    const question = quizDraft.find(item => item.id === card.dataset.questionId);
    if(question.options.length > 2){ question.options = question.options.filter(option => option.id !== removeOption.dataset.removeOption); question.correctAnswers = question.correctAnswers.filter(id => id !== removeOption.dataset.removeOption); renderQuizBuilder({questions:quizDraft,title:quizWorkspace.querySelector('[name="quiz-title"]').value,description:quizWorkspace.querySelector('[name="quiz-description"]').value}); }
    else showToast('Keep at least two answer choices.');
  }
});
quizWorkspace.addEventListener('change', event => {
  if(event.target.matches('[name="assigned-students"]')){ captureQuizAssignments(); return; }
  if(!event.target.matches('[data-q-type]')) return;
  captureQuizAssignments();
  captureQuizDraft();
  const question = quizDraft.find(item => item.id === event.target.closest('.quiz-question-editor').dataset.questionId);
  question.type = event.target.value;
  if(['multiple','checkboxes','dropdown'].includes(question.type) && question.options.length < 2){ question.options = [{id:`option-${Date.now()}-1`,text:'Option 1'},{id:`option-${Date.now()}-2`,text:'Option 2'}]; }
  renderQuizBuilder({questions:quizDraft,title:quizWorkspace.querySelector('[name="quiz-title"]').value,description:quizWorkspace.querySelector('[name="quiz-description"]').value});
});
quizWorkspace.addEventListener('submit', event => {
  if(event.target.id === 'quiz-builder-form'){
    event.preventDefault();
    captureQuizDraft();
    const invalidChoice = quizDraft.find(question => ['multiple','checkboxes','dropdown'].includes(question.type) && (!question.correctAnswers.length || question.options.some(option => !option.text)));
    if(invalidChoice){ showToast('Choose a correct answer and fill in every choice.'); return; }
    if(quizDraft.some(question => !question.title)){ showToast('Add text to every question.'); return; }
    createQuiz();
  }
  if(event.target.id === 'quiz-taking-form') submitQuiz(event);
});

document.addEventListener('submit', event => {
  const formId = event.target.id;
  const isSaveAction = ['hris-profile-form','learning-create-form','vacancy-form','note-form','quiz-builder-form','employee-form','employee-leave-form','overseas-job-form','email-campaign-form'].includes(formId) || (formId === 'auth-form' && authMode === 'signup');
  if(isSaveAction && !window.confirm('Are you sure you you want to save it?')){
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}, true);
document.addEventListener('click', event => {
  const deleteButton = event.target.closest('[data-note-delete], [data-delete-vacancy], [data-learning-delete], [data-admin-delete], [data-quiz-action="delete"], [data-employee-delete], [data-overseas-delete], [data-email-delete]');
  if(deleteButton && !window.confirm('Are you sure you want to delete it?')){
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }
  if(event.target.closest('[data-admin-save]') && !window.confirm('Are you sure you you want to save it?')){
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}, true);

renderProfiles();
renderVacancies();
renderQuizLibrary();
const activeEmail = localStorage.getItem(SESSION_KEY);
if(activeEmail){
  const account = getAccounts().find(item => item.email === activeEmail);
  if(account) openWorkspace(account);
  else localStorage.removeItem(SESSION_KEY);
}
window.addEventListener('storage', event => {
  if([ATS_KEY,VACANCIES_KEY,APPLICATIONS_KEY].includes(event.key)){
    renderAtsDashboard();
    if([VACANCIES_KEY,APPLICATIONS_KEY].includes(event.key)) renderVacancies();
    if(activeCandidate) renderCandidateReview(reviewRecords()[reviewKey(activeCandidate.name)] || {status:'New',notes:[],audit:[]});
  }
  if([HRIS_KEY,AUTH_KEY,EMPLOYEES_KEY].includes(event.key)) renderHris();
  if([LEARNING_KEY,AUTH_KEY].includes(event.key)) renderLearning();
  if(event.key===EMAIL_CAMPAIGNS_KEY) renderEmailMarketing();
  if(event.key===OVERSEAS_KEY) renderOverseasJobs();
  if(![AUTH_KEY, QUIZZES_KEY, QUIZ_RESPONSES_KEY].includes(event.key) || !document.getElementById('quiz-view').classList.contains('active-view')) return;
  if(activeResultsQuizId && event.key === QUIZ_RESPONSES_KEY){
    const quiz = readQuizzes().find(item => item.id === activeResultsQuizId);
    if(quiz){ renderQuizResults(quiz); return; }
  }
  renderQuizLibrary();
});
