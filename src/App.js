import './App.css';
import React from "react";
import {AppRouter} from "./routes";
function App() {
  return (
    <div className="viewport">
      <AppRouter className="col-flex" />
    </div>
  );
}

export default App;
