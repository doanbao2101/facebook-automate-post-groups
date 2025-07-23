# 🤖 Facebook Automate Post Groups

Automate posting to Facebook groups with ease! This lightweight Node.js tool lets you schedule text, image, or link posts across multiple Facebook groups using session cookies—**no browser automation required**.

🚀 Perfect for **marketers**, **community managers**, or anyone managing multiple groups.
⚠️ **Use responsibly** — automation may violate Facebook’s terms of service.

---

## ✨ Features

* 📝 Post **text**, 📷 **images**, or 🔗 **links** to multiple Facebook groups.
* ⏰ **Schedule** posts for specific times.
* 🔐 Uses **session cookies** (no browser automation).
* ⚡ **Lightweight** and easy to configure.

---

## 📦 Prerequisites

* 🛠️ Node.js installed on your system.
* 🔑 Facebook session cookies (`fb_cookies.json`).

---

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/facebook-automate-post-groups.git
   cd facebook-automate-post-groups
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

---

## 🚀 Usage

1. **Prepare your session cookies**:
   Export your Facebook session cookies and save them as `fb_cookies.json` in the project root (Using `EditThisCookie (V3) 3.0.4`)

2. **Add images** (if needed):
   Place images in the `img/` folder to include them in posts.

3. **Run the script**:

   ```bash
   node main.js
   ```

4. **Customize** the `post_to_group.js` file:
   Define the Facebook group IDs, post content, and schedule to suit your needs.

---

## 🗂️ File Structure

```
facebook-automate-post-groups/
├── fb_cookies.json       # 🔑 Facebook session cookies file
├── package.json          # 📦 Project dependencies
├── post_to_group.js      # 🚀 Main script for posting
├── README.md             # 📘 Documentation
├── test.js               # 🧪 Test script
├── img/                  # 🖼️ Image folder
│   ├── 1-living-room-1.jpg
│   ├── 2-bedroom-1.2.jpg
│   ├── ...
```

---


## ⚠️ Notes

* 🔄 Ensure your session cookies are **valid and up to date**.
* 📛 Post responsibly to stay within **Facebook's platform policies**.

### 🕒 **Post Frequency Guidelines:**

* **1-3 posts per day** to prevent being flagged as spam.
* **2-4 hour interval** between posts.
* Avoid **back-to-back** or rapid posting.
* **Engage** with the group through comments and likes.
* For **new accounts**, limit posting in the first 30 days.

---

## 📢 Disclaimer

This tool is intended for **educational purposes only**.
🛡️ The author assumes no responsibility for misuse or any consequences resulting from its use.

---

## 📄 License

This project is licensed under the **MIT License**.
See the `LICENSE` file for more information.
