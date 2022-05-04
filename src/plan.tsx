import React from "react";
import { useState } from "react";
//import { Button } from "react-bootstrap";
import { Plan } from "./planInterface";
import { Button, Form } from "react-bootstrap";
import plan from "../src/plans_data.json";
import { Semester } from "./semesterlnterface";
import semester from "../src/semesters_data.json";
import Modal from "react-bootstrap/Modal";
import { catalogBreadth, catalogCredit, catalogRestrict } from "./catalog";
import { catalogName } from "./catalog";
import { catalogPreReq } from "./catalog";
import { catalogTyp } from "./catalog";
import { catalogDescr } from "./catalog";
import { course } from "./course";
import { findRenderedComponentWithType } from "react-dom/test-utils";
import "./plan.css";

interface coursesProps {
    courses: course[];
}

const CourseItem: React.FC<course> = ({
    code,
    name,
    descr,
    credits
}: course) => {
    return (
        <tr>
            <td>
                <h5>{code}</h5>
            </td>
            <td>
                <h5>{name}</h5>
            </td>
            <td>
                <p style={{ fontSize: 10 }}>{descr}</p>
            </td>
            <td>
                <h5>{credits}</h5>
            </td>
        </tr>
    );
};

const CourseOverview: React.FC<coursesProps> = ({ courses }: coursesProps) => {
    return (
        <div className="Course-View">
            <table>
                <tbody>
                    <tr className="Table-Header">
                        <td>
                            <h4>Course ID</h4>
                        </td>
                        <td>
                            <h4>Course Name</h4>
                        </td>
                        <td>
                            <h4>Description</h4>
                        </td>
                        <td>
                            <h4>Credits</h4>
                        </td>
                    </tr>
                    {courses.map((item) => {
                        return (
                            <CourseItem
                                key="0"
                                code={item.code}
                                name={item.name}
                                descr={item.descr}
                                credits={item.credits}
                                preReq={item.preReq}
                                restrict={item.restrict}
                                typ={item.typ}
                                breadth={item.breadth}
                            ></CourseItem>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

let plans = plan.map((cPlan: Plan) => ({ ...cPlan }));
let pId = 0;
export { plans };
export { pId };

let semesters = semester.map((cSemester: Semester) => ({ ...cSemester }));

export function PlanF({
    options,
    options2,
    options3
}: {
    options: string[];
    options2: string[][];
    options3: string[];
}): JSX.Element {
    const [userSelection4, setUserSelection4] = useState<string>(options[0]);

    const [userSelection5, setUserSelection5] = useState<string>(options3[0]);
    const [formSelection, setFormSelection] = useState<string[]>(options2[0]);

    const [visible, setVisible] = useState<boolean>(true);

    const setAnswer4 = (Event: ChangeEvent) => {
        setUserSelection4(Event.target.value);
    };

    const setAnswer5 = (Event: ChangeEvent) => {
        setUserSelection5(Event.target.value);
    };

    const setForm = (Event: ChangeEvent) => {
        setFormSelection(options2[options.indexOf(userSelection4)]);
    };

    const [p, setP] = useState<Plan[]>(plans);
    const [x, setX] = useState<number>(0);
    const pl: Plan = {
        name: "Default Plan",
        id: plans.length,
        semesters: [],
        complete: false
    };

    const [userSelection, setUserSelection] = useState<number>(plans[0].id);
    const setAnswer = (Event: ChangeEvent) => {
        const v = parseInt(Event.target.value);
        setUserSelection(v);
        setX(v);
        console.log("x on set: ", x);
        pId = v;
    };
    React.useEffect(() => {
        console.log("plan changed");
        setY(plans[pId].semesters.length);
    }, [p, x]);

    const [s, setS] = useState<Semester[]>(semesters);
    const [y, setY] = useState<number>(0);
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
    const [editState, setEditState] = useState<boolean>(false);
    const [editState2, setEditState2] = useState<boolean>(false);

    {
        options3 = options2[options.indexOf(userSelection4)];
    }

    interface Props {
        border: string;
        color: string;
        children?: React.ReactNode;
        height: string;
        onClick: () => void;
        radius: string;
        width: string;
    }
    const Buttons: React.FC<Props> = ({
        border,
        color,
        children,
        height,
        onClick,
        radius,
        width
    }) => {
        return (
            <button
                onClick={onClick}
                style={{
                    backgroundColor: color,
                    border,
                    borderRadius: radius,
                    height,
                    width
                }}
            >
                {children}
            </button>
        );
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /*
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>Name: Starting Semester: </Modal.Body>
        <Modal.Footer>
            <Buttons
                onClick={handleClose}
                border={""}
                color={""}
                height={""}
                radius={""}
                width={""}
            >
                Close
            </Buttons>
            <Buttons
                onClick={handleClose}
                border={""}
                color={""}
                height={""}
                radius={""}
                width={""}
            >
                Save Changes
            </Buttons>
        </Modal.Footer>
    </Modal>;

    /////

        <>
        <Buttons
            onClick={handleShow}
            border={""}
            color={""}
            height={""}
            radius={""}
            width={""}
        >
            Add Plan
        </Buttons>
    </>
    */

    return (
        <div>
            <h3>Plans</h3>
            <Buttons
                onClick={() => addPlan(pl)}
                border={""}
                color={"#03A9F4"}
                height={"50px"}
                radius={"10%"}
                width={"100px"}
            >
                Add Plan
            </Buttons>
            ‏‏‎ ‎
            <Buttons
                onClick={() => clearPlans(pl)}
                border={""}
                color={"#03A9F4"}
                height={"50px"}
                radius={"10%"}
                width={"100px"}
            >
                Clear Plans
            </Buttons>
            ‏‏‎ ‎
            <Buttons
                onClick={() => deletePlan(pl)}
                border={""}
                color={"#03A9F4"}
                height={"50px"}
                radius={"10%"}
                width={"100px"}
            >
                Delete Plan
            </Buttons>
            <Form.Group controlId="choiceDropdown">
                <Form.Label>
                    <b>Select Plan:</b>
                </Form.Label>
                <Form.Select
                    name="selectList"
                    id="selectList"
                    value={userSelection}
                    onChange={setAnswer}
                >
                    {plans.map((plan: Plan) => (
                        <option key={plan.id} value={plan.id}>
                            {" "}
                            Plan {plan.id}{" "}
                        </option>
                    ))}
                </Form.Select>
                {
                    <div>
                        <p>Plan: {p[x].id}</p>
                    </div>
                }
            </Form.Group>
            <b>
                <Form.Check
                    type="switch"
                    id="check-edit"
                    label="Edit Plan"
                    checked={editState}
                    onChange={updateEditState}
                />
            </b>
            {editState && (
                <>
                    <>
                        <>
                            <div>
                                <hr></hr>
                                <h3> Semesters </h3>
                                <Buttons
                                    onClick={() => addSemester(st)}
                                    border={""}
                                    color={"#03A9F4"}
                                    height={"50px"}
                                    radius={"10%"}
                                    width={"100px"}
                                >
                                    Add Semester
                                </Buttons>
                                ‏‏‎ ‎
                                <Buttons
                                    onClick={() => clearSemesters(st)}
                                    border={""}
                                    color={"#03A9F4"}
                                    height={"50px"}
                                    radius={"10%"}
                                    width={"100px"}
                                >
                                    Clear Semesters
                                </Buttons>
                                ‏‏‎ ‎
                                <Buttons
                                    onClick={() => deleteSemester(st)}
                                    border={""}
                                    color={"#03A9F4"}
                                    height={"50px"}
                                    radius={"10%"}
                                    width={"100px"}
                                >
                                    Delete Semester
                                </Buttons>
                                <div>
                                    <p>Semester: {s[y].id}</p>{" "}
                                    <p>Courses: {s[y].courses.length}</p>{" "}
                                    <p>Credits: {s[y].credits} </p>
                                </div>
                                <b>Select Semester:</b>
                                <Form.Select
                                    name="selectList"
                                    id="selectList"
                                    value={userSelection2}
                                    onChange={setAnswerS}
                                >
                                    {plans[pId].semesters.map(
                                        (semester: Semester) => (
                                            <option
                                                key={semester.id}
                                                value={semester.id}
                                            >
                                                {" "}
                                                Semester {semester.id}{" "}
                                            </option>
                                        )
                                    )}
                                </Form.Select>
                                <b>
                                    <Form.Check
                                        type="switch"
                                        id="check-edit"
                                        label="Edit Semester"
                                        checked={editState2}
                                        onChange={updateEditState2}
                                    />
                                </b>
                            </div>
                            <div>
                                {editState2 && (
                                    <>
                                        <div className="App">
                                            <h3>Semester {s[y].id}</h3>
                                            <CourseOverview
                                                courses={semesters[y].courses}
                                            />
                                        </div>
                                        <h3>Courses</h3>
                                        <Form.Group controlId="choiceDropdown">
                                            <Form.Label>
                                                Choose a Department
                                            </Form.Label>
                                            <Form.Select
                                                value={userSelection4}
                                                onChange={setAnswer4}
                                            >
                                                {options.map(
                                                    (choice: string) => (
                                                        <option
                                                            key={choice}
                                                            value={choice}
                                                        >
                                                            {choice}
                                                        </option>
                                                    )
                                                )}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group controlId="choiceDropdown3">
                                            <Form.Label>
                                                Choose a Course
                                            </Form.Label>
                                            <Form.Select
                                                value={userSelection5}
                                                onChange={setAnswer5}
                                            >
                                                {options3.map(
                                                    (choice3: string) => (
                                                        <option
                                                            key={choice3}
                                                            value={choice3}
                                                        >
                                                            {choice3}
                                                        </option>
                                                    )
                                                )}
                                            </Form.Select>
                                        </Form.Group>
                                        <hr></hr>
                                        <EditCourse></EditCourse>
                                    </>
                                )}
                            </div>
                        </>
                    </>
                </>
            )}
        </div>
    );

    function addPlan(newPlan: Plan) {
        console.log("add plan initiated");
        setP([...plans, newPlan]);
        console.log("plan set");
        plans.push(newPlan);
        console.log("plan pushed");
        setX(x + 1);
        console.log("x set");
        setUserSelection(plans.length - 1);
        console.log("user selection set");
        pId = x + 1;
        console.log("test");
    }

    function clearPlans(newPlan: Plan) {
        console.log(newPlan.id);
        const pl: Plan = {
            name: "Default Plan",
            id: 0,
            semesters: [],
            complete: false
        };
        if (plans.length > 1) {
            setX(0);
            plans = [];
            plans.push(pl);
            /*
            const sl: Semester = {
                id: 0,
                courses: [],
                credits: 0
            };
            */
            pId = 0;
        }
    }

    function deletePlan(newPlan: Plan) {
        //plans[x].complete = false;
        //plans[x].id = 0;
        //plans[x].semesters = [];
        newPlan.semesters = [];
        if (plans.length > 1) {
            plans.splice(x, 1);
            setX(x - 1);
            pId = x - 1;
        }
    }

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

    function deleteSemester(newSemester: Semester) {
        newSemester.courses = [];
        if (plans[pId].semesters.length > 1) {
            plans[pId].semesters.splice(y, 1);
            s.splice(y, 1);
            setY(y - 1);
        }
    }

    function updateEditState(event: React.ChangeEvent<HTMLInputElement>) {
        setEditState(event.target.checked);
    }
    function updateEditState2(event: React.ChangeEvent<HTMLInputElement>) {
        setEditState2(event.target.checked);
    }
    /*
    React.useEffect(() => {
        console.log("plan changed");
        clearSemesters;
        setY(0);
    }, [PlanF]);

    React.useEffect(() => {
        console.log("plan changed");
        clearSemesters;
        setY(0);
    }, [s, y]);

    React.useEffect(() => {
        console.log("plan changed");
        setY(plans[pId].semesters.length);
    }, [s, y]);
    */

    /*
   
    React.useEffect(() => {
        console.log("plan changed");
        clearSemesters;
        setY(0);
    }, [s, y]);

    React.useEffect(() => {
        console.log("plan changed");
        setY(plans[pId].semesters.length);
    }, [s, y]);
    */

    function EditCourse(): JSX.Element {
        const [course, setCourse] = useState({
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
        const [editState, setEditState] = useState<boolean>(false);
        function Adding(): JSX.Element {
            s[y].courses = [course, ...s[y].courses];
            const convert = course.credits.trim();
            s[y].credits = s[y].credits + +convert[0];
            /* React.useEffect(() => {
                console.log("semester changed");
                setS(s);
                setY(y);
            }, [s]);*/
            return <div></div>;
        }
        function Removing(): JSX.Element {
            console.log(s[y].courses);
            const temp = s[y].courses.filter(
                (Thisone: course): boolean => Thisone !== course
            );
            s[y].courses = temp;
            console.log(s[y].courses);
            const convert = course.credits;
            //credits.trim?

            s[y].credits = s[y].credits - +convert[0];

            /* React.useEffect(() => {
                console.log("semester changed");
                setS(s);
                setY(y);
            }, [s]);*/
            return <div></div>;
        }
        function Clearing(): JSX.Element {
            s[y].courses = [];
            s[y].credits = 0;

            /* React.useEffect(() => {
                console.log("semester changed");
                setS(s);
                setY(y);
            }, [s]);*/
            return <div></div>;
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
                            <Button onClick={() => setDefault()}>
                                Set to Default
                            </Button>
                        </Form.Group>
                    )}
                </div>
                <Buttons
                    onClick={() => Adding()}
                    border={""}
                    color={"#03A9F4"}
                    height={"50px"}
                    radius={"10%"}
                    width={"130px"}
                >
                    Add {course.code}
                </Buttons>
                ‏‏‎ ‎
                <Buttons
                    onClick={() => Removing()}
                    border={""}
                    color={"#03A9F4"}
                    height={"50px"}
                    radius={"10%"}
                    width={"130px"}
                >
                    Remove {course.code}
                </Buttons>
                ‏‏‎ ‎
                <Buttons
                    onClick={() => Clearing()}
                    border={""}
                    color={"#03A9F4"}
                    height={"50px"}
                    radius={"10%"}
                    width={"130px"}
                >
                    Clear Courses
                </Buttons>
            </div>
        );
    }
}

{
    //semesters[y].courses[0].name;
}
