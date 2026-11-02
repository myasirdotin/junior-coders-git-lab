/**
 * Junior Coders - Python practice (Learning Python/exercises.html), run by js/practice-cards.js.
 * Format: see the header of js/practice-cards.js. `python` tasks really run (Pyodide, Python 3.11, js/py-lab.js) and the
 * student's output is compared with the solution's output; `predict` tasks with lang 'python' are run by the self-test.
 * After any edit: node scripts/check-practice.js
 * Lessons: 1 Foundations & Variables (ch1–3), 2 Decisions & Logic (ch4), 3 Loops & Sequences (ch5),
 * 4 Collections & Records (ch6–7), 5 Functions & Modularity (ch8), 6 Files & Datasets (ch9–10),
 * 7 What is Machine Learning? (ch11–12), 8 Supervised AI & Ethical Stewardship (ch13–14).
 * Only ideas the track has taught: no list comprehensions, lambda, zip, enumerate, classes or :.1f format specs (use round()).
 * No input(): the runner has no keyboard, so data is given in variables. Scenarios follow GEMINI §1.
 */
(window.JC_PRACTICE = window.JC_PRACTICE || {}).python = [
    // ── Tier 1: warm-up ──
    {
        id: 'predict-numbers', tier: 1, type: 'predict', lang: 'python', title: 'Boxes for the food drive', module: 1, chapter: 2,
        task: 'What does this program print? (Three lines.)',
        code: 'boxes = 12\nboxes += 8\nprint(boxes)\nprint(15 // 4, 15 % 4)\nprint(7 / 2)',
        answers: ['20\n3 3\n3.5'],
        why: '<code>boxes += 8</code> adds 8 to the old value, so 12 becomes 20. <code>//</code> keeps only the whole part (15 ÷ 4 = 3 remainder 3) and <code>%</code> gives the remainder. A single <code>/</code> always gives a decimal number, so <code>7 / 2</code> is <code>3.5</code>.'
    },
    {
        id: 'py-welcome', tier: 1, type: 'python', title: 'A welcome card with an f-string', module: 1, chapter: 3,
        task: 'The variables are ready. Use <strong>one</strong> f-string to print exactly:<br><code>Welcome Khadija from Fez! May your studies be blessed.</code>',
        starter: 'student_name = "Khadija"\ncity = "Fez"\n\n# Print the welcome line with an f-string\n',
        solution: 'student_name = "Khadija"\ncity = "Fez"\n\n# Print the welcome line with an f-string\nprint(f"Welcome {student_name} from {city}! May your studies be blessed.")\n',
        expected: 'Welcome Khadija from Fez! May your studies be blessed.',
        hint1: 'An f-string starts with <code>f</code> just before the opening quote: <code>f"..."</code>.',
        hint2: 'Put each variable inside curly braces: <code>print(f"Welcome {student_name} from {city}! ...")</code>.',
        why: 'Inside an f-string, Python replaces <code>{student_name}</code> and <code>{city}</code> with the values in those variables. The rest of the text is printed as it is.'
    },
    {
        id: 'fill-elif', tier: 1, type: 'fill', title: 'Three possible results', module: 2, chapter: 4,
        task: 'The program needs a second test that only runs if the first one was false. Which keyword goes in the gap?',
        code: 'score = 65\nif score >= 80:\n    print("Excellent")\n____ score >= 50:\n    print("Passed")\nelse:\n    print("Keep practising")',
        answers: ['elif'],
        why: '<code>elif</code> means "else, if". Python checks it only when the <code>if</code> above was false. Here 65 is not 80 or more, but it is 50 or more, so the program prints <code>Passed</code>.'
    },
    {
        id: 'predict-range', tier: 1, type: 'predict', lang: 'python', title: 'Counting in steps', module: 3, chapter: 5,
        task: 'What does this loop print? (One number per line.)',
        code: 'for n in range(2, 11, 4):\n    print(n)',
        answers: ['2\n6\n10'],
        why: '<code>range(2, 11, 4)</code> starts at 2, adds 4 each time, and stops <em>before</em> 11. So it gives 2, 6 and 10. The next number, 14, is past the stop.'
    },
    {
        id: 'predict-list-methods', tier: 1, type: 'predict', lang: 'python', title: 'The fruit basket list', module: 4, chapter: 6,
        task: 'What does this program print? (Two lines. Write the list exactly as Python shows it.)',
        code: 'fruits = ["Date", "Fig", "Olive"]\nfruits.append("Pomegranate")\nfruits.pop(0)\nprint(fruits)\nprint(len(fruits))',
        answers: ["['Fig', 'Olive', 'Pomegranate']\n3"],
        why: '<code>.append()</code> adds an item at the end. <code>.pop(0)</code> removes the item at position 0, the first one ("Date"). Python shows a list with square brackets and single quotes. Three items are left.'
    },
    {
        id: 'choice-feature-label', tier: 1, type: 'choice', title: 'Feature or label?', module: 7, chapter: 11,
        task: 'A school garden club records <em>soil moisture</em>, <em>temperature</em> and <em>hours of sunlight</em> for each plant, and whether the plant <em>needed water</em> (yes or no). A model will learn to guess the last one. Which of these is the <strong>label</strong>?',
        options: ['Soil moisture', 'Temperature', 'Needed water: yes or no', 'Hours of sunlight'],
        answer: 2,
        why: 'The <strong>label</strong> is the answer the model learns to predict. The <strong>features</strong> are the clues it uses: soil moisture, temperature and sunlight.'
    },

    // ── Tier 2: apply ──
    {
        id: 'bug-equals', tier: 2, type: 'bug', title: 'Checking a quiz answer', module: 2, chapter: 4,
        task: 'Python stops with a <code>SyntaxError</code> before printing anything. Tap the line with the mistake.',
        lines: [
            'answer = 12',
            'if answer = 12:',
            '    print("Correct, well done!")',
            'else:',
            '    print("Try again.")'
        ],
        bad: 1,
        fix: 'if answer == 12:',
        why: 'One <code>=</code> <em>stores</em> a value in a variable. Two, <code>==</code>, <em>compares</em> two values. An <code>if</code> asks a question, so it needs <code>==</code>.'
    },
    {
        id: 'py-donation-while', tier: 2, type: 'python', title: 'Saving up for the charity box', module: 3, chapter: 5,
        task: 'Bilal adds 150 rupees to a charity box every week. His goal is 1000 rupees. Use a <code>while</code> loop that runs while the total is below the goal. Each week, add 150 and print the week and the total, like <code>Week 1: 150</code>. After the loop, print <code>Goal reached in 7 weeks.</code> (use your week counter for the number).',
        starter: 'goal = 1000\nweekly = 150\ntotal = 0\nweek = 0\n\n# Write a while loop that adds the weekly amount until the goal is reached\n',
        solution: 'goal = 1000\nweekly = 150\ntotal = 0\nweek = 0\n\nwhile total < goal:\n    week += 1\n    total += weekly\n    print(f"Week {week}: {total}")\n\nprint(f"Goal reached in {week} weeks.")\n',
        expected: 'Week 1: 150\nWeek 2: 300\nWeek 3: 450\nWeek 4: 600\nWeek 5: 750\nWeek 6: 900\nWeek 7: 1050\nGoal reached in 7 weeks.',
        hint1: 'The loop line is <code>while total &lt; goal:</code>. Everything inside it is indented by 4 spaces.',
        hint2: 'Inside the loop: <code>week += 1</code>, then <code>total += weekly</code>, then <code>print(f"Week {week}: {total}")</code>. The last print goes after the loop, not indented.',
        why: 'A <code>while</code> loop is right when you do not know in advance how many rounds you need. It checks the condition before every round and stops as soon as the total reaches 1000 or more.'
    },
    {
        id: 'py-solar-dict', tier: 2, type: 'python', title: 'The community solar panels', module: 4, chapter: 7,
        task: 'A dictionary holds how many kWh each solar array made today. Loop over it and print each array like <code>North: 42.5 kWh</code>. Then print three lines: <code>Total: 184.0 kWh</code>, <code>Average: 46.0 kWh</code> (total divided by the number of arrays, rounded to 1 decimal place with <code>round()</code>) and <code>Best array: South</code> (the array with the most kWh, found in your loop).',
        starter: 'arrays = {"North": 42.5, "East": 38.0, "South": 55.5, "West": 48.0}\n\ntotal = 0\nbest_name = ""\nbest_kwh = 0\n\n# Loop over the arrays: print each one, add to the total, remember the best\n',
        solution: 'arrays = {"North": 42.5, "East": 38.0, "South": 55.5, "West": 48.0}\n\ntotal = 0\nbest_name = ""\nbest_kwh = 0\n\nfor name, kwh in arrays.items():\n    print(f"{name}: {kwh} kWh")\n    total += kwh\n    if kwh > best_kwh:\n        best_kwh = kwh\n        best_name = name\n\naverage = round(total / len(arrays), 1)\nprint(f"Total: {total} kWh")\nprint(f"Average: {average} kWh")\nprint(f"Best array: {best_name}")\n',
        expected: 'North: 42.5 kWh\nEast: 38.0 kWh\nSouth: 55.5 kWh\nWest: 48.0 kWh\nTotal: 184.0 kWh\nAverage: 46.0 kWh\nBest array: South',
        hint1: '<code>for name, kwh in arrays.items():</code> gives you each key and its value. <code>len(arrays)</code> is the number of arrays.',
        hint2: 'Inside the loop, add <code>kwh</code> to <code>total</code>, and if <code>kwh &gt; best_kwh</code>, store both <code>kwh</code> and <code>name</code>. After the loop, <code>average = round(total / len(arrays), 1)</code>.',
        why: '<code>.items()</code> visits every key–value pair, so one loop can print, add up and find the biggest value at the same time. Keeping a "best so far" variable is a pattern you will use again and again.'
    },
    {
        id: 'bug-missing-return', tier: 2, type: 'bug', title: 'The garden area is None', module: 5, chapter: 8,
        task: 'This should print <code>Garden area: 24 square metres</code>, but it prints <code>Garden area: None square metres</code>. Tap the line with the mistake.',
        lines: [
            'def garden_area(length, width):',
            '    length * width',
            'area = garden_area(6, 4)',
            'print(f"Garden area: {area} square metres")'
        ],
        bad: 1,
        fix: '    return length * width',
        why: 'A function only hands a value back with <code>return</code>. Without it, the answer is worked out and then thrown away, and the call gives <code>None</code>, Python\'s word for "nothing".'
    },
    {
        id: 'py-zakat-function', tier: 2, type: 'python', title: 'A Zakat helper function', module: 5, chapter: 8,
        task: '<em>Zakat</em> is 2.5% of savings that reach the <strong>nisab</strong>, a minimum amount. The real nisab depends on the current price of gold or silver; here we use <code>5000</code> as a <strong>practice value</strong>. Finish <code>zakat_due(savings, nisab)</code>: if the savings are equal to or more than the nisab, return 2.5% of the savings rounded to 2 decimal places with <code>round()</code>; otherwise return <code>0</code>. The loop that prints the results is already written.',
        starter: 'NISAB_PRACTICE = 5000     # practice value only\n\ndef zakat_due(savings, nisab):\n    # If savings reach the nisab, return 2.5% of savings, rounded to 2 places.\n    # Otherwise return 0.\n    return 0\n\nfor savings in [3000, 5000, 12000, 8400]:\n    print(f"Savings {savings}: zakat {zakat_due(savings, NISAB_PRACTICE)}")\n',
        solution: 'NISAB_PRACTICE = 5000     # practice value only\n\ndef zakat_due(savings, nisab):\n    if savings >= nisab:\n        return round(savings * 0.025, 2)\n    return 0\n\nfor savings in [3000, 5000, 12000, 8400]:\n    print(f"Savings {savings}: zakat {zakat_due(savings, NISAB_PRACTICE)}")\n',
        expected: 'Savings 3000: zakat 0\nSavings 5000: zakat 125.0\nSavings 12000: zakat 300.0\nSavings 8400: zakat 210.0',
        hint1: 'Start with <code>if savings &gt;= nisab:</code>. 2.5% as a decimal is <code>0.025</code>.',
        hint2: 'Inside the <code>if</code>: <code>return round(savings * 0.025, 2)</code>. Keep <code>return 0</code> as the last line for savings below the nisab.',
        why: 'The function decides <em>and</em> calculates, then hands the answer back with <code>return</code>, so the loop can use it for any amount. <code>&gt;=</code> matters: savings exactly at the nisab do owe Zakat.'
    },
    {
        id: 'py-file-log', tier: 2, type: 'python', title: 'The science lab log file', module: 6, chapter: 9,
        task: 'Write the three observations into a file called <code>lab_log.txt</code> (mode <code>"w"</code>, one observation per line). Then open the file again for reading and print each line with its number, like <code>Line 1: Seeds planted: 12</code>.',
        starter: 'observations = ["Seeds planted: 12", "Sprouted after 5 days: 9", "Watered daily at 4 pm"]\n\n# 1. Write each observation to lab_log.txt, followed by "\\n"\n# 2. Read the file line by line and print "Line N: ..."\n',
        solution: 'observations = ["Seeds planted: 12", "Sprouted after 5 days: 9", "Watered daily at 4 pm"]\n\nwith open("lab_log.txt", "w", encoding="utf-8") as file:\n    for note in observations:\n        file.write(note + "\\n")\n\nline_number = 0\nwith open("lab_log.txt", "r", encoding="utf-8") as file:\n    for line in file:\n        line_number += 1\n        print(f"Line {line_number}: {line.strip()}")\n',
        expected: 'Line 1: Seeds planted: 12\nLine 2: Sprouted after 5 days: 9\nLine 3: Watered daily at 4 pm',
        hint1: '<code>with open("lab_log.txt", "w", encoding="utf-8") as file:</code> opens the file for writing. <code>.write()</code> does not add a new line, so add <code>"\\n"</code> yourself.',
        hint2: 'Open it again with <code>"r"</code> and loop: <code>for line in file:</code>. Count with <code>line_number += 1</code> and print <code>line.strip()</code> so the hidden <code>\\n</code> does not make blank lines.',
        why: '<code>with</code> closes the file for you when the block ends. Mode <code>"w"</code> starts a fresh file each time, and reading line by line keeps the <code>\\n</code> at the end of each line, which <code>.strip()</code> removes.'
    },
    {
        id: 'order-ml-pipeline', tier: 2, type: 'order', title: 'The five steps of machine learning', module: 8, chapter: 13,
        task: 'A class wants to train a model that predicts whether river water is clean or polluted. Put the steps of the machine-learning pipeline in order.',
        steps: [
            'Collect honest, fair data about water samples',
            'Clean the data: fix gaps, duplicates and typos',
            'Split the data into a training set and a test set',
            'Train the model on the training set only',
            'Evaluate the model on the test set it has never seen'
        ],
        why: 'Each step feeds the next. Splitting must come before training, so the test set stays hidden. A model tested on data it has already seen looks better than it really is.'
    },

    // ── Tier 3: challenge ──
    {
        id: 'py-water-check', tier: 3, type: 'python', title: 'The clean-water checker', module: 5, chapter: 8,
        task: 'Volunteers tested four village wells. Write a function <code>water_status(sample)</code> that returns <code>"Safe to drink"</code> when turbidity is below 5, pH is from 6.5 to 8.5 (both included) <strong>and</strong> dissolved solids (<code>"tds"</code>) are below 500; otherwise it returns <code>"Needs filtering"</code>. Print each well like <code>Well W-1: Safe to drink</code>, then <code>Safe wells: 2 of 4</code>. <em>(These are simplified teaching rules, not a real water test.)</em>',
        starter: 'wells = [\n    {"id": "W-1", "turbidity": 2.1, "ph": 7.2, "tds": 320},\n    {"id": "W-2", "turbidity": 8.4, "ph": 6.1, "tds": 650},\n    {"id": "W-3", "turbidity": 1.5, "ph": 7.8, "tds": 280},\n    {"id": "W-4", "turbidity": 3.0, "ph": 9.1, "tds": 410}\n]\n\n# Write water_status(sample) here, then check every well\n',
        solution: 'wells = [\n    {"id": "W-1", "turbidity": 2.1, "ph": 7.2, "tds": 320},\n    {"id": "W-2", "turbidity": 8.4, "ph": 6.1, "tds": 650},\n    {"id": "W-3", "turbidity": 1.5, "ph": 7.8, "tds": 280},\n    {"id": "W-4", "turbidity": 3.0, "ph": 9.1, "tds": 410}\n]\n\ndef water_status(sample):\n    if sample["turbidity"] < 5 and sample["ph"] >= 6.5 and sample["ph"] <= 8.5 and sample["tds"] < 500:\n        return "Safe to drink"\n    return "Needs filtering"\n\nsafe = 0\nfor well in wells:\n    status = water_status(well)\n    print(f"Well {well[\'id\']}: {status}")\n    if status == "Safe to drink":\n        safe += 1\n\nprint(f"Safe wells: {safe} of {len(wells)}")\n',
        expected: 'Well W-1: Safe to drink\nWell W-2: Needs filtering\nWell W-3: Safe to drink\nWell W-4: Needs filtering\nSafe wells: 2 of 4',
        hint1: 'Read a value from a record with its key: <code>sample["ph"]</code>. Join the four tests with <code>and</code>; "from 6.5 to 8.5" is two tests: <code>&gt;= 6.5</code> and <code>&lt;= 8.5</code>.',
        hint2: 'Loop with <code>for well in wells:</code>, call <code>status = water_status(well)</code>, print it, and add 1 to a counter when <code>status == "Safe to drink"</code>. Inside an f-string with double quotes, use single quotes for the key: <code>{well[\'id\']}</code>.',
        why: 'The function holds the rules in one place, and the loop applies them to every record. Well W-4 is clear but its pH of 9.1 is too high, so <code>and</code> makes the whole test false.'
    },
    {
        id: 'py-library-csv', tier: 3, type: 'python', title: 'Library borrowing report from a CSV file', module: 6, chapter: 10,
        task: 'The starter saves a small CSV file of borrowed books. Read it with <code>csv.DictReader</code> and add up the <code>borrows</code> for each class in a dictionary (classes in the order they first appear). Print each class like <code>7A: 9 borrows</code>, then the class with the most borrows: <code>Most reading: 7A</code>.',
        starter: 'import csv\n\ncsv_text = "class,book,borrows\\n7A,Atlas of Rivers,4\\n7B,Garden Guide,6\\n7A,Stars and Planets,5\\n8A,First Aid Basics,3\\n7B,Atlas of Rivers,2\\n"\nwith open("borrows.csv", "w", encoding="utf-8") as file:\n    file.write(csv_text)\n\ntotals = {}\n# Read borrows.csv with csv.DictReader and add up the borrows for each class\n',
        solution: 'import csv\n\ncsv_text = "class,book,borrows\\n7A,Atlas of Rivers,4\\n7B,Garden Guide,6\\n7A,Stars and Planets,5\\n8A,First Aid Basics,3\\n7B,Atlas of Rivers,2\\n"\nwith open("borrows.csv", "w", encoding="utf-8") as file:\n    file.write(csv_text)\n\ntotals = {}\nwith open("borrows.csv", "r", encoding="utf-8") as file:\n    for row in csv.DictReader(file):\n        group = row["class"]\n        totals[group] = totals.get(group, 0) + int(row["borrows"])\n\nbest_class = ""\nbest_total = 0\nfor group, count in totals.items():\n    print(f"{group}: {count} borrows")\n    if count > best_total:\n        best_total = count\n        best_class = group\n\nprint(f"Most reading: {best_class}")\n',
        expected: '7A: 9 borrows\n7B: 8 borrows\n8A: 3 borrows\nMost reading: 7A',
        hint1: 'Every value from a CSV file is text, so change the borrows to a number with <code>int(row["borrows"])</code>. Count into a dictionary with <code>totals[group] = totals.get(group, 0) + ...</code>.',
        hint2: 'After reading, loop over <code>totals.items()</code>: print each class and keep a "best so far" class and total, then print <code>Most reading: ...</code> after the loop.',
        why: '<code>csv.DictReader</code> uses the header row as keys, so <code>row["class"]</code> is easy to read. <code>.get(group, 0)</code> starts a new class at 0 instead of crashing with a <code>KeyError</code>.'
    },
    {
        id: 'py-nearest-neighbour', tier: 3, type: 'python', title: 'Sorting mangoes by nearest neighbour', module: 7, chapter: 12,
        task: 'A fruit packing group measures how soft each mango is (1 to 10). Labelled samples are in <code>training</code>. For each new mango, find the training sample with the smallest distance <code>abs(new - softness)</code> and copy its label. Print each like <code>Softness 6: ripe (nearest sample 7)</code>. Keep the first sample found if two are equally near (use <code>&lt;</code>, not <code>&lt;=</code>). <em>(A made-up teaching dataset.)</em>',
        starter: 'training = [(2, "unripe"), (3, "unripe"), (1, "unripe"), (7, "ripe"), (8, "ripe"), (9, "ripe")]\nnew_mangoes = [6, 2, 4, 10]\n\ndef classify(new):\n    # Find the nearest training sample and return its label and its softness\n    return "", 0\n\nfor new in new_mangoes:\n    label, nearest = classify(new)\n    print(f"Softness {new}: {label} (nearest sample {nearest})")\n',
        solution: 'training = [(2, "unripe"), (3, "unripe"), (1, "unripe"), (7, "ripe"), (8, "ripe"), (9, "ripe")]\nnew_mangoes = [6, 2, 4, 10]\n\ndef classify(new):\n    best_label = ""\n    best_softness = 0\n    best_distance = 1000\n    for softness, label in training:\n        d = abs(new - softness)\n        if d < best_distance:\n            best_distance = d\n            best_label = label\n            best_softness = softness\n    return best_label, best_softness\n\nfor new in new_mangoes:\n    label, nearest = classify(new)\n    print(f"Softness {new}: {label} (nearest sample {nearest})")\n',
        expected: 'Softness 6: ripe (nearest sample 7)\nSoftness 2: unripe (nearest sample 2)\nSoftness 4: unripe (nearest sample 3)\nSoftness 10: ripe (nearest sample 9)',
        hint1: 'Start with <code>best_distance = 1000</code> (bigger than any real distance). Loop with <code>for softness, label in training:</code> and work out <code>d = abs(new - softness)</code>.',
        hint2: 'When <code>d &lt; best_distance</code>, store <code>d</code>, the label and the softness. After the loop, <code>return best_label, best_softness</code>.',
        why: 'Nearest neighbour is supervised learning: the labelled samples are the "teacher". <code>abs()</code> keeps every distance positive, so a sample far <em>below</em> never looks closest by mistake.'
    },
    {
        id: 'py-test-accuracy', tier: 3, type: 'python', title: 'Test set accuracy', module: 8, chapter: 13,
        task: 'A threshold model says water is <code>"polluted"</code> when cloudiness is 5 or more. Check it on the test set. For each sample print <code>Sample 1: predicted clean, actual clean</code>, then <code>Correct: 4 of 5</code> and <code>Accuracy: 80.0%</code> (correct ÷ total × 100). <em>(Made-up teaching data.)</em>',
        starter: 'test = [(2, "clean"), (6, "polluted"), (5, "clean"), (8, "polluted"), (4, "clean")]\nthreshold = 5\n\ndef predict(cloudiness):\n    if cloudiness >= threshold:\n        return "polluted"\n    return "clean"\n\n# Check every test sample, count the correct guesses, then print the accuracy\n',
        solution: 'test = [(2, "clean"), (6, "polluted"), (5, "clean"), (8, "polluted"), (4, "clean")]\nthreshold = 5\n\ndef predict(cloudiness):\n    if cloudiness >= threshold:\n        return "polluted"\n    return "clean"\n\ncorrect = 0\nnumber = 0\nfor cloudiness, label in test:\n    number += 1\n    guess = predict(cloudiness)\n    print(f"Sample {number}: predicted {guess}, actual {label}")\n    if guess == label:\n        correct += 1\n\naccuracy = correct / len(test) * 100\nprint(f"Correct: {correct} of {len(test)}")\nprint(f"Accuracy: {accuracy}%")\n',
        expected: 'Sample 1: predicted clean, actual clean\nSample 2: predicted polluted, actual polluted\nSample 3: predicted polluted, actual clean\nSample 4: predicted polluted, actual polluted\nSample 5: predicted clean, actual clean\nCorrect: 4 of 5\nAccuracy: 80.0%',
        hint1: 'Loop with <code>for cloudiness, label in test:</code>. Keep two counters: one for the sample number and one for correct guesses.',
        hint2: 'Call <code>guess = predict(cloudiness)</code>; if <code>guess == label</code>, add 1 to <code>correct</code>. After the loop: <code>accuracy = correct / len(test) * 100</code>.',
        why: 'Accuracy is only honest on data the model never trained on. Sample 3 is the one mistake: cloudiness 5 is right on the threshold. Looking at <em>which</em> samples are wrong tells you more than the percentage alone.'
    },
    {
        id: 'choice-privacy', tier: 3, type: 'choice', title: 'Ethics review: what to remove', module: 8, chapter: 14,
        task: 'The school library wants a model that suggests which new books to buy, using last year\'s borrowing records. Before training, which data should be <strong>removed</strong>?',
        options: [
            'Students\' full names and home addresses',
            'Each book\'s title and topic',
            'How many times each book was borrowed',
            'The month each book was borrowed'
        ],
        answer: 0,
        why: 'The model needs books, topics, counts and months, not who the readers are. Keeping only the data you need protects people\'s privacy, an <em>Amānah</em> (a trust). Names and addresses add risk and no value here.'
    }
];
