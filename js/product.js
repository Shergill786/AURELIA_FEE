/* =========================================================
   product.js — Product detail page
   ========================================================= */

const COLOR_NAMES = {
  '#0b0b0d':'Obsidian Black', '#4a2545':'Plum', '#4c6fff':'Electric Blue', '#55524c':'Charcoal',
  '#fafaf8':'Porcelain White', '#d4af6a':'Champagne Gold', '#9c7a3c':'Antique Gold', '#7b4fe0':'Royal Purple'
};

document.addEventListener('DOMContentLoaded', ()=> {
  const id = parseInt(new URLSearchParams(location.search).get('id'), 10);
  const p = findProduct(id) || PRODUCTS[0];

  document.title = p.name + ' — Aurelia';
  document.getElementById('crumbName').textContent = p.name;
  const main = document.getElementById('pdMainImage');
  main.onerror = ()=> productImgFallback(main);
  main.src = p.img;
  main.alt = p.name;
  document.getElementById('pdCat').textContent = p.section + ' · ' + (p.type || p.cat) + ' · ' + p.brand;
  document.getElementById('pdTitle').textContent = p.name;
  document.getElementById('pdRating').innerHTML = `${starsHTML(p.rating)} <span>${p.rating} (${p.reviews} reviews)</span>`;
  document.getElementById('pdPrice').textContent = formatPrice(p.price);
  document.getElementById('pdOldPrice').textContent = formatPrice(p.oldPrice);
  document.getElementById('pdOff').textContent = Math.round((1 - p.price / p.oldPrice) * 100) + '% OFF';
  document.getElementById('pdDesc').textContent = p.desc;
  document.getElementById('tabDescText').textContent = p.desc + ' Every Aurelia piece is quality-checked twice before it ships, so what arrives at your door matches exactly what you saw on screen.';
  document.getElementById('specBrand').textContent = p.brand;
  document.getElementById('specSection').textContent = p.section;
  document.getElementById('specType').textContent = p.type || p.cat;
  document.getElementById('specCat').textContent = p.cat;

  // Three crops of the same photo so the thumbnails are not identical copies.
  const crops = ['entropy', 'top', 'bottom'];
  document.getElementById('pdThumbs').innerHTML = crops.map((c, i)=> {
    const src = p.img.startsWith('https://images.unsplash.com') ? `${p.img}&h=600&crop=${c}` : p.img;
    return `<img src="${src}" alt="${p.name} view ${i + 1}" class="${i === 0 ? 'active' : ''}" tabindex="0" onerror="productImgFallback(this)">`;
  }).join('');
  document.getElementById('pdSwatches').innerHTML = p.colors.map((c, i)=>
    `<button type="button" class="swatch ${i === 0 ? 'active' : ''}" style="background:${c}" data-color="${COLOR_NAMES[c] || c}" title="${COLOR_NAMES[c] || c}" aria-label="${COLOR_NAMES[c] || c}"></button>`).join('');
  document.getElementById('pdSizes').innerHTML = p.sizes.map((s, i)=>
    `<button type="button" class="size-pill ${i === 0 ? 'active' : ''}" data-size="${s}">${s}</button>`).join('');

  // Event delegation: these elements are created above, after slider.js has run.
  const pickOne = (container, selector)=> container.addEventListener('click', e=> {
    const el = e.target.closest(selector);
    if(!el) return;
    container.querySelectorAll(selector).forEach(x=> x.classList.remove('active'));
    el.classList.add('active');
    if(selector === 'img'){ main.src = el.src; }
  });
  pickOne(document.getElementById('pdSwatches'), '.swatch');
  pickOne(document.getElementById('pdSizes'), '.size-pill');
  pickOne(document.getElementById('pdThumbs'), 'img');

  const selectedOpts = ()=> ({
    Size: document.querySelector('#pdSizes .size-pill.active')?.dataset.size,
    Color: document.querySelector('#pdSwatches .swatch.active')?.dataset.color
  });

  const wishBtn = document.getElementById('pdWishBtn');
  const syncWishState = ()=> {
    const inWish = getWishlist().includes(p.id);
    wishBtn.textContent = inWish ? '♥ Wishlisted' : '♡ Wishlist';
    wishBtn.setAttribute('aria-pressed', String(inWish));
  };
  syncWishState();
  wishBtn.addEventListener('click', ()=> {
    toggleWishlist(p.id);
    syncWishState();
  });

  const qty = ()=> parseInt(document.getElementById('pdQty').value, 10) || 1;
  document.getElementById('pdAddCart').addEventListener('click', ()=> addToCart(p.id, qty(), selectedOpts()));
  document.getElementById('pdBuyNow').addEventListener('click', ()=> {
    addToCart(p.id, qty(), selectedOpts());
    window.location.href = 'checkout.html';
  });

  const sameType = PRODUCTS.filter((pr)=> pr.section === p.section && pr.type === p.type && pr.id !== p.id);
  const sameSection = PRODUCTS.filter((pr)=> pr.section === p.section && pr.id !== p.id && !sameType.includes(pr));
  const related = [...sameType, ...sameSection].slice(0, 4);
  renderGrid('relatedGrid', related.length ? related : PRODUCTS.filter((pr)=> pr.id !== p.id).slice(0, 4));
});
