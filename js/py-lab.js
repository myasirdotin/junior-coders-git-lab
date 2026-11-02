/**
 * Junior Coders - Python Lab engine (used by the practice pages, js/practice-cards.js)
 *
 * Runs real Python in the browser with Pyodide (CPython compiled to WebAssembly, pinned on jsdelivr,
 * the same version as the Python Console studio). The first load downloads a few MB once; browsers
 * cache it afterwards. Nothing is sent anywhere: the code runs on the student's device.
 *
 *   PyLab.ready().then(() => PyLab.run('print(1 + 1)')).then(r => r.stdout)   // "2\n"
 *   r = { stdout, stderr }      // ready() rejects with a readable message if the engine cannot load
 */
(function () {
    'use strict';
    if (window.PyLab) return;

    const SRC = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
    let py = null;
    let readyPromise = null;
    let chain = Promise.resolve();

    function loadScript() {
        if (typeof window.loadPyodide === 'function') return Promise.resolve();
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = SRC;
            s.onload = resolve;
            s.onerror = () => reject(new Error('network error'));
            document.head.appendChild(s);
        });
    }

    function ready() {
        if (readyPromise) return readyPromise;
        readyPromise = loadScript()
            .then(() => window.loadPyodide())
            .then((instance) => { py = instance; PyLab.version = py.runPython('import sys; sys.version.split()[0]'); return true; })
            .catch((err) => {
                readyPromise = null;
                throw new Error('The Python engine could not be downloaded (' + (err && err.message ? err.message : 'network error') + '). Check your internet connection and reload.');
            });
        return readyPromise;
    }

    // One program at a time, each in a fresh namespace so variables from an earlier run do not leak in
    function run(code) {
        const job = chain.then(() => ready()).then(() => {
            let stdout = '', stderr = '';
            py.setStdout({ batched: (t) => { stdout += t + '\n'; } });
            py.setStderr({ batched: (t) => { stderr += t + '\n'; } });
            const scope = py.globals.get('dict')();
            try {
                py.runPython(code, { globals: scope });
            } catch (err) {
                const msg = String(err && err.message || err);
                const lines = msg.trim().split('\n');
                stderr += lines[lines.length - 1] + '\n';   // the last line names the error, e.g. "NameError: name 'x' is not defined"
            } finally {
                scope.destroy();
            }
            return { stdout, stderr };
        });
        chain = job.catch(() => {});
        return job;
    }

    const PyLab = { ready, run, version: '' };
    window.PyLab = PyLab;
})();
