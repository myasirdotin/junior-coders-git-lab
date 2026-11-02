/**
 * Checks every self-checked practice task (js/data/*-practice.js) in a real browser:
 * opens scripts/practice-selftest.html in headless Chrome, which runs each task's solution and starter
 * through js/practice-cards.js (JavaScript in a Worker, HTML/CSS in a frame, Python with Pyodide).
 *
 * usage: node scripts/check-practice.js [site base URL]
 *   default base: http://localhost/junior-coders-git-lab/ (the site must be served, e.g. XAMPP Apache)
 * env: PORT=9340 (devtools port), CHROME=<path to chrome.exe>
 * Needs internet the first time for Pyodide. Exit code 1 if any task has a problem.
 */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const base = (process.argv[2] || 'http://localhost/junior-coders-git-lab/').replace(/\/?$/, '/');
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = +(process.env.PORT || 9340);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'jc-practice-'));
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });

async function main() {
    let version = null;
    for (let i = 0; i < 120 && !version; i++) {
        try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) version = await r.json(); } catch (_) { await sleep(250); }
    }
    if (!version) throw new Error('Chrome did not start');
    const tab = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json();
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej); });
    let id = 0; const pending = new Map();
    ws.addEventListener('message', (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } });
    const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

    await send('Page.navigate', { url: base + 'scripts/practice-selftest.html' });
    const started = Date.now();
    while (Date.now() - started < 240000) {
        await sleep(1000);
        const r = await send('Runtime.evaluate', { expression: 'window.__practiceResult ? document.getElementById("out").textContent : null', returnByValue: true });
        const text = r && r.result && r.result.value;
        if (text) {
            console.log(text);
            const res = await send('Runtime.evaluate', { expression: 'window.__practiceResult.problems.length', returnByValue: true });
            return res.result.value;
        }
    }
    throw new Error('The self-test did not finish within 4 minutes (is the site served, and is the internet on for Pyodide?)');
}

main().then((n) => { chrome.kill(); process.exitCode = n ? 1 : 0; })
    .catch((err) => { console.error(err.message); chrome.kill(); process.exitCode = 1; });
