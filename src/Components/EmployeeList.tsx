import { Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

export interface Employee {
  _id: string;
  name: string;
  position: string;
  color: string;
  avatar?: string;
}

interface EmployeeListProps {
  employees: Employee[];
}

export const EmployeeList = ({ employees }: EmployeeListProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        width: 250,
        maxHeight: "80vh",
        overflow: "auto",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Employees
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {employees.map((employee, index) => (
        <Draggable key={employee._id} draggableId={employee._id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableProps.style,
                marginBottom: "8px",
                opacity: snapshot.isDragging ? 0.8 : 1,
                transform: snapshot.isDragging ? "scale(1.02)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: employee.color || "#f5f5f5",
                  color: "#fff",
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
              >
                <Typography fontWeight="bold">{employee.name}</Typography>
                <Typography variant="body2">{employee.position}</Typography>
              </Paper>
            </div>
          )}
        </Draggable>
      ))}
    </Paper>
  );
};
