import React from "react";
//import { Button } from "react-bootstrap";
import "./App.css";
import { CoursesSelect } from "./courseDropdown";
import "./plan";
import { PlanF } from "../src/plan";
import { catalogHeader } from "./catalog";
import { catalogNumber } from "./catalog";
import { SemesterF } from "../src/semester";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">UD CISC Degree Planner</header>
            <p>
                Welcome to the UD CISC Degree Planner! This application is for
                creating potential course outlines for UD CISC Majors. Start by
                creating a plan below, and then begin filling in the semesters
                with the appropriate courses.
            </p>
            <p>Isaac Lewis</p>
            <p>Alexander Trunzo</p>
            <p>Yuchen Zhang</p>
            <hr></hr>
            <PlanF></PlanF>
            <hr></hr>
            <SemesterF></SemesterF>
            <hr></hr>
            <CoursesSelect
                options={catalogHeader}
                options2={catalogNumber}
            ></CoursesSelect>
            <hr></hr>
            <import><</import>
        </div>
    );
}

export default App;
