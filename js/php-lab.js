/**
 * Junior Coders - PHP Lab engine (shared by the PHP Console studio and the PHP exercises)
 *
 * Runs real PHP 8.3 in the browser with php-wasm (PHP compiled to WebAssembly, loaded from
 * jsdelivr, pinned). The first load downloads about 12 MB once; browsers cache it afterwards.
 * No server, nothing is sent anywhere: the code runs on the student's device.
 *
 *   PHPLab.ready().then(() => PHPLab.run('<?php echo 1 + 1;')).then(r => r.stdout)   // "2"
 *   r = { stdout, stderr, exit }       // ready() rejects with a readable message if the engine cannot load
 */
(function () {
    'use strict';
    if (window.PHPLab) return;

    const CDN = 'https://cdn.jsdelivr.net/npm/php-wasm@0.2.0/';
    const VERSION = '8.3';

    let php = null;
    let readyPromise = null;
    let chain = Promise.resolve();
    let stdout = '', stderr = '';
    const listeners = [];

    function ready() {
        if (readyPromise) return readyPromise;
        readyPromise = import(CDN + 'PhpWeb.mjs')
            .then(({ PhpWeb }) => {
                php = new PhpWeb({ version: VERSION });
                php.addEventListener('output', (e) => { stdout += Array.isArray(e.detail) ? e.detail.join('') : String(e.detail); });
                php.addEventListener('error', (e) => { stderr += Array.isArray(e.detail) ? e.detail.join('') : String(e.detail); });
                return php.binary;
            })
            .then(() => { listeners.forEach(fn => fn()); return true; })
            .catch((err) => {
                readyPromise = null;
                throw new Error('The PHP engine could not be downloaded (' + (err && err.message ? err.message : 'network error') + '). Check your internet connection and reload.');
            });
        return readyPromise;
    }

    /** Runs a complete PHP script (include the opening <?php tag). Runs are queued, one at a time. */
    function run(code) {
        if (!php) return Promise.reject(new Error('The PHP engine is still loading. Try again in a moment.'));
        const job = chain.then(async () => {
            stdout = ''; stderr = '';
            let exit = 0;
            try { exit = await php.run(code); }
            catch (err) { stderr += (err && err.message) ? err.message : String(err); exit = 255; }
            return { stdout, stderr, exit };
        });
        chain = job.catch(() => {});
        return job;
    }

    function onReady(fn) { if (php) fn(); else listeners.push(fn); }

    window.PHPLab = { ready, run, onReady, version: VERSION, isReady: () => !!php };
})();
