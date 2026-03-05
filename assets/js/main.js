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

  // --- Gallery lightbox ---
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (galleryItems.length && lightbox && lightboxImg) {
    galleryItems.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Intersection Observer for fade-in animations ---
  const animateElements = document.querySelectorAll('.story-card, .article-item, .article-card, .gallery-item');
  if (animateElements.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
});
