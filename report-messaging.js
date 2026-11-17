(() => {
  const storagePrefix = 'hireflowReportReviewDraft:';
  function escape(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
  }

  function currentKey() {
    const email = typeof getCurrentAccount === 'function' ? getCurrentAccount().email : '';
    return `${storagePrefix}${email || 'demo'}`;
  }

  function readDraft() {
    try {
      return JSON.parse(localStorage.getItem(currentKey()) || 'null') || {};
    } catch {
      return {};
    }
  }

  function saveDraft(data) {
    try {
      localStorage.setItem(currentKey(), JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  }

  function cleanRichHtml(html) {
    const parsed = new DOMParser().parseFromString(String(html || ''), 'text/html');
    const allowed = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'S', 'P', 'BR', 'DIV', 'UL', 'OL', 'LI', 'BLOCKQUOTE', 'FONT', 'SPAN', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD', 'HR']);
    const clean = node => {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          if (!allowed.has(child.tagName)) {
            child.replaceWith(...child.childNodes);
            return;
          }
          [...child.attributes].forEach(attribute => {
            const name = attribute.name.toLowerCase();
            const value = attribute.value;
            const keep = (child.tagName === 'FONT' && ['color', 'face', 'size'].includes(name)) ||
              (['TD', 'TH'].includes(child.tagName) && ['colspan', 'rowspan'].includes(name)) ||
              (name === 'style' && /^(text-align|color|font-size|font-family):\s*[#(),.%\w '\"-]+;?$/i.test(value));
            if (!keep) child.removeAttribute(attribute.name);
          });
          clean(child);
        } else if (child.nodeType !== Node.TEXT_NODE) child.remove();
      });
    };
    clean(parsed.body);
    return parsed.body.innerHTML;
  }

  function formData(form) {
    const data = Object.fromEntries(new FormData(form).entries());
    const editor = form.querySelector('[data-rich-editor]');
    if (editor) {
      data.bodyHtml = cleanRichHtml(editor.innerHTML);
      data.body = editor.innerText;
    }
    return data;
  }

  function mountReportMessage(view) {
    if (!view || view.querySelector('#report-outlook')) return;
    const draft = readDraft();
    const account = typeof getCurrentAccount === 'function' ? getCurrentAccount() : {};
    const panel = document.createElement('section');
    panel.id = 'report-outlook';
    panel.className = 'report-outlook';
    panel.innerHTML = `
      <header class="outlook-topbar"><div class="outlook-app-mark">E</div><strong>Email</strong><span class="outlook-demo-tag">REPORT MESSAGING · LOCAL DEMO</span><span class="outlook-account">${escape(account.name || 'Student')}</span></header>
      <div class="outlook-commandbar"><button type="button" class="outlook-new-message" data-report-new>＋&nbsp; New message</button><span class="outlook-command-divider"></span><button type="button" data-report-save>▣&nbsp; Save draft</button><button type="button" data-report-copy>▤&nbsp; Copy</button><span class="outlook-command-hint">Messages stay in this browser</span></div>
      <div class="outlook-layout">
        <aside class="outlook-folders"><button class="outlook-folder active" type="button"><span>▣</span> Drafts <b>1</b></button><button class="outlook-folder" type="button"><span>▤</span> Inbox</button><button class="outlook-folder" type="button"><span>➤</span> Sent Items</button><button class="outlook-folder" type="button"><span>⌑</span> Deleted Items</button><div class="outlook-folders-label">FAVORITES</div><button class="outlook-folder" type="button"><span>☆</span> Starred</button></aside>
        <div class="outlook-resizer" data-resize="folders" role="separator" aria-label="Resize folders panel" aria-orientation="vertical" tabindex="0"></div>
        <section class="outlook-mail-list"><div class="outlook-list-heading"><strong>Drafts</strong><span>⌕</span></div><button class="outlook-mail-item active" data-report-open-draft type="button"><span class="outlook-mail-avatar">${escape((account.name || 'Student').slice(0, 1).toUpperCase())}</span><span><strong>${escape(draft.to || 'New message')}</strong><small>${escape(draft.subject || 'No subject')}</small><small class="outlook-mail-snippet">${escape(draft.body || 'Start writing your message')}</small></span><time>Draft</time></button><div class="outlook-list-empty">Your messages are stored locally for this learning demo.</div></section>
        <div class="outlook-resizer outlook-compose-resizer" data-resize="compose" role="separator" aria-label="Resize compose panel" aria-orientation="vertical" tabindex="0"></div>
        <section class="outlook-compose-area" hidden><form id="report-message-form" class="outlook-compose-card">
          <div class="outlook-compose-heading"><div><span class="outlook-compose-icon">✉</span><strong>Email</strong><small>Draft saved locally</small></div><button type="button" class="outlook-expand" data-report-expand aria-label="Expand composer" title="Expand composer">⛶</button><button type="button" class="outlook-close" aria-label="Close message">×</button></div>
          <div class="outlook-compose-actions"><button type="button" class="outlook-send" data-report-send>➤&nbsp; Send</button><button type="button" data-report-save>▣&nbsp; Save draft</button><button type="button" data-report-copy>▤&nbsp; Copy</button></div>
          <div class="outlook-format-toolbar" role="toolbar" aria-label="Email formatting">
            <select data-format="fontName" aria-label="Font family"><option value="Arial">Arial</option><option value="Georgia">Georgia</option><option value="Tahoma">Tahoma</option><option value="Verdana">Verdana</option><option value="Courier New">Courier New</option></select>
            <select data-format="fontSize" aria-label="Font size"><option value="2">10 pt</option><option value="3" selected>12 pt</option><option value="4">14 pt</option><option value="5">18 pt</option><option value="6">24 pt</option><option value="7">36 pt</option></select>
            <button type="button" data-command="bold" title="Bold"><b>B</b></button><button type="button" data-command="italic" title="Italic"><i>I</i></button><button type="button" data-command="underline" title="Underline"><u>U</u></button>
            <button type="button" data-command="justifyLeft" title="Align left">≡</button><button type="button" data-command="justifyCenter" title="Align center">☷</button><button type="button" data-command="justifyRight" title="Align right">≣</button>
            <button type="button" data-command="insertUnorderedList" title="Bulleted list">• List</button><button type="button" data-command="insertOrderedList" title="Numbered list">1. List</button><button type="button" data-command="indent" title="Increase indent">⇥</button><button type="button" data-command="outdent" title="Decrease indent">⇤</button>
            <label class="outlook-color-tool" title="Font color">A<input type="color" data-format="foreColor" aria-label="Font color" value="#333333"></label>
            <button type="button" data-report-table title="Insert table">▦ Table</button><button type="button" data-report-merge title="Merge selected table cells">Merge cells</button><button type="button" data-command="insertHorizontalRule" title="Insert horizontal line">― Line</button><button type="button" data-command="undo" title="Undo">↶</button><button type="button" data-command="redo" title="Redo">↷</button><button type="button" data-command="removeFormat" title="Clear formatting">Clear</button>
          </div>
          <div class="outlook-from-row"><span>From</span><strong>${escape(account.name || 'Student')}</strong><span>&lt;${escape(account.email || 'student@example.edu')}&gt;</span></div>
          <label class="outlook-address-row"><span>To</span><input name="to" required maxlength="240" placeholder="Add recipients" value="${escape(draft.to || '')}"><button type="button" data-report-cc>Cc</button><button type="button" data-report-bcc>Bcc</button></label>
          <label class="outlook-address-row outlook-extra-address" data-report-cc-row hidden><span>Cc</span><input name="cc" maxlength="240" placeholder="Add Cc recipients" value="${escape(draft.cc || '')}"></label>
          <label class="outlook-address-row outlook-extra-address" data-report-bcc-row hidden><span>Bcc</span><input name="bcc" maxlength="240" placeholder="Add Bcc recipients" value="${escape(draft.bcc || '')}"></label>
          <label class="outlook-address-row"><span>Subject</span><input name="subject" required maxlength="180" placeholder="Add a subject" value="${escape(draft.subject || '')}"></label>
          <div class="outlook-message-body"><span class="visually-hidden">Message</span><div class="outlook-rich-editor" data-rich-editor contenteditable="true" role="textbox" aria-label="Email message" aria-multiline="true">${cleanRichHtml(draft.bodyHtml || escape(draft.body || '').replace(/\n/g, '<br>'))}</div><textarea name="body" hidden>${escape(draft.body || '')}</textarea></div>
          <div class="outlook-compose-footer"><button type="button" aria-label="Attach file" title="Attachments are not available in this demo">📎</button><span>Attachments unavailable in this demo</span><span class="outlook-status" id="report-message-status" role="status" aria-live="polite">Saved on this device only</span></div>
        </form></section>
      </div><p class="outlook-disclaimer">Educational simulation only. Sending is disabled; no email is delivered.</p>`;
    view.replaceChildren(panel);
    const layout = panel.querySelector('.outlook-layout');
    panel.querySelectorAll('[data-resize]').forEach(handle => {
      const resize = event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        const step = event.shiftKey ? 24 : 12;
        if (handle.dataset.resize === 'folders') {
          const current = parseInt(getComputedStyle(layout).getPropertyValue('--folder-width'), 10) || 168;
          layout.style.setProperty('--folder-width', `${Math.max(125, Math.min(300, current + (event.key === 'ArrowRight' ? step : -step)))}px`);
        } else {
          const current = parseInt(getComputedStyle(layout).getPropertyValue('--compose-width'), 10) || 460;
          layout.style.setProperty('--compose-width', `${Math.max(360, Math.min(layout.clientWidth - 430, current + (event.key === 'ArrowLeft' ? step : -step)))}px`);
        }
      };
      handle.addEventListener('keydown', resize);
      handle.addEventListener('pointerdown', event => {
        if (window.matchMedia('(max-width: 700px)').matches) return;
        event.preventDefault();
        handle.setPointerCapture(event.pointerId);
        const move = moveEvent => {
          if (handle.dataset.resize === 'folders') {
            const width = moveEvent.clientX - layout.getBoundingClientRect().left;
            layout.style.setProperty('--folder-width', `${Math.max(125, Math.min(300, width))}px`);
          } else {
            const width = layout.getBoundingClientRect().right - moveEvent.clientX;
            layout.style.setProperty('--compose-width', `${Math.max(360, Math.min(layout.clientWidth - 430, width))}px`);
          }
        };
        handle.addEventListener('pointermove', move);
        handle.addEventListener('pointerup', () => handle.removeEventListener('pointermove', move), { once: true });
        handle.addEventListener('pointercancel', () => handle.removeEventListener('pointermove', move), { once: true });
      });
    });
  }

  function announce(message) {
    const status = document.getElementById('report-message-status');
    if (status) status.textContent = message;
  }

  function plainText(data) {
    return `To: ${data.to}\nCc: ${data.cc || '—'}\nBcc: ${data.bcc || '—'}\nSubject: ${data.subject}\n\n${data.body || ''}`;
  }

  let savedEditorRange = null;
  document.addEventListener('selectionchange', () => {
    const editor = document.activeElement?.closest?.('[data-rich-editor]');
    const selection = window.getSelection();
    if (editor && selection?.rangeCount) savedEditorRange = selection.getRangeAt(0).cloneRange();
  });

  document.addEventListener('input', event => {
    const form = event.target.closest('#report-message-form');
    if (!form) return;
    const editor = form.querySelector('[data-rich-editor]');
    if (editor && (event.target === editor || editor.contains(event.target))) form.elements.body.value = editor.innerText;
    saveDraft(formData(form));
  });

  document.addEventListener('change', event => {
    const control = event.target.closest('#report-message-form [data-format]');
    if (!control) return;
    const form = control.closest('form');
    const editor = form.querySelector('[data-rich-editor]');
    editor.focus();
    const selection = window.getSelection();
    if (savedEditorRange && editor.contains(savedEditorRange.commonAncestorContainer)) {
      selection.removeAllRanges();
      selection.addRange(savedEditorRange);
    }
    document.execCommand(control.dataset.format, false, control.value);
    form.dispatchEvent(new Event('input', { bubbles: true }));
  });

  document.addEventListener('mousedown', event => {
    if (event.target.closest('.outlook-format-toolbar button')) event.preventDefault();
  });

  document.addEventListener('submit', event => {
    if (event.target.id !== 'report-message-form') return;
    event.preventDefault();
    announce(saveDraft(formData(event.target)) ? 'Draft saved on this device.' : 'Could not save the draft in this browser.');
  });

  document.addEventListener('click', async event => {
    const form = document.getElementById('report-message-form');
    if (event.target.closest('[data-report-send]')) {
      if (!form || !form.reportValidity()) return;
      announce(saveDraft(formData(form)) ? 'This demo does not send email. Your draft was saved on this device.' : 'Could not save the draft in this browser.');
      return;
    }
    if (event.target.closest('[data-report-save]')) {
      if (form) announce(saveDraft(formData(form)) ? 'Draft saved on this device.' : 'Could not save the draft in this browser.');
      return;
    }
    const commandButton = event.target.closest('[data-command]');
    if (commandButton && form) {
      const editor = form.querySelector('[data-rich-editor]');
      editor.focus();
      if (savedEditorRange && editor.contains(savedEditorRange.commonAncestorContainer)) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(savedEditorRange);
      }
      document.execCommand(commandButton.dataset.command, false, null);
      form.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }
    if (event.target.closest('[data-report-table]') && form) {
      const editor = form.querySelector('[data-rich-editor]');
      editor.focus();
      document.execCommand('insertHTML', false, '<table><tbody><tr><td>Cell 1</td><td>Cell 2</td></tr><tr><td>Cell 3</td><td>Cell 4</td></tr></tbody></table><p><br></p>');
      form.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }
    if (event.target.closest('[data-report-merge]') && form) {
      const selected = [...form.querySelectorAll('.outlook-cell-selected')];
      if (selected.length > 1 && selected.every(cell => cell.closest('tr') === selected[0].closest('tr'))) {
        selected[0].colSpan = selected.reduce((total, cell) => total + (cell.colSpan || 1), 0);
        selected.slice(1).forEach(cell => cell.remove());
        selected.forEach(cell => cell.classList.remove('outlook-cell-selected'));
        form.dispatchEvent(new Event('input', { bubbles: true }));
      } else announce('Select two or more cells in the same row to merge them.');
      return;
    }
    if (event.target.closest('[data-report-expand]')) {
      const card = form?.closest('.outlook-compose-area');
      if (card) card.classList.toggle('compose-fullscreen');
      const expanded = card?.classList.contains('compose-fullscreen');
      const button = event.target.closest('[data-report-expand]');
      if (button) { button.textContent = expanded ? '⊡' : '⛶'; button.title = expanded ? 'Restore composer' : 'Expand composer'; button.setAttribute('aria-label', button.title); }
      return;
    }
    if (event.target.closest('[data-rich-editor] td, [data-rich-editor] th')) {
      event.target.closest('td, th').classList.toggle('outlook-cell-selected');
      return;
    }
    if (event.target.closest('[data-report-cc]') || event.target.closest('[data-report-bcc]')) {
      const row = event.target.closest('[data-report-cc]') ? document.querySelector('[data-report-cc-row]') : document.querySelector('[data-report-bcc-row]');
      if (row) { row.hidden = false; row.querySelector('input').focus(); }
      return;
    }
    if (event.target.closest('.outlook-close')) {
      const area = event.target.closest('.outlook-compose-area');
      if (form) saveDraft(formData(form));
      if (area) area.hidden = true;
      const layout = event.target.closest('.report-outlook')?.querySelector('.outlook-layout');
      if (layout) layout.classList.remove('compose-open');
      return;
    }
    if (event.target.closest('[data-report-new]')) {
      if (!form) return;
      form.reset();
      form.querySelector('[data-rich-editor]').innerHTML = '';
      form.closest('.outlook-compose-area')?.classList.remove('compose-fullscreen');
      form.querySelectorAll('.outlook-extra-address').forEach(row => { row.hidden = true; });
      const area = form.closest('.outlook-compose-area');
      if (area) area.hidden = false;
      const layout = form.closest('.outlook-layout');
      if (layout) layout.classList.add('compose-open');
      const composeArea = form.closest('.outlook-compose-area');
      composeArea.classList.add('compose-fullscreen');
      const expandButton = form.querySelector('[data-report-expand]');
      expandButton.textContent = '⊡';
      expandButton.title = 'Restore composer';
      expandButton.setAttribute('aria-label', 'Restore composer');
      form.querySelector('[name="to"]').focus();
      announce('New message');
      return;
    }
    if (event.target.closest('[data-report-open-draft]')) {
      if (!form) return;
      const saved = readDraft();
      Object.entries(saved).forEach(([name, value]) => {
        if (name === 'bodyHtml') return;
        if (form.elements[name]) form.elements[name].value = value;
      });
      form.querySelector('[data-rich-editor]').innerHTML = cleanRichHtml(saved.bodyHtml || escape(saved.body || '').replace(/\n/g, '<br>'));
      form.querySelectorAll('.outlook-extra-address').forEach(row => {
        row.hidden = !form.elements[row.querySelector('input').name].value;
      });
      const composeArea = form.closest('.outlook-compose-area');
      composeArea.hidden = false;
      composeArea.classList.add('compose-fullscreen');
      form.closest('.outlook-layout').classList.add('compose-open');
      const expandButton = form.querySelector('[data-report-expand]');
      expandButton.textContent = '⊡';
      expandButton.title = 'Restore composer';
      expandButton.setAttribute('aria-label', 'Restore composer');
      form.querySelector('[name="to"]').focus();
      announce('Draft opened');
      return;
    }
    if (event.target.closest('[data-report-copy]')) {
      if (!form) return;
      const text = plainText(formData(form));
      try {
        await navigator.clipboard.writeText(text);
        announce('Message copied to the clipboard.');
      } catch {
        const temporary = document.createElement('textarea');
        temporary.value = text;
        temporary.style.position = 'fixed';
        temporary.style.opacity = '0';
        document.body.append(temporary);
        temporary.select();
        const copied = document.execCommand && document.execCommand('copy');
        temporary.remove();
        announce(copied ? 'Message copied to the clipboard.' : 'Clipboard access is unavailable.');
      }
    }
  });

  const view = document.getElementById('emailmarketing-view');
  if (!view) return;
  const observer = new MutationObserver(() => {
    if (!view.querySelector('#report-outlook') && view.childElementCount) mountReportMessage(view);
  });
  observer.observe(view, { childList: true });
  if (view.childElementCount) mountReportMessage(view);

  const marketingView = document.getElementById('marketing-view');
  const campaignPrefix = 'hireflowMarketingCampaigns:';
  let editingCampaignId = '';

  function campaignKey() {
    const email = typeof getCurrentAccount === 'function' ? getCurrentAccount().email : '';
    return `${campaignPrefix}${email || 'demo'}`;
  }

  function readCampaigns() {
    try {
      const items = JSON.parse(localStorage.getItem(campaignKey()) || '[]');
      return Array.isArray(items) ? items : [];
    } catch {
      return [];
    }
  }

  function saveCampaigns(items) {
    try {
      localStorage.setItem(campaignKey(), JSON.stringify(items));
      return true;
    } catch {
      return false;
    }
  }

  function renderCampaignList() {
    if (!marketingView) return;
    editingCampaignId = '';
    const campaigns = readCampaigns();
    marketingView.innerHTML = `
      <section class="marketing-workspace">
        <header class="marketing-header"><div><p class="eyebrow">MARKETING · EMAIL</p><h1>Email campaigns</h1><p>Create and organize marketing emails. Campaigns are saved in this browser and are not delivered.</p></div><button class="primary-button" type="button" data-marketing-new>＋ Create email</button></header>
        <div class="marketing-toolbar"><div><strong>Campaigns</strong><span>${campaigns.length} saved draft${campaigns.length === 1 ? '' : 's'}</span></div><span class="marketing-local-badge">LOCAL DEMO</span></div>
        <div class="marketing-campaign-list">${campaigns.length ? campaigns.map(item => `<article class="marketing-campaign-card"><span class="marketing-campaign-icon">✉</span><div class="marketing-campaign-copy"><span class="marketing-status">${escape(item.status || 'Draft')}</span><h2>${escape(item.name || 'Untitled email')}</h2><p>${escape(item.subject || 'No subject')} · ${escape(item.audience || 'No audience selected')}</p><small>Updated ${escape(item.updated || 'just now')}</small></div><div class="marketing-campaign-actions"><button type="button" data-marketing-edit="${escape(item.id)}">Edit email</button><button type="button" class="marketing-delete" data-marketing-delete="${escape(item.id)}">Delete</button></div></article>`).join('') : '<div class="marketing-empty"><span>✉</span><h2>No emails yet</h2><p>Start a campaign to draft a marketing email and preview it before sending.</p><button type="button" class="primary-button" data-marketing-new>Create your first email</button></div>'}</div>
        <p class="marketing-disclaimer">Educational simulation only. No recipients are contacted and no email is sent.</p>
      </section>`;
  }

  function openCampaignEditor(campaign = {}) {
    if (!marketingView) return;
    editingCampaignId = campaign.id || '';
    const account = typeof getCurrentAccount === 'function' ? getCurrentAccount() : {};
    const senderName = campaign.senderName ?? account.name ?? '';
    const senderEmail = campaign.senderEmail ?? account.email ?? '';
    marketingView.innerHTML = `
      <section class="marketing-workspace marketing-editor">
        <div class="marketing-editor-top"><button type="button" class="marketing-back" data-marketing-back>← All campaigns</button><span class="marketing-local-badge">DRAFT · NOT SENT</span></div>
        <header class="marketing-header"><div><p class="eyebrow">EMAIL CAMPAIGN BUILDER</p><h1>${campaign.id ? 'Edit email' : 'Create an email'}</h1><p>Set up your message, then review the live preview before saving.</p></div></header>
        <nav class="marketing-steps" aria-label="Email setup steps"><span class="current"><b>1</b> Setup</span><i></i><span class="current"><b>2</b> Content</span><i></i><span><b>3</b> Review</span></nav>
        <form id="marketing-campaign-form" class="marketing-builder">
          <div class="marketing-compose-column">
            <section class="marketing-form-card"><div class="marketing-section-heading"><span>1</span><div><h2>Campaign setup</h2><p>Name your email and choose who it is for.</p></div></div>
              <label class="marketing-field">Campaign name<input name="name" required maxlength="100" placeholder="e.g. Spring product update" value="${escape(campaign.name || '')}"></label>
              <label class="marketing-field">Audience<select name="audience"><option ${!campaign.audience || campaign.audience === 'All subscribers' ? 'selected' : ''}>All subscribers</option><option ${campaign.audience === 'New customers' ? 'selected' : ''}>New customers</option><option ${campaign.audience === 'Engaged audience' ? 'selected' : ''}>Engaged audience</option><option ${campaign.audience === 'Test audience' ? 'selected' : ''}>Test audience</option></select></label>
            </section>
            <section class="marketing-form-card"><div class="marketing-section-heading"><span>2</span><div><h2>Email content</h2><p>Write your message and check how it reads.</p></div></div>
              <label class="marketing-field">From name<input name="senderName" required maxlength="100" value="${escape(senderName)}" placeholder="Your name or organization"></label>
              <label class="marketing-field">From email<input name="senderEmail" type="email" required maxlength="160" value="${escape(senderEmail)}" placeholder="team@example.edu"></label>
              <label class="marketing-field">Subject line<input name="subject" required maxlength="160" value="${escape(campaign.subject || '')}" placeholder="A clear, helpful subject"></label>
              <label class="marketing-field">Preview text<input name="preheader" maxlength="180" value="${escape(campaign.preheader || '')}" placeholder="A short line shown beside the subject"></label>
              <div class="marketing-template-row"><span>Start with a template</span><button type="button" data-marketing-template="announcement">Announcement</button><button type="button" data-marketing-template="newsletter">Newsletter</button></div>
              <label class="marketing-field">Email message<textarea name="body" rows="10" required maxlength="5000" placeholder="Write your email here...">${escape(campaign.body || '')}</textarea></label>
              <p class="marketing-helper">Plain-text preview · Keep your message clear and accessible.</p>
            </section>
            <div class="marketing-form-actions"><p id="marketing-save-status" role="status" aria-live="polite">Your draft stays on this device.</p><button class="primary-button" type="submit">Save draft</button></div>
          </div>
          <aside class="marketing-preview-card"><div class="marketing-preview-heading"><div><span class="marketing-preview-dot"></span><strong>Live email preview</strong></div><span>DESKTOP</span></div><div class="marketing-preview-envelope"><div class="marketing-preview-brand">Your brand</div><div class="marketing-preview-meta"><strong data-preview-subject>${escape(campaign.subject || 'Your subject line')}</strong><span data-preview-from>${escape(senderName || 'Sender name')} · ${escape(senderEmail || 'sender@example.edu')}</span><small data-preview-preheader>${escape(campaign.preheader || 'Preview text appears here')}</small></div><div class="marketing-preview-body" data-preview-body>${escape(campaign.body || 'Your email message will appear here.')}</div><div class="marketing-preview-footer">You are receiving this email because you subscribed.<br><span>Unsubscribe · View in browser</span></div></div><p class="marketing-preview-note">Preview only — this simulation does not send email.</p></aside>
        </form>
        <p class="marketing-disclaimer">Educational simulation only. Do not enter real customer data or sensitive information.</p>
      </section>`;
    refreshCampaignPreview();
  }

  function refreshCampaignPreview() {
    const form = document.getElementById('marketing-campaign-form');
    if (!form) return;
    const value = name => form.elements[name].value.trim();
    marketingView.querySelector('[data-preview-subject]').textContent = value('subject') || 'Your subject line';
    marketingView.querySelector('[data-preview-from]').textContent = `${value('senderName') || 'Sender name'} · ${value('senderEmail') || 'sender@example.edu'}`;
    marketingView.querySelector('[data-preview-preheader]').textContent = value('preheader') || 'Preview text appears here';
    marketingView.querySelector('[data-preview-body]').textContent = value('body') || 'Your email message will appear here.';
  }

  function saveCampaignFromForm(form, status = 'Draft') {
    const data = Object.fromEntries(new FormData(form).entries());
    const campaigns = readCampaigns();
    const id = editingCampaignId || `campaign-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const campaign = { ...data, id, status, updated: new Date().toLocaleString() };
    const index = campaigns.findIndex(item => item.id === id);
    if (index >= 0) campaigns[index] = campaign;
    else campaigns.unshift(campaign);
    if (!saveCampaigns(campaigns)) {
      const statusNode = document.getElementById('marketing-save-status');
      if (statusNode) statusNode.textContent = 'Could not save in this browser. Check available storage.';
      return false;
    }
    editingCampaignId = id;
    const statusNode = document.getElementById('marketing-save-status');
    if (statusNode) statusNode.textContent = status === 'Draft' ? 'Draft saved on this device.' : 'Test preview prepared locally; no email was sent.';
    return true;
  }

  if (marketingView) {
    renderCampaignList();
    marketingView.addEventListener('click', event => {
      if (event.target.closest('[data-marketing-new]')) openCampaignEditor();
      if (event.target.closest('[data-marketing-back]')) renderCampaignList();
      const edit = event.target.closest('[data-marketing-edit]');
      if (edit) openCampaignEditor(readCampaigns().find(item => item.id === edit.dataset.marketingEdit) || {});
      const remove = event.target.closest('[data-marketing-delete]');
      if (remove) {
        saveCampaigns(readCampaigns().filter(item => item.id !== remove.dataset.marketingDelete));
        renderCampaignList();
      }
      const template = event.target.closest('[data-marketing-template]');
      if (template) {
        const form = document.getElementById('marketing-campaign-form');
        if (!form) return;
        if (template.dataset.marketingTemplate === 'announcement') {
          form.elements.subject.value = form.elements.subject.value || 'A quick update from our team';
          form.elements.preheader.value = form.elements.preheader.value || 'Here is what is new this month.';
          form.elements.body.value = form.elements.body.value || 'Hello,\n\nWe are excited to share an update with you.\n\nHere is what you need to know:\n\nThank you,\nThe Team';
        } else {
          form.elements.subject.value = form.elements.subject.value || 'This month at our organization';
          form.elements.preheader.value = form.elements.preheader.value || 'News, highlights, and useful resources.';
          form.elements.body.value = form.elements.body.value || 'Hello,\n\nWelcome to this month’s newsletter.\n\nHighlights\n• A recent update\n• Upcoming events\n• Helpful resources\n\nBest,\nThe Team';
        }
        refreshCampaignPreview();
      }
    });
    marketingView.addEventListener('input', event => {
      if (event.target.closest('#marketing-campaign-form')) refreshCampaignPreview();
    });
    marketingView.addEventListener('submit', event => {
      if (event.target.id !== 'marketing-campaign-form') return;
      event.preventDefault();
      saveCampaignFromForm(event.target);
    });
    new MutationObserver(() => {
      if (marketingView.classList.contains('active-view')) renderCampaignList();
    }).observe(marketingView, { attributes: true, attributeFilter: ['class'] });
  }
})();
