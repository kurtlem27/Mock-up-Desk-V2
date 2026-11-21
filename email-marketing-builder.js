(() => {
  'use strict';

  const STORAGE_KEY = 'hireflowCampaignStudio';
  const SEGMENTS = [
    { name: 'Active Users', count: 6200 },
    { name: 'VIP Tier', count: 1450 },
    { name: 'New Subscribers', count: 3180 },
    { name: 'Recent Purchasers', count: 2740 },
    { name: 'Unsubscribed', count: 860 }
  ];
  const BLOCK_TYPES = {
    text: 'Text', image: 'Image', button: 'Button', divider: 'Divider',
    spacer: 'Spacer', social: 'Social icons', footer: 'Footer / Unsubscribe'
  };
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const makeId = () => `campaign-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const storageAccount = () => localStorage.getItem('hireflowStudentSession') || 'local';
  const storageKey = () => `${STORAGE_KEY}:${storageAccount()}`;
  const studioAccount = () => {
    try {
      const accounts = JSON.parse(localStorage.getItem('hireflowStudentAccounts') || '[]');
      return accounts.find(item => item.email === storageAccount()) || {};
    } catch (_) { return {}; }
  };
  const safeUrl = value => /^(https?:\/\/|mailto:|tel:|\{\{\s*unsubscribe_url\s*\}\})/i.test(String(value || '').trim()) ? String(value).trim() : '';
  const safeImageUrl = value => /^(https?:\/\/|data:image\/svg\+xml(?:;charset=[^;,]+)?(?:;base64)?,|data:image\/(?:png|gif|jpe?g|webp|avif);base64,)/i.test(String(value || '').trim()) ? String(value).trim() : '';
  const STOCK_IMAGES = ['Sunlit workspace','Abstract color study','Botanical leaves','Coastal horizon','Mountain morning','Fresh citrus','City architecture','Soft paper shapes','Desert landscape','Wildflower field','Coffee and notebook','Ocean blue','Warm terracotta','Studio still life','Forest canopy','Cloudscape','Geometric pastel','Modern vase','Golden hour','Minimal product scene'];
  const SOCIAL_STOCK = [{name:'Instagram',url:'https://instagram.com',mark:'◎',color:'#d83d83'},{name:'LinkedIn',url:'https://linkedin.com',mark:'in',color:'#0a66c2'},{name:'Facebook',url:'https://facebook.com',mark:'f',color:'#1877f2'},{name:'X',url:'https://x.com',mark:'𝕏',color:'#171717'},{name:'YouTube',url:'https://youtube.com',mark:'▶',color:'#e62117'},{name:'TikTok',url:'https://tiktok.com',mark:'♪',color:'#111111'},{name:'Pinterest',url:'https://pinterest.com',mark:'p',color:'#bd081c'},{name:'WhatsApp',url:'https://whatsapp.com',mark:'◔',color:'#25a85a'}];
  function stockImageUrl(name, index) {
    const colors = [['#ff9ec4','#ffd38c'],['#8d85e9','#e5a8db'],['#2f987e','#c8e76a'],['#30abc1','#7d9fed'],['#826bce','#f4b57b'],['#f28a52','#f7d962'],['#515d7c','#d69bbd'],['#f2a6c6','#a6d7d3'],['#cb825a','#f5c477'],['#89b88a','#e8a2b8']][index % 10];
    const xmlText = String(name).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[char]));
    const shapes = `<circle cx="500" cy="100" r="110" fill="${colors[1]}" opacity=".72"/><path d="M0 330 Q160 220 320 330 T640 300 V420 H0Z" fill="${colors[0]}" opacity=".75"/><path d="M110 260 Q180 90 255 260 M205 270 Q275 80 340 270" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round" opacity=".8"/>`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420" viewBox="0 0 640 420"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${colors[0]}"/><stop offset="1" stop-color="${colors[1]}"/></linearGradient></defs><rect width="640" height="420" fill="url(#g)"/>${shapes}<rect x="28" y="28" width="584" height="364" rx="28" fill="none" stroke="#ffffff" stroke-opacity=".5" stroke-width="2"/><text x="36" y="370" fill="#ffffff" font-family="Arial,sans-serif" font-size="22" font-weight="700">${xmlText}</text></svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }
  const localDateTime = date => { const adjusted = new Date(date.getTime() - date.getTimezoneOffset() * 60000); return adjusted.toISOString().slice(0, 16); };
  function suggestedSchedule() {
    const date = new Date();
    date.setHours(10, 0, 0, 0);
    if (date <= new Date()) date.setDate(date.getDate() + 1);
    while ([0, 6].includes(date.getDay())) date.setDate(date.getDate() + 1);
    return localDateTime(date);
  }
  const colorValue = (value, fallback) => /^#[0-9a-f]{6}$/i.test(String(value || '')) ? value : fallback;
  const paddingValue = value => /^(\d+(px|%|em|rem)?\s*){1,4}$/i.test(String(value || '')) ? value : '12px';

  function readCampaigns() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey()) || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch (_) { return []; }
  }
  function writeCampaigns(items) {
    try { localStorage.setItem(storageKey(), JSON.stringify(items)); return true; }
    catch (_) { return false; }
  }
  function newBlock(type) {
    const content = {
      text: { text: 'Write your email message here.' },
      image: { url: '', alt: 'Describe your image' },
      button: { text: 'Learn more', url: 'https://example.com' },
      divider: {}, spacer: {},
      social: { text: 'Instagram  |  https://instagram.com\nLinkedIn  |  https://linkedin.com' },
      footer: { text: 'You are receiving this email because you subscribed to updates.', url: '{{ unsubscribe_url }}' }
    };
    return { id: makeId(), type: BLOCK_TYPES[type] ? type : 'text', content: content[type], style: { color: '#293449', background: '#ffffff', padding: '12px', align: 'left', radius: 6, width: 100, height: type === 'image' ? 180 : 36 } };
  }
  function newCampaign() {
    const sender = studioAccount();
    return {
      id: makeId(), name: '', subject: '', preheader: '', fromName: sender.name || '', fromEmail: sender.email || '', replyTo: '',
      audienceMode: 'subscribed', include: [], exclude: [], logic: 'OR', testUsers: '',
      scheduleMode: 'now', scheduleAt: '', optimizeTimezone: false, sendHour: '09:00',
      utm: false, bypassCap: false, senderVerified: false,
      emailBackground: '#f3f4f6', internalRecipients: [],
      blocks: [newBlock('text'), newBlock('footer')], status: 'Draft', updated: new Date().toISOString()
    };
  }
  function recipientEstimate(campaign) {
    if (Array.isArray(campaign.internalRecipients)) return campaign.internalRecipients.length;
    if (campaign.audienceMode === 'test') return campaign.testUsers.trim() ? campaign.testUsers.split(/[;,\s]+/).filter(Boolean).length : 5;
    if (campaign.audienceMode !== 'segments' || !campaign.include.length) return 14820;
    const picked = campaign.include.map(name => SEGMENTS.find(segment => segment.name === name)).filter(Boolean);
    const included = campaign.logic === 'AND' ? Math.min(...picked.map(segment => segment.count)) : Math.min(14820, picked.reduce((sum, segment) => sum + segment.count, 0));
    const excluded = campaign.exclude.reduce((sum, name) => {
      const segment = SEGMENTS.find(item => item.name === name);
      return sum + (segment ? segment.count : 0);
    }, 0);
    return Math.max(0, included - Math.min(included, excluded));
  }
  function matchedInternalRecipients(campaign) {
    try {
      const accounts = JSON.parse(localStorage.getItem('hireflowStudentAccounts') || '[]');
      const senderEmail = localStorage.getItem('hireflowStudentSession') || '';
      const sender = accounts.find(item => item.email === senderEmail);
      const code = String(sender && sender.teacherCode || '').trim().toUpperCase();
      if (!code || !sender || !['student', 'teacher'].includes(sender.role)) return [];
      return accounts.filter(item => item.email !== senderEmail &&
        String(item.teacherCode || '').trim().toUpperCase() === code &&
        ['student', 'teacher'].includes(item.role))
        .sort((a, b) => (a.name || a.email).localeCompare(b.name || b.email));
    } catch (_) { return []; }
  }
  function recipientSummaryMarkup() {
    const people = matchedInternalRecipients(current);
    const selected = new Set(current.internalRecipients || []);
    const names = people.filter(person => selected.has(person.email)).map(person => person.name || person.email);
    return `<strong>${selected.size} recipient${selected.size === 1 ? '' : 's'} selected</strong><span>${names.length ? esc(names.join(', ')) : 'Click to choose teachers and students with your teacher code.'}</span>`;
  }
  function refreshRecipientSummary() {
    const summary = app && app.querySelector('.studio-recipient-summary');
    if (summary) summary.innerHTML = recipientSummaryMarkup();
  }
  function recipientPickerMarkup() {
    const people = matchedInternalRecipients(current);
    const selected = new Set(current.internalRecipients || []);
    const allSelected = people.length > 0 && people.every(person => selected.has(person.email));
    return `<p class="studio-kicker">CAMPAIGN RECIPIENTS</p><h2 id="studio-modal-title">Choose internal recipients</h2><p>Only the teacher and students sharing your teacher code are listed. Clicking a name adds or removes them from this campaign.</p><div class="studio-recipient-picker-toolbar"><strong>${selected.size} of ${people.length} selected</strong><button type="button" class="studio-secondary" data-select-all-recipients>${allSelected ? 'Clear all' : 'Select all'}</button></div><div class="studio-recipient-picker-list">${people.length ? people.map(person => `<label class="studio-recipient-option"><input type="checkbox" data-recipient-choice value="${esc(person.email)}" ${selected.has(person.email) ? 'checked' : ''}><span><strong>${esc(person.name || person.email)}</strong><small>${person.role === 'teacher' ? 'Teacher' : 'Student'} · ${esc(person.email)}</small></span></label>`).join('') : '<p class="studio-recipient-empty">No other teacher or student accounts with this teacher code are available.</p>'}</div>`;
  }
  function showRecipientPicker() { openModal(recipientPickerMarkup(), 'recipients'); }
  function refreshRecipientPicker() {
    const modal = app && app.querySelector('.studio-modal[data-modal-kind="recipients"]');
    if (modal) modal.innerHTML = `<section role="dialog" aria-modal="true" aria-labelledby="studio-modal-title"><button type="button" class="studio-modal-close" data-close-modal aria-label="Close">×</button>${recipientPickerMarkup()}</section>`;
  }
  function updateRecipients(emails) {
    current.internalRecipients = [...new Set(emails)];
    saveCurrent();
    refreshRecipientSummary();
    refreshRecipientPicker();
    const estimate = app && app.querySelector('[data-recipient-estimate]');
    if (estimate) estimate.textContent = current.internalRecipients.length.toLocaleString();
  }
  
  function compileCampaign(campaign) {
    const align = value => ['left', 'center', 'right'].includes(value) ? value : 'left';
    const appendUtm = value => {
      const safe = safeUrl(value);
      if (!safe || !campaign.utm || !/^https?:\/\//i.test(safe)) return safe || '#';
      const join = safe.indexOf('?') >= 0 ? '&' : '?';
      return `${safe}${join}utm_source=email&utm_medium=campaign&utm_campaign=${encodeURIComponent(campaign.name || 'campaign')}`;
    };
    const blocks = campaign.blocks.map(block => {
      const content = block.content || {}, style = block.style || {};
      const padding = esc(paddingValue(style.padding));
      const color = colorValue(style.color, '#293449');
      const textAlign = align(style.align);
      if (block.type === 'text') return `<div style="padding:${padding};font:15px/1.65 Arial,sans-serif;color:${color};text-align:${textAlign};white-space:pre-wrap">${esc(content.text || '')}</div>`;
      if (block.type === 'image') {
        const url = safeImageUrl(content.url);
        const width = Math.max(10, Math.min(100, Number(style.width) || 100));
        return url ? `<div style="padding:${padding};text-align:${textAlign}"><img src="${esc(url)}" alt="${esc(content.alt || '')}" style="display:block;width:${width}%;max-width:100%;height:auto;border:0"></div>` : `<div style="padding:${padding};color:#667085;text-align:${textAlign}">[Image: ${esc(content.alt || 'Add an image URL')}]</div>`;
      }
      if (block.type === 'button') return `<div style="padding:${padding};text-align:${textAlign}"><a href="${esc(appendUtm(content.url))}" style="display:inline-block;padding:12px 22px;border-radius:${Math.max(0, Math.min(40, Number(style.radius) || 0))}px;background:${colorValue(style.background, '#4346e5')};color:#fff;text-decoration:none;font:700 14px Arial,sans-serif">${esc(content.text || 'Learn more')}</a></div>`;
      if (block.type === 'divider') return `<div style="padding:${padding}"><hr style="border:0;border-top:1px solid ${colorValue(style.color, '#d9dee8')}"></div>`;
      if (block.type === 'spacer') return `<div style="height:${Math.max(8, Math.min(160, Number(style.height) || 36))}px;line-height:${Math.max(8, Math.min(160, Number(style.height) || 36))}px;font-size:1px">&nbsp;</div>`;
      if (block.type === 'social') {
        const links = String(content.text || '').split('\n').map(line => line.split('|')).filter(parts => parts.length > 1);
        return `<div style="padding:${padding};text-align:${textAlign};font:13px Arial,sans-serif">${links.map(parts => { const item = SOCIAL_STOCK.find(social => social.name.toLowerCase() === parts[0].trim().toLowerCase()); return `<a href="${esc(appendUtm(parts[1].trim()))}" aria-label="${esc(parts[0].trim())}" style="display:inline-block;width:30px;height:30px;line-height:30px;border-radius:50%;background:${item ? item.color : '#6652d9'};color:#fff;text-align:center;text-decoration:none;margin:0 5px;font:bold 12px Arial,sans-serif">${esc(item ? item.mark : parts[0].trim().slice(0, 2))}</a>`; }).join('')}</div>`;
      }
      if (block.type === 'footer') return `<div style="padding:${padding};text-align:center;font:12px/1.6 Arial,sans-serif;color:#667085">${esc(content.text || '')}<br><a href="${esc(content.url || '{{ unsubscribe_url }}')}" style="color:#4346e5">Unsubscribe</a></div>`;
      return '';
    }).join('');
    const emailBackground = colorValue(campaign.emailBackground, '#f3f4f6');
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(campaign.subject)}</title></head><body style="margin:0;background:${emailBackground}"><div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(campaign.preheader)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${emailBackground}"><tr><td align="center" style="padding:24px 10px"><table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#fff;font-family:Arial,sans-serif"><tr><td>${blocks}</td></tr></table></td></tr></table></body></html>`;
  }

  let view = document.getElementById('marketing-view');
  let app = null;
  let campaigns = [];
  let current = null;
  let selectedBlockId = '';
  let draggedBlockId = '';
  let toastTimer = 0;

  function saveCurrent() {
    if (!current) return;
    current.updated = new Date().toISOString();
    const index = campaigns.findIndex(item => item.id === current.id);
    if (index < 0) campaigns.unshift(current);
    else campaigns[index] = current;
    writeCampaigns(campaigns);
    const status = app && app.querySelector('[data-save-status]');
    if (status) status.textContent = 'Saved on this device';
  }
  function showToast(message) {
    const node = app && app.querySelector('[data-studio-toast]');
    if (!node) return;
    node.textContent = message;
    node.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { if (node) node.hidden = true; }, 2800);
  }
  function blockCanvasMarkup(block) {
    const content = block.content || {};
    const selected = block.id === selectedBlockId ? ' selected' : '';
    let body = '';
    if (block.type === 'text') body = `<label class="studio-inline-label">Email text<textarea data-block-edit="text" data-block-id="${esc(block.id)}" rows="3">${esc(content.text || '')}</textarea></label>`;
    if (block.type === 'image') {
      const imageWidth = Math.max(10, Math.min(100, Number(block.style.width) || 100));
      const imageHeight = Math.max(40, Math.min(500, Number(block.style.height) || 180));
      const imageUrl = safeImageUrl(content.url);
      const resizeHandles = ['n','ne','e','se','s','sw','w','nw'].map(edge => `<button type="button" data-image-resize="${edge}" aria-label="Resize image from ${edge}"></button>`).join('');
      body = `<div class="studio-image-placeholder" data-open-image-gallery role="button" tabindex="0" aria-label="Choose or change image">${imageUrl ? `<div class="studio-image-resize-frame" data-image-resize-frame style="width:${imageWidth}%;height:${imageHeight}px"><img src="${esc(imageUrl)}" alt="${esc(content.alt || '')}">${resizeHandles}</div>` : '<span>▧ Click here to choose an image</span>'}</div><label class="studio-inline-label">Image URL<input data-block-edit="url" data-block-id="${esc(block.id)}" value="${esc(content.url || '')}" placeholder="https://..."></label><label class="studio-inline-label">Alt text<input data-block-edit="alt" data-block-id="${esc(block.id)}" value="${esc(content.alt || '')}"></label>`;
    }
    if (block.type === 'button') body = `<div class="studio-button-sample" style="text-align:${esc(block.style.align)}"><span>${esc(content.text || 'Learn more')}</span></div><label class="studio-inline-label">Button text<input data-block-edit="text" data-block-id="${esc(block.id)}" value="${esc(content.text || '')}"></label><label class="studio-inline-label">Destination URL<input data-block-edit="url" data-block-id="${esc(block.id)}" value="${esc(content.url || '')}" placeholder="https://..."></label>`;
    if (block.type === 'divider') body = '<hr class="studio-divider-sample">';
    if (block.type === 'spacer') body = `<div class="studio-spacer-sample" style="height:${Math.max(8, Math.min(160, Number(block.style.height) || 36))}px">Spacer</div>`;
    if (block.type === 'social') {
      const picked = String(content.text || '').split('\n').map(line => line.split('|')[0].trim()).filter(Boolean);
      body = `<div class="studio-social-stock">${SOCIAL_STOCK.map(item => `<button type="button" data-social-add="${esc(item.name)}" data-block-id="${esc(block.id)}" title="Add ${esc(item.name)}"><b style="background:${item.color}">${esc(item.mark)}</b>${esc(item.name)}</button>`).join('')}</div><div class="studio-social-selected">${picked.map(label => `<span>${esc(label)}</span>`).join('') || '<span>Select social icons to add them</span>'}</div><label class="studio-inline-label">Social profile URLs · edit one per line, label | URL<textarea data-block-edit="text" data-block-id="${esc(block.id)}" rows="3">${esc(content.text || '')}</textarea></label>`;
    }
    if (block.type === 'footer') body = `<label class="studio-inline-label">Footer copy<textarea data-block-edit="text" data-block-id="${esc(block.id)}" rows="2">${esc(content.text || '')}</textarea></label><label class="studio-inline-label">Unsubscribe URL<input data-block-edit="url" data-block-id="${esc(block.id)}" value="${esc(content.url || '')}" placeholder="{{ unsubscribe_url }}"></label>`;
    return `<article class="studio-block${selected}" draggable="true" data-canvas-block="${esc(block.id)}" style="text-align:${esc(block.style.align)};padding:${esc(paddingValue(block.style.padding))};color:${esc(colorValue(block.style.color, '#293449'))}"><div class="studio-block-head"><span>⠿ ${esc(BLOCK_TYPES[block.type])}</span><button type="button" data-select-block="${esc(block.id)}" aria-label="Select block properties">⚙</button><button type="button" data-remove-block="${esc(block.id)}" aria-label="Remove block">×</button></div>${body}</article>`;
  }
  function inspectorMarkup() {
    const block = current.blocks.find(item => item.id === selectedBlockId);
    if (!block) return '<div class="studio-inspector-empty"><span>⚙</span><strong>Block properties</strong><p>Select a block on the canvas to customize it.</p></div>';
    const style = block.style || {};
    let fields = `<label>Text color<input type="color" data-style-edit="color" value="${esc(colorValue(style.color, '#293449'))}"></label><label>Padding<input type="text" data-style-edit="padding" value="${esc(paddingValue(style.padding))}" placeholder="12px"></label><label>Alignment<select data-style-edit="align"><option value="left" ${style.align === 'left' ? 'selected' : ''}>Left</option><option value="center" ${style.align === 'center' ? 'selected' : ''}>Center</option><option value="right" ${style.align === 'right' ? 'selected' : ''}>Right</option></select></label>`;
    if (block.type === 'button') fields += `<label>Button color<input type="color" data-style-edit="background" value="${esc(colorValue(style.background, '#4346e5'))}"></label><label>Border radius<input type="number" min="0" max="40" data-style-edit="radius" value="${Math.max(0, Math.min(40, Number(style.radius) || 0))}"></label>`;
    if (block.type === 'image') fields += `<label>Image width · <span data-style-value="width">${Math.max(10, Math.min(100, Number(style.width) || 100))}%</span><input type="range" min="10" max="100" step="1" data-style-edit="width" value="${Math.max(10, Math.min(100, Number(style.width) || 100))}"></label><label>Image height · <span data-style-value="height">${Math.max(40, Math.min(500, Number(style.height) || 180))} px</span><input type="range" min="40" max="500" step="5" data-style-edit="height" value="${Math.max(40, Math.min(500, Number(style.height) || 180))}"></label>`;
    if (block.type === 'spacer') fields += `<label>Height<input type="range" min="8" max="160" step="4" data-style-edit="height" value="${Math.max(8, Math.min(160, Number(style.height) || 36))}"></label>`;
    return `<div class="studio-inspector-title"><small>SELECTED BLOCK</small><h3>${esc(BLOCK_TYPES[block.type])}</h3></div>${fields}<p class="studio-help">Block content and style changes save automatically.</p>`;
  }
  function refreshThumbnail() {
    const frame = app && app.querySelector('[data-email-thumbnail]');
    if (frame) frame.srcdoc = compileCampaign(current);
  }
  function renderCanvas() {
    const canvas = app.querySelector('[data-email-canvas]');
    if (!canvas) return;
    canvas.style.backgroundColor = colorValue(current.emailBackground, '#f3f4f6');
    canvas.innerHTML = current.blocks.map(blockCanvasMarkup).join('') || '<div class="studio-canvas-empty">Drag a block here to start your email.</div>';
    const inspector = app.querySelector('[data-email-inspector]');
    if (inspector) inspector.innerHTML = inspectorMarkup();
    refreshThumbnail();
  }
  function segmentChecks(kind, chosen) {
    return SEGMENTS.map(segment => `<label class="studio-segment"><input type="checkbox" data-segment="${kind}" value="${esc(segment.name)}" ${chosen.includes(segment.name) ? 'checked' : ''}><span>${esc(segment.name)}</span><small>${segment.count.toLocaleString()}</small></label>`).join('');
  }
  function renderList() {
    campaigns = readCampaigns();
    const rows = campaigns.map(item => `<article class="studio-campaign-card"><div class="studio-campaign-open" data-open-campaign="${esc(item.id)}" role="button" tabindex="0" aria-label="Open campaign ${esc(item.name || 'Untitled campaign')}"><div class="studio-campaign-icon">✉</div><div class="studio-campaign-copy"><span class="studio-status ${item.status === 'Sent' ? 'sent' : item.status === 'Scheduled' ? 'scheduled' : ''}">${esc(item.status || 'Draft')}</span><h2>${esc(item.name || 'Untitled campaign')}</h2><p>${esc(item.subject || 'No subject')} · ${Number(item.internalRecipients?.length || 0).toLocaleString()} matched recipients</p><small>${item.report ? `Sent ${esc(new Date(item.report.sentAt).toLocaleString())} · ${Number(item.report.sent).toLocaleString()} internal recipients` : item.status === 'Scheduled' ? `Scheduled for ${esc(new Date(item.scheduledAt).toLocaleString())}` : `Updated ${esc(new Date(item.updated || Date.now()).toLocaleString())}`}
</small></div></div><div class="studio-card-actions"><button type="button" class="studio-delete" data-delete-campaign="${esc(item.id)}">Delete</button></div></article>`).join('');
    app.innerHTML = `<section class="campaign-studio"><header class="studio-header"><div><p class="studio-kicker">EMAIL MARKETING · CAMPAIGNS</p><h1>Campaign studio</h1><p>Build, review, and report on email campaigns. Everything stays in this browser demo.</p></div><button class="studio-primary" type="button" data-new-campaign>＋ Create campaign</button></header><div class="studio-list-toolbar"><strong>Your campaigns</strong><span>${campaigns.length} campaign${campaigns.length === 1 ? '' : 's'}</span><b>LOCAL DEMO</b></div><div class="studio-campaign-list">${rows || '<div class="studio-empty"><span>✉</span><h2>No campaigns yet</h2><p>Create a campaign to begin with audience setup and email design.</p><button class="studio-primary" type="button" data-new-campaign>Create your first campaign</button></div>'}</div><p class="studio-disclaimer">Internal email copies stay in this browser’s Report Messaging inboxes. No external email is sent.</p><div class="studio-toast" data-studio-toast role="status" hidden></div></section>`;
  }
  function editorMarkup() {
    const estimate = recipientEstimate(current);
    const include = current.include || [], exclude = current.exclude || [];
    return `<section class="campaign-studio studio-editor"><header class="studio-header studio-editor-header"><div><button type="button" class="studio-back" data-back-list>← Campaigns</button><p class="studio-kicker">CAMPAIGN WORKFLOW</p><h1>${esc(current.name || 'New campaign')}</h1><p><span data-save-status>Changes save on this device</span> · draft is not delivered</p></div><button class="studio-secondary" type="button" data-save-campaign>Save draft</button></header>
             <section class="studio-step"><div class="studio-step-heading"><span>1</span><div><h2>Campaign setup &amp; recipients</h2><p>Choose the matched teacher or students who will receive this internal email.</p></div></div><div class="studio-form-grid"><label>Internal campaign name<input data-field="name" maxlength="100" value="${esc(current.name)}" placeholder="e.g. Nov_2026_Onboarding_Day1"></label></div>
       <button type="button" class="studio-internal-recipients" data-open-recipients aria-haspopup="dialog"><span class="studio-recipient-heading"><strong>Internal recipients · same teacher code</strong><span>Choose matched teachers and students</span></span><span class="studio-recipient-summary">${recipientSummaryMarkup()}</span><span class="studio-recipient-action">Manage recipients <b aria-hidden="true">→</b></span></button><div class="studio-estimate"><span>Selected internal recipients</span><strong data-recipient-estimate>${estimate.toLocaleString()}</strong><small>Email is delivered to these matched accounts in Email</small></div></section>
      <section class="studio-step"><div class="studio-step-heading"><span>2</span><div><h2>Message &amp; email design</h2><p>Set your sender details, then build a responsive 600px email.</p></div></div><div class="studio-form-grid"><label>Subject line<input data-field="subject" maxlength="150" value="${esc(current.subject)}" placeholder="Welcome aboard, {{ first_name }}!"></label><label>Preheader<input data-field="preheader" maxlength="180" value="${esc(current.preheader)}" placeholder="Preview text shown in inboxes"></label><label>From name<input data-field="fromName" maxlength="100" value="${esc(current.fromName)}" placeholder="Acme Support"></label><label>From email address<input data-field="fromEmail" type="email" value="${esc(current.fromEmail)}" readonly></label><label>Reply-to address <span class="studio-optional">optional</span><input data-field="replyTo" type="email" value="${esc(current.replyTo)}" placeholder="support@example.com"></label></div><p class="studio-help">Internal emails use the signed-in account address and are stored only in matched Report Messaging inboxes.</p>
            <div class="studio-builder-heading"><div><h3>Drag-and-drop email canvas</h3><p>Choose a block or drag it onto the canvas. Select a block to edit its properties.</p></div><div class="studio-viewport"><button type="button" class="active" data-viewport="desktop">Desktop</button><button type="button" data-viewport="mobile">Mobile</button></div></div><label class="studio-email-background">Email background color<input type="color" data-field="emailBackground" value="${esc(colorValue(current.emailBackground, '#f3f4f6'))}"><span>Changes preview live as you adjust the picker.</span></label><div class="studio-builder">
<aside class="studio-palette"><strong>Content blocks</strong><p>Click to add or drag</p>${Object.keys(BLOCK_TYPES).map(type => `<button type="button" draggable="true" data-block-tool="${type}"><span>${esc(BLOCK_TYPES[type])}</span><b>＋</b></button>`).join('')}</aside><div class="studio-canvas-area"><div class="studio-canvas-label"><strong>Email canvas</strong><span data-canvas-width>600 px</span></div><div class="studio-canvas-wrap"><div class="studio-canvas" data-email-canvas>${current.blocks.map(blockCanvasMarkup).join('')}</div></div></div><aside class="studio-inspector" data-email-inspector>${inspectorMarkup()}</aside></div><details class="studio-thumbnail"><summary>Live desktop/mobile thumbnail</summary><iframe data-email-thumbnail title="Campaign thumbnail preview" sandbox="allow-same-origin"></iframe></details></section>
             <section class="studio-step"><div class="studio-step-heading"><span>3</span><div><h2>Delivery method</h2><p>Send internally now, use the suggested weekday time, or choose a date and time yourself.</p></div></div><div class="studio-delivery-settings"><label>Delivery option<select data-field="scheduleMode"><option value="now" ${current.scheduleMode === 'now' ? 'selected' : ''}>Send immediately</option><option value="suggested" ${current.scheduleMode === 'suggested' ? 'selected' : ''}>Schedule at suggested time</option><option value="manual" ${current.scheduleMode === 'manual' ? 'selected' : ''}>Set date and time</option></select></label><div class="studio-schedule-detail" data-schedule-time ${current.scheduleMode === 'now' ? 'hidden' : ''}><label>${current.scheduleMode === 'suggested' ? 'Suggested send time' : 'Choose send date and time'}<input type="datetime-local" data-field="scheduleAt" min="${localDateTime(new Date())}" value="${esc(current.scheduleAt || (current.scheduleMode === 'suggested' ? suggestedSchedule() : ''))}" ${current.scheduleMode === 'suggested' ? 'readonly' : ''}></label><small class="studio-schedule-recommendation" data-schedule-suggestion ${current.scheduleMode === 'suggested' ? '' : 'hidden'}>Suggested for the next available weekday at 10:00 AM local time. You can switch to manual scheduling to choose another time.</small></div><p class="studio-delivery-note">Scheduled delivery is browser-local and will be processed while this workspace is open. No external email service is connected; messages go only to selected teacher-code matched inboxes.</p></div></section>
      <details class="studio-step studio-advanced"><summary><span>4</span><span><strong>Advanced settings &amp; attribution</strong><small>UTM tracking and frequency cap override</small></span></summary><div class="studio-advanced-fields"><label class="studio-verified"><input type="checkbox" data-field="utm" ${current.utm ? 'checked' : ''}> Append UTM parameters to tracked links</label><label class="studio-verified"><input type="checkbox" data-field="bypassCap" ${current.bypassCap ? 'checked' : ''}> Bypass daily / weekly frequency cap for this campaign</label></div></details>
      <footer class="studio-editor-footer"><span>Save and review before immediate internal delivery.</span><div><button type="button" class="studio-secondary" data-preview>Preview email</button><button type="button" class="studio-primary" data-review>Review &amp; send</button></div></footer><div class="studio-toast" data-studio-toast role="status" hidden></div></section>`;
  }
  function renderReport() {
    const report = current.report || {};
    const metrics = [['Sent', report.sent], ['Delivered', report.delivered], ['Opened', report.opened], ['Clicked', report.clicked], ['Bounced', report.bounced], ['Unsubscribed', report.unsubscribed]];
    const total = Math.max(1, Number(report.sent) || 1);
    const html = compileCampaign(current);
    app.innerHTML = `<section class="campaign-studio studio-report"><header class="studio-header"><div><button type="button" class="studio-back" data-back-list>← Campaigns</button><p class="studio-kicker">CAMPAIGN REPORT · INTERNAL DELIVERY</p><h1>${esc(current.name || 'Email campaign')}</h1><p>${esc(current.subject || 'No subject')} · Delivered through Report Messaging in this browser</p></div><button type="button" class="studio-secondary" data-edit-reported>Edit campaign</button></header><div class="studio-report-summary"><span class="studio-status sent">INTERNAL EMAIL SENT</span><strong>${new Date(report.sentAt || Date.now()).toLocaleString()}</strong><small>Delivered to ${Number(report.delivered ?? report.sent ?? 0).toLocaleString()} teacher-code matched inbox${Number(report.delivered ?? report.sent ?? 0) === 1 ? '' : 'es'}</small></div><div class="studio-metrics">${metrics.map(([label, value]) => `<article><span>${label}</span><strong>${Number(value || 0).toLocaleString()}</strong><div><i style="width:${Math.min(100, Math.round(Number(value || 0) / total * 100))}%"></i></div><small>${label === 'Sent' ? 'Internal delivery count' : 'Not tracked'}</small></article>`).join('')}</div><div class="studio-report-grid"><section class="studio-engagement"><h2>Engagement breakdown</h2><p>Open and click tracking is not connected to browser-local inboxes.</p><div><span>Opened</span><b>${Math.round(Number(report.opened || 0) / total * 100)}%</b></div><div><span>Clicked</span><b>${Math.round(Number(report.clicked || 0) / total * 100)}%</b></div><div><span>Bounced</span><b>${Math.round(Number(report.bounced || 0) / total * 100)}%</b></div><div><span>Unsubscribed</span><b>${Math.round(Number(report.unsubscribed || 0) / total * 100)}%</b></div></section><section class="studio-report-preview"><h2>HTML preview</h2><iframe title="Sent campaign HTML preview" sandbox="allow-same-origin" srcdoc="${esc(html)}"></iframe></section></div><p class="studio-disclaimer">Delivery counts reflect browser-local inbox copies. Open and click tracking is not connected.</p><div class="studio-toast" data-studio-toast role="status" hidden></div></section>`;
  }
  function showList() { current = null; selectedBlockId = ''; renderList(); }
  function showEditor(campaign) { const sender = studioAccount(); current = campaign; current.internalRecipients ||= []; current.emailBackground ||= '#f3f4f6'; current.fromName ||= sender.name || ''; current.fromEmail ||= sender.email || ''; current.scheduleMode ||= 'now'; current.scheduleAt ||= current.scheduleMode === 'suggested' ? suggestedSchedule() : ''; current.blocks ||= []; selectedBlockId = current.blocks.length ? current.blocks[0].id : ''; app.innerHTML = editorMarkup(); renderCanvas(); }
  function showStockGallery() {
    const block = current && current.blocks.find(item => item.id === selectedBlockId && item.type === 'image');
    if (!block) return;
    const cards = STOCK_IMAGES.map((name, index) => `<button type="button" class="studio-stock-image" data-stock-image="${index}"><img src="${esc(stockImageUrl(name, index))}" alt="${esc(name)} stock artwork"><span>${esc(name)}</span></button>`).join('');
    openModal(`<p class="studio-kicker">STOCK IMAGE GALLERY</p><h2 id="studio-modal-title">Choose an image</h2><p>20 built-in, browser-local illustrations. Select one, then resize it directly on the canvas.</p><div class="studio-stock-gallery">${cards}</div>`, 'stock-images');
  }
  function openModal(content, kind) {
    const old = app.querySelector('.studio-modal');
    if (old) old.remove();
    const modal = document.createElement('div');
    modal.className = 'studio-modal'; modal.dataset.modalKind = kind;
    modal.innerHTML = `<section role="dialog" aria-modal="true" aria-labelledby="studio-modal-title"><button type="button" class="studio-modal-close" data-close-modal aria-label="Close">×</button>${content}</section>`;
    const owner = app.querySelector('.campaign-studio') || app;
    owner.append(modal);
  }
  function validationErrors() {
    const errors = [];
    if (current.scheduleMode !== 'now' && (!current.scheduleAt || new Date(current.scheduleAt).getTime() <= Date.now())) errors.push('Choose a future date and time for scheduled delivery.');
    if (!current.name.trim()) errors.push('Add an internal campaign name.');
    if (!current.subject.trim()) errors.push('Add a subject line.');
    if (!current.fromName.trim()) errors.push('Add a sender name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(current.fromEmail.trim())) errors.push('Enter a valid sender email address.');
    if (!Array.isArray(current.internalRecipients) || current.internalRecipients.length === 0) errors.push('Select at least one teacher or student matched by your teacher code.');
    const footer = current.blocks.find(block => block.type === 'footer');
    if (!footer || !safeUrl(footer.content.url)) errors.push('Add a footer block with a valid unsubscribe link.');
    return errors;
  }
  function showReview() {
    saveCurrent();
    const errors = validationErrors();
    const isScheduled = current.scheduleMode !== 'now';
    const delivery = isScheduled ? `Scheduled · ${new Date(current.scheduleAt).toLocaleString()}` : 'Immediately';
    const checks = errors.length ? `<div class="studio-validation-error"><strong>Complete these checks before continuing:</strong><ul>${errors.map(error => `<li>${esc(error)}</li>`).join('')}</ul></div>` : '<div class="studio-validation-success">Pre-flight checks passed. Confirm to deliver this design to selected matched inboxes.</div>';
    openModal(`<p class="studio-kicker">FINAL PRE-FLIGHT CHECK</p><h2 id="studio-modal-title">Review internal email</h2><p>Confirm the recipients and design. Delivery is limited to matched accounts in this browser; no external email is sent.</p>${checks}<dl class="studio-review-summary"><dt>Campaign</dt><dd>${esc(current.name || 'Untitled')}</dd><dt>Subject</dt><dd>${esc(current.subject || 'No subject')}</dd><dt>Sender</dt><dd>${esc(current.fromName)} &lt;${esc(current.fromEmail)}&gt;</dd><dt>Recipients</dt><dd>${(current.internalRecipients || []).length.toLocaleString()} matched accounts</dd><dt>Delivery</dt><dd>${esc(delivery)}</dd></dl><button type="button" class="studio-primary" data-simulate-send ${errors.length ? 'disabled' : ''}>${isScheduled ? 'Schedule internal delivery' : 'Send internally now'}</button><small class="studio-modal-note">Scheduled messages process while this workspace is open.</small>`, 'review');
  }
  function showPreview() {
    const html = compileCampaign(current);
    openModal(`<p class="studio-kicker">CAMPAIGN PREVIEW</p><h2 id="studio-modal-title">${esc(current.subject || 'Email preview')}</h2><p>${esc(current.preheader || '')}</p><iframe class="studio-large-preview" title="Compiled email preview" sandbox="allow-same-origin" srcdoc="${esc(html)}"></iframe><details><summary>View compiled HTML</summary><textarea readonly rows="10">${esc(html)}</textarea></details>`, 'preview');
  }
  function simulateSend() {
    if (current.scheduleMode !== 'now') {
      current.status = 'Scheduled';
      current.scheduledAt = new Date(current.scheduleAt).toISOString();
      saveCurrent();
      app.querySelector('.studio-modal')?.remove();
      showList();
      showToast('Internal delivery scheduled on this device. Keep the workspace open until the send time.');
      return;
    }
    const result = window.hireflowSendInternalCampaign && window.hireflowSendInternalCampaign({
      recipients: current.internalRecipients || [], subject: current.subject,
      preheader: current.preheader, fromName: current.fromName,
      bodyHtml: compileCampaign(current)
    });
    if (!result || !result.ok) {
      showToast(result && result.message || 'Internal Report Messaging is unavailable.');
      return;
    }
    const count = result.sent;
    current.report = { sentAt: new Date().toISOString(), sent: count, delivered: count, opened: 0, clicked: 0, bounced: 0, unsubscribed: 0 };
    current.status = 'Sent';
    saveCurrent();
    renderReport();
  }
  function setViewport(mobile) {
    const canvas = app.querySelector('[data-email-canvas]');
    const width = mobile ? 375 : 600;
    canvas.style.width = `${width}px`;
    canvas.dataset.mobile = String(mobile);
    app.querySelector('[data-canvas-width]').textContent = `${width} px`;
    app.querySelectorAll('[data-viewport]').forEach(button => button.classList.toggle('active', button.dataset.viewport === (mobile ? 'mobile' : 'desktop')));
  }
  function addBlock(type, index) {
    if (!BLOCK_TYPES[type]) return;
    const block = newBlock(type);
    const insertAt = Number.isInteger(index) ? Math.max(0, Math.min(index, current.blocks.length)) : current.blocks.length;
    current.blocks.splice(insertAt, 0, block);
    selectedBlockId = block.id;
    saveCurrent(); renderCanvas();
  }
  function updateBlockContent(target) {
    const block = current.blocks.find(item => item.id === target.dataset.blockId);
    if (!block) return;
    block.content[target.dataset.blockEdit] = target.value;
    saveCurrent();
    if (block.type === 'image' && target.dataset.blockEdit === 'url') {
      renderCanvas();
      return;
    }
    refreshThumbnail();
  }
  function handleField(target) {
    const field = target.dataset.field;
    if (!field) return;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (field === 'audienceMode') current.audienceMode = value;
    else if (field === 'include' || field === 'exclude') current[field] = value;
    else current[field] = value;
    if (field === 'scheduleMode') {
      if (value === 'suggested') current.scheduleAt = suggestedSchedule();
      const scheduleInput = app.querySelector('[data-field="scheduleAt"]');
      if (scheduleInput) { scheduleInput.value = current.scheduleAt || ''; scheduleInput.readOnly = value === 'suggested'; scheduleInput.min = localDateTime(new Date()); }
      const suggestion = app.querySelector('[data-schedule-suggestion]');
      if (suggestion) suggestion.hidden = value !== 'suggested';
    }
    saveCurrent();
    const audienceOptions = app.querySelector('[data-audience-options]');
    const testUsers = app.querySelector('[data-test-users]');
    if (audienceOptions) audienceOptions.hidden = current.audienceMode !== 'segments';
    if (testUsers) testUsers.hidden = current.audienceMode !== 'test';
    const scheduleTime = app.querySelector('[data-schedule-time]');
    if (scheduleTime) scheduleTime.hidden = current.scheduleMode === 'now';
    const sendHour = app.querySelector('[data-send-hour]');
    if (sendHour) sendHour.hidden = !current.optimizeTimezone;
    const estimate = app.querySelector('[data-recipient-estimate]');
    if (estimate) estimate.textContent = recipientEstimate(current).toLocaleString();
    const title = app.querySelector('.studio-editor-header h1');
    if (title && field === 'name') title.textContent = current.name || 'New campaign';
    if (field === 'emailBackground') {
      const canvas = app.querySelector('[data-email-canvas]');
      if (canvas) canvas.style.backgroundColor = colorValue(value, '#f3f4f6');
      refreshThumbnail();
    }
  }
  function updateStyle(target) {
    const block = current.blocks.find(item => item.id === selectedBlockId);
    if (!block) return;
    const property = target.dataset.styleEdit;
    block.style[property] = property === 'radius' || property === 'height' ? Number(target.value) : target.value;
    if (property === 'padding') block.style.padding = paddingValue(target.value);
    saveCurrent();
    const valueLabel = app.querySelector(`[data-style-value="${property}"]`);
    if (valueLabel) valueLabel.textContent = property === 'width' ? `${Math.max(10, Math.min(100, Number(target.value) || 100))}%` : `${Math.max(40, Math.min(500, Number(target.value) || 180))} px`;
    const card = app.querySelector(`[data-canvas-block="${CSS.escape(block.id)}"]`);
    if (card) {
      if (property === 'color') card.style.color = colorValue(block.style.color, '#293449');
      if (property === 'padding') card.style.padding = paddingValue(block.style.padding);
      if (property === 'align') card.style.textAlign = ['left', 'center', 'right'].includes(block.style.align) ? block.style.align : 'left';
      if (property === 'height') {
        const spacer = card.querySelector('.studio-spacer-sample');
        if (spacer) spacer.style.height = `${Math.max(8, Math.min(160, Number(block.style.height) || 36))}px`;
        const image = card.querySelector('.studio-image-placeholder img');
        if (image) image.style.height = `${Math.max(40, Math.min(500, Number(block.style.height) || 180))}px`;
      }
      if (property === 'width') {
        const image = card.querySelector('.studio-image-placeholder img');
        if (image) image.style.width = `${Math.max(10, Math.min(100, Number(block.style.width) || 100))}%`;
      }
      if (property === 'background' || property === 'radius') {
        const sample = card.querySelector('.studio-button-sample span');
        if (sample) { sample.style.background = colorValue(block.style.background, '#4346e5'); sample.style.borderRadius = `${Math.max(0, Math.min(40, Number(block.style.radius) || 0))}px`; }
      }
    }
    refreshThumbnail();
  }
  function mount() {
    if (!view) return;
    if (view.querySelector('.campaign-studio')) { app = view.querySelector('.campaign-studio'); return; }
    campaigns = readCampaigns();
    const wrapper = document.createElement('div');
    wrapper.className = 'campaign-studio-root';
    view.replaceChildren(wrapper);
    app = wrapper;
    renderList();
  }

  document.addEventListener('click', event => {
    const root = event.target.closest('.campaign-studio');
    if (!root) return;
    if (event.target.closest('[data-new-campaign]')) { const campaign = newCampaign(); campaigns.unshift(campaign); showEditor(campaign); return; }
    const open = event.target.closest('[data-open-campaign]');
    if (open) { const campaign = readCampaigns().find(item => item.id === open.dataset.openCampaign); if (campaign) { campaigns = readCampaigns(); if (campaign.report) { current = campaign; renderReport(); } else showEditor(campaign); } return; }
    const del = event.target.closest('[data-delete-campaign]');
    if (del) { if (window.confirm('Delete this campaign and its local report?')) { campaigns = readCampaigns().filter(item => item.id !== del.dataset.deleteCampaign); writeCampaigns(campaigns); showList(); } return; }
    if (event.target.closest('[data-back-list]')) { saveCurrent(); showList(); return; }
    if (event.target.closest('[data-save-campaign]')) { saveCurrent(); showToast('Campaign draft saved on this device.'); return; }
    if (event.target.closest('[data-review]')) { showReview(); return; }
    if (event.target.closest('[data-preview]')) { showPreview(); return; }
    if (event.target.closest('[data-simulate-send]')) { simulateSend(); return; }
         if (event.target.closest('[data-open-recipients]')) { showRecipientPicker(); return; }
     if (event.target.closest('[data-select-all-recipients]')) {
       const people = matchedInternalRecipients(current);
       const allSelected = people.length > 0 && people.every(person => (current.internalRecipients || []).includes(person.email));
       updateRecipients(allSelected ? [] : people.map(person => person.email));
       return;
     }
     const imagePicker = event.target.closest('[data-open-image-gallery]');
     if (imagePicker && !event.target.closest('[data-image-resize]')) { showStockGallery(); return; }

    const stockImage = event.target.closest('[data-stock-image]');
    if (stockImage && current) {
      const block = current.blocks.find(item => item.id === selectedBlockId && item.type === 'image');
      if (block) { const index = Number(stockImage.dataset.stockImage); block.content.url = stockImageUrl(STOCK_IMAGES[index], index); block.content.alt = STOCK_IMAGES[index]; saveCurrent(); app.querySelector('.studio-modal')?.remove(); renderCanvas(); }
      return;
    }
    const socialAdd = event.target.closest('[data-social-add]');
    if (socialAdd && current) {
      const block = current.blocks.find(item => item.id === socialAdd.dataset.blockId && item.type === 'social');
      const social = SOCIAL_STOCK.find(item => item.name === socialAdd.dataset.socialAdd);
      if (block && social) {
        const rows = String(block.content.text || '').split('\\n').filter(line => line.trim());
        if (!rows.some(line => line.split('|')[0].trim().toLowerCase() === social.name.toLowerCase())) rows.push(`${social.name} | ${social.url}`);
        block.content.text = rows.join('\\n'); saveCurrent(); renderCanvas();
      }
      return;
    }
    if (event.target.closest('[data-edit-reported]')) { if (current) { current.status = 'Draft'; delete current.report; showEditor(current); } return; }
    if (event.target.closest('[data-close-modal]') || event.target.classList.contains('studio-modal')) { const modal = app.querySelector('.studio-modal'); if (modal) modal.remove(); return; }
    const remove = event.target.closest('[data-remove-block]');
    if (remove) { current.blocks = current.blocks.filter(block => block.id !== remove.dataset.removeBlock); if (selectedBlockId === remove.dataset.removeBlock) selectedBlockId = ''; saveCurrent(); renderCanvas(); return; }
    const select = event.target.closest('[data-select-block], [data-canvas-block]');
    if (select) { selectedBlockId = select.dataset.selectBlock || select.dataset.canvasBlock; app.querySelectorAll('.studio-block').forEach(block => block.classList.toggle('selected', block.dataset.canvasBlock === selectedBlockId)); const inspector = app.querySelector('[data-email-inspector]'); if (inspector) inspector.innerHTML = inspectorMarkup(); return; }
    const tool = event.target.closest('[data-block-tool]');
    if (tool) { addBlock(tool.dataset.blockTool); return; }
    const viewport = event.target.closest('[data-viewport]');
    if (viewport) { setViewport(viewport.dataset.viewport === 'mobile'); return; }
    if (event.target.closest('[data-send-test]')) {
      const input = app.querySelector('[data-test-email]');
      const status = app.querySelector('[data-test-email-status]');
      status.textContent = input && input.validity.valid ? 'Test preview is ready locally; email delivery is not connected.' : 'Enter a valid test email address.';
    }
  });
  let resizeState = null;
  document.addEventListener('pointerdown', event => {
    const handle = event.target.closest('[data-image-resize]');
    if (!handle || !current) return;
    const frame = handle.closest('[data-image-resize-frame]');
    const blockElement = handle.closest('[data-canvas-block]');
    const block = current.blocks.find(item => item.id === (blockElement && blockElement.dataset.canvasBlock));
    if (!frame || !block) return;
    event.preventDefault();
    selectedBlockId = block.id;
    resizeState = {pointerId:event.pointerId,edge:handle.dataset.imageResize,startX:event.clientX,startY:event.clientY,startWidth:frame.getBoundingClientRect().width,startHeight:frame.getBoundingClientRect().height,canvasWidth:frame.closest('[data-email-canvas]').getBoundingClientRect().width,frame,block};
    handle.setPointerCapture?.(event.pointerId);
  });
  document.addEventListener('pointermove', event => {
    if (!resizeState || event.pointerId !== resizeState.pointerId) return;
    const {edge,startX,startY,startWidth,startHeight,canvasWidth,frame,block} = resizeState;
    const dx = event.clientX - startX, dy = event.clientY - startY;
    let width = startWidth + (edge.includes('e') ? dx : edge.includes('w') ? -dx : 0);
    let height = startHeight + (edge.includes('s') ? dy : edge.includes('n') ? -dy : 0);
    width = Math.max(40, Math.min(canvasWidth, width)); height = Math.max(40, Math.min(500, height));
    block.style.width = Math.max(10, Math.min(100, width / canvasWidth * 100)); block.style.height = height;
    frame.style.width = `${block.style.width}%`; frame.style.height = `${height}px`;
    const widthLabel = app.querySelector('[data-style-value="width"]'), heightLabel = app.querySelector('[data-style-value="height"]');
    const widthSlider = app.querySelector('[data-style-edit="width"]'), heightSlider = app.querySelector('[data-style-edit="height"]');
    if (widthLabel) widthLabel.textContent = `${Math.round(block.style.width)}%`; if (heightLabel) heightLabel.textContent = `${Math.round(height)} px`;
    if (widthSlider) widthSlider.value = String(Math.round(block.style.width)); if (heightSlider) heightSlider.value = String(Math.round(height));
  });
  document.addEventListener('pointerup', event => {
    if (resizeState && event.pointerId === resizeState.pointerId) { saveCurrent(); refreshThumbnail(); resizeState = null; }
  });
  document.addEventListener('pointercancel', () => { if (resizeState) { saveCurrent(); refreshThumbnail(); resizeState = null; } });

  document.addEventListener('input', event => {
    if (!event.target.closest('.campaign-studio') || !current) return;
    const target = event.target;
    if (target.matches('[data-field]')) handleField(target);
    else if (target.matches('[data-block-edit]')) updateBlockContent(target);
    else if (target.matches('[data-style-edit]')) updateStyle(target);
  });
  document.addEventListener('change', event => {
    if (!event.target.closest('.campaign-studio') || !current) return;
    const target = event.target;
    if (target.matches('[data-field]')) handleField(target);
         else if (target.matches('[data-recipient-choice]')) {
       const selected = new Set(current.internalRecipients || []);
       if (target.checked) selected.add(target.value); else selected.delete(target.value);
       updateRecipients([...selected]);
     }

    else if (target.matches('[data-segment]')) {
      const group = target.dataset.segment;
      const items = current[group] || [];
      current[group] = target.checked ? (items.includes(target.value) ? items : items.concat(target.value)) : items.filter(item => item !== target.value);
      saveCurrent();
      const estimate = app.querySelector('[data-recipient-estimate]');
      if (estimate) estimate.textContent = recipientEstimate(current).toLocaleString();
    } else if (target.matches('[data-style-edit]')) updateStyle(target);
  });
  document.addEventListener('dragstart', event => {
    const root = event.target.closest('.campaign-studio');
    if (!root || !current) return;
    const tool = event.target.closest('[data-block-tool]');
    const block = event.target.closest('[data-canvas-block]');
    if (tool) { event.dataTransfer.setData('text/campaign-block', tool.dataset.blockTool); event.dataTransfer.effectAllowed = 'copy'; }
    else if (block) { draggedBlockId = block.dataset.canvasBlock; event.dataTransfer.setData('text/campaign-existing-block', draggedBlockId); event.dataTransfer.effectAllowed = 'move'; }
  });
  document.addEventListener('dragover', event => {
    const canvas = event.target.closest('[data-email-canvas]');
    if (canvas && event.dataTransfer && (Array.from(event.dataTransfer.types).includes('text/campaign-block') || Array.from(event.dataTransfer.types).includes('text/campaign-existing-block'))) event.preventDefault();
  });
  document.addEventListener('drop', event => {
    const canvas = event.target.closest('[data-email-canvas]');
    if (!canvas || !current) return;
    event.preventDefault();
    const targetCard = event.target.closest('[data-canvas-block]');
    const targetIndex = targetCard ? current.blocks.findIndex(block => block.id === targetCard.dataset.canvasBlock) : current.blocks.length;
    const type = event.dataTransfer.getData('text/campaign-block');
    if (type) { addBlock(type, targetIndex < 0 ? current.blocks.length : targetIndex); return; }
    const sourceId = event.dataTransfer.getData('text/campaign-existing-block') || draggedBlockId;
    const sourceIndex = current.blocks.findIndex(block => block.id === sourceId);
    if (sourceIndex < 0) return;
    const block = current.blocks.splice(sourceIndex, 1)[0];
    let insertAt = targetIndex < 0 ? current.blocks.length : targetIndex;
    if (sourceIndex < insertAt) insertAt -= 1;
    current.blocks.splice(Math.max(0, insertAt), 0, block);
    selectedBlockId = block.id; saveCurrent(); renderCanvas();
  });
    document.addEventListener('keydown', event => {
     const campaignCard = event.target.closest('.studio-campaign-open');
     if (campaignCard && ['Enter', ' '].includes(event.key)) { event.preventDefault(); campaignCard.click(); return; }
     if (event.key === 'Escape' && app) { const modal = app.querySelector('.studio-modal'); if (modal) modal.remove(); }
     const imagePicker = event.target.closest('[data-open-image-gallery]');
     if (imagePicker && ['Enter', ' '].includes(event.key)) { event.preventDefault(); showStockGallery(); }
  });

  if (view) {
    const observer = new MutationObserver(() => {
      if (!view.querySelector('.campaign-studio')) mount();
    });
    observer.observe(view, { childList: true });
    if (!view.querySelector('.campaign-studio')) mount();
  }
  function deliverScheduledCampaign(campaign) {
    const result = window.hireflowSendInternalCampaign && window.hireflowSendInternalCampaign({recipients:campaign.internalRecipients || [],subject:campaign.subject,preheader:campaign.preheader,fromName:campaign.fromName,bodyHtml:compileCampaign(campaign)});
    if (!result || !result.ok) return false;
    const count = result.sent;
    campaign.report = {sentAt:new Date().toISOString(),sent:count,delivered:count,opened:0,clicked:0,bounced:0,unsubscribed:0};
    campaign.status = 'Sent';
    return true;
  }
  function processScheduledCampaigns() {
    const list = readCampaigns();
    let changed = false;
    list.forEach(campaign => {
      if (campaign.status === 'Scheduled' && campaign.scheduledAt && new Date(campaign.scheduledAt).getTime() <= Date.now() && deliverScheduledCampaign(campaign)) changed = true;
    });
    if (changed) { writeCampaigns(list); if (view && view.classList.contains('active-view') && !current) showList(); }
  }
  processScheduledCampaigns();
  window.setInterval(processScheduledCampaigns, 30000);
  window.addEventListener('focus', processScheduledCampaigns);
  window.addEventListener('storage', event => {
    if (event.key === storageKey() && view && view.classList.contains('active-view')) showList();
  });
})();
