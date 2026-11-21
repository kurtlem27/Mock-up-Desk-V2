(() => {
  const root = document.getElementById('learning-view');
  if (!root) return;

  const learningHubCardSelector = '.recruitment-learning-launch-card, .learning-module-card, [data-learning-module-card]';
  const appShell = document.getElementById('app-shell');
  const sidebarButton = document.querySelector('.sidebar-collapse-button');
  let sidebarWasCollapsed = false;
  let learningHubScrollY = 0;
  function setSidebarCollapsed(collapsed) {
    appShell?.classList.toggle('sidebar-collapsed', collapsed);
    sidebarButton?.setAttribute('aria-expanded', String(!collapsed));
    sidebarButton?.setAttribute('aria-label', collapsed ? 'Expand left panel' : 'Collapse left panel');
    if (sidebarButton) sidebarButton.textContent = collapsed ? '›' : '‹';
  }
  function restoreLearningSidebar() {
    setSidebarCollapsed(sidebarWasCollapsed);
  }
  function closeLearningModules() {
    root.querySelectorAll('.recruitment-learning-module').forEach(module => {
      module.hidden = true;
      module.classList.remove('is-fullscreen');
    });
    document.body.style.overflow = '';
    document.body.classList.remove('recruitment-module-fullscreen-open');
    restoreLearningSidebar();
    root.querySelectorAll(learningHubCardSelector).forEach(card => { card.hidden = false; });
    requestAnimationFrame(() => window.scrollTo({ top: learningHubScrollY, behavior: 'auto' }));
  }
  function openLearningModule(card) {
    const modules = [...root.querySelectorAll('.recruitment-learning-module')];
    if (!modules.length) return false;

    const cardText = card.textContent.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const dataIndex = Number(card.dataset.moduleNumber || card.dataset.module || card.dataset.learningModule);
    let target = Number.isInteger(dataIndex) && dataIndex > 0 ? modules.find((module, index) => Number(module.dataset.moduleNumber) === dataIndex || index + 1 === dataIndex) : null;
    if (!target) {
      const ignoredWords = new Set(['recruitment', 'digital', 'age', 'the', 'for', 'and', 'systems', 'system']);
      const ranked = modules.map(module => {
        const title = module.querySelector('h1')?.textContent.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim() || '';
        const score = title.split(' ').filter(word => word.length > 3 && !ignoredWords.has(word) && cardText.includes(word)).length;
        return { module, score, exact: Boolean(title && cardText.includes(title)) };
      }).sort((a, b) => Number(b.exact) - Number(a.exact) || b.score - a.score);
      if (ranked[0]?.exact || ranked[0]?.score) target = ranked[0].module;
    }
    if (!target) {
      const cards = [...root.querySelectorAll(learningHubCardSelector)];
      target = modules[cards.indexOf(card)];
    }
        if (!target) return false;
 
    learningHubScrollY = window.scrollY;
    sidebarWasCollapsed = appShell?.classList.contains('sidebar-collapsed') || false;
    setSidebarCollapsed(true);
    root.querySelectorAll(learningHubCardSelector).forEach(item => { item.hidden = true; });
    modules.forEach(module => {
      module.hidden = module !== target;
      module.classList.toggle('is-fullscreen', module === target);
    });
    document.body.style.overflow = 'hidden';
    target.scrollTop = 0;
    return true;
  }
  root.addEventListener('click', event => {
    const closeButton = event.target.closest('[data-module-close]');
    if (closeButton) {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeLearningModules();
      return;
    }
    if (event.target.closest('[data-teacher-progress-toggle], [data-teacher-progress], [data-progress-close]')) return;
    const card = event.target.closest(learningHubCardSelector);
    if (!card || !openLearningModule(card)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);
   document.addEventListener('keydown', event => {
     if (event.key === 'Escape' && root.querySelector('.recruitment-learning-module.is-fullscreen')) closeLearningModules();
   });
   root.querySelectorAll('.learning-hub-banner').forEach(banner => banner.remove());
   document.addEventListener('learning-view-rendered', placeModule);


  const progressKey = 'hireflowRecruitmentLearningProgress';
  const overseasProgressKey = 'hireflowOverseasRecruitmentLearningProgress';
  const comparisonProgressKey = 'hireflowRecruitmentRaceLearningProgress';
  const accountsKey = 'hireflowStudentAccounts';
  const currentAccount = () => typeof getCurrentAccount === 'function' ? getCurrentAccount() : { name: 'Student', email: '', role: 'student', teacherCode: '' };
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  
  const moduleMarkup = `
    <section class="recruitment-learning-module" data-module-number="1" aria-labelledby="recruitment-course-title" hidden>
      <nav class="recruitment-module-controls" aria-label="Module navigation">
        <button type="button" data-module-close aria-label="Close module and return to learning modules" title="Close module">×</button>
      </nav>
      <header class="recruitment-course-hero">
        <div class="recruitment-course-hero-copy">
          <p class="recruitment-course-kicker"><span>LEARNING MODULE 01</span><span>60–90 MIN</span></p>
          <h1 id="recruitment-course-title">Local Recruitment in <em>Digital Age</em></h1>
          <p class="recruitment-course-subtitle">Digital Recruitment: Understanding Local Hiring Practices and Job Board Utilization</p>
          <p class="recruitment-course-intro">An industry-aligned learning experience for aspiring HR professionals and recruiters, grounded in the Philippine hiring landscape.</p>
          <div class="recruitment-course-tags"><span>Beginner</span><span>Philippine setting</span><span>Interactive lesson</span></div>
          <button class="recruitment-start-button" type="button" data-course-start>Start the learning journey <span aria-hidden="true">↗</span></button>
        </div>
        <div class="recruitment-course-hero-image" role="img" aria-label="Recruitment team collaborating around a laptop">
          <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85" alt="Recruitment team collaborating around a laptop" loading="lazy">
          <div class="recruitment-image-note"><span>01</span><strong>People-first hiring<br>meets digital reach</strong></div>
          <span class="recruitment-image-spark" aria-hidden="true">✳</span>
        </div>
      </header>

      <div class="recruitment-course-content">
        <section class="recruitment-learning-path" aria-label="Learning journey">
          <div class="recruitment-section-heading"><div><p class="recruitment-eyebrow">YOUR LEARNING JOURNEY</p><h2>Four steps from insight to action</h2></div><span class="recruitment-progress-label" data-progress-label>0 of 4 complete</span></div>
          <div class="recruitment-path-grid">
            <article><span class="recruitment-path-icon">01</span><h3>Learn</h3><p>Understand recruitment concepts and processes.</p></article>
            <article><span class="recruitment-path-icon">02</span><h3>Explore</h3><p>Discover real-world recruitment channels.</p></article>
            <article><span class="recruitment-path-icon">03</span><h3>Practice</h3><p>Simulate posting and sourcing applicants.</p></article>
            <article><span class="recruitment-path-icon">04</span><h3>Assess</h3><p>Test your knowledge through interactive activities.</p></article>
          </div>
        </section>

        <section class="recruitment-objectives-panel">
          <div class="recruitment-objectives-image"><img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=85" alt="Students learning together in a classroom" loading="lazy"><span>BUILT FOR TOMORROW'S HR PROFESSIONALS</span></div>
          <div class="recruitment-objectives-copy"><p class="recruitment-eyebrow">THE BRIEF</p><h2>By the end, you’ll be able to…</h2><p>Target learners: College students taking HR Management, Business Administration, or related programs.</p>
            <ol class="recruitment-objectives-list">
              <li>Explain recruitment in the Philippine labor market.</li><li>Identify local employer recruitment channels.</li><li>Describe how job boards help find qualified applicants.</li><li>Compare online job platforms and their audiences.</li><li>Create an effective, inclusive job advertisement.</li><li>Shortlist candidates against job-related requirements.</li>
            </ol>
          </div>
        </section>

        <section class="recruitment-lesson-section" aria-labelledby="recruitment-lessons-heading">
          <div class="recruitment-section-heading"><div><p class="recruitment-eyebrow">LESSON PLAN · 60–90 MINUTES</p><h2 id="recruitment-lessons-heading">Local recruitment, made practical</h2></div><span class="recruitment-section-mark">01—04</span></div>
          <div class="recruitment-lesson-layout">
            <div class="recruitment-lesson-list">
              <details class="recruitment-lesson-card" open data-learning-step="learn"><summary><span class="recruitment-lesson-number">01</span><span><small>FOUNDATIONS</small><strong>Understanding local recruitment</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>Recruitment is the process of identifying, attracting, and encouraging qualified individuals to apply for available positions. In Philippine companies, hiring needs vary across industries, locations, and business sizes.</p><ul><li>Internal and external recruitment</li><li>Recruitment needs across local industries</li><li>The role of HR recruiters in a fair, organized process</li></ul><button type="button" data-mark-step="learn">Mark foundation complete</button></div></details>
              <details class="recruitment-lesson-card" data-learning-step="explore"><summary><span class="recruitment-lesson-number">02</span><span><small>CHANNELS</small><strong>Where employers find people</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>Strong sourcing plans combine channels. The best choice depends on the role, audience, urgency, and available resources.</p><ul><li>Employee referrals and walk-in applications</li><li>Social media and company career pages</li><li>Online job boards and recruitment agencies</li></ul><button type="button" data-mark-step="explore">Mark channels explored</button></div></details>
              <details class="recruitment-lesson-card" data-learning-step="practice"><summary><span class="recruitment-lesson-number">03</span><span><small>JOB BOARDS</small><strong>From vacancy to applicant</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>A job board is an online platform where employers publish vacancies and job seekers search and apply. Recruiters can widen reach and filter for relevant skills; applicants can discover opportunities across employers.</p><ul><li>Benefits: reach, searchable skills, visibility, and an organized talent pipeline</li><li>Limitations: volume is not the same as fit; access and platform reach differ</li><li>Recruiters still need to review resumes, verify qualifications, and interview fairly</li></ul><button type="button" data-mark-step="practice">Mark job boards explored</button></div></details>
              <details class="recruitment-lesson-card" data-learning-step="assess"><summary><span class="recruitment-lesson-number">04</span><span><small>SIMULATION</small><strong>Recruiter practice activity</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>Build a shortlisting plan for a fictional entry-level customer support opening. Choose a channel, focus on job-related qualifications, and explain why each applicant meets the brief.</p><ul><li>Write a clear job advertisement</li><li>Select an appropriate job board</li><li>Match applicant evidence to role requirements</li><li>Shortlist consistently and document your reasons</li></ul><button type="button" data-mark-step="assess">Mark activity complete</button></div></details>
            </div>
            <figure class="recruitment-lesson-photo"><img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85" alt="Colleagues discussing a hiring plan" loading="lazy"><figcaption><strong>Good recruitment is intentional.</strong><span>Use clear criteria, accessible language, and more than one sourcing route.</span></figcaption></figure>
          </div>
        </section>

        <section class="recruitment-platform-section" aria-labelledby="recruitment-platform-heading">
          <div class="recruitment-section-heading"><div><p class="recruitment-eyebrow">PHILIPPINE JOB BOARDS TO EXPLORE</p><h2 id="recruitment-platform-heading">Know the channel before you post</h2><p>Compare the platform’s audience and tools with your role requirements.</p></div></div>
          <div class="recruitment-platform-grid">
            <article class="recruitment-platform-card"><div class="recruitment-platform-flip-inner"><button class="recruitment-platform-front" type="button" data-platform-flip aria-expanded="false"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=80" alt="Modern public employment office" loading="lazy"><span class="recruitment-platform-type">GOVERNMENT JOB MATCHING</span><strong>PhilJobNet</strong><span class="recruitment-platform-hint">Click to learn more ↻</span></button><div class="recruitment-platform-back" aria-hidden="true" inert><span class="recruitment-platform-type">ABOUT THE PLATFORM</span><h3>PhilJobNet</h3><p>DOLE’s job-matching service connects employers and jobseekers through local vacancy listings and applicant matching.</p><a href="https://philjobnet.gov.ph/" target="_blank" rel="noopener noreferrer">Visit PhilJobNet <span aria-hidden="true">↗</span></a><button class="recruitment-platform-flip-back" type="button" data-platform-flip aria-expanded="false">Flip back ↻</button></div></div></article>
            <article class="recruitment-platform-card"><div class="recruitment-platform-flip-inner"><button class="recruitment-platform-front" type="button" data-platform-flip aria-expanded="false"><img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80" alt="Bright office workspace" loading="lazy"><span class="recruitment-platform-type">PROFESSIONAL & ENTRY-LEVEL</span><strong>JobStreet</strong><span class="recruitment-platform-hint">Click to learn more ↻</span></button><div class="recruitment-platform-back" aria-hidden="true" inert><span class="recruitment-platform-type">ABOUT THE PLATFORM</span><h3>JobStreet</h3><p>A broad hiring platform for professional and entry-level vacancies, including office, BPO, sales, and administrative roles.</p><a href="https://www.jobstreet.com.ph/" target="_blank" rel="noopener noreferrer">Visit JobStreet <span aria-hidden="true">↗</span></a><button class="recruitment-platform-flip-back" type="button" data-platform-flip aria-expanded="false">Flip back ↻</button></div></div></article>
            <article class="recruitment-platform-card"><div class="recruitment-platform-flip-inner"><button class="recruitment-platform-front" type="button" data-platform-flip aria-expanded="false"><img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=700&q=80" alt="Professional meeting and job discussion" loading="lazy"><span class="recruitment-platform-type">CROSS-INDUSTRY DISCOVERY</span><strong>Indeed Philippines</strong><span class="recruitment-platform-hint">Click to learn more ↻</span></button><div class="recruitment-platform-back" aria-hidden="true" inert><span class="recruitment-platform-type">ABOUT THE PLATFORM</span><h3>Indeed Philippines</h3><p>Search vacancies across industries and explore a wide job-discovery experience useful for both applicants and recruiters.</p><a href="https://ph.indeed.com/" target="_blank" rel="noopener noreferrer">Visit Indeed <span aria-hidden="true">↗</span></a><button class="recruitment-platform-flip-back" type="button" data-platform-flip aria-expanded="false">Flip back ↻</button></div></div></article>
            <article class="recruitment-platform-card"><div class="recruitment-platform-flip-inner"><button class="recruitment-platform-front" type="button" data-platform-flip aria-expanded="false"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=80" alt="Professionals connecting over a project" loading="lazy"><span class="recruitment-platform-type">NETWORKING & TALENT SOURCING</span><strong>LinkedIn Jobs</strong><span class="recruitment-platform-hint">Click to learn more ↻</span></button><div class="recruitment-platform-back" aria-hidden="true" inert><span class="recruitment-platform-type">ABOUT THE PLATFORM</span><h3>LinkedIn Jobs</h3><p>Combines professional networking with candidate sourcing, especially useful for specialized and experienced positions.</p><a href="https://www.linkedin.com/jobs/" target="_blank" rel="noopener noreferrer">Visit LinkedIn Jobs <span aria-hidden="true">↗</span></a><button class="recruitment-platform-flip-back" type="button" data-platform-flip aria-expanded="false">Flip back ↻</button></div></div></article>
            <article class="recruitment-platform-card"><div class="recruitment-platform-flip-inner"><button class="recruitment-platform-front" type="button" data-platform-flip aria-expanded="false"><img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80" alt="Young professionals collaborating at work" loading="lazy"><span class="recruitment-platform-type">MATCHING & SKILLS ASSESSMENT</span><strong>Kalibrr</strong><span class="recruitment-platform-hint">Click to learn more ↻</span></button><div class="recruitment-platform-back" aria-hidden="true" inert><span class="recruitment-platform-type">ABOUT THE PLATFORM</span><h3>Kalibrr</h3><p>Uses applicant matching and skills-assessment tools to support recruitment and talent acquisition.</p><a href="https://www.kalibrr.com/" target="_blank" rel="noopener noreferrer">Visit Kalibrr <span aria-hidden="true">↗</span></a><button class="recruitment-platform-flip-back" type="button" data-platform-flip aria-expanded="false">Flip back ↻</button></div></div></article>
          </div>
        </section>

        <section class="recruitment-practice-panel recruitment-resource-assistant" aria-labelledby="recruitment-practice-heading">
          <div class="recruitment-practice-copy"><p class="recruitment-eyebrow">RECRUITMENT-ONLY ASSISTANT</p><h2 id="recruitment-practice-heading">AI-assisted resource plan evaluation</h2><p>Evaluate an appropriate job-board channel, vacancy draft, shortlist criteria, and hiring resources for a recruitment plan.</p>
            <label for="recruitment-channel-choice">Which channel would you explore first?</label>
            <select id="recruitment-channel-choice"><option value="">Choose a channel</option><option value="PhilJobNet">PhilJobNet</option><option value="JobStreet">JobStreet</option><option value="Indeed">Indeed Philippines</option><option value="LinkedIn">LinkedIn Jobs</option><option value="Kalibrr">Kalibrr</option><option value="referrals">Employee referrals</option></select>
            <label for="recruitment-ad-draft">Draft a short, inclusive job advertisement</label>
            <textarea id="recruitment-ad-draft" rows="3" maxlength="500" placeholder="Entry-level Customer Support Associate · Manila · Key skills and responsibilities…"></textarea>
            <fieldset><legend>Which evidence belongs in your shortlist?</legend><label><input type="checkbox" name="recruitment-qualification" value="customer"> Customer-service experience or relevant practice</label><label><input type="checkbox" name="recruitment-qualification" value="communication"> Clear communication skills required for the role</label><label><input type="checkbox" name="recruitment-qualification" value="appearance"> A candidate’s appearance or personal background</label></fieldset>
            <label for="recruitment-hiring-resources">Hiring resources to consider (time, budget, or recruiter capacity)</label>
            <textarea id="recruitment-hiring-resources" rows="2" maxlength="300" placeholder="For example: one recruiter, two weeks, and a limited job-board budget…"></textarea>
            <section class="recruitment-plan-coach" aria-labelledby="recruitment-plan-coach-title"><p class="recruitment-eyebrow">PLAN REVIEW</p><h3 id="recruitment-plan-coach-title">Review your recruitment resources</h3><p>Get focused feedback on the selected job-board channel, vacancy draft, shortlist criteria, or hiring resources. This local assistant is limited to recruitment resource planning.</p><label for="recruitment-coach-question">What part of the plan should be evaluated?</label><textarea id="recruitment-coach-question" rows="2" maxlength="300" placeholder="Does my channel fit the role? Is the draft clear? Are my resources realistic?"></textarea><button type="button" class="recruitment-check-plan" data-evaluate-plan>Evaluate resource plan</button><p class="recruitment-coach-feedback" data-coach-feedback role="status" aria-live="polite"></p></section>
          </div>
          <div class="recruitment-practice-visual"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85" alt="Team planning a recruitment activity" loading="lazy"><div><span>RECRUITER'S NOTE</span><strong>Choose for relevance.<br>Evaluate with care.</strong></div></div>
        </section>

        <section class="recruitment-quiz-panel local-recruitment-challenge-panel" aria-labelledby="recruitment-quiz-heading">
          <div><p class="recruitment-eyebrow">RECRUITMENT CHALLENGE · YOU ARE THE RECRUITMENT OFFICER</p><h2 id="recruitment-quiz-heading">20 applicants. One responsible process.</h2><p>Take the challenge: use job-related evidence, choose suitable channels, and assess every applicant fairly. Answer all five cards to complete the knowledge check.</p></div>
          <form data-recruitment-quiz>
            <fieldset data-quiz-card class="is-active"><legend>1. What is the main purpose of recruitment?</legend><span class="overseas-challenge-count">CHALLENGE 1 OF 5</span><label><input type="radio" name="quiz-q1" value="a"> To identify and attract qualified people to apply</label><label><input type="radio" name="quiz-q1" value="b"> To guarantee a hire without screening</label></fieldset>
            <fieldset data-quiz-card hidden><legend>2. What should guide your choice of job board?</legend><span class="overseas-challenge-count">CHALLENGE 2 OF 5</span><label><input type="radio" name="quiz-q2" value="a"> The platform with the most users, regardless of the role</label><label><input type="radio" name="quiz-q2" value="b"> The role, target audience, reach, and available resources</label></fieldset>
            <fieldset data-quiz-card hidden><legend>3. Does a job board guarantee qualified applicants?</legend><span class="overseas-challenge-count">CHALLENGE 3 OF 5</span><label><input type="radio" name="quiz-q3" value="a"> Yes, every applicant is automatically qualified</label><label><input type="radio" name="quiz-q3" value="b"> No, recruiters must assess fit and verify qualifications</label></fieldset>
            <fieldset data-quiz-card hidden><legend>4. Which is an appropriate shortlist criterion?</legend><span class="overseas-challenge-count">CHALLENGE 4 OF 5</span><label><input type="radio" name="quiz-q4" value="a"> Job-related communication skills supported by evidence</label><label><input type="radio" name="quiz-q4" value="b"> Personal appearance or background</label></fieldset>
            <fieldset data-quiz-card hidden><legend>5. What makes a job advertisement more effective and inclusive?</legend><span class="overseas-challenge-count">CHALLENGE 5 OF 5</span><label><input type="radio" name="quiz-q5" value="a"> Clear responsibilities and relevant requirements in accessible language</label><label><input type="radio" name="quiz-q5" value="b"> Vague requirements and preferences unrelated to the job</label></fieldset>
            <button type="submit">Check answers</button>
          </form>
          <p class="recruitment-quiz-feedback" data-quiz-feedback role="status" aria-live="polite"></p>
        </section>

        <aside class="recruitment-industry-note"><span aria-hidden="true">↗</span><div><strong>An important industry lesson</strong>            <p>Job boards can broaden reach, but they do not guarantee a qualified match. Recruiters must evaluate resumes, verify qualifications, conduct interviews, and assess suitability fairly. DOLE’s Institute for Labor Studies has documented digital labor market intermediaries and differences in how platforms are used across regions.</p><a href="https://ils.dole.gov.ph/" target="_blank" rel="noopener noreferrer">Explore the DOLE Institute for Labor Studies <span aria-hidden="true">↗</span></a></div></aside>
        <footer class="recruitment-course-footer"><span>LEARNING MODULE 01 · DIGITAL RECRUITMENT</span><div class="recruitment-footer-actions"><button class="recruitment-back-top" type="button" data-module-top aria-label="Return to the top of the module" title="Back to top">↑ <span>Back to top</span></button><button type="button" data-course-complete>Complete module <span aria-hidden="true">✓</span></button></div></footer>
      </div>
    </section>`;

  const overseasModuleMarkup = `
    <section class="recruitment-learning-module recruitment-overseas-module" aria-labelledby="overseas-course-title" data-module-number="2" hidden>
      <nav class="recruitment-module-controls" aria-label="Module navigation"><button type="button" data-module-close aria-label="Close module and return to learning modules" title="Close module">×</button></nav>
      <header class="recruitment-course-hero"><div class="recruitment-course-hero-copy">
        <p class="recruitment-course-kicker"><span>LEARNING MODULE 02</span><span>60–90 MIN</span></p>
        <h1 id="overseas-course-title">Overseas Recruitment in the <em>Digital Age</em></h1>
        <p class="recruitment-course-subtitle">A digital recruitment simulation for ethical, safe, and effective international hiring.</p>
        <p class="recruitment-course-intro">Take the role of a recruitment officer at a Philippine agency. Explore the journey from an authorized job order to applicant deployment.</p>
        <div class="recruitment-course-tags"><span>Philippine setting</span><span>Scenario-based</span><span>Ethics first</span></div>
        <button class="recruitment-start-button" type="button" data-course-start>Start the mission <span aria-hidden="true">↗</span></button>
      </div><div class="recruitment-course-hero-image" role="img" aria-label="Recruitment team collaborating on an international hiring plan"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85" alt="Recruitment team collaborating on an international hiring plan" loading="lazy"><div class="recruitment-image-note"><span>02</span><strong>Global opportunity<br>with safe practice</strong></div></div></header>
      <div class="recruitment-course-content">
        <section class="recruitment-objectives-panel"><div class="recruitment-objectives-image"><img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=85" alt="Learners collaborating on an overseas recruitment exercise" loading="lazy"><span>YOUR OVERSEAS RECRUITMENT MISSION</span></div><div class="recruitment-objectives-copy"><p class="recruitment-eyebrow">LEARNING OBJECTIVES</p><h2>By the end of this lesson, you’ll be able to…</h2><ol class="recruitment-objectives-list"><li>Explain overseas recruitment in the Philippines.</li><li>Identify digital tools agencies use to attract and manage applicants.</li><li>Describe how job boards and social media support international recruitment.</li><li>Demonstrate basic screening and digital recruitment management.</li><li>Apply ethical recruitment, data privacy, and fraud-prevention principles.</li><li>Recognize ways AI can improve recruitment efficiency responsibly.</li></ol></div></section>
        <section class="recruitment-lesson-section" aria-labelledby="overseas-lessons-heading"><div class="recruitment-section-heading"><div><p class="recruitment-eyebrow">SIX INTERACTIVE LEARNING SECTIONS</p><h2 id="overseas-lessons-heading">From job order to deployment</h2></div><span class="recruitment-section-mark">01—06</span></div>
          <div class="recruitment-lesson-layout"><div class="recruitment-lesson-list">
            <details class="recruitment-lesson-card" open><summary><span class="recruitment-lesson-number">01</span><span><small>FOUNDATIONS</small><strong>Understanding overseas recruitment in the Philippines</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>Overseas recruitment connects Filipino applicants with verified international employers through a regulated process. Philippine recruitment agencies and the Department of Migrant Workers (DMW) play important roles in oversight and worker protection.</p><ul><li>Agency roles and DMW oversight</li><li>Process: authorized job order, sourcing, screening, documentation, and deployment</li><li>Applicant rights and responsibilities at every stage</li></ul></div></details>
            <details class="recruitment-lesson-card"><summary><span class="recruitment-lesson-number">02</span><span><small>APPLICANT SOURCING</small><strong>Digital job boards and applicant sourcing</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>Use accurate, authorized advertisements to reach qualified Filipino applicants. Match the channel to the role and audience.</p><ul><li>Job boards, Facebook, LinkedIn, JobStreet, and agency channels</li><li>Clear, accurate job postings and employer requirements</li><li>Attract applicants without misleading claims</li></ul></div></details>
            <details class="recruitment-lesson-card"><summary><span class="recruitment-lesson-number">03</span><span><small>FAIR ASSESSMENT</small><strong>Digital applicant screening and assessment</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>Screen consistently against documented employer requirements. Digital interviews can improve access, while human review protects context and fairness.</p><ul><li>Resume and CV evaluation, structured screening, and online interviews</li><li>Match evidence to employer requirements</li><li>Use AI-assisted screening responsibly, with human oversight</li></ul></div></details>
            <details class="recruitment-lesson-card"><summary><span class="recruitment-lesson-number">04</span><span><small>ORGANIZATION</small><strong>Recruitment management systems</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>Applicant tracking systems and digital databases help teams organize recruitment stages and follow-up.</p><ul><li>Track progress from application to deployment</li><li>Manage documents and verification steps carefully</li><li>Limit access to applicant information</li></ul></div></details>
            <details class="recruitment-lesson-card"><summary><span class="recruitment-lesson-number">05</span><span><small>SAFETY & ETHICS</small><strong>Ethical and safe digital recruitment</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>Protect applicants from illegal recruitment, online scams, and misuse of personal data. Verify agencies and opportunities through official channels.</p><ul><li>Apply Data Privacy Act principles to applicant information</li><li>Use secure, authorized document channels</li><li>Communicate transparently and protect applicant rights</li></ul></div></details>
            <details class="recruitment-lesson-card"><summary><span class="recruitment-lesson-number">06</span><span><small>WHAT’S NEXT</small><strong>The future of overseas recruitment</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>AI and automation can support recruitment, but accountable human judgment remains essential.</p><ul><li>AI, automated applicant communication, and digital assessments</li><li>Global talent acquisition and digital interviews</li><li>Balance efficiency with human care and fairness</li></ul></div></details>
          </div><figure class="recruitment-lesson-photo"><img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85" alt="Recruitment team reviewing a hiring plan" loading="lazy"><figcaption><strong>Verify before you recruit.</strong><span>Authorized opportunities, clear information, and secure applicant data are the foundation.</span></figcaption></figure></div>
        </section>
        <section class="recruitment-practice-panel overseas-challenge-panel"><div class="recruitment-practice-copy"><p class="recruitment-eyebrow">RECRUITMENT CHALLENGE · YOU ARE THE RECRUITMENT OFFICER</p><h2>20 applicants. One responsible process.</h2><p>Your Philippine-based agency receives an authorized job order from an international employer. Use digital tools to recruit safely and fairly.</p>
          <div class="overseas-challenge-card" data-overseas-challenge="1"><span class="overseas-challenge-count">CHALLENGE 1 OF 3</span><h3>Find applicants</h3><p>Which platform would you use to advertise the vacancy?</p><label><input type="radio" name="overseas-challenge-1" value="correct"> Facebook and reputable online job boards</label><label><input type="radio" name="overseas-challenge-1" value="wrong"> Personal messages to random users</label><label><input type="radio" name="overseas-challenge-1" value="wrong"> Unverified social media accounts</label><p class="overseas-challenge-feedback" role="status" aria-live="polite"></p></div>
          <div class="overseas-challenge-card" data-overseas-challenge="2" hidden><span class="overseas-challenge-count">CHALLENGE 2 OF 3</span><h3>Screen applicants</h3><p>You received 100 applications. What should you do first?</p><label><input type="radio" name="overseas-challenge-2" value="correct"> Compare qualifications against employer requirements</label><label><input type="radio" name="overseas-challenge-2" value="wrong"> Select applicants based on profile pictures</label><label><input type="radio" name="overseas-challenge-2" value="wrong"> Interview everyone without screening</label><p class="overseas-challenge-feedback" role="status" aria-live="polite"></p></div>
          <div class="overseas-challenge-card" data-overseas-challenge="3" hidden><span class="overseas-challenge-count">CHALLENGE 3 OF 3</span><h3>Protect applicant information</h3><p>An applicant sends passport documents through an unofficial social account. What should you do?</p><label><input type="radio" name="overseas-challenge-3" value="correct"> Direct them to an authorized, secure document-submission channel</label><label><input type="radio" name="overseas-challenge-3" value="wrong"> Forward the documents to personal contacts</label><label><input type="radio" name="overseas-challenge-3" value="wrong"> Post the documents in a recruitment group</label><p class="overseas-challenge-feedback" role="status" aria-live="polite"></p></div>
          <p class="overseas-challenge-progress" data-overseas-challenge-progress aria-live="polite">Choose an answer to begin.</p>
        </div><div class="recruitment-practice-visual"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85" alt="Recruitment team planning an international hiring process" loading="lazy"><div><span>RECRUITER'S NOTE</span><strong>Reach widely.<br>Screen fairly.<br>Protect every applicant.</strong></div></div></section>
        <aside class="recruitment-industry-note"><span aria-hidden="true">✓</span><div><strong>Safe recruitment is everyone’s responsibility</strong><p>Confirm that job opportunities and recruitment channels are authorized. Be transparent with applicants, protect personal information, and escalate suspicious activity through appropriate official channels.</p><a href="https://dmw.gov.ph/" target="_blank" rel="noopener noreferrer">Visit the Department of Migrant Workers <span aria-hidden="true">↗</span></a></div></aside>
        <footer class="recruitment-course-footer"><span>LEARNING MODULE 02 · OVERSEAS RECRUITMENT</span><div class="recruitment-footer-actions"><button class="recruitment-back-top" type="button" data-module-top aria-label="Return to the top of the module" title="Back to top">↑ <span>Back to top</span></button><button type="button" data-course-complete>Complete module <span aria-hidden="true">✓</span></button></div></footer>
      </div>
    </section>`;

  const comparisonModuleMarkup = `
    <section class="recruitment-learning-module recruitment-race-module" aria-labelledby="race-course-title" data-module-number="3" hidden>
      <nav class="recruitment-module-controls" aria-label="Module navigation"><button type="button" data-module-close aria-label="Close module and return to learning modules" title="Close module">×</button></nav>
      <header class="recruitment-course-hero"><div class="recruitment-course-hero-copy"><p class="recruitment-course-kicker"><span>LEARNING MODULE 03</span><span>60–90 MIN</span></p><h1 id="race-course-title">LOCAL vs. OVERSEAS <em>The Recruitment Race</em></h1><p class="recruitment-course-subtitle">Two Recruitment Pathways. One Goal: The Right Talent for the Right Opportunity.</p><p class="recruitment-course-intro">An interactive journey through Philippine recruitment operations. Take charge of two job orders and choose the right path from requisition to hiring or deployment.</p><div class="recruitment-course-tags"><span>Simulation</span><span>Two pathways</span><span>Philippine setting</span></div><button class="recruitment-start-button" type="button" data-course-start>Start the recruitment race <span aria-hidden="true">↗</span></button></div><div class="recruitment-course-hero-image" role="img" aria-label="Recruiters comparing two hiring pathways"><img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1100&q=85" alt="Recruiters collaborating on hiring plans" loading="lazy"><div class="recruitment-image-note"><span>03</span><strong>Two pathways.<br>One right match.</strong></div></div></header>
      <div class="recruitment-course-content">
        <section class="recruitment-objectives-panel"><div class="recruitment-objectives-image"><img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=85" alt="Learners working together on recruitment scenarios" loading="lazy"><span>YOUR RECRUITMENT RACE BRIEF</span></div><div class="recruitment-objectives-copy"><p class="recruitment-eyebrow">LEARNING OBJECTIVES</p><h2>By the finish line, you can…</h2><ol class="recruitment-objectives-list"><li>Explain the difference between local and overseas recruitment.</li><li>Identify each pathway’s step-by-step workflow.</li><li>Recognize the responsible government regulators.</li><li>Identify documents required during hiring.</li><li>Describe agency, employer, and applicant responsibilities.</li><li>Choose the right process for a hiring scenario.</li></ol></div></section>
        <section class="recruitment-lesson-section"><div class="recruitment-section-heading"><div><p class="recruitment-eyebrow">TWO PATHWAYS · TWO FINISH LINES</p><h2>Choose the route that fits the job order</h2></div><span class="recruitment-section-mark">A / B</span></div><div class="race-pathway-grid"><article class="race-pathway-card"><span class="recruitment-path-icon">A</span><p class="recruitment-eyebrow">HIRING WITHIN THE PHILIPPINES</p><h3>Path A · Local recruitment</h3><ol><li>Manpower requisition</li><li>Job posting and advertising</li><li>Application screening</li><li>Initial interview and assessment</li><li>Client interview</li><li>Job offer and negotiation</li><li>Pre-employment requirements</li><li>Hiring and onboarding</li></ol><strong class="race-finish">FINISH · Candidate hired and onboarded</strong></article><article class="race-pathway-card race-overseas-path"><span class="recruitment-path-icon">B</span><p class="recruitment-eyebrow">DEPLOYMENT OUTSIDE THE PHILIPPINES</p><h3>Path B · Overseas recruitment</h3><ol><li>Verify foreign employer and job order</li><li>Confirm agency DMW license and authority</li><li>Publish approved job advertisement</li><li>Screen applicants against requirements</li><li>Agency and employer interviews</li><li>Process and verify employment contract</li><li>Complete medical and document requirements</li><li>Complete pre-departure steps and clearances</li><li>Deploy after applicable approvals</li></ol><strong class="race-finish">FINISH · Worker legally deployed</strong></article></div></section>
        <section class="recruitment-platform-section"><div class="recruitment-section-heading"><div><p class="recruitment-eyebrow">INTERACTIVE COMPARISON</p><h2>Spot the operational differences</h2><p>Procedures vary by role, employer, destination, and applicable regulations.</p></div></div><div class="race-table-wrap"><table class="race-compare-table"><thead><tr><th scope="col">Recruitment component</th><th scope="col">Local</th><th scope="col">Overseas</th></tr></thead><tbody><tr><th scope="row">Employment location</th><td>Philippines</td><td>Foreign country</td></tr><tr><th scope="row">Employer</th><td>Philippine employer</td><td>Foreign employer</td></tr><tr><th scope="row">Main regulator</th><td>DOLE</td><td>DMW</td></tr><tr><th scope="row">Recruitment channels</th><td>Job boards, referrals, social media</td><td>Agency networks, approved job orders, job boards</td></tr><tr><th scope="row">Interviews</th><td>Employer or hiring manager</td><td>Agency and foreign employer</td></tr><tr><th scope="row">Contract</th><td>Local employment contract</td><td>Overseas employment contract</td></tr><tr><th scope="row">Additional requirements</th><td>Applicable pre-employment documents</td><td>Passport, visa, medical, contract processing, deployment requirements</td></tr><tr><th scope="row">Finish line</th><td>Local employment</td><td>Legal overseas deployment</td></tr></tbody></table></div><aside class="recruitment-industry-note"><span aria-hidden="true">!</span><div><strong>Important distinction</strong><p>Local recruitment follows applicable Philippine labor and employment requirements. Overseas recruitment adds DMW licensing, job-order, contract, and deployment compliance. Always confirm current rules for the specific role and destination.</p></div></aside></section>
        <section class="recruitment-practice-panel race-activity-panel"><div class="recruitment-practice-copy"><p class="recruitment-eyebrow">ACTIVITY 1 · RACE-DAY KNOWLEDGE CHECK</p><h2>Two job orders. Two correct routes.</h2><p>Take the recruiter’s seat. Choose the right recruitment pathway for each order; a correct answer advances to the next challenge.</p><div class="overseas-challenge-card" data-race-challenge="1"><span class="overseas-challenge-count">RACE CHALLENGE 1 OF 2</span><h3>Laguna manufacturing</h3><p>A Philippine company needs 15 production operators to work in Laguna. Which pathway fits?</p><label><input type="radio" name="race-scenario-a" value="local"> Local recruitment within the Philippines</label><label><input type="radio" name="race-scenario-a" value="overseas"> Overseas recruitment and deployment</label><p class="overseas-challenge-feedback" role="status" aria-live="polite"></p></div><div class="overseas-challenge-card" data-race-challenge="2" hidden><span class="overseas-challenge-count">RACE CHALLENGE 2 OF 2</span><h3>Saudi Arabia construction</h3><p>A foreign construction employer has a job order for 20 skilled workers. Which pathway fits?</p><label><input type="radio" name="race-scenario-b" value="local"> Local recruitment within the Philippines</label><label><input type="radio" name="race-scenario-b" value="overseas"> Overseas recruitment with applicable authorization and deployment steps</label><p class="overseas-challenge-feedback" role="status" aria-live="polite"></p></div><p class="overseas-challenge-progress" data-race-challenge-progress aria-live="polite">Choose a pathway to start the race.</p></div><div class="recruitment-practice-visual"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85" alt="Recruitment team planning hiring routes" loading="lazy"><div><span>RECRUITER'S NOTE</span><strong>Match the process<br>to the work location.</strong></div></div></section>
        <section class="recruitment-practice-panel race-activity-panel"><div class="recruitment-practice-copy"><p class="recruitment-eyebrow">ACTIVITY 2 · ARRANGE THE WORKFLOW</p><h2>Put local hiring in order</h2><p>Drag the steps into order, starting with the requisition and ending with onboarding. You can also focus a step and use the up and down arrow keys.</p><ol class="race-sort-list" data-race-sortable><li draggable="true" tabindex="0"><span class="race-drag-handle" aria-hidden="true"></span><span>Job posting</span></li><li draggable="true" tabindex="0"><span class="race-drag-handle" aria-hidden="true"></span><span>Initial screening</span></li><li draggable="true" tabindex="0"><span class="race-drag-handle" aria-hidden="true"></span><span>Manpower requisition</span></li><li draggable="true" tabindex="0"><span class="race-drag-handle" aria-hidden="true"></span><span>Final interview</span></li><li draggable="true" tabindex="0"><span class="race-drag-handle" aria-hidden="true"></span><span>Job offer</span></li><li draggable="true" tabindex="0"><span class="race-drag-handle" aria-hidden="true"></span><span>Onboarding</span></li></ol><button type="button" data-check-race-sequence>Submit my sequence</button><p class="race-feedback" data-race-sequence-feedback role="status" aria-live="polite"></p></div><div class="recruitment-practice-visual"><div class="race-visual-note"><span>THE LOCAL PATH</span><strong>Requisition →<br>selection →<br>onboarding</strong></div></div></section>
        <section class="recruitment-quiz-panel race-knowledge-check-panel" aria-labelledby="race-quiz-heading"><div><p class="recruitment-eyebrow">KNOWLEDGE CHECK · ARE YOU RECRUITMENT-READY?</p><h2 id="race-quiz-heading">Race-day knowledge check</h2><p>Answer all five questions correctly to complete the assessment.</p></div><form data-race-quiz><fieldset><legend>1. Which agency regulates overseas employment recruitment in the Philippines?</legend><label><input type="radio" name="race-q1" value="a"> TESDA</label><label><input type="radio" name="race-q1" value="b"> DMW</label><label><input type="radio" name="race-q1" value="c"> DTI</label><label><input type="radio" name="race-q1" value="d"> SEC</label></fieldset><fieldset><legend>2. What is the first step in a typical local recruitment process?</legend><label><input type="radio" name="race-q2" value="a"> Job offer</label><label><input type="radio" name="race-q2" value="b"> Onboarding</label><label><input type="radio" name="race-q2" value="c"> Manpower requisition</label><label><input type="radio" name="race-q2" value="d"> Medical examination</label></fieldset><fieldset><legend>3. What is important before overseas deployment?</legend><label><input type="radio" name="race-q3" value="a"> Social media account</label><label><input type="radio" name="race-q3" value="b"> Applicable employment and deployment documentation</label><label><input type="radio" name="race-q3" value="c"> Personal recommendation letter</label><label><input type="radio" name="race-q3" value="d"> Local company ID</label></fieldset><fieldset><legend>4. What is the main purpose of applicant screening?</legend><label><input type="radio" name="race-q4" value="a"> Select candidates based on job qualifications</label><label><input type="radio" name="race-q4" value="b"> Immediately deploy applicants</label><label><input type="radio" name="race-q4" value="c"> Issue employment contracts</label><label><input type="radio" name="race-q4" value="d"> Conduct company orientation</label></fieldset><fieldset><legend>5. What is the key difference between local and overseas recruitment?</legend><label><input type="radio" name="race-q5" value="a"> Number of interviews</label><label><input type="radio" name="race-q5" value="b"> Recruitment officer’s job title</label><label><input type="radio" name="race-q5" value="c"> Employment location and applicable regulatory requirements</label><label><input type="radio" name="race-q5" value="d"> Candidate’s age</label></fieldset><button type="submit">Check answers</button></form><p class="recruitment-quiz-feedback" data-race-quiz-feedback role="status" aria-live="polite"></p></section>
        <footer class="recruitment-course-footer"><span>LEARNING MODULE 03 · THE RECRUITMENT RACE</span><div class="recruitment-footer-actions"><button class="recruitment-back-top" type="button" data-module-top aria-label="Return to the top of the module" title="Back to top">↑ <span>Back to top</span></button><button type="button" data-course-complete>Complete module <span aria-hidden="true">✓</span></button></div></footer>
      </div>
    </section>`;

  const atsModuleMarkup = `
    <section class="recruitment-learning-module recruitment-ats-course" aria-labelledby="ats-course-title" data-module-number="4" hidden>
      <nav class="recruitment-module-controls" aria-label="Module navigation"><button type="button" data-module-close aria-label="Close module and return to learning modules" title="Close module">×</button></nav>
      <header class="recruitment-course-hero ats-course-hero"><div class="recruitment-course-hero-copy"><p class="recruitment-course-kicker"><span>LEARNING MODULE 04</span><span>60–90 MIN</span></p><h1 id="ats-course-title">Mastering Applicant Tracking <em>Systems</em> for Local and Overseas Recruitment</h1><p class="recruitment-course-subtitle">Digital Learning Course: Applicant Tracking System (ATS)</p><p class="recruitment-course-intro">Practice how Philippine recruitment agencies and HR teams collect, organize, evaluate, and monitor candidate applications for local and overseas employment.</p><div class="recruitment-course-tags"><span>Beginner to intermediate</span><span>Interactive learning</span><span>Privacy first</span></div><button class="recruitment-start-button" type="button" data-course-start>Open the ATS workspace <span aria-hidden="true">↗</span></button></div><div class="recruitment-course-hero-image" role="img" aria-label="Recruitment team reviewing a digital candidate pipeline"><img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1100&q=85" alt="Recruitment team reviewing a digital candidate pipeline" loading="lazy"><div class="recruitment-image-note"><span>04</span><strong>Organize talent.<br>Protect every record.</strong></div></div></header>
      <div class="recruitment-course-content">
        <section class="recruitment-objectives-panel"><div class="recruitment-objectives-image"><img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=85" alt="Team collaborating on an applicant tracking workflow" loading="lazy"><span>YOUR ATS LEARNING BRIEF</span></div><div class="recruitment-objectives-copy"><p class="recruitment-eyebrow">LEARNING OBJECTIVES</p><h2>By the end of this course, you can…</h2><ol class="recruitment-objectives-list"><li>Explain the purpose and value of an ATS.</li><li>Identify appropriate local and overseas applicant information.</li><li>Create and manage a candidate profile.</li><li>Differentiate local and overseas requirements.</li><li>Track candidates through recruitment stages.</li><li>Apply privacy-conscious document practices.</li></ol></div></section>
        <section class="recruitment-lesson-section"><div class="recruitment-section-heading"><div><p class="recruitment-eyebrow">SIX INTERACTIVE COURSE MODULES</p><h2>From candidate profile to safe hiring</h2></div><span class="recruitment-section-mark">01—06</span></div><div class="recruitment-lesson-list">
          <details class="recruitment-lesson-card" open><summary><span class="recruitment-lesson-number">01</span><span><small>FOUNDATIONS</small><strong>Introduction to Applicant Tracking Systems</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>An ATS centralizes applications and helps recruitment teams manage candidate records and workflow stages. It supports organization and consistency; it does not replace fair human decisions.</p><ul><li>Candidate collection, search, and status tracking</li><li>Digital recruitment compared with manual records</li><li>Use job-related criteria and human oversight</li></ul></div></details>
          <details class="recruitment-lesson-card"><summary><span class="recruitment-lesson-number">02</span><span><small>PROFILING</small><strong>Candidate registration and profiling</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>Keep candidate records relevant to the position and recruitment stage.</p><ul><li>Contact details, education, work history, skills, and certifications</li><li>Position applied for and application source</li><li>Collect only information needed for a clear hiring purpose</li></ul></div></details>
          <details class="recruitment-lesson-card"><summary><span class="recruitment-lesson-number">03</span><span><small>DOCUMENTS</small><strong>Document collection and management</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>Use stage-specific checklists. Do not request sensitive or destination-specific documents before they are needed.</p><ul><li>Local: CV and relevant credentials, as required</li><li>Overseas: passport and destination-specific records at the appropriate stage</li><li>Verify validity, restrict access, and monitor expiry carefully</li></ul></div></details>
          <details class="recruitment-lesson-card"><summary><span class="recruitment-lesson-number">04</span><span><small>WORKFLOWS</small><strong>Local vs. overseas recruitment workflows</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>Local hiring and overseas recruitment have different employer, authorization, documentation, and deployment steps.</p><ul><li>Local: screening, interviews, offer, applicable requirements, onboarding</li><li>Overseas: verify job order and agency authority, screen, process required documents, and deploy after approvals</li><li>Confirm current requirements for each destination and role</li></ul></div></details>
          <details class="recruitment-lesson-card"><summary><span class="recruitment-lesson-number">05</span><span><small>PIPELINE</small><strong>Applicant tracking and recruitment status</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>Consistent status labels help teams see the next action and avoid losing candidate follow-up.</p><ul><li>New applicant, initial screening, qualified, interview, assessment</li><li>Employer endorsement, selected, documentation, hired or deployed</li><li>Rejected, withdrawn, and on hold with clear, respectful records</li></ul></div></details>
          <details class="recruitment-lesson-card"><summary><span class="recruitment-lesson-number">06</span><span><small>PRIVACY</small><strong>Data privacy and ATS best practices</strong></span><span class="recruitment-expand" aria-hidden="true">＋</span></summary><div class="recruitment-lesson-body"><p>Handle applicant information transparently and securely, following applicable privacy requirements including the Philippine Data Privacy Act of 2012 (RA 10173).</p><ul><li>Explain the purpose and obtain appropriate consent</li><li>Limit access to authorized staff and secure stored documents</li><li>Apply retention and safe disposal rules; avoid unnecessary sensitive data</li></ul></div></details>
        </div></section>
        <section class="recruitment-practice-panel ats-activity-panel"><div class="recruitment-practice-copy"><p class="recruitment-eyebrow">ACTIVITY 1 · BUILD A SAMPLE PROFILE</p><h2>Meet your candidate</h2><p>Use fictional sample details only. A good ATS profile is concise, relevant, and connected to a specific application.</p><div class="ats-profile-form"><label>Candidate name<input data-ats-profile-name maxlength="80" placeholder="e.g. Alex Santos"></label><label>Position applied for<input data-ats-profile-role maxlength="80" placeholder="e.g. Administrative Assistant"></label><label>Application source<select data-ats-profile-source><option value="">Choose a source</option><option>JobStreet</option><option>Indeed</option><option>LinkedIn</option><option>Facebook</option><option>Walk-in</option><option>Referral</option></select></label></div><button type="button" data-ats-profile-submit>Save sample profile</button><p class="race-feedback" data-ats-profile-feedback role="status" aria-live="polite"></p></div><div class="recruitment-practice-visual"><div class="race-visual-note"><span>ATS WORKSPACE</span><strong>Relevant details.<br>Clear purpose.</strong></div></div></section>
        <section class="recruitment-practice-panel ats-activity-panel"><div class="recruitment-practice-copy"><p class="recruitment-eyebrow">ACTIVITY 2 · DOCUMENT CLASSIFICATION</p><h2>Local or overseas?</h2><p>Classify these documents by their most appropriate recruitment use. Stage and destination requirements vary; not every document is collected at registration.</p><fieldset class="ats-document-options"><legend>Choose the best category for each item</legend><label>Resume / CV<select data-ats-document="cv"><option value="">Choose</option><option value="both">Local and overseas</option><option value="overseas">Overseas only</option></select></label><label>Passport copy for an overseas job order<select data-ats-document="passport"><option value="">Choose</option><option value="both">Local and overseas</option><option value="overseas">Overseas only</option></select></label><label>Destination-specific employment documents<select data-ats-document="destination"><option value="">Choose</option><option value="both">Local and overseas</option><option value="overseas">Overseas only</option></select></label></fieldset><button type="button" data-ats-documents-check>Check document choices</button><p class="race-feedback" data-ats-documents-feedback role="status" aria-live="polite"></p></div><div class="recruitment-practice-visual"><div class="race-visual-note"><span>DOCUMENT CARE</span><strong>Collect only<br>when needed.</strong></div></div></section>
        <section class="recruitment-practice-panel ats-activity-panel"><div class="recruitment-practice-copy"><p class="recruitment-eyebrow">ACTIVITY 3 · SELECT A WORKFLOW</p><h2>Route this applicant responsibly</h2><p>Alex applies for a job based in Manila. Bea applies for a verified overseas job order. Choose the matching workflow before requesting stage-specific documents.</p><div class="ats-pathway-options"><button type="button" data-ats-path="local">Alex · Local hiring</button><button type="button" data-ats-path="overseas">Bea · Overseas recruitment</button></div><p class="race-feedback" data-ats-path-feedback role="status" aria-live="polite"></p></div><div class="recruitment-practice-visual"><div class="race-visual-note"><span>WORKFLOW</span><strong>Match process<br>to destination.</strong></div></div></section>
        <section class="recruitment-practice-panel ats-activity-panel"><div class="recruitment-practice-copy"><p class="recruitment-eyebrow">ACTIVITY 4 · PIPELINE CHALLENGE</p><h2>Choose the next recruitment status</h2><p>A candidate has passed initial screening and meets the documented role requirements. Record a clear next step.</p><label class="ats-stage-label">Candidate stage<select data-ats-stage><option value="">Select a status</option><option>New Applicant</option><option>For Initial Screening</option><option>Qualified</option><option>For Interview</option><option>For Employer Endorsement</option><option>For Documentation</option></select></label><button type="button" data-ats-stage-check>Update candidate status</button><p class="race-feedback" data-ats-stage-feedback role="status" aria-live="polite"></p></div><div class="recruitment-practice-visual"><div class="race-visual-note"><span>PIPELINE</span><strong>Track the next<br>clear action.</strong></div></div></section>
        <section class="recruitment-quiz-panel ats-privacy-challenge"><div><p class="recruitment-eyebrow">ACTIVITY 5 · DATA PRIVACY CHALLENGE</p><h2>Protect the candidate record</h2><p>A team member requests passport copies for an applicant who has only just registered for a local role. What is the best response?</p></div><div class="ats-privacy-options"><button type="button" data-ats-privacy="wrong">Share the files in the team’s public chat so everyone can review them.</button><button type="button" data-ats-privacy="correct">Do not collect or share unnecessary documents; follow the role’s purpose, stage, consent, and access rules.</button><button type="button" data-ats-privacy="wrong">Keep copies indefinitely in a personal device folder.</button></div><p class="recruitment-quiz-feedback" data-ats-privacy-feedback role="status" aria-live="polite"></p></section>
        <aside class="recruitment-industry-note"><span aria-hidden="true">✓</span><div><strong>ATS tools support responsible decisions</strong><p>Use fictional practice records, collect only what is necessary, keep information secure, and ensure recruitment decisions remain fair and appropriately reviewed.</p></div></aside>
        <footer class="recruitment-course-footer"><span>LEARNING MODULE 04 · APPLICANT TRACKING SYSTEMS</span><div class="recruitment-footer-actions"><button class="recruitment-back-top" type="button" data-module-top aria-label="Return to the top of the module" title="Back to top">↑ <span>Back to top</span></button><button type="button" data-course-complete>Complete module <span aria-hidden="true">✓</span></button></div></footer>
      </div>
    </section>`;

  const atsProgressKey = 'hireflowATSRecruitmentLearningProgress';
  const extendedProgressKeys = { '5': 'hireflowHRISLearningProgress', '6': 'hireflowOutlookLearningProgress', '7': 'hireflowEmailMarketingLearningProgress', '8': 'hireflowLeadGenerationLearningProgress' };
  const keyForModule = module => module?.dataset.moduleNumber === '2' ? overseasProgressKey : module?.dataset.moduleNumber === '3' ? comparisonProgressKey : module?.dataset.moduleNumber === '4' ? atsProgressKey : extendedProgressKeys[module?.dataset.moduleNumber] || progressKey;
  const moduleForNumber = number => root.querySelector(`.recruitment-learning-module[data-module-number="${number}"]`);
  function getProgress(module) {
    const email = String(currentAccount().email || '').toLowerCase();
    const records = getProgressRecords(keyForModule(module));
    return records[email] || (email && Array.isArray(records.steps) ? records : { steps: [] });
  }
  function getProgressRecords(key = progressKey) {
    try { const value = JSON.parse(localStorage.getItem(key) || '{}'); return value && typeof value === 'object' ? value : {}; }
    catch { return {}; }
  }
  function saveProgress(progress, module) {
    const email = String(currentAccount().email || '').toLowerCase();
    if (!email) return;
    const key = keyForModule(module);
    const records = getProgressRecords(key);
    records[email] = { ...progress, updatedAt: new Date().toISOString() };
          try { localStorage.setItem(key, JSON.stringify(records)); document.dispatchEvent(new Event('learning-progress-updated')); } catch { /* Keep this lesson usable if storage is unavailable. */ }
  }
  function completedModuleSteps(moduleNumber, record) {
    const expected = moduleNumber === '2' ? ['challenge-1', 'challenge-2', 'challenge-3'] : moduleNumber === '3' ? ['path', 'workflow', 'assess'] : moduleNumber === '4' ? ['profile', 'documents', 'pathway', 'pipeline', 'privacy'] : ['learn', 'explore', 'practice', 'assess'];
    const completed = new Set(Array.isArray(record?.steps) ? record.steps : []);
    if (moduleNumber === '2' && Array.isArray(record?.challenges)) record.challenges.forEach(number => completed.add(`challenge-${number}`));
    return { expected, completed: expected.filter(step => completed.has(step)) };
  }
  function updateLaunchCard() {
    const account = currentAccount();
    let accounts = [];
    try { accounts = JSON.parse(localStorage.getItem(accountsKey) || '[]'); } catch { accounts = []; }
    const code = String(account.teacherCode || '').trim().toUpperCase();
    const students = account.role === 'teacher' ? accounts.filter(item => item.role === 'student' && String(item.teacherCode || '').trim().toUpperCase() === code) : [];
    const stepNames = {learn:'Foundations',explore:'Lessons explored',practice:'Practical activity',assess:'Knowledge check',path:'Pathway challenge',workflow:'Workflow activity','challenge-1':'Find applicants','challenge-2':'Screen applicants','challenge-3':'Protect applicant information',profile:'Sample profile',documents:'Document classification',pathway:'Recruitment pathway',pipeline:'Candidate pipeline',privacy:'Data privacy'};
    root.querySelectorAll('.recruitment-learning-launch-card').forEach(card => {
      const moduleNumber = card.dataset.moduleNumber || '1';
      const status = card.querySelector('[data-learning-status]');
      let progressButton = card.querySelector('[data-teacher-progress-toggle]');
      if (status) { status.hidden = true; status.textContent = ''; }
      if (!progressButton) {
        progressButton = document.createElement('button');
        progressButton.type = 'button';
        progressButton.className = 'recruitment-teacher-progress-toggle';
        progressButton.dataset.teacherProgressToggle = '';
        progressButton.setAttribute('aria-expanded', 'false');
        progressButton.textContent = 'Progress';
        card.append(progressButton);
      }
      progressButton.hidden = false;
      progressButton.textContent = 'Progress';
      const panelId = `learning-progress-module-${moduleNumber}`;
      progressButton.setAttribute('aria-controls', panelId);
      let roster = card.querySelector('[data-teacher-progress]');
      if (!roster) {
        roster = document.createElement('div');
        roster.className = 'recruitment-teacher-progress';
        roster.dataset.teacherProgress = '';
        roster.hidden = true;
        card.append(roster);
      }
      roster.id = panelId;
      roster.setAttribute('role', 'dialog');
      roster.setAttribute('aria-modal', 'true');
      roster.setAttribute('aria-label', `Module ${moduleNumber} progress`);
      card.querySelector('[data-card-progress]')?.remove();

      const records = getProgressRecords(moduleNumber === '2' ? overseasProgressKey : moduleNumber === '3' ? comparisonProgressKey : moduleNumber === '4' ? atsProgressKey : extendedProgressKeys[moduleNumber] || progressKey);
      const expectedSteps = completedModuleSteps(moduleNumber, {}).expected;
      const requiredSteps = expectedSteps.length;
      if (account.role === 'teacher') {
        const complete = students.filter(item => records[String(item.email || '').toLowerCase()]?.complete === true);
        roster.innerHTML = `<button type="button" class="recruitment-progress-close" data-progress-close aria-label="Close student progress">×</button><strong>Module ${escapeHtml(moduleNumber)} · Student progress</strong>${students.length ? `<div class="recruitment-teacher-student-list">${students.map(item => {
          const record = records[String(item.email || '').toLowerCase()] || { steps: [] };
          const progressSteps = completedModuleSteps(moduleNumber, record);
          const activityCount = progressSteps.completed.length;
          const percent = record.complete ? 100 : Math.min(100, Math.round(activityCount / requiredSteps * 100));
          const activitySummary = progressSteps.completed.map(step => escapeHtml(stepNames[step] || step)).join(', ');
          return `<div class="recruitment-teacher-student"><strong>${escapeHtml(item.name || item.email)}</strong><span>${escapeHtml(item.email || '')} · ${record.complete ? 'Complete' : `${percent}% complete`}</span><small>${activitySummary ? `Completed: ${activitySummary}` : 'No module activities recorded yet.'}</small></div>`;
        }).join('')}</div>` : '<p>No students with this teacher code yet.</p>'}`;
      } else {
        const email = String(account.email || '').toLowerCase();
        const record = records[email] || { steps: [] };
        const progress = completedModuleSteps(moduleNumber, record);
        const activityCount = progress.completed.length;
        const percent = record.complete ? 100 : Math.min(100, Math.round(activityCount / requiredSteps * 100));
        const activitySummary = progress.completed.map(step => escapeHtml(stepNames[step] || step)).join(', ');
        roster.innerHTML = `<button type="button" class="recruitment-progress-close" data-progress-close aria-label="Close progress">×</button><strong>Module ${escapeHtml(moduleNumber)} · Your progress</strong><p class="learning-progress-summary"><b>${percent}%</b> complete <span>· ${activityCount} of ${requiredSteps} activities</span></p><p>${activitySummary ? `Completed: ${activitySummary}` : 'Complete lesson activities to see your progress here.'}</p>`;
      }
      roster.hidden = progressButton.getAttribute('aria-expanded') !== 'true';
    });
  }
  function updateProgress(module) {
    const progress = getProgress(module); 
    updateLaunchCard();
    const steps = Array.isArray(progress.steps) ? progress.steps : [];
    module.querySelectorAll('[data-learning-step]').forEach(card => {
      const done = steps.includes(card.dataset.learningStep);
      const markButton = card.querySelector('[data-mark-step]');
      if (markButton) markButton.hidden = currentAccount().role === 'teacher';
      card.classList.toggle('is-complete', done);
      const button = card.querySelector('[data-mark-step]');
      if (button) button.textContent = done ? 'Completed ✓' : button.dataset.markStep === 'learn' ? 'Mark foundation complete' : button.dataset.markStep === 'explore' ? 'Mark channels explored' : button.dataset.markStep === 'practice' ? 'Mark job boards explored' : 'Mark activity complete';
    });
          const moduleNumber = module.dataset.moduleNumber || '1';
      const { expected, completed } = completedModuleSteps(moduleNumber, progress);
      const count = completed.length;
      const label = module.querySelector('[data-progress-label]');
      if (label) label.textContent = `${count} of ${expected.length} complete`;
      if (moduleNumber === '2' || moduleNumber === '4') {
        let tracker = module.querySelector('.recruitment-module-step-tracker');
        if (!tracker) {
          tracker = document.createElement('section');
          tracker.className = 'recruitment-module-step-tracker';
          tracker.setAttribute('aria-label', 'Module activity progress');
          module.querySelector('.recruitment-course-hero')?.after(tracker);
        }
        const labels = moduleNumber === '2' ? ['Find applicants','Screen applicants','Protect information'] : ['Sample profile','Documents','Pathway','Pipeline','Privacy'];
        const ids = moduleNumber === '2' ? ['challenge-1','challenge-2','challenge-3'] : ['profile','documents','pathway','pipeline','privacy'];
        const percentage = expected.length ? Math.round(count / expected.length * 100) : 0;
        tracker.innerHTML = `<div class="recruitment-step-tracker-heading"><strong>${moduleNumber === '2' ? 'OVERSEAS MISSION PROGRESS' : 'ATS COURSE PROGRESS'}</strong><span>${percentage}% · ${count}/${expected.length}</span></div><ol>${labels.map((item,index)=>`<li class="${completed.includes(ids[index])?'is-complete':''}" aria-current="${completed.includes(ids[index])?'step':'false'}"><span>${completed.includes(ids[index])?'✓':String(index+1).padStart(2,'0')}</span>${item}</li>`).join('')}</ol>`;
      }
    module.classList.toggle('is-course-complete', progress.complete === true);
    const completeButton = module.querySelector('[data-course-complete]');
    if (completeButton) {
      completeButton.hidden = currentAccount().role === 'teacher';
      completeButton.innerHTML = progress.complete ? 'Module completed <span aria-hidden="true">✓</span>' : 'Complete module <span aria-hidden="true">✓</span>';
    }
  }
  function finishRaceStep(module, step) {
    const progress = getProgress(module);
    const steps = new Set(Array.isArray(progress.steps) ? progress.steps : []);
    steps.add(step);
    progress.steps = [...steps];
    progress.complete = ['path', 'workflow', 'assess'].every(item => steps.has(item));
    saveProgress(progress, module);
    updateProgress(module);
  }
  function finishATSStep(module, step) {
    const progress = getProgress(module);
    const steps = new Set(Array.isArray(progress.steps) ? progress.steps : []);
    steps.add(step);
    progress.steps = [...steps];
    progress.complete = ['profile', 'documents', 'pathway', 'pipeline', 'privacy'].every(item => steps.has(item));
    saveProgress(progress, module);
    updateProgress(module);
  }
  function placeModule() {
    if (!root.isConnected || !root.children.length) return;
    let module = root.querySelector('.recruitment-learning-module:not(.recruitment-overseas-module)');
    if (!module) { const holder = document.createElement('div'); holder.innerHTML = moduleMarkup; module = holder.firstElementChild; module.hidden = true; }
    let overseasModule = root.querySelector('.recruitment-overseas-module');
    if (!overseasModule) { const holder = document.createElement('div'); holder.innerHTML = overseasModuleMarkup; overseasModule = holder.firstElementChild; }
    let comparisonModule = root.querySelector('.recruitment-race-module');
    if (!comparisonModule) { const holder = document.createElement('div'); holder.innerHTML = comparisonModuleMarkup; comparisonModule = holder.firstElementChild; }
    let atsModule = root.querySelector('.recruitment-ats-course');
    if (!atsModule) { const holder = document.createElement('div'); holder.innerHTML = atsModuleMarkup; atsModule = holder.firstElementChild; }
    const search = root.querySelector('input[type="search"], input[placeholder*="Search" i], [data-learning-search]');
    const searchGroup = search?.closest('.learning-search-group, .learning-search, .learning-toolbar, .learning-filters, .learning-resource-toolbar, form') || search?.parentElement;
    let launchCard = root.querySelector('.recruitment-learning-launch-card[data-module-number="1"]');
    if (!launchCard) {
      launchCard = document.createElement('article');
      launchCard.className = 'learning-resource recruitment-learning-launch-card';
      launchCard.dataset.moduleNumber = '1';
      launchCard.tabIndex = 0;
      launchCard.setAttribute('role', 'button');
      launchCard.setAttribute('aria-label', 'Open Learning hub module: Local Recruitment in Digital Age');
      launchCard.innerHTML = '<span class="recruitment-launch-topline"><span class="recruitment-launch-kicker">LEARNING HUB · MODULE 01 · BEGINNER</span><span class="recruitment-launch-status" data-learning-status hidden></span></span><span class="recruitment-launch-title">Local Recruitment in Digital Age</span><span class="recruitment-launch-description">Understand local recruitment, explore Philippine job boards, and practice sourcing candidates.</span><button class="recruitment-teacher-progress-toggle" type="button" data-teacher-progress-toggle aria-expanded="false" hidden>Progress</button><span class="recruitment-teacher-progress" data-teacher-progress hidden></span>';
    }
    let overseasCard = root.querySelector('.recruitment-learning-launch-card[data-module-number="2"]');
    if (!overseasCard) {
      overseasCard = document.createElement('article');
      overseasCard.className = 'learning-resource recruitment-learning-launch-card';
      overseasCard.dataset.moduleNumber = '2';
      overseasCard.tabIndex = 0;
      overseasCard.setAttribute('role', 'button');
      overseasCard.setAttribute('aria-label', 'Open Learning hub module: Overseas Recruitment in the Digital Age');
      overseasCard.innerHTML = '<span class="recruitment-launch-topline"><span class="recruitment-launch-kicker">LEARNING HUB · MODULE 02 · INTERACTIVE</span><span class="recruitment-launch-status" data-learning-status hidden></span></span><span class="recruitment-launch-title">Overseas Recruitment in the Digital Age</span><span class="recruitment-launch-description">Take on an overseas recruitment mission: source applicants, screen fairly, and protect their information.</span><button class="recruitment-teacher-progress-toggle" type="button" data-teacher-progress-toggle aria-expanded="false" hidden>Progress</button><span class="recruitment-teacher-progress" data-teacher-progress hidden></span>';
    }
    let comparisonCard = root.querySelector('.recruitment-learning-launch-card[data-module-number="3"]');
    if (!comparisonCard) {
      comparisonCard = document.createElement('article');
      comparisonCard.className = 'learning-resource recruitment-learning-launch-card';
      comparisonCard.dataset.moduleNumber = '3';
      comparisonCard.tabIndex = 0;
      comparisonCard.setAttribute('role', 'button');
      comparisonCard.setAttribute('aria-label', 'Open Learning hub module: Local vs. Overseas — The Recruitment Race');
      comparisonCard.innerHTML = '<span class="recruitment-launch-topline"><span class="recruitment-launch-kicker">LEARNING HUB · MODULE 03 · SIMULATION</span><span class="recruitment-launch-status" data-learning-status hidden></span></span><span class="recruitment-launch-title">LOCAL vs. OVERSEAS · The Recruitment Race</span><span class="recruitment-launch-description">Manage two job orders, compare hiring pathways, and race through interactive recruitment challenges.</span><button class="recruitment-teacher-progress-toggle" type="button" data-teacher-progress-toggle aria-expanded="false" hidden>Progress</button><span class="recruitment-teacher-progress" data-teacher-progress hidden></span>';
    }
    let atsCard = root.querySelector('.recruitment-learning-launch-card[data-module-number="4"]');
    if (!atsCard) {
      atsCard = document.createElement('article');
      atsCard.className = 'learning-resource recruitment-learning-launch-card';
      atsCard.dataset.moduleNumber = '4';
      atsCard.tabIndex = 0;
      atsCard.setAttribute('role', 'button');
      atsCard.setAttribute('aria-label', 'Open Learning hub module: Mastering Applicant Tracking Systems');
      atsCard.innerHTML = '<span class="recruitment-launch-topline"><span class="recruitment-launch-kicker">LEARNING HUB · MODULE 04 · INTERACTIVE COURSE</span><span class="recruitment-launch-status" data-learning-status hidden></span></span><span class="recruitment-launch-title">Mastering Applicant Tracking Systems</span><span class="recruitment-launch-description">Build candidate profiles, classify documents, manage a recruitment pipeline, and practice privacy-first ATS workflows.</span><button class="recruitment-teacher-progress-toggle" type="button" data-teacher-progress-toggle aria-expanded="false" hidden>Progress</button><span class="recruitment-teacher-progress" data-teacher-progress hidden></span>';
    }
         
     const resourceList = root.querySelector('[data-learning-resources], .learning-resource-grid, .learning-resource-list');
    const canUseResourceList = resourceList && !resourceList.contains(searchGroup) && !searchGroup?.contains(resourceList);
    if (canUseResourceList) { if (resourceList.firstElementChild !== launchCard) resourceList.prepend(launchCard); }
    else if (searchGroup?.parentElement) { if (searchGroup.nextElementSibling !== launchCard) searchGroup.after(launchCard); }
    else if (launchCard.parentElement !== root) root.prepend(launchCard);
    module.id = 'recruitment-learning-module-content';
    module.dataset.moduleNumber = '1';
    overseasModule.id = 'overseas-learning-module-content';
    if (launchCard.nextElementSibling !== module) launchCard.after(module);
    if (module.nextElementSibling !== overseasCard) module.after(overseasCard);
    if (overseasCard.nextElementSibling !== overseasModule) overseasCard.after(overseasModule);
    if (overseasModule.nextElementSibling !== comparisonCard) overseasModule.after(comparisonCard);
    if (comparisonCard.nextElementSibling !== comparisonModule) comparisonCard.after(comparisonModule);
    if (comparisonModule.nextElementSibling !== atsCard) comparisonModule.after(atsCard);
         if (atsCard.nextElementSibling !== atsModule) atsCard.after(atsModule);
          const query = search?.value.trim().toLowerCase() || '';
    [launchCard, overseasCard, comparisonCard, atsCard].forEach(card => { if (card.dataset.moduleOpened !== 'true') card.hidden = Boolean(query && !card.textContent.toLowerCase().includes(query)); });
    updateProgress(module);
    updateProgress(overseasModule);
    updateProgress(comparisonModule);
              updateProgress(atsModule);
    document.dispatchEvent(new Event('recruitment-learning-module-ready'));
   }

  root.addEventListener('input', event => {
    if (!event.target.matches('input[type="search"], input[placeholder*="Search" i], [data-learning-search]')) return;
    const cards = root.querySelectorAll('.recruitment-learning-launch-card');
    const query = String(event.target.value || '').trim().toLowerCase();
    cards.forEach(card => { if (card.dataset.moduleOpened !== 'true') card.hidden = Boolean(query && !card.textContent.toLowerCase().includes(query)); });
  });

  root.addEventListener('keydown', event => {
    const card = event.target.closest('.recruitment-learning-launch-card');
    if (card && event.target === card && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      card.click();
    }
  });

        root.addEventListener('click', event => {
     const progressClose = event.target.closest('[data-progress-close]');
      if (progressClose) {
      const card = progressClose.closest('.recruitment-learning-launch-card');
      card?.querySelector('[data-teacher-progress-toggle]')?.setAttribute('aria-expanded', 'false');
      card?.classList.remove('is-progress-open');
      const roster = card?.querySelector('[data-teacher-progress]');
      if (roster) roster.hidden = true;
      return;
    }
    const progressToggle = event.target.closest('[data-teacher-progress-toggle]');
    if (progressToggle) {
      updateLaunchCard();
      const expanded = progressToggle.getAttribute('aria-expanded') !== 'true';
      root.querySelectorAll('[data-teacher-progress-toggle]').forEach(button => button.setAttribute('aria-expanded', 'false'));
      root.querySelectorAll('[data-teacher-progress]').forEach(panel => { panel.hidden = true; });
      const card = progressToggle.closest('.recruitment-learning-launch-card');
      progressToggle.setAttribute('aria-expanded', String(expanded));
      card?.classList.toggle('is-progress-open', expanded);
      const roster = card?.querySelector('[data-teacher-progress]');
      if (roster) roster.hidden = !expanded;
      return;
    }
    const launchCard = event.target.closest('.recruitment-learning-launch-card');
    if (launchCard) {
      if (!event.target.closest('[data-teacher-progress]') && (!event.target.closest('button') || event.target === launchCard)) {
        const module = moduleForNumber(launchCard.dataset.moduleNumber || '1');
        if (module) {
          module.hidden = false;
          module.classList.add('is-fullscreen');
          launchCard.dataset.moduleOpened = 'true';
          launchCard.hidden = true;
          document.body.classList.add('recruitment-module-fullscreen-open');
          module.scrollTop = 0;
        }
      }
      return;
    }
    const module = event.target.closest('.recruitment-learning-module');
    if (!module) return;
    if (event.target.closest('[data-module-close]')) {
      const launchCard = root.querySelector(`.recruitment-learning-launch-card[data-module-number="${module.dataset.moduleNumber || '1'}"]`);
      module.hidden = true;
      module.classList.remove('is-fullscreen');
      document.body.classList.remove('recruitment-module-fullscreen-open');
      restoreLearningSidebar();
      if (launchCard) {
        launchCard.dataset.moduleOpened = 'false';
        launchCard.hidden = false;
        launchCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    const flipButton = event.target.closest('[data-platform-flip]');
    if (flipButton) {
      const card = flipButton.closest('.recruitment-platform-card');
      const flipped = card.classList.toggle('is-flipped');
      card.querySelectorAll('[data-platform-flip]').forEach(button => button.setAttribute('aria-expanded', String(flipped)));
      const back = card.querySelector('.recruitment-platform-back');
      if (back) {
        back.setAttribute('aria-hidden', String(!flipped));
        back.inert = !flipped;
      }
      return;
    }
    if (event.target.closest('[data-module-top]')) {
      module.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (event.target.closest('[data-ats-profile-submit]')) {
      const name = module.querySelector('[data-ats-profile-name]').value.trim();
      const role = module.querySelector('[data-ats-profile-role]').value.trim();
      const source = module.querySelector('[data-ats-profile-source]').value;
      const feedback = module.querySelector('[data-ats-profile-feedback]');
      if (!name || !role || !source) feedback.textContent = 'Add a fictional candidate name, role, and application source to create the sample profile.';
      else { feedback.textContent = `Sample profile saved for ${name}: ${role}, sourced from ${source}.`; finishATSStep(module, 'profile'); }
      return;
    }
    if (event.target.closest('[data-ats-documents-check]')) {
      const selections = [...module.querySelectorAll('[data-ats-document]')].map(item => item.value);
      const feedback = module.querySelector('[data-ats-documents-feedback]');
      if (selections.some(value => !value)) feedback.textContent = 'Classify all three document types before checking.';
      else if (selections[0] === 'both' && selections[1] === 'overseas' && selections[2] === 'overseas') { feedback.textContent = 'Correct. CVs may support either pathway; passport copies and destination-specific documents belong to an overseas process when required at the appropriate stage.'; finishATSStep(module, 'documents'); }
      else feedback.textContent = 'Review the pathway: a CV can support local or overseas applications, while passport and destination-specific documents are tied to overseas requirements.';
      return;
    }
    const atsPath = event.target.closest('[data-ats-path]');
    if (atsPath) {
      const feedback = module.querySelector('[data-ats-path-feedback]');
      feedback.textContent = atsPath.dataset.atsPath === 'local' ? 'Correct route for Alex: use the local hiring workflow and request only role- and stage-relevant information.' : 'Correct route for Bea: verify the authorized job order and follow applicable overseas screening, documentation, and deployment steps.';
      finishATSStep(module, 'pathway');
      return;
    }
    if (event.target.closest('[data-ats-stage-check]')) {
      const stage = module.querySelector('[data-ats-stage]').value;
      const feedback = module.querySelector('[data-ats-stage-feedback]');
      if (stage === 'For Interview') { feedback.textContent = 'Good next step. Record the interview stage and keep follow-up consistent and job-related.'; finishATSStep(module, 'pipeline'); }
      else feedback.textContent = 'Choose “For Interview” as the next stage after the candidate is qualified and ready for assessment.';
      return;
    }
    const privacyChoice = event.target.closest('[data-ats-privacy]');
    if (privacyChoice) {
      const feedback = module.querySelector('[data-ats-privacy-feedback]');
      if (privacyChoice.dataset.atsPrivacy === 'correct') { feedback.textContent = 'Exactly. Limit collection and access to the legitimate purpose and recruitment stage; protect records and follow appropriate retention rules.'; finishATSStep(module, 'privacy'); }
      else feedback.textContent = 'Not safe. Do not share records publicly or keep them indefinitely on a personal device.';
      return;
    }
    const mark = event.target.closest('[data-mark-step]');
    if (mark) {
      const progress = getProgress(module);
      const steps = new Set(Array.isArray(progress.steps) ? progress.steps : []);
      steps.add(mark.dataset.markStep);
      progress.steps = [...steps];
      saveProgress(progress, module);
      updateProgress(module);
      return;
    }
    if (event.target.closest('[data-course-complete]')) {
      const progress = getProgress(module);
      progress.steps = module.dataset.moduleNumber === '2' ? ['challenge-1', 'challenge-2', 'challenge-3'] : module.dataset.moduleNumber === '3' ? ['path', 'workflow', 'assess'] : module.dataset.moduleNumber === '4' ? ['profile', 'documents', 'pathway', 'pipeline', 'privacy'] : ['learn', 'explore', 'practice', 'assess'];
      progress.complete = true;
      saveProgress(progress, module);
      updateProgress(module);
      module.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (event.target.closest('[data-course-start]')) {
      module.querySelector('.recruitment-lesson-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      module.querySelector('.recruitment-lesson-card')?.setAttribute('open', '');
    }
    if (event.target.closest('[data-check-race-path]')) {
      const local = module.querySelector('[name="race-scenario-a"]:checked')?.value;
      const overseas = module.querySelector('[name="race-scenario-b"]:checked')?.value;
      const feedback = module.querySelector('[data-race-path-feedback]');
      if (local === 'local' && overseas === 'overseas') {
        feedback.textContent = 'Correct! The Laguna role is local; the Saudi Arabia job order requires the overseas pathway.';
        finishRaceStep(module, 'path');
      } else feedback.textContent = 'Review the employment location: Laguna is local, while Saudi Arabia is overseas.';
      return;
    }
    const moveButton = event.target.closest('[data-move-step]');
    if (moveButton) {
      const item = moveButton.closest('li');
      const sibling = moveButton.dataset.moveStep === 'up' ? item.previousElementSibling : item.nextElementSibling;
      if (sibling) moveButton.dataset.moveStep === 'up' ? item.parentElement.insertBefore(item, sibling) : item.parentElement.insertBefore(sibling, item);
      return;
    }
    if (event.target.closest('[data-check-race-sequence]')) {
      const order = [...module.querySelectorAll('[data-race-sortable] li')].map(item => item.firstChild.textContent.trim());
      const expected = ['Manpower requisition', 'Job posting', 'Initial screening', 'Final interview', 'Job offer', 'Onboarding'];
      const feedback = module.querySelector('[data-race-sequence-feedback]');
      if (order.every((step, index) => step === expected[index])) {
        feedback.textContent = 'Perfect sequence! You have arranged the local workflow from requisition to onboarding.';
        finishRaceStep(module, 'workflow');
      } else feedback.textContent = 'Not quite—start with the manpower requisition, then post the role before screening.';
      return;
    }
    if (event.target.closest('[data-check-plan]') || event.target.closest('[data-evaluate-plan]')) {
      const channel = module.querySelector('#recruitment-channel-choice').value;
      const draft = module.querySelector('#recruitment-ad-draft').value.trim();
      const selected = [...module.querySelectorAll('[name="recruitment-qualification"]:checked')].map(input => input.value);
      const feedback = module.querySelector('[data-plan-feedback]');
      if (event.target.closest('[data-evaluate-plan]')) {
        const question = module.querySelector('#recruitment-coach-question').value.trim();
        const resources = module.querySelector('#recruitment-hiring-resources').value.trim();
        const coachFeedback = module.querySelector('[data-coach-feedback]');
        const scope = /recruit|sourc|hiring|job|vacan|applicant|candidate|shortlist|channel|resource|plan|role|qualification|skill|advert|budget|cost|time|location|staff|capacity/i.test(question);
        if (question && !scope) {
          coachFeedback.textContent = 'I can only evaluate recruitment resource plans. Ask about the selected job-board channel, vacancy draft, shortlist criteria, or hiring resources.';
          return;
        }
        const focus = question && /channel|board|platform|source/i.test(question) ? 'channel'
          : question && /draft|vacan|advert|job description/i.test(question) ? 'draft'
          : question && /shortlist|criteria|qualification|candidate|evidence/i.test(question) ? 'criteria'
          : question && /resource|budget|cost|time|staff|capacity|hire/i.test(question) ? 'resources' : 'all';
        const reviews = [];
        if ((focus === 'all' || focus === 'channel') && channel) {
          const channelNotes = {
            PhilJobNet: 'a useful local job-matching route; check that its current audience and listings fit this entry-level Manila role',
            JobStreet: 'a broad professional and entry-level channel that can suit customer-support hiring',
            Indeed: 'a broad discovery channel; use clear criteria to manage application volume',
            LinkedIn: 'strong for professional networking, though it may be less targeted for some entry-level support roles',
            Kalibrr: 'a plausible option for matching applicants and reviewing skills',
            referrals: 'a low-cost way to reach candidates, best paired with an open channel to avoid limiting reach'
          };
          reviews.push(`Channel — ${channel}: ${channelNotes[channel] || 'compare its audience, reach, and cost with the role before posting'}.`);
        } else if (focus === 'channel') reviews.push('Channel — choose a job board or sourcing route first, then compare its audience, reach, and cost with this role.');
        if ((focus === 'all' || focus === 'draft') && draft) {
          const missing = [];
          if (!/responsibil|duties|handle|support|assist|respond/i.test(draft)) missing.push('day-to-day responsibilities');
          if (!/skill|communicat|qualif|experience|require/i.test(draft)) missing.push('role-related skills or qualifications');
          if (!/manila|location|onsite|hybrid|remote/i.test(draft)) missing.push('work location or arrangement');
          reviews.push(`Vacancy draft — ${draft.length < 60 ? 'add more detail so applicants can judge fit' : 'a useful start'}.${missing.length ? ` Consider adding ${missing.join(', ')}.` : ' It includes useful role details; keep the language inclusive and explain how to apply.'}`);
        } else if (focus === 'draft') reviews.push('Vacancy draft — add or paste your draft so I can check clarity, relevant requirements, and inclusive wording.');
        if (focus === 'all' || focus === 'criteria') {
          if (selected.includes('appearance')) reviews.push('Shortlist criteria — remove appearance or personal background; these are not job-related. Use consistent evidence tied to the role.');
          else if (selected.length) reviews.push(`Shortlist criteria — ${selected.map(value => value === 'customer' ? 'customer-service experience or relevant practice' : 'role-related communication skills').join(' and ')} are relevant when assessed consistently against the vacancy.`);
          else if (focus === 'criteria') reviews.push('Shortlist criteria — select the job-related evidence you want evaluated; avoid appearance and personal background.');
        }
        if ((focus === 'all' || focus === 'resources') && resources) {
          reviews.push(`Hiring resources — ${resources.length < 25 ? 'add estimated recruiter time, budget, or staffing capacity for a more useful review' : 'check that the time and budget you listed cover posting, consistent application review, and candidate follow-up'}.`);
        } else if (focus === 'resources') reviews.push('Hiring resources — describe available time, budget, or recruiter capacity, and I’ll assess whether the plan is practical.');
        if (!reviews.length) coachFeedback.textContent = 'Add a channel, vacancy draft, shortlist criterion, or hiring resource above—or ask a focused question about one of them.';
        else coachFeedback.textContent = `Resource plan review: ${reviews.join(' ')}`;
        return;
      }
      if (!channel || !selected.length || !draft) feedback.textContent = 'Choose a channel, draft the vacancy, and select at least one job-related qualification.';
      else if (selected.includes('appearance')) feedback.textContent = 'Review your criteria: appearance is not a job-related qualification. Use consistent, role-relevant evidence.';
      else feedback.textContent = `Good start. Your ${channel} plan and vacancy draft are ready to refine. Document how each shortlisted applicant meets the role requirements.`;
    }
  });

  root.addEventListener('change', event => {
    const radio = event.target;
    if (radio.matches('form[data-recruitment-quiz] input[type="radio"]')) {
      const quiz = radio.closest('[data-recruitment-quiz]');
      const cards = [...quiz.querySelectorAll('[data-quiz-card]')];
      const index = cards.indexOf(radio.closest('[data-quiz-card]'));
      if (index >= 0 && index < cards.length - 1) {
        setTimeout(() => {
          cards[index].hidden = true;
          cards[index].classList.remove('is-active');
          let nextIndex = index + 1;
          while (nextIndex < cards.length && cards[nextIndex].querySelector('input:checked')) nextIndex++;
          if (nextIndex < cards.length) {
            cards[nextIndex].hidden = false;
            cards[nextIndex].classList.add('is-active', 'question-enter-from-right');
            setTimeout(() => cards[nextIndex].classList.remove('question-enter-from-right'), 350);
          } else quiz.requestSubmit();
        }, 220);
      } else if (index === cards.length - 1) setTimeout(() => quiz.requestSubmit(), 220);
      return;
    }
    const raceChallenge = radio.closest('[data-race-challenge]');
    if (raceChallenge && radio.matches('input[type="radio"]')) {
      const raceModule = radio.closest('.recruitment-race-module');
      const number = Number(raceChallenge.dataset.raceChallenge);
      const correct = number === 1 ? radio.value === 'local' : radio.value === 'overseas';
      const feedback = raceChallenge.querySelector('.overseas-challenge-feedback');
      const status = raceModule.querySelector('[data-race-challenge-progress]');
      if (!correct) { feedback.textContent = 'Not quite. Follow the work location: Laguna is local; work abroad follows the overseas pathway.'; return; }
      feedback.textContent = number === 1 ? 'Correct! This job is based in the Philippines, so use the local recruitment pathway.' : 'Correct! This job is abroad and requires the applicable overseas recruitment and deployment process.';
      const completed = new Set(JSON.parse(raceModule.dataset.raceChallenges || '[]'));
      completed.add(number);
      raceModule.dataset.raceChallenges = JSON.stringify([...completed]);
      const next = raceModule.querySelector(`[data-race-challenge="${number + 1}"]`);
      if (next) {
        if (status) status.textContent = `${completed.size} of 2 pathways matched · next challenge loading…`;
        setTimeout(() => { raceChallenge.hidden = true; next.hidden = false; next.classList.add('question-enter-from-right'); setTimeout(() => next.classList.remove('question-enter-from-right'), 350); }, 600);
      } else {
        if (status) status.textContent = 'Both routes matched. You are race-ready for the workflow activity!';
        finishRaceStep(raceModule, 'path');
      }
      return;
    }
    if (!radio.matches('.overseas-challenge-card input[type="radio"]')) return;
    const challenge = radio.closest('[data-overseas-challenge]');
    const module = radio.closest('.recruitment-overseas-module');
    const feedback = challenge.querySelector('.overseas-challenge-feedback');
    if (radio.value !== 'correct') {
      feedback.textContent = 'Not quite. Reconsider authorized channels, job-related evidence, and applicant safety, then choose again.';
      return;
    }
    const number = Number(challenge.dataset.overseasChallenge);
    const progress = getProgress(module);
    const completed = new Set(Array.isArray(progress.challenges) ? progress.challenges : []);
    completed.add(number);
    progress.challenges = [...completed];
    progress.steps = [...new Set([...(Array.isArray(progress.steps) ? progress.steps : []), `challenge-${number}`])];
    feedback.textContent = number === 1 ? 'Good choice! Reputable platforms can expand reach; ensure the advertisement is authorized and accurate.'
      : number === 2 ? 'Correct approach! Structured screening against employer requirements supports fair, efficient assessment.'
      : 'Exactly. Use authorized secure channels and protect applicant documents from improper access.';
    saveProgress(progress, module);
    updateProgress(module);
    updateLaunchCard();
    const next = module.querySelector(`[data-overseas-challenge="${number + 1}"]`);
    const status = module.querySelector('[data-overseas-challenge-progress]');
    if (next) {
      if (status) status.textContent = `${completed.size} of 3 challenges complete · next challenge loading…`;
      setTimeout(() => {
        challenge.hidden = true;
        next.hidden = false;
        next.classList.add('question-enter-from-right');
        setTimeout(() => next.classList.remove('question-enter-from-right'), 350);
      }, 650);
    } else {
      progress.steps = ['challenge-1', 'challenge-2', 'challenge-3'];
      progress.complete = true;
      saveProgress(progress, module);
      if (status) status.textContent = 'Mission complete! You sourced responsibly, screened fairly, and protected applicant data.';
      updateProgress(module);
    }
  });

  root.addEventListener('submit', event => {
    const raceQuiz = event.target.closest('[data-race-quiz]');
    if (raceQuiz) {
      event.preventDefault();
      const answers = new FormData(raceQuiz);
      const correctRace = { 'race-q1': 'b', 'race-q2': 'c', 'race-q3': 'b', 'race-q4': 'a', 'race-q5': 'c' };
      const feedback = raceQuiz.closest('.recruitment-quiz-panel').querySelector('[data-race-quiz-feedback]');
      const unanswered = Object.keys(correctRace).filter(name => !answers.get(name));
      if (unanswered.length) feedback.textContent = `Answer all five questions before checking. ${unanswered.length} remaining.`;
      else {
        const missed = Object.entries(correctRace).filter(([name, value]) => answers.get(name) !== value).map(([name]) => name.slice(-1));
        if (missed.length) feedback.textContent = `Review question${missed.length > 1 ? 's' : ''} ${missed.join(', ')} and try again.`;
        else {
          feedback.textContent = 'Race-ready! All five answers are correct.';
          finishRaceStep(raceQuiz.closest('.recruitment-learning-module'), 'assess');
        }
      }
      return;
    }
    const quiz = event.target.closest('[data-recruitment-quiz]');
    if (!quiz) return;
    event.preventDefault();
    const answer = new FormData(quiz);
    const feedback = quiz.closest('.recruitment-quiz-panel').querySelector('[data-quiz-feedback]');
    const module = quiz.closest('.recruitment-learning-module');
    const correct = { 'quiz-q1': 'a', 'quiz-q2': 'b', 'quiz-q3': 'b', 'quiz-q4': 'a', 'quiz-q5': 'a' };
    const unanswered = Object.keys(correct).filter(name => !answer.get(name));
    if (unanswered.length) {
      feedback.textContent = `Answer all five questions before checking. ${unanswered.length} remaining.`;
      return;
    }
    const missed = Object.entries(correct).filter(([name, value]) => answer.get(name) !== value).map(([name]) => name.slice(-1));
    if (!missed.length) {
      feedback.textContent = 'Excellent — all five answers are correct. Your assessment step is complete.';
      const progress = getProgress(module);
      const steps = new Set(Array.isArray(progress.steps) ? progress.steps : []);
      steps.add('assess');
      progress.steps = [...steps];
      saveProgress(progress, module);
      updateProgress(module);
    } else {
      feedback.textContent = `Review question${missed.length > 1 ? 's' : ''} ${missed.join(', ')} and try again.`;
      const firstMissed = quiz.querySelector(`[name="quiz-q${missed[0]}"]`)?.closest('[data-quiz-card]');
      if (firstMissed) {
        quiz.querySelectorAll('[data-quiz-card]').forEach(card => { card.hidden = card !== firstMissed; card.classList.toggle('is-active', card === firstMissed); });
      }
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && root.querySelector('.recruitment-learning-module.is-fullscreen')) root.querySelector('.recruitment-learning-module.is-fullscreen [data-module-close]')?.click();
  });
  document.addEventListener('click', event => {
    const navigation = event.target.closest('[data-view], [data-home-view]');
    const destination = navigation?.dataset.view || navigation?.dataset.homeView;
    const module = root.querySelector('.recruitment-learning-module.is-fullscreen');
    if (!module || !destination || destination === 'learning') return;
    module.hidden = true;
    module.classList.remove('is-fullscreen');
    document.body.classList.remove('recruitment-module-fullscreen-open');
    restoreLearningSidebar();
    const card = root.querySelector(`.recruitment-learning-launch-card[data-module-number="${module.dataset.moduleNumber || '1'}"]`);
    if (card) { card.hidden = false; card.dataset.moduleOpened = 'false'; }
  });
  window.addEventListener('storage', event => {
    if (event.key === progressKey || event.key === overseasProgressKey || event.key === comparisonProgressKey || event.key === atsProgressKey || Object.values(extendedProgressKeys).includes(event.key) || event.key === accountsKey) {
      root.querySelectorAll('.recruitment-learning-module').forEach(module => updateProgress(module));
      updateLaunchCard();
    }
  });

     
          const observer = new MutationObserver(() => {
     if (!root.querySelector('.recruitment-learning-launch-card[data-module-number="4"]') || !root.querySelector('.recruitment-ats-course')) placeModule();
   });

  observer.observe(root, { childList: true, subtree: true });
  placeModule();
})();
