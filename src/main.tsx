import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import { DragDropContext } from "react-beautiful-dnd";
import { handleEmployeeDrop } from "./Components/dragUtils";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import './styles/index.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DndProvider backend={HTML5Backend}>
    <React.StrictMode>
      {/* <DragDropContext onDragEnd={()=>handleEmployeeDrop}> */}
      <App />
      {/* </DragDropContext> */},{" "}
    </React.StrictMode>
  </DndProvider>
);
