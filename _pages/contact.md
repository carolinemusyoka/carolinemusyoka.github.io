---
title: "Contact"
layout: default
permalink: "/contact/"
body_class: page-template
---

<section class="page-header">
  <h1 class="page-title">Get in Touch</h1>
  <p class="page-subtitle">Have a question, collaboration idea, or just want to say hello?</p>
</section>

<section class="contact-section">
  <p>I'd love to hear from you. Whether it's about a photography project, a travel story, or anything else — drop me a message and I'll get back to you as soon as I can.</p>

  <form class="contact-form" id="contact-form" action="https://formspree.io/f/mqkyblgd" method="POST">
    <div class="form-row">
      <input type="text" name="name" placeholder="Your name" required>
      <input type="email" name="_replyto" placeholder="Your email" required>
    </div>
    <input type="text" name="subject" placeholder="Subject">
    <textarea name="message" placeholder="Your message..." rows="8" required></textarea>
    <div>
      <button type="submit" class="btn btn-primary" id="contact-btn">Send Message</button>
    </div>
    <p id="form-status" style="display:none; margin-top:1rem; padding:1rem; border-radius:8px; text-align:center; font-weight:500;"></p>
  </form>
</section>

<script>
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('contact-btn');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.style.display = 'none';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function(response) {
      if (response.ok) {
        status.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        status.style.display = 'block';
        status.style.background = '#d4edda';
        status.style.color = '#155724';
        form.reset();
      } else {
        status.textContent = 'Oops — something went wrong. Please try again.';
        status.style.display = 'block';
        status.style.background = '#f8d7da';
        status.style.color = '#721c24';
      }
    }).catch(function() {
      status.textContent = 'Oops — something went wrong. Please try again.';
      status.style.display = 'block';
      status.style.background = '#f8d7da';
      status.style.color = '#721c24';
    }).finally(function() {
      btn.disabled = false;
      btn.textContent = 'Send Message';
    });
  });
</script>
