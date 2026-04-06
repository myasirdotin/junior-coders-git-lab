const consoleElement = document.getElementById('console');
const codeEditor = document.getElementById('code-editor');

// Redirect console.log to our custom UI console
const originalLog = console.log;
console.log = function(...args) {
    originalLog.apply(console, args);
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(' ');
    consoleElement.appendChild(entry);
    consoleElement.scrollTop = consoleElement.scrollHeight;
};

// Function to run the student's code
function runCode() {
    const code = codeEditor.value;
    
    // Clear previous output before running new code
    consoleElement.innerHTML = '<div class="info-entry">--- Running code ---</div>';

    try {
        // Execute the code
        // Note: Using a Function constructor is slightly safer than eval() 
        // because it doesn't have access to the local scope.
        const executeScript = new Function(code);
        executeScript();
    } catch (error) {
        // Display error message in the console UI
        const errorEntry = document.createElement('div');
        errorEntry.className = 'log-entry error-entry';
        errorEntry.textContent = '❌ Error: ' + error.message;
        consoleElement.appendChild(errorEntry);
        consoleElement.scrollTop = consoleElement.scrollHeight;
    }
}

// Function to clear everything
function clearAll() {
    codeEditor.value = '';
    consoleElement.innerHTML = '<div class="info-entry">Console cleared.</div>';
}

// Function to load a random example
const examples = [
`// Example 1: Variables and Math
let a = 10;
let b = 20;
let sum = a + b;
console.log("The sum of", a, "and", b, "is:", sum);`,

`// Example 2: Loop through an array
let fruits = ["Apple", "Banana", "Cherry"];
console.log("I like these fruits:");
for (let fruit of fruits) {
    console.log("- " + fruit);
}`,

`// Example 3: Function calculation
function calculateArea(radius) {
    return Math.PI * radius * radius;
}
let r = 5;
let area = calculateArea(r);
console.log("Area of circle with radius", r, "is:", area.toFixed(2));`,

`// Example 4: Objects
let student = {
    name: "John",
    grade: "A",
    age: 18
};
console.log("Student Info:", student);`
];

let exampleIndex = 0;
function loadExample() {
    codeEditor.value = examples[exampleIndex];
    exampleIndex = (exampleIndex + 1) % examples.length;
    consoleElement.innerHTML = '<div class="info-entry">Example loaded. Click "Run Code" to see it!</div>';
}
