import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "../src/index.css"
import { ServerStatusContext, ServerStatusProvider } from "./context/ServerStatusContext"
ReactDOM.createRoot(document.getElementById("root")).render(
  <ServerStatusProvider>
    <App />
  </ServerStatusProvider>
)
