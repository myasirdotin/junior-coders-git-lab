/**
 * Junior Coders - Chapter Pagination System
 * Automatically attaches:
 * 1. Rich "Previous Lesson" & "Next Lesson" footer cards at the bottom of every chapter.
 * 2. Sticky header quick-nav buttons (← Prev / Next →) in the reader controls bar.
 * 3. Keyboard navigation shortcut (Alt + Left / Alt + Right).
 */
(function() {
  function escapeHtml(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getChapterContainer() {
    return document.getElementById('chapterContent') || document.getElementById('chapterBody');
  }

  function getAllChapterLinks() {
    return Array.from(document.querySelectorAll('.chapter-nav-item a'));
  }

  function findCurrentIndex(allLinks) {
    if (!allLinks.length) return -1;

    // 1. Check for active class on nav-item or link
    let activeItem = document.querySelector('.chapter-nav-item.active a') ||
                     document.querySelector('.chapter-nav-item a.active');
    if (activeItem) {
      const idx = allLinks.indexOf(activeItem);
      if (idx !== -1) return idx;
    }

    // 2. Check currentChapterPath global variable
    if (window.currentChapterPath) {
      const idx = allLinks.findIndex(a => {
        const onclick = a.getAttribute('onclick') || '';
        return onclick.includes(window.currentChapterPath);
      });
      if (idx !== -1) return idx;
    }

    // 3. Check location.hash
    if (window.location.hash) {
      const idx = allLinks.findIndex(a => a.getAttribute('href') === window.location.hash);
      if (idx !== -1) return idx;
    }

    return 0;
  }

  function renderChapterPagination(explicitPath) {
    const container = getChapterContainer();
    if (!container) return;

    const allLinks = getAllChapterLinks();
    if (!allLinks.length) return;

    let currentIndex = -1;
    if (explicitPath) {
      currentIndex = allLinks.findIndex(a => {
        const onclick = a.getAttribute('onclick') || '';
        return onclick.includes(explicitPath);
      });
    }

    if (currentIndex === -1) {
      currentIndex = findCurrentIndex(allLinks);
    }
    if (currentIndex === -1) return;

    // Remove any previous pagination bar & footer
    const existing = container.querySelector('.chapter-pagination-nav');
    if (existing) existing.remove();
    const existingFooter = container.querySelector('.chapter-reader-footer');
    if (existingFooter) existingFooter.remove();

    // Create pagination container
    const nav = document.createElement('nav');
    nav.className = 'chapter-pagination-nav';
    nav.setAttribute('aria-label', 'Lesson Navigation');

    const prevLink = currentIndex > 0 ? allLinks[currentIndex - 1] : null;
    const nextLink = currentIndex < allLinks.length - 1 ? allLinks[currentIndex + 1] : null;

    // 1. Previous Lesson Card
    if (prevLink) {
      const prevCard = document.createElement('a');
      prevCard.className = 'chapter-page-card prev';
      prevCard.href = prevLink.getAttribute('href') || '#';
      prevCard.innerHTML = `
        <div class="page-direction-badge">
          <span class="dir-arrow">←</span>
          <span class="dir-label">Previous Lesson</span>
        </div>
        <div class="page-title-text">${escapeHtml(prevLink.textContent.trim())}</div>
      `;
      prevCard.onclick = (e) => {
        e.preventDefault();
        prevLink.click();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      nav.appendChild(prevCard);
    } else {
      // Empty spacer to keep layout balanced
      const spacer = document.createElement('div');
      spacer.className = 'chapter-page-spacer';
      nav.appendChild(spacer);
    }

    // 2. Next Lesson Card
    if (nextLink) {
      const nextCard = document.createElement('a');
      nextCard.className = 'chapter-page-card next';
      nextCard.href = nextLink.getAttribute('href') || '#';
      nextCard.innerHTML = `
        <div class="page-direction-badge">
          <span class="dir-label">Next Lesson</span>
          <span class="dir-arrow">→</span>
        </div>
        <div class="page-title-text">${escapeHtml(nextLink.textContent.trim())}</div>
      `;
      nextCard.onclick = (e) => {
        e.preventDefault();
        nextLink.click();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      nav.appendChild(nextCard);
    } else {
      // Course Completion Card on final lesson
      const compCard = document.createElement('div');
      compCard.className = 'chapter-page-card complete';
      compCard.innerHTML = `
        <div class="page-direction-badge" style="color: #059669;">
          <span class="dir-label">🌟 Course Complete</span>
        </div>
        <div class="page-title-text" style="color: #059669;">You've mastered this textbook!</div>
      `;
      nav.appendChild(compCard);
    }

    container.appendChild(nav);

    // Dedicated Reader Footer
    const footer = document.createElement('footer');
    footer.className = 'chapter-reader-footer';
    footer.innerHTML = `
      <div class="reader-footer-inner">
        <div class="reader-footer-dedication">
          <span class="dedication-sparkle">✦</span> Designed with <em>Iḥsān</em> for <strong>Yasir Rasool</strong> &bull; Lead Developer &amp; Educator
        </div>
        <div class="reader-footer-copyright">
          &copy; 2026 Junior Coders (Junior Coders). Dedicated to Beneficial Knowledge (<em>'Ilm N&#257;fi'</em>), Digital Stewardship &amp; Craftsmanship.
        </div>
        <div class="reader-footer-pills">
          <a href="https://github.com/myasirdotin/" target="_blank" rel="noopener noreferrer" class="reader-footer-pill" title="GitHub Profile - Yasir Rasool">
            <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            <span>github.com/myasirdotin</span>
          </a>
          <a href="https://beicoders.vercel.app" target="_blank" rel="noopener noreferrer" class="reader-footer-pill live-pill" title="Live Platform">
            <span class="live-dot-pulse"></span>
            <span>beicoders.vercel.app</span>
          </a>
        </div>
      </div>
    `;
    container.appendChild(footer);

    // Update sticky header quick navigation buttons
    updateHeaderQuickNav(currentIndex, allLinks);
  }

  function updateHeaderQuickNav(currentIndex, allLinks) {
    const center = document.querySelector('.reader-status-center');
    const headerRight = document.querySelector('.reader-controls-right') || document.querySelector('.reader-header-main');
    if (!center && !headerRight) return;

    let quickNav = document.getElementById('headerQuickNav');
    if (!quickNav) {
      quickNav = document.createElement('div');
      quickNav.id = 'headerQuickNav';
      quickNav.className = 'header-quick-nav';

      if (center) {
        center.insertBefore(quickNav, center.firstChild);
      } else if (headerRight) {
        const speedPill = headerRight.querySelector('.reader-speed-pill');
        if (speedPill) {
          headerRight.insertBefore(quickNav, speedPill);
        } else {
          headerRight.insertBefore(quickNav, headerRight.firstChild);
        }
      }
    }

    const prevLink = currentIndex > 0 ? allLinks[currentIndex - 1] : null;
    const nextLink = currentIndex < allLinks.length - 1 ? allLinks[currentIndex + 1] : null;

    quickNav.innerHTML = `
      <button type="button" class="header-nav-btn prev" ${!prevLink ? 'disabled' : ''} title="${prevLink ? 'Previous: ' + prevLink.textContent.trim() + ' (Alt+←)' : 'First Lesson'}">
        <span class="nav-arrow">←</span> <span>Prev</span>
      </button>
      <button type="button" class="header-nav-btn next" ${!nextLink ? 'disabled' : ''} title="${nextLink ? 'Next: ' + nextLink.textContent.trim() + ' (Alt+→)' : 'Last Lesson'}">
        <span>Next</span> <span class="nav-arrow">→</span>
      </button>
    `;

    const prevBtn = quickNav.querySelector('.header-nav-btn.prev');
    const nextBtn = quickNav.querySelector('.header-nav-btn.next');

    if (prevBtn && prevLink) {
      prevBtn.onclick = (e) => {
        e.preventDefault();
        prevLink.click();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    }
    if (nextBtn && nextLink) {
      nextBtn.onclick = (e) => {
        e.preventDefault();
        nextLink.click();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    }
  }

  // Keyboard Navigation: Alt + Left (Previous), Alt + Right (Next)
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
      return;
    }
    if (e.altKey && e.key === 'ArrowLeft') {
      const prevBtn = document.querySelector('.header-nav-btn.prev:not([disabled])');
      if (prevBtn) {
        e.preventDefault();
        prevBtn.click();
      }
    } else if (e.altKey && e.key === 'ArrowRight') {
      const nextBtn = document.querySelector('.header-nav-btn.next:not([disabled])');
      if (nextBtn) {
        e.preventDefault();
        nextBtn.click();
      }
    }
  });

  window.renderChapterPagination = renderChapterPagination;

  // Auto-initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Intercept chapter link clicks to refresh pagination
    document.querySelectorAll('.chapter-nav-item a').forEach(a => {
      a.addEventListener('click', () => {
        setTimeout(renderChapterPagination, 60);
      });
    });

    // Initial render
    setTimeout(renderChapterPagination, 120);
  });
})();
