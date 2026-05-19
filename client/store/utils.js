export function fmt(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

export function safeText(value) {
  return String(value ?? '').replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}

export function clearFieldError(input) {
  const field = input?.parentElement;
  if (!field) return;
  const msg = field.querySelector('.field-error');
  if (msg) msg.remove();
  input.removeAttribute('aria-invalid');
}

export function setFieldError(input, message) {
  const field = input?.parentElement;
  if (!field) return;
  clearFieldError(input);
  const msg = document.createElement('p');
  msg.className = 'field-error';
  msg.textContent = message;
  field.appendChild(msg);
  input.setAttribute('aria-invalid', 'true');
}

export function clearFormErrors(form) {
  if (!form) return;
  form.querySelectorAll('input, textarea').forEach(input => clearFieldError(input));
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

export function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 1800);
}
