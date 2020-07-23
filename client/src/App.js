import React, { useEffect } from "react";
import "./App.css";
import { OrangeHeading } from "./components/styled/Heading";

function App() {
  useEffect(() => {
    document.title = "Home | Engz".toUpperCase();
  });

  return (
    <div className="App">
      <header className="App-header">
        <OrangeHeading>Engz</OrangeHeading>
        <p>task manager</p>
      </header>
    </div>
  );
}
export default App;
