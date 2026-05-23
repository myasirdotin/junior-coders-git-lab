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
                    iframe.style.width = '100%'; iframe.style.height = '100%'; iframe.style.border = 'none';
                    preview.innerHTML = ''; preview.appendChild(iframe);
                }
                const doc = iframe.contentWindow.document;
                doc.open(); doc.write(content); doc.close();
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
                preview.innerHTML = html;
                const style = document.createElement('style');
                style.textContent = css;
                preview.prepend(style);
            };

            [htmlEditor, cssEditor].forEach(el => el.addEventListener('input', update));
            update();
        },

        // --- JS Playground ---
        initJS: function() {
            const editor = document.getElementById('code-editor');
            const consoleEl = document.getElementById('console');
            if (!editor || !consoleEl) return;

            // Hook into console.log
            const originalLog = console.log;
            console.log = function(...args) {
                originalLog.apply(console, args);
                const entry = document.createElement('div');
                entry.className = 'log-entry';
                entry.textContent = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
                consoleEl.appendChild(entry);
                consoleEl.scrollTop = consoleEl.scrollHeight;
            };

            window.runJS = () => {
                consoleEl.innerHTML = '<div class="info-entry">--- Running... ---</div>';
                try {
                    new Function(editor.value)();
                } catch (e) {
                    console.error(e);
                    const err = document.createElement('div');
                    err.className = 'log-entry error-entry';
                    err.textContent = 'Error: ' + e.message;
                    consoleEl.appendChild(err);
                }
            };
        },

        checkPendingExercise: function() {
            const pending = localStorage.getItem('pendingExercise');
            if (pending) {
                const exercise = JSON.parse(pending);
                const editor = document.getElementById('code-editor');
                const consoleEl = document.getElementById('console');
                
                if (editor) {
                    editor.value = exercise.starterCode;
                }
                if (consoleEl) {
                    consoleEl.innerHTML = `<div class="info-entry">--- Exercise: ${exercise.title} ---</div>`;
                }
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
                        </script>
                    </body>
                    </html>
                `;

                const doc = preview.contentWindow.document;
                doc.open();
                doc.write(fullContent);
                doc.close();
            };

            // 4. Listen for logs from Iframe
            window.addEventListener('message', (e) => {
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
        } else if (document.getElementById('html-editor') && document.getElementById('css-editor')) {
            Playground.initCSS();
        } else if (document.getElementById('console')) {
            Playground.initJS();
            Playground.checkPendingExercise();
        } else if (document.getElementById('code-editor')) {
            Playground.initHTML();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (window.runJS) window.runJS();
        }
    });

})();