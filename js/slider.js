/* =========================================================
   slider.js — Horizontal carousels, PDP gallery zoom, tabs, quantity
   (Swatches, sizes and thumbnails are wired in product.js, because
   they are created there after this script has already run.)
   ========================================================= */

document.addEventListener('DOMContentLoaded', ()=>{

  /* ---------- Horizontal slider nav buttons ---------- */
  document.querySelectorAll('.hslider-wrap').forEach(wrap=>{
    const track = wrap.querySelector('.hslider');
    wrap.querySelector('.prev')?.addEventListener('click', ()=> track.scrollBy({left:-300, behavior:'smooth'}));
    wrap.querySelector('.next')?.addEventListener('click', ()=> track.scrollBy({left:300, behavior:'smooth'}));
  });

  /* ---------- Product detail gallery zoom ---------- */
  const pdMain = document.getElementById('pdMainImage');
  if(pdMain){
    const box = pdMain.parentElement;
    box.addEventListener('click', function(e){
      this.classList.toggle('zoomed');
      if(!this.classList.contains('zoomed')) pdMain.style.transformOrigin = '';
      else moveOrigin.call(this, e);
    });
    function moveOrigin(e){
      const rect = this.getBoundingClientRect();
      const x = ((e.clientX - rect.left)/rect.width)*100;
      const y = ((e.clientY - rect.top)/rect.height)*100;
      pdMain.style.transformOrigin = `${x}% ${y}%`;
    }
    box.addEventListener('mousemove', function(e){
      if(this.classList.contains('zoomed')) moveOrigin.call(this, e);
    });
    box.addEventListener('mouseleave', function(){
      this.classList.remove('zoomed');
      pdMain.style.transformOrigin = '';
    });
  }

  /* ---------- PDP tabs ---------- */
  document.querySelectorAll('.pd-tab').forEach(tab=>{
    tab.addEventListener('click', ()=>{
      document.querySelectorAll('.pd-tab').forEach(t=>{ t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      document.querySelectorAll('.pd-tab-panel').forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      document.getElementById(tab.dataset.tab)?.classList.add('active');
    });
  });

  /* ---------- PDP quantity ---------- */
  const qtyInput = document.getElementById('pdQty');
  document.getElementById('qtyMinus')?.addEventListener('click', ()=>{
    qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
  });
  document.getElementById('qtyPlus')?.addEventListener('click', ()=>{
    qtyInput.value = Math.min(99, (parseInt(qtyInput.value, 10) || 1) + 1);
  });
});
