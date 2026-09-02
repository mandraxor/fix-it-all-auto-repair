/**
 * Fix It All Auto Repair - Main Interactive JavaScript
 * High performance, zero dependency, production-grade logic.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveHours();
  initMobileMenu();
  initServiceFilters();
  initCouponClaim();
  initReviewFilters();
  initAppointmentForm();
  initFaqAccordion();
  initStickyHeader();
  initPhoneMasking();
  initDatePicker();
});

/* ==========================================================================
   1. Live Operating Hours & Shop Status
   ========================================================================== */
function initLiveHours() {
  const statusBadges = document.querySelectorAll('.js-live-status');
  if (!statusBadges.length) return;

  function updateStatus() {
    // Get Las Vegas (Pacific Time) current time
    const now = new Date();
    const vegasTimeString = now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    const vegasDate = new Date(vegasTimeString);

    const day = vegasDate.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const hour = vegasDate.getHours();
    const minute = vegasDate.getMinutes();
    const currentTimeVal = hour + minute / 60;

    let isOpen = false;
    let closesAt = "6:00 PM";
    let nextOpen = "Tomorrow at 8:00 AM";

    if (day === 0) { // Sunday: 9:00 AM - 6:00 PM
      if (currentTimeVal >= 9 && currentTimeVal < 18) {
        isOpen = true;
      }
      nextOpen = "Monday at 8:00 AM";
    } else { // Mon - Sat: 8:00 AM - 6:00 PM
      if (currentTimeVal >= 8 && currentTimeVal < 18) {
        isOpen = true;
      }
      nextOpen = day === 6 ? "Sunday at 9:00 AM" : "Tomorrow at 8:00 AM";
    }

    statusBadges.forEach(badge => {
      if (isOpen) {
        badge.innerHTML = `
          <span class="live-indicator mr-2">
            <span class="live-indicator-ping"></span>
            <span class="live-indicator-dot"></span>
          </span>
          <span class="text-emerald-400 font-semibold text-xs tracking-wide uppercase">Open Now</span>
          <span class="text-slate-400 text-xs hidden sm:inline ml-1">• Closes at ${closesAt}</span>
        `;
      } else {
        badge.innerHTML = `
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 mr-2"></span>
          <span class="text-amber-400 font-semibold text-xs tracking-wide uppercase">Closed Now</span>
          <span class="text-slate-400 text-xs hidden sm:inline ml-1">• Opens ${nextOpen}</span>
        `;
      }
    });
  }

  updateStatus();
  setInterval(updateStatus, 60000); // Check every minute
}

/* ==========================================================================
   2. Mobile Drawer Menu
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeMobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  function toggleMenu(open) {
    if (open) {
      mobileMenu.classList.remove('hidden');
      setTimeout(() => {
        mobileMenu.classList.remove('opacity-0', 'translate-x-full');
      }, 10);
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.add('opacity-0', 'translate-x-full');
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    }
  }

  menuBtn.addEventListener('click', () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on backdrop click
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) toggleMenu(false);
  });
}

/* ==========================================================================
   3. Service Grid Filtering
   ========================================================================== */
function initServiceFilters() {
  const tabButtons = document.querySelectorAll('.service-tab');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!tabButtons.length || !serviceCards.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active', 'bg-red-600', 'text-white'));
      btn.classList.add('active', 'bg-red-600', 'text-white');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   4. Coupon Claiming System
   ========================================================================== */
function initCouponClaim() {
  const claimButtons = document.querySelectorAll('.js-claim-coupon');
  const promoInput = document.getElementById('promoCodeInput');
  const serviceSelect = document.getElementById('serviceSelect');
  const promoNotice = document.getElementById('appliedPromoNotice');
  const promoNoticeText = document.getElementById('appliedPromoText');

  claimButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const code = btn.getAttribute('data-code') || 'OIL2995';
      const serviceValue = btn.getAttribute('data-service') || 'Oil & Filter Services';
      const offerTitle = btn.getAttribute('data-title') || '$29.95 Oil Change & Brake Special';

      if (promoInput) {
        promoInput.value = code;
      }

      if (serviceSelect && serviceValue) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].text.includes(serviceValue) || serviceSelect.options[i].value.includes(serviceValue)) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }

      if (promoNotice && promoNoticeText) {
        promoNoticeText.textContent = `Applied Promo: ${offerTitle} (Code: ${code})`;
        promoNotice.classList.remove('hidden');
      }

      // Smooth scroll down to appointment form
      const formSection = document.getElementById('appointment-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Highlight form inputs
        promoInput.classList.add('ring-2', 'ring-red-500', 'bg-red-950/30');
        setTimeout(() => {
          promoInput.classList.remove('ring-2', 'ring-red-500', 'bg-red-950/30');
        }, 3000);
      }
    });
  });
}

/* ==========================================================================
   5. Review Filters & Social Proof
   ========================================================================== */
function initReviewFilters() {
  const reviewTabs = document.querySelectorAll('.review-tab');
  const reviewCards = document.querySelectorAll('.review-card');

  if (!reviewTabs.length || !reviewCards.length) return;

  reviewTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      reviewTabs.forEach(t => t.classList.remove('bg-red-600', 'text-white'));
      reviewTabs.forEach(t => t.classList.add('bg-slate-800', 'text-slate-300'));
      tab.classList.remove('bg-slate-800', 'text-slate-300');
      tab.classList.add('bg-red-600', 'text-white');

      const filter = tab.getAttribute('data-review-filter');

      reviewCards.forEach(card => {
        const tag = card.getAttribute('data-review-tag') || '';
        if (filter === 'all' || tag.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. Appointment / Estimate Request Form & Confirmation Modal
   ========================================================================== */
function initAppointmentForm() {
  const form = document.getElementById('estimateForm');
  const modal = document.getElementById('confirmationModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalConfirmCode = document.getElementById('modalConfirmCode');
  const modalDetails = document.getElementById('modalDetails');
  const submitBtn = document.getElementById('formSubmitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validity check
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Button loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing Request...
    `;
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const fullName = formData.get('fullName') || 'Valued Customer';
    const phone = formData.get('phone') || '(702) 326-7375';
    const vehicle = `${formData.get('vehicleYear') || ''} ${formData.get('vehicleMake') || ''} ${formData.get('vehicleModel') || ''}`.trim() || 'Vehicle';
    const service = formData.get('service') || 'General Inspection';
    const date = formData.get('preferredDate') || 'As soon as possible';
    const time = formData.get('preferredTime') || 'Morning (8am - 12pm)';
    const promo = formData.get('promoCode') || '';

    // Generate random Reference ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const confirmCode = `FIA-89102-${randomNum}`;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // Populate Modal Content
      if (modalConfirmCode) modalConfirmCode.textContent = confirmCode;
      if (modalDetails) {
        modalDetails.innerHTML = `
          <div class="space-y-2 text-sm text-slate-300">
            <div class="flex justify-between py-1.5 border-b border-slate-700/60">
              <span class="text-slate-400">Customer:</span>
              <span class="font-medium text-white">${fullName}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-slate-700/60">
              <span class="text-slate-400">Phone:</span>
              <span class="font-medium text-white">${phone}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-slate-700/60">
              <span class="text-slate-400">Vehicle:</span>
              <span class="font-medium text-white">${vehicle}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-slate-700/60">
              <span class="text-slate-400">Requested Service:</span>
              <span class="font-medium text-red-400">${service}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-slate-700/60">
              <span class="text-slate-400">Target Time:</span>
              <span class="font-medium text-white">${date} • ${time}</span>
            </div>
            ${promo ? `
            <div class="flex justify-between py-1.5 border-b border-slate-700/60">
              <span class="text-slate-400">Applied Special:</span>
              <span class="font-semibold text-emerald-400">${promo}</span>
            </div>` : ''}
          </div>
        `;
      }

      // Show Modal
      if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('active'), 10);
      }

      form.reset();
      const promoNotice = document.getElementById('appliedPromoNotice');
      if (promoNotice) promoNotice.classList.add('hidden');
    }, 900);
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      setTimeout(() => modal.classList.add('hidden'), 300);
    });
  }

  // Close modal when clicking backdrop
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.classList.add('hidden'), 300);
      }
    });
  }
}

/* ==========================================================================
   7. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-btn');
    const answerContent = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!questionBtn || !answerContent) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = !answerContent.classList.contains('hidden');

      // Close all other FAQs
      faqItems.forEach(otherItem => {
        const otherAnswer = otherItem.querySelector('.faq-answer');
        const otherIcon = otherItem.querySelector('.faq-icon');
        if (otherAnswer && otherAnswer !== answerContent) {
          otherAnswer.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      if (isOpen) {
        answerContent.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        answerContent.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ==========================================================================
   8. Sticky Header Scroll Effect
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('shadow-xl', 'bg-slate-950/95');
      header.classList.remove('bg-slate-950/80');
    } else {
      header.classList.remove('shadow-xl', 'bg-slate-950/95');
      header.classList.add('bg-slate-950/80');
    }
  });
}

/* ==========================================================================
   9. Phone Number Formatting Mask
   ========================================================================== */
function initPhoneMasking() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
  });
}

/* ==========================================================================
   10. Date Picker Helper (Disallow Past Dates)
   ========================================================================== */
function initDatePicker() {
  const dateInput = document.getElementById('preferredDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
}
