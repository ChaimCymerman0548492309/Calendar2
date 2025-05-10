import { DropResult } from "react-beautiful-dnd";
import { CalendarEvent } from "./Calendar";

export const handleEmployeeDrop = (
  result: DropResult,
  events: CalendarEvent[],
  updateEvents: (events: CalendarEvent[]) => void,
  updateEventAssignment: (eventId: string, employeeId: string) => Promise<void>
) => {
  if (!result.destination) return;

  const { destination } = result;

  if (destination.droppableId.startsWith("event-")) {
    const eventId = destination.droppableId.replace("event-", "");
    const employeeId = result.draggableId.replace("employee-", "");

    const updatedEvents = events.map((event) =>
      event._id.toString() === eventId ? { ...event, employeeId } : event
    );

    updateEvents(updatedEvents);
    updateEventAssignment(eventId, employeeId);
  }
};
