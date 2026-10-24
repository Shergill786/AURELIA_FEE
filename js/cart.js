/* =========================================================
   cart.js — Cart page, Wishlist page, Checkout page, Orders page
   ========================================================= */

const GST_RATE = 0.18;
const FREE_SHIP_THRESHOLD = 4999;
const SHIP_COST = 199;
const COUPONS = { "AURELIA10": 0.10, "GOLD20": 0.20, "WELCOME15": 0.15 };

function cartSubtotal(cart){ return cart.reduce((s,i)=> s + i.price*i.qty, 0); }

// Coupon is remembered so the checkout page shows the same discount as the cart.
function getCouponCode(){ return Store.get('aurelia_coupon', null); }
function setCouponCode(code){ Store.set('aurelia_coupon', code); }

// Single source of truth for every total shown in cart and checkout.
function computeTotals(cart = getCart()){
  const subtotal = cartSubtotal(cart);
  const code = getCouponCode();
  const rate = (code && COUPONS[code] && subtotal > 0) ? COUPONS[code] : 0;
  const discount = subtotal * rate;
  const afterDiscount = subtotal - discount;
  const gst = afterDiscount * GST_RATE;
  const shipping = subtotal === 0 ? 0 : (afterDiscount >= FREE_SHIP_THRESHOLD ? 0 : SHIP_COST);
  const total = afterDiscount + gst + shipping;
  return { subtotal, discount, afterDiscount, gst, shipping, total, code: rate ? code : null };
}

function optsLabel(opts){
  const entries = Object.entries(opts || {});
  return entries.length ? entries.map(([k,v])=> `${k}: ${v}`).join(' / ') : 'Standard';
}

function emptyStateHTML(icon, title, text, href, cta){
  return `
    <div class="empty-state">
      <div class="icon-big">${icon}</div>
      <h3>${title}</h3>
      <p style="color:var(--text-dim);margin:12px 0 24px;">${text}</p>
      <a href="${href}" class="btn btn-primary">${cta}</a>
    </div>`;
}

/* ---------- Cart Page ---------- */
function renderCartPage(){
  const list = document.getElementById('cartList');
  if(!list) return;
  const cart = getCart();

  if(cart.length === 0){
    document.getElementById('cartWrap').innerHTML = emptyStateHTML('🛒', 'Your cart is empty', "Looks like you haven't added anything yet.", 'products.html', 'Continue Shopping');
    return;
  }

  list.innerHTML = cart.map(item => `
    <div class="cart-item">
      <a href="product.html?id=${item.id}"><img src="${item.img}" alt="${item.name}" onerror="productImgFallback(this)"></a>
      <div class="ci-info">
        <a href="product.html?id=${item.id}" class="ci-name">${item.name}</a>
        <div class="ci-meta">${optsLabel(item.opts)}</div>
        <div class="qty-selector">
          <button type="button" aria-label="Decrease quantity" onclick="changeQty('${item.key.replace(/'/g, "\\'").replace(/"/g, '&quot;')}', -1)">−</button>
          <input type="text" value="${item.qty}" readonly aria-label="Quantity">
          <button type="button" aria-label="Increase quantity" onclick="changeQty('${item.key.replace(/'/g, "\\'").replace(/"/g, '&quot;')}', 1)">+</button>
        </div>
        <button type="button" class="ci-remove" onclick="removeFromCart('${item.key.replace(/'/g, "\\'").replace(/"/g, '&quot;')}')">Remove</button>
      </div>
      <div class="ci-price">
        <span class="old">${formatPrice(item.oldPrice*item.qty)}</span>
        ${formatPrice(item.price*item.qty)}
      </div>
    </div>
  `).join('');

  const couponInput = document.getElementById('couponInput');
  const code = getCouponCode();
  if(couponInput && code && !couponInput.value){
    couponInput.value = code;
    const msg = document.getElementById('couponMsg');
    if(msg){ msg.textContent = `Coupon applied — ${COUPONS[code]*100}% off`; msg.style.color = 'var(--success)'; }
  }
  updateCartTotals();
}

function changeQty(key, delta){
  const cart = getCart();
  const item = cart.find(i=>i.key===key);
  if(!item) return;
  item.qty = Math.min(99, Math.max(1, item.qty+delta));
  setCart(cart);
  renderCartPage();
}
function removeFromCart(key){
  setCart(getCart().filter(i=>i.key!==key));
  renderCartPage();
  showToast('Item removed from cart');
}

function applyCoupon(){
  const input = document.getElementById('couponInput');
  const code = input.value.trim().toUpperCase();
  const msg = document.getElementById('couponMsg');
  if(!code){
    setCouponCode(null);
    msg.textContent = '';
  } else if(COUPONS[code]){
    setCouponCode(code);
    input.value = code;
    msg.textContent = `Coupon applied — ${COUPONS[code]*100}% off`;
    msg.style.color = 'var(--success)';
  } else {
    setCouponCode(null);
    msg.textContent = 'Invalid coupon code';
    msg.style.color = 'var(--sale)';
  }
  updateCartTotals();
}

function updateCartTotals(){
  const t = computeTotals();
  const set = (id,val)=>{ const el=document.getElementById(id); if(el) el.textContent = formatPrice(val, 2); };
  set('sumSubtotal', t.subtotal);
  set('sumGst', t.gst);
  set('sumTotal', t.total);
  const shipEl = document.getElementById('sumShipping');
  if(shipEl) shipEl.textContent = t.shipping === 0 ? 'Free' : formatPrice(t.shipping, 2);
  const discEl = document.getElementById('sumDiscountRow');
  if(discEl) discEl.style.display = t.discount>0 ? 'flex' : 'none';
  const dEl = document.getElementById('sumDiscount');
  if(dEl) dEl.textContent = '-' + formatPrice(t.discount, 2);
  const shipMsg = document.getElementById('shipMsg');
  if(shipMsg) shipMsg.textContent = t.shipping===0 ? 'Free shipping applied' : `Add ${formatPrice(FREE_SHIP_THRESHOLD - t.afterDiscount, 2)} more for free shipping`;
}

/* ---------- Wishlist Page ---------- */
function renderWishlistPage(){
  const grid = document.getElementById('wishlistGrid');
  if(!grid) return;
  const wish = getWishlist();
  const items = PRODUCTS.filter(p=>wish.includes(p.id));
  if(items.length===0){
    document.getElementById('wishlistWrap').innerHTML = emptyStateHTML('♡', 'Your wishlist is empty', 'Save items you love and find them here later.', 'products.html', 'Browse Products');
    return;
  }
  grid.innerHTML = items.map(productCardHTML).join('');
  observeReveals();
}

/* ---------- Checkout Page ---------- */
function renderCheckoutSummary(){
  const el = document.getElementById('checkoutSummary');
  if(!el) return;
  const cart = getCart();
  if(cart.length === 0){
    document.querySelector('.checkout-layout').innerHTML = emptyStateHTML('🛒', 'Nothing to check out', 'Your cart is empty — add a few pieces before placing an order.', 'products.html', 'Start Shopping');
    return;
  }
  const t = computeTotals(cart);
  el.innerHTML = cart.map(i=> `
    <div class="summary-row"><span>${i.name} × ${i.qty}</span><span>${formatPrice(i.price*i.qty, 2)}</span></div>
  `).join('') + `
    <div class="summary-row summary-sep"><span>Subtotal</span><span>${formatPrice(t.subtotal, 2)}</span></div>
    ${t.discount>0 ? `<div class="summary-row"><span>Discount (${t.code})</span><span>-${formatPrice(t.discount, 2)}</span></div>` : ''}
    <div class="summary-row"><span>GST (18%)</span><span>${formatPrice(t.gst, 2)}</span></div>
    <div class="summary-row"><span>Shipping</span><span>${t.shipping===0?'Free':formatPrice(t.shipping, 2)}</span></div>
    <div class="summary-row total"><span>Grand Total</span><span>${formatPrice(t.total, 2)}</span></div>
  `;
}

function validateField(field, condition){
  field.classList.toggle('invalid', !condition);
  return condition;
}

const CHECKOUT_RULES = {
  fullName: v => v.length >= 2,
  email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  address:  v => v.length >= 5,
  city:     v => v.length >= 2,
  zip:      v => /^[A-Za-z0-9 -]{3,10}$/.test(v),
  phone:    v => v.replace(/\D/g, '').length >= 7
};

/* ---------- Order processing with Promises ----------
   Placing an order is asynchronous, the way it would be against a real server:
   1. verifyStock()    — checks every cart item is still sold and in a sensible quantity
   2. processPayment() — simulates the payment gateway for the chosen method
   Both return Promises. placeOrder() runs them with async/await, shows a
   loading state while they are pending, and handles a rejection with a
   clear message instead of saving a broken order. */

const MAX_QTY_PER_ITEM = 10;      // per-customer limit on any single item
const COD_LIMIT = 20000;          // Cash on Delivery is not offered above this
const PAY_LABELS = { card:'Credit / Debit Card', upi:'UPI', netbanking:'Net Banking', cod:'Cash on Delivery' };

function verifyStock(cart){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      const missing = cart.find(i => !findProduct(i.id));
      if(missing) return reject(new Error(`"${missing.name}" is no longer available. Please remove it from your cart.`));
      const tooMany = cart.find(i => i.qty > MAX_QTY_PER_ITEM);
      if(tooMany) return reject(new Error(`Only ${MAX_QTY_PER_ITEM} of "${tooMany.name}" can be ordered at once.`));
      resolve(true);
    }, 600);
  });
}

function processPayment(method, amount){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      if(!PAY_LABELS[method]) return reject(new Error('Please choose a payment method.'));
      if(method === 'cod' && amount > COD_LIMIT){
        return reject(new Error(`Cash on Delivery is available for orders up to ${formatPrice(COD_LIMIT)}. Please choose another payment method.`));
      }
      resolve({ transactionId: 'TXN' + Date.now().toString().slice(-8), method });
    }, 1400);
  });
}

function setPlacingState(btn, text){
  if(!btn) return;
  if(text){
    btn.dataset.label = btn.dataset.label || btn.textContent;
    btn.disabled = true;
    btn.classList.add('is-loading');
    btn.innerHTML = `<span class="btn-spinner" aria-hidden="true"></span>${text}`;
  } else {
    btn.disabled = false;
    btn.classList.remove('is-loading');
    btn.textContent = btn.dataset.label || 'Place Order';
  }
}

async function placeOrder(e){
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  if(btn?.disabled) return;                 // ignore double clicks while pending
  const cart = getCart();
  if(cart.length === 0){ showToast('Your cart is empty', 'error'); return; }

  let valid = true;
  Object.entries(CHECKOUT_RULES).forEach(([id, rule])=>{
    const input = form.querySelector('#'+id);
    if(input) valid = validateField(input.closest('.field'), rule(input.value.trim())) && valid;
  });
  if(!valid){
    showToast('Please complete the required fields','error');
    form.querySelector('.field.invalid input')?.focus();
    return;
  }

  const totals = computeTotals(cart);
  const method = form.querySelector('input[name="pay"]:checked')?.value;

  try{
    setPlacingState(btn, 'Checking stock…');
    await verifyStock(cart);

    setPlacingState(btn, 'Processing payment…');
    const payment = await processPayment(method, totals.total);

    // Both Promises resolved — save the order.
    const order = {
      id: 'AUR' + Math.floor(100000+Math.random()*900000),
      date: new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }),
      items: cart,
      total: totals.total,
      payment: PAY_LABELS[payment.method],
      transactionId: payment.transactionId,
      status: 'processing'
    };
    const orders = Store.get('aurelia_orders', []);
    orders.unshift(order);
    Store.set('aurelia_orders', orders);
    setCart([]);
    setCouponCode(null);

    const info = document.getElementById('successOrderInfo');
    if(info) info.textContent = `Order ${order.id} · ${order.payment} · ${formatPrice(order.total, 2)}`;
    document.getElementById('successModal').classList.add('show');
  } catch(err){
    // Any rejected Promise lands here.
    showToast(err.message || 'Something went wrong. Please try again.', 'error');
  } finally {
    setPlacingState(btn, null);
  }
}

function closeSuccessModal(){
  document.getElementById('successModal').classList.remove('show');
  window.location.href = 'orders.html';
}

/* ---------- Orders Page ---------- */
function renderOrdersPage(){
  const wrap = document.getElementById('ordersWrap');
  if(!wrap) return;
  const orders = Store.get('aurelia_orders', []);
  if(orders.length===0){
    wrap.innerHTML = emptyStateHTML('📦', 'No orders yet', 'Once you place an order, it will show up here.', 'products.html', 'Start Shopping');
    return;
  }
  const steps = ['Placed','Processing','Shipped','Delivered'];
  const stepIndex = { processing:2, transit:3, delivered:4 };
  wrap.innerHTML = orders.map(o=>{
    const activeIdx = stepIndex[o.status] || 1;
    const label = o.status === 'transit' ? 'In Transit' : o.status.charAt(0).toUpperCase()+o.status.slice(1);
    return `
    <div class="order-card">
      <div class="order-top">
        <div><strong>Order ${o.id}</strong><div style="font-size:.8rem;color:var(--text-dim)">${o.date}${o.payment ? ' · ' + o.payment : ''}</div></div>
        <span class="order-status ${o.status}">${label}</span>
      </div>
      <div class="order-track">
        ${steps.map((s,i)=>`<div class="track-step ${i < activeIdx ? 'done':''}"><div class="track-dot"></div><span>${s}</span></div>`).join('')}
      </div>
      <div class="order-thumbs">
        ${o.items.map(i=>`<img src="${i.img}" alt="${i.name}" onerror="productImgFallback(this)">`).join('')}
      </div>
      <div class="order-foot">
        <span style="color:var(--text-dim);">${o.items.reduce((s,i)=>s+i.qty,0)} item(s)</span>
        <strong>${formatPrice(o.total, 2)}</strong>
      </div>
    </div>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderCartPage();
  renderWishlistPage();
  renderCheckoutSummary();
  renderOrdersPage();
  const checkoutForm = document.getElementById('checkoutForm');
  checkoutForm?.addEventListener('submit', placeOrder);
  checkoutForm?.querySelectorAll('.field input').forEach(el=>
    el.addEventListener('input', ()=> el.closest('.field').classList.remove('invalid')));
  document.getElementById('applyCouponBtn')?.addEventListener('click', applyCoupon);
  document.getElementById('couponInput')?.addEventListener('keydown', e=>{ if(e.key === 'Enter') applyCoupon(); });
});
