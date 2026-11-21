(() => {
  const panel = document.getElementById('overseas-jobs-panel');
  if (!panel) return;
  panel.parentElement?.classList.add('overseas-board-content');

  const DATA_KEY = 'mockupDeskOverseasBoard';
  const folders = ['Unprocessed', 'Shortlisted', 'Lined up for Interview', 'Deployed', 'Kept for Reference', 'Rejected', 'Blacklisted'];
  const seedJobs = [
    {id:'seed-uae-1',title:'Waitress',company:'Clover Bay Hotels',country:'United Arab Emirates',city:'Dubai',jo:'JO-UAE-002',openings:4,specialization:'Hospitality',salary:'AED 3,500–4,500 / month',description:'Support guest services and daily hotel operations. Customer-service experience preferred.',status:'Active'},
    {id:'seed-twn-1',title:'Factory Worker',company:'Pacific Manufacturing',country:'Taiwan',city:'Taichung',jo:'JO-TWN-003',openings:8,specialization:'Manufacturing',salary:'TWD 28,000–34,000 / month',description:'Support safe production, quality checks, and daily team operations.',status:'Active'},
    {id:'seed-bhr-1',title:'Cleaner',company:'Pearl Coast Services',country:'Bahrain',city:'Manama',jo:'JO-BHR-001',openings:3,specialization:'Facilities',salary:'BHD 180–220 / month',description:'Maintain clean shared spaces and follow site safety procedures.',status:'Active'},
    {id:'seed-sgp-marketing',title:'International Marketing Specialist',company:'Meridian Global Careers',country:'Singapore',city:'Singapore',jo:'JO-SGP-MKT-014',openings:2,specialization:'Marketing',salary:'SGD 3,200–4,000 / month',description:'Plan regional digital campaigns, manage social and email content, and report on campaign performance. Qualifications: at least 2 years of professional marketing experience; campaign planning and execution; strong copywriting and editing; social media and email marketing; analytics and reporting; coordination across creative and commercial teams; excellent communication and organization. Applicants must meet the employer’s stated requirements and complete applicable overseas recruitment and deployment steps.',status:'Active'}
  ];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const read = () => { try { const value = JSON.parse(localStorage.getItem(DATA_KEY) || 'null'); return value && Array.isArray(value.jobs) ? {...value,applications:Array.isArray(value.applications)?value.applications:[],inquiries:Array.isArray(value.inquiries)?value.inquiries:[]} : {jobs:seedJobs,applications:[],inquiries:[]}; } catch { return {jobs:seedJobs,applications:[],inquiries:[]}; } };
  const save = state => { try { localStorage.setItem(DATA_KEY, JSON.stringify(state)); return true; } catch { return false; } };
  let state = read();
  let mode = 'applicant';
  let section = 'dashboard';
  let activeFolder = 'Unprocessed';
  let applicantTab = 'online';
  let sourceQuery = '';
  let sourceExperience = 0;
  let sourceArea = '';
  let sourceLocation = '';
  let sourceWorkplace = '';
  let sourceEducation = '';
  let sourceSkill = '';
  let sourceAgeMin = '';
  let sourceAgeMax = '';
  let selectedSourceProfileName = '';
  let sourceAdvancedOpen = true;
  let applicantPageTab = 'jobs';
  let applicantQuery = '';
  let applicantCountry = '';
  let applicantSpecialization = '';
  let applicantSearchMode = 'specialization';
  let selectedApplicantJobId = '';
  const destinationCountries = [
    {name:'KSA',value:'Saudi Arabia',spot:'Masjid al-Haram',icon:'🕋',scene:'ksa',jobs:[['Hotel Housekeeper','Desert Gate Recruitment','Hospitality',12],['Construction Electrician','Gulf Path Agency','Skilled Trades',7]]},
    {name:'Bahrain',value:'Bahrain',spot:'Bahrain Fort',icon:'🏰',scene:'bahrain',jobs:[['Facilities Cleaner','Pearl Coast Services','Facilities',9],['Restaurant Server','Island Bridge Recruitment','Hospitality',5]]},
    {name:'Taiwan',value:'Taiwan',spot:'Taipei 101',icon:'🏙️',scene:'taiwan',jobs:[['Production Associate','Pacific Manufacturing','Manufacturing',18],['Care Assistant','Formosa Careers','Healthcare',6]]},
    {name:'UAE',value:'United Arab Emirates',spot:'Burj Khalifa',icon:'🏙️',scene:'uae',jobs:[['Hotel Receptionist','Clover Bay Hotels','Hospitality',11],['HVAC Technician','Oasis Global Hiring','Skilled Trades',8]]},
    {name:'Qatar',value:'Qatar',spot:'Museum of Islamic Art',icon:'🕌',scene:'qatar',jobs:[['Kitchen Assistant','Pearl Horizon Agency','Hospitality',7],['Warehouse Operator','Doha Workforce Partners','Logistics',10]]},
    {name:'Japan',value:'Japan',spot:'Mount Fuji',icon:'🗻',scene:'japan',jobs:[['Elder Care Worker','Sakura Bridge Careers','Healthcare',8],['Food Production Staff','Rising Sun Recruitment','Manufacturing',13]]},
    {name:'Singapore',value:'Singapore',spot:'Marina Bay Sands',icon:'🌆',scene:'singapore',jobs:[['Hotel Service Crew','Lion City Placement','Hospitality',9],['Process Technician','Meridian Overseas Agency','Manufacturing',6]]},
    {name:'Hungary',value:'Hungary',spot:'Budapest Parliament',icon:'🏛️',scene:'hungary',jobs:[['Automotive Assembler','Danube Talent Link','Manufacturing',14],['Warehouse Picker','Central Europe Careers','Logistics',8]]},
    {name:'South Korea',value:'South Korea',spot:'Gyeongbokgung Palace',icon:'🏯',scene:'korea',jobs:[['Food Processing Worker','Han River Recruitment','Manufacturing',12],['Hotel Room Attendant','Seoul Path Agency','Hospitality',5]]},
    {name:'USA',value:'USA',spot:'Statue of Liberty',icon:'🗽',scene:'usa',jobs:[['Caregiver','Liberty Pathways','Healthcare',10],['Restaurant Cook','Northstar Placement Group','Hospitality',6]]}
  ];
  const countryPhotos = {
    ksa:'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=720&q=85',
    bahrain:'https://images.unsplash.com/photo-1586191582151-f73872dfd1e6?auto=format&fit=crop&w=720&q=85',
    taiwan:'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=720&q=85',
    uae:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=720&q=85',
    qatar:'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=720&q=85',
    japan:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=720&q=85',
    singapore:'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=720&q=85',
    hungary:'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=720&q=85',
    korea:'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=720&q=85',
    usa:'https://images.unsplash.com/photo-1534430480872-516f9d5e8a8a?auto=format&fit=crop&w=720&q=85'
  };
  const featuredDestinations = destinationCountries.map(country => ({...country,photo:countryPhotos[country.scene]}));
  const additionalDestinations = [
    {name:'Canada',value:'Canada',scene:'canada',jobs:[['Hotel Room Attendant','Maple Leaf Placement','Hospitality',8],['Farm Worker','Northern Path Recruitment','Agriculture',12]]},
    {name:'New Zealand',value:'New Zealand',scene:'new-zealand',jobs:[['Dairy Farm Assistant','Kiwi Workforce Agency','Agriculture',7],['Care Assistant','Southern Cross Careers','Healthcare',5]]},
    {name:'Australia',value:'Australia',scene:'australia',jobs:[['Kitchen Hand','Southern Harbour Recruitment','Hospitality',9],['Meat Processing Worker','Coastal Pathways','Manufacturing',11]]},
    {name:'Kuwait',value:'Kuwait',scene:'kuwait',jobs:[['Domestic Helper','Kuwait Star Agency','Household Services',10],['Building Electrician','Gulf Technical Careers','Skilled Trades',6]]},
    {name:'Oman',value:'Oman',scene:'oman',jobs:[['Hotel Cleaner','Oasis Sands Placement','Hospitality',7],['Heavy Equipment Operator','Muscat Global Recruitment','Skilled Trades',4]]},
    {name:'Hong Kong',value:'Hong Kong',scene:'hong-kong',jobs:[['Domestic Worker','Harbour Bridge Agency','Household Services',14],['Kitchen Assistant','Pearl City Recruitment','Hospitality',6]]},
    {name:'Poland',value:'Poland',scene:'poland',jobs:[['Warehouse Associate','Vistula Careers','Logistics',9],['Food Production Worker','Central Europe Hiring','Manufacturing',8]]},
    {name:'Romania',value:'Romania',scene:'romania',jobs:[['Factory Operator','Carpathian Recruitment','Manufacturing',8],['Care Worker','Danube Pathways','Healthcare',5]]}
  ];
  const extendedCountryNames = ['Argentina','Austria','Belgium','Brazil','Brunei','Cambodia','Chile','China','Colombia','Croatia','Cyprus','Czech Republic','Denmark','Egypt','Estonia','Finland','France','Germany','Greece','India','Indonesia','Israel','Italy','Jordan','Kazakhstan','Laos','Latvia','Lithuania','Luxembourg','Malaysia','Maldives','Malta','Mauritius','Mexico','Mongolia','Morocco','Myanmar','Nepal','Netherlands','Norway','Pakistan','Papua New Guinea','Portugal','Russia','South Africa','Spain','Sri Lanka','Sweden','Switzerland','Thailand'];
  const extendedDestinations = extendedCountryNames.map((name,index) => {
    const categories = ['Hospitality','Healthcare','Manufacturing','Logistics','Skilled Trades','Agriculture'];
    const roles = ['Hotel Service Associate','Care Assistant','Production Operator','Warehouse Associate','Maintenance Technician','Farm Worker'];
    const category = categories[index % categories.length];
    const openings = 3 + (index * 7 % 16);
    return {name,value:name,scene:`country-${index}`,jobs:[[roles[index % roles.length],`${name} Gateway Recruitment`,category,openings],[`${category} Support Worker`,`${name} Careers Network`,category,Math.max(2,Math.floor(openings/2))]]};
  });
  additionalDestinations.push(...extendedDestinations);
  const allDestinationCountries = [...featuredDestinations,...additionalDestinations];
  const countrySampleJobs = allDestinationCountries.flatMap(country => country.jobs.map(([title,company,specialization,openings],index) => ({id:`country-demo-${country.scene}-${index}`,title,company,country:country.value,city:country.name,specialization,openings,salary:'Compensation discussed with employer',description:`Sample ${specialization.toLowerCase()} opportunity listed for ${country.name}. Contact the agency through verified official channels.`,status:'Active',demoCountryListing:true})));
  let savedApplicantJobs = [];
  try { savedApplicantJobs = JSON.parse(localStorage.getItem(`${DATA_KEY}:saved`) || '[]'); } catch { savedApplicantJobs = []; }
  if (!Array.isArray(savedApplicantJobs)) savedApplicantJobs = [];

  function currentAccount() { return typeof getCurrentAccount === 'function' ? getCurrentAccount() : {name:'Workspace user',email:'',role:'student'}; }
  function render() {
    const user = currentAccount();
    const openJobs = state.jobs.filter(job => job.status !== 'Closed');
    const unprocessed = state.applications.filter(item => item.status === 'Unprocessed').length;
    const visibleApplicants = state.applications.filter(item => item.status === activeFolder);
    const body = mode === 'applicant' ? renderApplicantView(openJobs, user) : renderRecruiterView(openJobs, unprocessed, visibleApplicants, user);
    panel.innerHTML = `<section class="overseas-workspace ${mode === 'applicant' ? 'applicant-mode' : 'recruiter-mode'}"><div class="overseas-board-hero"><div class="overseas-hero-copy"><a class="overseas-hero-brand" href="#" aria-label="Mock-up Desk home"><span class="overseas-agency-mark">M</span><span><strong>Mock-up Desk</strong><small>Overseas recruitment workspace</small></span></a><p class="eyebrow">INTERNATIONAL RECRUITMENT · EDUCATIONAL DEMO</p><h1>Overseas Job Board</h1><p>${mode === 'applicant' ? 'Explore overseas opportunities and track your practice applications.' : 'Manage sample job ads and review practice applications.'}</p></div><div class="overseas-view-toggle" role="group" aria-label="Job board view"><button type="button" data-mode="recruiter" class="${mode === 'recruiter' ? 'active' : ''}">Recruiter view</button><button type="button" data-mode="applicant" class="${mode === 'applicant' ? 'active' : ''}">Applicant view</button></div><div class="overseas-hero-icons" aria-hidden="true"><span>✈</span><span>✦</span><span>◎</span><span>✧</span></div></div>${body}<footer class="overseas-board-footer">Fictional listings and local browser data only · This simulation does not verify DMW accreditation or submit real applications.</footer></section>`;
  }

  function renderRecruiterView(jobs, unprocessed, applicants, user) {
    const modules = [['dashboard','Dashboard'],['jobs','Job Ads'],['applicants','Applicants'],['inquiries','Employer Inquiries'],['billing','Billing / Deposit Slip']];
    return `<nav class="overseas-module-nav" aria-label="Overseas recruiter modules">${modules.map(([key,label])=>`<button type="button" data-section="${key}" class="${section === key ? 'active' : ''}">${label}</button>`).join('')}</nav><div class="overseas-module-content">${section === 'dashboard' ? `<div class="overseas-dashboard-heading"><div><p class="eyebrow">AGENCY DASHBOARD</p><h2>Good day, ${escape(user.name || 'Recruiter')}</h2><p>Here is an overview of your overseas recruitment activity.</p></div><button type="button" class="overseas-primary-button" data-open-job-form>＋ Create job ad</button></div><div class="overseas-kpis"><article><span class="overseas-kpi-icon">▣</span><small>Active jobs</small><strong>${jobs.length}</strong><span>Open overseas listings</span></article><article class="unprocessed-kpi"><span class="overseas-kpi-icon">♙</span><small>Unprocessed applicants</small><strong>${unprocessed}</strong><span>Applications awaiting screening</span></article></div><section class="overseas-quick-actions"><h3>Quick actions</h3><div><button type="button" data-open-job-form>＋ Create job ad</button><button type="button" data-section="applicants">♙ Review applicants</button><button type="button" data-section="inquiries">✉ Employer inquiries</button><button type="button" data-section="billing">↑ Upload deposit slip</button></div></section><div class="overseas-dashboard-columns"><section class="overseas-panel-card"><div class="overseas-panel-heading"><div><h3>Recent job ads</h3><p>Manage current overseas opportunities.</p></div><button type="button" data-section="jobs">View all →</button></div>${jobs.slice(0,3).map(jobCard).join('') || '<p class="overseas-empty-note">No job ads yet. Create your first listing.</p>'}</section><section class="overseas-panel-card overseas-announcements"><div class="overseas-panel-heading"><div><h3>Announcements & advisories</h3><p>Learning-only sample announcements.</p></div><span>DMW · DEMO</span></div><article><strong>Recruitment compliance reminder</strong><p>Review current DMW guidance and verify documents through official channels before recruitment.</p><small>Platform advisory · Sample</small></article><article><strong>Protect applicant information</strong><p>Use candidate information only for job-related review. Avoid collecting sensitive data in this demo.</p><small>Account notice · Sample</small></article></section></div>` : section === 'jobs' ? renderJobsSection(jobs) : section === 'applicants' ? renderApplicantsSection(applicants) : section === 'inquiries' ? renderInquiries() : renderBilling() }</div>${jobFormMarkup()}`;
  }

  function renderApplicantView(jobs, user) {
    const applications = state.applications.filter(item => item.applicantEmail === user.email);
    const countries = [...new Set([...allDestinationCountries.map(country => country.value), ...jobs.map(job => job.country).filter(Boolean)])].sort();
    const otherCountryOptions = [...additionalDestinations,...countries.filter(country => !allDestinationCountries.some(item => item.value === country)).map(country => ({name:country,value:country,jobs:[]}))];
    const specializations = [...new Set([...countrySampleJobs.map(job => job.specialization), ...jobs.map(job => job.specialization).filter(Boolean)])].sort();
    const discoveryJobs = applicantSearchMode === 'country' && applicantCountry
      ? [...jobs.filter(job => job.country === applicantCountry), ...countrySampleJobs.filter(job => job.country === applicantCountry)]
      : jobs;
    const query = applicantQuery.trim().toLowerCase();
    const filteredJobs = discoveryJobs.filter(job => {
      const searchable = `${job.title} ${job.company} ${job.city} ${job.country} ${job.specialization} ${job.description}`.toLowerCase();
      return (!query || searchable.includes(query)) && (applicantSearchMode !== 'country' || Boolean(applicantCountry)) && (!applicantCountry || job.country === applicantCountry) && (!applicantSpecialization || job.specialization === applicantSpecialization) && (applicantPageTab !== 'saved' || savedApplicantJobs.includes(job.id));
    });
    if (!filteredJobs.some(job => job.id === selectedApplicantJobId)) selectedApplicantJobId = filteredJobs[0]?.id || '';
    const selectedJob = filteredJobs.find(job => job.id === selectedApplicantJobId);
    const applied = job => applications.some(item => item.jobId === job.id);
    const statusLabel = status => ({Unprocessed:'Applied / Unprocessed',Shortlisted:'Shortlisted','Lined up for Interview':'Lined up for Interview',Deployed:'Viewed by Employer','Kept for Reference':'Application received',Rejected:'Not selected',Blacklisted:'Application update unavailable'})[status] || 'Application received';
    const detail = selectedJob ? `<article class="overseas-applicant-detail-pane"><div class="overseas-opportunity-top"><span>${escape(selectedJob.specialization || 'Overseas role')}</span><small>${escape(selectedJob.status || 'Active')}</small></div><h2>${escape(selectedJob.title)}</h2><p class="overseas-opportunity-company">${escape(selectedJob.company)} · ${escape(selectedJob.city)}, ${escape(selectedJob.country)}</p><div class="overseas-applicant-detail-meta"><span>${escape(selectedJob.type || 'Full-time')}</span><span>${escape(selectedJob.salary || 'Compensation discussed by employer')}</span><span>${Number(selectedJob.openings) || 1} vacancies</span></div><h3>About the role</h3><p>${escape(selectedJob.description || 'Role details will be shared by the recruiter.')}</p>${selectedJob.qualifications?.length ? `<h3>Qualifications</h3><ul>${selectedJob.qualifications.map(item=>`<li>${escape(item)}</li>`).join('')}</ul>` : ''}<section class="overseas-trust-details"><h3>Recruitment details</h3><p><strong>DMW license / accreditation:</strong> ${escape(selectedJob.accreditation || 'Demo details not provided')}</p><p><strong>Agency address:</strong> ${escape(selectedJob.address || 'Demo details not provided')}</p><span class="overseas-no-fee-badge">${escape(selectedJob.fee || 'Fee policy: confirm through official channels')}</span></section><div class="overseas-applicant-actions"><button type="button" data-apply-job="${escape(selectedJob.id)}" ${applied(selectedJob)?'disabled':''}>${applied(selectedJob)?'Application submitted':'Apply now'}</button><button type="button" class="overseas-save-job-button" data-save-job="${escape(selectedJob.id)}">${savedApplicantJobs.includes(selectedJob.id)?'Saved':'Save job'}</button><button type="button" class="overseas-share-job-button" data-share-job="${escape(selectedJob.id)}">Share</button></div><p data-share-message class="overseas-share-message" role="status"></p></article>` : '<div class="overseas-empty-state"><strong>No matching opportunities</strong><p>Try changing your search or filters.</p></div>';
    const applicationRows = applications.map(item=>`<article class="overseas-application-row"><div><strong>${escape(item.jobTitle)}</strong><span>${escape(item.company || 'Recruitment agency')}</span></div><span>${escape(item.country || 'Overseas')}</span><span>${escape(item.appliedAt || 'Date unavailable')}</span><span class="overseas-app-status">${escape(statusLabel(item.status))}</span></article>`).join('');
    return `<div class="overseas-applicant-page"><div class="overseas-applicant-heading"><div><p class="eyebrow">APPLICANT WORKSPACE</p><h2>Find your next opportunity</h2><p>Search overseas listings and manage your practice applications.</p></div><span>${jobs.length} open ${jobs.length === 1 ? 'opportunity' : 'opportunities'}</span></div><nav class="overseas-applicant-nav" aria-label="Applicant sections"><button type="button" data-applicant-tab="jobs" class="${applicantPageTab==='jobs'?'active':''}">Jobs</button><button type="button" data-applicant-tab="saved" class="${applicantPageTab==='saved'?'active':''}">Saved jobs (${savedApplicantJobs.length})</button><button type="button" data-applicant-tab="applications" class="${applicantPageTab==='applications'?'active':''}">Applications (${applications.length})</button><button type="button" data-open-resume>My Resume</button></nav>${applicantPageTab==='applications' ? `<section class="overseas-applications-view"><div class="overseas-applications-header"><div><h3>Online applications</h3><p>Recent activity for your practice applications.</p></div><span>Past 6 months</span></div><div class="overseas-application-table"><div class="overseas-application-row overseas-application-row-head"><strong>Position & agency</strong><strong>Destination</strong><strong>Date applied</strong><strong>Status</strong></div>${applicationRows || '<p class="overseas-empty-state">No practice applications yet. Browse jobs to get started.</p>'}</div><p class="overseas-demo-callout">Internal recruiter notes and private tags are not shown here. Application activity is simulated on this device.</p></section>` : `<div class="overseas-discovery-switch" role="group" aria-label="Choose job search method"><button type="button" data-search-mode="specialization" class="${applicantSearchMode==='specialization'?'active':''}" aria-pressed="${applicantSearchMode==='specialization'}">Search by specialization</button><button type="button" data-search-mode="country" class="${applicantSearchMode==='country'?'active':''}" aria-pressed="${applicantSearchMode==='country'}">Search by country</button></div><form class="overseas-applicant-search" data-applicant-search ${applicantSearchMode==='country'?'hidden':''}><label>Keyword / position<input name="query" value="${escape(applicantQuery)}" placeholder="Job title, agency, skill or keyword"></label><label>Country<select name="country"><option value="">All countries</option>${countries.map(country=>`<option value="${escape(country)}" ${applicantCountry===country?'selected':''}>${escape(country)}</option>`).join('')}</select></label><label>Specialization<select name="specialization"><option value="">All specializations</option>${specializations.map(item=>`<option value="${escape(item)}" ${applicantSpecialization===item?'selected':''}>${escape(item)}</option>`).join('')}</select></label><button type="submit">Search jobs</button></form>${applicantSearchMode==='country'?`<section class="overseas-country-discovery" aria-label="Explore jobs by destination"><div class="overseas-country-section-heading"><h3>Top destinations</h3><span>Explore sample overseas job orders</span></div><div class="overseas-country-marquee"><div class="overseas-country-track">${[...featuredDestinations,...featuredDestinations].map(country=>{const available=jobs.filter(job=>job.country===country.value);const count=available.reduce((sum,job)=>sum+(Number(job.openings)||1),0)+country.jobs.reduce((sum,job)=>sum+job[3],0);return `<button type="button" class="overseas-country-card ${applicantCountry===country.value?'selected':''}" data-country="${escape(country.value)}" aria-label="${escape(country.name)}, ${count} vacancies; ${escape(country.spot)}"><span class="overseas-country-picture"><img src="${escape(country.photo)}" alt=""><span class="overseas-country-card-copy"><strong>${escape(country.name)}</strong><small>${count} vacancies</small><em>${escape(country.spot)}</em></span></span></button>`}).join('')}</div></div><div class="overseas-country-list-heading"><h3>Other countries & vacancies</h3><span>Choose a destination to view agency listings</span></div><div class="overseas-country-list">${otherCountryOptions.map(country=>{const available=jobs.filter(job=>job.country===country.value);const count=available.reduce((sum,job)=>sum+(Number(job.openings)||1),0)+country.jobs.reduce((sum,job)=>sum+job[3],0);return `<button type="button" data-country="${escape(country.value)}" class="${applicantCountry===country.value?'active':''}"><span>${escape(country.name)}</span><strong>${count} vacancies</strong><span aria-hidden="true">→</span></button>`}).join('') || '<p class="overseas-country-empty">No other destinations listed yet.</p>'}</div></section>`:''}<div class="overseas-discovery-layout"><section class="overseas-job-feed" aria-label="Job listings"><div class="overseas-feed-heading"><strong>${filteredJobs.length} ${filteredJobs.length===1?'job':'jobs'}</strong><span>Landbased · Demo listings</span></div>${filteredJobs.map(job=>`<article class="overseas-applicant-job-card ${selectedApplicantJobId===job.id?'selected':''}" data-select-job="${escape(job.id)}" tabindex="0" role="button" aria-label="View ${escape(job.title)}"><div class="overseas-opportunity-top"><span>${escape(job.specialization || 'Overseas role')}</span><small>${escape(job.status || 'Active')}</small></div><h3>${escape(job.title)}</h3><p class="overseas-opportunity-company">${escape(job.company)} · ${escape(job.country)}</p><div class="overseas-job-feed-meta"><span>${escape(job.salary || 'Compensation discussed')}</span><span>Demo posting</span></div><button type="button" class="overseas-bookmark-button" data-save-job="${escape(job.id)}" aria-label="${savedApplicantJobs.includes(job.id)?'Remove saved job':'Save job'}">${savedApplicantJobs.includes(job.id)?'♥ Saved':'♡ Save'}</button></article>`).join('') || '<div class="overseas-empty-state"><strong>No matching opportunities</strong><p>Try another keyword or filter.</p></div>'}</section><section class="overseas-job-preview" aria-label="Selected job details">${detail}</section></div><p class="overseas-demo-callout">Demo only: applications stay in this browser and are not sent to an agency. Verify recruiter credentials through official channels.</p>`}</div>`;
  }

    function jobCard(job) {
     const marketingApplicants=job.id==='seed-sgp-marketing'?['Ava Patel','Noah Williams','Mia Johnson','Ethan Chen','Sofia Garcia','Liam Thompson','Isabella Nguyen','Oliver Brown','Amara Okafor','Lucas Martin']:[];
     const applicantProfiles=marketingApplicants.length?`<details class="overseas-applicant-profiles"><summary>10 applicants · View profiles</summary>${marketingApplicants.map(name=>`<button type="button" data-overseas-view-profile="${escape(name)}">${escape(name)} · View profile</button>`).join('')}</details>`:'';
     return `<article class="overseas-job-card"><div class="overseas-job-card-icon">✈</div><div class="overseas-job-card-copy"><div><span class="overseas-status-pill">${escape(job.status || 'Active')}</span><span class="overseas-jo-number">${escape(job.jo || 'Job order pending')}</span></div><h3>${escape(job.title)}</h3><p>${escape(job.company)} · ${escape(job.city)}, ${escape(job.country)} · ${Number(job.openings) || 1} openings</p><small>${escape(job.salary || 'Compensation to be discussed')}</small></div><button type="button" data-edit-job="${escape(job.id)}" aria-label="Edit ${escape(job.title)}">Edit</button></article>`;
  }

    function renderJobsSection(jobs) {
     return `<div class="overseas-section-header"><div><p class="eyebrow">JOB ADS</p><h2>Create & manage opportunities</h2><p>Sample listings are stored locally in this browser.</p></div><button class="overseas-primary-button" type="button" data-open-job-form>＋ Create job ad</button></div><div class="overseas-jobs-list">${jobs.length ? jobs.map(jobCard).join('') : '<div class="overseas-empty-state"><strong>No jobs posted</strong><p>Create a sample listing to begin.</p></div>'}</div><p class="overseas-compliance-note"><strong>Compliance simulation:</strong> This form demonstrates common compliance fields only. It is not an official DMW approval or publishing service.</p>`;
  }

  function renderApplicantsSection(applicants) {
    if (applicantTab === 'sourcing') return renderTalentSourcing();
    const all = state.applications;
    return `<div class="overseas-section-header"><div><p class="eyebrow">CANDIDATE PIPELINE</p><h2>Applicants</h2><p>Review practice applications by folder and record job-related notes.</p></div><button type="button" data-show-sourcing>Talent sourcing</button><button type="button" data-email-applicants ${applicants.length ? '' : 'disabled'}>✉ Email applicants</button></div><div class="overseas-folder-tabs" role="tablist" aria-label="Applicant status folders">${folders.map(folder=>`<button type="button" role="tab" aria-selected="${activeFolder === folder}" data-folder="${escape(folder)}" class="${activeFolder === folder ? 'active' : ''}">${escape(folder)} <span>${all.filter(item=>item.status===folder).length}</span></button>`).join('')}</div><div class="overseas-bulk-toolbar"><label><input type="checkbox" data-select-all ${applicants.length ? '' : 'disabled'}> Select all in ${escape(activeFolder)}</label><span data-selected-count>0 selected</span><label>Move selected to<select data-bulk-status><option value="">Choose folder</option>${folders.map(folder=>`<option>${escape(folder)}</option>`).join('')}</select></label><button type="button" data-bulk-move disabled>Move</button></div><div class="overseas-applicant-table-wrap"><table class="overseas-applicant-table"><thead><tr><th></th><th>Applicant</th><th>Position</th><th>Applied</th><th>Internal notes</th><th>Status</th><th></th></tr></thead><tbody>${applicants.length ? applicants.map(item=>`<tr data-application-row="${escape(item.id)}"><td><input type="checkbox" data-select-application="${escape(item.id)}" aria-label="Select ${escape(item.applicantName)}"></td><td><button type="button" data-view-applicant="${escape(item.id)}">${escape(item.applicantName)}</button><small>${escape(item.applicantEmail)}</small></td><td>${escape(item.jobTitle)}</td><td>${escape(item.appliedAt || 'Today')}</td><td><input type="text" data-applicant-note="${escape(item.id)}" value="${escape(item.notes || '')}" maxlength="300" placeholder="Add note"></td><td><select data-applicant-status="${escape(item.id)}" aria-label="Move ${escape(item.applicantName)} to folder">${folders.map(folder=>`<option ${item.status===folder?'selected':''}>${escape(folder)}</option>`).join('')}</select></td><td><button type="button" class="overseas-move-button" data-save-applicant="${escape(item.id)}" title="Save status and notes" aria-label="Save applicant update">➜</button></td></tr>`).join('') : `<tr><td colspan="7" class="overseas-table-empty">No applicants in this folder yet.</td></tr>`}</tbody></table></div><p class="overseas-pipeline-note">${all.length} total application${all.length === 1 ? '' : 's'} · Folder changes are saved on this device.</p><div class="overseas-applicant-detail" data-applicant-detail hidden></div><div class="overseas-email-modal" data-email-modal hidden><form data-email-form><button type="button" class="overseas-modal-close" data-close-email aria-label="Close">×</button><p class="eyebrow">BULK COMMUNICATION</p><h3>Email applicants</h3><p>Draft a local announcement for ${applicants.length} applicant${applicants.length === 1 ? '' : 's'}. No email will be sent.</p><label>Subject<input name="subject" required maxlength="120" placeholder="Interview schedule update"></label><label>Message<textarea name="message" rows="5" required maxlength="1200" placeholder="Write an announcement or document reminder..."></textarea></label><p data-email-confirmation role="status"></p><button class="overseas-primary-button" type="submit">Save local draft</button></form></div>`;
  }

  function renderTalentSourcing() {
    const profiles = typeof candidates !== 'undefined' ? candidates : [];
    const options = key => [...new Set(profiles.map(candidate => candidate[key]).filter(Boolean))].sort((a,b) => String(a).localeCompare(String(b)));
    const skillOptions = [...new Set(profiles.flatMap(candidate => candidate.skills || []).filter(Boolean))].sort((a,b) => a.localeCompare(b));
    const optionMarkup = (items, selected, label) => `<option value="">${label}</option>${items.map(item => `<option value="${escape(item)}" ${selected === item ? 'selected' : ''}>${escape(item)}</option>`).join('')}`;
    const query = sourceQuery.trim();
    const matches = profiles.filter(candidate => {
      const text = `${candidate.name} ${candidate.role} ${candidate.area} ${candidate.location} ${candidate.education} ${(candidate.skills || []).join(' ')} ${(candidate.work || []).join(' ')}`.toLowerCase();
      const matchesQuery = !query || (typeof booleanMatch === 'function' ? booleanMatch(text, query) : text.includes(query.toLowerCase()));
      const matchesSkill = !sourceSkill || (candidate.skills || []).some(skill => skill.toLowerCase() === sourceSkill.toLowerCase());
      const candidateAge = Number(candidate.age) || 22 + profiles.indexOf(candidate) % 34;
      return matchesQuery && candidate.experience >= Number(sourceExperience) && (!sourceAgeMin || candidateAge >= Number(sourceAgeMin)) && (!sourceAgeMax || candidateAge <= Number(sourceAgeMax)) && (!sourceArea || candidate.area === sourceArea) && (!sourceLocation || candidate.location === sourceLocation) && (!sourceWorkplace || candidate.workplace === sourceWorkplace) && (!sourceEducation || candidate.education === sourceEducation) && matchesSkill;
    });
    return `<div class="overseas-section-header"><div><p class="eyebrow">APPLICANT SEARCH</p><h2>Talent sourcing</h2><p>Search fictional resumes by role, skills, education, employer, or experience.</p></div><button type="button" data-show-online>← Online applications</button></div><form class="overseas-sourcing-toolbar" data-sourcing-form><div class="overseas-sourcing-main-fields"><label>Keyword / Boolean search<input name="query" value="${escape(sourceQuery)}" placeholder="designer AND Figma, engineer OR developer" aria-label="Search sample resumes"></label><button type="button" class="overseas-advanced-toggle" data-toggle-source-filters aria-expanded="${sourceAdvancedOpen}">${sourceAdvancedOpen ? '− Hide advanced filters' : '＋ Advanced search'}</button><button type="submit">Search resumes</button></div><div class="overseas-sourcing-advanced" ${sourceAdvancedOpen ? '' : 'hidden'}><label>Years of experience<select name="experience"><option value="0" ${Number(sourceExperience)===0?'selected':''}>Any experience</option><option value="1" ${Number(sourceExperience)===1?'selected':''}>1+ year</option><option value="2" ${Number(sourceExperience)===2?'selected':''}>2+ years</option><option value="3" ${Number(sourceExperience)===3?'selected':''}>3+ years</option></select></label><label>Career area<select name="area">${optionMarkup(options('area'), sourceArea, 'Any career area')}</select></label><label>Location<select name="location">${optionMarkup(options('location'), sourceLocation, 'Any location')}</select></label><label>Workplace<select name="workplace">${optionMarkup(options('workplace'), sourceWorkplace, 'Any workplace')}</select></label><label>Education<select name="education">${optionMarkup(options('education'), sourceEducation, 'Any education')}</select></label><label>Skill<select name="skill">${optionMarkup(skillOptions, sourceSkill, 'Any skill')}</select></label><label>Minimum age<select name="ageMin"><option value="">Any age</option>${[18,21,25,30,35,40,45,50].map(age=>`<option value="${age}" ${sourceAgeMin===String(age)?'selected':''}>${age}+</option>`).join('')}</select></label><label>Maximum age<select name="ageMax"><option value="">Any age</option>${[25,30,35,40,45,50,55,60,65].map(age=>`<option value="${age}" ${sourceAgeMax===String(age)?'selected':''}>${age}</option>`).join('')}</select></label><button type="button" class="overseas-source-clear" data-clear-source-filters>Clear filters</button></div></form><p class="overseas-sourcing-count">${matches.length} sample resume${matches.length===1?'':'s'}</p><div class="overseas-sourcing-results">${matches.map(candidate=>{const profileAge=Number(candidate.age)||22+profiles.indexOf(candidate)%34;const digits=String(917000000+profiles.indexOf(candidate)*137).slice(-9);const email=`${candidate.name.toLowerCase().replace(/[^a-z]+/g,'.').replace(/^\\.|\\.$/g,'')}@sample.invalid`;return `<article class="overseas-source-candidate ${selectedSourceProfileName===candidate.name?'selected':''}" data-view-source="${escape(candidate.name)}" tabindex="0" role="button" aria-label="View full profile for ${escape(candidate.name)}"><div><span class="overseas-sourcing-avatar">${escape(candidate.initials)}</span></div><section><h3>${escape(candidate.name)}</h3><p>${escape(candidate.role)} · ${escape(candidate.area)} · ${escape(candidate.location)}</p><p>${escape(candidate.summary)}</p><div class="overseas-source-skills">${(candidate.skills || []).map(skill=>`<span>${escape(skill)}</span>`).join('')}</div><small>${candidate.experience} year${candidate.experience===1?'':'s'} experience · Age ${profileAge} · ${escape(candidate.education)}</small><div class="overseas-source-contact"><span>☎ +63 917 ${digits.slice(3,6)} ${digits.slice(6)}</span><span>✉ ${escape(email)}</span></div></section><button type="button" data-save-source="${escape(candidate.name)}">Keep for reference</button></article>`}).join('') || '<div class="overseas-empty-state">No matching sample resumes. Try adjusting the keyword or advanced filters.</div>'}</div>${(()=>{const candidate=profiles.find(item=>item.name===selectedSourceProfileName&&matches.includes(item));if(!candidate)return '';const profileAge=Number(candidate.age)||22+profiles.indexOf(candidate)%34;const digits=String(917000000+profiles.indexOf(candidate)*137).slice(-9);const email=`${candidate.name.toLowerCase().replace(/[^a-z]+/g,'.').replace(/^\\.|\\.$/g,'')}@sample.invalid`;return `<section class="overseas-source-profile-panel"><button type="button" data-close-source-profile aria-label="Close candidate profile">×</button><p class="eyebrow">FULL SAMPLE PROFILE</p><h3>${escape(candidate.name)}</h3><p>${escape(candidate.role)} · ${escape(candidate.area)} · ${escape(candidate.location)}</p><div class="overseas-source-contact"><span>☎ +63 917 ${digits.slice(3,6)} ${digits.slice(6)}</span><span>✉ ${escape(email)}</span></div><h4>Professional summary</h4><p>${escape(candidate.summary)}</p><h4>Experience · ${candidate.experience} years</h4>${(candidate.work||[]).map(item=>`<p>${escape(item)}</p>`).join('')}<h4>Education · Age ${profileAge}</h4><p>${escape(candidate.education)}</p><h4>Skills</h4><div class="overseas-source-skills">${(candidate.skills||[]).map(skill=>`<span>${escape(skill)}</span>`).join('')}</div></section>`})()}<p class="overseas-compliance-note">Sample resume search only. Candidate data is fictional; contact details are generated demo data.</p>`;
  }

  function renderInquiries() {
    const inquiries = state.inquiries || [];
    return `<div class="overseas-section-header"><div><p class="eyebrow">B2B LEAD GENERATION</p><h2>Employer inquiries</h2><p>Sample requests from overseas employers seeking Philippine recruitment partners.</p></div></div><div class="overseas-inquiry-grid">${(inquiries.length ? inquiries : [{company:'Northstar Hospitality Group',country:'United Arab Emirates',need:'Hospitality and guest services',count:24},{company:'Pacific Manufacturing Co.',country:'Taiwan',need:'Production and assembly roles',count:40},{company:'Pearl Care Network',country:'Bahrain',need:'Care and facilities staff',count:12}]).map(item=>`<article><span class="overseas-inquiry-tag">Employer request · Sample</span><h3>${escape(item.company)}</h3><p>${escape(item.need)} · ${Number(item.count)} workers</p><small>Destination: ${escape(item.country)}</small><button type="button" data-inquiry="${escape(item.company)}">View inquiry</button></article>`).join('')}</div><p class="overseas-demo-callout">Directory entries are fictional and are provided for practice only.</p>`;
  }

  function renderBilling() {
    return `<div class="overseas-section-header"><div><p class="eyebrow">ACCOUNT BILLING</p><h2>Deposit slip uploader</h2><p>Practice the manual payment-verification workflow.</p></div></div><form class="overseas-billing-form" data-billing-form><label>Payment reference<input name="reference" required maxlength="80" placeholder="e.g. DEMO-2025-001"></label><label>Payment amount<input name="amount" required type="number" min="1" step="0.01" placeholder="0.00"></label><label>Upload receipt (PDF, JPG or PNG · under 2 MB)<input name="receipt" type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" required></label><p class="overseas-compliance-note">Demo only. Do not upload real receipts or financial information. Uploads are checked locally and are not transmitted.</p><button type="submit" class="overseas-primary-button">Queue demo verification</button><p data-billing-status role="status"></p></form>`;
  }

  function jobFormMarkup(job = null) {
    const edit = job || {};
    return `<div class="overseas-job-form-backdrop" data-job-form-backdrop hidden><form class="overseas-job-form" data-job-form><button type="button" class="overseas-modal-close" data-close-job aria-label="Close">×</button><p class="eyebrow">STEP 1 · ROLE DETAILS</p><h2>${job ? 'Edit job ad' : 'Create overseas job ad'}</h2><p class="overseas-form-note">Fictional learning exercise. Do not upload real accreditation or personal documents.</p><input type="hidden" name="id" value="${escape(edit.id || '')}"><div class="overseas-form-grid"><label>Job title<input name="title" required maxlength="100" value="${escape(edit.title || '')}" placeholder="e.g. Hospitality Associate"></label><label>Vacancy count<input name="openings" type="number" min="1" max="999" required value="${escape(edit.openings || 1)}"></label><label>Specialization<input name="specialization" required maxlength="80" value="${escape(edit.specialization || '')}" placeholder="e.g. Hospitality"></label><label>Destination country<select name="country" required><option value="">Select country</option>${['Bahrain','Qatar','Saudi Arabia','Taiwan','United Arab Emirates','Kuwait','Singapore','Canada','New Zealand'].map(country=>`<option ${edit.country===country?'selected':''}>${country}</option>`).join('')}</select></label><label>City / state<input name="city" required maxlength="80" value="${escape(edit.city || '')}" placeholder="Select or enter city"></label><label>Existing Job Order<select name="jo" required><option value="">Choose matching job order</option>${[['JO-BHR-001','Cleaner — Bahrain'],['JO-UAE-002','Waitress — UAE'],['JO-TWN-003','Factory Worker — Taiwan'],['JO-TWN-004','Teacher — Taiwan'],['JO-KSA-005','Domestic Helper — KSA']].map(([id,label])=>`<option value="${id}" ${edit.jo===id?'selected':''}>${id} · ${label}</option>`).join('')}</select></label><label>Employer name<input name="company" required maxlength="100" value="${escape(edit.company || '')}" placeholder="Sample employer"></label><label>Employer address<input name="address" required maxlength="180" value="${escape(edit.address || '')}" placeholder="Employer office address"></label><label>Experience required<input name="experience" required maxlength="100" value="${escape(edit.experience || '')}" placeholder="e.g. 2 years related experience"></label><label>Education required<input name="education" required maxlength="120" value="${escape(edit.education || '')}" placeholder="e.g. High school graduate"></label><label>Salary / compensation<input name="salary" required maxlength="100" value="${escape(edit.salary || '')}" placeholder="e.g. AED 3,500 / month"></label><label>Employment type<select name="type"><option>Full-time</option><option>Contract</option><option>Seasonal</option><option>Temporary</option></select></label></div><div class="overseas-conditional-fields" data-conditional-fields hidden><strong>Additional eligibility filters</strong><label><input type="checkbox" name="muslimOnly"> Muslim applicants only</label><label>Gender consideration<select name="gender"><option value="">No filter</option><option>Female</option><option>Male</option></select></label><small>Use only lawful, job-related criteria; local laws and DMW requirements apply.</small></div><fieldset class="overseas-qualification-fields"><legend>Minimum 3 qualification details · 30 characters each</legend><label>Qualification 1<textarea name="qualification1" required minlength="30" maxlength="500" placeholder="Describe a role-related qualification in at least 30 characters."></textarea></label><label>Qualification 2<textarea name="qualification2" required minlength="30" maxlength="500" placeholder="Describe another job-related qualification in at least 30 characters."></textarea></label><label>Qualification 3<textarea name="qualification3" required minlength="30" maxlength="500" placeholder="Add a third job-related qualification in at least 30 characters."></textarea></label></fieldset><p class="eyebrow overseas-form-step-label">STEP 2 · COMPLIANCE DETAILS</p><div class="overseas-form-grid"><label>DMW registration / accreditation number<input name="accreditation" required maxlength="80" pattern="[A-Za-z0-9/-]{4,80}" title="Enter a demo registration number using letters, numbers, / or -."></label><label>Manpower pooling<select name="pooling"><option>Not pooling</option><option>Pooling disclosed</option></select></label><label>Placement fee policy<select name="fee"><option>No placement fee</option><option>Applicable lawful fees disclosed</option></select></label><label>Accreditation support document (PDF/JPG/PNG · under 2 MB)<input name="document" type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" required></label></div><label class="overseas-attestation"><input name="attestation" type="checkbox" required><span>I certify that this is a fictional learning exercise and acknowledge the Section 76(b) anti-illegal recruitment compliance attestation as a simulation requirement.</span></label><label>Role description<textarea name="description" rows="4" required maxlength="1200" placeholder="Responsibilities and role-related qualifications.">${escape(edit.description || '')}</textarea></label><div class="overseas-form-actions"><p data-job-form-status role="status"></p><button type="submit" class="overseas-primary-button" data-publish-button disabled>Preview & publish demo ad</button></div></form></div>`;
  }

  function updateSelected() {
    const chosen = panel.querySelectorAll('[data-select-application]:checked');
    const count = panel.querySelector('[data-selected-count]');
    const move = panel.querySelector('[data-bulk-move]');
    if (count) count.textContent = `${chosen.length} selected`;
    if (move) move.disabled = !chosen.length || !panel.querySelector('[data-bulk-status]')?.value;
  }

  panel.addEventListener('click', event => {
    const modeButton = event.target.closest('[data-mode]');
    if (modeButton) { mode = modeButton.dataset.mode; section = 'dashboard'; render(); return; }
    const applicantTabButton = event.target.closest('[data-applicant-tab]');
    if (applicantTabButton) { applicantPageTab = applicantTabButton.dataset.applicantTab; render(); return; }
    const searchModeButton = event.target.closest('[data-search-mode]');
    if (searchModeButton) { applicantSearchMode = searchModeButton.dataset.searchMode; applicantCountry = ''; applicantSpecialization = ''; selectedApplicantJobId = ''; render(); return; }
    const countryButton = event.target.closest('[data-country]');
    if (countryButton) { applicantSearchMode = 'country'; applicantCountry = countryButton.dataset.country; applicantSpecialization = ''; applicantQuery = ''; selectedApplicantJobId = ''; render(); return; }
    if (event.target.closest('[data-open-resume]')) { document.getElementById('profile-edit-button')?.click(); return; }
    const saveJobButton = event.target.closest('[data-save-job]');
    if (saveJobButton) {
      const id = saveJobButton.dataset.saveJob;
      savedApplicantJobs = savedApplicantJobs.includes(id) ? savedApplicantJobs.filter(savedId => savedId !== id) : [...savedApplicantJobs, id];
      try { localStorage.setItem(`${DATA_KEY}:saved`, JSON.stringify(savedApplicantJobs)); } catch {}
      render(); return;
    }
    const selectedJobCard = event.target.closest('[data-select-job]');
    if (selectedJobCard) { selectedApplicantJobId = selectedJobCard.dataset.selectJob; render(); return; }
    const shareButton = event.target.closest('[data-share-job]');
    if (shareButton) {
      const job = state.jobs.find(item => item.id === shareButton.dataset.shareJob) || countrySampleJobs.find(item => item.id === shareButton.dataset.shareJob);
      const message = panel.querySelector('[data-share-message]');
      if (job && navigator.share) navigator.share({title:job.title,text:`${job.title} at ${job.company}`}).catch(() => {});
      else if (message) message.textContent = 'Use your browser’s address bar to share this demo listing.';
      return;
    }
    if (event.target.closest('[data-account-menu]')) { const menu = panel.querySelector('[data-account-menu-panel]'); menu.hidden = !menu.hidden; event.target.setAttribute('aria-expanded', String(!menu.hidden)); return; }
    if (event.target.closest('[data-sign-out]')) { document.getElementById('logout-button')?.click(); return; }
    const sectionButton = event.target.closest('[data-section]');
    if (sectionButton) { section = sectionButton.dataset.section; if(section==='applicants')applicantTab='online'; render(); return; }
    if (event.target.closest('[data-show-sourcing]')) { applicantTab='sourcing'; render(); return; }
    if (event.target.closest('[data-show-online]')) { applicantTab='online'; render(); return; }
    if (event.target.closest('[data-toggle-source-filters]')) { sourceAdvancedOpen = !sourceAdvancedOpen; render(); return; }
    if (event.target.closest('[data-clear-source-filters]')) { sourceArea=''; sourceLocation=''; sourceWorkplace=''; sourceEducation=''; sourceSkill=''; sourceAgeMin=''; sourceAgeMax=''; sourceExperience=0; sourceQuery=''; selectedSourceProfileName=''; render(); return; }
    if (event.target.closest('[data-close-source-profile]')) { selectedSourceProfileName=''; render(); return; }
    const sourceProfile = event.target.closest('[data-view-source]');
    if (sourceProfile && !event.target.closest('[data-save-source]')) { selectedSourceProfileName=sourceProfile.dataset.viewSource; render(); return; }
    const saveSource = event.target.closest('[data-save-source]');
    if (saveSource) {
      const name=saveSource.dataset.saveSource;
      if(!state.applications.some(item=>item.sourceName===name)){
        const candidate=typeof candidates!=='undefined'?candidates.find(item=>item.name===name):null;
        if(candidate)state.applications.push({id:`source-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,sourceName:name,jobId:'talent-sourcing',jobTitle:'Talent sourcing reference',applicantName:candidate.name,applicantEmail:`${candidate.name.toLowerCase().replace(/[^a-z]+/g,'.').replace(/^\\.|\\.$/g,'')}@sample.invalid`,status:'Kept for Reference',appliedAt:'Saved from resume search',notes:'',profile:candidate.summary});
        save(state);
      }
      activeFolder='Kept for Reference';applicantTab='online';render();return;
    }
    if (event.target.closest('[data-open-job-form]')) { const backdrop = panel.querySelector('[data-job-form-backdrop]'); backdrop.hidden = false; backdrop.querySelector('[name="title"]').focus(); return; }
    if (event.target.closest('[data-close-job]') || event.target.matches('[data-job-form-backdrop]')) { panel.querySelector('[data-job-form-backdrop]').hidden = true; return; }
    const folder = event.target.closest('[data-folder]');
    if (folder) { activeFolder = folder.dataset.folder; render(); return; }
    if (event.target.closest('[data-select-all]')) { const checked = event.target.checked; panel.querySelectorAll('[data-select-application]').forEach(box => box.checked = checked); updateSelected(); return; }
    if (event.target.closest('[data-bulk-move]')) { const status = panel.querySelector('[data-bulk-status]').value; if (!status) return; const ids = [...panel.querySelectorAll('[data-select-application]:checked')].map(box => box.dataset.selectApplication); state.applications.forEach(item => { if (ids.includes(item.id)) item.status = status; }); save(state); activeFolder = status; render(); return; }
    if (event.target.closest('[data-save-applicant]')) { const id = event.target.closest('[data-save-applicant]').dataset.saveApplicant; const item = state.applications.find(app => app.id === id); if (item) { item.status = panel.querySelector(`[data-applicant-status="${CSS.escape(id)}"]`).value; item.notes = panel.querySelector(`[data-applicant-note="${CSS.escape(id)}"]`).value.trim(); save(state); render(); } return; }
    const applicant = event.target.closest('[data-view-applicant]');
    if (applicant) { const item = state.applications.find(app => app.id === applicant.dataset.viewApplicant); const detail = panel.querySelector('[data-applicant-detail]'); if (item && detail) { detail.hidden = false; detail.innerHTML = `<button type="button" data-close-detail>Close</button><p class="eyebrow">PRACTICE CV</p><h3>${escape(item.applicantName)}</h3><p>${escape(item.jobTitle)} · ${escape(item.applicantEmail)}</p><p><strong>Applicant notes:</strong> ${escape(item.profile || 'No optional profile details added.')}</p><label>Internal comments<textarea data-detail-note="${escape(item.id)}" rows="3">${escape(item.notes || '')}</textarea></label><button type="button" data-detail-save="${escape(item.id)}">Save notes</button></div>`; } return; }
    if (event.target.closest('[data-close-detail]')) { const detail = panel.querySelector('[data-applicant-detail]'); if (detail) detail.hidden = true; return; }
    const detailSave = event.target.closest('[data-detail-save]');
    if (detailSave) { const item = state.applications.find(app => app.id === detailSave.dataset.detailSave); if (item) { item.notes = panel.querySelector('[data-detail-note]').value.trim(); save(state); render(); section = 'applicants'; } return; }
    if (event.target.closest('[data-email-applicants]')) { const modal = panel.querySelector('[data-email-modal]'); if (modal) modal.hidden = false; return; }
    if (event.target.closest('[data-close-email]')) { const modal = panel.querySelector('[data-email-modal]'); if (modal) modal.hidden = true; return; }
    const apply = event.target.closest('[data-apply-job]');
    if (apply) {       const job = state.jobs.find(item => item.id === apply.dataset.applyJob) || countrySampleJobs.find(item => item.id === apply.dataset.applyJob); const user = currentAccount(); if (!job || state.applications.some(item => item.jobId === job.id && item.applicantEmail === user.email)) return; state.applications.push({id:`application-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,jobId:job.id,jobTitle:job.title,company:job.company,country:job.country,applicantName:user.name || 'Demo applicant',applicantEmail:user.email || 'applicant@example.test',status:'Unprocessed',appliedAt:new Date().toLocaleDateString(),notes:'',profile:user.skills || ''}); save(state); applicantPageTab='applications'; render(); return; }
    const edit = event.target.closest('[data-edit-job]');
    if (edit) { const job = state.jobs.find(item => item.id === edit.dataset.editJob); if (job) { panel.querySelector('[data-job-form-backdrop]').outerHTML = jobFormMarkup(job); const backdrop=panel.querySelector('[data-job-form-backdrop]'); backdrop.hidden=false; backdrop.querySelector('[name="country"]')?.dispatchEvent(new Event('change',{bubbles:true})); backdrop.querySelector('[name="title"]')?.focus(); } return; }
    const inquiry = event.target.closest('[data-inquiry]');
    if (inquiry) { const company = inquiry.dataset.inquiry; state.inquiries ||= []; if (!state.inquiries.some(item => item.company === company)) state.inquiries.push({company,need:'Inquiry saved for follow-up',country:'Sample destination',count:0}); save(state); section='inquiries'; render(); return; }
  });

  panel.addEventListener('keydown', event => {
    const profile = event.target.closest('[data-view-source]');
    if (profile && event.target === profile && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      selectedSourceProfileName = profile.dataset.viewSource;
      render();
      return;
    }
    const card = event.target.closest('[data-select-job]');
    if (card && event.target === card && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      selectedApplicantJobId = card.dataset.selectJob;
      render();
    }
  });

  panel.addEventListener('change', event => {
    if (event.target.matches('[name="attestation"]')) { const button=panel.querySelector('[data-publish-button]'); if(button)button.disabled=!event.target.checked; }
    if (event.target.matches('[data-select-application]')) updateSelected();
    if (event.target.matches('[data-bulk-status]')) updateSelected();
    if (event.target.matches('[data-job-form] [name="country"]')) {
      const country = event.target.value, city = panel.querySelector('[data-job-form] [name="city"]'), conditional = panel.querySelector('[data-conditional-fields]');
      const cities = {'United Arab Emirates':'Dubai','Saudi Arabia':'Riyadh','Qatar':'Doha','Bahrain':'Manama','Taiwan':'Taipei','Kuwait':'Kuwait City','Singapore':'Singapore','Canada':'Toronto','New Zealand':'Auckland'};
      if (city && cities[country]) city.value = cities[country];
      if (conditional) conditional.hidden = !['Saudi Arabia','United Arab Emirates','Qatar','Kuwait','Bahrain'].includes(country);
    }
  });

  panel.addEventListener('submit', event => {
    if (event.target.matches('[data-applicant-search]')) {
      event.preventDefault();
      const data = new FormData(event.target);
      applicantSearchMode = 'specialization';
      applicantQuery = String(data.get('query') || '');
      applicantCountry = String(data.get('country') || '');
      applicantSpecialization = String(data.get('specialization') || '');
      render(); return;
    }
    if (event.target.matches('[data-sourcing-form]')) {
      event.preventDefault();
      const data = new FormData(event.target);
      sourceQuery = String(data.get('query') || '');
      sourceExperience = Number(data.get('experience') || 0);
      sourceArea = String(data.get('area') || '');
      sourceLocation = String(data.get('location') || '');
      sourceWorkplace = String(data.get('workplace') || '');
      sourceEducation = String(data.get('education') || '');
      sourceSkill = String(data.get('skill') || '');
      sourceAgeMin = String(data.get('ageMin') || '');
      sourceAgeMax = String(data.get('ageMax') || '');
      applicantTab = 'sourcing';
      render();
      return;
    }
    if (event.target.matches('[data-job-form]')) {
      event.preventDefault();
      const form = event.target, data = new FormData(form), status = form.querySelector('[data-job-form-status]');
      const file = data.get('document');
      if (file?.size) {
        const allowed = ['application/pdf','image/jpeg','image/png'];
        if (!allowed.includes(file.type) || file.size >= 2 * 1024 * 1024) { status.textContent = 'Choose a PDF, JPG, or PNG smaller than 2 MB.'; return; }
      }
      const qualifications = ['qualification1','qualification2','qualification3'].map(key => String(data.get(key) || '').trim());
      if (qualifications.some(value => value.length < 30)) { status.textContent = 'Each of the three qualification fields needs at least 30 characters.'; return; }
      const joRules = {'JO-BHR-001':{role:/cleaner/i,country:'Bahrain'},'JO-UAE-002':{role:/waitress/i,country:'United Arab Emirates'},'JO-TWN-003':{role:/factory worker/i,country:'Taiwan'},'JO-TWN-004':{role:/teacher/i,country:'Taiwan'},'JO-KSA-005':{role:/domestic helper/i,country:'Saudi Arabia'}};
      const chosenOrder = joRules[String(data.get('jo'))];
      if (chosenOrder && (!chosenOrder.role.test(String(data.get('title'))) || chosenOrder.country !== String(data.get('country')))) { status.textContent = 'The job title and destination must match the selected Job Order.'; return; }
      const job = {id:String(data.get('id') || `job-${Date.now()}`),title:String(data.get('title')).trim(),openings:Number(data.get('openings')),specialization:String(data.get('specialization')).trim(),country:String(data.get('country')),city:String(data.get('city')).trim(),jo:String(data.get('jo')),company:String(data.get('company')).trim(),address:String(data.get('address')).trim(),experience:String(data.get('experience')).trim(),education:String(data.get('education')).trim(),salary:String(data.get('salary')).trim(),type:String(data.get('type')),description:String(data.get('description')).trim(),qualifications,accreditation:String(data.get('accreditation')).trim(),pooling:String(data.get('pooling')),fee:String(data.get('fee')),muslimOnly:data.has('muslimOnly'),gender:String(data.get('gender') || ''),status:'Active'};
      const existing = state.jobs.findIndex(item => item.id === job.id);
      if (existing >= 0) state.jobs[existing] = {...state.jobs[existing],...job}; else state.jobs.unshift(job);
      if (!save(state)) { status.textContent = 'Could not save. Browser storage may be full.'; return; }
      section = 'jobs'; render(); return;
    }
    if (event.target.matches('[data-email-form]')) {
      event.preventDefault();
      const form = event.target, data = new FormData(form);
      state.lastApplicantDraft = {folder:activeFolder,subject:String(data.get('subject')).trim(),message:String(data.get('message')).trim(),savedAt:new Date().toISOString()};
      save(state); form.querySelector('[data-email-confirmation]').textContent = 'Draft saved locally. No email was sent.'; form.querySelector('button[type="submit"]').disabled = true; return;
    }
    if (event.target.matches('[data-billing-form]')) {
      event.preventDefault(); const form=event.target,file=form.elements.receipt.files[0],status=form.querySelector('[data-billing-status]');
      if (!file || file.size >= 2*1024*1024 || !['application/pdf','image/jpeg','image/png'].includes(file.type)) { status.textContent='Choose a PDF, JPG, or PNG smaller than 2 MB.'; return; }
      status.textContent='Demo verification request queued locally. No payment information was sent.'; form.reset();
    }
  });

  panel.addEventListener('input', event => {
    if (event.target.matches('[data-applicant-note]')) {
      const item = state.applications.find(app => app.id === event.target.dataset.applicantNote);
      if (item) { item.notes = event.target.value; save(state); }
    }
  });

  render();
})();
