import React from "react";
import { render } from "react-dom";
import "./styles/style.css";

import App from "./App.jsx";

// Hook in our REact to a div component in the HTML page

render(<App />, document.getElementById("root"));
