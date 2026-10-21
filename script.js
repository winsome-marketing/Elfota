document.getElementById('year').textContent = new Date().getFullYear();

// Preserve campaign attribution in the Formspree notification.
const params = new URLSearchParams(window.location.search);
for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
  const el = document.getElementById(key.replace('_', '-'));
  if (el) el.value = (params.get(key) || '').slice(0, 150);
}

const quoteForm = document.getElementById('quote-form');
const feedback = document.getElementById('form-feedback');
if (quoteForm && feedback) {
  quoteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;
    const button = quoteForm.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Sending request…';
    feedback.textContent = '';
    feedback.className = 'form-feedback';
    try {
      const response = await fetch(quoteForm.action, {
        method: 'POST',
        body: new FormData(quoteForm),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) {
        let reason = 'Your request could not be sent. Please try again.';
        try {
          const result = await response.json();
          if (Array.isArray(result.errors) && result.errors.length) {
            reason = result.errors.map(e => e.message).filter(Boolean).join(' ');
          }
        } catch (_) {}
        throw new Error(reason);
      }
      feedback.classList.add('success');
      feedback.textContent = 'Request sent successfully! This is a demo brand; no real quotation will be provided.';
      quoteForm.reset();
    } catch (error) {
      feedback.classList.add('error');
      feedback.textContent = error.message || 'Your request could not be sent. Please try again.';
    } finally {
      button.disabled = false;
      button.textContent = 'Request My Quote →';
    }
  });
}

// Product card CTAs preselect the chosen category.
document.querySelectorAll('[data-product]').forEach(link => link.addEventListener('click', () => {
  const interest = document.getElementById('interest');
  if (interest) interest.value = link.dataset.product;
}));
