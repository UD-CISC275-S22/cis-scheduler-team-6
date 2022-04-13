import React from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import "./plan";
import { PlanF } from "../src/plan";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">UD CISC Degree Planner</header>
            <p>
                This application is for creating potential course outlines for
                UD CISC Degrees.
            </p>
            <p>Isaac Lewis</p>
            <p>Alexander Trunzo</p>
            <p>Yuchen Zhang</p>
            <div>
                <hr></hr>
                <PlanF></PlanF>
                <hr></hr>
            </div>
        </div>
    );
}

export default App;
