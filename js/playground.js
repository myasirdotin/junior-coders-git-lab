/**
 * Junior Coders - Playground Engine
 * Handles live code execution and previews for HTML, CSS, and JS.
 */

(function() {
    'use strict';

    const Playground = {
        // --- HTML Playground ---
        initHTML: function() {
            const editor = document.getElementById('code-editor');
            const preview = document.getElementById('preview');
            if (!editor || !preview) return;

            const update = () => {
                const content = editor.value;
                const iframe = preview.querySelector('iframe') || document.createElement('iframe');
                if (!preview.contains(iframe)) {
                    iframe.title = 'HTML preview';
                    iframe.setAttribute('sandbox', 'allow-scripts');
                    iframe.style.width = '100%'; iframe.style.height = '100%'; iframe.style.border = 'none';
                    preview.innerHTML = ''; preview.appendChild(iframe);
                }
                iframe.srcdoc = content;
            };

            editor.addEventListener('input', update);
            update();
        },

        // --- CSS Playground ---
        initCSS: function() {
            const htmlEditor = document.getElementById('html-editor');
            const cssEditor = document.getElementById('css-editor');
            const preview = document.getElementById('preview');
            if (!htmlEditor || !cssEditor || !preview) return;

            const update = () => {
                const html = htmlEditor.value;
                const css = cssEditor.value;
                const iframe = preview.querySelector('iframe') || document.createElement('iframe');
                if (!preview.contains(iframe)) {
                    iframe.title = 'CSS preview';
                    iframe.setAttribute('sandbox', 'allow-scripts');
                    iframe.style.width = '100%'; iframe.style.height = '100%'; iframe.style.border = 'none';
                    preview.innerHTML = ''; preview.appendChild(iframe);
                }
                iframe.srcdoc = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}</body></html>`;
            };

            [htmlEditor, cssEditor].forEach(el => el.addEventListener('input', update));
            update();
        },

        // --- JS Playground ---
        initJS: function() {
            const editor = document.getElementById('code-editor');
            const consoleEl = document.getElementById('console');
            if (!editor || !consoleEl) return;

            const runner = document.createElement('iframe');
            runner.hidden = true;
            runner.title = 'JavaScript code runner';
            runner.setAttribute('sandbox', 'allow-scripts');
            document.body.appendChild(runner);

            const logToConsole = (message, isError = false) => {
                const entry = document.createElement('div');
                entry.className = isError ? 'log-entry error-entry' : 'log-entry';
                entry.textContent = isError ? `Error: ${message}` : message;
                consoleEl.appendChild(entry);
                consoleEl.scrollTop = consoleEl.scrollHeight;
            };

            window.addEventListener('message', (event) => {
                if (event.source !== runner.contentWindow || !event.data?.type) return;
                if (event.data.type === 'log') logToConsole(event.data.data);
                if (event.data.type === 'error') logToConsole(event.data.data, true);
            });

            window.runJS = () => {
                consoleEl.innerHTML = '<div class="info-entry">--- Running... ---</div>';
                runner.srcdoc = `<!DOCTYPE html><script>
                    const send = (type, data) => parent.postMessage({ type, data }, '*');
                    console.log = (...args) => send('log', args.map(String).join(' '));
                    window.onerror = message => send('error', message);
                    try { ${editor.value} } catch (error) { send('error', error.message); }
                <\/script>`;
            };
        },

        checkPendingExercise: function() {
            const pending = localStorage.getItem('pendingExercise');
            if (!pending) return;

            try {
                const exercise = JSON.parse(pending);
                const title = exercise.title || 'Practice Mission';
                const htmlCode = exercise.html || (exercise.type !== 'css' && exercise.type !== 'js' ? exercise.starterCode : '') || '';
                const cssCode = exercise.css || (exercise.type === 'css' ? exercise.starterCode : '') || '';
                const jsCode = exercise.js || (exercise.type === 'js' ? exercise.starterCode : '') || '';
                const instructions = exercise.instructions || '';
                const level = exercise.level || 'Practice';
                const sourceUrl = exercise.sourceUrl || '';
                const sourceTitle = exercise.sourceTitle || 'Book Chapter';

                // 1. If inside Master Playground (master-html, master-css, master-js)
                const masterHtml = document.getElementById('master-html');
                const masterCss = document.getElementById('master-css');
                const masterJs = document.getElementById('master-js');
                const masterConsole = document.getElementById('master-console');

                if (masterHtml && masterCss) {
                    if (htmlCode) masterHtml.value = htmlCode;
                    if (cssCode) masterCss.value = cssCode;
                    if (jsCode && masterJs) masterJs.value = jsCode;

                    // Tab switching
                    if (exercise.type === 'css' || (!htmlCode && cssCode)) {
                        const cssTab = document.querySelector('.ide-tab[data-tab="css"]');
                        if (cssTab) cssTab.click();
                    } else if (exercise.type === 'js' || (!htmlCode && !cssCode && jsCode)) {
                        const jsTab = document.querySelector('.ide-tab[data-tab="js"]');
                        if (jsTab) jsTab.click();
                    } else {
                        const htmlTab = document.querySelector('.ide-tab[data-tab="html"]');
                        if (htmlTab) htmlTab.click();
                    }

                    // Display Mission Directive Banner
                    let missionBanner = document.getElementById('ide-mission-banner');
                    if (!missionBanner) {
                        missionBanner = document.createElement('div');
                        missionBanner.id = 'ide-mission-banner';
                        missionBanner.className = 'ide-mission-banner';
                        const container = document.querySelector('.master-playground-container');
                        if (container) {
                            container.parentNode.insertBefore(missionBanner, container);
                        } else {
                            document.body.insertBefore(missionBanner, document.body.firstChild);
                        }
                    }
                    const returnLinkHtml = sourceUrl ? `
                        <a href="${sourceUrl}" style="background: rgba(255,255,255,0.12); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3); padding: 0.25rem 0.65rem; border-radius: 6px; text-decoration: none; font-size: 0.8rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.3rem;">
                            <span>📖</span> Back to ${sourceTitle}
                        </a>
                    ` : '';

                    missionBanner.innerHTML = `
                        <div class="mission-banner-bar" style="background: linear-gradient(90deg, #1e1b4b, #312e81); border-bottom: 2px solid #6366f1; padding: 0.75rem 1.5rem; display: flex; align-items: center; justify-content: space-between; color: #fff; font-size: 0.95rem; gap: 1rem; flex-wrap: wrap;">
                            <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                                <span style="background: #4f46e5; color: #fff; font-weight: 700; font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 9999px; text-transform: uppercase;">${level}</span>
                                <strong>${title}</strong>
                                <span style="color: #cbd5e1;">${instructions}</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                ${returnLinkHtml}
                                <button type="button" onclick="this.closest('#ide-mission-banner').remove()" style="background: none; border: none; color: #94a3b8; font-size: 1.2rem; cursor: pointer; padding: 0 0.5rem;" title="Dismiss banner">✕</button>
                            </div>
                        </div>
                    `;

                    if (masterConsole) {
                        const entry = document.createElement('div');
                        entry.className = 'console-entry';
                        entry.textContent = `> Mission Loaded: ${title} [${level}]`;
                        masterConsole.appendChild(entry);
                    }
                } else {
                    // 2. Individual playgrounds
                    const htmlEd = document.getElementById('html-editor');
                    const cssEd = document.getElementById('css-editor');
                    const codeEd = document.getElementById('code-editor');
                    const consoleEl = document.getElementById('console');

                    if (htmlEd && htmlCode) htmlEd.value = htmlCode;
                    if (cssEd && cssCode) cssEd.value = cssCode;
                    if (codeEd) codeEd.value = htmlCode || cssCode || jsCode || exercise.starterCode || '';

                    // Trigger live preview refresh
                    if (htmlEd) htmlEd.dispatchEvent(new Event('input'));
                    if (cssEd) cssEd.dispatchEvent(new Event('input'));
                    if (codeEd) codeEd.dispatchEvent(new Event('input'));

                    // Check if dedicated lab mission banner exists in page
                    const missionBanner = document.getElementById('lab-mission-banner');
                    if (missionBanner) {
                        missionBanner.style.display = 'block';
                        const titleEl = missionBanner.querySelector('.mission-title');
                        if (titleEl) titleEl.textContent = title;
                        const descEl = missionBanner.querySelector('.mission-desc');
                        if (descEl) descEl.textContent = instructions;
                        const badgeEl = missionBanner.querySelector('.mission-badge');
                        if (badgeEl) badgeEl.textContent = level;
                    }

                    const reviewBtn = document.getElementById('review-book-btn');
                    if (reviewBtn && sourceUrl) {
                        reviewBtn.href = sourceUrl;
                        reviewBtn.style.display = 'inline-flex';
                        reviewBtn.innerHTML = `<span>📖</span> <span>Review in Book: ${sourceTitle}</span>`;
                    }

                    if (consoleEl) {
                        consoleEl.innerHTML = `<div class="info-entry">--- Mission Loaded: ${title} ---</div>`;
                    }
                }
            } catch (err) {
                console.warn('Error applying pending exercise:', err);
            } finally {
                localStorage.removeItem('pendingExercise');
            }
        },

        // --- Master Playground (Integrated IDE) ---
        initMaster: function() {
            const htmlEditor = document.getElementById('master-html');
            const cssEditor = document.getElementById('master-css');
            const jsEditor = document.getElementById('master-js');
            const preview = document.getElementById('master-preview');
            const consoleEl = document.getElementById('master-console');
            const tabs = document.querySelectorAll('.ide-tab');

            if (!htmlEditor || !preview) return;

            // 1. Tab Switching
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const target = tab.dataset.tab;
                    
                    // Update Tab UI
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    // Update Editor UI
                    document.querySelectorAll('.ide-textarea').forEach(tx => tx.classList.remove('active'));
                    document.getElementById(`master-${target}`).classList.add('active');
                });
            });

            // 2. Custom Console Hook
            const logToIDE = (msg, type = 'info') => {
                const entry = document.createElement('div');
                entry.className = `console-entry ${type === 'error' ? 'console-error' : ''}`;
                entry.textContent = `> ${msg}`;
                consoleEl.appendChild(entry);
                consoleEl.scrollTop = consoleEl.scrollHeight;
            };

            // 3. Update Preview
            const updatePreview = () => {
                const html = htmlEditor.value;
                const css = cssEditor.value;
                const js = jsEditor.value;

                const fullContent = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>${css}</style>
                    </head>
                    <body>
                        ${html}
                        <script>
                            // Catch console.log
                            const oldLog = console.log;
                            console.log = function(...args) {
                                window.parent.postMessage({ type: 'log', data: args.join(' ') }, '*');
                                oldLog.apply(console, args);
                            };
                            // Catch Errors
                            window.onerror = function(msg) {
                                window.parent.postMessage({ type: 'error', data: msg }, '*');
                            };
                            try {
                                ${js}
                            } catch(e) {
                                console.error(e);
                                window.parent.postMessage({ type: 'error', data: e.message }, '*');
                            }
                        <\/script>
                    </body>
                    </html>
                `;

                preview.srcdoc = fullContent;
            };

            // 4. Listen for logs from Iframe
            window.addEventListener('message', (e) => {
                if (e.source !== preview.contentWindow || !e.data?.type) return;
                if (e.data.type === 'log') logToIDE(e.data.data);
                if (e.data.type === 'error') logToIDE(e.data.data, 'error');
            });

            // 5. Viewport Switching Simulator
            const vpButtons = document.querySelectorAll('.viewport-btn');
            vpButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    vpButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    preview.style.width = btn.dataset.width;
                });
            });

            // 6. Setup Live Update
            [htmlEditor, cssEditor, jsEditor].forEach(ed => {
                ed.addEventListener('input', () => {
                    // Debounce update to avoid lag
                    clearTimeout(window.previewTimeout);
                    window.previewTimeout = setTimeout(updatePreview, 500);
                });
            });

            updatePreview();
        }
    };

    // Auto-detect which playground to initialize
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('master-html')) {
            Playground.initMaster();
            Playground.checkPendingExercise();
        } else if (document.getElementById('html-editor') && document.getElementById('css-editor')) {
            Playground.initCSS();
            Playground.checkPendingExercise();
        } else if (document.getElementById('console')) {
            Playground.initJS();
            Playground.checkPendingExercise();
        } else if (document.getElementById('code-editor')) {
            Playground.initHTML();
            Playground.checkPendingExercise();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (window.runJS) window.runJS();
        }
    });

})();
