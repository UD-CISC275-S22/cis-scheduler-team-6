import React from "react";
import { useState } from "react";
import { Plan } from "./planInterface";
import { Form } from "react-bootstrap";
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
//import { findRenderedComponentWithType } from "react-dom/test-utils";
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
                <p style={{ fontSize: 15 }}>{descr}</p>
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
    //const [formSelection, setFormSelection] = useState<string[]>(options2[0]);
    //const [visible, setVisible] = useState<boolean>(true);
    /*
    const setForm = (Event: ChangeEvent) => {
        setFormSelection(options2[options.indexOf(userSelection4)]);
    };
    */

    const setAnswer4 = (Event: ChangeEvent) => {
        setUserSelection4(Event.target.value);
    };

    const setAnswer5 = (Event: ChangeEvent) => {
        setUserSelection5(Event.target.value);
    };

    const [p, setP] = useState<Plan[]>(plans);
    const [x, setX] = useState<number>(0);
    const pl: Plan = {
        name: "Default Plan",
        id: plans.length,
        semesters: [],
        complete: false
    };

    const [s, setS] = useState<Semester[]>(semesters);
    const [y, setY] = useState<number>(0);
    const st: Semester = {
        id: semesters.length,
        courses: [],
        credits: 0
    };

    function charts() {
        for (const semester in p[x].semesters) {
            return (
                <div>
                    {" "}
                    <CourseOverview
                        courses={p[x].semesters[semester].courses}
                    />{" "}
                </div>
            );
            /*
            if (p[x].semesters[i].courses.length > 0) {
                return (
                    <div>
                        test <CourseOverview courses={semesters[y].courses} />{" "}
                    </div>
                );
            }
            */
        }
    }

    const [userSelection, setUserSelection] = useState<number>(plans[0].id);
    const setAnswer = (Event: ChangeEvent) => {
        const v = parseInt(Event.target.value);
        setUserSelection(v);
        setX(v);
        console.log("x on set: ", x);
        pId = v;
    };

    const [userSelection2, setUserSelection2] = useState<number>(
        semesters[0].id
    );
    const setAnswerS = (Event: ChangeEvent) => {
        const v = parseInt(Event.target.value);
        setUserSelection2(v);
        setY(v);
        //setY(plans[pId].semesters[v - 1].id);
    };

    React.useEffect(() => {
        console.log("plan changed");
        setY(plans[pId].semesters.length);
    }, [p, x]);

    /*
    const [editState, setEditState] = useState<boolean>(false);
    const [editState2, setEditState2] = useState<boolean>(false);
    */

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

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Major Requirements</Modal.Title>
                </Modal.Header>
                <Modal.Body>{p[x].semesters}</Modal.Body>
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
                </Modal.Footer>
            </Modal>
            <>
                <Buttons
                    onClick={handleShow}
                    border={""}
                    color={""}
                    height={""}
                    radius={""}
                    width={""}
                >
                    View Requirements
                </Buttons>
            </>
            {}
            {charts()}
            {
                <div>
                    <h3>Plan: {p[x].id}</h3>
                </div>
            }
            <div className="App">
                <h3>Semester {s[y].id}</h3>
                Courses: {s[y].courses.length}
                ‏‏‎ Credits: {s[y].credits}
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
                </Form.Group>
                <b>Select Semester:</b>
                <Form.Select
                    name="selectList"
                    id="selectList"
                    value={userSelection2}
                    onChange={setAnswerS}
                >
                    {plans[x].semesters.map((semester: Semester) => (
                        <option key={semester.id} value={semester.id}>
                            {" "}
                            Semester {semester.id}{" "}
                        </option>
                    ))}
                </Form.Select>
            </div>
            <CourseOverview courses={semesters[y].courses} />
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
            <p></p>
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
            <>
                <h3></h3>
                <Form.Group controlId="choiceDropdown">
                    <Form.Label>
                        <b>Choose a Department</b>
                    </Form.Label>
                    <Form.Select value={userSelection4} onChange={setAnswer4}>
                        {options.map((choice: string) => (
                            <option key={choice} value={choice}>
                                {choice}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="choiceDropdown3">
                    <Form.Label>
                        <b>Choose a Course</b>
                    </Form.Label>
                    <Form.Select value={userSelection5} onChange={setAnswer5}>
                        {options3.map((choice3: string) => (
                            <option key={choice3} value={choice3}>
                                {choice3}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <hr></hr>
                <EditCourse></EditCourse>
            </>
        </div>
    );

    /*
    <b>
        <Form.Check
            type="switch"
            id="check-edit"
            label="Edit Plan"
            checked={editState}
            onChange={updateEditState}
        />
    </b>;
    */

    function addPlan(newPlan: Plan) {
        setP([...plans, newPlan]);
        plans.push(newPlan);
        setX(x + 1);
        setUserSelection(plans.length - 1);
        pId = x + 1;
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
            pId = 0;
        }
    }

    function deletePlan(newPlan: Plan) {
        newPlan.semesters = [];
        if (plans.length > 1) {
            plans.splice(x, 1);
            setX(x - 1);
            pId = x - 1;
        }
    }

    function addSemester(newSemester: Semester) {
        setS([...semesters, newSemester]);
        console.log("");
        if (x > 0) {
            semesters.push(newSemester);
            setY(y + 1);
            plans[x].semesters.push(newSemester);
            setS(s);
            setUserSelection2(semesters.length - 1);
            //sId = y + 1;
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
        if (plans[x].semesters.length > 1) {
            console.log("old sem length: " + plans[x].semesters.length);
            plans[x].semesters.splice(y, 1);
            console.log("new sem length: " + plans[x].semesters.length);
            s.splice(y, 1);
            console.log("old y value: " + y);
            setY(y - 1);
            console.log("new y value: " + y);
        }
    }

    /*
    function updateEditState(event: React.ChangeEvent<HTMLInputElement>) {
        setEditState(event.target.checked);
    }
    function updateEditState2(event: React.ChangeEvent<HTMLInputElement>) {
        setEditState2(event.target.checked);
    }
    */

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
        function Adding(newSemester: Semester) {
            newSemester.courses = [course, ...newSemester.courses];
            const convert = course.credits.trim();
            newSemester.credits = newSemester.credits + +convert[0];
            setS([...semesters, newSemester]);
            /* React.useEffect(() => {
                console.log("semester changed");
                setS(s);
                setY(y);
            }, [s]);
            */
        }
        function Removing(newSemester: Semester) {
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
        }
        function Clearing(newSemester: Semester) {
            newSemester.courses = [];
            newSemester.credits = 0;
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
                    <b>
                        <Form.Check
                            type="switch"
                            id="check-edit"
                            label="Edit?"
                            checked={editState}
                            onChange={updateEditState}
                        />
                    </b>
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
                ‏‏‎ ‎
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
                ‏‏‎ ‎
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
            </div>
        );
    }
}

{
    //semesters[y].courses[0].name;
}
