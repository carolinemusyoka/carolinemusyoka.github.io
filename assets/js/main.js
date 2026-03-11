// === Carol Musyoka Blog — Main JS ===

document.addEventListener('DOMContentLoaded', () => {

  // --- Header scroll effect ---
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Hero slideshow ---
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    let current = 0;
    const counterEl = document.querySelector('.hero-counter');

    const showSlide = (index) => {
      slides.forEach(s => s.classList.remove('active'));
      slides[index].classList.add('active');
      if (counterEl) {
        const num = String(index + 1).padStart(2, '0');
        const total = String(slides.length).padStart(2, '0');
        counterEl.innerHTML = `<span class="current">${num}</span> / ${total}`;
      }
    };

    showSlide(0);
    setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 6000);
  }

  // --- Gallery category filters ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-masonry .gallery-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter items
        galleryItems.forEach(item => {
          const cat = item.dataset.category;
          if (filter === 'all' || cat === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // --- Gallery lightbox with navigation ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (galleryItems.length && lightbox && lightboxImg) {
    let currentIndex = 0;

    const getVisibleItems = () => {
      return Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
    };

    const openLightbox = (index) => {
      const visible = getVisibleItems();
      if (index < 0 || index >= visible.length) return;
      currentIndex = index;
      const item = visible[index];
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-item-caption');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      if (lightboxCaption && caption) {
        lightboxCaption.textContent = caption.textContent;
      }
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    const navigate = (direction) => {
      const visible = getVisibleItems();
      currentIndex = (currentIndex + direction + visible.length) % visible.length;
      openLightbox(currentIndex);
    };

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const visible = getVisibleItems();
        const idx = visible.indexOf(item);
        if (idx !== -1) openLightbox(idx);
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
    if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });

    // Click outside image closes
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard nav
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  // --- Stats counter animation ---
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length && 'IntersectionObserver' in window) {
    const animateCounter = (el) => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 2000;
      const start = performance.now();

      const step = (timestamp) => {
        const progress = Math.min((timestamp - start) / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          // Add a + for large numbers
          el.textContent = target >= 100 ? target.toLocaleString() + '+' : target.toString();
        }
      };

      requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statsObserver.observe(el));
  }

  // --- Stop category filters (scenic drive pages) ---
  const stopFilterBtns = document.querySelectorAll('.stop-filter-btn');
  const stopCards = document.querySelectorAll('.stop-card');

  if (stopFilterBtns.length && stopCards.length) {
    stopFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.stop;

        stopFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        stopCards.forEach(card => {
          if (category === 'all' || card.dataset.stopCategory === category) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // --- 24 Hours In city tab switching ---
  const cityTabs = document.querySelectorAll('.day-city-tab');
  const cityPanels = document.querySelectorAll('.day-guide-content');

  if (cityTabs.length && cityPanels.length) {
    cityTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const city = tab.dataset.city;
        cityTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        cityPanels.forEach(p => {
          p.classList.toggle('active', p.dataset.city === city);
        });
      });
    });
  }

  // --- Intersection Observer for fade-in animations ---
  const animateElements = document.querySelectorAll(
    '.story-card, .article-item, .gallery-item, .travel-pin, .potw-inner, .newsletter-inner, ' +
    '.viewpoint-card, .stop-card, .city-activity-card, .accommodation-card, .tip-item, ' +
    '.drive-overview, .drive-section, .guide-time-block, .practical-grid, .practical-item, ' +
    '.day-block, .day-spot, .day-stay'
  );
  if (animateElements.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animateElements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
      observer.observe(el);
    });
  }
});
