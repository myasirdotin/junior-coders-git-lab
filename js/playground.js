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
        }
    };

    // Auto-detect which playground to initialize
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('html-editor') && document.getElementById('css-editor')) {
            Playground.initCSS();
        } else if (document.getElementById('console')) {
            Playground.initJS();
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