/**
 * Junior Coders - Kotlin Lab (used by the Kotlin exercises, studios/kotlin-practice/)
 *
 * There is no Kotlin compiler small enough to run inside the browser, so the code is sent to the free
 * Kotlin Playground compiler run by JetBrains (api.kotlinlang.org, the service behind play.kotlinlang.org).
 * Only the program text is sent: no name, no account, nothing else. It needs an internet connection.
 *
 *   KotlinLab.ready().then(() => KotlinLab.run('fun main() { println(1 + 1) }')).then(r => r.stdout)   // "2\n"
 *   r = { stdout, errors: [{ line, message }], exception }   // exception: "IndexOutOfBoundsException: Index: 3, Size: 1"
 */
(function () {
    'use strict';
    if (window.KotlinLab) return;

    const API = 'https://api.kotlinlang.org';
    const FALLBACK_VERSION = '2.1.21';
    const TIMEOUT_MS = 25000;
    let version = null;
    let readyPromise = null;
    let chain = Promise.resolve();

    function withTimeout(promise, ms, what) {
        return Promise.race([promise, new Promise((_, reject) =>
            setTimeout(() => reject(new Error(what + ' took too long. Check your internet connection and try again.')), ms))]);
    }

    /** Finds the newest stable Kotlin version on the service (falls back to a known one). */
    function ready() {
        if (readyPromise) return readyPromise;
        readyPromise = withTimeout(fetch(API + '/versions').then((r) => r.json()), 10000, 'Reaching the Kotlin compiler')
            .then((list) => {
                const stable = Array.isArray(list) && (list.find((v) => v.latestStable) || list[0]);
                version = (stable && stable.version) || FALLBACK_VERSION;
                return version;
            })
            .catch((err) => {
                readyPromise = null;
                throw new Error('The Kotlin compiler could not be reached (' + (err && err.message ? err.message : 'network error') + ').');
            });
        return readyPromise;
    }

    /** Compiles and runs a complete Kotlin program (with fun main). Runs are queued, one at a time. */
    function run(code) {
        const job = chain.then(async () => {
            await ready();
            const res = await withTimeout(fetch(`${API}/api/${version}/compiler/run`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ args: '', files: [{ name: 'File.kt', text: code, publicId: '' }], confType: 'java' })
            }), TIMEOUT_MS, 'Running your code');
            if (!res.ok) throw new Error('The Kotlin compiler answered with an error (' + res.status + '). Try again in a moment.');
            const data = await res.json();
            const text = String(data.text || '');
            const stdout = Array.from(text.matchAll(/<outStream>([\s\S]*?)<\/outStream>/g)).map((m) => m[1]).join('');
            const stderr = Array.from(text.matchAll(/<errStream>([\s\S]*?)<\/errStream>/g)).map((m) => m[1]).join('');
            const errors = ((data.errors && data.errors['File.kt']) || [])
                .filter((e) => e.severity === 'ERROR')
                .map((e) => ({ line: e.interval ? e.interval.start.line + 1 : 0, message: e.message }));
            const ex = data.exception;
            const exception = ex ? String(ex.fullName || 'Error').split('.').pop() + (ex.message ? ': ' + ex.message : '') : '';
            return { stdout, stderr, errors, exception };
        });
        chain = job.catch(() => {});
        return job;
    }

    window.KotlinLab = { ready, run, version: () => version };
})();
