(() => {
  const root = document.getElementById('assessment-view');
  if (!root) return;

  const STORAGE_KEY = 'hireflowLocalApplicantAssessments';
  const ACTIVE_KEY = 'hireflowActiveLocalApplicantAssessment';
  const PUBLISHED_KEY = 'hireflowLocalApplicantAssessmentPublished';
  const ASSIGNMENTS_KEY = 'hireflowLocalApplicantAssessmentAssignments';
  const VIDEO_DB = 'hireflowAssessmentRecordings';
  let recorder = null;
  let recordingStream = null;
  let recordingParts = [];
  let submitting = false;
  let expandedSubmissionId = '';
  let submissionsHideTimer = null;
  let submissionsReturnFocus = null;
  let submissionsSidebarWasCollapsed = null;
  let unpublishReturnFocus = null;

  const escape = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const read = (key, fallback = null) => { try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; } };
  const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
  const account = () => {
    const email = localStorage.getItem('hireflowStudentSession') || '';
    return (read('hireflowStudentAccounts', []) || []).find(item => item.email === email) || {};
  };
  const role = () => account().role;
  const classMatch = item => String(item.teacherCode || '').trim().toUpperCase() === String(account().teacherCode || '').trim().toUpperCase()
    && String(item.subject || '').trim().toLowerCase() === String(account().subject || '').trim().toLowerCase();
  const showMessage = message => window.showToast?.(message);
  const getPublished = () => read(PUBLISHED_KEY, {});
  const publishedForStudent = () => {
    const teachers = (read('hireflowStudentAccounts', []) || []).filter(item => item.role === 'teacher' && classMatch(item));
    return teachers.map(teacher => getPublished()[teacher.email]).find(Boolean) || null;
  };
  const studentAssignment = () => {
    const email = account().email;
    const all = read(ASSIGNMENTS_KEY, {});
    if (Array.isArray(all[email]) && all[email].length === 2) return all[email];
    const pool = (window.hireflowCandidates || []).filter(item => item.area === 'Marketing');
    if (pool.length < 2) return [];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const assignment = pool.slice(0, 2).map(item => item.name);
    all[email] = assignment;
    save(ASSIGNMENTS_KEY, all);
    return assignment;
  };
  const candidateData = name => (window.hireflowCandidates || []).find(item => item.name === name);
  const isSubmitted = () => (read(STORAGE_KEY, []) || []).some(item => item.studentEmail === account().email);

    function closeSubmissions() {
    const panel = root.querySelector('[data-assessment-submissions-window]');
    if (!panel || panel.hidden) return;
    panel.hidden = true;
    clearTimeout(submissionsHideTimer);
    submissionsHideTimer = null;
    document.body.classList.remove('assessment-modal-open');
    if (submissionsSidebarWasCollapsed !== null) {
      const app = document.getElementById('app-shell');
      const sidebarButton = document.querySelector('.sidebar-collapse-button');
      const collapsed = submissionsSidebarWasCollapsed;
      app?.classList.toggle('sidebar-collapsed', collapsed);
      if (sidebarButton) {
        sidebarButton.setAttribute('aria-expanded', String(!collapsed));
        sidebarButton.setAttribute('aria-label', collapsed ? 'Expand left panel' : 'Collapse left panel');
        sidebarButton.textContent = collapsed ? '›' : '‹';
      }
      submissionsSidebarWasCollapsed = null;
    }
    submissionsReturnFocus?.focus?.();
    submissionsReturnFocus = null;
  }

  function armSubmissionsAutoHide() {
    clearTimeout(submissionsHideTimer);
    submissionsHideTimer = setTimeout(closeSubmissions, 60000);
  }

  function openUnpublishConfirm(button) {
    const dialog = root.querySelector('[data-assessment-unpublish-confirm]');
    if (!dialog) return;
    unpublishReturnFocus = button;
    dialog.hidden = false;
    document.body.classList.add('assessment-modal-open');
    dialog.querySelector('[data-assessment-unpublish-no]')?.focus();
  }

  function closeUnpublishConfirm() {
    const dialog = root.querySelector('[data-assessment-unpublish-confirm]');
    if (!dialog || dialog.hidden) return;
    dialog.hidden = true;
    document.body.classList.remove('assessment-modal-open');
    unpublishReturnFocus?.focus?.();
    unpublishReturnFocus = null;
  }

  function renderResults() {
    const list = root.querySelector('[data-assessment-result-list]');
    const status = root.querySelector('[data-assessment-status]');
    const publishButton = root.querySelector('[data-assessment-publish]');
    const submissionsButton = root.querySelector('[data-assessment-submissions]');
    const submissionsCount = root.querySelector('[data-assessment-submission-count]');
    const submissionsWindow = root.querySelector('[data-assessment-submissions-window]');
    if (!list || !status || !publishButton) return;
    const teacher = role() === 'teacher';
    const student = role() === 'student';
    const published = teacher ? Boolean(getPublished()[account().email]) : Boolean(publishedForStudent());
    const studentSubmission = student ? (read(STORAGE_KEY, []) || []).find(item => item.studentEmail === account().email) : null;
    const submitted = Boolean(studentSubmission);

    publishButton.hidden = !teacher;
    publishButton.disabled = false;
    publishButton.textContent = published ? 'Unpublish assessment' : 'Publish assessment';
    if (submissionsButton) submissionsButton.hidden = !teacher;
    status.textContent = teacher
      ? (published ? 'Published · visible to your students' : 'Draft · not visible to students')
      : submitted ? 'Completed · submitted to your teacher'
        : published ? 'Available · ready to start' : 'Not published yet';
    status.dataset.state = published ? 'published' : submitted ? 'submitted' : 'draft';

    root.querySelector('[data-assessment-open]').hidden = !student || !published || submitted;
    root.querySelector('[data-assessment-unavailable]').hidden = !student || published;
    const completionNotice = root.querySelector('[data-assessment-complete]');
    completionNotice.hidden = !student || !submitted;
    const scoreNotice = root.querySelector('[data-assessment-score]');
    if (scoreNotice) {
      const hasScore = studentSubmission && studentSubmission.score !== null && studentSubmission.score !== undefined && studentSubmission.score !== '' && Number.isFinite(Number(studentSubmission.score));
      scoreNotice.hidden = !hasScore;
      scoreNotice.textContent = hasScore ? `Score: ${Number(studentSubmission.score)} / 100` : '';
    }
    if (!teacher) {
      if (submissionsWindow) submissionsWindow.hidden = true;
      return;
    }

    const submissions = (read(STORAGE_KEY, []) || []).filter(item => classMatch(item))
      .sort((a, b) => String(b.submittedAt || '').localeCompare(String(a.submittedAt || '')));
    if (submissionsCount) submissionsCount.textContent = String(submissions.length);
    list.innerHTML = submissions.length ? submissions.map((item, index) => {
      const id = String(item.id || `${item.studentEmail || 'student'}-${index}`);
      const scoreSet = item.score !== null && item.score !== undefined && item.score !== '' && Number.isFinite(Number(item.score));
      const detailsHidden = expandedSubmissionId !== id;
      const output = (Array.isArray(item.candidates) ? item.candidates : []).map(candidate => {
        const resume = candidateData(candidate.name) || {};
        const experience = Array.isArray(resume.work) ? resume.work.map(line => `<li>${escape(line)}</li>`).join('') : '';
        const skills = Array.isArray(resume.skills) ? resume.skills.map(skill => `<span>${escape(skill)}</span>`).join('') : '';
        return `<article class="assessment-student-output"><div class="assessment-output-heading"><div><p class="eyebrow">RESUME &amp; STUDENT EVALUATION</p><h3>${escape(candidate.name || 'Applicant')}</h3><p>${escape(resume.role || candidate.role || 'Applicant')} · ${escape(resume.location || '')}</p></div><span class="assessment-result-status">${escape(candidate.status || 'New')}</span></div><p class="assessment-output-summary">${escape(resume.summary || 'Resume details unavailable.')}</p>${experience ? `<div class="assessment-output-section"><strong>Experience</strong><ul>${experience}</ul></div>` : ''}${resume.education ? `<div class="assessment-output-section"><strong>Education</strong><p>${escape(resume.education)}</p></div>` : ''}${skills ? `<div class="assessment-output-skills"><strong>Skills</strong><div>${skills}</div></div>` : ''}<div class="assessment-student-answer"><strong>Student notes</strong><p>${escape(candidate.notes || 'No notes recorded')}</p></div></article>`;
      }).join('');
      return `<article class="assessment-result-card" data-submission-id="${escape(id)}"><button type="button" class="assessment-result-toggle" data-toggle-submission aria-expanded="${!detailsHidden}"><span class="assessment-result-student"><span class="assessment-result-avatar" aria-hidden="true">${escape(String(item.studentName || 'S').split(/\s+/).map(part => part[0]).join('').slice(0,2).toUpperCase())}</span><span><strong>${escape(item.studentName || 'Student')}</strong><small>${escape(item.submittedAt ? new Date(item.submittedAt).toLocaleString() : 'Date unavailable')}</small></span></span><span class="assessment-result-toggle-meta"><span class="assessment-result-badge">Submitted</span><span class="assessment-result-score">${scoreSet ? `Score: ${Number(item.score)} / 100` : 'Score pending'}</span><span aria-hidden="true" class="assessment-result-chevron">⌄</span></span></button><div class="assessment-submission-details" ${detailsHidden ? 'hidden' : ''}><div class="assessment-result-candidates">${output}</div><div class="assessment-score-entry"><label for="assessment-score-${escape(id)}">Teacher score <span>(0–100)</span></label><div><input id="assessment-score-${escape(id)}" type="number" min="0" max="100" step="1" value="${scoreSet ? Number(item.score) : ''}" data-assessment-score-input aria-label="Score for ${escape(item.studentName || 'student')} out of 100"><button type="button" class="assessment-save-score" data-save-score>Save score</button></div></div>${item.recordingId ? `<button type="button" class="assessment-recording-button" data-play-recording="${escape(item.recordingId)}">View screen recording</button>` : `<small class="assessment-no-recording">No screen recording was saved for this submission.</small>`}<div class="assessment-recording-slot" data-recording-slot="${escape(item.recordingId || '')}"></div></div></article>`;
    }).join('') : '<div class="assessment-results-empty"><span aria-hidden="true">✦</span><strong>No submissions yet</strong><p>Student evaluations will appear here after they submit the scenario.</p></div>';
  }


  function openScenario() {
    if (role() !== 'student' || !publishedForStudent() || isSubmitted()) return;
    const names = studentAssignment();
    const candidatesSlot = root.querySelector('[data-scenario-candidates]');
    if (candidatesSlot) candidatesSlot.innerHTML = names.map(name => {
      const candidate = candidateData(name);
      const initials = candidate?.initials || name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase();
      return `<article><span>${escape(initials)}</span><div><strong>${escape(name)}</strong><small>${escape(candidate?.role || 'Marketing applicant')}</small></div></article>`;
    }).join('');
    const modal = root.querySelector('[data-assessment-scenario]');
    if (modal) modal.hidden = false;
    root.querySelector('[data-assessment-close]')?.focus();
  }
  function closeScenario() {
    const modal = root.querySelector('[data-assessment-scenario]');
    if (modal) modal.hidden = true;
  }

  function ensureJobBoardControls() {
    const content = document.querySelector('#jobboard-view .board-content');
    if (!content) return;
    let controls = content.querySelector('[data-assessment-board-controls]');
    if (!controls) {
      controls = document.createElement('section');
      controls.className = 'assessment-board-controls';
      controls.dataset.assessmentBoardControls = '';
      controls.hidden = true;
      controls.setAttribute('aria-label', 'Local Applicant Evaluation controls');
      controls.innerHTML = `<div class="assessment-board-copy"><span class="assessment-live-dot" aria-hidden="true"></span><div><p class="eyebrow">LOCAL APPLICANT EVALUATION</p><h2>Scenario in progress</h2><p>Review your assigned Marketing applicants. Add a job-related note and select a status for each resume.</p><p class="assessment-recording-status" data-recording-status aria-live="polite"></p></div></div><div class="assessment-board-actions"><div data-assessment-board-candidates></div><button type="button" class="assessment-submit-button" data-assessment-submit>Submit assessment <span aria-hidden="true">→</span></button></div>`;
      content.prepend(controls);
    }
    const names = studentAssignment();
    const buttons = controls.querySelector('[data-assessment-board-candidates]');
    if (buttons) buttons.innerHTML = names.map((name, index) => `<button type="button" class="assessment-open-profile" data-assessment-candidate="${escape(name)}"><span>${String(index + 1).padStart(2, '0')}</span> Review ${escape(name)} <b aria-hidden="true">↗</b></button>`).join('');
  }

  function openLocalJobBoard() {
    ensureJobBoardControls();
    const local = document.getElementById('local-jobs-panel');
    const overseas = document.getElementById('overseas-jobs-panel');
    const banner = document.querySelector('#jobboard-view .board-banner');
    if (local) local.hidden = false;
    if (overseas) overseas.hidden = true;
    if (banner) banner.hidden = false;
    document.querySelectorAll('#jobboard-view .tool-tab').forEach(tab => {
      if (tab.dataset.boardPanel === 'profiles') tab.click();
    });
    const controls = document.querySelector('[data-assessment-board-controls]');
    if (controls) controls.hidden = false;
    const search = document.getElementById('profile-search');
    if (search) {
      search.value = 'Marketing';
      document.getElementById('profile-search-form')?.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
    }
    if (typeof window.switchView === 'function') window.switchView('jobboard');
    else document.querySelector('.top-nav-link[data-view="jobboard"]')?.click();
    const status = controls?.querySelector('[data-recording-status]');
    if (status) status.textContent = recorder?.state === 'recording'
      ? 'Screen recording is active. Keep this tab visible and submit when you finish.'
      : 'Screen recording could not start. You can still complete and submit the evaluation.';
  }

  async function startScenario() {
    if (role() !== 'student' || !publishedForStudent()) return;
    const startButton = root.querySelector('[data-assessment-start]');
    if (startButton) { startButton.disabled = true; startButton.textContent = 'Preparing your assessment…'; }
    recordingParts = [];
    recorder = null;
    recordingStream?.getTracks().forEach(track => track.stop());
    recordingStream = null;
    let recordingMessage = 'Screen recording could not start. You can still complete the evaluation.';
    if (navigator.mediaDevices?.getDisplayMedia && window.MediaRecorder) {
      try {
        recordingStream = await navigator.mediaDevices.getDisplayMedia({video: true, audio: false});
        const mimeType = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'].find(type => MediaRecorder.isTypeSupported?.(type));
        recorder = new MediaRecorder(recordingStream, mimeType ? {mimeType} : undefined);
        recorder.addEventListener('dataavailable', event => { if (event.data?.size) recordingParts.push(event.data); });
        recorder.start(1000);
        recordingMessage = 'Screen recording is active. Keep this tab visible and submit when you finish.';
        recordingStream.getVideoTracks().forEach(track => track.addEventListener('ended', () => {
          const status = document.querySelector('[data-recording-status]');
          if (status) status.textContent = 'Screen sharing stopped. Submit your evaluation to send it to your teacher.';
        }));
      } catch (error) {
        console.info('Screen recording permission was not granted or is unavailable.', error);
      }
    }
    save(ACTIVE_KEY, {studentEmail: account().email, candidateNames: studentAssignment(), startedAt: new Date().toISOString()});
    closeScenario();
    openLocalJobBoard();
    const status = document.querySelector('[data-recording-status]');
    if (status) status.textContent = recordingMessage;
    if (startButton) { startButton.disabled = false; startButton.innerHTML = 'Start assessment <span aria-hidden="true">→</span>'; }
  }

  function getCandidateReviews() {
    const names = read(ACTIVE_KEY)?.candidateNames || studentAssignment();
    const records = read('hireflowStudentReviews', {}) || {};
    return names.map(name => {
      const review = records[`${account().email}::${name}`] || {};
      const notes = Array.isArray(review.notes) ? review.notes.map(note => note.text).filter(Boolean).join(' | ') : '';
      return {name, role: candidateData(name)?.role || 'Marketing applicant', status: review.status || 'New', notes};
    });
  }

  function openCandidate(name) {
    const search = document.getElementById('profile-search');
    if (search) {
      search.value = name;
      document.getElementById('profile-search-form')?.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
    }
    const button = [...document.querySelectorAll('#profile-list [data-candidate]')].find(item => item.dataset.candidate === name);
    if (button) button.click();
    else showMessage(`Could not find ${name} in the local candidate list.`);
  }

  function openVideoDatabase() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) return reject(new Error('IndexedDB is not available'));
      const request = indexedDB.open(VIDEO_DB, 1);
      request.onupgradeneeded = () => { if (!request.result.objectStoreNames.contains('recordings')) request.result.createObjectStore('recordings'); };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async function storeRecording(id, blob) {
    if (!blob?.size) return false;
    const db = await openVideoDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('recordings', 'readwrite');
      transaction.objectStore('recordings').put(blob, id);
      transaction.oncomplete = () => { db.close(); resolve(true); };
      transaction.onerror = () => { db.close(); reject(transaction.error); };
    });
  }

  async function finishSubmission() {
    const current = read(ACTIVE_KEY);
    if (!current || current.studentEmail !== account().email) {
      showMessage('No active assessment was found. Start the scenario again to continue.');
      return;
    }
    const reviews = getCandidateReviews();
    const incomplete = reviews.find(item => item.status === 'New' || !item.notes.trim());
    if (incomplete) {
      showMessage(`Add a note and choose a status for ${incomplete.name} before submitting.`);
      openCandidate(incomplete.name);
      return;
    }
    const recordingBlob = recordingParts.length ? new Blob(recordingParts, {type: recorder?.mimeType || 'video/webm'}) : null;
    const recordingId = recordingBlob?.size ? `assessment-recording-${Date.now()}` : '';
    const submission = {
      id: `assessment-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      studentEmail: account().email,
      studentName: account().name || 'Student',
      teacherCode: account().teacherCode || '',
      subject: account().subject || '',
      submittedAt: new Date().toISOString(),
      candidates: reviews,
      recordingId
    };
    if (recordingId) {
      try { await storeRecording(recordingId, recordingBlob); }
      catch (error) { console.warn('Could not save the assessment recording.', error); submission.recordingId = ''; }
    }
    const all = read(STORAGE_KEY, []);
    all.unshift(submission);
    if (!save(STORAGE_KEY, all)) {
      showMessage('Could not save your assessment in this browser. Your scenario is still active.');
      return;
    }
    save(ACTIVE_KEY, null);
    const controls = document.querySelector('[data-assessment-board-controls]');
    if (controls) controls.hidden = true;
    recordingParts = [];
    recorder = null;
    recordingStream?.getTracks().forEach(track => track.stop());
    recordingStream = null;
    renderResults();
    if (typeof window.switchView === 'function') window.switchView('assessment');
    closeScenario();
    showMessage('Assessment submitted to your teacher.');
  }

  root.addEventListener('click', event => {
    if (event.target.closest('[data-assessment-open]')) openScenario();
    if (event.target.closest('[data-assessment-close]') || event.target === root.querySelector('[data-assessment-scenario]')) closeScenario();
    if (event.target.closest('[data-assessment-start]')) startScenario();
               const publishButton = event.target.closest('[data-assessment-publish]');
      if (publishButton && role() === 'teacher') {
        const all = getPublished();
        if (all[account().email]) {
          openUnpublishConfirm(publishButton);
        } else {
          all[account().email] = {teacherEmail: account().email, teacherCode: account().teacherCode || '', subject: account().subject || '', publishedAt: new Date().toISOString()};
          if (save(PUBLISHED_KEY, all)) {
            renderResults();
            showMessage('Assessment published to your students.');
          } else showMessage('Could not update the assessment in browser storage.');
        }
      }
      if (event.target.closest('[data-assessment-unpublish-no]')) closeUnpublishConfirm();
      if (event.target.closest('[data-assessment-unpublish-yes]') && role() === 'teacher') {
        const all = getPublished();
        delete all[account().email];
        if (save(PUBLISHED_KEY, all)) {
          closeUnpublishConfirm();
          renderResults();
          showMessage('Assessment unpublished. It is no longer available to students.');
        } else showMessage('Could not update the assessment in browser storage.');
      }
      if (event.target === root.querySelector('[data-assessment-unpublish-confirm]')) closeUnpublishConfirm();

           if (event.target.closest('[data-assessment-submissions]') && role() === 'teacher') {
        const submissionsWindow = root.querySelector('[data-assessment-submissions-window]');
        if (submissionsWindow) {
                     submissionsReturnFocus = event.target.closest('[data-assessment-submissions]');
           submissionsWindow.hidden = false;
           const app = document.getElementById('app-shell');
           const sidebarButton = document.querySelector('.sidebar-collapse-button');
           submissionsSidebarWasCollapsed = app?.classList.contains('sidebar-collapsed') || false;
           app?.classList.add('sidebar-collapsed');
           if (sidebarButton) {
             sidebarButton.setAttribute('aria-expanded', 'false');
             sidebarButton.setAttribute('aria-label', 'Expand left panel');
             sidebarButton.textContent = '›';
           }
           document.body.classList.add('assessment-modal-open');
          renderResults();
          submissionsWindow.querySelector('[data-assessment-submissions-close]')?.focus();
          armSubmissionsAutoHide();
        }
      }
      if (event.target.closest('[data-assessment-submissions-close]') || event.target === root.querySelector('[data-assessment-submissions-window]')) closeSubmissions();
      const toggleSubmission = event.target.closest('[data-toggle-submission]');
      if (toggleSubmission) {
        const card = toggleSubmission.closest('[data-submission-id]');
        if (card) {
          expandedSubmissionId = toggleSubmission.getAttribute('aria-expanded') === 'true' ? '' : card.dataset.submissionId;
          renderResults();
          const expandedCard = [...root.querySelectorAll('[data-submission-id]')].find(item => item.dataset.submissionId === expandedSubmissionId);
          expandedCard?.querySelector('[data-toggle-submission]')?.focus();
          armSubmissionsAutoHide();
        }
      }
      if (event.target.closest('[data-save-score]')) {
        const button = event.target.closest('[data-save-score]');
        const card = button.closest('[data-submission-id]');
        const input = card?.querySelector('[data-assessment-score-input]');
        const score = Number(input?.value);
        if (!card || !input || input.value.trim() === '' || !Number.isInteger(score) || score < 0 || score > 100) {
          showMessage('Enter a whole-number score from 0 to 100.');
          input?.focus();
        } else {
          const records = read(STORAGE_KEY, []);
          const record = records.find(item => String(item.id) === card.dataset.submissionId);
          if (!record) showMessage('This submission could not be found. Refresh and try again.');
          else if (save(STORAGE_KEY, records.map(item => item === record ? {...item, score} : item))) {
            expandedSubmissionId = card.dataset.submissionId;
            renderResults();
            showMessage('Score saved. It is now visible on the student’s assessment card.');
            armSubmissionsAutoHide();
          } else showMessage('Could not save the score in browser storage.');
        }
      }
      const play = event.target.closest('[data-play-recording]');

    if (play) {
      openVideoDatabase().then(db => new Promise((resolve, reject) => {
        const request = db.transaction('recordings').objectStore('recordings').get(play.dataset.playRecording);
        request.onsuccess = () => { db.close(); resolve(request.result); };
        request.onerror = () => { db.close(); reject(request.error); };
      })).then(blob => {
        if (!blob) throw new Error('Recording not found');
        const slot = play.closest('.assessment-result-card')?.querySelector('.assessment-recording-slot');
        if (slot) {
          slot.innerHTML = '<video controls playsinline aria-label="Student screen recording"></video>';
          slot.querySelector('video').src = URL.createObjectURL(blob);
        }
      }).catch(() => { play.textContent = 'Recording unavailable on this device'; play.disabled = true; });
    }
  });

  document.addEventListener('click', event => {
    const profile = event.target.closest('[data-assessment-candidate]');
    if (profile && !profile.closest('#assessment-view')) openCandidate(profile.dataset.assessmentCandidate);
    if (event.target.closest('[data-assessment-submit]') && !submitting) {
      submitting = true;
      const button = event.target.closest('[data-assessment-submit]');
      if (button) { button.disabled = true; button.textContent = 'Submitting…'; }
      const submit = async () => {
        if (recorder?.state === 'recording') {
          await new Promise(resolve => {
            recorder.addEventListener('stop', resolve, {once: true});
            recorder.stop();
          });
        }
        recordingStream?.getTracks().forEach(track => track.stop());
        await finishSubmission();
        submitting = false;
        const currentButton = document.querySelector('[data-assessment-submit]');
        if (currentButton) { currentButton.disabled = false; currentButton.innerHTML = 'Submit assessment <span aria-hidden="true">→</span>'; }
      };
      submit().catch(error => {
        console.error('Assessment submission failed.', error);
        submitting = false;
        showMessage('There was a problem submitting this assessment. Please try again.');
        const button = document.querySelector('[data-assessment-submit]');
        if (button) { button.disabled = false; button.innerHTML = 'Submit assessment <span aria-hidden="true">→</span>'; }
      });
    }
  });

          document.addEventListener('keydown', event => {
       if (event.key === 'Escape') {
         closeScenario();
         closeSubmissions();
         closeUnpublishConfirm();
       }
     });
    const submissionsDialog = root.querySelector('[data-assessment-submissions-window]');
    submissionsDialog?.addEventListener('pointerdown', armSubmissionsAutoHide);
    submissionsDialog?.addEventListener('keydown', armSubmissionsAutoHide);
    submissionsDialog?.addEventListener('focusin', armSubmissionsAutoHide);

  window.addEventListener('storage', event => {
    if ([STORAGE_KEY, PUBLISHED_KEY, 'hireflowStudentAccounts'].includes(event.key)) renderResults();
  });
  document.addEventListener('workspace-opened', renderResults);
  ensureJobBoardControls();
  const active = read(ACTIVE_KEY);
  if (active?.studentEmail === account().email && role() === 'student') {
    ensureJobBoardControls();
    const controls = document.querySelector('[data-assessment-board-controls]');
    if (controls) {
      controls.hidden = false;
      const status = controls.querySelector('[data-recording-status]');
      if (status) status.textContent = 'Your assessment is in progress. Screen recording is not active in this session.';
    }
  }
  renderResults();
})();
