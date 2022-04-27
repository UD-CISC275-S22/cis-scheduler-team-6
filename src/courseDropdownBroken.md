import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

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
        options2[+userSelection][0]
    );
    const [visible, setVisible] = useState<boolean>(true);

    const setAnswer = (Event: ChangeEvent) => {
        setUserSelection(Event.target.value);
    };

    const setAnswer2 = (Event: ChangeEvent) => {
        setUserSelection2(Event.target.value);
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
                <Form.Select value={userSelection2} onChange={setAnswer2}>
                    {options2.map(
                        (choice: string[]) => (
                            choice.map((selection: string) => (
                                <option key={selection} value={selection}>
                                    {selection}
                                </option>
                            )),
                            (
                                <option key={choice[0]} value={choice[0]}>
                                    {choice[0]}
                                </option>
                            )
                        )
                    )}
                </Form.Select>
            </Form.Group>
            <hr></hr>
            <EditCourse></EditCourse>
        </div>
    );

    function EditCourse(): JSX.Element {
        const [course, setCourse] = useState({
            id: +userSelection2,
            name: userSelection,
            credits: 3,
            req: "",
            offered: ""
        });
        const [editState, setEditState] = useState<boolean>(false);

        function updateEditState(event: React.ChangeEvent<HTMLInputElement>) {
            setEditState(event.target.checked);
        }
        function updateCourseID(event: React.ChangeEvent<HTMLInputElement>) {
            setCourse({ ...course, id: event.target.valueAsNumber });
        }
        function updateCourseName(event: React.ChangeEvent<HTMLInputElement>) {
            setCourse({ ...course, name: event.target.value });
        }
        function updateCourseCredits(
            event: React.ChangeEvent<HTMLInputElement>
        ) {
            setCourse({ ...course, credits: event.target.valueAsNumber });
        }
        function updateCourseReq(event: React.ChangeEvent<HTMLInputElement>) {
            setCourse({ ...course, req: event.target.value });
        }
        function updateCourseOffered(
            event: React.ChangeEvent<HTMLInputElement>
        ) {
            setCourse({ ...course, offered: event.target.value });
        }
        function setDefault() {
            setCourse({
                ...course,
                name: userSelection,
                id: +userSelection2,
                credits: 3,
                req: "",
                offered: ""
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
                            <Form.Label>Change Name:</Form.Label>
                            <Form.Control
                                type="string"
                                value={course.name}
                                onChange={updateCourseName}
                            />
                            <Form.Label>Change ID:</Form.Label>
                            <Form.Control
                                type="number"
                                value={course.id}
                                onChange={updateCourseID}
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
                                value={course.req}
                                onChange={updateCourseReq}
                            />
                            <Form.Label>Change Offered:</Form.Label>
                            <Form.Control
                                type="string"
                                value={course.offered}
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
                    Add {course.name + course.id}
                </Button>
            </div>
        );
    }
}
