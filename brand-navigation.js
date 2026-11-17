(() => {
  const app = document.getElementById('app-shell');
  const nav = document.querySelector('.top-nav');
  if (!app || !nav) return;

  function addDropdown(view, label, className) {
    let wrapper = nav.querySelector(`.${className}`);
    if (!wrapper) {
      const link = nav.querySelector(`.top-nav-link[data-view="${view}"]`);
      if (!link) return null;
      wrapper = document.createElement('div');
      wrapper.className = `top-nav-dropdown ${className}`;
      const menu = document.createElement('div');
      menu.className = 'top-nav-menu';
      menu.setAttribute('aria-label', `${label} sections`);
      nav.insertBefore(wrapper, link);
      wrapper.append(link, menu);
      wrapper.addEventListener('pointerleave', () => wrapper.classList.remove('menu-dismissed'));
    }
    return wrapper.querySelector('.top-nav-menu');
  }

  const atsMenu = addDropdown('ats', 'Applicant Tracking System', 'ats-dropdown');
  const jobMenu = addDropdown('jobboard', 'Job Board', 'jobboard-dropdown');
  const hrisMenu = addDropdown('hris', 'HRIS', 'hris-dropdown');

  function populateMenu(menu, source, selector, key, view) {
    if (!menu || !source || menu.dataset.ready === 'true') return;
    source.hidden = true;
    source.querySelectorAll(selector).forEach(original => {
      const item = document.createElement('button');
      item.type = 'button';
      item.textContent = original.textContent.trim();
      item.className = original.className;
      item.addEventListener('click', () => {
        nav.querySelector(`.top-nav-link[data-view="${view}"]`)?.click();
        original.click();
        menu.querySelectorAll('button').forEach(button => button.classList.toggle('active', button.dataset[key] === original.dataset[key]));
        menu.closest('.top-nav-dropdown')?.classList.add('menu-dismissed');
        item.blur();
      });
      item.dataset[key] = original.dataset[key];
      item.classList.toggle('active', original.classList.contains('active'));
      menu.append(item);
    });
    menu.dataset.ready = 'true';
  }

  function enhance() {
    const atsTabs = document.querySelector('#ats-view .ats-category-tabs');
    populateMenu(atsMenu, atsTabs, '[data-ats-category]', 'atsCategory', 'ats');
    const categoryTabs = document.querySelector('#jobboard-view .job-category-tabs');
    populateMenu(jobMenu, categoryTabs, '[data-job-category]', 'jobCategory', 'jobboard');
    const hrisTabs = document.querySelector('#hris-view .hris-module-tabs');
    populateMenu(hrisMenu, hrisTabs, '[data-hris-tab]', 'hrisTab', 'hris');

    document.querySelectorAll('#ats-view .ats-cover, #hris-view .hris-cover').forEach(cover => {
      if (!cover.querySelector('.section-brand') && !cover.querySelector('.ats-topline')) {
        const brand = document.createElement('div');
        brand.className = 'section-brand';
        brand.textContent = 'Mock-up Desk';
        cover.prepend(brand);
      }
    });

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (/hireflow/i.test(node.nodeValue)) node.nodeValue = node.nodeValue.replace(/hireflow\.?/gi, 'Mock-up Desk');
    }
  }

  const observer = new MutationObserver(enhance);
  observer.observe(app, { childList: true, subtree: true, characterData: true });
  enhance();

  const sidebarButton = document.querySelector('.sidebar-collapse-button');
  sidebarButton?.addEventListener('click', () => {
    const collapsed = app.classList.toggle('sidebar-collapsed');
    sidebarButton.setAttribute('aria-expanded', String(!collapsed));
    sidebarButton.setAttribute('aria-label', collapsed ? 'Expand left panel' : 'Collapse left panel');
    sidebarButton.textContent = collapsed ? '›' : '‹';
  });
})();