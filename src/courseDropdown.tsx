import React, { useState } from "react";
import { Form } from "react-bootstrap";
/*
import { CoursePool } from "./coursePool";
import { Semester } from "./semesterlnterface";
import { SemesterF } from "./semester";
*/
import { catalogBreadth, catalogCredit, catalogRestrict } from "./catalog";
import { catalogName } from "./catalog";
import { catalogPreReq } from "./catalog";
import { catalogTyp } from "./catalog";
import { catalogDescr } from "./catalog";
import { breadthReq, coreReq, EditCourse } from "./EditCourse";
import { Semester } from "./semesterlnterface";
//import { Button } from "react-bootstrap";
//import Modal from "react-bootstrap/Modal";
import { Props } from "./InterfaceProps";
import { course } from "./course";
type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;
//

export function CoursesSelect({
    options,
    options2,
    options3,
    creditsRequired,
    semesters,
    Buttons,
    setS,
    s,
    y
}: {
    options: string[];
    options2: string[][];
    options3: string[];
    creditsRequired: number;
    semesters: Semester[];
    Buttons: React.FC<Props>;
    setS: React.Dispatch<React.SetStateAction<Semester[]>>;
    s: Semester[];
    y: number;
}): JSX.Element {
    const [userSelection4, setUserSelection4] = useState<string>(options[0]);
    const [userSelection5, setUserSelection5] = useState<string>(options3[0]);
    const [visible2, setVisible2] = useState<boolean>(true);

    //const [formSelection, setFormSelection] = useState<string[]>(options2[0]);

    //const [visible, setVisible] = useState<boolean>(true);

    const setAnswer4 = (Event: ChangeEvent) => {
        setUserSelection4(Event.target.value);
        setUserSelection5(options2[options.indexOf(Event.target.value)][0]);
    };

    const setAnswer5 = (Event: ChangeEvent) => {
        setUserSelection5(Event.target.value);
    };

    const [course, setCourse] = useState<course>({
        code: userSelection5,
        name: catalogName[options.indexOf(userSelection4)][
            options3.indexOf(userSelection5)
        ],
        descr: catalogDescr[options.indexOf(userSelection4)][
            options3.indexOf(userSelection5)
        ],
        credits:
            catalogCredit[options.indexOf(userSelection4)][
                options3.indexOf(userSelection5)
            ],
        preReq: catalogPreReq[options.indexOf(userSelection4)][
            options3.indexOf(userSelection5)
        ],
        restrict:
            catalogRestrict[options.indexOf(userSelection4)][
                options3.indexOf(userSelection5)
            ],
        breadth:
            catalogBreadth[options.indexOf(userSelection4)][
                options3.indexOf(userSelection5)
            ],
        typ: catalogTyp[options.indexOf(userSelection4)][
            options3.indexOf(userSelection5)
        ]
    });

    /*
    const setForm = (Event: ChangeEvent) => {
        setFormSelection(options2[options.indexOf(userSelection)]);
    };
    */

    {
        options3 = options2[options.indexOf(userSelection4)];
    }
    return (
        <div>
            <h3></h3>
            <br></br>
            <br></br>
            <p>
                The core plan requires all of the following courses: ENGL 110,
                EGGG 101, CISC 101, CISC 108 , MATH 241 , MATH 242 , CISC 181 ,
                CISC 210 , CISC 260 , CISC 355 , MATH 205 , MATH 210 , CISC 275
            </p>
            <br></br>
            <p>
                The plan also requires 4 breadths fulfilling each category, 6
                free electives and 4 restricted electives
            </p>
            <br></br>
            <br></br>
            <p>Core Requirements Remaining: {coreReq}</p>
            <p>Breadths Remaining: {breadthReq}</p>
            <p>Restricted Electives Remaining: 4</p>
            {visible2 && (
                <Form.Group controlId="choiceDropdown">
                    <Form.Label>Choose a department</Form.Label>
                    <Form.Select value={userSelection4} onChange={setAnswer4}>
                        {options.map((choice: string) => (
                            <option key={choice} value={choice}>
                                {choice}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            )}
            {visible2 && (
                <Form.Group controlId="choiceDropdown3">
                    <Form.Label>Choose a course</Form.Label>
                    <Form.Select value={userSelection5} onChange={setAnswer5}>
                        {options3.map((choice3: string) => (
                            <option key={choice3} value={choice3}>
                                {choice3}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            )}
            <EditCourse
                options={options}
                options2={options2}
                options3={options3}
                userSelection5={userSelection5}
                userSelection4={userSelection4}
                creditsRequired={creditsRequired}
                semesters={semesters}
                Buttons={Buttons}
                setS={setS}
                s={s}
                y={y}
                course={course}
                setCourse={setCourse}
                setVisible2={setVisible2}
                visible2={visible2}
            ></EditCourse>
            <hr></hr>
        </div>
    );
}
