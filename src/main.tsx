import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { DragDropContext } from "react-beautiful-dnd";
import { handleEmployeeDrop } from "./Components/dragUtils";
// import './styles/index.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <DragDropContext onDragEnd={()=>handleEmployeeDrop}> */}
      <App />
    {/* </DragDropContext> */}
    ,{" "}
  </React.StrictMode>
);
