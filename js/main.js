document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready');

  /* ===============================
     INPUTY / SELECTY / TEXTAREA
     =============================== */

  document
    .querySelectorAll('input:not([type="radio"]), select, textarea')
    .forEach((el) => {
      const saved = localStorage.getItem(el.name);
      if (saved !== null) {
        if (el.type === 'checkbox') {
          el.checked = saved === 'true';
        } else {
          el.value = saved;
        }
      }

      el.addEventListener('change', () => {
        if (el.type === 'checkbox') {
          localStorage.setItem(el.name, el.checked);
        } else {
          localStorage.setItem(el.name, el.value);
        }
      });
    });

  /* ===============================
     RADIO BUTTONY
     =============================== */

  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    const saved = localStorage.getItem(radio.name);

    if (saved === radio.value) {
      radio.checked = true;
    }

    radio.addEventListener('change', () => {
      if (radio.checked) {
        localStorage.setItem(radio.name, radio.value);
      }
    });
  });

  /* ===============================
     TABULKA – JEDNA VYBRANÁ BUŇKA
     =============================== */

  const SELECTED_TD_KEY = 'selected-td';
  const savedTdId = localStorage.getItem(SELECTED_TD_KEY);

  document.querySelectorAll('td').forEach(td => {
    const id = td.dataset.id;
    if (!id) return;

    // obnova po refreshi
    if (id === savedTdId) {
      td.classList.add('selected');
    }

    // klik na buňku
    td.addEventListener('click', () => {
      document.querySelectorAll('td.selected')
        .forEach(el => el.classList.remove('selected'));

      td.classList.add('selected');
      localStorage.setItem(SELECTED_TD_KEY, id);
    });
  });
});