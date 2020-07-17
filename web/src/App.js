import React from "react";
import "./App.css";
import { OrangeHeading, StyledHeading } from "./components/shared/Heading";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StyledHeading>Engz</StyledHeading>
        <StyledHeading primary>Engz</StyledHeading>
        <OrangeHeading>Engz</OrangeHeading>
        <OrangeHeading primary>Engz</OrangeHeading>
        <p>task manager</p>
      </header>
    </div>
  );
}
export default App;
