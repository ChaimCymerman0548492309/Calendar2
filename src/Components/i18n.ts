import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // App Bar
      "Modern Calendar App": "Modern Calendar App",
      "Toggle theme": "Toggle theme",
      "GitHub repository": "GitHub repository",
      "Login": "Login",
      "Logout": "Logout",
      "Guest": "Guest",
      
      // Main Content
      "My Schedule": "My Schedule",
      "New Event": "New Event",
      "Upcoming Events": "Upcoming Events",
      "No events scheduled": "No events scheduled",
      
      // Event Dialog
      "Create New Event": "Create New Event",
      "Edit Event": "Edit Event",
      "Event Title": "Event Title",
      "Start": "Start",
      "End": "End",
      "Event Color": "Event Color",
      "Cancel": "Cancel",
      "Save Changes": "Save Changes",
      "Create Event": "Create Event",
      
      // Footer
      "Created with React, Material-UI, and React Big Calendar": "Created with React, Material-UI, and React Big Calendar",
      
      // Auth Dialog
      "Username": "Username",
      "Password": "Password",
      "Login to your account": "Login to your account",
      "Register a new account": "Register a new account",
      "Submit": "Submit",
      "Already have an account? Login": "Already have an account? Login",
      "Don't have an account? Register": "Don't have an account? Register"
    }
  },
  he: {
    translation: {
      // App Bar
      "Modern Calendar App": "יומן מודרני",
      "Toggle theme": "החלף ערכת עיצוב",
      "GitHub repository": "מאגר GitHub",
      "Login": "התחברות",
      "Logout": "התנתקות",
      "Guest": "אורח",
      
      // Main Content
      "My Schedule": "לוח הזמנים שלי",
      "New Event": "אירוע חדש",
      "Upcoming Events": "אירועים קרובים",
      "No events scheduled": "אין אירועים מתוזמנים",
      
      // Event Dialog
      "Create New Event": "צור אירוע חדש",
      "Edit Event": "ערוך אירוע",
      "Event Title": "כותרת האירוע",
      "Start": "התחלה",
      "End": "סיום",
      "Event Color": "צבע האירוע",
      "Cancel": "ביטול",
      "Save Changes": "שמור שינויים",
      "Create Event": "צור אירוע",
      
      // Footer
      "Created with React, Material-UI, and React Big Calendar": "נוצר עם React, Material-UI ו-React Big Calendar",
      
      // Auth Dialog
      "Username": "שם משתמש",
      "Password": "סיסמה",
      "Login to your account": "התחבר לחשבון שלך",
      "Register a new account": "הירשם לחשבון חדש",
      "Submit": "שלח",
      "Already have an account? Login": "כבר יש לך חשבון? התחבר",
      "Don't have an account? Register": "אין לך חשבון? הירשם"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;