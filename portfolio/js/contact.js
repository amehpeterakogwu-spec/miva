// ============================================================
// contact.js — Contact form validation
// Demonstrates: event handling, form validation, DOM manipulation
// ============================================================

(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var statusBox = document.getElementById('form-status');

  var fields = {
    name: { el: document.getElementById('field-name'), row: document.getElementById('row-name') },
    email: { el: document.getElementById('field-email'), row: document.getElementById('row-email') },
    phone: { el: document.getElementById('field-phone'), row: document.getElementById('row-phone') },
    message: { el: document.getElementById('field-message'), row: document.getElementById('row-message') }
  };

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PHONE_DIGITS_RE = /^[0-9]+$/;

  function setInvalid(key, isInvalid) {
    fields[key].row.classList.toggle('invalid', isInvalid);
  }

  function validateName() {
    var val = fields.name.el.value.trim();
    var ok = val.length > 0;
    setInvalid('name', !ok);
    return ok;
  }

  function validateEmail() {
    var val = fields.email.el.value.trim();
    var ok = val.length > 0 && EMAIL_RE.test(val);
    setInvalid('email', !ok);
    return ok;
  }

  function validatePhone() {
    var val = fields.phone.el.value.trim();
    var ok = val.length > 0 && PHONE_DIGITS_RE.test(val);
    setInvalid('phone', !ok);
    return ok;
  }

  function validateMessage() {
    var val = fields.message.el.value.trim();
    var ok = val.length > 0;
    setInvalid('message', !ok);
    return ok;
  }

  // Live validation on blur
  fields.name.el.addEventListener('blur', validateName);
  fields.email.el.addEventListener('blur', validateEmail);
  fields.phone.el.addEventListener('blur', validatePhone);
  fields.message.el.addEventListener('blur', validateMessage);

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nameOk = validateName();
    var emailOk = validateEmail();
    var phoneOk = validatePhone();
    var messageOk = validateMessage();

    var allOk = nameOk && emailOk && phoneOk && messageOk;

    statusBox.classList.remove('show', 'success', 'fail');

    if (!allOk) {
      statusBox.textContent = '> error: please fix the highlighted fields before sending.';
      statusBox.classList.add('show', 'fail');
      return;
    }

    // Simulated send (no backend attached in this static build)
    statusBox.textContent = '> message received. Thanks, ' + fields.name.el.value.trim().split(' ')[0] + ' — I\'ll reply to ' + fields.email.el.value.trim() + ' soon.';
    statusBox.classList.add('show', 'success');
    form.reset();
    Object.keys(fields).forEach(function (key) { setInvalid(key, false); });
  });
})();
