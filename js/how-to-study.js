/**
 * Junior Coders - "Which level is it?" self-check on how-to-study/index.html.
 * The student picks the Bloom level each task asks for. Nothing is saved and no XP is given.
 */
(function () {
    'use strict';

    const LEVELS = ['Remember', 'Understand', 'Apply', 'Analyse', 'Evaluate', 'Create'];

    // level = index into LEVELS; order is mixed on purpose
    const TASKS = [
        { text: 'This Python program crashes on line 4 when the list of books is empty. Find out why.', level: 3,
          why: 'you take the program apart to find the cause of a problem.' },
        { text: 'List the six heading tags in HTML.', level: 0,
          why: 'you only recall facts you have seen before.' },
        { text: 'Design and build a small web page that tracks your class\'s charity drive.', level: 5,
          why: 'you make something new of your own, with no example to copy.' },
        { text: 'In your own words, what is the difference between a class and an id in CSS?', level: 1,
          why: 'you explain an idea in your own words, not just repeat its definition.' },
        { text: 'Here are two ways to check a password. Which one keeps users safer, and why?', level: 4,
          why: 'you judge two solutions and give reasons for your choice.' },
        { text: 'Write a SELECT query that finds every book by one author in the school library database.', level: 2,
          why: 'you use what you learned (SELECT and WHERE) on a new question.' }
    ];

    const quiz = document.getElementById('hts-quiz');
    const score = document.getElementById('hts-score');
    if (!quiz || !score) return;

    let answered = 0;
    let right = 0;

    function render() {
        answered = 0;
        right = 0;
        score.textContent = '';
        quiz.innerHTML = '';
        TASKS.forEach((task, i) => {
            const card = document.createElement('div');
            card.className = 'hts-q';

            const text = document.createElement('p');
            text.className = 'hts-q-text';
            const num = document.createElement('span');
            num.textContent = (i + 1) + '.';
            text.append(num, document.createTextNode(task.text));

            const options = document.createElement('div');
            options.className = 'hts-q-options';
            options.setAttribute('role', 'group');
            options.setAttribute('aria-label', 'Level for task ' + (i + 1));

            const feedback = document.createElement('p');
            feedback.className = 'hts-q-feedback';
            feedback.setAttribute('aria-live', 'polite');
            feedback.hidden = true;

            LEVELS.forEach((name, level) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = name;
                btn.addEventListener('click', () => choose(task, level, options, feedback));
                options.appendChild(btn);
            });

            card.append(text, options, feedback);
            quiz.appendChild(card);
        });
    }

    function choose(task, level, options, feedback) {
        const buttons = options.querySelectorAll('button');
        buttons.forEach((b, j) => {
            b.disabled = true;
            if (j === task.level) b.classList.add('is-right');
            else if (j === level) b.classList.add('is-wrong');
        });
        const ok = level === task.level;
        const verdict = document.createElement('strong');
        verdict.className = ok ? 'ok' : 'no';
        verdict.textContent = ok ? 'Yes. ' : 'Not quite. ';
        feedback.textContent = '';
        feedback.append(verdict, document.createTextNode(
            'This is ' + LEVELS[task.level] + ': ' + task.why));
        feedback.hidden = false;

        answered += 1;
        if (ok) right += 1;
        if (answered === TASKS.length) {
            score.textContent = 'You placed ' + right + ' of ' + TASKS.length + ' tasks on the right step.';
            const again = document.createElement('button');
            again.type = 'button';
            again.textContent = 'Try again';
            again.addEventListener('click', () => {
                render();
                quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            score.appendChild(again);
        }
    }

    render();
})();
