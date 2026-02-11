document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready');

  // ❌ exclude radio from generic save/load
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

  // RADIO buttons: obnovení a uložení
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    const saved = localStorage.getItem(radio.name);

    // obnovit checked podle hodnoty
    if (saved === radio.value) {
      radio.checked = true;
    }

    // uložit při změně
    radio.addEventListener('change', () => {
      if (radio.checked) {
        localStorage.setItem(radio.name, radio.value);
      }
    });
  });
});
