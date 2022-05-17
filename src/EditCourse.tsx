import React from "react";
import { useState } from "react";
//import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Semester } from "./semesterlnterface";
//import Modal from "react-bootstrap/Modal";
import { catalogBreadth, catalogCredit, catalogRestrict } from "./catalog";
import { catalogName } from "./catalog";
import { catalogPreReq } from "./catalog";
import { catalogTyp } from "./catalog";
import { catalogDescr } from "./catalog";
import { course } from "./course";
import { Props } from "./InterfaceProps";
//import { findRenderedComponentWithType } from "react-dom/test-utils";
//userSelection5 userSelection4 coursesTaken coreReq creditsRequired semester
import "./plan.css";
//

let coursesTaken = [""];
export const core = [
    "ENGL 110",
    "  ",
    "EGGG 101",
    "  ",
    "CISC 108",
    "  ",
    "MATH 241",
    "  ",
    "MATH 242",
    "  ",
    "CISC 181",
    "  ",
    "CISC 210",
    "  ",
    "CISC 220",
    "  ",
    "CISC 260",
    "  ",
    "CISC 355",
    "  ",
    "MATH 205",
    "  ",
    "MATH 210",
    "  ",
    "CISC 275"
];
const BREADTH = [
    "Creative Arts and Humanities,",
    "   ",
    "History and Cultural Change,",
    "   ",
    "Social and Behavioral Sciences,",
    "   ",
    "Math, Natural Sci and Tech"
];
export let coreReq = core;
export const restReq = 4;
export const freeReq = 6;
export let breadthReq = [
    "Creative Arts and Humanities,",
    "   ",
    "History and Cultural Change,",
    "   ",
    "Social and Behavioral Sciences,",
    "   ",
    "Math, Natural Sci and Tech"
];
let breadthArtCount = 0;
let breadthHisCount = 0;
let breadthSocialCount = 0;
let breadthMathCount = 0;
export function EditCourse({
    options,
    options2,
    options3,
    userSelection5,
    userSelection4,
    creditsRequired,
    semesters,
    Buttons,
    setS,
    s,
    y,
    course,
    setCourse,
    setVisible2,
    visible2
}: {
    options: string[];
    options2: string[][];
    options3: string[];
    userSelection5: string;
    userSelection4: string;
    creditsRequired: number;
    semesters: Semester[];
    Buttons: React.FC<Props>;
    setS: React.Dispatch<React.SetStateAction<Semester[]>>;
    s: Semester[];
    y: number;
    course: course;
    setCourse: React.Dispatch<
        React.SetStateAction<{
            code: string;
            name: string;
            descr: string;
            credits: string;
            preReq: string;
            restrict: string;
            breadth: string;
            typ: string;
        }>
    >;
    setVisible2: React.Dispatch<React.SetStateAction<boolean>>;
    visible2: boolean;
}): JSX.Element {
    const [editState, setEditState] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    {
        options3 = options2[options.indexOf(userSelection4)];
    }
    console.log(options3);

    function Adding(newSemester: Semester) {
        //doesn't properly handle norm case when telling what prereqs are missing
        console.log("check 1");
        let checker = true;
        const convert = course.credits.trim();
        console.log("check 2");
        //list of all of the prereqs (or's not handled)
        const PreReqs = course.preReq.trim().replace(".", "").split(",");
        let missingreq = PreReqs;
        console.log("check 3");
        //I think max length for or case is 16
        //I think and is 17
        console.log(PreReqs);
        const PreReqNormCase = PreReqs.filter(
            (Thisone: string): boolean => Thisone.length < 16
        );
        console.log(PreReqNormCase);
        console.log("check 4");
        const PreReqOrCase = PreReqs.filter(
            (Thisone: string): boolean =>
                Thisone.split("OR").length === 2 ||
                Thisone.split("or").length === 2
        );
        console.log("check 5");
        console.log(PreReqOrCase);
        let ProperOr = [""];
        if (PreReqOrCase.length > 0) {
            ProperOr = PreReqOrCase[0].split("or");
            if (ProperOr.length < 2) {
                ProperOr = PreReqOrCase[0].split("OR");
            }
        }
        console.log(ProperOr);
        console.log("check 6");
        const PreReqAndCase = PreReqs.filter(
            (Thisone: string): boolean =>
                Thisone.split("AND").length === 2 ||
                Thisone.split("and").length === 2
        );
        console.log("check 7");
        console.log(PreReqAndCase);
        let ProperAnd = [""];
        if (PreReqAndCase.length > 0) {
            ProperAnd = PreReqAndCase[0].split("and");
            if (ProperAnd.length < 2) {
                ProperAnd = PreReqAndCase[0].split("AND");
            }
        }
        console.log("check 8");
        console.log(ProperAnd);
        //greater than 10, less than 21
        //handle the ors
        //determine if the prereq requirements are fulfilled
        const testingthis = (currentValue: string) =>
            coursesTaken.includes(currentValue);
        if (ProperOr.length > 1) {
            if (
                coursesTaken.includes(ProperOr[0].trim()) ||
                coursesTaken.includes(ProperOr[1].trim())
            ) {
                const anothertemp = missingreq.filter(
                    (Thisone: string): boolean =>
                        Thisone !== ProperOr[0].trim() &&
                        Thisone !== ProperOr[1].trim()
                );
                missingreq = anothertemp;
                if (ProperAnd.length > 1) {
                    if (
                        coursesTaken.includes(ProperAnd[0].trim()) &&
                        coursesTaken.includes(ProperAnd[1].trim())
                    ) {
                        const anothertemp = missingreq.filter(
                            (Thisone: string): boolean =>
                                Thisone !== ProperAnd[0].trim() &&
                                Thisone !== ProperAnd[1].trim()
                        );
                        missingreq = anothertemp;
                        if (PreReqNormCase.length > 0) {
                            if (PreReqNormCase.every(testingthis)) {
                                const anothertemp = missingreq.filter(
                                    (Thisone: string): boolean =>
                                        !PreReqNormCase.includes(Thisone)
                                );
                                missingreq = anothertemp;
                                checker = true;
                                console.log("true 1");
                            } else {
                                checker = false;
                                console.log("false 1");
                            }
                        }
                    } else {
                        checker = false;
                        console.log("false 2");
                    }
                } else {
                    if (PreReqNormCase.length > 1) {
                        if (PreReqNormCase.every(testingthis)) {
                            const anothertemp = missingreq.filter(
                                (Thisone: string): boolean =>
                                    !PreReqNormCase.includes(Thisone)
                            );
                            missingreq = anothertemp;
                            checker = true;
                            console.log("true 2");
                        } else {
                            checker = false;
                            console.log("false 3");
                        }
                    }
                }
            } else {
                checker = false;
                console.log("false 4");
            }
        } else if (ProperAnd.length > 1) {
            if (
                coursesTaken.includes(ProperAnd[0].trim()) &&
                coursesTaken.includes(ProperAnd[1].trim())
            ) {
                const anothertemp = missingreq.filter(
                    (Thisone: string): boolean =>
                        Thisone !== ProperAnd[0].trim() &&
                        Thisone !== ProperAnd[1].trim()
                );
                missingreq = anothertemp;
                if (PreReqNormCase.length > 0) {
                    if (PreReqNormCase.every(testingthis)) {
                        const anothertemp = missingreq.filter(
                            (Thisone: string): boolean =>
                                !PreReqNormCase.includes(Thisone)
                        );
                        missingreq = anothertemp;
                        checker = true;
                        console.log("true 3");
                        if (ProperOr.length > 1) {
                            if (
                                coursesTaken.includes(ProperOr[0].trim()) ||
                                coursesTaken.includes(ProperOr[1].trim())
                            ) {
                                const anothertemp = missingreq.filter(
                                    (Thisone: string): boolean =>
                                        Thisone !== ProperOr[0].trim() &&
                                        Thisone !== ProperOr[1].trim()
                                );
                                missingreq = anothertemp;
                                checker = true;
                                console.log("true 4");
                            } else {
                                checker = false;
                                console.log("2-false 4");
                            }
                        }
                    } else {
                        checker = false;
                        console.log("false 5");
                    }
                }
            } else {
                checker = false;
                console.log("2-false 4");
            }
        } else {
            if (PreReqNormCase.length > 0) {
                if (PreReqNormCase.every(testingthis)) {
                    const anothertemp = missingreq.filter(
                        (Thisone: string): boolean =>
                            !PreReqNormCase.includes(Thisone)
                    );
                    missingreq = anothertemp;
                    checker = true;
                    console.log("3 - true 4");
                    if (ProperOr.length > 1) {
                        if (
                            coursesTaken.includes(ProperOr[0].trim()) ||
                            coursesTaken.includes(ProperOr[1].trim())
                        ) {
                            const anothertemp = missingreq.filter(
                                (Thisone: string): boolean =>
                                    Thisone !== ProperOr[0].trim() &&
                                    Thisone !== ProperOr[1].trim()
                            );
                            missingreq = anothertemp;
                            if (ProperAnd.length > 1) {
                                if (
                                    coursesTaken.includes(
                                        ProperAnd[0].trim()
                                    ) &&
                                    coursesTaken.includes(ProperAnd[1].trim())
                                ) {
                                    const anothertemp = missingreq.filter(
                                        (Thisone: string): boolean =>
                                            Thisone !== ProperAnd[0].trim() &&
                                            Thisone !== ProperAnd[1].trim()
                                    );
                                    missingreq = anothertemp;
                                    checker = true;
                                    console.log("3 - true 5");
                                } else {
                                    checker = false;
                                    console.log("3 - false 2");
                                }
                            } else {
                                if (PreReqNormCase.length > 1) {
                                    if (PreReqNormCase.every(testingthis)) {
                                        const anothertemp = missingreq.filter(
                                            (Thisone: string): boolean =>
                                                !PreReqNormCase.includes(
                                                    Thisone
                                                )
                                        );
                                        missingreq = anothertemp;
                                        checker = true;
                                        console.log("3 - true 2");
                                    } else {
                                        checker = false;
                                        console.log("3 - false 3");
                                    }
                                }
                            }
                        } else {
                            checker = false;
                            console.log("3- false 4");
                        }
                    }
                } else {
                    checker = false;
                    console.log("false 7");
                }
            }
        }
        if (checker === true) {
            //removing from courses required (department requirements functionality)
            if (coreReq.includes(course.code)) {
                const temp = coreReq.filter(
                    (Thisone: string): boolean => Thisone !== course.code
                );
                coreReq = temp;
            }
            console.log(coreReq);

            newSemester.courses = [course, ...newSemester.courses];
            newSemester.credits = newSemester.credits + +convert[0];
            setS([...semesters, newSemester]);
            coursesTaken = [course.code, ...coursesTaken];
            //console.log("COURSES TAKEN", coursesTaken);
            creditsRequired = creditsRequired - +convert[0];
            const BreadthsCheck = course.breadth.split(";");
            if (
                BreadthsCheck.includes(
                    "University: Creative Arts and Humanities"
                )
            ) {
                const temp = breadthReq.filter(
                    (Thisone: string): boolean =>
                        Thisone !== "Creative Arts and Humanities,"
                );
                breadthReq = temp;
                breadthArtCount = breadthArtCount + 1;
            }
            if (
                BreadthsCheck.includes(
                    "University: Social and Behavioral Sciences"
                )
            ) {
                const temp = breadthReq.filter(
                    (Thisone: string): boolean =>
                        Thisone !== "Social and Behavioral Sciences,"
                );
                breadthReq = temp;
                breadthSocialCount = breadthSocialCount + 1;
            }
            if (
                BreadthsCheck.includes(
                    "University: Mathematics, Natural Sciences and Technology"
                )
            ) {
                const temp = breadthReq.filter(
                    (Thisone: string): boolean =>
                        Thisone !== "Math, Natural Sci and Tech"
                );
                breadthReq = temp;
                breadthMathCount = breadthMathCount + 1;
            }
            if (
                BreadthsCheck.includes(
                    "University: History and Cultural Change"
                )
            ) {
                const temp = breadthReq.filter(
                    (Thisone: string): boolean =>
                        Thisone !== "History and Cultural Change,"
                );
                breadthReq = temp;
                breadthHisCount = breadthHisCount + 1;
            }
        } else {
            //say add the prereq first
            /*const temp = PreReqs.filter(
                    (Thisone: string): boolean =>
                        coursesTaken.includes(Thisone) !== true
                );*/
            console.log("missing prerequisite", missingreq);
            alert("Missing prerequisits from the following list:" + missingreq);
        }
    }

    function Removing(newSemester: Semester) {
        if (core.includes(course.code)) {
            coreReq = [course.code, ...coreReq];
        }
        console.log(coreReq);
        console.log(newSemester.courses);
        const initial = newSemester.courses.length;
        const temp = newSemester.courses.filter(
            (Thisone: course): boolean => Thisone.code !== course.code
        );
        newSemester.courses = temp;
        console.log(newSemester.courses);
        const final = newSemester.courses.length;
        const convert = course.credits.trim();
        const dif = initial - final;
        const newCred = +convert[0] * dif;
        newSemester.credits = newSemester.credits - newCred;
        setS([...semesters, newSemester]);

        const temp2 = coursesTaken.filter(
            (Thisone: string): boolean => Thisone !== course.code
        );
        coursesTaken = temp2;

        const BreadthsCheck = course.breadth.split(";");
        if (
            BreadthsCheck.includes("University: Creative Arts and Humanities")
        ) {
            if (breadthArtCount > 0) {
                breadthArtCount = breadthArtCount - 1;
            }
            if (breadthArtCount == 0) {
                if (!breadthReq.includes("Creative Arts and Humanities,")) {
                    breadthReq = [
                        "Creative Arts and Humanities,",
                        ...breadthReq
                    ];
                }
            }
        }
        if (
            BreadthsCheck.includes("University: Social and Behavioral Sciences")
        ) {
            if (breadthSocialCount > 0) {
                breadthSocialCount = breadthSocialCount - 1;
            }
            if (breadthSocialCount == 0) {
                if (!breadthReq.includes("Social and Behavioral Sciences,")) {
                    breadthReq = [
                        "Social and Behavioral Sciences,",
                        ...breadthReq
                    ];
                }
            }
        }
        if (
            BreadthsCheck.includes(
                "University: Mathematics, Natural Sciences and Technology"
            )
        ) {
            if (breadthMathCount > 0) {
                breadthMathCount = breadthMathCount - 1;
            }
            if (breadthMathCount == 0) {
                if (!breadthReq.includes("Math, Natural Sci and Tech")) {
                    breadthReq = ["Math, Natural Sci and Tech", ...breadthReq];
                }
            }
        }
        if (BreadthsCheck.includes("University: History and Cultural Change")) {
            if (breadthHisCount > 0) {
                breadthHisCount = breadthHisCount - 1;
            }
            if (breadthHisCount == 0) {
                if (!breadthReq.includes("History and Cultural Change,")) {
                    breadthReq = [
                        "History and Cultural Change,",
                        ...breadthReq
                    ];
                }
            }
        }
    }

    function Clearing(newSemester: Semester) {
        newSemester.courses = [];
        newSemester.credits = 0;
        coursesTaken = [""];
        coreReq = core;
        breadthReq = BREADTH;
        breadthArtCount = 0;
        breadthHisCount = 0;
        breadthSocialCount = 0;
        breadthMathCount = 0;
        setS([...semesters, newSemester]);
    }

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
    function updateCourseCredits(event: React.ChangeEvent<HTMLInputElement>) {
        setCourse({ ...course, credits: event.target.value });
    }
    function updateCourseReq(event: React.ChangeEvent<HTMLInputElement>) {
        setCourse({ ...course, preReq: event.target.value });
    }
    function updateCourseRestrict(event: React.ChangeEvent<HTMLInputElement>) {
        setCourse({ ...course, restrict: event.target.value });
    }
    function updateCourseBreadth(event: React.ChangeEvent<HTMLInputElement>) {
        setCourse({ ...course, breadth: event.target.value });
    }
    function updateCourseOffered(event: React.ChangeEvent<HTMLInputElement>) {
        setCourse({ ...course, typ: event.target.value });
    }
    function setDefault() {
        setCourse({
            ...course,
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
    }

    function confirmChoice() {
        setDefault();
        setVisible(!visible);
        setVisible2(!visible2);
    }
    return (
        <>
            <div>
                {visible2 && (
                    <Buttons
                        onClick={() => confirmChoice()}
                        border={""}
                        color={"#03A9F4"}
                        height={"50px"}
                        radius={"10%"}
                        width={"130px"}
                    >
                        Confirm Course
                    </Buttons>
                )}
            </div>
            <div>
                <div>
                    <b>
                        {visible && (
                            <Form.Check
                                type="switch"
                                id="check-edit"
                                label="Edit Course?"
                                checked={editState}
                                onChange={updateEditState}
                            />
                        )}
                    </b>
                    <br></br>
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
                            <Form.Label>Change Description:</Form.Label>
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
                            <Buttons
                                onClick={() => setDefault()}
                                border={""}
                                color={"#03A9F4"}
                                height={"50px"}
                                radius={"10%"}
                                width={"130px"}
                            >
                                Set to Default
                            </Buttons>
                        </Form.Group>
                    )}
                </div>
                <p></p>
                {visible && (
                    <Buttons
                        onClick={() => Adding(s[y])}
                        border={""}
                        color={"#03A9F4"}
                        height={"50px"}
                        radius={"10%"}
                        width={"130px"}
                    >
                        Add {course.code}
                    </Buttons>
                )}
                ‏‏‎ ‎
                {visible && (
                    <Buttons
                        onClick={() => Removing(s[y])}
                        border={""}
                        color={"#03A9F4"}
                        height={"50px"}
                        radius={"10%"}
                        width={"130px"}
                    >
                        Remove {course.code}
                    </Buttons>
                )}
                ‏‏‎ ‎
                {visible && (
                    <Buttons
                        onClick={() => Clearing(s[y])}
                        border={""}
                        color={"#03A9F4"}
                        height={"50px"}
                        radius={"10%"}
                        width={"130px"}
                    >
                        Clear Courses
                    </Buttons>
                )}
                ‏‏‎ ‎
                {visible && (
                    <Buttons
                        onClick={() => confirmChoice()}
                        border={""}
                        color={"#03A9F4"}
                        height={"50px"}
                        radius={"10%"}
                        width={"130px"}
                    >
                        Select Course
                    </Buttons>
                )}
            </div>
        </>
    );
}
