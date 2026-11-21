(() => {
  const root = document.getElementById('learning-view');
  if (!root) return;

  const courses = [
    {
      number: 5, title: 'HRIS: The Digital Backbone of Human Resources', short: 'HRIS: The Digital Backbone of Human Resources',
      subtitle: 'Employee Information, Payroll Management and Time Management Information System',
      description: 'Explore how Philippine organizations use technology to manage their people, compensation and attendance.', duration: '90–120 MIN', tags: ['Beginner-friendly', 'Philippine industry', 'Practical simulation'],
      intro: 'An integrated HRIS brings employee information, timekeeping and payroll into a coordinated workflow. Explore the systems, practice with fictional records, and see how accurate data supports responsible HR operations.',
      objectives: ['Explain the purpose and value of HRIS in Philippine organizations.', 'Identify essential employee and employment records.', 'Describe payroll earnings, deductions and payslip components.', 'Explain how TMIS records schedules, time, leave and overtime.', 'Connect employee data, validated attendance and payroll.', 'Apply accuracy, privacy and compliance principles.'],
      path: ['HRIS fundamentals', 'Employee information', 'Payroll management', 'TMIS timekeeping', 'Integrated simulation', 'Knowledge assessment'],
      lessons: [
        ['01', 'FOUNDATIONS', 'HRIS: one connected people system', 'HRIS combines technology, information and processes for employee administration. Employee records identify the worker; TMIS supplies attendance and schedule data; payroll uses approved employee and time information to calculate compensation. BPOs, hospitals, manufacturers, construction, retail and recruitment agencies use these tools for different workforce needs.', ['Centralized, current employee records', 'Connected attendance, payroll and reports', 'Human review, clear access permissions and reliable audit history']],
        ['02', 'EMPLOYEE RECORDS', 'Build a useful employee profile', 'An employee ID connects a person’s authorized personal details with job, schedule and payroll records. A sample HR profile might include contact and emergency details; title, department, status, hire date, location and supervisor; relevant government identifiers; compensation and pay frequency; and training or leave records.', ['Separate personal, employment, government ID and compensation data', 'Collect only what the legitimate HR purpose requires', 'Restrict access and update records when details change']],
        ['03', 'PAYROLL', 'From earnings to a sample payslip', 'Gross pay combines applicable basic pay, approved overtime, night-shift differential, holiday pay, allowances or incentives. Net pay is gross pay less applicable statutory and authorized deductions. Philippine payroll may involve SSS, PhilHealth, Pag-IBIG, BIR withholding tax and 13th-month pay; rules and employee/employer shares depend on current requirements and the pay period.', ['Validate employee and salary information first', 'Use approved attendance and overtime, not unverified extra time', 'Check current official contribution, tax and labor guidance']],
        ['04', 'TMIS TIMEKEEPING', 'Turn time logs into reviewed attendance', 'A Time Management Information System (TMIS), sometimes called a time-and-attendance system, manages schedules, time logs, absence, leave and overtime. A Daily Time Record (DTR) can flag lateness or extra time, but extra minutes are not automatically approved overtime: authorization, policy and compensable work must be reviewed.', ['Schedule and shift assignment', 'Time-in/out, meal breaks, leave and DTR reports', 'Ordinary hours, overtime and night work require coverage and policy checks']],
        ['05', 'INTEGRATION', 'Follow the employee-data journey', 'HR creates a profile and unique ID, records job and compensation details, and assigns a schedule. TMIS captures attendance; authorized staff validate exceptions; payroll uses the approved record to calculate earnings and deductions; payroll is reviewed, approved and reported. Keep fictional practice data in this simulation.', ['Employee profile → schedule → validated time record', 'Approved data → payroll review → payslip', 'Document corrections and protect information under the Data Privacy Act (RA 10173)']],
        ['06', 'ASSESSMENT', 'Make a responsible HRIS decision', 'A good HRIS process is accurate, traceable and limited to a clear business purpose. Actual payroll should use current official schedules and qualified review; the illustrative figures below are for learning only, not legal or payroll advice.', ['Never treat sample contribution amounts as live statutory calculations', 'Protect identifiers, bank details and personnel records', 'Confirm current rules with official Philippine sources']]
      ],
      activityTitle: 'Integrated HRIS simulation', activityText: 'You are the HR Assistant for ABC Business Solutions. Set up fictional employee Juan Dela Cruz (Administrative Assistant, Human Resources, regular simulation employee, ₱22,000 monthly basic pay), review his time record, and generate an illustrative sample calculation.', activity: 'hris'
    },
    {
      number: 6, title: 'Professional Email Communication Using Microsoft Outlook', short: 'Beyond the Inbox: Mastering Microsoft Outlook',
      subtitle: 'Professional communication, business reporting and client relationships',
      description: 'Practice workplace-ready Outlook habits for recruitment, HR, administration and international business.', duration: '5–7 HOURS', tags: ['Workplace digital skills', 'Industry aligned', 'Hands-on practice'],
      intro: 'Email is an operational record as well as a communication channel. Learn to write clearly, organize an Outlook-style workflow, report progress, coordinate clients and protect confidential information.',
      objectives: ['Apply professional email etiquette and clear structure.', 'Use Outlook folders, flags, search, calendar and follow-up tools.', 'Write concise business and recruitment updates.', 'Build respectful client relationships through email.', 'Coordinate meetings, tasks and recurring work.', 'Recognize phishing and protect confidential information.'],
      path: ['Professional email', 'Outlook essentials', 'Business reporting', 'Client relationships', 'Productivity tools', 'Security and capstone'],
      lessons: [
        ['01', 'FOUNDATIONS', 'Write for a workplace audience', 'Professional email uses a useful subject, appropriate greeting, clear purpose, concise context, action or deadline, and courteous sign-off. Use a professional tone, check names and attachments, and adapt communication for local and international colleagues.', ['Avoid vague subjects and overly casual wording', 'Keep one primary purpose per message', 'Proofread tone, names, dates and attachments before sending']],
        ['02', 'OUTLOOK CORE SKILLS', 'Turn the inbox into an organized workspace', 'Outlook supports folders, compose/reply, CC/BCC, signatures, attachments, rules, categories, flags, search, contacts, tasks, calendar, meeting invitations, automatic replies and reminders. Use CC for relevant visibility and BCC carefully to protect recipient addresses when appropriate.', ['Flag messages that require action; set a realistic due date', 'Use folders and rules that support retrieval, not needless complexity', 'Search prior conversations before asking someone to resend information']],
        ['03', 'BUSINESS REPORTING', 'Send a useful recruitment or operations update', 'A concise report email states the reporting period, key figures, progress, issues, next steps and any decision needed. Recruitment updates might cover screened applicants, qualified candidates, interviews, pending documents, challenges and recommendations. Reference and attach supporting files clearly.', ['Use accurate figures and label reporting periods', 'Describe a problem with its impact and a proposed solution', 'Name attachments clearly and verify recipients']],
        ['04', 'CLIENT RELATIONSHIPS', 'Build trust through thoughtful follow-up', 'A client introduction explains who you are and why you are writing. A helpful response acknowledges the request, gives verified information and identifies the next step. Follow up politely by referencing the earlier message, restating the relevant item and asking for an update without pressure.', ['Confirm interview schedules and time zones', 'Share candidate information only through approved channels', 'Use respectful, culturally aware language with international clients']],
        ['05', 'PRODUCTIVITY', 'Coordinate a busy workday', 'Use calendar invitations to show a clear purpose, participants, date, time zone, location or meeting link, and preparation notes. Rules, templates, tasks and reminders reduce repeated work; shared calendars and Microsoft Teams/Word/Excel/OneDrive can support coordination when approved by the organization.', ['Respond to urgent client work, then schedule interviews and follow-ups', 'Use recurring tasks and reminders for reports', 'Close the day with a brief, factual accomplishment update']],
        ['06', 'SECURITY & CAPSTONE', 'Protect people and business information', 'Check sender addresses, unexpected links, urgent requests and unusual attachments before acting. Never send passwords or sensitive employee/candidate records to an unverified recipient. Follow workplace retention, access and privacy rules; report suspicious messages through approved channels.', ['Verify unexpected payment or document requests independently', 'Check CC/BCC and attachments before sending', 'Use secure approved systems for passports, medical records and employment files']]
      ],
      activityTitle: 'Recruitment report email builder', activityText: 'Draft a fictional daily recruitment update for your manager. Include screened, qualified and interviewed totals, pending documents, one challenge and a next step. Nothing is sent.', activity: 'outlook'
    },
    {
      number: 7, title: 'Email Marketing for Recruitment and HR Professionals', short: 'Beyond the Inbox: Email Marketing for Recruitment',
      subtitle: 'Use campaign tools for smarter, responsible candidate communication',
      description: 'Learn how campaign platforms organize, personalize and measure recruitment and HR outreach.', duration: '60–90 MIN', tags: ['Recruitment & HR technology', 'Campaign practice', 'Privacy first'],
      intro: 'When a recruiter needs to communicate with a large, relevant talent pool, dedicated email campaign tools can help organize templates, segments, scheduled messages and aggregate engagement. They complement—not replace—one-to-one Outlook or Gmail communication.',
      objectives: ['Define email marketing and its recruitment applications.', 'Compare traditional email with dedicated campaign tools.', 'Explain segmentation, personalization and automation.', 'Identify campaign performance measures.', 'Plan recruitment outreach for a relevant audience.', 'Apply privacy, permission and anti-spam safeguards.'],
      path: ['Recruitment scenario', 'Compare communication tools', 'Plan a campaign', 'Explore platform features', 'Privacy practices', 'Knowledge check'],
      lessons: [
        ['01', 'THE SCENARIO', 'Reach the right applicants efficiently', 'A campaign for 150 nurses may include vacancy announcements, requirements, orientation invitations, document reminders and interview updates. Manual copying can be repetitive and hard to track. A structured campaign makes the audience, message and follow-up easier to manage.', ['Use accurate, authorized vacancy information', 'Personalize only with relevant, accurate fields', 'Keep sensitive candidate documents out of general campaigns']],
        ['02', 'COMPARE', 'Traditional email and campaign platforms', 'Outlook and Gmail are designed for individual and business correspondence and have sending limits and anti-abuse protections. Dedicated platforms specialize in contact management, segmentation, templates, automation and campaign reporting. Features, sending policies and limits vary; some traditional services also offer eligible mail-merge features.', ['Campaign tools do not mean unlimited sending', 'Use one-to-one email for private, individual conversations', 'Use approved systems and integrations for candidate data']],
        ['03', 'RECRUITMENT USE CASES', 'Choose a campaign that serves a real need', 'Recruitment and HR teams can announce verified vacancies, nurture a permissioned talent pool, invite candidates to orientations or job fairs, send practical reminders, and distribute internal training news. Segment by relevant role, location, experience or application stage.', ['Keep audience criteria job-related and current', 'Measure delivered, bounced, opened, clicked and unsubscribed messages', 'Do not assume an open or click proves candidate suitability']],
        ['04', 'PLATFORM FEATURES', 'Explore the campaign toolkit', 'Mailchimp, Brevo, HubSpot, MailerLite, Constant Contact and ActiveCampaign are examples of platforms with differing contact, automation and reporting capabilities. Compare current terms, pricing, data handling, integrations and anti-spam requirements before selecting a tool.', ['Templates and mobile-friendly previews', 'Segments, personalization and scheduled sequences', 'Reports help improve communication—not make hiring decisions']],
        ['05', 'RESPONSIBLE SENDING', 'Privacy belongs in every campaign', 'Use a lawful and appropriate basis to contact candidates, explain the purpose, respect preferences and unsubscribe requests, and send only relevant content. The Philippine Data Privacy Act (RA 10173) and applicable rules require responsible handling of personal data. Verify list quality and platform safeguards.', ['Collect only necessary details and limit access', 'Never upload resumes, IDs, medical records or contracts casually', 'Follow the platform’s terms and applicable anti-spam rules']],
        ['06', 'KNOWLEDGE CHECK', 'Choose the right communication approach', 'Before sending, confirm the audience is relevant, the message is accurate, the next action is clear, the data is protected, and the campaign is permitted. Use fictional contacts for practice.', ['Scale responsibly—not indiscriminately', 'Review the campaign before scheduling', 'Use an approved application channel for responses']]
      ],
      activityTitle: 'Build a fictional recruitment campaign', activityText: 'Plan an announcement for 200 nurse vacancies in Saudi Arabia. Check the audience, vacancy details, useful personalization, call to action, preview and privacy safeguards. Do not send to real candidates.', activity: 'marketing'
    },
    {
      number: 8, title: 'Recruitment Lead Generation Strategies', short: 'Beyond Job Posting: Recruitment Lead Generation',
      subtitle: 'Find more candidates. Build stronger connections. Fill vacancies faster.',
      description: 'Build a proactive sourcing plan using Boolean search, networking, talent pools, email and social channels.', duration: '90–120 MIN', tags: ['Philippine recruitment', 'Digital sourcing', 'Practical challenge'],
      intro: 'Lead generation goes beyond publishing a vacancy. Combine careful candidate search, professional networking, responsible re-engagement, relevant outreach and measurable follow-up to build a quality talent pipeline.',
      objectives: ['Use ATS and job-board filters to find relevant candidates.', 'Build and adapt Boolean search strings.', 'Develop professional networking and referral approaches.', 'Re-engage past applicants responsibly.', 'Create recruitment email and social advertisement plans.', 'Track qualified leads and conversion outcomes.'],
      path: ['Advanced sourcing', 'Boolean search', 'LinkedIn networking', 'Resume reactivation', 'Campaign channels', 'Lead analytics and challenge'],
      lessons: [
        ['01', 'ADVANCED SOURCING', 'Search the talent already available', 'ATS and job-board filters can combine keywords, role, location, experience, education, license, status and date. For a nursing role, a recruiter might search registered nurses, active license, relevant bedside experience and required destination qualifications, then review actual evidence.', ['Match filters to the verified job order', 'Search existing authorized records before repeating outreach', 'Search syntax and filter support vary across platforms']],
        ['02', 'BOOLEAN SEARCH', 'Make keyword searches more precise', 'AND requires both terms; OR includes alternatives; NOT excludes a term where supported; quotation marks search a phrase; parentheses group related terms. Example: ("Registered Nurse" OR "Staff Nurse") AND ("Med-Surg" OR "Medical Surgical") AND NCLEX. Adapt syntax and check actual results.', ['Use OR for equivalent job titles', 'Use AND for required qualifications', 'Avoid over-filtering that removes suitable applicants']],
        ['03', 'NETWORKING', 'Turn professional connections into leads', 'Maintain a credible recruiter profile and participate in relevant industry groups. Share accurate vacancies, contribute usefully, and send personalized connection requests that explain the relevance. Ask for referrals respectfully and continue relationships between vacancies.', ['Do not spam or misrepresent an opportunity', 'Make outreach specific, brief and easy to decline', 'Use public professional information fairly and appropriately']],
        ['04', 'RESUME REACTIVATION', 'Revisit past applicants with care', 'Previously screened or shortlisted candidates may match a new role, but older records are not automatically valid. Verify current interest, availability, contact details, work history, licenses and consent. Update records in the authorized ATS and respect retention rules.', ['Review application history and prior preferences', 'Invite eligible candidates to consider the new role', 'Do not reuse old documents or share records without an appropriate purpose']],
        ['05', 'OUTREACH CHANNELS', 'Create useful email and social campaigns', 'A recruitment email needs a clear subject, verified role details, relevant qualifications, an official application route and an honest call to action. Social recruitment content should use an accurate job title, concise requirements and secure application instructions. Email platforms, LinkedIn, Facebook, job boards and referrals serve different audiences.', ['Do not promise unverified salary, visa or deployment terms', 'Collect only necessary lead details and provide a privacy notice', 'Keep sensitive documents in approved secure systems']],
        ['06', 'LEAD MANAGEMENT', 'Measure quality, not just volume', 'Track leads by source, response, qualification, completed application, interview and hire. Response rate = responses ÷ leads; qualified lead rate = qualified leads ÷ leads. Compare channels by qualified candidates and conversion, not just inquiries or clicks. Keep the final challenge fictional and privacy-conscious.', ['Set a clear owner and next action for each qualified lead', 'Document source and status consistently', 'Balance speed with fairness, privacy and human review']]
      ],
      activityTitle: 'Five-day lead generation challenge', activityText: 'Plan a fictional five-day campaign for 15 overseas registered nurses and 10 local administrative assistants. Create a search string, select channels, plan outreach, and define simple lead metrics.', activity: 'leads'
    }
  ];

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const lessonMarkup = course => course.lessons.map((lesson, index) => `<details class="recruitment-lesson-card learning-reveal" ${index === 0 ? 'open' : ''}><summary><span class="recruitment-lesson-number">${lesson[0]}</span><span><small>${lesson[1]}</small><strong>${lesson[2]}</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>${lesson[3]}</p><ul>${lesson[4].map(item => `<li>${item}</li>`).join('')}</ul></div></details>`).join('');
  const activityMarkup = course => {
    if (course.activity === 'hris') return `<section class="learning-lab learning-reveal"><div class="learning-lab-heading"><span class="learning-lab-icon">01</span><div><p class="recruitment-eyebrow">PRACTICAL LAB</p><h2>${course.activityTitle}</h2><p>${course.activityText}</p></div></div><div class="learning-lab-grid"><label>Employee ID<input data-hris-id value="EMP-2026-001" maxlength="24"></label><label>Employee name<input data-hris-name value="Juan Dela Cruz" maxlength="80"></label><label>Position<input data-hris-position value="Administrative Assistant" maxlength="80"></label><label>Monthly basic pay (illustrative)<input data-hris-salary type="number" min="0" value="22000"></label><label>Time in<input data-hris-in type="time" value="08:05"></label><label>Time out<input data-hris-out type="time" value="17:30"></label><label>Unpaid meal break (minutes)<select data-hris-break><option value="60">60 minutes</option><option value="30">30 minutes</option></select></label><div class="learning-lab-action"><button type="button" data-hris-calculate>Review sample record &amp; calculate</button><p data-hris-result role="status" aria-live="polite">Sample record uses fictional figures. Review time exceptions before payroll approval.</p></div></div><p class="learning-safety-note"><strong>Illustrative only:</strong> This learning estimate uses a simple 26-day, 8-hour divisor and sample fixed deductions (₱500 SSS, ₱200 PhilHealth, ₱100 Pag-IBIG, ₱0 tax). It is not a legal computation, actual statutory schedule, or compliant payslip. Extra time is not automatically approved overtime.</p><button class="learning-complete-activity" type="button" data-learning-mark="practice">Mark simulation reviewed</button></section><section class="learning-lab learning-reveal"><div class="learning-lab-heading"><span class="learning-lab-icon">02</span><div><p class="recruitment-eyebrow">KNOWLEDGE CHECK</p><h2>Connect the three systems</h2></div></div><label class="learning-check-label">Which sequence best describes integrated HRIS?<select data-hris-quiz><option value="">Choose an answer</option><option value="wrong">Payroll creates employee records and invents attendance</option><option value="correct">Employee details and schedule → validated TMIS data → reviewed payroll</option><option value="wrong">TMIS replaces employee records and pays employees directly</option></select></label><button type="button" data-hris-check>Check answer</button><p data-hris-feedback role="status" aria-live="polite"></p></section>`;
    if (course.activity === 'outlook') return `<section class="learning-lab learning-reveal"><div class="learning-lab-heading"><span class="learning-lab-icon">01</span><div><p class="recruitment-eyebrow">EMAIL PRACTICE</p><h2>${course.activityTitle}</h2><p>${course.activityText}</p></div></div><div class="learning-lab-grid"><label>To<input data-email-to value="manager@example.org" maxlength="120"></label><label>Subject<input data-email-subject value="Daily recruitment update — 18 June" maxlength="140"></label><label class="learning-lab-wide">Message<textarea data-email-body rows="8" maxlength="1800" placeholder="Hello [Manager],\n\nScreened: ...\nQualified: ...\nInterviews: ...\nPending documents: ...\nChallenge: ...\nRecommended next step: ...\n\nRegards,\n[Your name]"></textarea></label><div class="learning-lab-action"><button type="button" data-email-review>Review draft</button><button class="learning-button-secondary" type="button" data-email-template>Insert sample structure</button><p data-email-feedback role="status" aria-live="polite"></p></div></div><p class="learning-safety-note">Practice only. This simulator does not send email. Use fictional information and verify recipients, attachments, CC/BCC and privacy before sending in a real workplace.</p></section><section class="learning-lab learning-reveal"><div class="learning-lab-heading"><span class="learning-lab-icon">02</span><div><p class="recruitment-eyebrow">WORKDAY MISSION</p><h2>Plan a coordinated workday</h2></div></div><div class="learning-checklist"><label><input type="checkbox" data-workday> Respond to the urgent client email with verified information</label><label><input type="checkbox" data-workday> Schedule an interview and confirm the time zone</label><label><input type="checkbox" data-workday> Flag the pending report and set a reminder</label><label><input type="checkbox" data-workday> Organize messages into useful folders</label><label><input type="checkbox" data-workday> Prepare an end-of-day accomplishment update</label></div><p data-workday-progress aria-live="polite">0 of 5 workday actions planned</p></section>`;
    if (course.activity === 'marketing') return `<section class="learning-lab learning-reveal"><div class="learning-lab-heading"><span class="learning-lab-icon">01</span><div><p class="recruitment-eyebrow">CAMPAIGN PLANNER</p><h2>${course.activityTitle}</h2><p>${course.activityText}</p></div></div><div class="learning-lab-grid"><label>Audience segment<select data-campaign-audience><option value="">Choose a relevant segment</option><option>Nurses who have appropriate communication preferences</option><option>All contacts, regardless of role</option><option>Unverified purchased email list</option></select></label><label>Personalization field<select data-campaign-personal><option value="">Choose a field</option><option>Candidate first name (verified)</option><option>Passport number</option><option>Medical record</option></select></label><label class="learning-lab-wide">Subject line<input data-campaign-subject maxlength="140" placeholder="Registered Nurses — verified opportunities in Saudi Arabia"></label><label class="learning-lab-wide">Call to action<input data-campaign-cta maxlength="180" placeholder="Review verified role details and apply through the official channel"></label><div class="learning-lab-action"><button type="button" data-campaign-review>Review campaign plan</button><p data-campaign-feedback role="status" aria-live="polite"></p></div></div><p class="learning-safety-note">Use fictional contacts only. Campaign platforms have their own limits and terms; permission, privacy, list quality and unsubscribe handling remain essential.</p></section><section class="learning-lab learning-reveal"><div class="learning-lab-heading"><span class="learning-lab-icon">02</span><div><p class="recruitment-eyebrow">KNOWLEDGE CHECK</p><h2>Choose the better tool</h2></div></div><label class="learning-check-label">You need a one-to-one reply about a candidate’s private question. Choose:<select data-marketing-quiz><option value="">Choose an answer</option><option value="campaign">A bulk marketing campaign to the talent pool</option><option value="individual">An approved individual business email or secure channel</option></select></label><button type="button" data-marketing-check>Check answer</button><p data-marketing-feedback role="status" aria-live="polite"></p></section>`;
    return `<section class="learning-lab learning-reveal"><div class="learning-lab-heading"><span class="learning-lab-icon">01</span><div><p class="recruitment-eyebrow">BOOLEAN SEARCH BUILDER</p><h2>Find relevant nursing candidates</h2><p>Build a fictional search using job-title alternatives, specialty and qualification terms. Syntax differs between ATS and job boards.</p></div></div><div class="learning-lab-grid"><label class="learning-lab-wide">Search string<textarea data-lead-search rows="3" maxlength="500" placeholder='("Registered Nurse" OR "Staff Nurse") AND ("Med-Surg" OR "Medical Surgical") AND NCLEX'></textarea></label><div class="learning-lab-action"><button type="button" data-lead-review>Review search strategy</button><p data-lead-feedback role="status" aria-live="polite"></p></div></div><p class="learning-safety-note">Check the authorized job order and actual platform syntax. A Boolean search helps discovery; a human must review relevant qualifications fairly.</p></section><section class="learning-lab learning-reveal"><div class="learning-lab-heading"><span class="learning-lab-icon">02</span><div><p class="recruitment-eyebrow">FIVE-DAY CAMPAIGN CHECKLIST</p><h2>Plan a quality-lead funnel</h2><p>Complete the fictional challenge plan for 15 overseas nurses and 10 local administrative assistants.</p></div></div><div class="learning-checklist"><label><input type="checkbox" data-lead-task> Write a tailored Boolean search for both vacancies</label><label><input type="checkbox" data-lead-task> Select three role-appropriate sourcing channels</label><label><input type="checkbox" data-lead-task> Draft respectful LinkedIn outreach or a referral approach</label><label><input type="checkbox" data-lead-task> Recheck candidate interest, qualifications and permissions</label><label><input type="checkbox" data-lead-task> Draft a recruitment email and a clear social advertisement</label><label><input type="checkbox" data-lead-task> Track leads, responses, qualified applicants and interviews</label><label><input type="checkbox" data-lead-task> Add privacy safeguards and a next action for each lead</label></div><p data-lead-progress aria-live="polite">0 of 7 campaign actions complete</p></section>`;
  };

  function createCourse(course) {
    const card = document.createElement('article');
    card.className = 'learning-resource recruitment-learning-launch-card learning-module-card';
    card.dataset.moduleNumber = String(course.number);
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open learning module ${course.number}: ${course.short}`);
    card.innerHTML = `<span class="recruitment-launch-topline"><span class="recruitment-launch-kicker">LEARNING HUB · MODULE ${String(course.number).padStart(2, '0')} · ${escapeHtml(course.tags[0].toUpperCase())}</span><span class="recruitment-launch-status" data-learning-status hidden></span></span><span class="learning-card-icon" aria-hidden="true">${['✳', '✉', '✦', '⌕'][course.number - 5]}</span><span class="recruitment-launch-title">${escapeHtml(course.short)}</span><span class="recruitment-launch-description">${escapeHtml(course.description)}</span><span class="learning-card-meta"><span>◷ ${escapeHtml(course.duration.toLowerCase())}</span><span>${escapeHtml(course.tags[1])}</span></span><button class="recruitment-teacher-progress-toggle" type="button" data-teacher-progress-toggle aria-expanded="false">Progress</button><div class="recruitment-teacher-progress" data-teacher-progress hidden></div>`;
    const module = document.createElement('section');
    module.className = `recruitment-learning-module modern-learning-module learning-course-${course.number}`;
    module.dataset.moduleNumber = String(course.number);
    module.id = `learning-module-${course.number}`;
    module.hidden = true;
    module.setAttribute('aria-labelledby', `learning-module-${course.number}-title`);
    const steps = course.path.map((step, index) => `<article class="learning-journey-card learning-reveal"><span>${String(index + 1).padStart(2, '0')}</span><h3>${escapeHtml(step)}</h3><p>${index === 0 ? 'Build a clear foundation and key vocabulary.' : index === course.path.length - 1 ? 'Apply the ideas with a practical check.' : 'Explore workplace examples and responsible practice.'}</p></article>`).join('');
    const objectives = course.objectives.map(item => `<li>${escapeHtml(item)}</li>`).join('');
    module.innerHTML = `<nav class="recruitment-module-controls" aria-label="Module navigation"><button type="button" data-module-close aria-label="Close module and return to learning modules" title="Close module">×</button></nav><header class="recruitment-course-hero modern-course-hero"><div class="recruitment-course-hero-copy"><p class="recruitment-course-kicker"><span>LEARNING MODULE ${String(course.number).padStart(2, '0')}</span><span>${escapeHtml(course.duration)}</span></p><h1 id="learning-module-${course.number}-title">${escapeHtml(course.title)}</h1><p class="recruitment-course-subtitle">${escapeHtml(course.subtitle)}</p><p class="recruitment-course-intro">${escapeHtml(course.intro)}</p><div class="recruitment-course-tags">${course.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div><button class="recruitment-start-button" type="button" data-course-start>Start learning <span aria-hidden="true">↗</span></button></div><div class="modern-hero-art" aria-hidden="true"><span class="modern-hero-orbit"></span><span class="modern-hero-number">${String(course.number).padStart(2, '0')}</span><span class="modern-hero-label">PEOPLE · PROCESS · PROGRESS</span><span class="modern-hero-spark">✦</span></div></header><div class="recruitment-course-content"><section class="learning-module-overview learning-reveal"><div><p class="recruitment-eyebrow">COURSE OVERVIEW</p><h2>Learning objectives</h2><p>By the end of this module, you’ll be able to:</p></div><ol>${objectives}</ol></section><section class="recruitment-lesson-section learning-reveal"><div class="recruitment-section-heading"><div><p class="recruitment-eyebrow">YOUR LEARNING JOURNEY</p><h2>From concepts to confident practice</h2></div><span class="recruitment-progress-label" data-progress-label>0 of 4 complete</span></div><div class="learning-journey-grid">${steps}</div></section><section class="recruitment-lesson-section learning-reveal"><div class="recruitment-section-heading"><div><p class="recruitment-eyebrow">COURSE CONTENT</p><h2>Explore each lesson</h2></div><span class="recruitment-section-mark">01—${String(course.lessons.length).padStart(2, '0')}</span></div><div class="recruitment-lesson-list">${lessonMarkup(course)}</div></section>${activityMarkup(course)}<aside class="recruitment-industry-note learning-reveal"><span aria-hidden="true">✓</span><div><strong>Practice responsibly</strong><p>All records and scenarios in this learning lab are fictional. Follow current workplace policy, applicable Philippine requirements and data privacy safeguards in real operations.</p></div></aside><footer class="recruitment-course-footer"><span>LEARNING MODULE ${String(course.number).padStart(2, '0')} · ${escapeHtml(course.title.toUpperCase())}</span><div class="recruitment-footer-actions"><button class="recruitment-back-top" type="button" data-module-top aria-label="Return to the top of the module" title="Back to top">↑ <span>Back to top</span></button><button type="button" data-course-complete>Complete module <span aria-hidden="true">✓</span></button></div></footer></div>`;
    return { card, module };
  }

  function placeCourses() {
    const anchor = root.querySelector('.recruitment-ats-course');
    if (!anchor) return;
    let cursor = anchor;
    courses.forEach(course => {
      let card = root.querySelector(`.recruitment-learning-launch-card[data-module-number="${course.number}"]`);
      let module = root.querySelector(`.modern-learning-module[data-module-number="${course.number}"]`);
      if (!card || !module) {
        const created = createCourse(course);
        if (!card) card = created.card;
        if (!module) module = created.module;
      }
      if (cursor.nextElementSibling !== card) cursor.after(card);
      if (card.nextElementSibling !== module) card.after(module);
      cursor = module;
      observeReveals(module);
    });

    const legacyCardDetails = {
      '1': { icon: '✳', duration: '60–90 min', tags: ['Beginner', 'Philippine setting'] },
      '2': { icon: '✦', duration: '60–90 min', tags: ['Scenario-based', 'Ethics first'] },
      '3': { icon: '↗', duration: '60–90 min', tags: ['Simulation', 'Two pathways'] },
      '4': { icon: '▤', duration: '60–90 min', tags: ['Interactive course', 'Privacy first'] }
    };
    root.querySelectorAll('.recruitment-learning-launch-card:not(.learning-module-card)').forEach(card => {
      const details = legacyCardDetails[card.dataset.moduleNumber];
      if (!details) return;
      if (!card.querySelector('.learning-card-icon')) {
        const icon = document.createElement('span');
        icon.className = 'learning-card-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = details.icon;
        card.append(icon);
      }
      if (!card.querySelector('.learning-card-meta')) {
        const meta = document.createElement('span');
        meta.className = 'learning-card-meta';
        meta.innerHTML = `<span>◷ ${details.duration}</span>${details.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}`;
        card.append(meta);
      }
    });

    root.querySelectorAll('.recruitment-learning-module:not(.modern-learning-module)').forEach(module => {
      module.classList.add('learning-hub-legacy-module');
      module.querySelectorAll('.recruitment-objectives-panel, .recruitment-path-grid article, .recruitment-lesson-section, .recruitment-platform-section, .recruitment-practice-panel, .recruitment-quiz-panel, .recruitment-industry-note').forEach(section => section.classList.add('learning-reveal'));
      observeReveals(module);
    });

    if (!root.dataset.learningPolished) {
      root.dataset.learningPolished = 'true';
      root.classList.add('learning-hub-polished');
    }
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealObserver = 'IntersectionObserver' in window && !reduceMotion ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' }) : null;
  function observeReveals(container) {
    container.querySelectorAll('.learning-reveal:not([data-reveal-ready])').forEach(element => {
      element.dataset.revealReady = 'true';
      if (revealObserver) revealObserver.observe(element);
      else element.classList.add('is-revealed');
    });
  }

  function mark(module, step) {
    module.querySelector(`[data-learning-step="${step}"] [data-mark-step]`)?.click();
    const shortcut = module.querySelector(`[data-learning-shortcut="${step}"]`);
    shortcut?.click();
  }

  root.addEventListener('click', event => {
    const module = event.target.closest('.modern-learning-module');
    if (!module) return;
    const course = courses.find(item => String(item.number) === module.dataset.moduleNumber);
    if (!course) return;
    if (event.target.closest('[data-hris-calculate]')) {
      const result = module.querySelector('[data-hris-result]');
      const name = module.querySelector('[data-hris-name]').value.trim();
      const id = module.querySelector('[data-hris-id]').value.trim();
      const salary = Number(module.querySelector('[data-hris-salary]').value);
      const start = module.querySelector('[data-hris-in]').value;
      const end = module.querySelector('[data-hris-out]').value;
      const meal = Number(module.querySelector('[data-hris-break]').value);
      if (!name || !id || !Number.isFinite(salary) || salary <= 0 || !start || !end) { result.textContent = 'Enter an employee name, employee ID, positive monthly pay, and both time logs.'; return; }
      const minutes = value => { const [hours, mins] = value.split(':').map(Number); return hours * 60 + mins; };
      let workedMinutes = minutes(end) - minutes(start);
      if (workedMinutes < 0) workedMinutes += 24 * 60;
      workedMinutes = Math.max(0, workedMinutes - meal);
      const hourly = salary / 26 / 8;
      const gross = hourly * (workedMinutes / 60);
      const deductions = 800;
      result.innerHTML = `<strong>Sample record reviewed: ${escapeHtml(name)} · ${escapeHtml(id)}</strong><br>Recorded work after meal: ${(workedMinutes / 60).toFixed(2)} hours · Illustrative gross estimate: ₱${gross.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} · Sample fixed deductions: ₱800.00 · Illustrative net estimate: ₱${Math.max(0, gross - deductions).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.<br>Validate schedule, lateness, approvals and payroll rules; this is not a statutory calculation or proof of overtime approval.`;
      mark(module, 'practice');
      return;
    }
    if (event.target.closest('[data-hris-check]')) {
      const correct = module.querySelector('[data-hris-quiz]').value === 'correct';
      module.querySelector('[data-hris-feedback]').textContent = correct ? 'Correct: employee details and a schedule connect to validated TMIS records, which authorized payroll staff review.' : 'Try again: employee records and schedule connect to validated TMIS attendance before reviewed payroll.';
      if (correct) mark(module, 'assess');
      return;
    }
    if (event.target.closest('[data-email-template]')) {
      module.querySelector('[data-email-body]').value = 'Hello [Manager],\n\nDaily recruitment update — [date]\nApplicants screened: [number]\nQualified candidates: [number]\nInterviews conducted: [number]\nPending documents: [details]\nChallenge: [brief, factual update]\nRecommended next step: [action and owner]\n\nRegards,\n[Your name]';
      return;
    }
    if (event.target.closest('[data-email-review]')) {
      const to = module.querySelector('[data-email-to]').value.trim();
      const subject = module.querySelector('[data-email-subject]').value.trim();
      const body = module.querySelector('[data-email-body]').value.trim();
      const missing = [];
      if (!to.includes('@')) missing.push('a valid fictional recipient');
      if (!subject) missing.push('a specific subject');
      if (!/screened/i.test(body)) missing.push('screened total');
      if (!/qualified/i.test(body)) missing.push('qualified total');
      if (!/interview/i.test(body)) missing.push('interview total');
      if (!/pending document/i.test(body)) missing.push('pending documents');
      if (!/challenge/i.test(body)) missing.push('a challenge');
      if (!/next step/i.test(body)) missing.push('a recommended next step');
      module.querySelector('[data-email-feedback]').textContent = missing.length ? `Draft check: add ${missing.join(', ')}. Nothing has been sent.` : 'Strong structure: clear recipient and subject, useful report fields and next step. Verify figures, attachment and recipient before using an approved mail system. Nothing has been sent.';
      if (!missing.length) mark(module, 'practice');
      return;
    }
    if (event.target.closest('[data-campaign-review]')) {
      const audience = module.querySelector('[data-campaign-audience]').value;
      const personal = module.querySelector('[data-campaign-personal]').value;
      const subject = module.querySelector('[data-campaign-subject]').value.trim();
      const cta = module.querySelector('[data-campaign-cta]').value.trim();
      const safe = audience.startsWith('Nurses') && personal.startsWith('Candidate first') && subject && cta;
      module.querySelector('[data-campaign-feedback]').textContent = safe ? 'Good plan: relevant audience, minimal personalization, clear subject and action. Before sending, confirm authority, communication preferences, verified vacancy details, unsubscribe handling and platform policy.' : 'Revise the plan: choose an appropriate nurse audience, a minimal verified name field, an accurate subject and a clear official next step. Never use sensitive identifiers or an unverified list.';
      if (safe) mark(module, 'practice');
      return;
    }
    if (event.target.closest('[data-marketing-check]')) {
      const correct = module.querySelector('[data-marketing-quiz]').value === 'individual';
      module.querySelector('[data-marketing-feedback]').textContent = correct ? 'Correct. Handle a private one-to-one matter through an approved individual or secure communication channel.' : 'Choose an individual approved business or secure channel for a private candidate question.';
      if (correct) mark(module, 'assess');
      return;
    }
    if (event.target.closest('[data-lead-review]')) {
      const value = module.querySelector('[data-lead-search]').value;
      const hasNurse = /registered nurse/i.test(value) && /staff nurse/i.test(value);
      const hasAnd = /\bAND\b/i.test(value);
      const hasOr = /\bOR\b/i.test(value);
      const hasSpecialty = /med.?surg|medical surgical/i.test(value);
      const feedback = module.querySelector('[data-lead-feedback]');
      feedback.textContent = hasNurse && hasAnd && hasOr && hasSpecialty ? 'Good structure: title alternatives use OR, while required specialty and qualification concepts narrow results. Confirm the role’s actual requirements and test the platform syntax.' : 'Try including title alternatives ("Registered Nurse" OR "Staff Nurse"), a specialty such as Med-Surg, and AND between required concept groups.';
      if (hasNurse && hasAnd && hasOr && hasSpecialty) mark(module, 'practice');
      return;
    }
  });

  root.addEventListener('change', event => {
    const module = event.target.closest('.modern-learning-module');
    if (!module) return;
    if (event.target.matches('[data-workday]')) {
      const done = [...module.querySelectorAll('[data-workday]')].filter(input => input.checked).length;
      module.querySelector('[data-workday-progress]').textContent = `${done} of 5 workday actions planned`;
      if (done === 5) mark(module, 'practice');
    }
    if (event.target.matches('[data-lead-task]')) {
      const done = [...module.querySelectorAll('[data-lead-task]')].filter(input => input.checked).length;
      module.querySelector('[data-lead-progress]').textContent = `${done} of 7 campaign actions complete`;
      if (done === 7) mark(module, 'practice');
    }
  });

  const placementObserver = new MutationObserver(() => {
    if (root.querySelector('.recruitment-ats-course') && !root.querySelector('.modern-learning-module[data-module-number="8"]')) placeCourses();
  });
  placementObserver.observe(root, { childList: true, subtree: true });
  placeCourses();
})();
