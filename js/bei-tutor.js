/**
 * Junior Coders - Debugging Tips panel (Web Studio)
 * Three buttons that show ready-made tips and guiding questions. It is not an AI and
 * says so on screen (GEMINI §7h); it never writes the solution for the student.
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.BeiTutor = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    function initTutor(containerId, getActiveCodeFn) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="socratic-tutor-drawer" id="tutorDrawer" style="display: none; position: fixed; bottom: 20px; right: 20px; width: 380px; max-width: calc(100vw - 32px); height: 520px; background: #0f172a; border: 2px solid #6366f1; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); z-index: 1000; flex-direction: column; overflow: hidden; animation: fadeIn 0.25s ease;">
                <!-- Tutor Header -->
                <div style="background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); padding: 0.9rem 1.1rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08);">
                    <div style="display: flex; align-items: center; gap: 0.6rem;">
                        <span style="font-size: 1.4rem;"></span>
                        <div>
                            <strong style="color: #fff; font-size: 0.95rem; display: block;">Debugging Tips</strong>
                            <span style="font-size: 0.72rem; color: #94a3b8;">Ready-made tips, not an AI</span>
                        </div>
                    </div>
                    <button id="tutorCloseBtn" style="background: transparent; border: none; color: #94a3b8; font-size: 1.2rem; cursor: pointer;">✕</button>
                </div>

                <!-- Chat Messages Body -->
                <div id="tutorChatBody" style="flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.88rem; line-height: 1.55;">
                    <div style="background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 12px; padding: 0.85rem; color: #e2e8f0;">
<strong>Assalamu Alaikum! Stuck on a bug?</strong>
                        <p style="margin: 0.4rem 0 0; color: #cbd5e1; font-size: 0.83rem;">
                            Pick a button below. These are ready-made tips and questions that help you find the mistake yourself. They do not read your mind or write the answer for you.
                        </p>
                    </div>
                </div>

                <!-- Quick Prompt Chips -->
                <div style="padding: 0.5rem 0.75rem; background: rgba(0,0,0,0.3); display: flex; gap: 0.4rem; overflow-x: auto; border-top: 1px solid rgba(255,255,255,0.05); scrollbar-width: none;">
                    <button class="tutor-chip" data-action="explain">Read my code</button>
                    <button class="tutor-chip" data-action="error">Something is wrong</button>
                    <button class="tutor-chip" data-action="hint">Where do I start?</button>
                </div>
            </div>

            <!-- Floating Toggle Button -->
            <button id="tutorFloatingBtn" style="position: fixed; bottom: 20px; right: 20px; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; border: 2px solid rgba(255,255,255,0.25); border-radius: 999px; padding: 0.75rem 1.25rem; font-weight: 700; font-size: 0.9rem; cursor: pointer; box-shadow: 0 10px 25px rgba(0,0,0,0.4); display: flex; align-items: center; gap: 0.5rem; z-index: 999; transition: all 0.2s;">
                <span></span> <span>Debugging tips</span>
            </button>
        `;

        const drawer = document.getElementById('tutorDrawer');
        const floatBtn = document.getElementById('tutorFloatingBtn');
        const closeBtn = document.getElementById('tutorCloseBtn');
        const chatBody = document.getElementById('tutorChatBody');
        function toggle(open) {
            drawer.style.display = open ? 'flex' : 'none';
            floatBtn.style.display = open ? 'none' : 'flex';
            if (open) closeBtn.focus();
        }

        floatBtn.addEventListener('click', () => toggle(true));
        closeBtn.addEventListener('click', () => toggle(false));

        function appendMessage(sender, text, isHtml = false) {
            const msg = document.createElement('div');
            msg.style.borderRadius = '10px';
            msg.style.padding = '0.7rem 0.9rem';
            msg.style.maxWidth = '90%';

            if (sender === 'user') {
                msg.style.alignSelf = 'flex-end';
                msg.style.background = '#4f46e5';
                msg.style.color = '#fff';
                msg.textContent = text;
            } else {
                msg.style.alignSelf = 'flex-start';
                msg.style.background = 'rgba(255,255,255,0.05)';
                msg.style.border = '1px solid rgba(255,255,255,0.08)';
                msg.style.color = '#e2e8f0';
                if (isHtml) {
                    msg.innerHTML = text;
                } else {
                    msg.textContent = text;
                }
            }

            chatBody.appendChild(msg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        function handleQuery(queryText, action = null) {
            const studentCode = getActiveCodeFn ? getActiveCodeFn() : '';
            appendMessage('user', queryText);

            setTimeout(() => {
                let response = '';

                if (action === 'explain' || queryText.toLowerCase().includes('explain')) {
                    if (!studentCode.trim()) {
                        response = 'Your editor looks empty right now. Write some code first, then read it again line by line.';
                    } else {
                        response = `
                            <strong>Read it line by line.</strong><br>
                            Your first lines are:
                            <ul style="margin: 0.4rem 0 0; padding-left: 1.2rem;">
                                ${studentCode.split('\n').filter(l => l.trim()).slice(0, 5).map(l => `<li><code>${escapeHtml(l.trim())}</code></li>`).join('')}
                            </ul>
                            <div style="margin-top: 0.5rem; color: #a5b4fc;">
Notice how instructions execute sequentially from top to bottom. What do you expect the first line to produce?
                            </div>
                        `;
                    }
                } else if (action === 'error') {
                    response = `
                        <strong>Things to check:</strong>
                        <ul style="margin: 0.4rem 0 0; padding-left: 1.2rem;">
                            <li><strong>HTML:</strong> is every opening tag closed, like <code>&lt;p&gt;</code> … <code>&lt;/p&gt;</code>? Are attribute values in quotes?</li>
                            <li><strong>CSS:</strong> does every rule end with <code>;</code> and every block with <code>}</code>? Is the selector spelled like the class or id in the HTML?</li>
                            <li><strong>JavaScript:</strong> are quotes and brackets <code>( ) [ ] { }</code> in pairs? Did you make the variable with <code>let</code> or <code>const</code> before using it?</li>
                        </ul>
                        If the console shows an error, read the line number it gives and look at that line and the one above it.
                    `;
                } else {
                    response = `
                        <strong>A question to ask yourself:</strong><br>
                        <em>"What is the one small thing the page or program must do first?"</em><br>
                        Make only that work, check it in the preview or the console, then add the next small step.
                    `;
                }

                appendMessage('tutor', response, true);
            }, 400);
        }

        container.querySelectorAll('.tutor-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const act = chip.getAttribute('data-action');
                const text = chip.textContent;
                handleQuery(text, act);
            });
        });
    }

    function escapeHtml(str) {
        return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    return {
        initTutor
    };
}));
