document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready');

  /* ===============================
     PAGE NAMESPACE (KLÍČOVÁ VĚC)
     =============================== */
  const PAGE_KEY = location.pathname.split('/').pop(); 
  const ns = (key) => `${PAGE_KEY}:${key}`;

  /* ===============================
     ROLE SELECT (PŘEPÍNÁNÍ STRÁNEK)
     =============================== */
  const roleSelect = document.querySelector('select[name="role"]');

  if (roleSelect) {
    const ROLE_KEY = 'selected-role';
    const savedRole = localStorage.getItem(ROLE_KEY);

    if (savedRole) {
      roleSelect.value = savedRole;
    }

    roleSelect.addEventListener('change', () => {
      const value = roleSelect.value;
      localStorage.setItem(ROLE_KEY, value);

      if (!location.pathname.endsWith(value)) {
        location.href = value;
      }
    });
  }

  /* ===============================
     CHECKBOXY – PAMĚŤ PO STRÁNKÁCH
     =============================== */
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    const key =
      checkbox.id ||
      `${checkbox.name}-${checkbox.value}`;

    const saved = localStorage.getItem(ns(key));

    if (saved !== null) {
      checkbox.checked = saved === 'true';
    }

    checkbox.addEventListener('change', () => {
      localStorage.setItem(ns(key), checkbox.checked);
    });
  });

  /* ===============================
     OSTATNÍ INPUTY / SELECTY / TEXTAREA
     =============================== */
  document
    .querySelectorAll(
      'input:not([type="radio"]):not([type="checkbox"]), select:not([name="role"]), textarea'
    )
    .forEach((el) => {
      const saved = localStorage.getItem(ns(el.name));

      if (saved !== null) {
        el.value = saved;
      }

      el.addEventListener('change', () => {
        localStorage.setItem(ns(el.name), el.value);
      });
    });

  /* ===============================
     RADIO BUTTONY – PAMĚŤ PO STRÁNKÁCH
     =============================== */
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    const saved = localStorage.getItem(ns(radio.name));

    if (saved === radio.value) {
      radio.checked = true;
    }

    radio.addEventListener('change', () => {
      if (radio.checked) {
        localStorage.setItem(ns(radio.name), radio.value);
      }
    });
  });

  /* ===============================
     TABULKA – JEDNA VYBRANÁ BUŇKA
     =============================== */
  const SELECTED_TD_KEY = ns('selected-td');
  const savedTdId = localStorage.getItem(SELECTED_TD_KEY);

  document.querySelectorAll('td').forEach((td) => {
    const id = td.dataset.id;
    if (!id) return;

    if (id === savedTdId) {
      td.classList.add('selected');
    }

    td.addEventListener('click', () => {
      document
        .querySelectorAll('td.selected')
        .forEach((el) => el.classList.remove('selected'));

      td.classList.add('selected');
      localStorage.setItem(SELECTED_TD_KEY, id);
    });
  });
});


