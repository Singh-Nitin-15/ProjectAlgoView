const toggle = document.getElementById('modeToggle').querySelector('input');

toggle.addEventListener('change', () => {
  document.body.classList.toggle('light', toggle.checked);
});