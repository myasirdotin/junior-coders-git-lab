/**
 * Junior Coders - Learning Cycle Controller
 * Manages the 7-Step Cycle (Learn -> See -> Try -> Practice -> Challenge -> Quiz -> Project),
 * 3-Tier Exercises, Auto-Evaluator integration, Hints, Quiz, and Project checkpoints.
 */

document.addEventListener('DOMContentLoaded', () => {
    initCycleNavigation();
    initTierTabs();
    initEvaluators();
    initQuizEngine();
    initProjectChecklist();
});

// ─────────────────────────────────────────────────────────────────
// 1. Fixed 7-Step Cycle Navigation
// ─────────────────────────────────────────────────────────────────
function initCycleNavigation() {
    const steps = document.querySelectorAll('.cycle-step-item');
    if (!steps.length) return;

    // Smooth scroll and active state sync
    steps.forEach(step => {
        step.addEventListener('click', (e) => {
            const targetId = step.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setActiveCycleStep(step);
            }
        });
    });

    // Observer to update active pill on scroll
    const sections = ['step-learn', 'step-see', 'step-try', 'step-practice', 'step-challenge', 'step-quiz', 'step-project']
        .map(id => document.getElementById(id))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stepBtn = document.querySelector(`.cycle-step-item[data-target="${entry.target.id}"]`);
                    if (stepBtn) setActiveCycleStep(stepBtn);
                }
            });
        }, { threshold: 0.35 });

        sections.forEach(sec => observer.observe(sec));
    }
}

function setActiveCycleStep(stepEl) {
    document.querySelectorAll('.cycle-step-item').forEach(s => s.classList.remove('active'));
    stepEl.classList.add('active');
}

// ─────────────────────────────────────────────────────────────────
// 2. 3-Tier Exercise Tabs (Easy -> Medium -> Hard)
// ─────────────────────────────────────────────────────────────────
function initTierTabs() {
    const tabBtns = document.querySelectorAll('.tier-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTier = btn.getAttribute('data-tier');
            const parent = btn.closest('.tier-exercises-wrapper') || document;

            parent.querySelectorAll('.tier-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            parent.querySelectorAll('.tier-exercise-pane').forEach(pane => {
                pane.style.display = pane.getAttribute('data-tier') === targetTier ? 'block' : 'none';
            });
        });
    });
}

// ─────────────────────────────────────────────────────────────────
// 3. Evaluator Wire-up & Test Runner UI
// ─────────────────────────────────────────────────────────────────
function initEvaluators() {
    const evaluators = document.querySelectorAll('.evaluator-box');
    evaluators.forEach(box => {
        const runBtn = box.querySelector('.btn-eval-run');
        const codeInput = box.querySelector('.eval-code-input');
        const resultsBox = box.querySelector('.eval-results-container');
        const summaryBadge = box.querySelector('.eval-score-badge');
        const checkpointsList = box.querySelector('.test-checkpoint-list');
        const diagnosticBox = box.querySelector('.diagnostic-callout');
        const hintBtn = box.querySelector('.btn-toggle-hints');
        const hintsContainer = box.querySelector('.hints-container');
        const explainBtn = box.querySelector('.btn-explain-code');
        const explainPanel = box.querySelector('.explain-panel');

        // Tab indentation support
        if (codeInput) {
            codeInput.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = this.selectionStart;
                    const end = this.selectionEnd;
                    this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
                    this.selectionStart = this.selectionEnd = start + 2;
                }
            });
        }

        // Run Tests Button
        if (runBtn && codeInput) {
            runBtn.addEventListener('click', async () => {
                runBtn.disabled = true;
                runBtn.innerHTML = '⏳ Testing...';

                const specKey = box.getAttribute('data-spec');
                const spec = window.BEI_TEST_SPECS ? window.BEI_TEST_SPECS[specKey] : null;

                if (!spec) {
                    alert('Test specifications not configured for this challenge.');
                    runBtn.disabled = false;
                    runBtn.innerHTML = '⚡ Run Automatic Tests';
                    return;
                }

                const result = await window.BeiEvaluator.evaluateSolution(codeInput.value, spec);

                runBtn.disabled = false;
                runBtn.innerHTML = '⚡ Run Automatic Tests';

                // Record Attempt
                window.BeiEvaluator.recordAttempt(specKey, codeInput.value, result.allPassed, result.passedTests, result.totalTests);

                // Show Results Container
                if (resultsBox) resultsBox.style.display = 'block';

                // Summary Badge
                if (summaryBadge) {
                    summaryBadge.className = `eval-score-badge ${result.allPassed ? 'passed' : 'failed'}`;
                    summaryBadge.innerHTML = result.allPassed
                        ? `✓ ${result.passedTests}/${result.totalTests} Tests Passed (+${spec.xpReward || 50} XP)`
                        : `✗ ${result.passedTests}/${result.totalTests} Tests Passed`;
                }

                // Checkpoint Items
                if (checkpointsList && result.results) {
                    checkpointsList.innerHTML = result.results.map(r => `
                        <div class="test-checkpoint-item ${r.passed ? 'checkpoint-passed' : 'checkpoint-failed'}">
                            <div class="checkpoint-desc">
                                <span class="checkpoint-status-icon">${r.passed ? '✓' : '✗'}</span>
                                <strong>${escapeHtml(r.description)}</strong>
                            </div>
                            <span style="font-size: 0.8rem; color: ${r.passed ? '#34d399' : '#f87171'};">
                                ${escapeHtml(r.message || (r.passed ? 'Passed' : 'Failed'))}
                            </span>
                        </div>
                    `).join('');
                }

                // Friendly "Why Did My Code Fail?" Callout
                if (diagnosticBox) {
                    if (result.allPassed) {
                        diagnosticBox.style.display = 'none';
                        showXpToast(`+${spec.xpReward || 50} XP: Challenge Mastered!`);
                    } else if (result.friendlyDiagnostic) {
                        diagnosticBox.style.display = 'block';
                        diagnosticBox.innerHTML = `
                            <h4>💡 Why did my code fail?</h4>
                            <p><strong>${result.friendlyDiagnostic.title}</strong></p>
                            <p>${result.friendlyDiagnostic.explanation}</p>
                            <ul class="diagnostic-checklist">
                                ${result.friendlyDiagnostic.checklist.map(c => `<li>${c}</li>`).join('')}
                            </ul>
                            ${result.friendlyDiagnostic.suggestion ? `<div style="margin-top:0.75rem; background:rgba(0,0,0,0.3); padding:0.5rem 0.75rem; border-radius:6px; font-family:var(--font-mono); font-size:0.85rem; color:#fde047;">${result.friendlyDiagnostic.suggestion}</div>` : ''}
                        `;
                    }
                }
            });
        }

        // Hints Toggle & Selector
        if (hintBtn && hintsContainer) {
            hintBtn.addEventListener('click', () => {
                const isOpen = hintsContainer.style.display === 'block';
                hintsContainer.style.display = isOpen ? 'none' : 'block';
            });

            const hintPills = hintsContainer.querySelectorAll('.btn-hint-pill');
            const hintBody = hintsContainer.querySelector('.hint-body');
            hintPills.forEach(pill => {
                pill.addEventListener('click', () => {
                    hintPills.forEach(p => p.classList.remove('active'));
                    pill.classList.add('active');
                    const text = pill.getAttribute('data-hint-text');
                    if (hintBody && text) {
                        hintBody.innerHTML = text;
                    }
                });
            });
        }

        // Explain This Code Line-by-Line
        if (explainBtn && explainPanel && codeInput) {
            explainBtn.addEventListener('click', () => {
                const isOpen = explainPanel.style.display === 'block';
                if (isOpen) {
                    explainPanel.style.display = 'none';
                    return;
                }
                const lines = window.BeiEvaluator.explainCodeSnippet(codeInput.value);
                explainPanel.style.display = 'block';
                explainPanel.innerHTML = `
                    <h4>📖 Code Breakdown: How it works</h4>
                    <div style="display:flex; flex-direction:column; gap:0.5rem;">
                        ${lines.map(l => `
                            <div class="explain-line-item">
                                <span class="explain-line-no">L${l.lineNum || '•'}</span>
                                <div>${l.explanation}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            });
        }
    });
}

// ─────────────────────────────────────────────────────────────────
// 4. 5-Question Interactive Quiz Engine
// ─────────────────────────────────────────────────────────────────
function initQuizEngine() {
    const quizForm = document.getElementById('bei-module-quiz');
    if (!quizForm) return;

    const checkBtn = document.getElementById('btn-check-quiz');
    const resultBox = document.getElementById('quiz-score-summary');

    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            const cards = quizForm.querySelectorAll('.quiz-card');
            let score = 0;
            const total = cards.length;

            cards.forEach(card => {
                const correctVal = card.getAttribute('data-correct');
                const selected = card.querySelector('input[type="radio"]:checked');
                const labels = card.querySelectorAll('.quiz-option-label');
                const explainer = card.querySelector('.quiz-answer-explainer');

                labels.forEach(l => {
                    l.classList.remove('is-correct', 'is-wrong');
                    const radio = l.querySelector('input[type="radio"]');
                    if (radio.value === correctVal) {
                        l.classList.add('is-correct');
                    } else if (radio.checked) {
                        l.classList.add('is-wrong');
                    }
                });

                if (selected && selected.value === correctVal) {
                    score++;
                }

                if (explainer) {
                    explainer.style.display = 'block';
                    explainer.style.background = (selected && selected.value === correctVal) ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';
                    explainer.style.color = (selected && selected.value === correctVal) ? '#34d399' : '#f87171';
                }
            });

            if (resultBox) {
                const pct = Math.round((score / total) * 100);
                resultBox.style.display = 'block';
                resultBox.innerHTML = `
                    <div style="background: ${pct >= 80 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)'}; border: 1.5px solid ${pct >= 80 ? '#10b981' : '#f59e0b'}; padding: 1.25rem; border-radius: var(--radius-md); text-align: center;">
                        <h3 style="color: ${pct >= 80 ? '#34d399' : '#fbbf24'}; margin-bottom: 0.5rem;">Score: ${score} / ${total} (${pct}%)</h3>
                        <p style="color: var(--text-secondary); margin: 0;">${pct >= 80 ? '🎉 Outstanding! Quiz Mastery Achieved (+30 XP)' : 'Keep practicing! Review the explanations above and try again.'}</p>
                    </div>
                `;
                if (pct >= 80) {
                    window.BeiEvaluator.playChime('pass');
                    if (window.awardXP) window.awardXP(30, 'Module Quiz Passed');
                    showXpToast('+30 XP: Quiz Mastery Achieved!');
                } else {
                    window.BeiEvaluator.playChime('fail');
                }
            }
        });
    }
}

// ─────────────────────────────────────────────────────────────────
// 5. Project Mission Checklist
// ─────────────────────────────────────────────────────────────────
function initProjectChecklist() {
    const checkboxes = document.querySelectorAll('.mission-criteria-item input[type="checkbox"]');
    const saveBtn = document.getElementById('btn-save-project');

    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const allChecked = Array.from(checkboxes).every(c => c.checked);
            if (saveBtn) {
                saveBtn.disabled = !allChecked;
                if (allChecked) {
                    saveBtn.classList.add('btn-eval-run');
                }
            }
        });
    });

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            window.BeiEvaluator.playChime('pass');
            if (window.awardXP) window.awardXP(200, 'Module Capstone Project Completed');
            showXpToast('+200 XP: Capstone Project Completed!');
            alert('🎉 Congratulations! Project marked as completed and added to your learning portfolio.');
        });
    }
}

// ─────────────────────────────────────────────────────────────────
// XP Notification Pop Toast
// ─────────────────────────────────────────────────────────────────
function showXpToast(message) {
    let toast = document.querySelector('.xp-pop-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'xp-pop-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>⭐</span> ${escapeHtml(message)}`;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3800);
}

function escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
