import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Semester } from "./semesterlnterface";
import semester from "../src/semesters_data.json";
import { pId, plans } from "./plan";
import { PlanF } from "./plan";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

let semesters = semester.map((cSemester: Semester) => ({ ...cSemester }));
console.log("jawn: " + plans[pId].semesters.length);

export function SemesterF(): JSX.Element {
    const [s, setS] = useState<Semester[]>(semesters);
    const [y, setY] = useState<number>(0);

    function addSemester(newSemester: Semester) {
        setS([...semesters, newSemester]);
        if (pId > 0) {
            semesters.push(newSemester);
            setY(y + 1);
            plans[pId].semesters.push(newSemester);
            setS(s);
            setUserSelection2(semesters.length - 1);
        }
    }

    function clearSemesters(newSemester: Semester) {
        console.log(newSemester.id);
        const sl: Semester = {
            id: 0,
            courses: [],
            credits: 0
        };
        if (plans.length > 1) {
            setY(0);
            semesters = [];
            semesters.push(sl);
            plans[pId].semesters = [];
        }
    }

    const st: Semester = {
        id: semesters.length,
        courses: [],
        credits: 0
    };

    const [userSelection2, setUserSelection2] = useState<number>(
        semesters[0].id
    );
    const setAnswerS = (Event: ChangeEvent) => {
        const v = parseInt(Event.target.value);
        setUserSelection2(v);
        setY(v);
        setY(plans[pId].semesters[v - 1].id);
    };

    function deleteSemester(newSemester: Semester) {
        newSemester.courses = [];
        if (s.length > 1) {
            semesters.splice(y, 1);
            setY(y - 1);
        }
    }

    React.useEffect(() => {
        console.log("plan changed");
        clearSemesters;
    }, [PlanF]);

    return (
        <div>
            <h3> Add a Semester </h3>
            <Button onClick={() => addSemester(st)}>Add Semester</Button>
            <Button onClick={() => clearSemesters(st)}>Clear Semesters</Button>
            <Button onClick={() => deleteSemester(st)}>Delete Semester</Button>
            <div>
                <p>Semester: {s[y].id}</p> <p>Courses: {s[y].courses.length}</p>{" "}
                <p>Credits: {s[y].credits} </p>
            </div>
            <b>Select Semester:</b>
            <Form.Select
                name="selectList"
                id="selectList"
                value={userSelection2}
                onChange={setAnswerS}
            >
                {plans[pId].semesters.map((semester: Semester) => (
                    <option key={semester.id} value={semester.id}>
                        {" "}
                        Semester {semester.id}{" "}
                    </option>
                ))}
            </Form.Select>
        </div>
    );
}
