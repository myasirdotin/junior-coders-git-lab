/**
 * Junior Coders - Narrator voice helper (shared by js/book-speaker.js and js/core.js)
 *
 * The narrators use the browser's built-in Web Speech voices. Quality depends entirely on
 * what the browser offers: Chrome on Windows only has the old Microsoft voices (robotic),
 * Microsoft Edge adds free "Natural" neural voices, Android/iOS have decent system voices.
 * This helper ranks the available English voices, remembers the one the reader picks,
 * renders a small voice picker, and tells the page when only basic voices exist.
 */
(function () {
    'use strict';
    if (window.JCVoices) return;

    const STORAGE_KEY = 'bei_tts_voice';
    const pickers = [];

    function score(v) {
        if (!v || !v.lang || !v.lang.toLowerCase().startsWith('en')) return -100;
        const name = (v.name || '').toLowerCase(), uri = (v.voiceURI || '').toLowerCase();
        let s = 10;
        if (name.includes('espeak') || uri.includes('espeak')) s -= 80;
        if (name.includes('desktop') || uri.includes('desktop')) s -= 40;
        if (name.includes('natural') || uri.includes('natural')) s += 75;
        if (name.includes('neural') || uri.includes('neural')) s += 75;
        if (name.includes('online') || uri.includes('online')) s += 45;
        if (name.includes('enhanced') || name.includes('premium')) s += 50;
        if (name.includes('google')) s += 35;
        if (name.includes('siri') || name.includes('samantha') || name.includes('daniel')) s += 30;
        if (/\b(aria|jenny|guy|sonia|ryan|libby)\b/.test(name)) s += 20;
        if (v.localService === false) s += 25;
        if (/^en[-_]us/i.test(v.lang)) s += 10;
        else if (/^en[-_]gb/i.test(v.lang)) s += 8;
        return s;
    }

    function english() {
        if (!('speechSynthesis' in window)) return [];
        return window.speechSynthesis.getVoices()
            .filter(v => v.lang && v.lang.toLowerCase().startsWith('en'))
            .sort((a, b) => score(b) - score(a));
    }

    /** Neural / enhanced voices only. Google's Chrome voices are usable but flat, so they do not count. */
    function isNatural(v) { return /natural|neural|enhanced|premium|siri/i.test((v && v.name) || '') || /natural|neural/i.test((v && v.voiceURI) || ''); }

    function chosenName() { try { return localStorage.getItem(STORAGE_KEY) || ''; } catch (e) { return ''; } }

    function best() {
        const list = english();
        if (!list.length) return null;
        const wanted = chosenName();
        return (wanted && list.find(v => v.name === wanted)) || list[0];
    }

    function choose(name) {
        try { if (name) localStorage.setItem(STORAGE_KEY, name); else localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
        pickers.forEach(p => { if (p.select.value !== name) p.select.value = name; });
    }

    function label(v) {
        // "Microsoft Aria Online (Natural) - English (United States)" -> "Aria (Natural) · en-US"
        let n = (v.name || '').replace(/^Microsoft\s+/i, '').replace(/^Google\s+/i, 'Google ').replace(/\s*-\s*English.*$/i, '').trim();
        if (!/natural|neural|online|enhanced|premium|google|siri/i.test(v.name)) n += ' (basic)';
        return n + ' · ' + v.lang;
    }

    /** Only basic voices and we are on desktop Windows (where Edge has free natural voices): advise. */
    function hint() {
        const list = english();
        if (!list.length || list.some(isNatural)) return null;
        const ua = navigator.userAgent || '';
        if (/Windows/i.test(ua) && !/Edg\//i.test(ua)) {
            return 'For a more natural narrator, open this page in Microsoft Edge: its "Natural" voices are free and work with the same Read button.';
        }
        return 'This browser only has basic voices. A browser or device with "Natural" or "Enhanced" voices will sound much better.';
    }

    function fill(select) {
        const list = english().slice(0, 10);
        const current = (best() || {}).name || '';
        select.innerHTML = list.length
            ? list.map(v => `<option value="${v.name.replace(/"/g, '&quot;')}"${v.name === current ? ' selected' : ''}>${label(v).replace(/</g, '&lt;')}</option>`).join('')
            : '<option value="">No voices found</option>';
    }

    /** Builds a <select> of the best English voices; onChange(voice) fires when the reader picks one. */
    function picker(onChange) {
        const select = document.createElement('select');
        select.className = 'tts-voice-select';
        select.title = 'Narrator voice';
        select.setAttribute('aria-label', 'Narrator voice');
        fill(select);
        select.addEventListener('change', () => { choose(select.value); if (onChange) onChange(best()); });
        pickers.push({ select, onChange });
        return select;
    }

    if ('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.addEventListener('voiceschanged', () => pickers.forEach(p => fill(p.select)));
    }

    window.JCVoices = { score, english, best, isNatural, choose, chosenName, hint, picker, label };
})();
