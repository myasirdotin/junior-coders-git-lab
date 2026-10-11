/**
 * Junior Coders - Socratic AI Coding Tutor
 * A controlled educational mentor that guides students without giving away
 * the direct solution code, turning errors into teaching opportunities.
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
                        <span style="font-size: 1.4rem;">🤖</span>
                        <div>
                            <strong style="color: #fff; font-size: 0.95rem; display: block;">Socratic Coding Mentor</strong>
                            <span style="font-size: 0.72rem; color: #34d399;">Guided Inquiry Mode (Safe)</span>
                        </div>
                    </div>
                    <button id="tutorCloseBtn" style="background: transparent; border: none; color: #94a3b8; font-size: 1.2rem; cursor: pointer;">✕</button>
                </div>

                <!-- Chat Messages Body -->
                <div id="tutorChatBody" style="flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.88rem; line-height: 1.55;">
                    <div style="background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 12px; padding: 0.85rem; color: #e2e8f0;">
                        👋 <strong>Assalamu Alaikum! I am your Junior Coders Guide.</strong>
                        <p style="margin: 0.4rem 0 0; color: #cbd5e1; font-size: 0.83rem;">
                            I won't just do your homework for you, but I will help you reason through bugs, understand syntax, and discover the solution yourself!
                        </p>
                    </div>
                </div>

                <!-- Quick Prompt Chips -->
                <div style="padding: 0.5rem 0.75rem; background: rgba(0,0,0,0.3); display: flex; gap: 0.4rem; overflow-x: auto; border-top: 1px solid rgba(255,255,255,0.05); scrollbar-width: none;">
                    <button class="tutor-chip" data-action="explain">📖 Explain Code</button>
                    <button class="tutor-chip" data-action="error">⚠️ Why an error?</button>
                    <button class="tutor-chip" data-action="hint">💡 Give a Hint</button>
                </div>

                <!-- Input Row -->
                <div style="padding: 0.75rem; background: #090e1a; display: flex; gap: 0.5rem; border-top: 1px solid rgba(255,255,255,0.08);">
                    <input type="text" id="tutorUserInput" placeholder="Ask a question about your code..." style="flex: 1; background: #020617; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; padding: 0.5rem 0.75rem; font-size: 0.85rem; outline: none;">
                    <button id="tutorSendBtn" class="btn-primary" style="padding: 0.5rem 0.9rem; font-size: 0.85rem; border-radius: 8px;">Ask</button>
                </div>
            </div>

            <!-- Floating Toggle Button -->
            <button id="tutorFloatingBtn" style="position: fixed; bottom: 20px; right: 20px; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; border: 2px solid rgba(255,255,255,0.25); border-radius: 999px; padding: 0.75rem 1.25rem; font-weight: 700; font-size: 0.9rem; cursor: pointer; box-shadow: 0 10px 25px rgba(0,0,0,0.4); display: flex; align-items: center; gap: 0.5rem; z-index: 999; transition: all 0.2s;">
                <span>🤖</span> <span>Ask Socratic Tutor</span>
            </button>
        `;

        const drawer = document.getElementById('tutorDrawer');
        const floatBtn = document.getElementById('tutorFloatingBtn');
        const closeBtn = document.getElementById('tutorCloseBtn');
        const chatBody = document.getElementById('tutorChatBody');
        const input = document.getElementById('tutorUserInput');
        const sendBtn = document.getElementById('tutorSendBtn');

        function toggle(open) {
            drawer.style.display = open ? 'flex' : 'none';
            floatBtn.style.display = open ? 'none' : 'flex';
            if (open) input.focus();
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
                        response = 'Your editor looks empty right now. Write or paste some code first, and I will break it down line by line!';
                    } else {
                        response = `
                            <strong>Line-by-Line Breakdown:</strong><br>
                            I looked at your current code:
                            <ul style="margin: 0.4rem 0 0; padding-left: 1.2rem;">
                                ${studentCode.split('\n').filter(l => l.trim()).slice(0, 5).map(l => `<li><code>${escapeHtml(l.trim())}</code></li>`).join('')}
                            </ul>
                            <div style="margin-top: 0.5rem; color: #a5b4fc;">
                                💡 Notice how instructions execute sequentially from top to bottom. What do you expect the first line to produce?
                            </div>
                        `;
                    }
                } else if (action === 'error' || queryText.toLowerCase().includes('error')) {
                    response = `
                        <strong>Debugging Nudge:</strong><br>
                        Common pitfalls in student code:
                        <ul style="margin: 0.4rem 0 0; padding-left: 1.2rem;">
                            <li>Did you define variables with <code>let</code> or <code>const</code> before using them?</li>
                            <li>Are all quotes (<code>" "</code>) and brackets (<code>[ ]</code>, <code>{ }</code>) matched?</li>
                            <li>Is your array index starting at <code>0</code>?</li>
                        </ul>
                        Which line is the console pointing to? Look right above that line!
                    `;
                } else if (action === 'hint' || queryText.toLowerCase().includes('hint')) {
                    response = `
                        <strong>Guiding Question:</strong><br>
                        Before writing the full logic, ask yourself:
                        <em>"What is the single value or action I need to complete first?"</em><br>
                        If you're dealing with a list, try printing its length with <code>console.log(list.length)</code> to see what the computer sees!
                    `;
                } else {
                    response = `
                        That's a thoughtful question! In computer science, we break problems into small sub-tasks. 
                        What is the first step you want your program to perform?
                    `;
                }

                appendMessage('tutor', response, true);
            }, 400);
        }

        sendBtn.addEventListener('click', () => {
            const val = input.value.trim();
            if (!val) return;
            input.value = '';
            handleQuery(val);
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendBtn.click();
        });

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
