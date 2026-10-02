/**
 * BEI Coders - In-Browser Automatic Code Evaluator & Diagnostic Engine
 * Provides client-side unit test runners, friendly error translation ("Why did my code fail?"),
 * multi-tier hint scaffolding, code explanation, and gamified XP rewards.
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.BeiEvaluator = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    // ─────────────────────────────────────────────────────────────────
    // Sound FX Synthesis (Web Audio API - 0 external asset latency)
    // ─────────────────────────────────────────────────────────────────
    function playChime(type) {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const now = ctx.currentTime;

            if (type === 'pass') {
                const osc1 = ctx.createOscillator();
                const osc2 = ctx.createOscillator();
                const gain = ctx.createGain();

                osc1.type = 'sine';
                osc2.type = 'triangle';
                osc1.frequency.setValueAtTime(523.25, now); // C5
                osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5
                osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.24); // G5
                osc1.frequency.exponentialRampToValueAtTime(1046.50, now + 0.36); // C6

                osc2.frequency.setValueAtTime(261.63, now);
                osc2.frequency.exponentialRampToValueAtTime(523.25, now + 0.36);

                gain.gain.setValueAtTime(0.18, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

                osc1.connect(gain);
                osc2.connect(gain);
                gain.connect(ctx.destination);

                osc1.start(now);
                osc2.start(now);
                osc1.stop(now + 0.65);
                osc2.stop(now + 0.65);
            } else if (type === 'fail') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(220, now);
                osc.frequency.linearRampToValueAtTime(160, now + 0.3);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.35);
            }
        } catch (e) {
            // Audio policy might mute until user interaction; fail silently
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // Deep Value Equality Checker
    // ─────────────────────────────────────────────────────────────────
    function deepEqual(a, b) {
        if (a === b) return true;
        if (a === null || typeof a !== 'object' || b === null || typeof b !== 'object') {
            return false;
        }
        if (Array.isArray(a) !== Array.isArray(b)) return false;

        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;

        for (const key of keysA) {
            if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }

    function formatVal(v) {
        if (typeof v === 'string') return `"${v}"`;
        if (v === undefined) return 'undefined';
        if (v === null) return 'null';
        if (Array.isArray(v)) return `[${v.map(formatVal).join(', ')}]`;
        if (typeof v === 'object') {
            try { return JSON.stringify(v); } catch (_) { return String(v); }
        }
        return String(v);
    }

    // ─────────────────────────────────────────────────────────────────
    // "Why Did My Code Fail?" — Friendly Kid-Centered Error Translator
    // ─────────────────────────────────────────────────────────────────
    function translateError(errorMsg, studentCode = '') {
        const msg = String(errorMsg || '');

        // 1. ReferenceError (variable or function not defined)
        if (msg.includes('is not defined')) {
            const match = msg.match(/([a-zA-Z0-9_$]+) is not defined/);
            const varName = match ? match[1] : 'a name';
            return {
                title: `JavaScript cannot find "${varName}"! 🔍`,
                explanation: `Your code tried to use <code>${varName}</code>, but JavaScript has never heard of it yet.`,
                checklist: [
                    `Check if you created it first using <code>let ${varName} = ...</code> or <code>const ${varName} = ...</code>`,
                    `Check your spelling! Remember that JavaScript is case-sensitive: <code>myList</code> is different from <code>mylist</code>.`,
                    `Make sure you didn't accidentally delete or misspell the variable declaration.`
                ],
                suggestion: `let ${varName} = ...;`
            };
        }

        // 2. TypeError: is not a function
        if (msg.includes('is not a function')) {
            const match = msg.match(/([a-zA-Z0-9_$.]+) is not a function/);
            const funcName = match ? match[1] : 'this item';
            return {
                title: `"${funcName}" is not a function! ⚙️`,
                explanation: `Your code put parentheses <code>()</code> after <code>${funcName}</code> to call it, but it isn't an action or function.`,
                checklist: [
                    `If it's an array, remember we access items using square brackets like <code>list[0]</code>, not <code>list(0)</code>.`,
                    `Check if you misspelled built-in methods like <code>.push()</code>, <code>.pop()</code>, or <code>.slice()</code>.`,
                    `Make sure you defined the function before calling it.`
                ],
                suggestion: `Did you mean list[0] or list.push()?`
            };
        }

        // 3. TypeError: Cannot read properties of undefined/null
        if (msg.includes('Cannot read properties of undefined') || msg.includes('Cannot read property') || msg.includes('is undefined')) {
            return {
                title: `You are looking inside an empty box! 📦`,
                explanation: `Your code tried to read a property or index from something that doesn't exist yet (it is <code>undefined</code>).`,
                checklist: [
                    `Are you trying to access an array item that doesn't exist? (e.g. index 5 in a list with only 3 items).`,
                    `Check if your variable was given a value before you tried to inspect it.`,
                    `Remember arrays count from <code>0</code> up to <code>length - 1</code>.`
                ],
                suggestion: `Check the length of your array before accessing indexes.`
            };
        }

        // 4. SyntaxError: Unexpected token
        if (msg.includes('Unexpected token') || msg.includes('Unexpected identifier')) {
            return {
                title: `Missing Bracket, Quote, or Comma! 🧩`,
                explanation: `JavaScript got confused by the structure of your code. Usually, this means an opened quote or bracket was never closed.`,
                checklist: [
                    `Check that every opening <code>[</code> has a matching closing <code>]</code>.`,
                    `Check that every string quote <code>"</code> or <code>'</code> is closed.`,
                    `Check that items in your list are separated by commas: <code>["apple", "banana"]</code>.`
                ],
                suggestion: `Look closely at the line right before the error.`
            };
        }

        // 5. Infinite Loop / Script Timeout
        if (msg.includes('Timeout') || msg.includes('Execution timed out')) {
            return {
                title: `Infinite Loop Detected! 🔄`,
                explanation: `Your code took too long to finish. This usually means a loop is running forever and cannot stop!`,
                checklist: [
                    `Does your loop counter update inside the loop? (e.g. <code>i++</code>).`,
                    `Is your loop condition ever able to become false? (e.g. <code>i < list.length</code>).`
                ],
                suggestion: `Ensure your loop counter increments toward the exit condition.`
            };
        }

        // Generic fallback
        return {
            title: `Code Execution Paused ⚠️`,
            explanation: `Your code encountered an error during testing: <em>${escapeHtml(msg)}</em>`,
            checklist: [
                `Review the instructions and starter code carefully.`,
                `Test running your code step-by-step using <code>console.log()</code> to see where it stops.`,
                `Click the "Hints" tab above if you need a conceptual nudge!`
            ],
            suggestion: null
        };
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // ─────────────────────────────────────────────────────────────────
    // Safe Isolated Code Runner
    // ─────────────────────────────────────────────────────────────────
    function executeStudentCode(code, timeoutMs = 2500) {
        return new Promise((resolve) => {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.setAttribute('sandbox', 'allow-scripts');
            document.body.appendChild(iframe);

            const logs = [];
            let finished = false;

            const timer = setTimeout(() => {
                if (!finished) {
                    finished = true;
                    cleanup();
                    resolve({
                        success: false,
                        error: 'Execution timed out (possible infinite loop).',
                        logs,
                        env: {}
                    });
                }
            }, timeoutMs);

            function cleanup() {
                clearTimeout(timer);
                window.removeEventListener('message', handleMessage);
                if (iframe.parentNode) {
                    iframe.parentNode.removeChild(iframe);
                }
            }

            function handleMessage(event) {
                if (event.source !== iframe.contentWindow || !event.data || event.data.__beiId !== 'EVAL') return;
                finished = true;
                cleanup();

                if (event.data.type === 'SUCCESS') {
                    resolve({
                        success: true,
                        logs: event.data.logs,
                        scope: event.data.scope,
                        error: null
                    });
                } else {
                    resolve({
                        success: false,
                        error: event.data.error,
                        logs: event.data.logs,
                        scope: {}
                    });
                }
            }

            window.addEventListener('message', handleMessage);

            const runnerScript = `
                <!DOCTYPE html>
                <html>
                <body>
                <script>
                    const logs = [];
                    const originalLog = console.log;
                    console.log = (...args) => {
                        logs.push(args.map(a => {
                            try { return typeof a === 'object' ? JSON.stringify(a) : String(a); }
                            catch (_) { return String(a); }
                        }).join(' '));
                    };

                    try {
                        ${code}

                        // Collect window variables and functions
                        const scope = {};
                        for (let k in window) {
                            if (window.hasOwnProperty(k) && !k.startsWith('webkit') && !k.startsWith('on')) {
                                try {
                                    const val = window[k];
                                    if (typeof val === 'function') {
                                        scope[k] = { type: 'function', name: k, length: val.length };
                                    } else if (typeof val !== 'undefined') {
                                        scope[k] = { type: typeof val, value: JSON.parse(JSON.stringify(val)) };
                                    }
                                } catch(_) {}
                            }
                        }

                        parent.postMessage({ __beiId: 'EVAL', type: 'SUCCESS', logs, scope }, '*');
                    } catch (err) {
                        parent.postMessage({ __beiId: 'EVAL', type: 'ERROR', error: err.message || String(err), logs }, '*');
                    }
                <\/script>
                </body>
                </html>
            `;
            iframe.srcdoc = runnerScript;
        });
    }

    // ─────────────────────────────────────────────────────────────────
    // Test Suite Evaluation Engine
    // ─────────────────────────────────────────────────────────────────
    /**
     * spec definition:
     * {
     *   id: 'js-m5-ex1',
     *   title: 'Create a Student List',
     *   xpReward: 50,
     *   targetType: 'variable' | 'function' | 'custom',
     *   targetName: 'students',
     *   tests: [
     *     { description: 'Variable "students" is an array', assert: (res) => ... },
     *     ...
     *   ]
     * }
     */
    async function evaluateSolution(studentCode, spec) {
        if (!studentCode || !studentCode.trim()) {
            return {
                passed: false,
                allPassed: false,
                totalTests: spec.tests ? spec.tests.length : 1,
                passedTests: 0,
                results: [{ name: 'Code provided', passed: false, message: 'Please write some code before running tests.' }],
                friendlyDiagnostic: {
                    title: 'Empty Code Editor 📝',
                    explanation: 'The code editor is empty! Type your solution and click "Run Automatic Tests".',
                    checklist: ['Read the requirements carefully.', 'Start with the starter code provided.'],
                    suggestion: null
                }
            };
        }

        // Test Harness execution: we append testing harness code directly to ensure function invokability
        const harnessScript = `
            ${studentCode}

            // Test Harness
            window.__BEI_HARNESS_RESULTS = [];
            window.__BEI_RUN_TESTS = function(testSpecs) {
                return testSpecs.map(t => {
                    try {
                        const fn = new Function('return (' + t.fnString + ')();');
                        const res = fn();
                        return { id: t.id, passed: !!res.passed, message: res.message, expected: t.expected, actual: res.actual };
                    } catch(err) {
                        return { id: t.id, passed: false, message: err.message, error: true };
                    }
                });
            };
        `;

        // Run isolated test iframe
        const execResult = await executeStudentCode(studentCode);

        if (!execResult.success) {
            playChime('fail');
            return {
                passed: false,
                allPassed: false,
                totalTests: spec.tests.length,
                passedTests: 0,
                rawError: execResult.error,
                friendlyDiagnostic: translateError(execResult.error, studentCode),
                results: spec.tests.map(t => ({
                    description: t.description,
                    passed: false,
                    message: 'Execution halted before this test could run.'
                }))
            };
        }

        // Run tests through student code environment
        return new Promise((resolve) => {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.setAttribute('sandbox', 'allow-scripts');
            document.body.appendChild(iframe);

            const timer = setTimeout(() => {
                cleanup();
                resolve({
                    passed: false,
                    allPassed: false,
                    totalTests: spec.tests.length,
                    passedTests: 0,
                    friendlyDiagnostic: translateError('Timeout during test evaluation', studentCode),
                    results: spec.tests.map(t => ({ description: t.description, passed: false, message: 'Timeout' }))
                });
            }, 3500);

            function cleanup() {
                clearTimeout(timer);
                window.removeEventListener('message', handleTestMessage);
                if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
            }

            function handleTestMessage(event) {
                if (event.source !== iframe.contentWindow || !event.data || event.data.__beiId !== 'TEST_SUITE') return;
                cleanup();

                const results = event.data.results || [];
                const passedCount = results.filter(r => r.passed).length;
                const allPassed = passedCount === spec.tests.length;

                if (allPassed) {
                    playChime('pass');
                    awardXP(spec.xpReward || 50, spec.title || 'Coding Challenge');
                } else {
                    playChime('fail');
                }

                // If any test failed, generate friendly feedback based on the first failing test
                let friendlyDiagnostic = null;
                const firstFail = results.find(r => !r.passed);
                if (firstFail) {
                    friendlyDiagnostic = {
                        title: `Test Checkpoint: ${firstFail.description} ❌`,
                        explanation: firstFail.message || `The test did not receive the expected result.`,
                        checklist: [
                            firstFail.hint || 'Review your variable names and array methods.',
                            'Make sure to return or output the exact value required.',
                            'Check edge cases (e.g. index 0, length, casing).'
                        ],
                        suggestion: firstFail.expected ? `Expected: ${formatVal(firstFail.expected)}` : null
                    };
                }

                resolve({
                    passed: allPassed,
                    allPassed,
                    totalTests: spec.tests.length,
                    passedTests: passedCount,
                    results,
                    friendlyDiagnostic,
                    logs: execResult.logs
                });
            }

            window.addEventListener('message', handleTestMessage);

            // Build runner payload
            const serializedTests = spec.tests.map((t, idx) => ({
                id: idx,
                description: t.description,
                hint: t.hint || '',
                expected: t.expected !== undefined ? t.expected : null,
                testFnString: t.run.toString()
            }));

            const testRunnerDoc = `
                <!DOCTYPE html>
                <html><body><script>
                    try {
                        ${studentCode}

                        const tests = ${JSON.stringify(serializedTests)};
                        const results = tests.map(t => {
                            try {
                                const runFn = (${t => t.testFnString})(t);
                                const evalRes = eval('(' + t.testFnString + ')()');
                                return {
                                    description: t.description,
                                    passed: !!evalRes.passed,
                                    message: evalRes.message || (evalRes.passed ? 'Passed!' : 'Did not match requirement.'),
                                    hint: t.hint,
                                    expected: t.expected,
                                    actual: evalRes.actual
                                };
                            } catch (e) {
                                return {
                                    description: t.description,
                                    passed: false,
                                    message: e.message || String(e),
                                    hint: t.hint,
                                    expected: t.expected
                                };
                            }
                        });

                        parent.postMessage({ __beiId: 'TEST_SUITE', results }, '*');
                    } catch (err) {
                        parent.postMessage({
                            __beiId: 'TEST_SUITE',
                            results: [{ description: 'Compilation', passed: false, message: err.message }]
                        }, '*');
                    }
                <\/script></body></html>
            `;
            iframe.srcdoc = testRunnerDoc;
        });
    }

    // ─────────────────────────────────────────────────────────────────
    // "Explain This Code" Line-by-Line Breakdown Engine
    // ─────────────────────────────────────────────────────────────────
    function explainCodeSnippet(code) {
        if (!code || !code.trim()) return ['No code selected to explain.'];
        const lines = code.trim().split('\n');
        const explanations = [];

        lines.forEach((rawLine, idx) => {
            const line = rawLine.trim();
            const num = idx + 1;
            if (!line || line.startsWith('//')) {
                return;
            }

            // Variable Declaration
            if (/^(let|const|var)\s+([a-zA-Z0-9_$]+)\s*=\s*\[(.*)\];?$/.test(line)) {
                const match = line.match(/^(let|const|var)\s+([a-zA-Z0-9_$]+)\s*=\s*\[(.*)\];?/);
                const name = match[2];
                const items = match[3] ? match[3].split(',').map(s => s.trim()) : [];
                explanations.push({
                    lineNum: num,
                    code: line,
                    explanation: `Creates an array named <strong>${name}</strong> containing ${items.length} item(s): <code>[${items.join(', ')}]</code>.`
                });
            } else if (/^([a-zA-Z0-9_$]+)\.push\((.*)\);?$/.test(line)) {
                const match = line.match(/^([a-zA-Z0-9_$]+)\.push\((.*)\);?/);
                explanations.push({
                    lineNum: num,
                    code: line,
                    explanation: `Calls <code>.push()</code> to insert <strong>${match[2]}</strong> at the very <strong>end</strong> of array <code>${match[1]}</code>.`
                });
            } else if (/^([a-zA-Z0-9_$]+)\.pop\(\);?$/.test(line)) {
                const match = line.match(/^([a-zA-Z0-9_$]+)\.pop\(\);?/);
                explanations.push({
                    lineNum: num,
                    code: line,
                    explanation: `Calls <code>.pop()</code> to remove the last item from array <code>${match[1]}</code> and shrink its length by 1.`
                });
            } else if (/^console\.log\((.*)\);?$/.test(line)) {
                const match = line.match(/^console\.log\((.*)\);?/);
                explanations.push({
                    lineNum: num,
                    code: line,
                    explanation: `Outputs <strong>${escapeHtml(match[1])}</strong> to the developer console for you to inspect.`
                });
            } else if (/^for\s*\(\s*(let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*0;\s*\2\s*<\s*([a-zA-Z0-9_$.]+);\s*\2\+\+\s*\)\s*\{?$/.test(line)) {
                const match = line.match(/^for\s*\(\s*(let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*0;\s*\2\s*<\s*([a-zA-Z0-9_$.]+);\s*\2\+\+\s*\)\s*\{?/);
                explanations.push({
                    lineNum: num,
                    code: line,
                    explanation: `Starts a standard <code>for</code> loop: counter <code>${match[2]}</code> starts at 0 and loops through every item until reaching <code>${match[3]}</code>.`
                });
            } else {
                explanations.push({
                    lineNum: num,
                    code: line,
                    explanation: `Executes instruction: <code>${escapeHtml(line)}</code>`
                });
            }
        });

        return explanations;
    }

    // ─────────────────────────────────────────────────────────────────
    // Attempt History Storage & Replay
    // ─────────────────────────────────────────────────────────────────
    function recordAttempt(challengeId, code, passed, passedCount, totalCount) {
        const storageKey = `bei_attempts_${challengeId}`;
        let history = [];
        try {
            history = JSON.parse(localStorage.getItem(storageKey) || '[]');
        } catch (_) { history = []; }

        const attempt = {
            id: history.length + 1,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            code,
            passed,
            passedCount,
            totalCount
        };

        history.push(attempt);
        // keep last 10 attempts
        if (history.length > 10) history.shift();
        localStorage.setItem(storageKey, JSON.stringify(history));
        return history;
    }

    function getAttemptHistory(challengeId) {
        try {
            return JSON.parse(localStorage.getItem(`bei_attempts_${challengeId}`) || '[]');
        } catch (_) { return []; }
    }

    // ─────────────────────────────────────────────────────────────────
    // Public API
    // ─────────────────────────────────────────────────────────────────
    return {
        evaluateSolution,
        translateError,
        explainCodeSnippet,
        recordAttempt,
        getAttemptHistory,
        playChime,
        deepEqual,
        formatVal
    };
}));
