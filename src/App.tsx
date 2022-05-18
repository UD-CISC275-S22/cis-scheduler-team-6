import React from "react";
import "./App.css";
import "./plan";
import { PlanF } from "../src/plan";
import { catalogHeader } from "./catalog";
import { catalogNumber } from "./catalog";
//import { SemesterF } from "../src/semester";

export { App };
function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">UD CISC275 Degree Planner</header>
            <p>Isaac Lewis - Alexander Trunzo - Yuchen Zhang</p>
            <p>
                Welcome to the UD CISC Degree Planner! This application is for
                creating potential course outlines for UD CISC Majors. Start by
                creating a plan below, and then begin filling in the semesters
                with the appropriate courses. The program will tell you how many
                courses/credits you have and which degree requirements you are
                missing.
            </p>
            <hr></hr>
            <PlanF
                options={catalogHeader}
                options2={catalogNumber}
                options3={catalogNumber[0]}
            ></PlanF>
            <hr></hr>
        </div>
    );
}
