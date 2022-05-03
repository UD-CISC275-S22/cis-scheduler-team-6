import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Plan } from "./planInterface";
import { Form } from "react-bootstrap";
import plan from "../src/plans_data.json";
import { Semester } from "./semesterlnterface";
import semester from "../src/semesters_data.json";

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
            id: 0,
            semesters: [],
            complete: false
        };
        if (plans.length > 1) {
            setX(0);
            plans = [];
            plans.push(pl);
            const sl: Semester = {
                id: 0,
                courses: [],
                credits: 0
            };
            pId = 0;
        }
    }

    const pl: Plan = {
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

    return (
        <div>
            <h3>Add a Plan</h3>
            <Button onClick={() => addPlan(pl)}>Add Plan</Button>
            <Button onClick={() => clearPlans(pl)}>Clear Plans</Button>
            <Button onClick={() => deletePlan(pl)}>Delete Plan</Button>
            {
                <div>
                    <p>Plan ID: {p[x].id}</p>
                    <p>Semesters: {p[x].semesters.length}</p>
                    <p>Complete? {}</p>
                </div>
            }
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
            <Form.Check
                type="switch"
                id="check-edit"
                label="Edit Plan"
                checked={editState}
                onChange={updateEditState}
            />
            {editState && (
                <div>
                    <h3> Add a Semester </h3>
                    <Button onClick={() => addSemester(st)}>
                        Add Semester
                    </Button>
                    <Button onClick={() => clearSemesters(st)}>
                        Clear Semesters
                    </Button>
                    <Button onClick={() => deleteSemester(st)}>
                        Delete Semester
                    </Button>
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
