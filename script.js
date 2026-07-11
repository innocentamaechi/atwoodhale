/* ==========================================================================
   ATWOOD & HALE — SCRIPT
   1. Footer year
   2. Mobile nav toggle
   3. Contact form validation + WhatsApp redirect
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* 1. Footer year --------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* 2. Mobile nav toggle ----------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the mobile menu after a nav link is chosen
    document.querySelectorAll('.nav__links a').forEach(function (link) {
      link.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* 3. Contact form validation + WhatsApp redirect --------------------------- */
  var form = document.getElementById('enquiryForm');
  if (form) {
  var statusEl = document.getElementById('formStatus');
  var WHATSAPP_NUMBER = '2349065013451'; // Atwood & Hale WhatsApp number, international format, no leading +

  function setFieldState(fieldName, isValid) {
    var field = form.querySelector('[data-field="' + fieldName + '"]');
    if (field) {
      field.setAttribute('data-invalid', isValid ? 'false' : 'true');
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isValidPhone(value) {
    // Accepts + followed by 8-15 digits, allowing spaces/dashes
    var cleaned = value.replace(/[\s-]/g, '');
    return /^\+?[0-9]{8,15}$/.test(cleaned);
  }

  function isValidOptionalLink(value) {
    if (!value.trim()) return true; // optional field
    return /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/.*)?$/i.test(value.trim());
  }

  function validateForm(data) {
    var valid = true;

    if (!data.fullName.trim()) { setFieldState('fullName', false); valid = false; }
    else setFieldState('fullName', true);

    if (!isValidEmail(data.email.trim())) { setFieldState('email', false); valid = false; }
    else setFieldState('email', true);

    if (!isValidPhone(data.whatsapp.trim())) { setFieldState('whatsapp', false); valid = false; }
    else setFieldState('whatsapp', true);

    if (!data.businessName.trim()) { setFieldState('businessName', false); valid = false; }
    else setFieldState('businessName', true);

    if (!isValidOptionalLink(data.website)) { setFieldState('website', false); valid = false; }
    else setFieldState('website', true);

    if (!data.projectDetails.trim()) { setFieldState('projectDetails', false); valid = false; }
    else setFieldState('projectDetails', true);

    return valid;
  }

  function showStatus(message, state) {
    statusEl.textContent = message;
    statusEl.setAttribute('data-state', state);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var data = {
      fullName: form.fullName.value,
      email: form.email.value,
      whatsapp: form.whatsapp.value,
      businessName: form.businessName.value,
      website: form.website.value,
      projectDetails: form.projectDetails.value
    };

    if (!validateForm(data)) {
      showStatus('Please fix the highlighted fields before continuing.', 'error');
      return;
    }

    /* ------------------------------------------------------------------
       BACKEND INTEGRATION POINT
       Replace this block with a real submission, e.g.:

       fetch('https://your-backend-or-form-service.com/submit', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data)
       });

       Until a backend is connected, submissions are saved locally
       in the browser (localStorage) purely as a temporary record,
       and are NOT sent anywhere automatically.
    ------------------------------------------------------------------ */
    try {
      var submissions = JSON.parse(localStorage.getItem('atwoodhale_enquiries') || '[]');
      submissions.push({ data: data, submittedAt: new Date().toISOString() });
      localStorage.setItem('atwoodhale_enquiries', JSON.stringify(submissions));
    } catch (err) {
      // localStorage may be unavailable (e.g. private browsing) — safe to continue
      console.warn('Could not save enquiry locally:', err);
    }

    showStatus('Thank you — redirecting you to WhatsApp to confirm your enquiry...', 'success');

    var message = 'Hi Atwood & Hale, I just submitted the contact form.\n\n' +
      'Name: ' + data.fullName + '\n' +
      'Business: ' + data.businessName + '\n' +
      'Project: ' + data.projectDetails.substring(0, 200) +
      (data.projectDetails.length > 200 ? '...' : '') + '\n\n' +
      'I\'d like to discuss my project further.';

    var whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);

    setTimeout(function () {
      window.location.href = whatsappUrl;
    }, 900);

    form.reset();
  });

  // Clear field error state as the user corrects input
  form.querySelectorAll('input, textarea').forEach(function (input) {
    input.addEventListener('input', function () {
      var field = input.closest('[data-field]');
      if (field && field.getAttribute('data-invalid') === 'true') {
        field.setAttribute('data-invalid', 'false');
      }
    });
  });
  } // end if (form)

  /* 4. Portfolio category filter (runs on any page that has a filter bar) ---- */
  var filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    var filterButtons = filterBar.querySelectorAll('.filter-btn');
    var portfolioCards = document.querySelectorAll('#portfolioGrid .work-card');
    var emptyState = document.getElementById('filterEmpty');

    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;

      var selected = btn.getAttribute('data-filter');

      filterButtons.forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });

      var visibleCount = 0;
      portfolioCards.forEach(function (card) {
        var match = selected === 'all' || card.getAttribute('data-category') === selected;
        card.hidden = !match;
        if (match) visibleCount++;
      });

      if (emptyState) emptyState.hidden = visibleCount !== 0;
    });
  }
});
