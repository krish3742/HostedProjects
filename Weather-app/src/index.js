import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";

import App from "./App";
import { AllContext } from "./store/Context";
import "./output.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <AllContext>
      <App />
    </AllContext>
  </BrowserRouter>
);
