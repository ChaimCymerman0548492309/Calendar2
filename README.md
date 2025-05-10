# 📅 Modern Calendar App - תיעוד מלא

## 📖 תוכן עניינים
- [הקדמה](#-הקדמה)
- [תכונות](#-תכונות)
- [התקנה](#-התקנה)
- [הרצה](#-הרצה)
- [API](#-api)
- [מבנה הנתונים](#-מבנה-הנתונים)
- [תיעוד טכני](#-תיעוד-טכני)
- [תרומה לפרויקט](#-תרומה-לפרויקט)
- [רישיון](#-רישיון)

## 🌟 הקדמה
אפליקציית לוח שנה מודרנית המבוססת על React עם תמיכה בעברית ואנגלית, כוללת:
- ניהול אירועים
- גרירה ושחרור של אירועים
- שינוי גודל אירועים
- ערכת נושא כהה/בהירה
- אימות משתמשים
- אנימציות חלקות

## ✨ תכונות
| תכונה | תיאור |
|-------|--------|
| 📅 ניהול אירועים | יצירה, עריכה ומחיקה של אירועים |
| 🔄 גרירה ושחרור | שינוי מיקום אירועים ע"י גרירה |
| ↕️ שינוי גודל | שינוי משך האירוע ע"י מתיחה |
| 🌙 ערכת נושא | תמיכה במצב כהה ובהיר |
| 🌐 רב-לשוניות | תמיכה בעברית ואנגלית |
| 🔐 אימות | הרשמה והתחברות משתמשים |
| 🎨 התאמה אישית | בחירת צבעים לאירועים |
| 📱 רספונסיביות | מתאים לכל גודל מסך |

## 🛠️ התקנה
```bash
# Clone the repository
git clone https://github.com/yourusername/calendar-app.git
cd calendar-app

# Install dependencies
npm install
# or
yarn install
```

דרישות מוקדמות:
- Node.js 14+
- npm או yarn

## 🚀 הרצה
להרצה במוד פיתוח:
```bash
npm start
# or
yarn start
```

לבניית גרסה לפרודקשן:
```bash
npm run build
# or
yarn build
```

## 🌐 כתובות פריסה (Deployment URLs)

**שרת API:**  
`https://calenderserver5.onrender.com`  

**לקוח פרונט אנד:**  
`https://calender5.netlify.app`  

**נקודות קצה עיקריות:**
- אירועים: `https://calenderserver5.onrender.com/events`
- אימות: `https://calenderserver5.onrender.com/auth`
- משתמשים: `https://calenderserver5.onrender.com/users`

**סביבות ריצה:**
| סביבה | כתובת API | כתובת לקוח |
|-------|-----------|------------|
| פיתוח | `http://localhost:5000` | `http://localhost:3000` |
| פרודקשן | `https://calenderserver5.onrender.com` | `https://calender5.netlify.app` |


## 🌐 API
### אירועים
| נתיב | מתודה | תיאור | פרמטרים |
|------|--------|--------|----------|
| `/events` | GET | קבלת כל האירועים | - |
| `/events` | POST | יצירת אירוע חדש | `{ title, start, end, color }` |
| `/events/:id` | PUT | עדכון אירוע | `{ title, start, end, color }` |
| `/events/:id` | DELETE | מחיקת אירוע | - |

### אימות
| נתיב | מתודה | תיאור | פרמטרים |
|------|--------|--------|----------|
| `/auth/register` | POST | הרשמת משתמש חדש | `{ username, password }` |
| `/auth/login` | POST | התחברות משתמש | `{ username, password }` |
| `/auth/me` | GET | פרטי משתמש נוכחי | - |

## 🗃️ מבנה הנתונים

### טבלת משתמשים (`users`)
| שדה | סוג | תיאור |
|------|------|--------|
| `_id` | ObjectID | מזהה ייחודי |
| `username` | String | שם משתמש |
| `password` | String | סיסמה מוצפנת |
| `createdAt` | Date | תאריך יצירה |

### טבלת אירועים (`events`)
| שדה | סוג | תיאור |
|------|------|--------|
| `_id` | ObjectID | מזהה ייחודי |
| `title` | String | כותרת האירוע |
| `start` | Date | תאריך ושעת התחלה |
| `end` | Date | תאריך ושעת סיום |
| `allDay` | Boolean | האם אירוע כל היום |
| `color` | String | צבע האירוע (hex) |
| `userId` | ObjectID | מזהה המשתמש שיצר את האירוע |
| `createdAt` | Date | תאריך יצירה |

## 📚 תיעוד טכני

### מבנה הקומפוננטות
```
src/
├── Components/
│   ├── Calendar.tsx        # קומפוננטת הלוח הראשית
│   ├── AuthDialog.tsx      # דיאלוג אימות
│   ├── Bee/                # אנימציית הטעינה
├── api/
│   ├── auth.ts             # פונקציות אימות
│   ├── events.ts           # פונקציות אירועים
├── i18n/                   # קבצי תרגום
├── App.tsx                 # קומפוננטת האפליקציה הראשית
```

### תלותיות עיקריות
| חבילה | תיאור |
|--------|--------|
| `react` | ספריית React |
| `@mui/material` | רכיבי UI |
| `react-big-calendar` | לוח שנה מתקדם |
| `moment` | ניהול תאריכים |
| `framer-motion` | אנימציות |
| `axios` | בקשות HTTP |
| `i18next` | רב-לשוניות |

## 🤝 תרומה לפרויקט
1. בצעו Fork ל-repository
2. צרו branch חדש (`git checkout -b feature/your-feature`)
3. בצעו commit לשינויים (`git commit -m 'Add some feature'`)
4. דחפו ל-branch (`git push origin feature/your-feature`)
5. פתחו בקשת Pull

## 📜 רישיון
MIT License - ראה קובץ [LICENSE](LICENSE) לפרטים נוספים.

---

# 📅 Modern Calendar App - Full Documentation

## 📖 Table of Contents
- [Introduction](#-introduction)
- [Features](#-features)
- [Installation](#-installation)
- [Running](#-running)
- [API](#-api)
- [Data Structure](#-data-structure)
- [Technical Documentation](#-technical-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Introduction
A modern calendar application based on React with support for Hebrew and English, including:
- Event management
- Drag and drop events
- Event resizing
- Dark/light theme
- User authentication
- Smooth animations

## ✨ Features
| Feature | Description |
|---------|-------------|
| 📅 Event Management | Create, edit and delete events |
| 🔄 Drag & Drop | Move events by dragging |
| ↕️ Resize | Change event duration by resizing |
| 🌙 Theme | Dark and light mode support |
| 🌐 Multilingual | Hebrew and English support |
| 🔐 Authentication | User registration and login |
| 🎨 Customization | Color selection for events |
| 📱 Responsive | Adapts to all screen sizes |

## 🛠️ Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/calendar-app.git
cd calendar-app

# Install dependencies
npm install
# or
yarn install
```

Prerequisites:
- Node.js 14+
- npm or yarn

## 🚀 Running
For development mode:
```bash
npm start
# or
yarn start
```

To build for production:
```bash
npm run build
# or
yarn build
```

## 🌐 API
### Events
| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/events` | GET | Get all events | - |
| `/events` | POST | Create new event | `{ title, start, end, color }` |
| `/events/:id` | PUT | Update event | `{ title, start, end, color }` |
| `/events/:id` | DELETE | Delete event | - |

### Authentication
| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/auth/register` | POST | Register new user | `{ username, password }` |
| `/auth/login` | POST | User login | `{ username, password }` |
| `/auth/me` | GET | Current user details | - |

## 🗃️ Data Structure

### Users Table (`users`)
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectID | Unique identifier |
| `username` | String | Username |
| `password` | String | Encrypted password |
| `createdAt` | Date | Creation date |

### Events Table (`events`)
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectID | Unique identifier |
| `title` | String | Event title |
| `start` | Date | Start date and time |
| `end` | Date | End date and time |
| `allDay` | Boolean | All-day event |
| `color` | String | Event color (hex) |
| `userId` | ObjectID | ID of user who created the event |
| `createdAt` | Date | Creation date |

## 📚 Technical Documentation

### Component Structure
```
src/
├── Components/
│   ├── Calendar.tsx        # Main calendar component
│   ├── AuthDialog.tsx      # Authentication dialog
│   ├── Bee/                # Loading animation
├── api/
│   ├── auth.ts             # Auth functions
│   ├── events.ts           # Event functions
├── i18n/                   # Translation files
├── App.tsx                 # Main app component
```

### Key Dependencies
| Package | Description |
|---------|-------------|
| `react` | React library |
| `@mui/material` | UI components |
| `react-big-calendar` | Advanced calendar |
| `moment` | Date management |
| `framer-motion` | Animations |
| `axios` | HTTP requests |
| `i18next` | Multilingual support |

## 🤝 Contributing
1. Fork the repository
2. Create new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📜 License
MIT License - See [LICENSE](LICENSE) file for details.