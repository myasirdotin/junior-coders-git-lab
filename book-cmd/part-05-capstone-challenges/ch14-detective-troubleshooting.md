# Chapter 14: Capstone Challenge 2: The Broken Asset Path Detective

> **Key Idea**: A junior developer has cloned a project repository, but when opening the site, all styles are broken and images are missing! Your mission as a senior detective is to inspect the directory tree from the terminal, diagnose broken relative paths, and fix them with command line operations.

---

## 1. The Incident Report

The project directory has arrived in disarray:
```text
disorganized-site/
├── index.html
├── style.css             <── Standing in root instead of css/
├── logo.png              <── Standing in root instead of assets/
├── js/
│   └── script.js
└── backup/
    └── old_styles.css
```

Meanwhile, `index.html` has these link references inside it:
```html
<link rel="stylesheet" href="css/style.css">
<img src="assets/logo.png" alt="Company Logo">
<script src="js/script.js"></script>
```

### The Problem:
Because `style.css` and `logo.png` are in the root directory while `index.html` expects them in `css/` and `assets/`, the browser reports `404 Not Found` for the stylesheet and image!

---

## 2. The Detective's Mission Checklist

Using **only command line tools** (no mouse!):
1. [ ] Navigate into `disorganized-site`.
2. [ ] Inspect files and confirm where `style.css` and `logo.png` are sitting.
3. [ ] Create the missing `css` directory.
4. [ ] Create the missing `assets` directory.
5. [ ] Move `style.css` into `css/`.
6. [ ] Move `logo.png` into `assets/`.
7. [ ] Safely remove the obsolete `backup/` folder.
8. [ ] Verify that the file layout now matches what `index.html` expects.

---

## 3. The Command Line Solution

### In Windows Command Prompt:
```cmd
:: 1. Navigate in
cd disorganized-site

:: 2. Inspect current files
dir

:: 3. Create missing directories
mkdir css assets

:: 4. Move files to their rightful homes
move style.css css\
move logo.png assets\

:: 5. Safely delete the obsolete backup directory
rmdir /s /q backup

:: 6. Verify final clean layout
dir /s /b
```

### In Git Bash / Linux:
```bash
# 1. Inspect
ls -la

# 2. Create missing directories
mkdir -p css assets

# 3. Move files
mv style.css css/
mv logo.png assets/

# 4. Remove obsolete backup
rm -rf backup

# 5. Verify
ls -R
```

---

## 4. Graduation to Version Control & Full-Stack Development

Congratulations! You have mastered:
- Spatial navigation (`cd`, `cd ..`, `cd \`, drive jumps)
- Orientation (`cd`, `pwd`, `dir`, `ls`, `cls`)
- Creation and scaffolding (`mkdir`, `type nul >`, `touch`, `echo`)
- Safe file manipulation (`ren`, `move`, `copy`, `del`, `rmdir`)
- Developer workflows (`code .`, `php -S`, `Ctrl + C`, `where`/`which`)

You are now fully equipped to conquer **Git & GitHub** (`book-git/`), **PHP Backend Development** (`book-php/`), and **Modern Web Frameworks** (`book-laravel/`) with complete terminal fluency!
