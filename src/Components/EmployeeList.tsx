import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Divider, Paper, Typography } from "@mui/material";
import { useRef } from "react";

export interface Employee {
  _id: string;
  name: string;
  position: string;
  color: string;
  avatar?: string;
}

interface EmployeeListProps {
  employees: Employee[];
  moveEmployee: (dragIndex: number, hoverIndex: number) => void;
}

const ItemTypes = {
  EMPLOYEE: "employee",
};

const EmployeeCard = ({ employee }: { employee: Employee }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "EMPLOYEE",
    item: { id: employee._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        marginBottom: "8px",
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <Paper
        sx={{
          p: 2,
          backgroundColor: employee.color,
          color: "#fff",
        }}
      >
        <Typography fontWeight="bold">{employee.name}</Typography>
        <Typography variant="body2">{employee.position}</Typography>
      </Paper>
    </div>
  );
};
export const EmployeeList = ({
  employees,
  moveEmployee,
}: EmployeeListProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Paper
        elevation={3}
        sx={{ p: 2, width: 250, maxHeight: "80vh", overflow: "auto" }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Employees
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {employees.map((employee, index) => (
          <EmployeeCard
            key={employee._id}
            employee={employee}
            // index={index}
            // moveEmployee={moveEmployee}
          />
        ))}
      </Paper>
    </DndProvider>
  );
};
