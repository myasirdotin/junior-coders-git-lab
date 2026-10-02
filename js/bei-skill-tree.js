/**
 * BEI Coders - Skill Tree, Progression & Certificate Engine
 * Manages gamified student levels, visual prerequisite trees, milestone badges,
 * and verifiable certificate generation.
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.BeiProgress = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    // ─────────────────────────────────────────────────────────────────
    // 1. Levels and XP Economy Configuration
    // ─────────────────────────────────────────────────────────────────
    const LEVELS = [
        { level: 1, title: 'Code Explorer', minXP: 0, maxXP: 250, emblem: '🌱' },
        { level: 2, title: 'Code Learner', minXP: 251, maxXP: 750, emblem: '🧭' },
        { level: 3, title: 'Code Builder', minXP: 751, maxXP: 1800, emblem: '🛠️' },
        { level: 4, title: 'Junior Developer', minXP: 1801, maxXP: 3500, emblem: '🚀' },
        { level: 5, title: 'Young Programmer', minXP: 3501, maxXP: 99999, emblem: '👑' }
    ];

    const BADGES = [
        {
            id: 'html-starter',
            name: 'HTML Starter',
            icon: '📄',
            desc: 'Created and structured your first semantic web page.',
            check: (data) => (data.xp >= 50)
        },
        {
            id: 'css-creator',
            name: 'CSS Creator',
            icon: '🎨',
            desc: 'Mastered the Box Model, Flexbox layout, and CSS colors.',
            check: (data) => (data.xp >= 150)
        },
        {
            id: 'js-explorer',
            name: 'JavaScript Explorer',
            icon: '⚡',
            desc: 'Wrote variables, operators, and conditions in JavaScript.',
            check: (data) => (data.completedModules.includes('m1') || data.completedModules.includes('m2'))
        },
        {
            id: 'loop-master',
            name: 'Loop Master',
            icon: '🔄',
            desc: 'Harnessed while and for loops to automate repetitive tasks.',
            check: (data) => (data.completedModules.includes('m6'))
        },
        {
            id: 'function-master',
            name: 'Function Master',
            icon: '⚙️',
            desc: 'Engineered reusable functions with parameters and return values.',
            check: (data) => (data.completedModules.includes('m4'))
        },
        {
            id: 'array-master',
            name: 'Array Master',
            icon: '💎',
            desc: 'Stored, indexed, and manipulated complex data lists with push and pop.',
            check: (data) => (data.completedModules.includes('m5') || data.xp >= 320)
        },
        {
            id: 'bug-hunter',
            name: 'Bug Hunter',
            icon: '🐞',
            desc: 'Fixed a failing test case on your first try without checking hints.',
            check: (data) => (data.xp >= 200)
        },
        {
            id: 'project-builder',
            name: 'Project Builder',
            icon: '🏆',
            desc: 'Completed and submitted a full-featured real-world capstone app.',
            check: (data) => (data.completedProjects && data.completedProjects.length >= 1)
        },
        {
            id: 'fullstack-junior',
            name: 'Full Stack Junior',
            icon: '🌐',
            desc: 'Connected frontend JavaScript with relational database schemas.',
            check: (data) => (data.xp >= 1200)
        }
    ];

    // ─────────────────────────────────────────────────────────────────
    // 2. State & LocalStorage Management
    // ─────────────────────────────────────────────────────────────────
    function getStudentState() {
        const xp = parseInt(localStorage.getItem('bei_student_xp') || '350', 10);
        let completedModules = [];
        let completedProjects = [];

        try {
            completedModules = JSON.parse(localStorage.getItem('bei_completed_modules') || '["m1", "m2", "m3", "m4", "m5"]');
            completedProjects = JSON.parse(localStorage.getItem('bei_completed_projects') || '["Student Roster App"]');
        } catch (_) {
            completedModules = ['m1', 'm2', 'm3'];
            completedProjects = [];
        }

        const studentName = localStorage.getItem('bei_student_name') || 'Student Coder';

        return {
            xp,
            completedModules,
            completedProjects,
            studentName
        };
    }

    function getLevelInfo(xp) {
        for (let i = 0; i < LEVELS.length; i++) {
            const lvl = LEVELS[i];
            if (xp >= lvl.minXP && xp <= lvl.maxXP) {
                const nextXP = lvl.maxXP === 99999 ? lvl.maxXP : lvl.maxXP + 1;
                const range = nextXP - lvl.minXP;
                const progressInLvl = xp - lvl.minXP;
                const pct = Math.min(100, Math.round((progressInLvl / range) * 100));
                return {
                    current: lvl,
                    next: LEVELS[i + 1] || lvl,
                    percentage: pct,
                    needed: Math.max(0, nextXP - xp)
                };
            }
        }
        return { current: LEVELS[0], next: LEVELS[1], percentage: 0, needed: 250 };
    }

    // ─────────────────────────────────────────────────────────────────
    // 3. Render Profile Bar (XP, Level, Progress)
    // ─────────────────────────────────────────────────────────────────
    function renderProfileBar(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const state = getStudentState();
        const info = getLevelInfo(state.xp);

        container.innerHTML = `
            <div class="student-rank-avatar">
                <div class="rank-emblem">${info.current.emblem}</div>
                <div class="rank-details">
                    <h3>${escapeHtml(state.studentName)} <span class="rank-level-tag">Level ${info.current.level}</span></h3>
                    <div style="color: var(--text-secondary); font-size: 0.9rem; font-weight: 600;">
                        ${info.current.title}
                    </div>
                </div>
            </div>

            <div class="rank-xp-meter">
                <div class="xp-numbers-row">
                    <span>${state.xp} XP Total</span>
                    <span>${info.percentage}% to Level ${info.next.level}</span>
                </div>
                <div class="xp-track">
                    <div class="xp-fill" style="width: ${info.percentage}%;"></div>
                </div>
                <div style="text-align: right; font-size: 0.72rem; color: var(--text-muted); margin-top: 0.25rem;">
                    ${info.needed > 0 ? `${info.needed} XP to ${info.next.title}` : 'Max Level Master!'}
                </div>
            </div>

            <div style="display: flex; gap: 0.75rem;">
                <button id="btn-open-certificate" class="btn-primary" style="padding: 0.6rem 1.25rem; font-size: 0.88rem; border-radius: var(--radius-sm); background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
                    📜 View Certificate
                </button>
            </div>
        `;

        const certBtn = container.querySelector('#btn-open-certificate');
        if (certBtn) {
            certBtn.addEventListener('click', () => openCertificateModal());
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // 4. Render Milestone Badges Showcase
    // ─────────────────────────────────────────────────────────────────
    function renderBadges(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const state = getStudentState();

        container.innerHTML = BADGES.map(badge => {
            const isUnlocked = badge.check(state);
            return `
                <div class="badge-item-card ${isUnlocked ? 'unlocked' : 'locked'}">
                    <div class="badge-icon-box">${badge.icon}</div>
                    <div class="badge-name">${badge.name}</div>
                    <div class="badge-desc">${badge.desc}</div>
                    <div style="margin-top: 0.5rem; font-size: 0.72rem; font-weight: 700; color: ${isUnlocked ? '#34d399' : '#64748b'};">
                        ${isUnlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
                    </div>
                </div>
            `;
        }).join('');
    }

    // ─────────────────────────────────────────────────────────────────
    // 5. Render Interactive Skill Tree Flowchart
    // ─────────────────────────────────────────────────────────────────
    function renderSkillTree(containerId, track = 'js') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const state = getStudentState();

        const jsNodes = [
            { id: 'm1', title: '1. Variables', sub: 'let, const, types', prereq: null, link: 'module1.html' },
            { id: 'm2', title: '2. Operators', sub: 'math & comparison', prereq: 'm1', link: 'module2.html' },
            { id: 'm3', title: '3. Conditions', sub: 'if/else branching', prereq: 'm2', link: 'module3.html' },
            { id: 'm4', title: '4. Functions', sub: 'reusable logic blocks', prereq: 'm3', link: 'module4.html' },
            { id: 'm5', title: '5. Arrays 💎', sub: 'indexed lists & push', prereq: 'm4', link: 'module5.html' },
            { id: 'm6', title: '6. Loops', sub: 'for & while counters', prereq: 'm5', link: 'module6.html' },
            { id: 'm7', title: '7. Objects', sub: 'key-value entities', prereq: 'm6', link: 'module7.html' },
            { id: 'm8', title: '8. DOM Selection', sub: 'querying HTML elements', prereq: 'm7', link: 'module8.html' },
            { id: 'm9', title: '9. Event Listeners', sub: 'clicks, inputs, forms', prereq: 'm8', link: 'module9.html' }
        ];

        let html = '<div class="skill-tree-grid">';

        jsNodes.forEach((node, idx) => {
            const isCompleted = state.completedModules.includes(node.id);
            const isUnlocked = !node.prereq || state.completedModules.includes(node.prereq);
            const statusClass = isCompleted ? 'status-completed' : (isUnlocked ? 'status-active' : 'status-locked');
            const icon = isCompleted ? '✓' : (isUnlocked ? '⚡' : '🔒');

            html += `
                <div class="tree-level-row">
                    <a href="${isUnlocked ? node.link : '#'}" class="tree-node-card ${statusClass}" ${!isUnlocked ? 'onclick="alert(\'Complete previous modules to unlock this skill!\'); return false;"' : ''}>
                        <div class="node-status-icon">${icon}</div>
                        <div class="node-title">${node.title}</div>
                        <div class="node-subtitle">${node.sub}</div>
                    </a>
                </div>
            `;

            if (idx < jsNodes.length - 1) {
                const nextNode = jsNodes[idx + 1];
                const connectorUnlocked = state.completedModules.includes(node.id);
                html += `<div class="tree-connector-down ${connectorUnlocked ? 'unlocked' : ''}"></div>`;
            }
        });

        html += '</div>';
        container.innerHTML = html;
    }

    // ─────────────────────────────────────────────────────────────────
    // 6. Verifiable Certificate Generator Modal
    // ─────────────────────────────────────────────────────────────────
    function openCertificateModal() {
        let modal = document.getElementById('certModalBackdrop');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'certModalBackdrop';
            modal.className = 'cert-modal-backdrop';
            document.body.appendChild(modal);
        }

        const state = getStudentState();
        const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const serial = 'BEI-JS-' + Math.abs(hashCode(state.studentName + dateStr)).toString(16).toUpperCase().padStart(8, '0');

        modal.innerHTML = `
            <div class="cert-paper">
                <button class="cert-close-btn" onclick="document.getElementById('certModalBackdrop').classList.remove('open')">✕</button>
                <div class="cert-watermark">📜</div>
                
                <div class="cert-header">
                    <div style="font-size: 0.95rem; font-weight: 800; letter-spacing: 0.15em; color: #f59e0b; margin-bottom: 0.25rem;">BEI CODERS ACADEMY</div>
                    <h2>Certificate of Technical Mastery</h2>
                    <p style="color: #64748b; font-size: 0.9rem; margin: 0;">Verified School Computer Science Pathway</p>
                </div>

                <p style="color: #475569; font-size: 1.05rem; margin: 0;">This is proudly presented to:</p>
                <div class="cert-student-name">${escapeHtml(state.studentName)}</div>

                <p class="cert-body-text">
                    For successfully mastering foundational and intermediate computational thinking, demonstrating rigorous algorithmic logic, completing <strong>5 modular units</strong>, passing checkpoint quizzes with excellence, and engineering functional software with diligence (<em>Iḥsān</em>).
                </p>

                <div style="display: inline-flex; gap: 1.5rem; background: #f8fafc; border: 1px dashed #cbd5e1; padding: 0.6rem 1.25rem; border-radius: 8px; font-size: 0.82rem; color: #475569; margin-bottom: 1.5rem;">
                    <span><strong>Track:</strong> JavaScript Core</span>
                    <span><strong>Experience:</strong> ${state.xp} XP</span>
                    <span><strong>Verification ID:</strong> ${serial}</span>
                </div>

                <div class="cert-signatures-grid">
                    <div>
                        <div class="cert-sign-line"></div>
                        <strong style="display:block; font-size:0.95rem; color:#0f172a;">Lead Computer Science Instructor</strong>
                        <span style="font-size:0.8rem; color:#64748b;">BEI Coders Curriculum Board</span>
                    </div>
                    <div>
                        <div class="cert-sign-line"></div>
                        <strong style="display:block; font-size:0.95rem; color:#0f172a;">Date of Conferral</strong>
                        <span style="font-size:0.8rem; color:#64748b;">${dateStr}</span>
                    </div>
                </div>

                <div style="margin-top: 2rem; display: flex; justify-content: center; gap: 1rem;" class="no-print">
                    <button class="btn-primary" onclick="window.print()" style="background:#0f172a; color:#fff; border-radius:8px; padding:0.6rem 1.4rem;">🖨️ Print / Save PDF</button>
                    <button class="btn-eval-action" onclick="document.getElementById('certModalBackdrop').classList.remove('open')" style="color:#0f172a; border-color:#cbd5e1;">Close</button>
                </div>
            </div>
        `;

        modal.classList.add('open');
    }

    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    }

    function escapeHtml(str) {
        return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    return {
        getStudentState,
        getLevelInfo,
        renderProfileBar,
        renderBadges,
        renderSkillTree,
        openCertificateModal,
        LEVELS,
        BADGES
    };
}));
