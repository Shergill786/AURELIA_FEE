/* =========================================================
   app.js — Global site behaviour shared by every page
   ========================================================= */

/* ---------- Preloader ---------- */
window.addEventListener('load', ()=>{
  const pre = document.getElementById('preloader');
  if(pre && !document.body.classList.contains('is-loading')){ setTimeout(()=> pre.classList.add('hide'), 400); }
});

/* ---------- Theme (persisted across every page) ----------
   Most pages switch theme with a data-theme attribute on <html>.
   The home page styles dark mode from a hidden #themeSwitch checkbox,
   so both are kept in sync from the same saved value. */
function readTheme(){
  try{ return localStorage.getItem('aurelia_theme') || 'light'; }catch(e){ return 'light'; }
}
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  const sw = document.getElementById('themeSwitch');
  if(sw) sw.checked = theme === 'dark';
  document.querySelectorAll('.theme-toggle').forEach(t=> t.setAttribute('aria-pressed', String(theme === 'dark')));
  try{ localStorage.setItem('aurelia_theme', theme); }catch(e){ /* storage unavailable */ }
}
document.documentElement.setAttribute('data-theme', readTheme());

document.addEventListener('DOMContentLoaded', ()=>{
  applyTheme(readTheme());

  const themeSwitch = document.getElementById('themeSwitch');
  if(themeSwitch){
    // Home page: the <label> toggles the checkbox natively; just remember it.
    themeSwitch.addEventListener('change', ()=> applyTheme(themeSwitch.checked ? 'dark' : 'light'));
  } else {
    document.getElementById('themeToggle')?.addEventListener('click', ()=>{
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- Sticky nav shadow, progress bar, back-to-top ---------- */
  const navbar = document.querySelector('.navbar');
  const progress = document.getElementById('scrollProgress');
  // Where the bar is already driven by a CSS scroll timeline, leave it alone.
  const cssProgress = progress && getComputedStyle(progress).animationName !== 'none';
  const stt = document.getElementById('scrollTop');
  const onScroll = ()=>{
    navbar?.classList.toggle('scrolled', window.scrollY > 10);
    if(progress && !cssProgress){
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    }
    if(stt && stt.tagName === 'BUTTON') stt.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  if(stt && stt.tagName === 'BUTTON'){
    stt.addEventListener('click', ()=> window.scrollTo({ top:0, behavior:'smooth' }));
  }

  /* ---------- Mobile nav drawer ---------- */
  const hamburger = document.querySelector('button.hamburger');
  const drawer = document.getElementById('navDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  function openDrawer(){
    drawer?.classList.add('open'); drawerOverlay?.classList.add('show');
    hamburger?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer(){
    drawer?.classList.remove('open'); drawerOverlay?.classList.remove('show');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  hamburger?.addEventListener('click', openDrawer);
  drawer?.querySelector('.nav-drawer-close')?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e=>{
    if(e.key !== 'Escape') return;
    closeDrawer();
    const dt = document.getElementById('drawerToggle');
    if(dt) dt.checked = false;
  });
  // Close the drawer when the viewport grows past the mobile breakpoint.
  window.matchMedia('(min-width: 821px)').addEventListener?.('change', e=>{ if(e.matches) closeDrawer(); });

  /* ---------- Ripple effect on all .ripple buttons ---------- */
  document.querySelectorAll('.ripple').forEach(btn=>{
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size/2) + 'px';
      circle.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(circle);
      setTimeout(()=> circle.remove(), 650);
    });
  });

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.stat-counter[data-count]');
  const runCounter = (el)=>{
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    let cur = 0;
    const step = Math.max(1, target/60);
    const tick = ()=>{
      cur += step;
      if(cur >= target){ el.textContent = target.toLocaleString('en-IN') + suffix; return; }
      el.textContent = Math.floor(cur).toLocaleString('en-IN') + suffix;
      requestAnimationFrame(tick);
    };
    tick();
  };
  if('IntersectionObserver' in window){
    const counterIO = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        runCounter(entry.target);
        counterIO.unobserve(entry.target);
      });
    }, { threshold:0.5 });
    counters.forEach(c=> counterIO.observe(c));
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- FAQ accordion (mouse + keyboard) ---------- */
  document.querySelectorAll('.faq-q').forEach(q=>{
    q.setAttribute('role', 'button');
    q.setAttribute('tabindex', '0');
    q.setAttribute('aria-expanded', 'false');
    const toggle = ()=>{
      const open = q.parentElement.classList.toggle('open');
      q.setAttribute('aria-expanded', String(open));
    };
    q.addEventListener('click', toggle);
    q.addEventListener('keydown', e=>{ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(); } });
  });

  /* ---------- Modal close on outside click ---------- */
  document.querySelectorAll('.modal-overlay').forEach(ov=>{
    ov.addEventListener('click', (e)=>{
      if(e.target !== ov) return;
      if(typeof closeQuickView === 'function') closeQuickView(); else ov.classList.remove('show');
    });
  });

  /* ---------- Newsletter forms (every footer + home block) ---------- */
  document.querySelectorAll('form.newsletter-form, .newsletter-block form').forEach(form=>{
    form.addEventListener('submit', e=>{
      e.preventDefault();
      if(typeof showToast === 'function') showToast('Subscribed successfully!');
      form.reset();
    });
  });

  if(typeof updateNavBadges === 'function') updateNavBadges();

  /* ---------- Highlight the active nav link ---------- */
  const page = location.pathname.split('/').pop() || 'home.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a=>{
    if(a.getAttribute('href') === page){ a.classList.add('active'); a.setAttribute('aria-current', 'page'); }
  });
});
