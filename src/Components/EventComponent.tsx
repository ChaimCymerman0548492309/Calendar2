import { useDrop } from "react-dnd";
import { CalendarEvent } from "./Calendar";
import { Employee } from "./EmployeeList";

interface EventComponentProps {
  event: CalendarEvent;
  employees: Employee[];
  onEmployeeAssign: (employeeId: string, eventId: string) => void;
}

export const EventComponent: React.FC<EventComponentProps> = ({
  event,
  employees,
  onEmployeeAssign,
}) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "EMPLOYEE",
      drop: (item: { id: string }) => {
        onEmployeeAssign(item.id, event._id.toString());
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [onEmployeeAssign, event._id]
  );

  return (
    <div
      ref={drop}
      style={{
        padding: "5px",
        height: "100%",
        backgroundColor: isOver ? "rgba(0, 150, 255, 0.2)" : "transparent",
        border: isOver ? "2px dashed #0096ff" : "none",
        borderRadius: "4px",
        transition: "all 0.3s ease",
      }}
    >
      <strong>{event.title}</strong>
      {event.employeeId && (
        <div
          style={{
            background: "#fff3",
            marginTop: "5px",
            padding: "2px",
            borderRadius: "3px",
          }}
        >
          {employees.find((e) => e._id === event.employeeId)?.name}
        </div>
      )}
    </div>
  );
};
