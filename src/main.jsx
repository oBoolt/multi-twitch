import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";

import { DataContextProvider } from "./contexts/dataContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </React.StrictMode>
);
