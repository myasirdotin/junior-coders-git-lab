# Chapter 12: Privacy, Metadata & Digital Footprints 👣

## 🌟 Real-Life Story

When you walk across a sandy beach, you leave footprints. Someone who comes later can tell where you walked, roughly how big your feet are, and which way you went. You did not mean to share any of that. It was simply left behind. Every photo you share, every app you use and every site you visit leaves similar **digital footprints**. Some you can see. Many are hidden inside files and browsers. This chapter shows you where they are, and how to leave fewer of them.

## 🎯 What You Will Learn

- Explain what **metadata** is and find the hidden **EXIF** data in a photo.
- Describe how **browser fingerprinting** can recognise a device without cookies.
- Review app permissions and privacy settings.
- Apply **data minimisation**: share only what is needed.

## 📷 Metadata: Data About Data

**Metadata** means "data about data". A letter's contents are the data. The postmark, date and address on the envelope are metadata. Metadata can reveal a lot, even when the contents are private.

### EXIF: the hidden label inside photos
When a phone takes a photo, it often stores **EXIF** (Exchangeable Image File Format) data inside the image file. Here is a **sample** of what it can hold:

```
Camera model:  Phone Model X
Date taken:    2026-09-25 14:32:10
GPS latitude:  51° 30' 26.5" N
GPS longitude:  0° 07' 39.6" W
Software:      Photos 4.2
```

Those GPS numbers are in degrees, minutes and seconds. A short JavaScript function turns them into the decimal form that map apps use:

```javascript
function toDecimal(deg, min, sec) {
  return deg + min / 60 + sec / 3600;
}
console.log(toDecimal(51, 30, 26.5).toFixed(5));
console.log(toDecimal(0, 7, 39.6).toFixed(5));
```

Output:

```
51.50736
0.12767
```

Typed into a map (with West written as minus: 51.50736, -0.12767), this points to a spot within a few metres. If that photo was taken at home and then shared publicly, it could reveal where someone lives.

### How to protect yourself
- Many phone cameras have a setting to turn off **location tags**.
- When sharing, many phones offer an option to **remove location** first.
- Many large social sites strip EXIF on upload, but email, chat apps that send "original quality" files, and personal websites often do **not**. Do not rely on it.

## 🕵️ Browser Fingerprinting

A **cookie** is a small file a website stores in your browser to remember you. You can delete cookies. But trackers have another method.

**Browser fingerprinting** collects many small facts about your browser and device, then combines them into an ID. Each fact alone is common. Together they can be rare.

- Screen size and colour depth
- Fonts installed on the computer
- Time zone and language
- Small differences in how the device draws graphics
- Browser version and operating system

```
[ screen 1920×1080 ]
[ 42 fonts ]          ──► [ an ID that
[ time zone +05:00 ]        often fits
[ graphics quirks ]         only your
                            device ]
```

In a 2010 study by the Electronic Frontier Foundation, about 84% of the browsers tested had a unique fingerprint. A private ("incognito") window does **not** stop fingerprinting. It only stops your own device keeping your history and cookies after you close the window.

**What helps:** browsers with built-in tracking protection, keeping the browser updated, and installing few add-ons (each one can make you more unusual).

## 📱 App Permissions

A **permission** is something an app asks to use, such as your location, camera, microphone or contacts.

| App | Permission requested | Sensible? |
| :--- | :--- | :--- |
| Map app | Location while using | ✅ Yes, it needs it |
| Calculator | Location | ❌ No reason |
| Prayer-time app | Approximate location | ✅ Yes (approximate is enough) |
| Torch app | Contacts | ❌ No reason |

Choose **"only while using the app"** and **"approximate location"** wherever possible. If an app asks for something it does not need, deny it or choose a different app.

## 🧺 Data Minimisation: Share Less

**Data minimisation** means collecting and sharing only what is truly needed. It works in two directions.

- **As a user:** do not fill in optional fields. Avoid posting your full birth date, school name, home area or daily routine publicly. Delete accounts you no longer use.
- **As a developer (*Amānah*):** if your form does not need a phone number, do not ask for one. Data you never collect can never leak.

### Risky vs safer post

| ❌ Risky | ✅ Safer |
| :--- | :--- |
| "Walking home from Greenfield School like every day at 3:15! 🏠" + a photo outside the house | "Lovely autumn walk today 🍂" with no location, posted later |

## 🏠 What to Do at Home

- Turn off location tags in your camera app, or remove location before sharing.
- Review app permissions every few months and remove what is not needed.
- Use a browser with tracking protection and keep it updated.
- Do not share your full name, school, address or routine publicly.
- Delete old accounts you no longer use.
- Search for your own name with a parent, to see what others can find.

## ⚠️ Common Mistake

**Mistake:** "I use incognito mode, so nobody can track me."

**What happens:** incognito only stops *your own browser* keeping history and cookies after you close the window. Websites, your school or home network, and fingerprinting can still see and recognise your activity.

**Fixed thinking:** private windows are useful on a shared computer. Real privacy comes from sharing less, managing permissions and using tracking protection.

## ✍️ Try It

Check a photo on a computer (with permission):

1. **Windows:** right-click an image file, choose **Properties**, then the **Details** tab.
2. Look for the camera model, date taken and any **GPS** section.
3. If you see GPS data, notice the button at the bottom: **Remove Properties and Personal Information**.

*Hint:* photos sent through some chat apps may have no GPS section, because the app removed it.

## 📝 Recap

- Metadata is data about data, and it can reveal more than the content.
- Photos can carry EXIF data, including exact GPS location. Remove it before sharing.
- Browser fingerprinting combines many small facts into an ID; incognito mode does not stop it.
- Give apps only the permissions they really need, and prefer "while using" and "approximate".
- Data minimisation: collect and share only what is needed. Data never collected can never leak.

## 🏆 Practice

### 🟢 Level 1: Recall
What is EXIF data, and name two things it can contain.

<details>
<summary>Show answer</summary>

**EXIF** is hidden metadata stored inside a photo file. It can include the **camera model**, the **date and time** taken and the **GPS location**.

</details>

### 🟡 Level 2: Apply
Convert this GPS value to decimal form: 24° 28' 12" N. Use decimal = degrees + minutes ÷ 60 + seconds ÷ 3600.

<details>
<summary>Show answer</summary>

24 + 28 ÷ 60 + 12 ÷ 3600 = 24 + 0.46667 + 0.00333 = **24.47**

</details>

### 🔴 Level 3: Challenge
You are building a sign-up form for a neighbourhood book-swap club. Plan it with privacy in mind.

1. List the fields you **need**, and explain why.
2. List three fields you would **not** collect, and explain why.
3. Write one sentence for the form telling members how their data is used.

<details>
<summary>Show one possible answer</summary>

1. **Needed:** first name (to greet members), email (to send swap reminders), a password (to log in).
2. **Not collected:** home address (swaps happen at the library), date of birth (not needed), phone number (email is enough). Less data means less to protect and nothing extra to leak.
3. "We use your email only to send book-swap reminders. We never share it, and you can delete your account at any time."

</details>
