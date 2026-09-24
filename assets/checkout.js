var PADDLE_TOKEN = 'live_8220a4ab81c91e922ae3581e66e';
var PRICES = { monthly: 'pri_01m39kr4dq1zbg6vx4ma2mv82b', yearly: 'pri_01m39ksby33hqm2hvtc7feqd20' };
var LICENSE_API = 'https://dashboard.my-own-recipe-book.com/pptx-billing';
var claimStorageKey = 'pptx-purchase-claim';
var currentClaim = null;
var claiming = false;
try { currentClaim = JSON.parse(sessionStorage.getItem(claimStorageKey)); } catch (e) {}
var paddleReady = false;
var checkoutTimer = null;
var checkoutPending = false;
// Paddle.js event -> funnel step. Names only; never the customer's email
// or payment details. `purchase_completed` here is the client-side signal,
// the source of truth for revenue stays in the Paddle dashboard.
var PADDLE_EVENTS = {
  'checkout.loaded': 'checkout_loaded',
  'checkout.customer.created': 'checkout_email_entered',
  'checkout.payment.selected': 'checkout_payment_selected',
  'checkout.payment.failed': 'payment_failed',
  'checkout.error': 'checkout_error',
  'checkout.closed': 'checkout_closed',
  'checkout.completed': 'purchase_completed'
};
var currentPlan = null;
var currentPlacement = null;
// A checkout that fails to open must not dead-end the buyer: reveal the
// e-mail order right where they clicked.
function showOrderFallback() {
  clearTimeout(checkoutTimer);
  checkoutPending = false;
  var els = document.querySelectorAll('.order-fallback');
  for (var i = 0; i < els.length; i++) els[i].style.display = 'block';
}
function hideOrderFallback() {
  var els = document.querySelectorAll('.order-fallback');
  for (var i = 0; i < els.length; i++) els[i].style.display = 'none';
}
function trackCheckout(name, props) {
  // Analytics must never prevent a customer from opening checkout.
  try { if (window.track) window.track(name, props); } catch (e) {}
}
function onPaddleEvent(ev) {
  var name = ev && PADDLE_EVENTS[ev.name];
  if (name === 'checkout_loaded' || name === 'checkout_closed' || name === 'purchase_completed') {
    clearTimeout(checkoutTimer);
    checkoutPending = false;
  }
  if (name === 'checkout_loaded') hideOrderFallback();
  if (name === 'checkout_error') showOrderFallback();
  if (name === 'purchase_completed' && currentClaim) {
    currentClaim.transactionId = ev.data && ev.data.transaction_id;
    try { sessionStorage.setItem(claimStorageKey, JSON.stringify(currentClaim)); } catch (e) {}
    claimLicense();
  }
  if (!name) return;
  var d = ev.data || {};
  trackCheckout(name, {
    plan: currentPlan,
    placement: currentPlacement,
    transaction_id: d.transaction_id || d.id || null,
    currency: d.currency_code || null,
    country: d.customer && d.customer.address ? d.customer.address.country_code : null,
    error_code: (ev.error && ev.error.code) || ev.code || null
  });
}
// When Paddle is actually up, the page must stop telling people that
// checkout is not ready yet — that line costs sales the moment it is wrong.
document.addEventListener('DOMContentLoaded', function () {
  if (currentClaim && currentClaim.transactionId) claimLicense();
});
function buyPro(plan, placement) {
  if (plan !== 'monthly' && plan !== 'yearly') return false;
  if (checkoutPending) return false;
  currentPlan = plan;
  currentPlacement = placement || null;
  trackCheckout('checkout_clicked', { plan: plan, placement: currentPlacement, paddle_ready: paddleReady });
  if (window.Paddle) {
    hideOrderFallback();
    checkoutPending = true;
    openCheckout(plan).catch(function () {
      showOrderFallback();
      trackCheckout('checkout_error', { plan: plan, error_code: 'checkout_open_failed' });
    });
  } else {
    showOrderFallback();
  }
  return false;
}

async function api(path, data) {
  var controller = new AbortController();
  var timeout = setTimeout(function () { controller.abort(); }, 10000);
  try {
    var response = await fetch(LICENSE_API + path, {
      method: data ? 'POST' : 'GET',
      headers: data ? { 'Content-Type': 'application/json' } : {},
      body: data ? JSON.stringify(data) : undefined,
      signal: controller.signal,
      credentials: 'omit'
    });
    if (!response.ok) throw new Error('service_unavailable');
    return await response.json();
  } finally { clearTimeout(timeout); }
}
async function openCheckout(plan) {
  // Do not collect money when fulfillment has not been configured.
  await paddleInitialization;
  if (!paddleReady) throw new Error('checkout_not_ready');
  if (!(await api('/health')).configured) throw new Error('billing_not_configured');
  var bytes = crypto.getRandomValues(new Uint8Array(32));
  var claimToken = Array.from(bytes, function (b) { return b.toString(16).padStart(2, '0'); }).join('');
  var digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(claimToken));
  var claimHash = Array.from(new Uint8Array(digest), function (b) { return b.toString(16).padStart(2, '0'); }).join('');
  currentClaim = { claimToken: claimToken };
  // Save before payment so refresh/retry can recover the same purchase.
  sessionStorage.setItem(claimStorageKey, JSON.stringify(currentClaim));
  checkoutTimer = setTimeout(function () {
    showOrderFallback();
    trackCheckout('checkout_error', { plan: plan, error_code: 'checkout_load_timeout' });
  }, 15000);
  Paddle.Checkout.open({ items: [{ priceId: PRICES[plan], quantity: 1 }], customData: { license_claim_hash: claimHash } });
}
async function claimLicense() {
  if (claiming || !currentClaim || !/^txn_[a-z0-9]{26}$/.test(currentClaim.transactionId || '')) return;
  claiming = true;
  var panel = document.getElementById('purchase-result');
  var message = document.getElementById('purchase-message');
  var retry = document.getElementById('retry-license');
  panel.hidden = false;
  retry.hidden = true;
  message.textContent = 'Confirming your payment and preparing your license…';
  try {
    for (var attempt = 0; attempt < 30; attempt++) {
      var result = await api('/licenses/claim', currentClaim);
      if (result.licenseKey) {
        document.getElementById('purchase-key').value = result.licenseKey;
        document.getElementById('license-key-box').hidden = false;
        message.textContent = 'Save your license key, then paste it into the Pro screen in the Figma plugin.';
        return;
      }
      await new Promise(function (resolve) { setTimeout(resolve, 2000); });
    }
    throw new Error('confirmation_pending');
  } catch (e) {
    message.textContent = 'Payment confirmation is taking longer than expected. Do not pay again. Retry here, or contact ttrttr449@gmail.com with your Paddle receipt.';
    retry.hidden = false;
  } finally { claiming = false; }
}
async function copyLicense() {
  var input = document.getElementById('purchase-key');
  input.select();
  try { await navigator.clipboard.writeText(input.value); }
  catch (e) { document.getElementById('purchase-message').textContent = 'Press Ctrl+C / Cmd+C to copy the selected license key.'; }
}

// Set up callbacks before initialization: Paddle may immediately emit an event
// when this page is used as the default payment link for a transaction.
var paddleInitialization = (async function () {
  if (PADDLE_TOKEN.indexOf('live_') !== 0 || !window.Paddle) return;
  try {
    // Initialization may automatically open _ptxn payment links. Gate it too.
    if (!(await api('/health')).configured) throw new Error('billing_not_configured');
    Paddle.Initialize({ token: PADDLE_TOKEN, pwCustomer: {}, eventCallback: onPaddleEvent });
    paddleReady = true;
    var notes = document.querySelectorAll('.checkout-note');
    for (var i = 0; i < notes.length; i++) notes[i].textContent = 'Secure checkout by Paddle · 14-day money-back guarantee · license key shown after payment';
  } catch (e) {
    showOrderFallback();
    trackCheckout('checkout_error', { error_code: 'checkout_init_failed' });
  }
})();
