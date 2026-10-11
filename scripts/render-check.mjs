// Render pages in headless Chrome (CDP) with real mobile emulation and report:
// JS errors, failed requests, elements wider than the viewport, nav presence, plus a screenshot per page.
//
// usage: node scripts/render-check.mjs <outDir> <width> <height> <mobile 0|1> <url1> [url2 ...]
//   e.g. node scripts/render-check.mjs .render 390 844 1 "http://localhost/junior-coders-git-lab/Learning%20JS/module1.html"
// env:  PORT=9333 (devtools port)  THEME=dark|light  CHROME=<path to chrome.exe>
//       CLICK=<css selector>  click this element after load (e.g. open the phone menu) before measuring/screenshotting
// Prints JSON per page, then a summary line listing pages with horizontal scroll or errors.
// Needs Chrome installed and the site served (XAMPP Apache). Keep <outDir> out of git (.render/ is ignored).
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';
import { openSync } from 'node:fs';

const [outDir, W, H, MOBILE, ...urls] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = +(process.env.PORT || 9333);

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  `--remote-debugging-port=${PORT}`, '--window-size=1280,900',
  `--user-data-dir=${resolve(outDir, 'profile')}`, 'about:blank'
], { stdio: ['ignore', openSync(resolve(outDir, 'chrome-out.log'), 'w'), openSync(resolve(outDir, 'chrome-err.log'), 'w')] });
chrome.on('exit', (code, sig) => console.error('chrome exited', code, sig));
chrome.on('error', (e) => console.error('spawn error', e.message));

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function waitForDevtools() {
  let lastErr = null;
  for (let i = 0; i < 120; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) return await r.json(); } catch (e) { lastErr = e; }
    await sleep(250);
  }
  throw new Error('chrome did not start: ' + (lastErr && lastErr.message));
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); this.events = []; this.listeners = [];
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) { const { res, rej } = this.pending.get(msg.id); this.pending.delete(msg.id); msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result); }
      else if (msg.method) { this.events.push(msg); this.listeners.forEach(l => l(msg)); }
    });
  }
  send(method, params = {}) { return new Promise((res, rej) => { const id = ++this.id; this.pending.set(id, { res, rej }); this.ws.send(JSON.stringify({ id, method, params })); }); }
  on(fn) { this.listeners.push(fn); }
}

async function openTab(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej); });
  return new CDP(ws);
}

try {
  await waitForDevtools();
  const results = [];
  for (const url of urls) {
    const r = await (await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent('about:blank')}`, { method: 'PUT' })).json();
    const cdp = await openTab(r.webSocketDebuggerUrl);
    const logs = [];
    cdp.on(m => {
      if (m.method === 'Runtime.exceptionThrown') logs.push('EXC ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text));
      if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type)) logs.push(m.params.type.toUpperCase() + ' ' + m.params.args.map(a => a.value ?? a.description).join(' '));
      if (m.method === 'Network.loadingFailed') logs.push('NETFAIL ' + m.params.errorText);
      if (m.method === 'Network.responseReceived' && m.params.response.status >= 400) logs.push(`HTTP ${m.params.response.status} ${m.params.response.url}`);
    });
    await cdp.send('Runtime.enable');
    await cdp.send('Network.enable');
    await cdp.send('Page.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: +W, height: +H, deviceScaleFactor: 1, mobile: MOBILE === '1' });
    if (MOBILE === '1') await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true });
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: process.env.THEME || 'light' }] });
    await cdp.send('Page.navigate', { url });
    await sleep(1800);

    if (process.env.CLICK) {
      await cdp.send('Runtime.evaluate', { expression: `(() => { const el = document.querySelector(${JSON.stringify(process.env.CLICK)}); if (el) el.click(); return !!el; })()` });
      await sleep(700);
    }
    const probe = await cdp.send('Runtime.evaluate', { returnByValue: true, expression: `(() => {
      const de = document.documentElement;
      const wide = [...document.querySelectorAll('body *')].filter(el => {
        const r = el.getBoundingClientRect();
        if (r.right <= de.clientWidth + 1 || getComputedStyle(el).position === 'fixed') return false;
        // ignore content inside sideways-scrolling rows, and off-canvas menus/drawers
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          const cs = getComputedStyle(p);
          if (/(auto|scroll|hidden)/.test(cs.overflowX) || cs.position === 'fixed' || cs.transform !== 'none') return false;
        }
        return true;
      }).slice(0, 8).map(el => el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0, 3).join('.') : '') + ' right=' + Math.round(el.getBoundingClientRect().right));
      return {
        viewport: de.clientWidth, scrollWidth: de.scrollWidth, bodyScrollWidth: document.body.scrollWidth,
        theme: de.getAttribute('data-theme'), title: document.title, wide
      }; })()` });
    const name = (decodeURIComponent(new URL(url).pathname).replace(/^\/+/, '').replace(/\/index\.html$/, '').replace(/\/$/, '') || 'index').replace(/[^a-z0-9._-]+/gi, '_');
    const shot = await cdp.send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(outDir, `${name}.png`), Buffer.from(shot.data, 'base64'));
    results.push({ url, ...(probe.result && probe.result.value || { probeError: JSON.stringify(probe).slice(0, 300) }), logs });
    cdp.ws.close();
  }
  console.log(JSON.stringify(results, null, 1));
  const bad = results.filter(r => r.scrollWidth > r.viewport || (r.logs && r.logs.length) || r.probeError);
  console.log(`SUMMARY: ${results.length} page(s) checked, ${bad.length} with problems` + bad.map(r => `
  - ${decodeURIComponent(r.url)}: ${r.scrollWidth > r.viewport ? 'horizontal scroll (' + r.scrollWidth + 'px); ' : ''}${(r.logs || []).join(' | ')}${r.probeError || ''}`).join(''));
} finally {
  chrome.kill();
}
