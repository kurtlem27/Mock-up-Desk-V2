(() => {
  const root = document.getElementById('learning-view');
  if (!root || root.querySelector('[data-module-number="9"].modern-learning-module')) return;

  const objectives = [
    'Explain the recruitment onboarding process for local and overseas applicants.',
    'Identify and collect role- and destination-appropriate applicant documents.',
    'Evaluate the completeness, readability, validity and applicability of submitted requirements.',
    'Describe coordination among recruitment, HR, employers and relevant government agencies.',
    'Monitor applicants from screening through hiring or deployment.',
    'Use digital tools for applicant communication, document tracking and authorized email campaigns.'
  ];
  const workflow = [
    ['Applicant registration', 'Collect contact details, employment history and preferred position.'],
    ['Initial screening', 'Compare qualifications, education and experience with the role.'],
    ['Requirements collection', 'Share a checklist tailored to the position and destination.'],
    ['Document verification', 'Review completeness, readability, validity and applicable rules.'],
    ['Employer interview and selection', 'Coordinate interviews, assessments and clear outcome updates.'],
    ['Pre-employment processing', 'Coordinate applicable medical checks, clearances and contracts.'],
    ['Deployment or hiring', 'Complete required final steps, orientation and handover.'],
    ['Post-deployment monitoring', 'Follow up on the worker’s transition and workplace adjustment.']
  ];
  const localRequirements = [
    ['Updated resume/CV', 'Employment history and qualifications'], ['Valid government-issued ID', 'Identity verification'],
    ['PSA birth certificate', 'Personal information, when required'], ['Diploma / Transcript of Records', 'Educational verification'],
    ['Certificate of Employment', 'Previous work experience, when applicable'], ['NBI or police clearance', 'Background verification, when required'],
    ['Medical examination', 'Fitness for work, when required'], ['SSS, PhilHealth, Pag-IBIG, TIN', 'Employment and payroll processing, as applicable'],
    ['Signed employment contract', 'Terms and conditions of employment'], ['Job-specific certificates', 'Professional or technical qualifications, when required']
  ];
  const overseasRequirements = [
    ['Updated resume/CV', 'Applicant qualifications'], ['Valid passport', 'International travel identification'],
    ['Educational credentials', 'Qualification verification'], ['Certificates / licenses', 'Professional eligibility, when applicable'],
    ['Certificate of Employment', 'Work experience verification'], ['NBI clearance', 'Background documentation, when applicable'],
    ['Medical examination', 'Destination and employer requirements'], ['Employment contract', 'Agreed employment conditions'],
    ['Work visa / work permit', 'Legal authorization to work abroad'], ['Applicable DMW / OFW travel documentation', 'Required Philippine processing and departure clearance, as applicable'],
    ['Pre-Departure Orientation Seminar (PDOS)', 'Worker orientation, as applicable']
  ];
  const statuses = ['New Applicant', 'For Screening', 'For Requirements', 'Incomplete', 'For Verification', 'For Interview', 'Selected', 'For Processing', 'Ready for Deployment', 'Deployed / Hired', 'On Hold', 'Not Qualified'];
  const assessment = [
    ['What is the first step in the onboarding journey?', ['Deployment', 'Applicant registration', 'Post-deployment monitoring'], 1],
    ['What best distinguishes local from overseas deployment?', ['Overseas processes can add destination-country immigration and applicable Philippine overseas processing', 'Local applicants never submit documents', 'Both pathways always have identical requirements'], 0],
    ['Why verify submitted documents?', ['To collect as many files as possible', 'To check completeness, readability, validity and applicability', 'To guarantee selection'], 1],
    ['Which Philippine government department currently oversees overseas worker matters?', ['Department of Migrant Workers (DMW)', 'Department of Tourism', 'Department of Information and Communications Technology'], 0],
    ['What does an employment contract do?', ['Records agreed employment terms for the parties', 'Replaces all immigration authorization', 'Guarantees promotion'], 0],
    ['How is an email marketing platform different from an HRIS?', ['Campaign platforms support authorized bulk communications; an HRIS manages workforce information and HR processes', 'They are the same system', 'An HRIS is only for sending newsletters'], 0],
    ['Which listed platform also offers CRM and contact-management features?', ['HubSpot', 'Calculator', 'File Explorer'], 0],
    ['Why monitor incomplete requirements?', ['To identify the next action and reduce avoidable processing delays', 'To automatically reject every applicant', 'To share documents with more people'], 0],
    ['Where should passports and medical records be handled?', ['In an approved secure, access-controlled channel', 'In a public mailing list', 'In an open social media group'], 0]
  ];

  const esc = value => String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const table = (headings, rows) => `<div class="m9-table-wrap"><table><thead><tr>${headings.map(item => `<th>${esc(item)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const reqChecklist = rows => table(['Requirement', 'Purpose'], rows);
  const lessonData = [
    ['LOCAL ONBOARDING', 'Collect local requirements thoughtfully', 'Recruitment officers collect and review evidence against the employer’s documented job requirements. Not every employer requires every document before hiring. Confirm what applies to the role and the stage of the process.', ['Send a tailored checklist and explain acceptable formats.', 'Receive files through an authorized channel; check that each is complete and readable.', 'Identify missing, expired or unclear items; ask for a correction without altering source documents.', 'Record status and next action, then forward verified requirements only to the authorized HR or employer contact.']],
    ['OVERSEAS ONBOARDING', 'Add destination and deployment checks', 'Overseas recruitment can involve additional employer, destination-country immigration and Philippine overseas employment processing. Requirements vary by job, destination and current rules, so verify the applicable checklist with authorized agency staff and official sources.', ['Match the applicant to a verified job order and employer requirements.', 'Verify credentials, experience and licenses through appropriate channels.', 'Coordinate interviews, applicable medical checks, contract signing, visa/work-permit processing and current DMW requirements.', 'Confirm applicable departure documentation, orientation and deployment readiness before travel coordination.']],
    ['TRACKING & COORDINATION', 'Make the applicant journey visible', 'A tracker gives recruitment, HR and authorized employer representatives a shared view of progress and ownership. Use role-based access, accurate timestamps and clear next steps. A signed contract alone does not make an overseas applicant deployment-ready.', ['New Applicant → For Screening → For Requirements / Incomplete → For Verification.', 'For Interview → Selected → For Processing → Ready for Deployment → Deployed / Hired.', 'Use On Hold or Not Qualified only with a clear, documented reason and appropriate communication.', 'Keep sensitive files out of campaign lists and general-purpose notes.']],
    ['PROFESSIONAL COMMUNICATION', 'Choose the right message and channel', 'Use clear, courteous email to explain actions and deadlines. Recruitment campaign platforms are useful for authorized vacancy announcements and opted-in audiences; individual applicant updates and confidential documents belong in approved, access-controlled channels.', ['State the role, next action, deadline and submission channel clearly.', 'Use accurate templates and personalize only with verified, necessary information.', 'Respect communication preferences and unsubscribe choices for campaigns.', 'Never use marketing lists to distribute passports, medical records, contracts or other confidential files.']]
  ];
  const lessons = lessonData.map((lesson, index) => `<details class="recruitment-lesson-card"><summary><span class="recruitment-lesson-number">0${index + 1}</span><span><small>${esc(lesson[0])}</small><strong>${esc(lesson[1])}</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>${esc(lesson[2])}<\/p><ul>${lesson[3].map(item => `<li>${esc(item)}</li>`).join('')}</ul></div></details>`).join('');
  const path = workflow.map((step, index) => `<article class="learning-journey-card"><span>${String(index + 1).padStart(2, '0')}</span><h3>${esc(step[0])}</h3><p>${esc(step[1])}</p></article>`).join('');
  const objectiveList = objectives.map(item => `<li>${esc(item)}</li>`).join('');
  const statusOptions = statuses.map(status => `<option>${esc(status)}</option>`).join('');
  const assessmentMarkup = assessment.map((item, index) => `<label class="m9-question"><span>${index + 1}. ${esc(item[0])}</span><select data-m9-answer="${index}"><option value="">Choose an answer</option>${item[1].map((answer, answerIndex) => `<option value="${answerIndex}">${esc(answer)}</option>`).join('')}</select></label>`).join('');
  const learningCard = document.createElement('article');
  learningCard.className = 'learning-resource recruitment-learning-launch-card learning-module-card';
  learningCard.dataset.moduleNumber = '9';
  learningCard.tabIndex = 0;
  learningCard.setAttribute('role', 'button');
  learningCard.setAttribute('aria-label', 'Open learning module 9: From Applicant to Deployment');
  learningCard.innerHTML = `<span class="recruitment-launch-topline"><span class="recruitment-launch-kicker">LEARNING HUB · MODULE 09 · RECRUITMENT ONBOARDING</span><span class="recruitment-launch-status" data-learning-status hidden></span></span><span class="learning-card-icon" aria-hidden="true">⇢</span><span class="recruitment-launch-title">From Applicant to Deployment: Understanding Local and Overseas Recruitment Onboarding</span><span class="recruitment-launch-description">Follow a Philippine recruitment agency workflow with document checks, applicant tracking, communication practice and deployment-readiness scenarios.</span><span class="learning-card-meta"><span>Interactive scenario</span><span>Local &amp; overseas pathways</span></span><button class="recruitment-teacher-progress-toggle" type="button" data-teacher-progress-toggle aria-expanded="false">Progress</button><div class="recruitment-teacher-progress" data-teacher-progress hidden></div>`;

  const module = document.createElement('section');
  module.className = 'recruitment-learning-module modern-learning-module learning-course-9';
  module.dataset.moduleNumber = '9';
  module.id = 'learning-module-9';
  module.hidden = true;
  module.setAttribute('aria-labelledby', 'learning-module-9-title');
  module.innerHTML = `
    <nav class="recruitment-module-controls" aria-label="Module navigation"><button type="button" data-module-close aria-label="Close module and return to learning modules" title="Close module">×</button></nav>
    <header class="recruitment-course-hero modern-course-hero m9-hero"><div class="recruitment-course-hero-copy"><p class="recruitment-course-kicker"><span>LEARNING MODULE 09</span><span>INTERACTIVE · SCENARIO-BASED</span></p><h1 id="learning-module-9-title">From Applicant to Deployment: Understanding Local and Overseas Recruitment Onboarding</h1><p class="recruitment-course-subtitle">Learn the process. Master the requirements. Prepare for deployment.</p><p class="recruitment-course-intro">Simulate the workflow of a Philippine recruitment agency, from applicant registration and requirements collection to local hiring or safe overseas deployment. Local and overseas pathways share a foundation but differ in documents, screening, compliance and final steps.</p><div class="recruitment-course-tags"><span>Philippine recruitment</span><span>Local &amp; overseas</span><span>Practice with fictional records</span></div><button class="recruitment-start-button" type="button" data-course-start>Start the learning journey <span aria-hidden="true">↗</span></button></div><div class="modern-hero-art" aria-hidden="true"><span class="modern-hero-orbit"></span><span class="modern-hero-number">09</span><span class="modern-hero-label">SCREEN · VERIFY · DEPLOY</span><span class="modern-hero-spark">✦</span></div></header>
    <div class="recruitment-course-content">
      <section class="learning-module-overview"><div><p class="recruitment-eyebrow">LEARNING OBJECTIVES</p><h2>What you’ll be able to do</h2><p>By the end of this module, learners can:</p></div><ol>${objectiveList}</ol></section>
      <section class="recruitment-lesson-section"><div class="recruitment-section-heading"><div><p class="recruitment-eyebrow">APPLICANT-TO-DEPLOYMENT WORKFLOW</p><h2>Eight coordinated steps</h2><p>Each stage has an owner, evidence and a clear next action.</p></div><span class="recruitment-progress-label" data-progress-label>0 of 4 complete</span></div><div class="learning-journey-grid">${path}</div></section>
      <section class="recruitment-lesson-section m9-deployment-compare"><div class="recruitment-section-heading"><div><p class="recruitment-eyebrow">TWO PATHWAYS · SHARED CARE</p><h2>Local hiring vs. overseas deployment</h2></div></div><div class="m9-pathway-grid"><article><span>LOCAL DEPLOYMENT</span><h3>Philippine employment</h3><p>Recruitment for companies and employers operating within the Philippines.</p><ul><li>Follow the employer’s documented, job-related checklist.</li><li>Coordinate recruitment and local HR/payroll processing.</li><li>Complete applicable hiring steps and workplace orientation.</li></ul></article><article><span>OVERSEAS DEPLOYMENT</span><h3>International employment</h3><p>Recruitment and deployment of Filipino workers to foreign employers.</p><ul><li>Include verified job-order, employer and destination requirements.</li><li>Coordinate applicable DMW processing and destination visa/work authorization.</li><li>Confirm all applicable departure and deployment conditions before travel.</li></ul></article></div><p class="learning-safety-note"><strong>Important:</strong> Requirements vary by position, employer, destination and current rules. Use the authorized, current checklist; do not treat every item below as universally required.</p></section>
      <section class="recruitment-lesson-section"><div class="recruitment-section-heading"><div><p class="recruitment-eyebrow">COURSE CONTENT</p><h2>Explore the onboarding playbook</h2></div><span class="recruitment-section-mark">01—04</span></div><div class="recruitment-lesson-list">${lessons}</div>
        <details class="m9-reference-panel"><summary>Local requirements: examples and purpose</summary>${reqChecklist(localRequirements)}<ol class="m9-practical-steps"><li>Send the tailored checklist.</li><li>Explain acceptable file formats and the approved submission channel.</li><li>Check that each document is complete and readable.</li><li>Identify missing, expired or unclear documents.</li><li>Update status and next action; forward verified items only to authorized recipients.</li></ol></details>
        <details class="m9-reference-panel"><summary>Overseas requirements: examples and purpose</summary>${reqChecklist(overseasRequirements)}<ol class="m9-practical-steps"><li>Register and screen against a verified job order.</li><li>Collect initial documents and verify credentials, experience and licenses.</li><li>Arrange employer interviews and assessments.</li><li>Coordinate applicable medical examinations and contract signing.</li><li>Facilitate destination visa/work permit and current DMW processing.</li><li>Confirm applicable departure requirements, deployment readiness and flight arrangements.</li><li>Maintain appropriate post-deployment follow-up.</li></ol><p class="learning-safety-note"><strong>Industry reminder:</strong> A signed contract alone does not mean an overseas applicant is ready to deploy. Required government clearances, visa authorization and other applicable conditions must also be complete.</p></details>
      </section>
      <section class="learning-lab m9-tracker"><div class="learning-lab-heading"><span class="learning-lab-icon">01</span><div><p class="recruitment-eyebrow">APPLICANT REQUIREMENTS TRACKER · SIMULATION</p><h2>Juan Dela Cruz · Administrative Assistant</h2><p>Review fictional documents; select each item to simulate verification.</p></div></div><div class="m9-tracker-summary"><strong data-m9-count>3 of 7 complete</strong><span data-m9-status>4 outstanding requirements</span></div><div class="learning-checklist m9-document-list"><label><input type="checkbox" data-m9-document checked> Updated resume</label><label><input type="checkbox" data-m9-document checked> Valid government-issued ID</label><label><input type="checkbox" data-m9-document checked> Diploma / Transcript of Records</label><label><input type="checkbox" data-m9-document> Certificate of Employment</label><label><input type="checkbox" data-m9-document> NBI clearance, if required</label><label><input type="checkbox" data-m9-document> Medical examination, if required</label><label><input type="checkbox" data-m9-document> Signed employment contract</label></div><div class="m9-tracker-controls"><label>Applicant status<select data-m9-status>${statusOptions}</select></label><label>Next action<select data-m9-next><option>Request missing requirements</option><option>Review submitted documents</option><option>Schedule employer interview</option><option>Forward verified items to authorized HR</option><option>Confirm processing requirements</option></select></label></div><p class="learning-safety-note">A status is a workflow aid, not an automatic hiring decision. Keep this fictional simulation free of real passport, medical or other sensitive information.</p></section>
      <section class="learning-lab m9-email-lab"><div class="learning-lab-heading"><span class="learning-lab-icon">02</span><div><p class="recruitment-eyebrow">EMAIL PRACTICE · NO MESSAGE IS SENT</p><h2>Choose a professional applicant update</h2><p>Review a sample email, then adapt its subject and message for the scenario.</p></div></div><div class="learning-lab-grid"><label>Email template<select data-m9-template><option value="local">Local recruitment · requirements</option><option value="overseas">Overseas recruitment · requirements</option><option value="followup">Follow-up · outstanding requirements</option></select></label><label>Subject<input data-m9-subject value="Submission of Pre-Employment Requirements" maxlength="140"></label><label class="learning-lab-wide">Message<textarea data-m9-email rows="10" maxlength="1800">Dear Applicant,\n\nCongratulations on successfully passing the initial screening.\n\nPlease submit the following documents for the next stage of your application:\n- Updated resume\n- Valid government-issued ID\n- Diploma or Transcript of Records\n- Certificate of Employment, if applicable\n- Other position-specific requirements\n\nKindly submit your documents in PDF format through the designated secure submission channel.\n\nBest regards,\nRecruitment Department</textarea></label><div class="learning-lab-action"><button type="button" data-m9-email-review>Review email draft</button><p data-m9-email-feedback role="status" aria-live="polite"></p></div></div><p class="learning-safety-note">Use a secure, authorized channel for individual applicant updates and confidential documents. Campaign email is for permitted, relevant audiences—not passports, medical records or contracts.</p></section>
      <section class="recruitment-lesson-section"><div class="recruitment-section-heading"><div><p class="recruitment-eyebrow">EMAIL MARKETING TOOLS</p><h2>Choose the right platform and audience</h2><p>These established platforms have different strengths; features and pricing depend on current plans.</p></div></div>${table(['Platform', 'Examples of use'], [['Mailchimp', 'Beginner-friendly campaigns, newsletters, recruitment announcements and automated sequences'], ['Brevo', 'Email and SMS campaigns, notifications, contact management and transactional messages'], ['HubSpot', 'CRM/contact management, automation, lead management and campaign reporting'], ['MailerLite', 'Newsletters, landing pages, templates and automated campaigns'], ['ActiveCampaign', 'Advanced automation, segmentation, follow-up sequences and engagement workflows'], ['Constant Contact', 'Recruitment newsletters, campaign design, list management and reporting']])}<p><a href="https://mailchimp.com/" target="_blank" rel="noopener noreferrer">Mailchimp</a> · <a href="https://www.brevo.com/" target="_blank" rel="noopener noreferrer">Brevo</a> · <a href="https://www.hubspot.com/" target="_blank" rel="noopener noreferrer">HubSpot</a> · <a href="https://www.mailerlite.com/" target="_blank" rel="noopener noreferrer">MailerLite</a> · <a href="https://www.activecampaign.com/" target="_blank" rel="noopener noreferrer">ActiveCampaign</a> · <a href="https://www.constantcontact.com/" target="_blank" rel="noopener noreferrer">Constant Contact</a></p>${table(['Campaign', 'Purpose'], [['Job vacancy announcement', 'Advertise verified available positions'], ['Applicant registration', 'Invite candidates to register through the official channel'], ['Recruitment webinar', 'Invite candidates to online orientations'], ['Job fair invitation', 'Promote local recruitment activities'], ['Overseas job opportunities', 'Share authorized international vacancies'], ['Requirements reminder', 'Remind applicants about pending items through appropriate channels'], ['Talent pool newsletter', 'Maintain engagement with qualified, opted-in candidates']])}<p class="learning-safety-note"><strong>Privacy reminder:</strong> Use campaign platforms for authorized campaigns and opted-in audiences. Respect unsubscribe preferences and applicable data privacy requirements. Individual updates and confidential applicant records require approved, access-controlled channels.</p></section>
      <section class="learning-lab m9-local-overseas-quiz"><div class="learning-lab-heading"><span class="learning-lab-icon">03</span><div><p class="recruitment-eyebrow">INTERACTIVE ACTIVITY 1 · LOCAL OR OVERSEAS?</p><h2>Choose the pathway that fits</h2><p>Select the best route for each scenario, then check your answers.</p></div></div><div class="m9-choice-list"><fieldset><legend>An applicant needs an SSS number for payroll processing.</legend><label><input type="radio" name="m9-route-1" value="local"> Local deployment</label><label><input type="radio" name="m9-route-1" value="overseas"> Overseas deployment</label></fieldset><fieldset><legend>An applicant needs a valid passport and work visa.</legend><label><input type="radio" name="m9-route-2" value="local"> Local deployment</label><label><input type="radio" name="m9-route-2" value="overseas"> Overseas deployment</label></fieldset><fieldset><legend>An applicant needs an employer’s local pre-employment medical examination.</legend><label><input type="radio" name="m9-route-3" value="local"> Local deployment</label><label><input type="radio" name="m9-route-3" value="overseas"> Overseas deployment</label></fieldset><fieldset><legend>A departing OFW needs applicable DMW employment documentation and departure clearance.</legend><label><input type="radio" name="m9-route-4" value="local"> Local deployment</label><label><input type="radio" name="m9-route-4" value="overseas"> Overseas deployment</label></fieldset></div><button type="button" data-m9-route-check>Submit answers</button><p data-m9-route-feedback role="status" aria-live="polite"></p></section>
      <section class="learning-lab m9-scenario"><div class="learning-lab-heading"><span class="learning-lab-icon">04</span><div><p class="recruitment-eyebrow">INTERACTIVE ACTIVITY 2 · RECRUITMENT OFFICER CHALLENGE</p><h2>Process two applicants responsibly</h2><p>Choose which fictional applicant to process first and review a tailored checklist.</p></div></div><div class="m9-applicant-switch" role="group" aria-label="Choose applicant"><button type="button" data-m9-applicant="local" aria-pressed="true">Applicant A · Local Administrative Assistant in Cebu City</button><button type="button" data-m9-applicant="overseas" aria-pressed="false">Applicant B · Overseas Registered Nurse in Saudi Arabia</button></div><div class="m9-scenario-content" data-m9-scenario-content></div></section>
      <section class="learning-lab m9-assessment"><div class="learning-lab-heading"><span class="learning-lab-icon">05</span><div><p class="recruitment-eyebrow">KNOWLEDGE ASSESSMENT</p><h2>Check your onboarding decisions</h2><p>Answer all nine questions, then review your result.</p></div></div><div class="m9-assessment-list">${assessmentMarkup}</div><button type="button" data-m9-assessment-check>Check assessment</button><p data-m9-assessment-feedback role="status" aria-live="polite"></p></section>
      <aside class="recruitment-industry-note"><span aria-hidden="true">✓</span><div><strong>Practice responsibly</strong><p>All people and records in this lesson are fictional. Requirements can change and differ by role, employer and destination. Confirm current procedures with authorized agency staff and relevant official sources before real-world processing.</p></div></aside>
      <footer class="recruitment-course-footer"><span>LEARNING MODULE 09 · FROM APPLICANT TO DEPLOYMENT</span><div class="recruitment-footer-actions"><button class="recruitment-back-top" type="button" data-module-top aria-label="Return to the top of the module" title="Back to top">↑ <span>Back to top</span></button><button type="button" data-course-complete>Complete module <span aria-hidden="true">✓</span></button></div></footer>
    </div>`;

  const module8 = root.querySelector('.modern-learning-module[data-module-number="8"]');
  if (module8) {
    module8.after(learningCard);
    learningCard.after(module);
  } else {
    const list = root.querySelector('.learning-resource-list') || root;
    list.append(learningCard, module);
  }

  const scenarioPanel = module.querySelector('[data-m9-scenario-content]');
  const scenarios = {
    local: {
      title: 'Applicant A · Local Administrative Assistant · Cebu City',
      text: 'Start with the employer’s approved local checklist. Confirm the role criteria and whether each item is required at this stage.',
      checks: ['Confirm registration, contact details and preferred position.', 'Screen resume, education and experience against the job description.', 'Request the updated resume, valid ID, and diploma/TOR; collect other items only when applicable.', 'Check readability, completeness and validity; flag missing items for follow-up.', 'Coordinate the employer interview, selection decision and applicable pre-employment steps.', 'Coordinate contract, payroll identifiers and onboarding with authorized HR.']
    },
    overseas: {
      title: 'Applicant B · Overseas Registered Nurse · Saudi Arabia',
      text: 'First confirm the verified job order, employer criteria, destination requirements and current authorized processing steps. A contract alone is not deployment clearance.',
      checks: ['Confirm the job order, position, employer and destination requirements.', 'Screen education, nursing credentials, relevant experience and required professional license.', 'Collect valid passport and role-specific documents through an authorized secure channel.', 'Coordinate employer interview/assessment and applicable medical examination.', 'Facilitate contract, destination visa/work permit and current DMW processing.', 'Verify applicable orientation, clearances, travel readiness and flight coordination.', 'Set post-deployment follow-up and protect the worker’s information.']
    }
  };
  function renderScenario(kind) {
    const item = scenarios[kind];
    scenarioPanel.innerHTML = `<h3>${esc(item.title)}</h3><p>${esc(item.text)}</p><div class="learning-checklist">${item.checks.map((text, index) => `<label><input type="checkbox" data-m9-scenario-step><span>${index + 1}. ${esc(text)}</span></label>`).join('')}</div><p data-m9-scenario-progress aria-live="polite">0 of ${item.checks.length} actions reviewed</p>`;
  }
  renderScenario('local');

  const emailTemplates = {
    local: { subject: 'Submission of Pre-Employment Requirements', message: 'Dear Applicant,\n\nCongratulations on successfully passing the initial screening.\n\nPlease submit the following documents for the next stage of your application:\n- Updated resume\n- Valid government-issued ID\n- Diploma or Transcript of Records\n- Certificate of Employment, if applicable\n- Other position-specific requirements\n\nKindly submit your documents in PDF format through the designated secure submission channel.\n\nBest regards,\nRecruitment Department' },
    overseas: { subject: 'Overseas Employment Application – Requirements Submission', message: 'Dear Applicant,\n\nWe are pleased to inform you that your application has progressed to the next stage of our overseas recruitment process.\n\nPlease prepare the following initial requirements:\n- Updated resume\n- Valid passport\n- Educational credentials\n- Employment certificates\n- Professional licenses, if applicable\n- Other documents required for your destination country\n\nPlease wait for verified instructions regarding document review, employer interviews, medical examinations and applicable deployment processing.\n\nBest regards,\nOverseas Recruitment Department' },
    followup: { subject: 'Follow-up on Outstanding Requirements', message: 'Dear Applicant,\n\nThis is a follow-up regarding your pending recruitment requirements.\n\nOur records indicate that some documents are still outstanding. Kindly review your checklist and submit the remaining applicable documents through the designated secure channel. Please contact the Recruitment Department if you need clarification or an accommodation.\n\nThank you for your cooperation.\n\nBest regards,\nRecruitment Department' }
  };
  module.querySelector('[data-m9-template]').addEventListener('change', event => {
    const template = emailTemplates[event.target.value];
    module.querySelector('[data-m9-subject]').value = template.subject;
    module.querySelector('[data-m9-email]').value = template.message;
    module.querySelector('[data-m9-email-feedback]').textContent = '';
  });

  module.addEventListener('change', event => {
    if (event.target.matches('[data-m9-document]')) {
      const boxes = [...module.querySelectorAll('[data-m9-document]')];
      const complete = boxes.filter(box => box.checked).length;
      module.querySelector('[data-m9-count]').textContent = `${complete} of ${boxes.length} complete`;
      module.querySelector('[data-m9-status]').textContent = `${boxes.length - complete} outstanding requirement${boxes.length - complete === 1 ? '' : 's'}`;
    }
    if (event.target.matches('[data-m9-scenario-step]')) {
      const boxes = [...scenarioPanel.querySelectorAll('[data-m9-scenario-step]')];
      const complete = boxes.filter(box => box.checked).length;
      scenarioPanel.querySelector('[data-m9-scenario-progress]').textContent = `${complete} of ${boxes.length} actions reviewed`;
    }
  });
  module.addEventListener('click', event => {
    const applicantButton = event.target.closest('[data-m9-applicant]');
    if (applicantButton) {
      const kind = applicantButton.dataset.m9Applicant;
      module.querySelectorAll('[data-m9-applicant]').forEach(button => button.setAttribute('aria-pressed', String(button === applicantButton)));
      renderScenario(kind);
      return;
    }
    if (event.target.closest('[data-m9-route-check]')) {
      const correct = ['local', 'overseas', 'local', 'overseas'];
      let answered = 0;
      let score = 0;
      correct.forEach((answer, index) => {
        const selected = module.querySelector(`input[name="m9-route-${index + 1}"]:checked`);
        if (selected) { answered += 1; if (selected.value === answer) score += 1; }
      });
      const feedback = module.querySelector('[data-m9-route-feedback]');
      feedback.textContent = answered < correct.length ? `Please answer all four scenarios. You have answered ${answered} of 4.` : `You got ${score} of 4 correct. SSS/payroll and a local medical are local examples; passport, work visa and applicable DMW departure steps point to overseas processing.`;
      return;
    }
    if (event.target.closest('[data-m9-email-review]')) {
      const subject = module.querySelector('[data-m9-subject]').value.trim();
      const message = module.querySelector('[data-m9-email]').value.trim();
      const feedback = module.querySelector('[data-m9-email-feedback]');
      const issues = [];
      if (!subject) issues.push('add a clear subject');
      if (!/^dear\s+/i.test(message)) issues.push('include a professional greeting');
      if (!/secure|designated|approved/i.test(message)) issues.push('name an authorized submission channel');
      if (!/best regards|regards|thank you/i.test(message)) issues.push('add a courteous close');
      feedback.textContent = issues.length ? `Review suggestion: ${issues.join('; ')}.` : 'Draft reviewed: it has a clear subject, professional greeting, secure-channel direction and courteous close. It has not been sent.';
      return;
    }
    if (event.target.closest('[data-m9-assessment-check]')) {
      const answers = assessment.map((_, index) => module.querySelector(`[data-m9-answer="${index}"]`).value);
      const answered = answers.filter(value => value !== '').length;
      const feedback = module.querySelector('[data-m9-assessment-feedback]');
      if (answered < assessment.length) {
        feedback.textContent = `Please answer all nine questions before checking. You have answered ${answered} of 9.`;
        return;
      }
      const score = assessment.reduce((total, item, index) => total + (Number(answers[index]) === item[2] ? 1 : 0), 0);
      feedback.textContent = `Score: ${score} of ${assessment.length}. ${score >= 7 ? 'Strong work—keep checking current requirements and protecting applicant data.' : 'Review the pathway, document verification and privacy lessons, then try again.'}`;
    }
  });
})();
