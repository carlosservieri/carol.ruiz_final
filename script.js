// script.js - Client-Side Interactive Logic for Carol Ruiz Landing Page

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year Update
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      menuIconOpen.classList.toggle('hidden');
      menuIconClose.classList.toggle('hidden');
    });

    // Close menu when clicking links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      });
    });
  }

  // 3. Cookie Consent Banner
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesBtn = document.getElementById('accept-cookies');

  if (cookieBanner && acceptCookiesBtn) {
    // Check if user already accepted
    const cookiesAccepted = localStorage.getItem('carol_ruiz_cookies_accepted');
    
    if (!cookiesAccepted) {
      // Show banner with a slight delay for smooth entry
      setTimeout(() => {
        cookieBanner.classList.remove('hidden-banner');
      }, 800);
    }

    acceptCookiesBtn.addEventListener('click', () => {
      localStorage.setItem('carol_ruiz_cookies_accepted', 'true');
      cookieBanner.classList.add('hidden-banner');
    });
  }

  // 4. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');
    const answerPanel = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (questionButton && answerPanel && icon) {
      questionButton.addEventListener('click', () => {
        const isExpanded = questionButton.getAttribute('aria-expanded') === 'true';
        
        // Close other FAQs
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            const otherBtn = otherItem.querySelector('.faq-question');
            const otherAns = otherItem.querySelector('.faq-answer');
            const otherIcon = otherItem.querySelector('.faq-icon');
            if (otherBtn && otherAns && otherIcon) {
              otherBtn.setAttribute('aria-expanded', 'false');
              otherAns.classList.add('max-h-0', 'opacity-0');
              otherAns.classList.remove('max-h-96', 'opacity-100', 'mt-4');
              otherIcon.style.transform = 'rotate(0deg)';
            }
          }
        });

        // Toggle current FAQ
        if (isExpanded) {
          questionButton.setAttribute('aria-expanded', 'false');
          answerPanel.classList.add('max-h-0', 'opacity-0');
          answerPanel.classList.remove('max-h-96', 'opacity-100', 'mt-4');
          icon.style.transform = 'rotate(0deg)';
        } else {
          questionButton.setAttribute('aria-expanded', 'true');
          answerPanel.classList.remove('max-h-0', 'opacity-0');
          answerPanel.classList.add('max-h-96', 'opacity-100', 'mt-4');
          icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // 5. Contact Form Submitting State & Validation
  const contactForm = document.getElementById('contact-form');
  const consentCheckbox = document.getElementById('lgpd-consent');

  if (contactForm && consentCheckbox) {
    contactForm.addEventListener('submit', (e) => {
      if (!consentCheckbox.checked) {
        e.preventDefault();
        alert('Por favor, aceite a Política de Privacidade e autorize o contato para continuar.');
        return;
      }
      
      // We can let the default submit action handle the redirect to Formspree
      // But we can update the button state to show loading
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Enviando Mensagem...
        `;
      }
    });
  }

  // 6. Header Scroll Style
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('shadow-md', 'bg-white/95');
        header.classList.remove('bg-white/80');
      } else {
        header.classList.add('bg-white/80');
        header.classList.remove('shadow-md', 'bg-white/95');
      }
    });
  }
});
