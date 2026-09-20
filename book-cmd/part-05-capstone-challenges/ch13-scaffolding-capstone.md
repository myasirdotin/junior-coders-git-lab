# Chapter 13: Capstone Challenge 1: The 60-Second Full-Stack Scaffolder

> **Key Idea**: Put all your terminal skills together! A professional developer can structure and initialize an entire multi-page website architecture from a completely empty directory in under one minute using only the command prompt.

---

## 1. The Challenge Objective

You are starting a new web project for an ethical community charity organization: **"Kindness Pantry"**.
Your mission is to scaffold the entire project folder structure, create the core files, write initial starter code into `index.html`, and verify the directory tree—**without ever opening File Explorer or touching a mouse!**

```
kindness-pantry/
├── index.html
├── contact.html
├── README.md
├── css/
│   ├── style.css
│   └── reset.css
├── js/
│   └── app.js
└── assets/
    └── images/
```

---

## 2. Step-by-Step Blueprint

### Windows CMD Solution:

```cmd
:: Step 1: Create main project folder and enter it
mkdir kindness-pantry
cd kindness-pantry

:: Step 2: Create subdirectories in one line
mkdir css js assets\images

:: Step 3: Create root files
type nul > index.html
type nul > contact.html
echo # Kindness Pantry Project > README.md

:: Step 4: Create nested CSS and JS files
type nul > css\style.css
type nul > css\reset.css
type nul > js\app.js

:: Step 5: Write initial HTML scaffold into index.html
echo ^<!DOCTYPE html^> > index.html
echo ^<html lang="en"^> >> index.html
echo ^<head^>^<title^>Kindness Pantry^</title^>^</head^> >> index.html
echo ^<body^>^<h1^>Welcome to Kindness Pantry^</h1^>^</body^> >> index.html
echo ^</html^> >> index.html

:: Step 6: Verify your structure
dir /s
```

### Git Bash / Linux Solution:

```bash
# Step 1: Create main project folder and enter it
mkdir kindness-pantry && cd kindness-pantry

# Step 2: Create all directories including nested ones in one command
mkdir -p css js assets/images

# Step 3: Create files with touch
touch index.html contact.html css/style.css css/reset.css js/app.js
echo "# Kindness Pantry Project" > README.md

# Step 4: Write starter HTML scaffold
cat << 'EOF' > index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Kindness Pantry</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <h1>Welcome to Kindness Pantry</h1>
  <script src="js/app.js"></script>
</body>
</html>
EOF

# Step 5: Verify the tree
ls -R
```

---

## 3. Practice Mastery Grading Criteria

Time yourself with a stopwatch!
* ⏱️ **Master Level**: Complete the entire scaffold in under **60 seconds**.
* ⏱️ **Proficient Level**: Complete in under **2 minutes**.
* ⏱️ **Apprentice Level**: Complete without errors.

---

## 4. Final Verification

After building your project, launch VS Code directly from inside `kindness-pantry`:
```text
code .
```
Verify that all folders, files, and initial code appear neatly in VS Code's sidebar!
