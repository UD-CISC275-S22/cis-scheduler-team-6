import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Semester } from "./semesterlnterface";
import semester from "../src/semesters_data.json";
import { pId, plans } from "./plan";
//import { PlanF } from "./plan";
let semesters = semester.map((cSemester: Semester) => ({ ...cSemester }));

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function SemesterF(): JSX.Element {
    let j = false;
    if (plans[pId].semesters.length > 0 && plans.length > 0) {
        j = true;
    }

    const [s, setS] = useState<Semester[]>(semesters);
    const [x, setX] = useState<number>(0);
    console.log("jawn: " + plans[pId].semesters.length);

    /*
    function check() {
        if (j == true) {
            setX(plans[pId].semesters.length);
        }
    }
    */

    function addSemester(newSemester: Semester) {
        setS([...semesters, newSemester]);
        //setS(plans[pId].semesters);
        semesters.push(newSemester);
        setX(x + 1);
        plans[pId].semesters.push(newSemester);
        setUserSelection(semesters.length - 1);
    }

    function clearSemesters(newSemester: Semester) {
        console.log(newSemester.id);
        const sl: Semester = {
            id: 0,
            courses: [],
            credits: 0
        };
        setX(0);
        semesters = [];
        semesters.push(sl);
        plans[pId].semesters = [];
    }

    const st: Semester = {
        id: semesters.length,
        courses: [],
        credits: 0
    };

    const [userSelection, setUserSelection] = useState<number>(semesters[0].id);
    const setAnswer = (Event: ChangeEvent) => {
        const v = parseInt(Event.target.value);
        setUserSelection(v);
        setX(v);
        //setS(plans[pId].semesters);
        setX(plans[pId].semesters[v - 1].id);
    };

    /*
    function updatePlans(event: React.ChangeEvent<HTMLInputElement>) {
        //
    }
    */

    /*
    React.useEffect(() => {
        console.log("plan changed");
        clearSemesters;
    }, [PlanF]);
    */

    return (
        <div>
            <h3> Add a Semester </h3>
            <Button onClick={() => addSemester(st)}>Add Semester</Button>
            <Button onClick={() => clearSemesters(st)}>Clear Semesters</Button>
            <div>
                <p>Semester: {s[x].id}</p> <p>Courses: {s[x].courses.length}</p>{" "}
                <p>Credits: {s[x].credits} </p>
            </div>
            <b>Select Semester:</b>
            <Form.Select
                name="selectList"
                id="selectList"
                value={userSelection}
                onChange={setAnswer}
            >
                {plans[pId].semesters.map((semester: Semester) => (
                    <option key={semester.id} value={semester.id}>
                        {" "}
                        Semester {semester.id}{" "}
                    </option>
                ))}
            </Form.Select>
            <Form.Group controlId="changeTextBox">
                <Form.Label>
                    <b>Remove Semester:</b> (enter id)
                    <Form.Control
                        type="number"
                        defaultValue={semesters[x].id}
                        //onChange={updatePlans}
                    ></Form.Control>
                </Form.Label>
            </Form.Group>
        </div>
    );
}
