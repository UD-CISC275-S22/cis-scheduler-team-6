import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function EditCourse(): JSX.Element {
    const [course, setCourse] = useState({
        id: 0,
        name: "",
        credits: 0,
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
    function updateCourseCredits(event: React.ChangeEvent<HTMLInputElement>) {
        setCourse({ ...course, credits: event.target.valueAsNumber });
    }
    function updateCourseReq(event: React.ChangeEvent<HTMLInputElement>) {
        setCourse({ ...course, req: event.target.value });
    }
    function updateCourseOffered(event: React.ChangeEvent<HTMLInputElement>) {
        setCourse({ ...course, offered: event.target.value });
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
                    </Form.Group>
                )}
            </div>
        </div>
    );
}
