import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Plan } from "./planInterface";
import { Form } from "react-bootstrap";
import plan from "../src/plans_data.json";
//import { Semester } from "./semesterlnterface";
//import semester from "../src/semesters_data.json";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

let plans = plan.map((cPlan: Plan) => ({ ...cPlan }));
let pId = 0;
export { plans };
export { pId };

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
        setX(0);
        plans = [];
        plans.push(pl);
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
        }
    }

    React.useEffect(() => {
        console.log("plan changed");
    }, [p, x]);

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
        </div>
    );
}
