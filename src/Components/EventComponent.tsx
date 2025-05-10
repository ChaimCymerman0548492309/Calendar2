import { Droppable } from "react-beautiful-dnd";
import { CalendarEvent } from "./Calendar";
import { Employee } from "./EmployeeList";

interface EventComponentProps {
  event: CalendarEvent;
  employees: Employee[]; // הוספתי את המערך employees כפרופ
}

export const EventComponent: React.FC<EventComponentProps> = ({
  event,
  employees,
}) => {
  return (
    <Droppable droppableId={`event-${event._id}`} type="EVENT">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ height: "100%" }}
        >
          <div style={{ padding: "5px" }}>
            <strong>{event.title}</strong>
            {event._id && (
              <div
                style={{
                  background: "#fff3",
                  marginTop: "5px",
                  padding: "2px",
                  borderRadius: "3px",
                }}
              >
                {employees.find((e) => e._id === event._id.toString())?.name}
              </div>
            )}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};