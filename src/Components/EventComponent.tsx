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
        onEmployeeAssign(item.id, event._id);
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
      }}
    >
      <strong>{event.title}</strong>
      {event.employeeIds && event.employeeIds!.length > 0 && (
        <div style={{ marginTop: "5px" }}>
          {event.employeeIds!.map((employeeId) => {
            const employee = employees.find((e) => e._id === employeeId);
            return employee ? (
              <div
                key={employeeId}
                style={{
                  background: "#fff3",
                  padding: "2px",
                  borderRadius: "3px",
                  marginBottom: "2px",
                }}
              >
                <div
                  key={employeeId}
                  style={{
                    background: "#fff3",
                    padding: "2px",
                    borderRadius: "3px",
                    marginBottom: "2px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{employee.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEmployeeAssign(employeeId, event._id);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ff4444",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </div>
                {/* {employee.name} */}
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};