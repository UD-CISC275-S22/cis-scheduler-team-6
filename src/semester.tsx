import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Semester } from "./semesterlnterface";
import semester from "../src/semesters_data.json";
let semesters = semester.map((cSemester: Semester) => ({ ...cSemester }));

export function SemesterF(): JSX.Element {
    const [s, setS] = useState<Semester[]>(semesters);
    const [x, setX] = useState<number>(0);

    function addSemester(newSemester: Semester) {
        setS([...semesters, newSemester]);
        semesters.push(newSemester);
        setX(x + 1);
        console.log("semester length: " + semesters.length);
    }

    function clearSemesters() {
        setS([]);
        setX(0);
        semesters = [];
    }

    const st: Semester = {
        id: semesters.length,
        courses: [],
        credits: 0
    };

    return (
        <div>
            <h3> Add a Semester </h3>
            <Button onClick={() => addSemester(st)}>Add Semester</Button>
            <Button onClick={() => clearSemesters}>Clear Semesters</Button>
            <div>
                <p>Semester: {s[x].id}</p> <p>Courses: {s[x].courses}</p>{" "}
                <p>Credits: {s[x].credits} </p>
            </div>
            <b>Select Plan:</b>
            <select name="selectList" id="selectList">
                {semesters.map((semester: Semester) => (
                    <option key={semester.id}> Semester: {semester.id} </option>
                ))}
            </select>
        </div>
    );
}
