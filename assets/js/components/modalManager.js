/**
 * Modal Manager
 * Centralized lifecycle coordinator for dynamically mounting, isolating, and closing modal components.
 */

let activeModalId = null;

export function getModalContainer() {
  let container = document.getElementById('modal-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'modal-container';
    container.className = 'relative z-50';
    document.body.appendChild(container);
  }
  return container;
}

export function closeAllModals() {
  const container = getModalContainer();
  const modals = container.querySelectorAll('[id$="Modal"]');
  modals.forEach(m => {
    m.classList.add('hidden');
  });
  document.body.classList.remove('overflow-hidden');
  activeModalId = null;
}

export function mountModal(modalId, htmlTemplate, initListeners, forceRerender = false) {
  closeAllModals();
  const container = getModalContainer();
  let modalEl = document.getElementById(modalId);

  if (modalEl && forceRerender) {
    modalEl.remove();
    modalEl = null;
  }

  if (!modalEl) {
    container.insertAdjacentHTML('beforeend', htmlTemplate);
    modalEl = document.getElementById(modalId);
    if (typeof initListeners === 'function') {
      initListeners(modalEl);
    }
  }

  modalEl.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  activeModalId = modalId;
  return modalEl;
}

export function closeModal(modalId) {
  const modalEl = document.getElementById(modalId);
  if (modalEl) {
    modalEl.classList.add('hidden');
  }
  document.body.classList.remove('overflow-hidden');
  if (activeModalId === modalId) {
    activeModalId = null;
  }
}

// Global escape key listener
if (typeof document !== 'undefined') {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModalId) {
      closeModal(activeModalId);
    }
  });
}

// Expose closeAllModals globally for legacy safety
if (typeof window !== 'undefined') {
  window.closeAllModals = closeAllModals;
}
