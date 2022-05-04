import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CoursePool } from "./coursePool";
import { Semester } from "./semesterlnterface";
import { SemesterF } from "./semester";
import { catalogBreadth, catalogCredit, catalogRestrict } from "./catalog";
import { catalogName } from "./catalog";
import { catalogPreReq } from "./catalog";
import { catalogTyp } from "./catalog";
import { catalogDescr } from "./catalog";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function CoursesSelect({
    options,
    options2,
    options3
}: {
    options: string[];
    options2: string[][];
    options3: string[];
}): JSX.Element {
    const [userSelection, setUserSelection] = useState<string>(options[0]);
    const [userSelection2, setUserSelection2] = useState<string>(
        options2[options.indexOf(userSelection)][0]
    );
    const [userSelection3, setUserSelection3] = useState<string>(options3[0]);
    const [formSelection, setFormSelection] = useState<string[]>(options2[0]);

    const [visible, setVisible] = useState<boolean>(true);

    const setAnswer = (Event: ChangeEvent) => {
        setUserSelection(Event.target.value);
    };

    const setAnswer2 = (Event: ChangeEvent) => {
        setUserSelection3(Event.target.value);
    };

    const setForm = (Event: ChangeEvent) => {
        setFormSelection(options2[options.indexOf(userSelection)]);
    };

    {
        options3 = options2[options.indexOf(userSelection)];
    }
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
            <Form.Group controlId="choiceDropdown3">
                <Form.Label>Choose a real course</Form.Label>
                <Form.Select value={userSelection3} onChange={setAnswer2}>
                    {options3.map((choice3: string) => (
                        <option key={choice3} value={choice3}>
                            {choice3}
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
            code: userSelection3,
            name: catalogName[options.indexOf(userSelection)][
                options3.indexOf(userSelection3)
            ],
            descr: catalogDescr[options.indexOf(userSelection)][
                options3.indexOf(userSelection3)
            ],
            credits:
                catalogCredit[options.indexOf(userSelection)][
                    options3.indexOf(userSelection3)
                ],
            preReq: catalogPreReq[options.indexOf(userSelection)][
                options3.indexOf(userSelection3)
            ],
            restrict:
                catalogRestrict[options.indexOf(userSelection)][
                    options3.indexOf(userSelection3)
                ],
            breadth:
                catalogBreadth[options.indexOf(userSelection)][
                    options3.indexOf(userSelection3)
                ],
            typ: catalogTyp[options.indexOf(userSelection)][
                options3.indexOf(userSelection3)
            ]
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
            //setCourse({ ...course, credits: parseInt(event.target.value) });
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
                code: userSelection3,
                name: catalogName[options.indexOf(userSelection)][
                    options3.indexOf(userSelection3)
                ],
                descr: catalogDescr[options.indexOf(userSelection)][
                    options3.indexOf(userSelection3)
                ],
                credits:
                    catalogCredit[options.indexOf(userSelection)][
                        options3.indexOf(userSelection3)
                    ],
                preReq: catalogPreReq[options.indexOf(userSelection)][
                    options3.indexOf(userSelection3)
                ],
                restrict:
                    catalogRestrict[options.indexOf(userSelection)][
                        options3.indexOf(userSelection3)
                    ],
                breadth:
                    catalogBreadth[options.indexOf(userSelection)][
                        options3.indexOf(userSelection3)
                    ],
                typ: catalogTyp[options.indexOf(userSelection)][
                    options3.indexOf(userSelection3)
                ]
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
                                type="string"
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
