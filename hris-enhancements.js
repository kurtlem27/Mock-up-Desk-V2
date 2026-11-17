(() => {
  const ROOT_ID = 'hris-view';
  const PAYROLL_KEY = 'hireflowPayrollHistory';
  const ATTENDANCE_KEY = 'hireflowTmisAttendance';
  const EMPLOYEE_KEY = 'hireflowFictionalEmployees';

  function read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
    catch { return fallback; }
  }

  function recordsFrom(value) {
    if (Array.isArray(value)) return value;
    return value && typeof value === 'object' ? Object.values(value) : [];
  }

  function value(record, names, fallback = '') {
    for (const name of names) {
      if (record?.[name] !== undefined && record[name] !== null && record[name] !== '') return record[name];
    }
    return fallback;
  }

  function escape(value) {
    return String(value ?? '—').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }

  function dateOf(record, fields) {
    const raw = String(value(record, fields, '')).trim();
    const iso = raw.match(/\d{4}-\d{2}-\d{2}/);
    if (iso) return iso[0];
    const yearMonth = raw.match(/\d{4}-\d{2}/);
    if (yearMonth) return yearMonth[0];
    const parsed = Date.parse(raw);
    return Number.isNaN(parsed) ? raw : new Date(parsed).toISOString().slice(0, 7);
  }

  function attachDatePicker(wrapper, records, dateFields, type) {
    let picker = wrapper.querySelector('[data-history-date]');
    if (!picker) {
      const controls = document.createElement('div');
      controls.className = 'hris-history-controls';
      controls.innerHTML = `<label>View ${type} date<input type="date" data-history-date aria-label="Choose ${type} date"></label><div class="hris-history-date-list" aria-label="Available ${type} dates"></div>`;
      wrapper.prepend(controls);
      picker = controls.querySelector('[data-history-date]');
    }
    const dates = [...new Set(records.map(record => dateOf(record, dateFields)).filter(Boolean))].sort().reverse();
    if (!picker.value) picker.value = dates[0] ? (dates[0].length === 7 ? `${dates[0]}-01` : dates[0]) : new Date().toISOString().slice(0, 10);
    const dateList = wrapper.querySelector('.hris-history-date-list');
    const dateSignature = JSON.stringify({dates, selected:picker.value});
    if (dateList.dataset.signature !== dateSignature) {
      dateList.dataset.signature = dateSignature;
      dateList.innerHTML = dates.map(date => {const choice=date.length===7?`${date}-01`:date;return `<button type="button" data-history-date-choice="${escape(choice)}" class="${choice === picker.value ? 'active' : ''}">${escape(date)}</button>`;}).join('');
      dateList.querySelectorAll('[data-history-date-choice]').forEach(button => button.addEventListener('click', () => {
        picker.value = button.dataset.historyDateChoice;
        picker.dispatchEvent(new Event('change', {bubbles:true}));
      }));
    }
    return picker;
  }

  function ensureBulkUpdate(panel, type) {
    const formId = type === 'attendance' ? 'tmis-bulk-form' : 'payroll-bulk-form';
    if (panel.querySelector(`#${formId}`)) return;
    const sourceForm = panel.querySelector(type === 'attendance' ? '#tmis-form' : '#payroll-form');
    if (!sourceForm) return;
    const employees = read(EMPLOYEE_KEY, []);
    const section = document.createElement('section');
    section.className = 'hris-bulk-update';
    const employeeChoices = employees.map(employee => `<option value="${escape(employee.id)}">${escape(employee.name)} · ${escape(employee.department)}</option>`).join('');
    section.innerHTML = type === 'attendance'
      ? `<details><summary>Bulk update attendance</summary><form id="${formId}" class="hris-bulk-form"><label>Employees <select name="employees" multiple required size="5">${employeeChoices}</select></label><div class="form-row"><label>Date<input name="date" type="date" required value="${new Date().toISOString().slice(0,10)}"></label><label>Time in<input name="timeIn" type="time"></label><label>Time out<input name="timeOut" type="time"></label></div><label>Notes<input name="notes" maxlength="300"></label><button class="primary-button" type="submit">Apply to selected employees</button><p role="status" aria-live="polite"></p></form></details>`
      : `<details><summary>Bulk update payroll</summary><form id="${formId}" class="hris-bulk-form"><label>Employees <select name="employees" multiple required size="5">${employeeChoices}</select></label><div class="form-row"><label>Payroll period<input name="period" type="month" required value="${new Date().toISOString().slice(0,7)}"></label><label>Basic pay<input name="basicPay" type="number" min="0" step="0.01" required></label><label>Deductions<input name="deductions" type="number" min="0" step="0.01" value="0"></label><label>Status<select name="status"><option>Prepared</option><option>Finalized</option></select></label></div><button class="primary-button" type="submit">Apply to selected employees</button><p role="status" aria-live="polite"></p></form></details>`;
    sourceForm.after(section);
    section.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      const selected = [...form.elements.employees.selectedOptions].map(option => option.value);
      const date = form.elements.date?.value || form.elements.period?.value;
      const employees = read(EMPLOYEE_KEY, []);
      if (!selected.length || !date) return;
      if (type === 'attendance') {
        const records = recordsFrom(read(ATTENDANCE_KEY, []));
        const timeIn = form.elements.timeIn.value, timeOut = form.elements.timeOut.value;
        let hours = '';
        if (timeIn && timeOut) {
          let minutes = (Number(timeOut.slice(0,2))*60+Number(timeOut.slice(3,5)))-(Number(timeIn.slice(0,2))*60+Number(timeIn.slice(3,5)));
          if (minutes < 0) minutes += 24*60;
          hours = Number((minutes/60).toFixed(2));
        }
        selected.forEach(employeeId => {
          const employee = employees.find(item => item.id === employeeId);
          records.push({employeeId, employeeName:employee?.name||'Employee', date, timeIn, timeOut, hours, notes:form.elements.notes.value.trim()});
        });
        try { localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(records)); }
        catch { form.querySelector('[role="status"]').textContent = 'Could not save these records on this device.'; return; }
        const wrapper = panel.querySelector('[data-attendance-history-table]');
        const picker = wrapper?.querySelector('[data-history-date]');
        if (picker) picker.value = date;
        if (wrapper) wrapper.dataset.signature = '';
        ensureAttendanceTable(panel);
      } else {
        const records = recordsFrom(read(PAYROLL_KEY, []));
        const basicPay = Number(form.elements.basicPay.value), deductions = Number(form.elements.deductions.value || 0);
        selected.forEach(employeeId => {
          const employee = employees.find(item => item.id === employeeId);
          records.push({employeeId, employeeName:employee?.name||'Employee', period:date, basicPay, deductions, netPay:basicPay-deductions, status:form.elements.status.value});
        });
        try { localStorage.setItem(PAYROLL_KEY, JSON.stringify(records)); }
        catch { form.querySelector('[role="status"]').textContent = 'Could not save these records on this device.'; return; }
        const wrapper = panel.querySelector('[data-payroll-history-table]');
        const picker = wrapper?.querySelector('[data-history-date]');
        if (picker) picker.value = `${date}-01`;
        if (wrapper) wrapper.dataset.signature = '';
        ensurePayrollTable(panel);
      }
      form.querySelector('[role="status"]').textContent = `Updated ${selected.length} employees.`;
      form.elements.employees.selectedIndex = -1;
    });
  }

  function ensureAttendanceTable(panel) {
    const form = panel.querySelector('#tmis-form');
    if (!form) return;
    let wrapper = panel.querySelector('[data-attendance-history-table]');
    if (!wrapper) {
      wrapper = document.createElement('section');
      wrapper.dataset.attendanceHistoryTable = '';
      wrapper.innerHTML = '<h2 class="directory-title">Attendance by date</h2><div class="teacher-table-wrap"><table class="teacher-table"><thead><tr><th>Employee</th><th>Date</th><th>Time in</th><th>Time out</th><th>Hours</th><th>Notes</th></tr></thead><tbody></tbody></table></div><p class="teacher-privacy-note">Select a date to review recorded attendance for each employee.</p>';
      form.after(wrapper);
    }
    const records = recordsFrom(read(ATTENDANCE_KEY, []));
    const employees = read(EMPLOYEE_KEY, []);
    const dateFields = ['date','workDate','attendanceDate','when'];
    const picker = attachDatePicker(wrapper, records, dateFields, 'attendance');
    const signature = JSON.stringify({records, employees, date:picker.value});
    if (wrapper.dataset.signature === signature) return;
    wrapper.dataset.signature = signature;
    const rows = records.filter(record => dateOf(record, dateFields) === picker.value);
    const tbody = wrapper.querySelector('tbody');
    tbody.innerHTML = rows.length ? rows.map(record => {
      const employee = employees.find(item => item.id === value(record, ['employeeId','staffId'])) || {};
      return `<tr><td>${escape(value(record, ['employeeName','name'], employee.name || 'Employee'))}</td><td>${escape(dateOf(record, dateFields))}</td><td>${escape(value(record, ['timeIn','clockIn','in']))}</td><td>${escape(value(record, ['timeOut','clockOut','out']))}</td><td>${escape(value(record, ['hours','totalHours','duration']))}</td><td>${escape(value(record, ['notes','note','remarks']))}</td></tr>`;
    }).join('') : '<tr><td colspan="6" class="teacher-empty">No attendance entries for this date.</td></tr>';
    picker.onchange = () => { wrapper.dataset.signature = ''; ensureAttendanceTable(panel); };
  }

  function ensurePayrollTable(panel) {
    const form = panel.querySelector('#payroll-form');
    let wrapper = panel.querySelector('[data-payroll-history-table]');
    if (!wrapper) {
      wrapper = document.createElement('section');
      wrapper.dataset.payrollHistoryTable = '';
      wrapper.innerHTML = '<h2 class="directory-title">Payroll by date</h2><div class="teacher-table-wrap"><table class="teacher-table"><thead><tr><th>Employee</th><th>Payroll period</th><th>Basic pay</th><th>Deductions</th><th>Net pay</th><th>Status</th></tr></thead><tbody></tbody></table></div><p class="teacher-privacy-note">Fictional payroll records for classroom practice only.</p>';
      if (form) form.after(wrapper);
      else panel.append(wrapper);
    }
    const employees = read(EMPLOYEE_KEY, []);
    const records = recordsFrom(read(PAYROLL_KEY, []));
    const dateFields = ['date','payrollDate','payDate','period','payrollMonth','month'];
    const picker = attachDatePicker(wrapper, records, dateFields, 'payroll');
    const signature = JSON.stringify({records, employees, date:picker.value});
    if (wrapper.dataset.signature === signature) return;
    wrapper.dataset.signature = signature;
    const selectedMonth = picker.value.slice(0, 7);
    const rows = records.filter(record => {
      const recordDate = dateOf(record, dateFields);
      return recordDate === picker.value || (recordDate.length === 7 && recordDate === selectedMonth);
    });
    const tbody = wrapper.querySelector('tbody');
    tbody.innerHTML = rows.length ? rows.slice().reverse().map(record => {
      const employee = employees.find(item => item.id === value(record, ['employeeId','staffId'])) || {};
      return `<tr><td>${escape(value(record, ['employeeName','name'], employee.name || 'Employee'))}</td><td>${escape(value(record, ['period','payrollMonth','month','date'], '—'))}</td><td>${escape(value(record, ['basic','basicPay','basePay','gross','grossPay','salary'], '—'))}</td><td>${escape(value(record, ['deductions','totalDeductions'], '—'))}</td><td>${escape(value(record, ['net','netPay','takeHome'], '—'))}</td><td>${escape(value(record, ['status'], record.finalized ? 'Finalized' : 'Prepared'))}</td></tr>`;
    }).join('') : '<tr><td colspan="6" class="teacher-empty">No payroll entries for this date.</td></tr>';
    picker.onchange = () => { wrapper.dataset.signature = ''; ensurePayrollTable(panel); };
  }

  function enhance() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;
    const directory = root.querySelector('.employee-directory');
    if (!directory) return;
    let cover = root.querySelector('.hris-main-cover');
    if (!cover) {
      cover = document.createElement('section');
      cover.className = 'teacher-dashboard hris-cover hris-main-cover';
      cover.innerHTML = '<p class="eyebrow">HUMAN RESOURCES INFORMATION SYSTEM</p><h1>People, time, and payroll</h1><p>Manage employee records, timekeeping, and payroll in one training workspace.</p>';
      root.prepend(cover);
    }
    const fullscreen = root.querySelector('[data-fullscreen-toggle="hris-view"]');
    if (fullscreen && cover.nextElementSibling !== fullscreen) cover.after(fullscreen);
    root.querySelectorAll('[data-hris-panel]').forEach(panel => {
      const key = panel.dataset.hrisPanel.toLowerCase();
      const name = key === 'tmis' ? 'TMIS' : key === 'payroll' ? 'Payroll' : key.includes('employee') ? 'Employee' : '';
      if (!name) return;
      let panelCover = panel.querySelector('.hris-cover');
      if (!panelCover) {
        panelCover = document.createElement('section');
        panelCover.className = `hris-cover ${name.toLowerCase()}-module-cover`;
        const coverContent = {
          Employee: '<p class="eyebrow">HRIS · EMPLOYEE RECORDS</p><h1>Employee</h1><p>Manage fictional employee profiles and personnel records.</p>',
          TMIS: '<p class="eyebrow">HRIS · TIMEKEEPING</p><h1>TMIS</h1><p>Manage employee attendance and time records.</p>',
          Payroll: '<p class="eyebrow">HRIS · PAYROLL</p><h1>Payroll</h1><p>Manage fictional payroll records for training.</p>'
        };
        panelCover.innerHTML = coverContent[name];
        panel.prepend(panelCover);
      }
      if (name === 'Employee') panelCover.classList.add('employee-module-cover');
      if (name === 'Payroll') panelCover.classList.add('payroll-cover');
      if (panelCover && !panelCover.querySelector('.hris-module-wordmark')) {
        const wordmark = document.createElement('strong');
        wordmark.className = 'hris-module-wordmark';
        wordmark.textContent = name;
        panelCover.prepend(wordmark);
      }
      const fullscreen = panel.querySelector('.fullscreen-toggle');
      if (panelCover && fullscreen && panelCover.nextElementSibling !== fullscreen) panelCover.after(fullscreen);
    });
    const fullscreenButton = root.querySelector('[data-fullscreen-toggle="hris-view"]');
    const activePanel = [...root.querySelectorAll('[data-hris-panel]')]
      .find(panel => !panel.hidden && panel.getClientRects().length > 0);
    const activeCover = activePanel?.querySelector('.hris-cover');
    if (fullscreenButton && activeCover && activeCover.nextElementSibling !== fullscreenButton) {
      activeCover.after(fullscreenButton);
    }
    const employeeDirectory = root.querySelector('.employee-directory');
    const employeePanel = employeeDirectory?.closest('[data-hris-panel]') || employeeDirectory;
    if (employeeDirectory && !employeePanel?.querySelector('.employee-module-cover')) {
      const employeeCover = document.createElement('section');
      employeeCover.className = 'hris-cover employee-module-cover';
      employeeCover.innerHTML = '<strong class="hris-module-wordmark">Employee</strong><p class="eyebrow">HRIS · EMPLOYEE RECORDS</p><h1>Employee</h1><p>Manage fictional employee profiles and personnel records.</p>';
      employeeDirectory.prepend(employeeCover);
    }
    const tmis = root.querySelector('[data-hris-panel="tmis"]');
    const payroll = root.querySelector('[data-hris-panel="payroll"]');
    if (tmis) { ensureBulkUpdate(tmis, 'attendance'); ensureAttendanceTable(tmis); }
    if (payroll) { ensureBulkUpdate(payroll, 'payroll'); ensurePayrollTable(payroll); }
  }

  const root = document.getElementById(ROOT_ID);
  if (!root) return;
  new MutationObserver(enhance).observe(root, {childList:true, subtree:true, attributes:true, attributeFilter:['class','hidden']});
  enhance();
  root.addEventListener('click', event => {
    if (event.target.closest('.hris-module-tabs button')) setTimeout(enhance, 0);
  });
  document.addEventListener('submit', event => {
    if (['tmis-form','payroll-form'].includes(event.target?.id)) setTimeout(enhance, 0);
  });
})();
