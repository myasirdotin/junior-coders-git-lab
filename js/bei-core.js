/**
 * BEI Coders (Junior Coders) Core Platform Interactive Logic
 * Handles placement diagnostic, theme toggling, interactive sandboxes, and student progress.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initPlacementWidget();
    initMobileNav();
    initStudentXP();
    initTypewriter();
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

// Mobile Nav Toggle & Responsive Drawer
function initMobileNav() {
    const nav = document.querySelector('.bei-nav');
    const toggle = document.querySelector('.mobile-toggle');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = nav.classList.toggle('mobile-active');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggle.innerHTML = isOpen ? '✕' : '☰';
    });

    // Close when clicking any nav link
    const links = nav.querySelectorAll('.bei-nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('mobile-active');
            toggle.innerHTML = '☰';
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            nav.classList.remove('mobile-active');
            toggle.innerHTML = '☰';
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Student Progress / XP Feeling
function initStudentXP() {
    let xp = parseInt(localStorage.getItem('bei_student_xp') || '120', 10);
    const xpBadges = document.querySelectorAll('#studentXP, .nav-xp-badge');
    xpBadges.forEach(badge => {
        badge.innerHTML = `<span class="xp-icon">⚡</span> ${xp} XP`;
    });
}

function awardXP(points, reason) {
    let xp = parseInt(localStorage.getItem('bei_student_xp') || '120', 10) + points;
    localStorage.setItem('bei_student_xp', xp.toString());
    const xpBadges = document.querySelectorAll('#studentXP, .nav-xp-badge');
    xpBadges.forEach(badge => {
        badge.innerHTML = `<span class="xp-icon">⚡</span> ${xp} XP`;
        badge.classList.add('xp-pulse');
        setTimeout(() => badge.classList.remove('xp-pulse'), 800);
    });
    console.log(`Earned ${points} XP for: ${reason}`);
}

window.awardXP = awardXP;

// ═════════════════════════════════════════════════════════════════════
// DYNAMIC TYPEWRITER EFFECT FOR HERO HEADLINE
// ═════════════════════════════════════════════════════════════════════
function initTypewriter() {
    const target = document.getElementById('typewriterTarget');
    const cursor = document.getElementById('typingCursor');
    if (!target) return;

    const phrases = [
        "Create with Excellence (Iḥsān).",
        "Engineer with Integrity (Amānah).",
        "Build Beneficial Knowledge ('Ilm Nāfi').",
        "Master Python, Web & Ethical AI.",
        "Craft with Purpose & Discipline."
    ];

    let phraseIndex = 0;
    let charIndex = phrases[0].length; // initial text is already loaded for instant SEO & zero CLS
    let isDeleting = true;
    const holdTime = 2800; // time to read the completed phrase

    function tick() {
        const fullPhrase = phrases[phraseIndex];

        if (isDeleting) {
            charIndex--;
            target.textContent = fullPhrase.substring(0, charIndex);
        } else {
            charIndex++;
            target.textContent = fullPhrase.substring(0, charIndex);
        }

        let speed = isDeleting ? 28 : 55;

        if (!isDeleting && charIndex === fullPhrase.length) {
            speed = holdTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 450; // pause before typing next phrase
        }

        setTimeout(tick, speed);
    }

    // Start typing cycle after initial 2.6s reading pause
    setTimeout(tick, 2600);
}
