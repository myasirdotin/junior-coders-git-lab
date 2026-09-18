/**
 * Junior Coders - Playground Engine
 * Handles live code execution and previews for HTML, CSS, and JS.
 */

(function() {
    'use strict';

    const Playground = {
        // Helper: Tab Indentation (2 spaces) without losing focus
        enableTabIndentation: function(textarea) {
            if (!textarea) return;
            textarea.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = this.selectionStart;
                    const end = this.selectionEnd;
                    const val = this.value;
                    this.value = val.substring(0, start) + '  ' + val.substring(end);
                    this.selectionStart = this.selectionEnd = start + 2;
                    this.dispatchEvent(new Event('input'));
                }
            });
        },

        // --- HTML Playground ---
        initHTML: function() {
            const editor = document.getElementById('code-editor');
            const preview = document.getElementById('preview');
            if (!editor || !preview) return;

            this.enableTabIndentation(editor);

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

            this.enableTabIndentation(htmlEditor);
            this.enableTabIndentation(cssEditor);

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

            this.enableTabIndentation(editor);

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
                this.enableTabIndentation(ed);
                ed.addEventListener('input', () => {
                    // Debounce update to avoid lag
                    clearTimeout(window.previewTimeout);
                    window.previewTimeout = setTimeout(updatePreview, 400);
                });
            });

            // 7. Starter Templates
            const STARTER_TEMPLATES = {
                default: {
                    html: `<h1>My Awesome Project</h1>\n<p>Type something to see it update live!</p>\n<button id="demo-btn">Click Me 🚀</button>`,
                    css: `body {\n  font-family: 'Outfit', sans-serif;\n  background: #0f172a;\n  color: #f8fafc;\n  text-align: center;\n  padding: 3rem 1rem;\n}\n\nh1 {\n  color: #6366f1;\n  margin-bottom: 0.5rem;\n}\n\nbutton {\n  background: #6366f1;\n  color: white;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\nbutton:hover {\n  background: #4f46e5;\n  transform: scale(1.05);\n}`,
                    js: `const btn = document.getElementById('demo-btn');\nbtn.addEventListener('click', () => {\n  console.log('Button clicked! Great job! 🚀');\n  alert('Hello Junior Coder! 🚀');\n});`
                },
                profile: {
                    html: `<div class="profile-card">\n  <div class="avatar">👨‍💻</div>\n  <h2>Junior Coder</h2>\n  <p class="tagline">Future Full-Stack Web Engineer</p>\n  <div class="skills">\n    <span>HTML5</span>\n    <span>CSS3</span>\n    <span>JavaScript</span>\n  </div>\n  <button id="like-btn">❤️ Applaud Profile (<span id="likes">0</span>)</button>\n</div>`,
                    css: `body {\n  font-family: 'Outfit', sans-serif;\n  background: #0f172a;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  margin: 0;\n}\n\n.profile-card {\n  background: #1e293b;\n  border: 1px solid rgba(255,255,255,0.1);\n  border-radius: 16px;\n  padding: 2.5rem 2rem;\n  text-align: center;\n  color: #f8fafc;\n  width: 290px;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.5);\n}\n\n.avatar {\n  font-size: 3.5rem;\n  margin-bottom: 0.5rem;\n}\n\n.tagline {\n  color: #94a3b8;\n  font-size: 0.9rem;\n  margin-bottom: 1.25rem;\n}\n\n.skills {\n  display: flex;\n  gap: 0.5rem;\n  justify-content: center;\n  margin-bottom: 1.5rem;\n}\n\n.skills span {\n  background: rgba(99,102,241,0.2);\n  color: #818cf8;\n  border: 1px solid rgba(99,102,241,0.3);\n  padding: 0.25rem 0.6rem;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n\nbutton {\n  background: #f43f5e;\n  color: white;\n  border: none;\n  padding: 0.65rem 1.25rem;\n  border-radius: 8px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 0.15s;\n}\n\nbutton:active {\n  transform: scale(0.95);\n}`,
                    js: `let count = 0;\nconst likeBtn = document.getElementById('like-btn');\nconst likesSpan = document.getElementById('likes');\n\nlikeBtn.addEventListener('click', () => {\n  count++;\n  likesSpan.textContent = count;\n  console.log('Profile applauded! Total count:', count);\n});`
                },
                counter: {
                    html: `<div class="counter-box">\n  <h1>Interactive Counter</h1>\n  <div id="counter-value">0</div>\n  <div class="controls">\n    <button id="dec-btn">- Decrement</button>\n    <button id="reset-btn">Reset</button>\n    <button id="inc-btn">+ Increment</button>\n  </div>\n</div>`,
                    css: `body {\n  font-family: 'Outfit', sans-serif;\n  background: #0f172a;\n  color: white;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  margin: 0;\n}\n\n.counter-box {\n  text-align: center;\n  background: #1e293b;\n  padding: 2.5rem 3rem;\n  border-radius: 16px;\n  border: 1px solid rgba(255,255,255,0.1);\n  box-shadow: 0 10px 25px rgba(0,0,0,0.5);\n}\n\n#counter-value {\n  font-size: 4.5rem;\n  font-weight: 800;\n  color: #38bdf8;\n  margin: 1rem 0;\n}\n\n.controls {\n  display: flex;\n  gap: 0.75rem;\n}\n\nbutton {\n  background: #334155;\n  color: white;\n  border: none;\n  padding: 0.65rem 1rem;\n  border-radius: 8px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: 0.2s;\n}\n\nbutton:hover {\n  background: #475569;\n}\n\n#inc-btn {\n  background: #10b981;\n}\n#inc-btn:hover {\n  background: #059669;\n}\n\n#dec-btn {\n  background: #ef4444;\n}\n#dec-btn:hover {\n  background: #dc2626;\n}`,
                    js: `let value = 0;\nconst display = document.getElementById('counter-value');\n\ndocument.getElementById('inc-btn').addEventListener('click', () => {\n  value++;\n  display.textContent = value;\n  console.log('Incremented to', value);\n});\n\ndocument.getElementById('dec-btn').addEventListener('click', () => {\n  value--;\n  display.textContent = value;\n  console.log('Decremented to', value);\n});\n\ndocument.getElementById('reset-btn').addEventListener('click', () => {\n  value = 0;\n  display.textContent = value;\n  console.log('Reset counter');\n});`
                },
                blank: {
                    html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>My Project</title>\n</head>\n<body>\n  <!-- Start building your creation -->\n  <h1>Clean Slate</h1>\n</body>\n</html>`,
                    css: `/* Add your custom styles here */\nbody {\n  margin: 0;\n  padding: 2rem;\n  font-family: 'Outfit', sans-serif;\n  background: #0f172a;\n  color: white;\n}`,
                    js: `// Add your logic here\nconsole.log('Clean slate ready! Happy building!');`
                }
            };

            const templateSelect = document.getElementById('ide-template-select');
            if (templateSelect) {
                templateSelect.addEventListener('change', (e) => {
                    const chosen = STARTER_TEMPLATES[e.target.value];
                    if (chosen) {
                        htmlEditor.value = chosen.html;
                        cssEditor.value = chosen.css;
                        jsEditor.value = chosen.js;
                        updatePreview();
                        logToIDE(`Loaded ${e.target.options[e.target.selectedIndex].text}`);
                        if (window.showToast) {
                            window.showToast('Starter template loaded! 🎨');
                        }
                    }
                });
            }

            // 8. Standalone Project Exporter
            const exportBtn = document.getElementById('export-project-btn');
            if (exportBtn) {
                exportBtn.addEventListener('click', () => {
                    const html = htmlEditor.value;
                    const css = cssEditor.value;
                    const js = jsEditor.value;

                    const standalone = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Junior Coders Project</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
${css}
  </style>
</head>
<body>
${html}

  <script>
${js}
  <\/script>
</body>
</html>`;

                    const blob = new Blob([standalone], { type: 'text/html;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'my-junior-coders-project.html';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);

                    if (window.showToast) {
                        window.showToast('Project downloaded! Open it directly in your browser 🚀', 'success');
                    } else {
                        logToIDE('Project downloaded as my-junior-coders-project.html!');
                    }
                });
            }

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
