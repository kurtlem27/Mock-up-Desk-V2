(() => {
  const mailboxPrefix = 'hireflowReportMailbox:';
  const draftPrefix = 'hireflowReportReviewDraft:';
  const calendarPrefix = 'hireflowReportCalendar:';
  const accountsKey = 'hireflowStudentAccounts';
  let folderEdit = null;
  let folderMenu = null;
  let calendarCursor = new Date();
  let editorRange = null;
  let openMessageId = null;
  let saveTimer;
  let inboxResize = null;
  let mailboxSearch = '';

  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const account = () => typeof getCurrentAccount === 'function' ? getCurrentAccount() : { name: 'Student', email: '', role: 'student' };
  const emailKey = (prefix, email = account().email) => `${prefix}${email || 'demo'}`;
  const readJson = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key) || 'null'); return value ?? fallback; } catch { return fallback; } };
  const writeJson = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
  const mailboxKey = () => emailKey(mailboxPrefix);
  const draftKey = () => emailKey(draftPrefix);
  const calendarKey = () => emailKey(calendarPrefix);
  const SCHOOL_CALENDAR_KEY = 'hireflowSchoolCalendarEvents';
  const id = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  function shareTeacherDashboardReminder(event) {
    const current = account();
    const code = String(current.teacherCode || '').trim().toUpperCase();
    if (current.role !== 'teacher' || !code) return;
    const students = readJson(accountsKey, []).filter(item => item.role === 'student' && String(item.teacherCode || '').trim().toUpperCase() === code);
    if (!students.length) return;
    const start = new Date(event.startTime);
    const date = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`;
    const reminder = { id: event.uid, title: event.title, date, source: 'teacher', teacherName: current.name || 'Teacher', createdBy: current.email, startTime: event.startTime, location: event.location || '', description: event.description || '' };
    const all = readJson(SCHOOL_CALENDAR_KEY, {});
    students.forEach(student => {
      const key = String(student.email || '').toLowerCase();
      const items = Array.isArray(all[key]) ? all[key] : [];
      const index = items.findIndex(item => item.id === reminder.id);
      if (index < 0) items.push(reminder);
      else items[index] = reminder;
      all[key] = items;
    });
    writeJson(SCHOOL_CALENDAR_KEY, all);
  }
  const names = ['Inbox', 'Drafts', 'Sent Items', 'Deleted Items', 'Junk Email', 'Archive'];
  const icons = ['▤', '▣', '➤', '⌑', '⚠', '▱'];

  function makeMailbox(email = account().email) {
    const key = emailKey(mailboxPrefix, email);
    const folders = names.map((name, index) => ({ id: `${key}:${name.toLowerCase().replace(/[^a-z]+/g, '-')}`, parentId: null, accountId: key, name, type: 'system', unreadCount: 0, isFavorite: name === 'Inbox', favoriteOrder: index, isExpanded: true, icon: icons[index] }));
    return { accountId: key, folders, messages: [], selectedFolderId: folders[0].id, activeTab: 'mail', isPaneOpen: true };
  }
  function mailboxFor(email = account().email) {
    const key = emailKey(mailboxPrefix, email);
    const state = readJson(key, null) || makeMailbox(email);
    state.accountId = key;
    state.messages ||= [];
    state.folders ||= [];
    const defaults = makeMailbox(email);
    defaults.folders.forEach(folder => { if (!state.folders.some(item => item.id === folder.id)) state.folders.push(folder); });
    state.folders.forEach(folder => { folder.accountId = key; folder.isFavorite = Boolean(folder.isFavorite); folder.unreadCount = Number(folder.unreadCount) || 0; });
    if (!state.folders.some(folder => folder.id === state.selectedFolderId)) state.selectedFolderId = defaults.folders[0].id;
    state.activeTab ||= 'mail';
    return state;
  }
  let state = mailboxFor();
  function saveMailbox() { state.accountId = mailboxKey(); return writeJson(mailboxKey(), state); }
  function folderById(folderId) { return state.folders.find(folder => folder.id === folderId); }
  function systemFolder(name) { return state.folders.find(folder => folder.type === 'system' && folder.name === name); }
  function matchedRecipients() {
    const current = account(), code = String(current.teacherCode || '').trim().toUpperCase();
    if (!code || !['student', 'teacher'].includes(current.role)) return [];
    const accounts = readJson(accountsKey, []);
    return accounts.filter(item => item.email !== current.email && String(item.teacherCode || '').trim().toUpperCase() === code && (current.role === 'teacher' ? item.role === 'student' : ['student', 'teacher'].includes(item.role))).sort((a, b) => (a.name || a.email).localeCompare(b.name || b.email));
  }
  function localDateInput(date) { return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16); }
  function readEvents(email = account().email) { const items = readJson(emailKey(calendarPrefix, email), []); return Array.isArray(items) ? items : []; }
  function saveEvents(events, email = account().email) { return writeJson(emailKey(calendarPrefix, email), events); }
  function announce(message) {
    const status = document.getElementById('report-message-status');
    if (status) status.textContent = message;
    const calendarStatus = document.querySelector('#report-outlook [data-calendar-status]');
    if (calendarStatus) calendarStatus.textContent = message;
  }
  function messageTime(value) {
    if (!value) return '';
    const date = new Date(value), now = new Date();
    if (!Number.isFinite(date.getTime())) return '';
    if (date.toDateString() === now.toDateString()) return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const weekStart = new Date(now); weekStart.setDate(now.getDate() - now.getDay()); weekStart.setHours(0, 0, 0, 0);
    if (date >= weekStart) return date.toLocaleDateString([], { weekday: 'short' });
    return date.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });
  }
  function messageGroupKey(message) {
    return message.threadId || String(message.subject || '').replace(/^(re|fw|fwd):\s*/i, '').trim().toLowerCase() || message.id;
  }
  function plainSnippet(message) {
    const source = message.body || message.bodyHtml || '';
    const plain = String(source).replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    return plain || 'No preview available';
  }
  function safeMessageBody(message) {
    if (message.isCampaignHtml && message.bodyHtml) return `<iframe title="Email campaign design" sandbox="" style="display:block;width:100%;height:680px;border:0;background:#fff" srcdoc="${escape(message.bodyHtml)}"></iframe>`;
    if (!message.bodyHtml) return escape(message.body || '').replace(/\n/g, '<br>');
    const parsed = new DOMParser().parseFromString(message.bodyHtml, 'text/html');
    const allowed = new Set(['P','DIV','BR','STRONG','B','EM','I','U','S','UL','OL','LI','BLOCKQUOTE','TABLE','TBODY','THEAD','TR','TD','TH']);
    const walker = parsed.createTreeWalker(parsed.body, NodeFilter.SHOW_ELEMENT);
    const elements = []; while (walker.nextNode()) elements.push(walker.currentNode);
    elements.forEach(node => {
      if (!allowed.has(node.tagName)) { node.replaceWith(parsed.createTextNode(node.textContent || '')); return; }
      [...node.attributes].forEach(attribute => node.removeAttribute(attribute.name));
    });
    return parsed.body.innerHTML;
  }
  function initials(message) {
    return String(message.fromName || message.from || message.to || 'M').trim().split(/\s+/).slice(0, 2).map(part => part[0] || '').join('').toUpperCase() || 'M';
  }
  function renderMessageCard(message, count = 1) {
    const sender = message.fromName || message.from || message.to || 'Message';
    return `<article class="outlook-mail-item${message.isRead === false ? ' unread' : ''}${message.isPinned ? ' pinned' : ''}" data-mail-card="${escape(message.id)}"><button type="button" class="outlook-mail-open" data-mail-id="${escape(message.id)}" ${message.isDraft ? 'data-report-open-draft' : 'data-mail-open'}><span class="outlook-mail-avatar">${escape(initials(message))}</span><span class="outlook-mail-copy"><span class="outlook-mail-meta"><strong>${escape(sender)}</strong><time>${message.isDraft ? 'Draft' : escape(messageTime(message.sentAt))}</time></span><strong class="outlook-mail-subject">${escape(message.subject || 'No subject')}</strong><small class="outlook-mail-snippet">${escape(plainSnippet(message))}</small></span>${message.attachments?.length ? '<span class="outlook-mail-indicator" title="Attachment">📎</span>' : ''}${message.importance === 'high' ? '<span class="outlook-mail-important" title="High importance">!</span>' : ''}${count > 1 ? `<span class="outlook-thread-count" title="Conversation">${count}</span>` : ''}${message.isRead === false ? '<span class="outlook-unread-dot" aria-label="Unread"></span>' : ''}</button><div class="outlook-mail-quick-actions"><button type="button" data-mail-quick="delete" data-mail-id="${escape(message.id)}" title="Delete" aria-label="Delete">⌫</button><button type="button" data-mail-quick="read" data-mail-id="${escape(message.id)}" title="Mark read or unread" aria-label="Mark read or unread">✉</button><button type="button" data-mail-quick="flag" data-mail-id="${escape(message.id)}" title="Flag" aria-label="Flag">⚑</button><button type="button" data-mail-quick="pin" data-mail-id="${escape(message.id)}" title="Pin" aria-label="Pin">⌖</button></div></article>`;
  }
  function messageThreads(messages) {
    const groups = new Map();
    messages.forEach(message => { const key = messageGroupKey(message); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(message); });
    return [...groups.values()].map(items => items.sort((a, b) => new Date(b.sentAt || 0) - new Date(a.sentAt || 0))).sort((a, b) => Number(Boolean(b[0].isPinned)) - Number(Boolean(a[0].isPinned)) || new Date(b[0].sentAt || 0) - new Date(a[0].sentAt || 0));
  }
  function renderReadingPane(message, allMessages) {
    const siblings = allMessages.filter(item => messageGroupKey(item) === messageGroupKey(message)).sort((a, b) => new Date(a.sentAt || 0) - new Date(b.sentAt || 0));
    const sender = message.fromName || message.from || 'Message';
    const isExternal = message.from && account().email && message.from.split('@')[1]?.toLowerCase() !== account().email.split('@')[1]?.toLowerCase();
    const body = safeMessageBody(message);
    return `<div class="outlook-reading-toolbar"><button type="button" data-message-action="archive" data-mail-id="${escape(message.id)}">Archive</button><button type="button" data-message-action="delete" data-mail-id="${escape(message.id)}">Delete</button><button type="button" data-message-action="junk" data-mail-id="${escape(message.id)}">Junk</button><label>Move to <select data-message-move="${escape(message.id)}"><option value="">Choose folder</option>${state.folders.filter(folder => folder.id !== message.folderId).map(folder => `<option value="${escape(folder.id)}">${escape(folder.name)}</option>`).join('')}</select></label><button type="button" data-message-action="flag" data-mail-id="${escape(message.id)}">${message.isFlagged ? 'Unflag' : 'Flag'}</button><button type="button" data-message-action="read" data-mail-id="${escape(message.id)}">Mark unread</button><button type="button" data-message-action="print" data-mail-id="${escape(message.id)}">Print</button><button type="button" data-mail-popout aria-label="Pop out message" title="Pop out message">⛶</button><button type="button" data-mail-close aria-label="Close message">×</button></div><article class="outlook-message-reading"><header><div class="outlook-reading-subject"><h2>${escape(message.subject || 'No subject')}</h2>${message.category ? `<span class="outlook-category-tag">${escape(message.category)}</span>` : ''}</div><div class="outlook-reading-sender"><span class="outlook-mail-avatar">${escape(initials(message))}</span><div><strong>${escape(sender)}</strong><span>${escape(message.from || '')}${isExternal ? ' · External sender' : ''}</span></div><time>${message.sentAt ? escape(new Date(message.sentAt).toLocaleString()) : ''}</time></div><details class="outlook-recipient-details"><summary>To: ${escape(message.to || account().email || '')} · Details</summary><p>From: ${escape(message.from || '')}<br>To: ${escape(message.to || account().email || '')}</p></details></header>${isExternal ? '<div class="outlook-security-banner">External sender. Be careful with links and attachments.</div>' : ''}${message.calendarInvite ? `<div class="outlook-meeting-banner">Calendar invitation · ${escape(message.calendarInvite.title || 'Meeting')}<button type="button" data-calendar-rsvp="ACCEPTED" data-calendar-id="${escape(message.calendarInvite.uid)}">Accept</button><button type="button" data-calendar-rsvp="TENTATIVE" data-calendar-id="${escape(message.calendarInvite.uid)}">Tentative</button><button type="button" data-calendar-rsvp="DECLINED" data-calendar-id="${escape(message.calendarInvite.uid)}">Decline</button></div>` : ''}${message.attachments?.length ? `<div class="outlook-reading-attachments">${message.attachments.map(file => `<span>📎 ${escape(file.name || file.filename || 'Attachment')} · ${escape(file.sizeLabel || '')}</span>`).join('')}</div>` : ''}<div class="outlook-message-reading-body">${body}</div>${siblings.length > 1 ? `<section class="outlook-thread-history"><strong>Conversation · ${siblings.length} messages</strong>${siblings.filter(item => item.id !== message.id).map(item => `<button type="button" data-mail-thread-open="${escape(item.id)}"><span class="outlook-mail-avatar">${escape(initials(item))}</span><span><b>${escape(item.fromName || item.from || 'Message')}</b><small>${escape(plainSnippet(item))}</small></span><time>${escape(messageTime(item.sentAt))}</time></button>`).join('')}</section>` : ''}<footer><button type="button" data-mail-reply="${escape(message.id)}">↩ Reply</button><button type="button" data-mail-reply="${escape(message.id)}" data-mail-reply-mode="all">Reply all</button><button type="button" data-mail-forward="${escape(message.id)}">Forward</button></footer></article>`;
  }
  function draftData(form) {
    const value = name => form.elements[name]?.value.trim() || '';
    const chips = field => [...form.querySelectorAll(`[data-recipient-chip][data-field="${field}"]`)].map(chip => chip.dataset.email);
    const editor = form.querySelector('[data-rich-editor]');
    return { to: [...chips('to'), value('to')].filter(Boolean).join('; '), cc: [...chips('cc'), value('cc')].filter(Boolean).join('; '), bcc: [...chips('bcc'), value('bcc')].filter(Boolean).join('; '), subject: value('subject'), body: editor?.innerText || '', bodyHtml: editor?.innerHTML || '' };
  }
  function saveDraft(form) {
    const data = draftData(form);
    const ok = writeJson(draftKey(), data);
    const stateLabel = form.querySelector('[data-draft-state]');
    if (stateLabel) stateLabel.textContent = ok ? `Saved at ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}` : 'Could not save draft';
    return ok;
  }
  function scheduleDraft(form) {
    const label = form.querySelector('[data-draft-state]');
    if (label) label.textContent = 'Saving…';
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => saveDraft(form), 1600);
  }
  function recipientChips(form, field) {
    const input = form.querySelector(`[data-recipient-input="${field}"]`);
    if (!input) return true;
    const values = input.value.trim().replace(/[;,]+$/, '').split(/[;,\s]+/).filter(Boolean);
    if (!values.length) return true;
    if (!values.every(value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) { announce('Enter a valid email address.'); input.focus(); return false; }
    const wrap = input.closest('[data-recipient-field]');
    values.forEach(email => {
      if ([...wrap.querySelectorAll('[data-recipient-chip]')].some(chip => chip.dataset.email.toLowerCase() === email.toLowerCase())) return;
      const chip = document.createElement('span');
      chip.className = 'outlook-recipient-chip'; chip.dataset.recipientChip = ''; chip.dataset.field = field; chip.dataset.email = email;
      chip.innerHTML = `<span>${escape(email)}</span><button type="button" data-recipient-remove aria-label="Remove ${escape(email)}">×</button>`;
      wrap.insertBefore(chip, input);
    });
    input.value = ''; scheduleDraft(form); return true;
  }
  function allowedEmailList() { return new Set(matchedRecipients().map(person => person.email.toLowerCase())); }
  function deliverEmail(data, recipients, invite = null) {
    const current = account(), valid = allowedEmailList();
    const unique = [...new Set(recipients.map(value => value.trim().toLowerCase()).filter(Boolean))];
    if (!unique.length || unique.some(email => !valid.has(email))) return false;
    const sentAt = new Date().toISOString();
    const fromName = data.fromName || current.name || current.email;
    const threadId = String(data.subject || '').replace(/^(re|fw|fwd):\s*/i, '').trim().toLowerCase() || `thread-${id()}`;
    let recipientsSaved = true;
    unique.forEach(email => {
      const target = mailboxFor(email), inbox = target.folders.find(folder => folder.name === 'Inbox' && folder.type === 'system');
      target.messages.push({ id: `mail-${id()}`, threadId, folderId: inbox.id, from: current.email, fromName, to: email, subject: data.subject || '(No subject)', body: data.body || '', bodyHtml: data.bodyHtml || '', isCampaignHtml: Boolean(data.isCampaignHtml), calendarInvite: invite, sentAt, isRead: false, attachments: data.attachments || [], importance: data.importance || 'normal' });
      if (!writeJson(emailKey(mailboxPrefix, email), target)) recipientsSaved = false;
    });
    if (!recipientsSaved) return false;
    const sent = systemFolder('Sent Items');
    if (!sent) return false;
    state.messages.push({ id: `mail-${id()}`, threadId, folderId: sent.id, from: current.email, fromName, to: unique.join('; '), subject: data.subject || '(No subject)', body: data.body || '', bodyHtml: data.bodyHtml || '', isCampaignHtml: Boolean(data.isCampaignHtml), calendarInvite: invite, sentAt, isRead: true, attachments: data.attachments || [], importance: data.importance || 'normal' });
    return saveMailbox();
  }
  window.hireflowSendInternalCampaign = function (data) {
    const recipients = Array.isArray(data?.recipients) ? data.recipients : [];
    const allowed = allowedEmailList();
    const unique = [...new Set(recipients.map(email => String(email).trim().toLowerCase()).filter(Boolean))];
    if (!unique.length || unique.some(email => !allowed.has(email))) return { ok: false, message: 'Choose only teacher-code matched recipients.' };
    state = mailboxFor();
    const delivered = deliverEmail({
      subject: data.subject || '(No subject)', body: data.preheader || '',
      bodyHtml: data.bodyHtml || '', fromName: data.fromName || account().name,
      isCampaignHtml: true
    }, unique);
    return delivered ? { ok: true, sent: unique.length } : { ok: false, message: 'Could not save the internal email in browser storage.' };
  };
  function folderHtml(folder, depth = 0) {
    const children = state.folders.filter(item => item.parentId === folder.id).sort((a, b) => a.name.localeCompare(b.name));
    const selected = state.selectedFolderId === folder.id;
    const rename = folderEdit?.mode === 'rename' && folderEdit.id === folder.id;
    return `<div class="outlook-folder-node"><div class="outlook-folder-row${selected ? ' active' : ''}" data-folder-row="${escape(folder.id)}" style="padding-left:${12 + depth * 16}px" role="treeitem" aria-selected="${selected}">${rename ? `<input data-folder-input="rename" value="${escape(folder.name)}" aria-label="Rename folder">` : `<button type="button" data-folder-select="${escape(folder.id)}">${escape(folder.icon || '▤')} ${escape(folder.name)}</button>`}</div>${children.length || (folderEdit?.mode === 'create' && folderEdit.parentId === folder.id) ? `<div class="outlook-folder-children">${children.map(child => folderHtml(child, depth + 1)).join('')}${folderEdit?.mode === 'create' && folderEdit.parentId === folder.id ? '<input data-folder-input="create" placeholder="New folder">' : ''}</div>` : ''}</div>`;
  }
  function renderCalendar(panel) {
    const monthStart = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth(), 1);
    const gridStart = new Date(monthStart); gridStart.setDate(1 - monthStart.getDay());
    const events = readEvents();
    const cells = Array.from({ length: 42 }, (_, index) => {
      const date = new Date(gridStart); date.setDate(gridStart.getDate() + index);
      const dayEvents = events.filter(item => { const start = new Date(item.startTime); const ownResponse = (item.attendees || []).find(person => String(person.email || '').toLowerCase() === String(account().email || '').toLowerCase()); return start.toDateString() === date.toDateString() && ownResponse?.partstat !== 'DECLINED'; });
      return `<div class="outlook-calendar-day${date.getMonth() === calendarCursor.getMonth() ? '' : ' outside-month'}${date.toDateString() === new Date().toDateString() ? ' today' : ''}"><span class="outlook-calendar-day-number">${date.getDate()}</span>${dayEvents.map(item => `<article class="outlook-calendar-event${item.status === 'CANCELLED' ? ' cancelled' : ((item.attendees || []).some(person => String(person.email || '').toLowerCase() === String(account().email || '').toLowerCase() && person.partstat === 'NEEDS-ACTION') ? ' pending' : '')}"><strong>${escape(item.title)}</strong><time>${new Date(item.startTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</time>${item.status !== 'CANCELLED' ? `<div class="outlook-calendar-rsvp"><button type="button" data-calendar-rsvp="ACCEPTED" data-calendar-id="${escape(item.uid)}">Accept</button><button type="button" data-calendar-rsvp="TENTATIVE" data-calendar-id="${escape(item.uid)}">Maybe</button><button type="button" data-calendar-rsvp="DECLINED" data-calendar-id="${escape(item.uid)}">Decline</button><button type="button" data-calendar-cancel="${escape(item.uid)}">Cancel</button></div>` : '<small>Cancelled</small>'}<button type="button" data-calendar-ics="${escape(item.uid)}">.ics</button></article>`).join('')}</div>`;
    }).join('');
    const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    panel.querySelector('.outlook-mail-list').innerHTML = `<section class="outlook-calendar-view"><header class="outlook-calendar-toolbar"><div><p>CALENDAR</p><h2>${escape(calendarCursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }))}</h2></div><div class="outlook-calendar-controls"><button type="button" data-calendar-today>Today</button><button type="button" data-calendar-step="-1">‹</button><button type="button" data-calendar-step="1">›</button><button type="button" class="outlook-calendar-new" data-calendar-new>＋ New event</button></div></header><p class="outlook-calendar-notice" data-calendar-status>Events and invitations are stored locally. No external email is sent.</p><div class="outlook-calendar-grid"><div class="outlook-calendar-weekdays">${weekdays.map(day => `<span>${day}</span>`).join('')}</div><div class="outlook-calendar-days">${cells}</div></div><form class="outlook-calendar-event-form" data-calendar-form hidden><div class="outlook-calendar-form-heading"><strong>New event</strong><button type="button" data-calendar-form-close>×</button></div><label>Title<input name="title" required maxlength="120"></label><div class="outlook-calendar-form-row"><label>Start<input name="start" type="datetime-local" required></label><label>End<input name="end" type="datetime-local" required></label></div><label>Invite attendees<input name="attendees" placeholder="name@example.com"></label><label>Location<input name="location"></label><label>Description<textarea name="description"></textarea></label><p data-calendar-error hidden></p><div class="outlook-calendar-form-actions"><button type="submit">Save event</button></div></form></section>`;
  }
  function applyMailboxSearch(panel) {
    const list = panel?.querySelector('.outlook-mail-list');
    if (!list) return;
    const query = mailboxSearch.trim().toLowerCase();
    let visible = 0;
    list.querySelectorAll('.outlook-mail-item').forEach(card => {
      const match = !query || card.textContent.toLowerCase().includes(query);
      card.hidden = !match;
      if (match) visible += 1;
    });
    const empty = list.querySelector('.outlook-search-empty');
    if (query && !visible) {
      if (!empty) list.insertAdjacentHTML('beforeend', '<div class="outlook-search-empty">No messages match your search.</div>');
    } else empty?.remove();
    const count = list.querySelector('.outlook-list-heading > span');
    if (count) count.textContent = query ? String(visible) : String(list.querySelectorAll('.outlook-mail-item').length);
  }
  function renderMailbox(panel) {
    if (!panel) return;
    const rail = panel.querySelector('.outlook-module-rail'), folders = panel.querySelector('.outlook-folders'), list = panel.querySelector('.outlook-mail-list'), reader = panel.querySelector('.outlook-reading-pane');
    if (!rail || !folders || !list || !reader) return;
    rail.innerHTML = [['mail','✉','Mail'],['calendar','▦','Calendar'],['contacts','♙','Contacts'],['tasks','✓','Tasks']].map(([key, icon, label]) => `<button type="button" data-mail-module="${key}" class="${state.activeTab === key ? 'active' : ''}" title="${label}" aria-label="${label}">${icon}</button>`).join('');
    folders.innerHTML = `<div class="outlook-pane-tools"><button type="button" data-mail-pane-toggle aria-label="Toggle folders">☰</button><button type="button" data-folder-create-root title="Create folder">＋</button></div><div class="outlook-folders-label">FOLDERS</div><div class="outlook-folder-tree" role="tree">${state.folders.filter(folder => !folder.parentId).map(folder => folderHtml(folder)).join('')}${folderEdit?.mode === 'create' && !folderEdit.parentId ? '<input data-folder-input="create" placeholder="New folder">' : ''}</div>`;
    panel.querySelector('.outlook-layout')?.classList.toggle('calendar-mode', state.activeTab === 'calendar');
    panel.querySelector('.outlook-layout')?.classList.toggle('pane-collapsed', !state.isPaneOpen);
    if (state.activeTab === 'calendar') { renderCalendar(panel); return; }
    if (state.activeTab !== 'mail') { panel.querySelector('.outlook-layout')?.classList.remove('message-open'); reader.innerHTML = ''; list.innerHTML = `<div class="outlook-list-heading"><strong>${escape(state.activeTab)}</strong></div><div class="outlook-list-empty">No ${escape(state.activeTab)} items in this local demo.</div>`; return; }
    const selected = folderById(state.selectedFolderId);
    let messages = state.messages.filter(item => item.folderId === state.selectedFolderId);
    const draft = readJson(draftKey(), {});
    if (selected?.name === 'Drafts' && Object.keys(draft).length && !messages.some(item => item.id === 'local-draft')) messages = [{ id: 'local-draft', to: draft.to || 'New message', subject: draft.subject || 'No subject', body: draft.body || '', isDraft: true }, ...messages];
    const opened = messages.find(item => item.id === openMessageId && !item.isDraft);
    panel.querySelector('.outlook-layout')?.classList.toggle('message-open', Boolean(opened));
    if (!opened) panel.querySelector('.outlook-layout')?.classList.remove('message-popout');
    const threads = messageThreads(messages);
    list.innerHTML = `<div class="outlook-list-heading"><strong>${escape(selected?.name || 'Messages')}</strong><span>${messages.length}</span></div>${threads.length ? threads.map(thread => renderMessageCard(thread[0], thread.length)).join('') : '<div class="outlook-list-empty">This folder is empty.</div>'}`;
    reader.innerHTML = opened ? renderReadingPane(opened, messages) : '<div class="outlook-reader-empty"><span>✉</span><strong>Select a message to read</strong><small>Your message content will appear here.</small></div>';
    applyMailboxSearch(panel);
  }
  function mount(view) {
    if (!view || view.querySelector('#report-outlook')) return;
    state = mailboxFor();
    const current = account(), draft = readJson(draftKey(), {}), people = matchedRecipients();
    const start = new Date(); start.setMinutes(0, 0, 0); start.setHours(start.getHours() + 1);
    const end = new Date(start.getTime() + 3600000);
    const panel = document.createElement('section'); panel.id = 'report-outlook'; panel.className = 'report-outlook';
    panel.innerHTML = `<header class="outlook-titlebar"><div class="outlook-title-brand"><span class="outlook-title-mark" aria-hidden="true">O</span><strong>Email</strong></div><div class="outlook-quick-access" role="toolbar" aria-label="Quick access"><button type="button" data-report-save aria-label="Save draft" title="Save draft">↶</button><button type="button" data-report-save aria-label="Save draft" title="Save draft">▣</button><button type="button" data-report-new aria-label="New message" title="New message">✉</button></div><label class="outlook-title-search"><span aria-hidden="true">⌕</span><input type="search" data-outlook-search aria-label="Search email" placeholder="Search email, people, and more"></label><div class="outlook-title-actions"><button type="button" aria-label="Notifications" title="Notifications">♧</button><span class="outlook-profile-avatar" aria-label="${escape(current.name || 'Student')} profile">${escape((current.name || 'S').split(/\s+/).map(part => part[0]).join('').slice(0,2).toUpperCase())}</span><button type="button" class="outlook-window-button" data-outlook-window="minimize" aria-label="Minimize window" title="Minimize">−</button><button type="button" class="outlook-window-button" data-outlook-window="restore" aria-label="Restore window" title="Restore">□</button><button type="button" class="outlook-window-button outlook-window-close" data-outlook-window="close" aria-label="Close window" title="Close">×</button></div></header><nav class="outlook-ribbon" aria-label="Email commands"><div class="outlook-ribbon-tabs" role="tablist" aria-label="Command tabs"><button type="button" class="outlook-ribbon-tab is-active" role="tab" aria-selected="true" data-ribbon-tab="Home">Home</button><button type="button" class="outlook-ribbon-tab" role="tab" aria-selected="false" data-ribbon-tab="Send / Receive">Send / Receive</button><button type="button" class="outlook-ribbon-tab" role="tab" aria-selected="false" data-ribbon-tab="Folder">Folder</button><button type="button" class="outlook-ribbon-tab" role="tab" aria-selected="false" data-ribbon-tab="View">View</button><button type="button" class="outlook-ribbon-tab" role="tab" aria-selected="false" data-ribbon-tab="Help">Help</button><span class="outlook-ribbon-search">Tell me what you want to do <span>⌕</span></span></div><div class="outlook-ribbon-content" role="tabpanel"><div class="outlook-ribbon-group"><button type="button" class="outlook-ribbon-primary" data-report-new><span>＋</span>New message</button><small>New</small></div><div class="outlook-ribbon-group"><button type="button" data-report-save><span>▣</span>Save draft</button><button type="button" data-report-copy><span>▤</span>Copy</button><small>Clipboard</small></div><div class="outlook-ribbon-group"><button type="button" data-report-new><span>↩</span>Reply</button><button type="button" data-report-new><span>➦</span>Forward</button><small>Respond</small></div><div class="outlook-ribbon-group"><button type="button" data-report-save><span>⚡</span>Quick steps</button><small>Quick Steps</small></div><div class="outlook-ribbon-group"><button type="button" data-report-copy><span>↗</span>Move / Copy</button><button type="button" data-report-save><span>⌑</span>Tags</button><small>Organize</small></div><div class="outlook-ribbon-group outlook-ribbon-group-search"><label>Search commands<input type="search" data-command-search placeholder="Find a command" aria-label="Find a command"></label><small>Find</small></div></div></nav><div class="outlook-layout"><nav class="outlook-module-rail" aria-label="Email modules"></nav><aside class="outlook-folders" aria-label="Mail folders"></aside><div class="outlook-resizer" data-resize="folders" role="separator" aria-label="Resize folders"></div><section class="outlook-mail-list" aria-label="Messages"></section><div class="outlook-resizer outlook-inbox-resizer" data-resize="inbox" role="separator" aria-label="Resize inbox list" aria-orientation="vertical" tabindex="0"></div><section class="outlook-reading-pane" aria-label="Message reading pane"></section><div class="outlook-resizer outlook-compose-resizer" data-resize="compose" role="separator" aria-label="Resize composer"></div><section class="outlook-compose-area" hidden><form id="report-message-form" class="outlook-compose-card"><div class="outlook-compose-heading"><div><span class="outlook-compose-icon">✉</span><strong>New message</strong><small data-draft-state>Saved on this device</small></div><button type="button" class="outlook-expand" data-report-expand title="Pop out composer" aria-label="Pop out composer">⛶</button><button type="button" class="outlook-window-control" data-report-minimize aria-label="Minimize composer" title="Minimize">−</button><button type="button" class="outlook-window-control" data-report-maximize aria-label="Maximize composer" title="Maximize">□</button><button type="button" class="outlook-close" aria-label="Close message">×</button></div><div class="outlook-compose-actions"><button type="button" class="outlook-send" data-report-send>➤ Send internally</button><button type="button" data-report-invite>▦ Calendar invite</button><button type="button" data-report-save>▣ Save draft</button><button type="button" data-report-copy>▤ Copy</button></div><section class="outlook-invite-panel" data-report-invite-panel hidden><strong>Calendar invitation</strong><label>Event title<input data-invite-title maxlength="120" placeholder="Add a title"></label><div class="outlook-calendar-form-row"><label>Start<input data-invite-start type="datetime-local" value="${localDateInput(start)}"></label><label>End<input data-invite-end type="datetime-local" value="${localDateInput(end)}"></label></div><label>Location or meeting link<input data-invite-location maxlength="240"></label><p data-invite-error role="alert" hidden></p><div class="outlook-invite-actions"><button type="button" data-report-invite-cancel>Cancel</button><button type="button" data-report-invite-send>Send invite</button></div></section><div class="outlook-format-toolbar" role="toolbar"><select data-format="fontName"><option>Arial</option><option>Georgia</option><option>Tahoma</option><option>Verdana</option></select><select data-format="fontSize"><option value="2">10 pt</option><option value="3" selected>12 pt</option><option value="4">14 pt</option><option value="5">18 pt</option></select><button type="button" data-command="bold"><b>B</b></button><button type="button" data-command="italic"><i>I</i></button><button type="button" data-command="underline"><u>U</u></button><button type="button" data-command="insertUnorderedList">• List</button><button type="button" data-command="insertOrderedList">1. List</button><span class="outlook-table-picker-wrap"><button type="button" data-report-table>▦ Table</button><div class="outlook-table-picker" data-table-picker hidden><strong data-table-picker-label>Insert Table</strong><div class="outlook-table-picker-grid">${Array.from({length:80},(_,i)=>`<button type="button" class="outlook-table-picker-cell" data-picker-row="${Math.floor(i/10)+1}" data-picker-column="${i%10+1}" aria-label="${i%10+1} columns by ${Math.floor(i/10)+1} rows"></button>`).join('')}</div></div></span></div><div class="outlook-from-row"><span>From</span><strong>${escape(current.name || 'Student')}</strong><span>&lt;${escape(current.email || '')}&gt;</span></div><label class="outlook-address-row"><span>To</span><select class="outlook-internal-recipient-select" data-internal-recipient><option value="">Choose matched student / teacher</option>${people.map(person=>`<option value="${escape(person.email)}">${escape(person.name || person.email)} · ${person.role === 'teacher' ? 'Teacher' : 'Student'}</option>`).join('')}</select><div class="outlook-recipient-field" data-recipient-field="to"><input name="to" data-recipient-input="to" placeholder="Add recipients" value="${escape(draft.to || '')}"></div><button type="button" data-report-cc>Cc</button><button type="button" data-report-bcc>Bcc</button></label><label class="outlook-address-row outlook-extra-address" data-report-cc-row hidden><span>Cc</span><div class="outlook-recipient-field" data-recipient-field="cc"><input name="cc" data-recipient-input="cc" value="${escape(draft.cc || '')}" placeholder="Add Cc recipients"></div></label><label class="outlook-address-row outlook-extra-address" data-report-bcc-row hidden><span>Bcc</span><div class="outlook-recipient-field" data-recipient-field="bcc"><input name="bcc" data-recipient-input="bcc" value="${escape(draft.bcc || '')}" placeholder="Add Bcc recipients"></div></label><label class="outlook-address-row"><span>Subject</span><input name="subject" maxlength="180" placeholder="Add a subject" value="${escape(draft.subject || '')}"></label><div class="outlook-message-body"><div class="outlook-rich-editor" data-rich-editor contenteditable="true" role="textbox" aria-label="Email message" aria-multiline="true">${draft.bodyHtml || escape(draft.body || '').replace(/\n/g,'<br>')}</div></div><div class="outlook-compose-footer"><button type="button" data-report-discard>Discard</button><span class="outlook-status" id="report-message-status" role="status">Saved on this device only</span></div></form></section></div><p class="outlook-disclaimer">Internal demo only. No external email is sent.</p>`;
    view.replaceChildren(panel); renderMailbox(panel);
  }

  function commitFolder(input) {
    if (!folderEdit) return;
    const name = input.value.trim();
    if (!name) { folderEdit = null; renderMailbox(document.getElementById('report-outlook')); return; }
    if (state.folders.some(folder => folder.parentId === folderEdit.parentId && folder.id !== folderEdit.id && folder.name.toLowerCase() === name.toLowerCase())) { announce('A folder with this name already exists.'); input.focus(); return; }
    if (folderEdit.mode === 'rename') { const target = folderById(folderEdit.id); if (target) target.name = name; }
    else state.folders.push({ id: `custom-${id()}`, parentId: folderEdit.parentId, accountId: mailboxKey(), name, type: 'custom', isFavorite: false, unreadCount: 0, isExpanded: true });
    folderEdit = null; saveMailbox(); renderMailbox(document.getElementById('report-outlook'));
  }
  function removeFolder(folderId) {
    const removed = new Set([folderId]); let changed = true;
    while (changed) { changed = false; state.folders.forEach(folder => { if (removed.has(folder.parentId) && !removed.has(folder.id)) { removed.add(folder.id); changed = true; } }); }
    state.folders = state.folders.filter(folder => !removed.has(folder.id));
    state.messages = state.messages.filter(message => !removed.has(message.folderId));
    if (removed.has(state.selectedFolderId)) state.selectedFolderId = systemFolder('Inbox')?.id;
  }
  function addInvite(data, recipients, invitePanel) {
    const error = invitePanel.querySelector('[data-invite-error]');
    const title = invitePanel.querySelector('[data-invite-title]').value.trim();
    const start = new Date(invitePanel.querySelector('[data-invite-start]').value), end = new Date(invitePanel.querySelector('[data-invite-end]').value);
    const valid = allowedEmailList();
    if (!title || !Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end <= start) { error.textContent = 'Enter an event title and valid end time.'; error.hidden = false; return false; }
    if (!recipients.length || recipients.some(email => !valid.has(email.toLowerCase()))) { error.textContent = 'Choose recipients matched to your teacher code.'; error.hidden = false; return false; }
    const current = account(), roster = matchedRecipients();
    const event = { uid: id(), sequence: 0, organizer: { name: current.name || 'Student', email: current.email || '' }, attendees: recipients.map(email => { const person = roster.find(item => item.email.toLowerCase() === email.toLowerCase()); return { email: email.toLowerCase(), name: person?.name || email, role: 'REQ-PARTICIPANT', partstat: 'NEEDS-ACTION' }; }), startTime: start.toISOString(), endTime: end.toISOString(), ianaTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC', status: 'CONFIRMED', recurrenceRule: null, title, location: invitePanel.querySelector('[data-invite-location]').value.trim(), description: data.body || '' };
    const invitation = { ...data, subject: data.subject || `Invitation: ${title}`, body: `${data.body ? `${data.body}\n\n` : ''}Calendar invitation: ${title}\n${start.toLocaleString()} – ${end.toLocaleString()}${event.location ? `\nLocation: ${event.location}` : ''}` };
    const ownEvents = readEvents(); ownEvents.push(event);
    if (!saveEvents(ownEvents)) { error.textContent = 'Could not save this event.'; error.hidden = false; return false; }
    for (const email of recipients) { const existing = readEvents(email); existing.push(event); if (!saveEvents(existing, email)) { error.textContent = 'Could not save the invitation to a recipient calendar.'; error.hidden = false; return false; } }
    shareTeacherDashboardReminder(event);
    if (!deliverEmail(invitation, recipients, event)) { error.textContent = 'Could not deliver the invitation in browser storage.'; error.hidden = false; return false; }
    error.hidden = true; announce('Calendar invite sent internally and saved to matched local calendars.'); return true;
  }

  document.addEventListener('pointerdown', event => {
    const separator = event.target.closest('[data-resize="inbox"]');
    if (!separator || event.button !== 0) return;
    const layout = separator.closest('.outlook-layout');
    if (!layout || window.matchMedia('(max-width: 700px)').matches) return;
    inboxResize = { separator, layout, pointerId: event.pointerId };
    separator.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });
  document.addEventListener('pointermove', event => {
    if (!inboxResize || event.pointerId !== inboxResize.pointerId) return;
    const { layout, separator } = inboxResize;
    const rail = layout.querySelector('.outlook-module-rail')?.getBoundingClientRect();
    const folders = layout.querySelector('.outlook-folders')?.getBoundingClientRect();
    if (!rail || !folders) return;
    const bounds = layout.getBoundingClientRect();
    const minWidth = 230;
    const maxWidth = Math.max(minWidth, layout.clientWidth - rail.width - folders.width - 12 - 280);
    const width = Math.max(minWidth, Math.min(maxWidth, event.clientX - bounds.left - rail.width - folders.width - 12));
    layout.style.setProperty('--mail-list-width', `${width}px`);
    separator.setAttribute('aria-valuenow', String(Math.round(width)));
  });
  const stopInboxResize = event => { if (inboxResize && event.pointerId === inboxResize.pointerId) inboxResize = null; };
  document.addEventListener('pointerup', stopInboxResize);
  document.addEventListener('pointercancel', stopInboxResize);
  document.addEventListener('change', event => {
    const selector = event.target.closest('[data-internal-recipient]');
    if (selector?.value) {
      const form = selector.closest('form'), input = form?.querySelector('[data-recipient-input="to"]');
      if (input) { input.value = selector.value; recipientChips(form, 'to'); }
      selector.value = '';
      return;
    }
    const move = event.target.closest('[data-message-move]');
    if (move?.value) {
      const message = state.messages.find(item => item.id === move.dataset.messageMove), destination = folderById(move.value);
      if (message && destination) { message.folderId = destination.id; openMessageId = null; saveMailbox(); renderMailbox(document.getElementById('report-outlook')); announce(`Moved to ${destination.name}.`); }
    }
  });
  document.addEventListener('input', event => {
    const emailSearch = event.target.closest('[data-outlook-search]');
    if (emailSearch) { mailboxSearch = emailSearch.value; applyMailboxSearch(document.getElementById('report-outlook')); return; }
    const commandSearch = event.target.closest('[data-command-search]');
    if (commandSearch) {
      const query = commandSearch.value.trim().toLowerCase();
      document.querySelectorAll('#report-outlook .outlook-ribbon-group:not(.outlook-ribbon-group-search)').forEach(group => { group.hidden = Boolean(query) && !group.textContent.toLowerCase().includes(query); });
      return;
    }
    const folderInput = event.target.closest('[data-folder-input]');
    if (folderInput) return;
    const form = event.target.closest('#report-message-form');
    if (form) scheduleDraft(form);
  });
  document.addEventListener('keydown', event => {
    const recipient = event.target.closest('[data-recipient-input]');
    if (recipient && ['Enter', 'Tab', ',', ';', ' '].includes(event.key) && recipient.value.trim()) { const success = recipientChips(recipient.closest('form'), recipient.dataset.recipientInput); if (success && event.key !== 'Tab') event.preventDefault(); }
    const folderInput = event.target.closest('[data-folder-input]');
    if (folderInput && event.key === 'Enter') { event.preventDefault(); commitFolder(folderInput); }
    if (folderInput && event.key === 'Escape') { folderEdit = null; renderMailbox(document.getElementById('report-outlook')); }
  });
  document.addEventListener('focusout', event => {
    const input = event.target.closest('[data-recipient-input]'); if (input && input.value.trim()) recipientChips(input.closest('form'), input.dataset.recipientInput);
    const folderInput = event.target.closest('[data-folder-input]'); if (folderInput) commitFolder(folderInput);
  });
  document.addEventListener('contextmenu', event => {
    const row = event.target.closest('.outlook-folder-row'); if (!row) return;
    event.preventDefault(); folderMenu = row.dataset.folderRow;
    const pane = row.closest('.outlook-folders'); pane.querySelector('.outlook-context-menu')?.remove();
    const menu = document.createElement('div'); menu.className = 'outlook-context-menu'; menu.dataset.menuFolder = folderMenu;
    menu.innerHTML = `<button type="button" data-folder-action="create">Create new folder</button>${folderById(folderMenu)?.type === 'custom' ? '<button type="button" data-folder-action="rename">Rename</button><button type="button" data-folder-action="delete">Delete folder</button>' : ''}`;
    menu.style.top = `${Math.max(0, event.clientY - pane.getBoundingClientRect().top + pane.scrollTop)}px`; pane.append(menu);
  });
  document.addEventListener('submit', event => {
    if (event.target.matches('#report-outlook [data-calendar-form]')) {
      event.preventDefault(); const form = event.target, values = Object.fromEntries(new FormData(form)), start = new Date(values.start), end = new Date(values.end), error = form.querySelector('[data-calendar-error]');
      if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end <= start) { if (error) { error.textContent = 'Choose a valid end time.'; error.hidden = false; } else announce('Choose a valid end time.'); return; }
      const current = account(), emails = values.attendees.split(/[;,\s]+/).filter(Boolean);
      if (!emails.every(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) { if (error) { error.textContent = 'Enter valid attendee email addresses.'; error.hidden = false; } else announce('Enter valid attendee email addresses.'); return; }
      const events = readEvents(); events.push({ uid: id(), sequence: 0, organizer: { name: current.name, email: current.email }, attendees: emails.map(email => ({ email, name: email.split('@')[0], role: 'REQ-PARTICIPANT', partstat: 'NEEDS-ACTION' })), startTime: start.toISOString(), endTime: end.toISOString(), ianaTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC', status: 'CONFIRMED', recurrenceRule: null, title: values.title, location: values.location, description: values.description });
      if (saveEvents(events)) { shareTeacherDashboardReminder(events[events.length - 1]); calendarCursor = new Date(start); renderMailbox(document.getElementById('report-outlook')); announce('Event saved to your local calendar and shared as a student dashboard reminder when applicable.'); }
      return;
    }
    if (event.target.id === 'report-message-form') { event.preventDefault(); saveDraft(event.target); announce('Draft saved on this device.'); }
  });
  document.addEventListener('click', event => {
    const ribbonTab=event.target.closest('[data-ribbon-tab]');
    if(ribbonTab){const ribbon=ribbonTab.closest('.outlook-ribbon');ribbon?.querySelectorAll('[data-ribbon-tab]').forEach(tab=>{const active=tab===ribbonTab;tab.classList.toggle('is-active',active);tab.setAttribute('aria-selected',String(active));});return;}
    const panel = document.getElementById('report-outlook');
    const windowAction = event.target.closest('[data-outlook-window]');
    if (windowAction && panel) {
      const action = windowAction.dataset.outlookWindow;
      if (action === 'minimize') panel.classList.add('window-minimized');
      if (action === 'restore') panel.classList.remove('window-minimized');
      if (action === 'close') {
        if (typeof window.switchView === 'function') window.switchView('home');
        else { panel.closest('.view')?.classList.remove('active-view'); document.getElementById('home-view')?.classList.add('active-view'); }
      }
      return;
    }
    const form = document.getElementById('report-message-form');
    const area = form?.closest('.outlook-compose-area');
    const selector = event.target.closest('[data-internal-recipient]');
    if (selector?.value) { const input = form.querySelector('[data-recipient-input="to"]'); input.value = selector.value; recipientChips(form, 'to'); selector.value = ''; return; }
    if (event.target.closest('[data-report-minimize]')) {
      area?.classList.toggle('compose-minimized');
      const button = area?.querySelector('[data-report-minimize]');
      if (button) { const minimized = area.classList.contains('compose-minimized'); button.textContent = minimized ? '□' : '−'; button.title = minimized ? 'Restore' : 'Minimize'; button.setAttribute('aria-label', `${button.title} composer`); }
      return;
    }
    if (event.target.closest('[data-report-maximize]')) {
      area?.classList.toggle('compose-fullscreen');
      const button = area?.querySelector('[data-report-maximize]');
      if (button) { const maximized = area.classList.contains('compose-fullscreen'); button.textContent = maximized ? '❐' : '□'; button.title = maximized ? 'Restore size' : 'Maximize'; button.setAttribute('aria-label', `${button.title} composer`); }
      return;
    }
    if (event.target.closest('[data-report-expand]')) { area?.classList.toggle('compose-popout'); area?.classList.remove('compose-minimized','compose-fullscreen'); if(area){const min=area.querySelector('[data-report-minimize]'),max=area.querySelector('[data-report-maximize]');min.textContent='−';min.title='Minimize';min.setAttribute('aria-label','Minimize composer');max.textContent='□';max.title='Maximize';max.setAttribute('aria-label','Maximize composer');} return; }
    if (event.target.closest('[data-report-invite]')) { const invite = form?.querySelector('[data-report-invite-panel]'); if (invite) { const start=new Date();start.setMinutes(0,0,0);start.setHours(start.getHours()+1);invite.querySelector('[data-invite-title]').value=form.elements.subject.value.trim();invite.querySelector('[data-invite-start]').value=localDateInput(start);invite.querySelector('[data-invite-end]').value=localDateInput(new Date(start.getTime()+3600000));invite.querySelector('[data-invite-location]').value='';invite.querySelector('[data-invite-error]').hidden=true;invite.hidden=false;invite.querySelector('[data-invite-title]').focus(); } return; }
    if (event.target.closest('[data-report-invite-cancel]')) { const invite = form?.querySelector('[data-report-invite-panel]'); if (invite) invite.hidden = true; return; }
    if (event.target.closest('[data-report-invite-send]')) {
      const data = draftData(form), recipients = [data.to, data.cc, data.bcc].join(';').split(/[;,\s]+/).filter(Boolean);
      if (addInvite(data, recipients, form.querySelector('[data-report-invite-panel]'))) form.querySelector('[data-report-invite-panel]').hidden = true;
      return;
    }
    const folderAction = event.target.closest('[data-folder-action]');
    if (folderAction) {
      const targetId = folderAction.closest('[data-menu-folder]')?.dataset.menuFolder, target = folderById(targetId), action = folderAction.dataset.folderAction;
      if (!target) return;
      if (action === 'create') folderEdit = { mode: 'create', parentId: target.id };
      if (action === 'rename') folderEdit = { mode: 'rename', id: target.id, parentId: target.parentId };
      if (action === 'delete' && window.confirm(`Delete “${target.name}” and its contents?`)) removeFolder(target.id);
      panel.querySelector('.outlook-context-menu')?.remove(); saveMailbox(); renderMailbox(panel); panel.querySelector('[data-folder-input]')?.focus(); return;
    }
    if (event.target.closest('[data-folder-create-root]')) { folderEdit = { mode: 'create', parentId: null }; renderMailbox(panel); panel.querySelector('[data-folder-input]')?.focus(); return; }
    if (event.target.closest('[data-mail-pane-toggle]')) { state.isPaneOpen = !state.isPaneOpen; saveMailbox(); renderMailbox(panel); return; }
    const module = event.target.closest('[data-mail-module]');
    if (module) { state.activeTab = module.dataset.mailModule; saveMailbox(); renderMailbox(panel); return; }
    const chosenFolder = event.target.closest('[data-folder-select]');
    if (chosenFolder) { state.selectedFolderId = chosenFolder.dataset.folderSelect; state.activeTab = 'mail'; saveMailbox(); renderMailbox(panel); return; }
    const calendarStep = event.target.closest('[data-calendar-step]');
    if (calendarStep) { calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + Number(calendarStep.dataset.calendarStep), 1); renderMailbox(panel); return; }
    if (event.target.closest('[data-calendar-today]')) { calendarCursor = new Date(); renderMailbox(panel); return; }
    if (event.target.closest('[data-calendar-new]')) { const calendarForm = panel.querySelector('[data-calendar-form]'); calendarForm.hidden = false; const start = new Date(); start.setMinutes(0,0,0); start.setHours(start.getHours()+1); calendarForm.elements.start.value = localDateInput(start); calendarForm.elements.end.value = localDateInput(new Date(start.getTime()+3600000)); calendarForm.elements.title.focus(); return; }
    if (event.target.closest('[data-calendar-form-close]')) { renderMailbox(panel); return; }
    const rsvp = event.target.closest('[data-calendar-rsvp]');
    if (rsvp) { const events=readEvents(), item=events.find(entry=>entry.uid===rsvp.dataset.calendarId); if (item) { item.attendees ||= []; const me=account(); let attendee=item.attendees.find(entry=>entry.email===me.email); if(!attendee){attendee={email:me.email,name:me.name,role:'REQ-PARTICIPANT'};item.attendees.push(attendee);} attendee.partstat=rsvp.dataset.calendarRsvp; saveEvents(events); renderMailbox(panel); announce(`RSVP updated to ${attendee.partstat}.`); } return; }
    const cancel = event.target.closest('[data-calendar-cancel]');
    if (cancel) { const events=readEvents(), item=events.find(entry=>entry.uid===cancel.dataset.calendarCancel); if(item){item.sequence=(item.sequence||0)+1;item.status='CANCELLED';saveEvents(events);renderMailbox(panel);} return; }
    const ics = event.target.closest('[data-calendar-ics]');
    if (ics) { const item=readEvents().find(entry=>entry.uid===ics.dataset.calendarIcs); if(!item)return; const lines=['BEGIN:VCALENDAR','VERSION:2.0','BEGIN:VEVENT',`UID:${item.uid}`,`SEQUENCE:${item.sequence||0}`,`DTSTART:${new Date(item.startTime).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z')}`,`DTEND:${new Date(item.endTime).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z')}`,`SUMMARY:${item.title}`,`STATUS:${item.status||'CONFIRMED'}`,'END:VEVENT','END:VCALENDAR']; const link=document.createElement('a'); link.href=URL.createObjectURL(new Blob([lines.join('\r\n')],{type:'text/calendar'})); link.download='calendar-invite.ics'; link.click(); setTimeout(()=>URL.revokeObjectURL(link.href),1000); return; }
    if (event.target.closest('[data-mail-close]')) { openMessageId = null; panel.querySelector('.outlook-layout')?.classList.remove('message-popout'); renderMailbox(panel); return; }
    if (event.target.closest('[data-mail-popout]')) { panel.querySelector('.outlook-layout')?.classList.toggle('message-popout'); return; }
    const messageAction = event.target.closest('[data-message-action], [data-mail-quick]');
    if (messageAction) {
      const message = state.messages.find(item => item.id === messageAction.dataset.mailId), action = messageAction.dataset.messageAction || messageAction.dataset.mailQuick;
      if (!message) return;
      if (action === 'print') { window.print(); return; }
      if (action === 'read') message.isRead = !message.isRead;
      if (action === 'flag') message.isFlagged = !message.isFlagged;
      if (action === 'pin') message.isPinned = !message.isPinned;
      if (['delete', 'archive', 'junk'].includes(action)) {
        const folderName = action === 'delete' ? 'Deleted Items' : action === 'archive' ? 'Archive' : 'Junk Email';
        const destination = systemFolder(folderName);
        if (destination) message.folderId = destination.id;
        if (message.id === openMessageId) openMessageId = null;
      }
      saveMailbox(); renderMailbox(panel);
      if (action === 'flag') announce(message.isFlagged ? 'Message flagged for follow-up.' : 'Flag removed.');
      else if (action === 'pin') announce(message.isPinned ? 'Message pinned to the top of the folder.' : 'Message unpinned.');
      else if (['delete', 'archive', 'junk'].includes(action)) announce(`Message moved to ${action === 'delete' ? 'Deleted Items' : action === 'archive' ? 'Archive' : 'Junk Email'}.`);
      return;
    }
    const threadMessage = event.target.closest('[data-mail-thread-open]');
    if (threadMessage) { const message = state.messages.find(item => item.id === threadMessage.dataset.mailThreadOpen); if (message) { message.isRead = true; openMessageId = message.id; saveMailbox(); renderMailbox(panel); } return; }
    if (event.target.closest('[data-mail-back]')) { openMessageId = null; renderMailbox(panel); return; }
    const openMail = event.target.closest('[data-mail-open]');
    if (openMail) { const message = state.messages.find(item => item.id === openMail.dataset.mailId); if (message) { message.isRead = true; openMessageId = message.id; saveMailbox(); renderMailbox(panel); } return; }
    const forwardButton = event.target.closest('[data-mail-forward]');
    if (forwardButton) {
      const message = state.messages.find(item => item.id === forwardButton.dataset.mailForward);
      if (!message || !form) return;
      clearTimeout(saveTimer); form.reset(); form.querySelectorAll('[data-recipient-chip]').forEach(chip => chip.remove());
      ['to','cc','bcc','subject'].forEach(name => { if (form.elements[name]) form.elements[name].value = ''; });
      form.querySelectorAll('.outlook-extra-address').forEach(row => row.hidden = true);
      form.querySelector('[data-report-invite-panel]').hidden = true;
      form.elements.subject.value = /^fw:/i.test(message.subject || '') ? message.subject : `FW: ${message.subject || '(No subject)'}`;
      form.querySelector('[data-rich-editor]').textContent = `Forwarded message\nFrom: ${message.from || ''}\nSubject: ${message.subject || '(No subject)'}\n\n${message.body || plainSnippet(message)}`;
      area.hidden = false; area.classList.add('compose-popout'); area.classList.remove('compose-fullscreen','compose-minimized');
      form.closest('.outlook-layout').classList.add('compose-open');
      form.querySelector('[data-recipient-input="to"]').focus();
      return;
    }
    const replyButton = event.target.closest('[data-mail-reply]');
    if (replyButton) {
      const message = state.messages.find(item => item.id === replyButton.dataset.mailReply);
      if (!message || !form) return;
      clearTimeout(saveTimer); form.reset(); form.querySelectorAll('[data-recipient-chip]').forEach(chip => chip.remove());
      ['to','cc','bcc','subject'].forEach(name => { if (form.elements[name]) form.elements[name].value = ''; });
      form.querySelectorAll('.outlook-extra-address').forEach(row => row.hidden = true);
      form.querySelector('[data-report-invite-panel]').hidden = true; form.querySelector('[data-rich-editor]').innerHTML = '';
      const toInput = form.querySelector('[data-recipient-input="to"]');
      const replyTo = replyButton.dataset.mailReplyMode === 'all' ? [message.from, message.to].join(';') : (message.from || '');
      toInput.value = replyTo.split(/[;,\s]+/).filter(email => email && email.toLowerCase() !== String(account().email || '').toLowerCase()).join('; ');
      if (toInput.value) recipientChips(form, 'to');
      form.elements.subject.value = /^re:/i.test(message.subject || '') ? message.subject : `Re: ${message.subject || '(No subject)'}`;
      area.hidden = false; area.classList.add('compose-popout'); area.classList.remove('compose-fullscreen','compose-minimized');
      form.closest('.outlook-layout').classList.add('compose-open');
      form.querySelector('[data-rich-editor]').focus();
      return;
    }
    if (event.target.closest('[data-report-new]')) { if(!form)return; clearTimeout(saveTimer); form.reset(); form.querySelectorAll('[data-recipient-chip]').forEach(chip=>chip.remove()); ['to','cc','bcc','subject'].forEach(name=>{if(form.elements[name])form.elements[name].value='';}); form.querySelectorAll('.outlook-extra-address').forEach(row=>row.hidden=true); form.querySelector('[data-report-invite-panel]').hidden=true; form.querySelector('[data-rich-editor]').innerHTML=''; area.hidden=false; area.classList.add('compose-popout'); area.classList.remove('compose-fullscreen','compose-minimized'); form.closest('.outlook-layout').classList.add('compose-open'); form.querySelector('[name="to"]').focus(); return; }
    if (event.target.closest('[data-report-open-draft]')) { if(!form)return; const draft=readJson(draftKey(),{}); ['to','cc','bcc','subject'].forEach(name=>{if(form.elements[name])form.elements[name].value=draft[name]||'';}); form.querySelector('[data-rich-editor]').innerHTML=draft.bodyHtml||escape(draft.body||'').replace(/\n/g,'<br>'); area.hidden=false; form.closest('.outlook-layout').classList.add('compose-open'); return; }
    if (event.target.closest('[data-report-discard]')) { if(window.confirm('Discard this draft?')){localStorage.removeItem(draftKey());area.hidden=true;renderMailbox(panel);} return; }
    if (event.target.closest('.outlook-close')) { if(form)saveDraft(form); area.hidden=true; area.classList.remove('compose-popout','compose-fullscreen','compose-minimized'); form.closest('.outlook-layout').classList.remove('compose-open'); return; }
    if (event.target.closest('[data-report-send]')) {
      const data=draftData(form), recipients=[data.to,data.cc,data.bcc].join(';').split(/[;,\s]+/).map(value=>value.toLowerCase()).filter(Boolean), allowed=allowedEmailList();
      if(!recipients.length||recipients.some(value=>!allowed.has(value))){announce('Choose recipients matched by your teacher code.');form.querySelector('[data-internal-recipient]')?.focus();return;}
      if(!deliverEmail(data,recipients)){announce('Could not deliver internally. Check browser storage.');return;}
      clearTimeout(saveTimer);localStorage.removeItem(draftKey());announce('Message sent internally. No external email was sent.');renderMailbox(panel);return;
    }
    if (event.target.closest('[data-report-save]')) { if(form)announce(saveDraft(form)?'Draft saved on this device.':'Could not save draft.'); return; }
    if (event.target.closest('[data-report-copy]')) { if(!form)return; const data=draftData(form),text=`To: ${data.to}\nSubject: ${data.subject}\n\n${data.body}`; if(!navigator.clipboard?.writeText){announce('Clipboard is unavailable.');return;} navigator.clipboard.writeText(text).then(()=>announce('Message copied.')).catch(()=>announce('Clipboard is unavailable.')); return; }
    if (event.target.closest('[data-recipient-remove]')) { event.target.closest('[data-recipient-chip]')?.remove(); scheduleDraft(form); return; }
    if (event.target.closest('[data-report-cc]')) { form.querySelector('[data-report-cc-row]').hidden=false; form.querySelector('[data-report-cc-row] input').focus(); return; }
    if (event.target.closest('[data-report-bcc]')) { form.querySelector('[data-report-bcc-row]').hidden=false; form.querySelector('[data-report-bcc-row] input').focus(); return; }
    if (event.target.closest('[data-command]')) { document.execCommand(event.target.closest('[data-command]').dataset.command,false,null); scheduleDraft(form); return; }
    if (event.target.closest('[data-report-table]')) { const picker=form.querySelector('[data-table-picker]');picker.hidden=!picker.hidden;return; }
    const cell = event.target.closest('[data-picker-row]');
    if (cell) { const rows=Number(cell.dataset.pickerRow),cols=Number(cell.dataset.pickerColumn),table=document.createElement('table');table.style.cssText='border-collapse:collapse;width:100%;table-layout:fixed;margin:12px 0';for(let r=0;r<rows;r++){const row=table.insertRow();for(let c=0;c<cols;c++){const td=row.insertCell();td.style.cssText=`border:1px solid #d1d1d1;padding:8px;min-width:40px;width:${100/cols}%;vertical-align:top;word-wrap:break-word`;td.innerHTML='<br>';}}const editor=form.querySelector('[data-rich-editor]');editor.focus();const sel=window.getSelection();if(editorRange){sel.removeAllRanges();sel.addRange(editorRange);}const range=sel.rangeCount?sel.getRangeAt(0):null;if(range&&editor.contains(range.commonAncestorContainer)){range.insertNode(table);table.after(Object.assign(document.createElement('p'),{innerHTML:'<br>'}));}else{editor.append(table);table.after(Object.assign(document.createElement('p'),{innerHTML:'<br>'}));}const cursor=document.createRange();cursor.selectNodeContents(table.rows[0].cells[0]);cursor.collapse(true);sel.removeAllRanges();sel.addRange(cursor);form.querySelector('[data-table-picker]').hidden=true;scheduleDraft(form);return; }
  });
  document.addEventListener('selectionchange', () => { const editor=document.querySelector('[data-rich-editor]');const selection=window.getSelection();if(editor&&selection?.rangeCount&&editor.contains(selection.getRangeAt(0).commonAncestorContainer))editorRange=selection.getRangeAt(0).cloneRange(); });
  const view=document.getElementById('emailmarketing-view');
  if(view){new MutationObserver(()=>{if(!view.querySelector('#report-outlook'))mount(view);}).observe(view,{childList:true});mount(view);new MutationObserver(()=>{if(view.classList.contains('active-view')&&state.accountId!==mailboxKey()){state=mailboxFor();renderMailbox(view.querySelector('#report-outlook'));}}).observe(view,{attributes:true,attributeFilter:['class']});}
  window.addEventListener('storage',event=>{if(event.key===mailboxKey()||event.key===calendarKey()){state=mailboxFor();const outlook=view?.querySelector('#report-outlook');if(outlook&&view.classList.contains('active-view'))renderMailbox(outlook);}});
  const marketing=null; // Campaign Studio owns the separate Email Marketing view.
  const campaignKey=()=>emailKey('hireflowMarketingCampaigns:');
  const readCampaigns=()=>{const items=readJson(campaignKey(),[]);return Array.isArray(items)?items:[];};
  function renderCampaignList(){
    if(!marketing)return;
    const campaigns=readCampaigns();
    marketing.innerHTML=`<section class="marketing-workspace"><header class="marketing-header"><div><p class="eyebrow">MARKETING · EMAIL</p><h1>Email campaigns</h1><p>Create and organize marketing drafts. Campaigns are saved in this browser and are not delivered.</p></div><button class="primary-button" type="button" data-marketing-new>＋ Create email</button></header><div class="marketing-toolbar"><div><strong>Campaigns</strong><span>${campaigns.length} saved draft${campaigns.length===1?'':'s'}</span></div><span class="marketing-local-badge">LOCAL DEMO</span></div><div class="marketing-campaign-list">${campaigns.length?campaigns.map(item=>`<article class="marketing-campaign-card"><span class="marketing-campaign-icon">✉</span><div class="marketing-campaign-copy"><span class="marketing-status">Draft</span><h2>${escape(item.name||'Untitled email')}</h2><p>${escape(item.subject||'No subject')} · ${escape(item.audience||'All subscribers')}</p><small>Updated ${escape(item.updated||'just now')}</small></div><div class="marketing-campaign-actions"><button type="button" data-marketing-edit="${escape(item.id)}">Edit email</button><button type="button" class="marketing-delete" data-marketing-delete="${escape(item.id)}">Delete</button></div></article>`).join(''):'<div class="marketing-empty"><span>✉</span><h2>No emails yet</h2><p>Start a campaign to draft a marketing email.</p><button type="button" class="primary-button" data-marketing-new>Create your first email</button></div>'}</div><p class="marketing-disclaimer">Educational simulation only. No recipients are contacted and no email is sent.</p></section>`;
  }
  function openCampaign(campaign={}){
    if(!marketing)return;
    marketing.innerHTML=`<section class="marketing-workspace marketing-editor"><div class="marketing-editor-top"><button type="button" class="marketing-back" data-marketing-back>← All campaigns</button><span class="marketing-local-badge">DRAFT · NOT SENT</span></div><header class="marketing-header"><div><p class="eyebrow">EMAIL CAMPAIGN BUILDER</p><h1>${campaign.id?'Edit email':'Create an email'}</h1><p>Draft your message and review its local preview.</p></div></header><nav class="marketing-steps"><span class="current"><b>1</b> Setup</span><i></i><span class="current"><b>2</b> Content</span><i></i><span><b>3</b> Review</span></nav><form class="marketing-builder" id="marketing-campaign-form" data-campaign-id="${escape(campaign.id||'')}"><div class="marketing-compose-column"><section class="marketing-form-card"><div class="marketing-section-heading"><span>1</span><div><h2>Campaign setup</h2><p>Name your email and choose its audience.</p></div></div><label class="marketing-field">Campaign name<input name="name" required maxlength="100" value="${escape(campaign.name||'')}" placeholder="e.g. Spring update"></label><label class="marketing-field">Audience<select name="audience"><option ${!campaign.audience||campaign.audience==='All subscribers'?'selected':''}>All subscribers</option><option ${campaign.audience==='New customers'?'selected':''}>New customers</option><option ${campaign.audience==='Engaged audience'?'selected':''}>Engaged audience</option><option ${campaign.audience==='Test audience'?'selected':''}>Test audience</option></select></label></section><section class="marketing-form-card"><div class="marketing-section-heading"><span>2</span><div><h2>Email content</h2><p>Write a message and check its preview.</p></div></div><label class="marketing-field">From name<input name="senderName" required value="${escape(campaign.senderName||account().name||'')}" placeholder="Your name or organization"></label><label class="marketing-field">From email<input name="senderEmail" type="email" required value="${escape(campaign.senderEmail||account().email||'')}" placeholder="team@example.edu"></label><label class="marketing-field">Subject line<input name="subject" required value="${escape(campaign.subject||'')}" placeholder="A clear subject"></label><label class="marketing-field">Preview text<input name="preheader" value="${escape(campaign.preheader||'')}" placeholder="A short preview"></label><div class="marketing-template-row"><span>Start with a template</span><button type="button" data-marketing-template="announcement">Announcement</button><button type="button" data-marketing-template="newsletter">Newsletter</button></div><label class="marketing-field">Email message<textarea name="body" rows="10" required placeholder="Write your email...">${escape(campaign.body||'')}</textarea></label></section><div class="marketing-form-actions"><p id="marketing-save-status" role="status">Your draft stays on this device.</p><button class="primary-button" type="submit">Save draft</button></div></div><aside class="marketing-preview-card"><div class="marketing-preview-heading"><strong>Live email preview</strong><span>DESKTOP</span></div><div class="marketing-preview-envelope"><div class="marketing-preview-brand">Your brand</div><div class="marketing-preview-meta"><strong data-preview-subject>${escape(campaign.subject||'Your subject line')}</strong><span data-preview-from>${escape(campaign.senderName||account().name||'Sender')} · ${escape(campaign.senderEmail||account().email||'sender@example.edu')}</span><small data-preview-preheader>${escape(campaign.preheader||'Preview text appears here')}</small></div><div class="marketing-preview-body" data-preview-body>${escape(campaign.body||'Your message will appear here.')}</div><div class="marketing-preview-footer">You are receiving this email because you subscribed.<br><span>Unsubscribe · View in browser</span></div></div></aside></form><p class="marketing-disclaimer">Educational simulation only. Do not enter real customer data or sensitive information.</p></section>`;
    refreshPreview();
  }
  function refreshPreview(){
    const form=document.getElementById('marketing-campaign-form');if(!form)return;
    const value=name=>form.elements[name].value.trim();
    marketing.querySelector('[data-preview-subject]').textContent=value('subject')||'Your subject line';
    marketing.querySelector('[data-preview-from]').textContent=`${value('senderName')||'Sender'} · ${value('senderEmail')||'sender@example.edu'}`;
    marketing.querySelector('[data-preview-preheader]').textContent=value('preheader')||'Preview text appears here';
    marketing.querySelector('[data-preview-body]').textContent=value('body')||'Your message will appear here.';
  }
  if(marketing){
    renderCampaignList();
    marketing.addEventListener('click',event=>{
      if(event.target.closest('[data-marketing-new]')){openCampaign();return;}
      if(event.target.closest('[data-marketing-back]')){renderCampaignList();return;}
      const edit=event.target.closest('[data-marketing-edit]');if(edit){openCampaign(readCampaigns().find(item=>item.id===edit.dataset.marketingEdit)||{});return;}
      const remove=event.target.closest('[data-marketing-delete]');if(remove){writeJson(campaignKey(),readCampaigns().filter(item=>item.id!==remove.dataset.marketingDelete));renderCampaignList();return;}
      const template=event.target.closest('[data-marketing-template]');if(template){const form=document.getElementById('marketing-campaign-form');if(!form)return;if(template.dataset.marketingTemplate==='announcement'){form.elements.subject.value=form.elements.subject.value||'A quick update from our team';form.elements.preheader.value=form.elements.preheader.value||'Here is what is new this month.';form.elements.body.value=form.elements.body.value||'Hello,\\n\\nWe are excited to share an update with you.\\n\\nThank you,\\nThe Team';}else{form.elements.subject.value=form.elements.subject.value||'This month at our organization';form.elements.preheader.value=form.elements.preheader.value||'News, highlights, and useful resources.';form.elements.body.value=form.elements.body.value||'Hello,\\n\\nWelcome to this month’s newsletter.\\n\\nBest,\\nThe Team';}refreshPreview();}
    });
    marketing.addEventListener('input',event=>{if(event.target.closest('#marketing-campaign-form'))refreshPreview();});
    marketing.addEventListener('submit',event=>{if(event.target.id!=='marketing-campaign-form')return;event.preventDefault();const data=Object.fromEntries(new FormData(event.target).entries()),campaigns=readCampaigns(),campaignId=event.target.dataset.campaignId||`campaign-${id()}`,record={...data,id:campaignId,updated:new Date().toLocaleString()};const index=campaigns.findIndex(item=>item.id===campaignId);if(index<0)campaigns.unshift(record);else campaigns[index]=record;if(writeJson(campaignKey(),campaigns)){renderCampaignList();}else{const status=document.getElementById('marketing-save-status');if(status)status.textContent='Could not save in this browser.';}});
  }
})();
