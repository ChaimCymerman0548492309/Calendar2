import React, { useState } from "react";
// הוסף מתחת ליתר ה-imports הקיימים
import { useEffect } from 'react';
import { register, login, getCurrentUser } from './auth';
import { getEvents, createEvent, updateEvent, deleteEvent } from './events';
import AuthDialog from './AuthDialog';
import { ExitToApp, AccountCircle } from '@mui/icons-material'; // להוספת האייקונים
import Bee from "./Bee/Bee"; // הוסף את קומפוננטת האנימציה
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
  stringOrDate,
} from "react-big-calendar";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Paper,
  Divider,
  Container,
} from "@mui/material";
import {
  Delete,
  Edit,
  Add,
  Brightness4,
  Brightness7,
  CalendarToday,
  GitHub,
} from "@mui/icons-material";
import "./Ca.css";
import  DragDropContext  from "react-big-calendar/lib/addons/dragAndDrop";
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import './i18n'; // ניצור קובץ זה בהמשך

const DragAndDropCalendar = withDragAndDrop<CalendarEvent, object>(BigCalendar);

const localizer = momentLocalizer(moment);

// const DragAndDropCalendar = withDragAndDrop(BigCalendar);

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
}

const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Meeting with Team",
    start: new Date(new Date().setHours(10, 0, 0, 0)),
    end: new Date(new Date().setHours(11, 30, 0, 0)),
    color: "#4e79a7",
  },
  {
    id: 2,
    title: "Lunch Break",
    start: new Date(new Date().setHours(12, 0, 0, 0)),
    end: new Date(new Date().setHours(13, 0, 0, 0)),
    color: "#e15759",
  },
  {
    id: 3,
    title: "Project Deadline",
    start: new Date(new Date().setDate(new Date().getDate() + 2)),
    end: new Date(new Date().setDate(new Date().getDate() + 2)),
    allDay: true,
    color: "#59a14f",
  },
];

const colorOptions = [
  "#4e79a7",
  "#f28e2b",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc948",
  "#b07aa1",
  "#ff9da7",
  "#9c755f",
  "#bab0ac",
];

function Calendar() {
  // הוסף מתחת ל-state הקיים
  
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // לטובת האנימציה
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
  const [mode, setMode] = useState<PaletteMode>(
    // prefersDarkMode ? "light" : "dark"
    prefersDarkMode ? "dark" : "light"
  );
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [currentView, setCurrentView] = useState<string>(Views.MONTH);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: "",
    start: new Date(),
    end: new Date(new Date().setHours(1, 0, 0, 0)),
    color: colorOptions[0],
  });
  const { t } = useTranslation();
  const [language, setLanguage] = useState<"en" | "he">("en");

  const toggleLanguage = () => {
    const newLang = language === "en" ? "he" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    document.dir = newLang === "he" ? "rtl" : "ltr";
  };
  // הוסף מתחת ל-state
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await getCurrentUser();
          setUser(response.data);
          const eventsResponse = await getEvents();
          setEvents(eventsResponse.data);
        } else {
          setAuthOpen(true);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setAuthOpen(true);
      } finally {
        setLoading(false); // סיום טעינה - להסתיר אנימציה
      }
    };

    fetchUser();
  }, []);
  // הוסף מתחת ל-useEffect
  const handleLogin = async (username: string, password: string) => {
    setLoading(true); // הצג אנימציה בזמן טעינה
    try {
      const response = await login(username, password);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      const eventsResponse = await getEvents();
      setEvents(eventsResponse.data);
    } finally {
      setLoading(false); // הסתר אנימציה
    }
  };

  const handleRegister = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await register(username, password);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setEvents([]);
    setAuthOpen(true);
  };
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "dark" ? "#90caf9" : "#1976d2",
          },
          secondary: {
            main: mode === "dark" ? "#f48fb1" : "#d81b60",
          },
        },
        typography: {
          fontFamily: [
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
          ].join(","),
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const onEventDrop = ({
    event,
    start,
    end,
  }: EventInteractionArgs<CalendarEvent>) => {
    const updatedEvents = events.map((existingEvent) =>
      existingEvent.id === event.id
        ? { ...event, start: new Date(start), end: new Date(end) }
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  const onEventResize = ({
    event,
    start,
    end,
  }: EventInteractionArgs<CalendarEvent>) => {
    const updatedEvents = events.map((existingEvent) =>
      existingEvent.id === event.id
        ? { ...event, start: new Date(start), end: new Date(end) }
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const handleDialogOpen = () => {
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(new Date().setHours(1, 0, 0, 0)),
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
    });
    setEditingIndex(null);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(new Date().setHours(1, 0, 0, 0)),
    });
    setEditingIndex(null);
  };

  // החלף את הפונקציות הקיימות ב:
  const handleSaveEvent = async () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      setLoading(true);
      try {
        if (editingIndex !== null) {
          const updatedEvent = await updateEvent(
            newEvent.id!,
            newEvent as CalendarEvent
          );
          const updated = [...events];
          updated[editingIndex] = updatedEvent.data;
          setEvents(updated);
        } else {
          const eventToAdd = await createEvent(newEvent as CalendarEvent);
          setEvents([...events, eventToAdd.data]);
        }
        handleDialogClose();
      } catch (error) {
        console.error("Error saving event:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await deleteEvent(id);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index: number) => {
    setNewEvent(events[index]);
    setEditingIndex(index);
    setOpenDialog(true);
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    return {
      style: {
        backgroundColor: event.color || "#4e79a7",
        borderRadius: "4px",
        opacity: 0.8,
        color: "#fff",
        border: "0px",
        display: "block",
      },
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading && <Bee />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        {/* Header */}
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={toggleLanguage}
              aria-label={t("Toggle language")}
            >
              {language !== "en" ? "עב" : "En"}
            </IconButton>
            <CalendarToday sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {/* Modern Calendar App */}
              {t("Modern Calendar App")}
            </Typography>
            <IconButton
              color="inherit"
              onClick={toggleColorMode}
              aria-label="toggle theme"
            >
              {mode !== "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <IconButton
              color="inherit"
              href="https://github.com/yourusername/calendar-app"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
            >
              <GitHub />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={user ? handleLogout : () => setAuthOpen(true)}
              aria-label={user ? "Logout" : "Login"}
            >
              {user ? <ExitToApp /> : <AccountCircle />}
            </IconButton>
            <Typography variant="subtitle2" sx={{ ml: 1 }}>
              {user ? user.username : "Guest"}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box component="main" sx={{ flex: 1, p: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                My Schedule
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleDialogOpen}
                sx={{ textTransform: "none" }}
              >
                {t("New Event")}
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
              }}
            >
              {/* Events List */}
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  width: { xs: "100%", md: 300 },
                  maxHeight: 500,
                  overflow: "auto",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Upcoming Events
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {events.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No events scheduled
                  </Typography>
                ) : (
                  events
                    .sort((a, b) => a.start.getTime() - b.start.getTime())
                    .map((event, idx) => (
                      <Paper
                        key={event.id}
                        elevation={1}
                        sx={{
                          p: 1.5,
                          mb: 1.5,
                          bgcolor: event.color || "primary.main",
                          color: "#fff",
                          position: "relative",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                        >
                          {event.title}
                        </Typography>
                        <Typography variant="caption">
                          {moment(event.start).format("MMM D, YYYY")}
                          {!event.allDay &&
                            ` • ${moment(event.start).format(
                              "h:mm A"
                            )} - ${moment(event.end).format("h:mm A")}`}
                        </Typography>
                        <Box sx={{ position: "absolute", top: 4, right: 4 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(idx)}
                            sx={{ color: "#fff" }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(event.id)}
                            sx={{ color: "#fff" }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Paper>
                    ))
                )}
              </Paper>

              {/* Calendar */}
              <Box sx={{ flex: 1 }}>
                <DragAndDropCalendar
                  localizer={localizer}
                  events={events}
                  onEventDrop={onEventDrop}
                  onEventResize={onEventResize}
                  resizable
                  showAllEvents
                  showMultiDayTimes
                  style={{ height: 600 }}
                  onView={handleViewChange}
                  className={`rounded-lg shadow-sm ${currentView}`}
                  eventPropGetter={eventStyleGetter}
                  views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
                  defaultView={Views.MONTH}
                  components={{
                    event: ({ event }) => (
                      <div>
                        <strong>{event.title}</strong>
                        {!event.allDay && (
                          <div>
                            {moment(event.start).format("h:mm A")} -{" "}
                            {moment(event.end).format("h:mm A")}
                          </div>
                        )}
                      </div>
                    ),
                  }}
                />
              </Box>
            </Box>
          </motion.div>

          {/* Event Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleDialogClose}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>
              {editingIndex !== null ? "Edit Event" : "Create New Event"}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Event Title"
                  sx={{ mt: 2, mb: 1 }}
                  variant="outlined"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <TextField
                    fullWidth
                    type="datetime-local"
                    label="Start"
                    sx={{ mt: 2, mb: 1 }}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        start: new Date(e.target.value),
                      })
                    }
                  />
                  <TextField
                    fullWidth
                    type="datetime-local"
                    label="End"
                    sx={{ mt: 2, mb: 1 }}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        end: new Date(e.target.value),
                      })
                    }
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Event Color
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {colorOptions.map((color) => (
                      <Box
                        key={color}
                        onClick={() => setNewEvent({ ...newEvent, color })}
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: color,
                          borderRadius: "50%",
                          cursor: "pointer",
                          border:
                            newEvent.color === color
                              ? `3px solid ${
                                  theme.palette.mode === "dark"
                                    ? "#fff"
                                    : "#000"
                                }`
                              : "none",
                          "&:hover": {
                            transform: "scale(1.1)",
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleSaveEvent}
                disabled={!newEvent.title}
              >
                {editingIndex !== null ? "Save Changes" : "Create Event"}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            bgcolor: mode === "dark" ? "background.paper" : "grey.100",
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()}
                {t("Modern Calendar App")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created with React, Material-UI, and React Big Calendar
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  size="small"
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener"
                >
                  <GitHub fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
      <AuthDialog
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </ThemeProvider>
  );
}

export default Calendar;
