import React from "react";
import { useState } from "react";
import { Plan } from "./planInterface";
import { Form } from "react-bootstrap";
import plan from "../src/plans_data.json";
import { Semester } from "./semesterlnterface";
import semester from "../src/semesters_data.json";
import Modal from "react-bootstrap/Modal";
import { course } from "./course";
import { Props } from "./InterfaceProps";
import "./plan.css";
import { CoursesSelect } from "./courseDropdown";

//code for semester table
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

//code for plan and semester arrays
let plans = plan.map((cPlan: Plan) => ({ ...cPlan }));
let pId = 0;
export { plans };
export { pId };

let semesters = semester.map((cSemester: Semester) => ({ ...cSemester }));

/*
const tech = 6;
const lab = 2;
const breadths = 5;
const breadthReqs = [
    "Creative Arts and Humanities",
    "History and Cultural Change",
    "Social and Behaviorial Sciences",
    "Math Natural Science and Technology"
];
const coreSci = 0; //LabSci #1, #2*/

export function PlanF({
    options,
    options2,
    options3
}: {
    options: string[];
    options2: string[][];
    options3: string[];
}): JSX.Element {
    //code for current plan and semester states
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

    /*
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
            
            if (p[x].semesters[i].courses.length > 0) {
                return (
                    <div>
                        test <CourseOverview courses={semesters[y].courses} />{" "}
                    </div>
                );
            }
            
        }
    }
    */

    //code for plan and semester selecting/switching
    const [userSelection, setUserSelection] = useState<number>(plans[0].id);
    const setAnswer = (Event: ChangeEvent) => {
        const v = parseInt(Event.target.value);
        setUserSelection(v);
        setX(v);
        pId = v;
    };

    const [userSelection2, setUserSelection2] = useState<number>(
        semesters[0].id
    );
    const setAnswerS = (Event: ChangeEvent) => {
        const v = parseInt(Event.target.value);
        setUserSelection2(v);
        setY(v);
    };

    React.useEffect(() => {
        setY(plans[pId].semesters.length);
    }, [p, x]);

    //button styling/formatting
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

    //code for modal buttons
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    <>
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
        </Modal>
    </>;

    <>
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
    </>;

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
    </>;

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
    </>;

    const creditsRequired = 124 - s[y].credits;

    //code for user interface
    return (
        <div>
            {
                <div>
                    <h3>Plan: {p[x].id}</h3>
                </div>
            }
            <div className="App">
                <h3>Semester {s[y].id}</h3>
                <p>Courses Taken: {s[y].courses.length}</p>
                <p>Minimum Credits Remaining: {creditsRequired} </p>
                <p> Credits Taken: {s[y].credits}</p>
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
                <CoursesSelect
                    options={options}
                    options2={options2}
                    options3={options3}
                    creditsRequired={creditsRequired}
                    semesters={semesters}
                    Buttons={Buttons}
                    setS={setS}
                    s={s}
                    y={y}
                ></CoursesSelect>
                <hr></hr>
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

    //code for plan functions
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

    //code for semester functions
    function addSemester(newSemester: Semester) {
        setS([...semesters, newSemester]);
        console.log("");
        if (x > 0) {
            semesters.push(newSemester);
            setY(y + 1);
            plans[x].semesters.push(newSemester);
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
}
