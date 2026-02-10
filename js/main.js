console.log('JS is working');

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready");

  document
    .querySelectorAll("input, select, textarea")
    .forEach(el => {
      const saved = localStorage.getItem(el.name);
      if (saved !== null) {
        if (el.type === "checkbox") {
          el.checked = saved === "true";
        } else {
          el.value = saved;
        }
      }

      el.addEventListener("change", () => {
        if (el.type === "checkbox") {
          localStorage.setItem(el.name, el.checked);
        } else {
          localStorage.setItem(el.name, el.value);
        }
      });
    });
});