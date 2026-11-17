(() => {
  const STORAGE_PREFIX = 'hireflowEmailBuilderBlocks';

  function safeUrl(value) {
    const url = String(value || '').trim();
    return /^https?:\/\//i.test(url) ? url : '';
  }

  function enhanceEditor(editor) {
    if (editor.querySelector('.email-dnd-builder')) return;
    const messageField = Array.from(editor.querySelectorAll('textarea')).find(field => !field.closest('.email-dnd-builder'));
    const builder = editor.querySelector('.marketing-builder');
    if (!builder || !messageField) return;

    const messageLabel = messageField.closest('.marketing-field') || messageField.parentElement;
    if (messageLabel) messageLabel.hidden = true;
    const oldPreview = editor.querySelector('.marketing-preview-card');
    if (oldPreview) oldPreview.hidden = true;

    const blockBuilder = document.createElement('section');
    blockBuilder.className = 'email-dnd-builder';
    blockBuilder.setAttribute('aria-label', 'Drag and drop email content builder');
    blockBuilder.innerHTML = `
      <header class="email-dnd-heading"><div><span class="email-dnd-kicker">EMAIL DESIGN</span><h2>Build your email</h2><p>Drag content blocks into the canvas, or select a block to add it.</p></div><span class="email-dnd-local">LOCAL PREVIEW</span></header>
      <div class="email-dnd-layout">
        <aside class="email-dnd-toolbox" aria-label="Content blocks"><h3>Content blocks</h3><button type="button" draggable="true" data-block-tool="heading"><span>H</span> Heading <b>＋</b></button><button type="button" draggable="true" data-block-tool="text"><span>¶</span> Text <b>＋</b></button><button type="button" draggable="true" data-block-tool="button"><span>▰</span> Button <b>＋</b></button><button type="button" draggable="true" data-block-tool="image"><span>▧</span> Image <b>＋</b></button><button type="button" draggable="true" data-block-tool="divider"><span>―</span> Divider <b>＋</b></button></aside>
        <section class="email-dnd-canvas-panel"><div class="email-dnd-canvas-title"><strong>Email canvas</strong><span>Drag blocks to reorder</span></div><div class="email-dnd-canvas" data-email-canvas tabindex="0"><div class="email-dnd-empty">Drop a block here to start designing</div></div></section>
        <aside class="email-dnd-preview-panel"><div class="email-dnd-preview-title"><strong>Live preview</strong><span>Desktop</span></div><article class="email-dnd-preview"><div class="email-dnd-preview-brand">Your brand</div><div class="email-dnd-preview-content" data-email-preview></div><footer>Sent to you because you subscribed to updates.<br><u>Unsubscribe</u></footer></article></aside>
      </div>`;
    builder.before(blockBuilder);

    const canvas = blockBuilder.querySelector('[data-email-canvas]');
    const preview = blockBuilder.querySelector('[data-email-preview]');
    const titleInput = Array.from(editor.querySelectorAll('input')).find(input => input.type !== 'hidden');
    const account = localStorage.getItem('hireflowStudentSession') || 'local';
    function storageKey() {
      const title = titleInput && titleInput.value ? titleInput.value.trim().toLowerCase() : 'new-campaign';
      return `${STORAGE_PREFIX}:${account}:${title}`;
    }

    let blocks = [];
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey()) || '[]');
      if (Array.isArray(saved)) blocks = saved;
    } catch (error) {
      blocks = [];
    }
    if (!blocks.length) {
      blocks = messageField.value.trim().split(/\n\s*\n/).filter(Boolean).map(text => ({ type: 'text', text: text }));
    }

    function blockText(block) {
      if (block.type === 'divider') return '—';
      if (block.type === 'button') return `${block.text || 'Learn more'}${block.url ? ` (${block.url})` : ''}`;
      if (block.type === 'image') return `[Image${block.url ? `: ${block.url}` : ''}]`;
      return block.text || '';
    }

    function syncMessage() {
      messageField.value = blocks.map(blockText).filter(Boolean).join('\n\n');
      messageField.dispatchEvent(new Event('input', { bubbles: true }));
      try {
        localStorage.setItem(storageKey(), JSON.stringify(blocks));
      } catch (error) {
        // Keep the editor usable if browser storage is unavailable.
      }
    }

    function renderPreview() {
      preview.innerHTML = '';
      blocks.forEach(block => {
        if (block.type === 'divider') {
          preview.append(document.createElement('hr'));
        } else if (block.type === 'heading') {
          const heading = document.createElement('h2');
          heading.textContent = block.text || 'Your headline';
          preview.append(heading);
        } else if (block.type === 'button') {
          const button = document.createElement('span');
          button.className = 'email-dnd-preview-button';
          button.textContent = block.text || 'Learn more';
          preview.append(button);
        } else if (block.type === 'image') {
          const imageUrl = safeUrl(block.url);
          if (imageUrl) {
            const image = document.createElement('img');
            image.src = imageUrl;
            image.alt = block.text || 'Email image';
            preview.append(image);
          } else {
            const placeholder = document.createElement('div');
            placeholder.className = 'email-dnd-image-placeholder';
            placeholder.textContent = block.text || 'Add an image URL';
            preview.append(placeholder);
          }
        } else {
          const paragraph = document.createElement('p');
          paragraph.textContent = block.text || 'Your email copy will appear here.';
          preview.append(paragraph);
        }
      });
      if (!blocks.length) {
        const empty = document.createElement('p');
        empty.textContent = 'Your email content will appear here.';
        preview.append(empty);
      }
    }

    function render() {
      canvas.innerHTML = '';
      if (!blocks.length) canvas.innerHTML = '<div class="email-dnd-empty">Drop a block here to start designing</div>';
      blocks.forEach((block, index) => {
        const card = document.createElement('article');
        card.className = 'email-dnd-block';
        card.draggable = true;
        card.dataset.blockIndex = String(index);
        const labels = { heading: 'Heading', text: 'Text', button: 'Button', image: 'Image', divider: 'Divider' };
        const label = labels[block.type] || 'Text';
        card.innerHTML = `<div class="email-dnd-block-top"><span><i>⠿</i> ${label}</span><button type="button" data-remove-block="${index}" aria-label="Remove ${label} block">×</button></div>`;
        if (block.type === 'divider') {
          card.insertAdjacentHTML('beforeend', '<div class="email-dnd-divider-sample"></div>');
        } else {
          const field = document.createElement(block.type === 'text' ? 'textarea' : 'input');
          field.className = 'email-dnd-block-text';
          field.dataset.editBlock = String(index);
          field.value = block.text || '';
          if (block.type === 'heading') field.placeholder = 'Write a heading';
          else if (block.type === 'button') field.placeholder = 'Button label';
          else if (block.type === 'image') field.placeholder = 'Image description';
          else field.placeholder = 'Write your email message';
          if (block.type === 'heading') field.maxLength = 120;
          if (block.type === 'text') field.rows = 3;
          card.append(field);
          if (block.type === 'button' || block.type === 'image') {
            const url = document.createElement('input');
            url.className = 'email-dnd-block-url';
            url.dataset.editUrl = String(index);
            url.type = 'url';
            url.value = block.url || '';
            url.placeholder = block.type === 'button' ? 'https://link.example (optional)' : 'https://image.example (image URL)';
            url.setAttribute('aria-label', block.type === 'button' ? 'Button destination URL' : 'Image URL');
            card.append(url);
          }
        }
        canvas.append(card);
      });
      renderPreview();
    }

    function addBlock(type, position) {
      const templates = {
        heading: { type: 'heading', text: 'Your headline' },
        text: { type: 'text', text: 'Write your email message here.' },
        button: { type: 'button', text: 'Learn more', url: '' },
        image: { type: 'image', text: '', url: '' },
        divider: { type: 'divider' }
      };
      const index = Math.max(0, Math.min(position, blocks.length));
      blocks.splice(index, 0, templates[type] || templates.text);
      render();
      syncMessage();
    }

    blockBuilder.addEventListener('click', event => {
      const tool = event.target.closest('[data-block-tool]');
      if (tool) {
        addBlock(tool.dataset.blockTool, blocks.length);
        return;
      }
      const remove = event.target.closest('[data-remove-block]');
      if (remove) {
        blocks.splice(Number(remove.dataset.removeBlock), 1);
        render();
        syncMessage();
      }
    });

    blockBuilder.addEventListener('input', event => {
      const textField = event.target.closest('[data-edit-block]');
      const urlField = event.target.closest('[data-edit-url]');
      if (textField && blocks[Number(textField.dataset.editBlock)]) blocks[Number(textField.dataset.editBlock)].text = textField.value;
      if (urlField && blocks[Number(urlField.dataset.editUrl)]) blocks[Number(urlField.dataset.editUrl)].url = urlField.value;
      renderPreview();
      syncMessage();
    });

    blockBuilder.addEventListener('dragstart', event => {
      const tool = event.target.closest('[data-block-tool]');
      const card = event.target.closest('.email-dnd-block');
      if (tool) {
        event.dataTransfer.setData('text/email-block', tool.dataset.blockTool);
        event.dataTransfer.effectAllowed = 'copy';
      } else if (card) {
        event.dataTransfer.setData('text/email-index', card.dataset.blockIndex);
        event.dataTransfer.effectAllowed = 'move';
      }
    });

    canvas.addEventListener('dragover', event => {
      event.preventDefault();
      canvas.classList.add('is-drag-over');
    });
    canvas.addEventListener('dragleave', event => {
      if (!canvas.contains(event.relatedTarget)) canvas.classList.remove('is-drag-over');
    });
    canvas.addEventListener('drop', event => {
      event.preventDefault();
      canvas.classList.remove('is-drag-over');
      const type = event.dataTransfer.getData('text/email-block');
      const target = event.target.closest('.email-dnd-block');
      if (type) {
        addBlock(type, target ? Number(target.dataset.blockIndex) : blocks.length);
        return;
      }
      const sourceIndex = Number(event.dataTransfer.getData('text/email-index'));
      if (!Number.isInteger(sourceIndex) || !blocks[sourceIndex]) return;
      const moved = blocks.splice(sourceIndex, 1)[0];
      let insertIndex = target ? Number(target.dataset.blockIndex) : blocks.length;
      if (sourceIndex < insertIndex) insertIndex--;
      blocks.splice(Math.max(0, insertIndex), 0, moved);
      render();
      syncMessage();
    });

    if (titleInput) {
      titleInput.addEventListener('change', () => {
        try {
          localStorage.setItem(storageKey(), JSON.stringify(blocks));
        } catch (error) {
          // Storage is optional for this local preview.
        }
      });
    }
    render();
    syncMessage();
  }

  const marketingView = document.getElementById('marketing-view');
  if (marketingView) {
    const observer = new MutationObserver(() => {
      marketingView.querySelectorAll('.marketing-editor').forEach(enhanceEditor);
    });
    observer.observe(marketingView, { childList: true, subtree: true });
    marketingView.querySelectorAll('.marketing-editor').forEach(enhanceEditor);
  }
})();
