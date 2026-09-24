import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { webcrypto } from 'node:crypto';

const code = readFileSync(new URL('../assets/checkout.js', import.meta.url), 'utf8');
function setup(options = {}) {
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, { style: {}, hidden: true, textContent: '', value: '', select() {} });
    return elements.get(id);
  };
  const callbacks = {}, timers = new Map(), storage = new Map();
  const calls = [], events = [];
  let nextTimer = 0;
  const paddle = {
    Initialize(config) { callbacks.paddle = config.eventCallback; callbacks.config = config; if (options.initThrows) throw Error('init'); },
    Checkout: { open(config) { if (options.openThrows) throw Error('open'); calls.push(config); } }
  };
  const context = vm.createContext({
    document: { querySelectorAll: s => [element(s)], getElementById: element, addEventListener: (name, cb) => { callbacks[name] = cb; } },
    crypto: webcrypto, TextEncoder, Uint8Array, AbortController,
    sessionStorage: { getItem: k => storage.get(k) || null, setItem: (k,v) => storage.set(k,v) },
    setTimeout: cb => { timers.set(++nextTimer, cb); return nextTimer; }, clearTimeout: id => timers.delete(id),
    fetch: async (url, init) => {
      if (options.fetch) return options.fetch(url, init);
      return Response.json(url.endsWith('/health') ? { configured: options.configured !== false } : { licenseKey: 'FPTX-' + ['AB12CD34','EF56AB78','CD90EF12','AB34CD56'].join('-') });
    },
    navigator: { clipboard: { writeText: async () => {} } },
    track: (name, props) => { if (options.analyticsThrows) throw Error('analytics'); events.push({ name, props }); }
  });
  context.window = context;
  if (!options.missingPaddle) context.Paddle = paddle;
  vm.runInContext(code, context);
  callbacks.DOMContentLoaded();
  return { context, callbacks, calls, events, timers, element, storage };
}
async function settle() { for (let i = 0; i < 20; i++) await new Promise(setImmediate); }

test('monthly checkout is tied to a private claim; Paddle receives only its hash', async () => {
  const s = setup(); assert.equal(s.context.buyPro('monthly', 'hero'), false); await settle();
  assert.equal(s.calls.length, 1);
  assert.equal(s.calls[0].items[0].priceId, 'pri_01kxesst98ht76dsatz6hx81pt');
  const claim = JSON.parse(s.storage.get('pptx-purchase-claim'));
  assert.equal(claim.claimToken.length, 64);
  assert.equal(s.calls[0].customData.license_claim_hash.length, 64);
  assert.notEqual(s.calls[0].customData.license_claim_hash, claim.claimToken);
  assert.deepEqual(Object.keys(s.callbacks.config.pwCustomer), []);
  s.callbacks.paddle({ name: 'checkout.loaded' }); assert.equal(s.timers.size, 0);
});
test('unconfigured fulfillment does not open checkout', async () => {
  const s = setup({ configured: false }); s.context.buyPro('yearly'); await settle();
  assert.equal(s.calls.length, 0); assert.equal(s.element('.order-fallback').style.display, 'block');
});
test('missing Paddle, synchronous errors and SDK timeout show fallback', async () => {
  for (const options of [{ missingPaddle: true }, { initThrows: true }, { openThrows: true }]) {
    const s = setup(options); s.context.buyPro('yearly'); await settle();
    assert.equal(s.element('.order-fallback').style.display, 'block');
  }
  const s = setup(); s.context.buyPro('yearly'); await settle();
  for (const callback of [...s.timers.values()]) callback();
  assert.equal(s.element('.order-fallback').style.display, 'block');
  s.callbacks.paddle({ name: 'checkout.loaded' });
  assert.equal(s.element('.order-fallback').style.display, 'none');
});
test('analytics failure and duplicate clicks cannot break or duplicate checkout', async () => {
  const s = setup({ analyticsThrows: true }); s.context.buyPro('monthly'); s.context.buyPro('monthly'); await settle();
  assert.equal(s.calls.length, 1);
});
test('completion retrieves key from backend and never invents a browser-side license', async () => {
  const s = setup(); s.context.buyPro('yearly'); await settle();
  s.callbacks.paddle({ name: 'checkout.completed', data: { transaction_id: 'txn_' + 'a'.repeat(26) } }); await settle();
  assert.equal(s.element('license-key-box').hidden, false);
  assert.ok(s.element('purchase-key').value.startsWith('FPTX-'));
  assert.ok(!JSON.stringify(s.events).includes(JSON.parse(s.storage.get('pptx-purchase-claim')).claimToken));
});
test('server failure after payment tells buyer not to pay again', async () => {
  const s = setup({ fetch: async url => url.endsWith('/health') ? Response.json({ configured: true }) : new Response('', { status: 503 }) });
  s.context.buyPro('yearly'); await settle();
  s.callbacks.paddle({ name: 'checkout.completed', data: { transaction_id: 'txn_' + 'a'.repeat(26) } }); await settle();
  assert.equal(s.element('retry-license').hidden, false);
  assert.ok(s.element('purchase-message').textContent.includes('Do not pay again'));
  assert.equal(s.element('license-key-box').hidden, true);
});
