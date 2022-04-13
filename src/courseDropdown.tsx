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
    options2: string[];
}): JSX.Element {
    const [userSelection, setUserSelection] = useState<string>(options[0]);
    const [userSelection2, setUserSelection2] = useState<string>(options2[0]);
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
                    {options2.map((choice: string) => (
                        <option key={choice} value={choice}>
                            {choice}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            {visible && userSelection + userSelection2}
            <Button onClick={() => setVisible(!visible)}>Add Course</Button>
        </div>
    );
}
