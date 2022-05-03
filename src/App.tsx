import React, { useState } from "react";
import "./App.css";
import { CoursesSelect } from "./courseDropdown";
import "./plan";
import { PlanF } from "../src/plan";
import { catalogHeader } from "./catalog";
import { Form } from "react-bootstrap";
import { skipPartiallyEmittedExpressions } from "typescript";
import { catalogNumber } from "./catalog";
import { SemesterF } from "../src/semester";
import { upload } from "../src/import";

export function App(): JSX.Element {
    const [editState, setEditState] = useState<boolean>(false);

    function updateEditState(event: React.ChangeEvent<HTMLInputElement>) {
        setEditState(event.target.checked);
    }
    return (
        <div className="App">
            <header className="App-header">UD CISC Degree Planner</header>
            <p>
                Welcome to the UD CISC Degree Planner! This application is for
                creating potential course outlines for UD CISC Majors. Start by
                creating a plan below, and then begin filling in the semesters
                with the appropriate courses.
            </p>
            <p>Isaac Lewis - Alexander Trunzo - Yuchen Zhang</p>
            <hr></hr>
            <PlanF></PlanF>
            <Form.Check
                type="switch"
                id="check-edit"
                label="Edit Plan"
                checked={editState}
                onChange={updateEditState}
            />
            <hr></hr>
            {editState && (
                <>
                    <SemesterF></SemesterF>
                    <hr></hr>
                    <CoursesSelect
                        options={catalogHeader}
                        options2={catalogNumber}
                        options3={catalogNumber[0]}
                    ></CoursesSelect>
                </>
            )}
        </div>
        //<upload></upload>
    );
}
