(() => {
  const HRIS_ROOT_ID = 'hris-view';
  const PAYROLL_KEY = 'hireflowPayrollHistory';
  const EMPLOYEE_KEY = 'hireflowFictionalEmployees';

  function read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
    catch { return fallback; }
  }

  function text(value, fallback = '—') {
    if (value === null || value === undefined || value === '') return fallback;
    return String(value);
  }

  function first(record, keys, fallback = '—') {
    for (const key of keys) {
      if (record?.[key] !== undefined && record[key] !== null && record[key] !== '') return record[key];
    }
    return fallback;
  }

  function ensurePayrollTable(panel) {
    if (panel.querySelector('[data-bulk-payroll]')) return;
    let wrapper = panel.querySelector('[data-payroll-history-table]');
    if (!wrapper) {
      wrapper = document.createElement('section');
      wrapper.dataset.payrollHistoryTable = '';
      wrapper.innerHTML = '<h2 class="directory-title">Payroll history</h2><div class="teacher-table-wrap"><table class="teacher-table"><thead><tr><th>Employee</th><th>Payroll period</th><th>Basic pay</th><th>Deductions</th><th>Net pay</th><th>Status</th></tr></thead><tbody></tbody></table></div><p class="teacher-privacy-note">Fictional payroll records for classroom practice only.</p>';
      const form = panel.querySelector('#payroll-form');
      if (form) form.after(wrapper);
      else panel.append(wrapper);

      const keep = new Set([panel.querySelector('.hris-cover'), form, wrapper].filter(Boolean));
      [...panel.children].forEach(child => { if (!keep.has(child)) child.hidden = true; });
    }

    const employees = read(EMPLOYEE_KEY, []);
    const records = read(PAYROLL_KEY, []);
    const tbody = wrapper.querySelector('tbody');
    const rows = Array.isArray(records) ? records : (records && typeof records === 'object' ? Object.values(records) : []);
    const signature = JSON.stringify({ rows, employees });
    if (wrapper.dataset.signature === signature) return;
    wrapper.dataset.signature = signature;
    tbody.replaceChildren();
    if (!rows.length) {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="6" class="teacher-empty">No payroll records prepared yet. Use the form above to prepare a payroll entry.</td>';
      tbody.append(row);
      return;
    }

    rows.slice().reverse().forEach(record => {
      const employee = employees.find(item => item.id === record.employeeId);
      const values = [
        first(record, ['employeeName', 'name'], employee?.name || 'Employee'),
        first(record, ['period', 'payrollMonth', 'month', 'date']),
        first(record, ['basic', 'basicPay', 'basePay', 'gross', 'grossPay', 'salary']),
        first(record, ['deductions', 'totalDeductions']),
        first(record, ['net', 'netPay', 'takeHome']),
        first(record, ['status'], record.finalized ? 'Finalized' : 'Prepared')
      ];
      const row = document.createElement('tr');
      values.forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = text(value);
        row.append(cell);
      });
      tbody.append(row);
    });
  }

  function enhance() {
    const root = document.getElementById(HRIS_ROOT_ID);
    if (!root) return;
    const directory = root.querySelector('.employee-directory');
    if (!directory) return;

    let employeeBanner = directory.querySelector(':scope > .hris-employee-banner');
    if (!employeeBanner) {
      employeeBanner = document.createElement('section');
      employeeBanner.className = 'hris-employee-banner';
      employeeBanner.innerHTML = '<p class="eyebrow">HRIS · EMPLOYEE MANAGEMENT</p><h1>Employee records &amp; people profiles</h1><p>Maintain employee profiles, contracts, statutory details, and leave information in one place.</p>';
      directory.prepend(employeeBanner);
    }

    let cover = root.querySelector('.hris-main-cover');
    if (!cover) {
      cover = document.createElement('section');
      cover.className = 'teacher-dashboard hris-cover hris-main-cover';
      cover.innerHTML = '<p class="eyebrow">HUMAN RESOURCES INFORMATION SYSTEM</p><h1>People, time, and payroll</h1><p>Manage employee records, timekeeping, and payroll in one training workspace.</p>';
      root.prepend(cover);
    }

    const fullscreen = root.querySelector('[data-fullscreen-toggle="hris-view"]');
    if (fullscreen && cover.nextElementSibling !== fullscreen) cover.after(fullscreen);

    const payroll = root.querySelector('[data-hris-panel="payroll"]');
    if (payroll) ensurePayrollTable(payroll);
  }

  const root = document.getElementById(HRIS_ROOT_ID);
  if (!root) return;
  new MutationObserver(enhance).observe(root, { childList: true, subtree: true });
  enhance();
  document.addEventListener('submit', event => {
    if (event.target?.id === 'payroll-form') setTimeout(enhance, 0);
  });
})();
