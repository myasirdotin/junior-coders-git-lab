*Part 7 · Strings and Text*
# Chapter 13: Working With Strings — The Power of Words

---

## 🌟 Real-Life Story

Think about creating a username on a website:
- You type: `"   StarGazer_07   "` (with accidental spaces).
- The website automatically trims the spaces to `"StarGazer_07"`.
- It converts it to lowercase `"stargazer_07"` to make sure no two users have the same name with different capitals.
- It checks if the length is at least 6 characters.

All of this work is done by JavaScript **String Methods**!

---

## 🎯 What You Will Learn

By the end of this chapter, you will be able to:
- Combine strings using concatenation (`+`) and modern Template Literals (`` `${var}` ``).
- Read single characters by index and measure text with `.length`.
- Transform casing with `.toUpperCase()` and `.toLowerCase()`.
- Clean, search, cut and replace text with `.trim()`, `.includes()`, `.slice()` and `.replace()`.

---

## 💡 Concept Explanation

A **string** is an ordered sequence of characters (letters, numbers, spaces, symbols). 

### Template Literals (Backticks `` ` ``)
In earlier chapters, we combined strings with `+`:
```javascript
let greeting = "Hello, " + name + "! You are " + age + " years old.";
```
Modern JavaScript gives us **Template Literals** using backticks (`` ` ``) and `${}`. It makes writing sentences so much cleaner!
```javascript
let greeting = `Hello, ${name}! You are ${age} years old.`;
```

### Strings Have Indexes and Length
Just like arrays, strings start at index 0:
```javascript
let word = "Coding";
console.log(word.length); // 6
console.log(word[0]);     // "C"
console.log(word[5]);     // "g"
```
> ⚠️ **Note:** Unlike arrays, strings are *immutable* (unchangeable). You cannot do `word[0] = "B"`. To change a string, you create a new one!

### Essential String Methods
- **`.toUpperCase()` / `.toLowerCase()`**: Changes the letter casing.
- **`.trim()`**: Removes leading and trailing whitespace.
- **`.includes(subStr)`**: Checks if a word or letter is inside the string.
- **`.slice(start, end)`**: Extracts a piece of the text.
- **`.replace(search, replacement)`**: Swaps out a word for a new one.

```javascript
let message = "   JavaScript is Super Fun!   ";
let clean = message.trim();                     // "JavaScript is Super Fun!"
console.log(clean.toUpperCase());              // "JAVASCRIPT IS SUPER FUN!"
console.log(clean.includes("Fun"));            // true
console.log(clean.replace("Super", "Mega"));   // "JavaScript is Mega Fun!"
```

---

## 🌍 Real-World Example

Think about the search bar on your school library website:
When you search for `"solar system"`, the search engine:
1. Trims extra spaces you typed accidentally.
2. Converts your search to lowercase so it matches both `"Solar"` and `"SOLAR"`.
3. Checks every book title using `.includes(searchTerm.toLowerCase())`.

---

## 💻 Code Example

```javascript
// User registration cleaner
function formatUserProfile(rawName, rawEmail) {
    // 1. Clean spaces and format
    let cleanName = rawName.trim();
    let cleanEmail = rawEmail.trim().toLowerCase();

    // 2. Extract first name
    let spaceIndex = cleanName.indexOf(" ");
    let firstName = cleanName.slice(0, spaceIndex);

    // 3. Check if it is a school email address
    let schoolEmail = "No";
    if (cleanEmail.includes("@school.example.org")) {
        schoolEmail = "Yes";
    }

    return `Profile Created:
- First Name: ${firstName}
- Full Name: ${cleanName.toUpperCase()}
- Contact: ${cleanEmail}
- School Email: ${schoolEmail}`;
}

console.log(formatUserProfile("   Ayesha Khan   ", "   AYESHA.KHAN@SCHOOL.EXAMPLE.ORG   "));
```

Output:

```text
Profile Created:
- First Name: Ayesha
- Full Name: AYESHA KHAN
- Contact: ayesha.khan@school.example.org
- School Email: Yes
```

---

## 🔍 Line-by-Line Explanation

- `rawName.trim()`: Strips the extra spaces around `"   Ayesha Khan   "`, resulting in `"Ayesha Khan"`.
- `rawEmail.trim().toLowerCase()`: Chains two methods! Removes spaces and turns all letters lowercase (`"ayesha.khan@gmail.com"`).
- `cleanName.indexOf(" ")`: Finds where the first space happens (between "Ayesha" and "Khan").
- `cleanName.slice(0, spaceIndex)`: Cuts out the characters from index 0 up to the space ("Ayesha").
- `cleanEmail.includes("@school.example.org")`: Tests whether the email ends in the school's address. If it does, `schoolEmail` changes from `"No"` to `"Yes"`.
- `` `Profile Created: ... ${firstName} ...` ``: Assembles a multi-line formatted string using template literals.

---

## 🔮 Predict the Output

```javascript
let secret = "Mission: Recycling";
console.log(secret.slice(9));
console.log(secret.toLowerCase().includes("mission"));
console.log(secret.length);
```
*What will print?*

<details>
<summary>👀 Click to check your answer</summary>

```text
Recycling
true
18
```

`slice(9)` starts at index 9 (the `R`) and goes to the end. The lowercase copy contains `"mission"`. The full text has 18 characters, counting the colon and the space.

</details>

---

## 🧭 Think Like a Programmer: Case-Insensitive Comparisons

Computers see letters as binary numbers. In ASCII/Unicode:
- Capital `'A'` is number 65.
- Lowercase `'a'` is number 97.
So to JavaScript, `"Apple" === "apple"` is `FALSE`!
To compare user inputs without worrying about whether they held down the Shift key, always normalize both sides:
```javascript
input.trim().toLowerCase() === expectedWord.toLowerCase()
```

---

## 🚀 Coding Challenge

Write a function `isPalindrome(word)`:
- A palindrome is a word that reads the same forwards and backwards (like `"radar"`, `"level"`, `"racecar"`).
- Hint: You can split a string into an array (`word.split("")`), reverse it (`.reverse()`), and join it back (`.join("")`).
- Check if the reversed string matches the original string!

---

## 🛠️ Mini Project: Secret Detective Decoder

Create a program that:
1. Takes an encoded string: `"XJAZXVAXSCXRXIPXTX"`
2. Replaces all `"X"` with `""` (empty string).
3. Reverses the remaining letters or extracts a secret word.
4. Prints the classified mission briefing:
```text
============================
TOP SECRET DECODER v1.0
Encoded:  XJAZXVAXSCXRXIPXTX
Decoded:  JAVASCRIPT
Status:   ACCESS GRANTED 🔓
============================
```

---

## ⚠️ Common Mistake

Find the errors in this code:
```javascript
let firstName = "Rohan";
let age = 12;

// Programmer wanted to use template literals:
let message = 'Hello, my name is ${firstName} and I am ${age} years old!';
console.log(message.touppercase());
```

- **What happens**: JavaScript stops with `TypeError: message.touppercase is not a function`.
- **Error 1**: Template literals need backticks (`` ` ``), not single quotes (`'`). With single quotes, `${firstName}` is printed as plain text.
- **Error 2**: JavaScript is case-sensitive. The method is `toUpperCase()`, with a capital U and a capital C.
- **Fix the code**:
  ```javascript
  let firstName = "Rohan";
  let age = 12;
  let message = `Hello, my name is ${firstName} and I am ${age} years old!`;
  console.log(message.toUpperCase());
  ```
  Output: `HELLO, MY NAME IS ROHAN AND I AM 12 YEARS OLD!`

---

## ✍️ Try It

1. Open your console.
2. Create `let chant = "hip hip hooray";`
3. Convert it to all uppercase: `console.log(chant.toUpperCase());`
4. Replace `"hooray"` with `"cheer"`: `console.log(chant.replace("hooray", "cheer"));`
5. Check if it contains `"hip"` using `.includes("hip")`.

> 💡 **Hint:** You should see `HIP HIP HOORAY`, then `hip hip cheer`, then `true`. Notice that `chant` itself never changed: each method made a new string.

---

## 📝 Recap

- Template literals (`` `${}` ``) make combining strings intuitive.
- Strings have indices starting at 0 and a `.length` property.
- Strings are immutable; methods return *new* strings.
- Use `.toUpperCase()` and `.toLowerCase()` for case formatting.
- Use `.trim()` to remove unwanted whitespace.
- Use `.includes()`, `.slice()`, and `.replace()` to manipulate text.

---

## 📖 Key Terms

- **String:** Sequence of characters enclosed in quotes.
- **Template Literal:** String syntax using backticks that allows embedded expressions.
- **Interpolation:** Inserting variable values into a string via `${}`.
- **Immutable:** Cannot be altered after creation.
- **Trim:** Stripping out blank spaces at the edges of a string.

---

## 🏆 Practice

### 🟢 Level 1: Recall
1. Which method strips extra spaces from the start and end of a string?
2. Why are template literals (`` `Hello ${name}` ``) often nicer than `+` joining?

<details>
<summary>Show answer</summary>

1. `.trim()`
2. You write the sentence in one piece and drop values in with `${}`. There are fewer quotes and `+` signs to get wrong, and spaces are easier to see.

</details>

### 🟡 Level 2: Apply
1. Write a function `maskPhoneNumber(phone)` that turns `"9876543210"` into `"******3210"`. Use `.slice(-4)`: a negative start counts back from the end.
2. Why does `let name = "sam"; name[0] = "S"; console.log(name);` still print `sam`? How can you make `Sam`?

<details>
<summary>Show answer</summary>

1. ```javascript
   function maskPhoneNumber(phone) {
       return "******" + phone.slice(-4);
   }
   console.log(maskPhoneNumber("9876543210"));
   ```
   Output: `******3210`. Hiding most of the number protects a person's private data (*Amānah*).
2. Strings are immutable, so you cannot change one letter. Build a new string instead:
   `name[0].toUpperCase() + name.slice(1)` gives `Sam`.

</details>

### 🔴 Level 3: Challenge
Write a function `makePositive(sentence)` that:
1. Replaces `"boring"` with `"exciting"`.
2. Replaces `"hate"` with `"love"`.
3. Replaces `"difficult"` with `"a fun challenge"`.
4. Returns the new, uplifting sentence.

<details>
<summary>Show one possible answer</summary>

```javascript
function makePositive(sentence) {
    let result = sentence.replace("boring", "exciting");
    result = result.replace("hate", "love");
    result = result.replace("difficult", "a fun challenge");
    return result;
}

console.log(makePositive("I hate maths because it is boring and difficult"));
```

Output:

```text
I love maths because it is exciting and a fun challenge
```

Note: `.replace()` only changes the **first** match of each word.

</details>

---

## ✅ Self-Assessment Checklist

- [ ] I can rewrite `+` string concatenation using backticks and `${}`.
- [ ] I know how to check string length.
- [ ] I can convert user input to lowercase.
- [ ] I understand why `"Cat" === "cat"` is false.

---

## 🏡 Homework

1. Write a function `initials(fullName)` that returns the first letter of each word (e.g., `"Bilal Khan"` returns `"B.K."`).
2. Create a hashtag generator that takes a phrase like `"junior coders rock"` and returns `"#JuniorCodersRock"`.
3. Check if an email entered by a user contains both `"@"` and `"."`.

---

## 🍎 Teacher Discussion Questions

1. Why are strings immutable in JavaScript while arrays are mutable?
2. What are some security and database reasons why websites always trim and lowercase email addresses before saving them?
