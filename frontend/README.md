# 🌐 Frontend – Job Application Tracker

This is the **frontend of the Job Application Tracker** — a simple and smart web app designed to help students and job seekers **stay organized during placement drives**.  
It is built using **React.js** and provides a **clean, minimal UI** to track upcoming events, completed rounds, and expired drives.

---

## ✨ Key Frontend Features

- 📝 **Event Creation** – Users can add new placement drive events with:
  - Event Name  
  - Date & Time  
  - Platform Name  
  - Description

- 📅 **Auto-Sorting** – Events are displayed with **nearest date first**.

- ⏳ **Remaining Days Display** – Each event card clearly shows how many days are left.

- 🟡 **Upcoming | 🟢 Completed | 🔴 Expired Sections** – Clean categorization of events for easy tracking.

- 🔄 **Auto Status Update** – Past events move automatically to the **Expired** section if not marked done.

- 🧼 **Responsive & Simple UI** – Designed to work smoothly on both desktop and mobile.

---

## 🧰 Tech Stack

- ⚛️ **React.js** – Component-based UI  
- 🧭 **React Router** – For navigation between sections (Upcoming / Completed / Expired)  
- 💅 **CSS / Tailwind / Styled Components** – (Choose what you use) for styling  
- 🔗 API integration with backend (Node.js / Emergent platform)

---

## 🚀 Getting Started

Follow the steps below to run the frontend locally:

### 1️⃣ Clone the Repository

```
git clone https://github.com/Vaishnavi-1525/app.git
cd app/frontend
```

### 2️⃣ Install Dependencies
```
npm install
```
### 3️⃣ Run the Development Server
```
npm start
```

The app will start at 👉 http://localhost:3000

---

## 📦 Build for Production
 To create an optimized production build:

```
npm run build
```
- The build will be generated inside the /build folder.
- You can deploy this build on any static hosting service.

---

## 📸 UI Overview
Screen	Description
- 🏠 Home	Lists all upcoming events sorted by date
- ✅ Completed	Displays all events marked as done
- ❌ Expired	Shows events automatically moved after expiry
- ➕ Add Event	Floating button to quickly add new event details


---

## 🌱 Future Improvements

- 🔔 Notifications / reminders for upcoming events
- 📝 Event editing & deletion
- 📅 Calendar view integration
- 📊 Dashboard analytics for applied / completed / missed drives
