import React from "react";
import { useState } from "react";
//import { Button } from "react-bootstrap";
import { Plan } from "./planInterface";
import { Form } from "react-bootstrap";
import plan from "../src/plans_data.json";
import { Semester } from "./semesterlnterface";
import semester from "../src/semesters_data.json";
import Modal from "react-bootstrap/Modal";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

let plans = plan.map((cPlan: Plan) => ({ ...cPlan }));
let pId = 0;
export { plans };
export { pId };

let semesters = semester.map((cSemester: Semester) => ({ ...cSemester }));

export function PlanF(): JSX.Element {
    const [p, setP] = useState<Plan[]>(plans);
    const [x, setX] = useState<number>(0);

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

    React.useEffect(() => {
        console.log("plan changed");
        setY(plans[pId].semesters.length);
    }, [p, x]);

    const [s, setS] = useState<Semester[]>(semesters);
    const [y, setY] = useState<number>(0);

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

    function deleteSemester(newSemester: Semester) {
        newSemester.courses = [];
        if (plans[pId].semesters.length > 1) {
            plans[pId].semesters.splice(y, 1);
            s.splice(y, 1);
            setY(y - 1);
        }
    }

    const [editState, setEditState] = useState<boolean>(false);

    function updateEditState(event: React.ChangeEvent<HTMLInputElement>) {
        setEditState(event.target.checked);
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

    interface Props {
        border: string;
        color: string;
        children?: React.ReactNode;
        height: string;
        onClick: () => void;
        radius: string;
        width: string;
    }

    const Button: React.FC<Props> = ({
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
            <h3>Plans</h3>
            <>
                <Button
                    onClick={handleShow}
                    border={""}
                    color={""}
                    height={""}
                    radius={""}
                    width={""}
                >
                    Add Plan
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Plan</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Name: Starting Semester: </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={handleClose}
                            border={""}
                            color={""}
                            height={""}
                            radius={""}
                            width={""}
                        >
                            Close
                        </Button>
                        <Button
                            onClick={handleClose}
                            border={""}
                            color={""}
                            height={""}
                            radius={""}
                            width={""}
                        >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            <Button
                onClick={() => addPlan(pl)}
                border={""}
                color={"#03A9F4"}
                height={"50px"}
                radius={"10%"}
                width={"100px"}
            >
                Add Plan
            </Button>
            ‏‏‎ ‎
            <Button
                onClick={() => clearPlans(pl)}
                border={""}
                color={"#03A9F4"}
                height={"50px"}
                radius={"10%"}
                width={"100px"}
            >
                Clear Plans
            </Button>
            ‏‏‎ ‎
            <Button
                onClick={() => deletePlan(pl)}
                border={""}
                color={"#03A9F4"}
                height={"50px"}
                radius={"10%"}
                width={"100px"}
            >
                Delete Plan
            </Button>
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
                        <p>Selected Plan: {p[x].id}</p>
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
                <div>
                    <hr></hr>
                    <h3> Semesters </h3>
                    <Button
                        onClick={() => addSemester(st)}
                        border={""}
                        color={"#03A9F4"}
                        height={"50px"}
                        radius={"10%"}
                        width={"100px"}
                    >
                        Add Semester
                    </Button>
                    ‏‏‎ ‎
                    <Button
                        onClick={() => clearSemesters(st)}
                        border={""}
                        color={"#03A9F4"}
                        height={"50px"}
                        radius={"10%"}
                        width={"100px"}
                    >
                        Clear Semesters
                    </Button>
                    ‏‏‎ ‎
                    <Button
                        onClick={() => deleteSemester(st)}
                        border={""}
                        color={"#03A9F4"}
                        height={"50px"}
                        radius={"10%"}
                        width={"100px"}
                    >
                        Delete Semester
                    </Button>
                    <div>
                        <p>Semester: {s[y].id}</p>{" "}
                    </div>
                    <b>Select Semester:</b>
                    <Form.Select
                        name="selectList"
                        id="selectList"
                        value={userSelection2}
                        onChange={setAnswerS}
                    >
                        {plans[pId].semesters.map((semester: Semester) => (
                            <option key={semester.id} value={semester.id}>
                                {" "}
                                Semester {semester.id}{" "}
                            </option>
                        ))}
                    </Form.Select>
                </div>
            )}
        </div>
    );
}
