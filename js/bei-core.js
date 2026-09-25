/**
 * BEI Coders (Junior Coders) Core Platform Interactive Logic
 * Handles placement diagnostic, theme toggling, interactive sandboxes, and student progress.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initPlacementWidget();
    initMobileNav();
    initStudentXP();
});

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('bei_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
        btn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'dark';
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('bei_theme', next);
            toggleBtns.forEach(b => b.innerHTML = next === 'dark' ? '☀️' : '🌙');
        });
    });
}

// Interactive Placement Diagnostic
function initPlacementWidget() {
    const widget = document.getElementById('placementDiagnostic');
    if (!widget) return;

    const cards = widget.querySelectorAll('.placement-card');
    const resultBox = document.getElementById('placementResult');

    const outcomes = {
        foundations: {
            title: "🌟 Recommended Starting Point: Foundations & Digital Literacy",
            desc: "Perfect for students in Grades 6–7 or absolute beginners! You will master keyboard navigation, file organization, command-line terminal, and Git basics with zero prior coding required.",
            link: "learn/foundations/index.html",
            btnText: "Start Foundations Journey →",
            color: "var(--brand-accent)"
        },
        web: {
            title: "🌐 Recommended Starting Point: Web Development Pathway",
            desc: "Ideal if you love visual creation! Start with semantic HTML structure, style with modern CSS (Flexbox & Grid), and bring websites alive with JavaScript logic.",
            link: "learn/web-dev/index.html",
            btnText: "Start Web Development Track →",
            color: "var(--brand-cyan)"
        },
        python: {
            title: "🐍 Recommended Starting Point: Python & AI Lab",
            desc: "Ideal for Grades 8–10 or algorithmic thinkers! Master clean Python syntax, loops, data structures, ethical AI principles, and interactive machine learning models.",
            link: "learn/python/index.html",
            btnText: "Launch Python & AI Lab →",
            color: "var(--brand-purple)"
        }
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.style.borderColor = 'transparent');
            card.style.borderColor = 'var(--brand-primary)';

            const key = card.getAttribute('data-path');
            const data = outcomes[key];
            if (data && resultBox) {
                resultBox.style.display = 'block';
                resultBox.innerHTML = `
                    <div style="background: var(--bg-surface-elevated); border: 2px solid ${data.color}; border-radius: var(--radius-lg); padding: 1.5rem; margin-top: 1.5rem; text-align: left; animation: fadeIn 0.3s ease;">
                        <h3 style="color: ${data.color}; margin-bottom: 0.5rem; font-size: 1.25rem;">${data.title}</h3>
                        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.25rem; line-height: 1.6;">${data.desc}</p>
                        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                            <a href="${data.link}" class="btn-hero-primary" style="padding: 0.65rem 1.4rem; font-size: 0.92rem; background: ${data.color}; color: white;">${data.btnText}</a>
                            <a href="studios/web-studio/index.html" class="btn-hero-secondary" style="padding: 0.65rem 1.2rem; font-size: 0.92rem;">Try Live Studio First ⚡</a>
                        </div>
                    </div>
                `;
                resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
}

// Mobile Nav Toggle
function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const links = document.querySelector('.bei-nav-links');
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            const isVisible = links.style.display === 'flex';
            links.style.display = isVisible ? 'none' : 'flex';
            if (!isVisible) {
                links.style.flexDirection = 'column';
                links.style.position = 'absolute';
                links.style.top = '70px';
                links.style.left = '0';
                links.style.right = '0';
                links.style.background = 'var(--bg-surface)';
                links.style.padding = '1.5rem';
                links.style.borderBottom = '1px solid var(--border-subtle)';
            }
        });
    }
}

// Student Progress / XP Feeling
function initStudentXP() {
    let xp = parseInt(localStorage.getItem('bei_student_xp') || '120', 10);
    const xpBadge = document.getElementById('studentXP');
    if (xpBadge) {
        xpBadge.innerText = `${xp} XP`;
    }
}

function awardXP(points, reason) {
    let xp = parseInt(localStorage.getItem('bei_student_xp') || '120', 10) + points;
    localStorage.setItem('bei_student_xp', xp.toString());
    const xpBadge = document.getElementById('studentXP');
    if (xpBadge) {
        xpBadge.innerText = `${xp} XP`;
    }
    console.log(`Earned ${points} XP for: ${reason}`);
}

window.awardXP = awardXP;
