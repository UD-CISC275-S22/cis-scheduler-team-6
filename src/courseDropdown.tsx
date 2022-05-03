import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CoursePool } from "./coursePool";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function CoursesSelect({
    options,
    options2
}: {
    options: string[];
    options2: string[][];
}): JSX.Element {
    const [userSelection, setUserSelection] = useState<string>(options[0]);
    const [userSelection2, setUserSelection2] = useState<string>(
        options2[0][0]
    );
    const [formSelection, setFormSelection] = useState<string[]>(options2[0]);
    const [visible, setVisible] = useState<boolean>(true);

    const setAnswer = (Event: ChangeEvent) => {
        setUserSelection(Event.target.value);
    };

    const setAnswer2 = (Event: ChangeEvent) => {
        setUserSelection2(Event.target.value);
    };

    const setForm = (Event: ChangeEvent) => {
        setFormSelection(options2[+userSelection]);
    };

    return (
        <div>
            <h3>Add a Course</h3>
            <Form.Group controlId="choiceDropdown">
                <Form.Label>Choose a department</Form.Label>
                <Form.Select value={userSelection} onChange={setAnswer}>
                    {options.map((choice: string) => (
                        <option key={choice} value={choice}>
                            {choice}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="choiceDropdown2">
                <Form.Label>Choose a course</Form.Label>
                <Form.Select value={formSelection} onChange={setForm}>
                    {options2.map((choice2: string[]) => (
                        <option key={userSelection} value={choice2}>
                            {choice2}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <hr></hr>
            <EditCourse></EditCourse>
        </div>
    );

    function EditCourse(): JSX.Element {
        const [course, setCourse] = useState({
            code: userSelection2,
            name: "",
            descr: "",
            credits: "",
            preReq: "",
            restrict: "",
            breadth: "",
            typ: ""
        });
        const [editState, setEditState] = useState<boolean>(false);

        function updateEditState(event: React.ChangeEvent<HTMLInputElement>) {
            setEditState(event.target.checked);
        }
        function updateCourseID(event: React.ChangeEvent<HTMLInputElement>) {
            setCourse({ ...course, code: event.target.value });
        }
        function updateCourseName(event: React.ChangeEvent<HTMLInputElement>) {
            setCourse({ ...course, name: event.target.value });
        }
        function updateCourseDescr(event: React.ChangeEvent<HTMLInputElement>) {
            setCourse({ ...course, descr: event.target.value });
        }
        function updateCourseCredits(
            event: React.ChangeEvent<HTMLInputElement>
        ) {
            setCourse({ ...course, credits: event.target.value });
        }
        function updateCourseReq(event: React.ChangeEvent<HTMLInputElement>) {
            setCourse({ ...course, preReq: event.target.value });
        }
        function updateCourseRestrict(
            event: React.ChangeEvent<HTMLInputElement>
        ) {
            setCourse({ ...course, restrict: event.target.value });
        }
        function updateCourseBreadth(
            event: React.ChangeEvent<HTMLInputElement>
        ) {
            setCourse({ ...course, breadth: event.target.value });
        }
        function updateCourseOffered(
            event: React.ChangeEvent<HTMLInputElement>
        ) {
            setCourse({ ...course, typ: event.target.value });
        }
        function setDefault() {
            setCourse({
                ...course,
                code: userSelection2,
                name: "",
                descr: "",
                credits: "",
                preReq: "",
                restrict: "",
                breadth: "",
                typ: ""
            });
        }
        return (
            <div>
                <div>
                    <Form.Check
                        type="switch"
                        id="check-edit"
                        label="Edit?"
                        checked={editState}
                        onChange={updateEditState}
                    />
                </div>
                <div>
                    {editState && (
                        <Form.Group controlId="changeTextBox">
                            <Form.Label>Change Code:</Form.Label>
                            <Form.Control
                                type="string"
                                value={course.code}
                                onChange={updateCourseID}
                            />
                            <Form.Label>Change Name:</Form.Label>
                            <Form.Control
                                type="string"
                                value={course.name}
                                onChange={updateCourseName}
                            />
                            <Form.Label>Change description:</Form.Label>
                            <Form.Control
                                type="string"
                                value={course.descr}
                                onChange={updateCourseDescr}
                            />
                            <Form.Label>Change Credits:</Form.Label>
                            <Form.Control
                                type="number"
                                value={course.credits}
                                onChange={updateCourseCredits}
                            />
                            <Form.Label>Change PreRequisites:</Form.Label>
                            <Form.Control
                                type="string"
                                value={course.preReq}
                                onChange={updateCourseReq}
                            />
                            <Form.Label>Change Restrict:</Form.Label>
                            <Form.Control
                                type="string"
                                value={course.restrict}
                                onChange={updateCourseRestrict}
                            />
                            <Form.Label>Change Breadth:</Form.Label>
                            <Form.Control
                                type="string"
                                value={course.breadth}
                                onChange={updateCourseBreadth}
                            />
                            <Form.Label>Change Offered:</Form.Label>
                            <Form.Control
                                type="string"
                                value={course.typ}
                                onChange={updateCourseOffered}
                            />
                            <Button onClick={() => setDefault()}>
                                Set to Default
                            </Button>
                        </Form.Group>
                    )}
                </div>
                {visible}
                <Button onClick={() => setVisible(!visible)}>
                    Add {course.code}
                </Button>
            </div>
        );
    }
}
