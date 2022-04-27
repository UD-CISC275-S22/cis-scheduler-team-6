import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Plan } from "./planInterface";
import { Form } from "react-bootstrap";
import plan from "../src/plans_data.json";
//import { SemesterF } from "./semester";

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
        setP([...plans, newPlan]);
        plans.push(newPlan);
        setX(x + 1);
        setUserSelection(plans.length - 1);
        pId = x + 1;
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

    /*
    let comp = "No";
    if (p[x].complete == true) {
        comp = "Yes";
    }
    */

    const [userSelection, setUserSelection] = useState<number>(plans[0].id);
    const setAnswer = (Event: ChangeEvent) => {
        const v = parseInt(Event.target.value);
        setUserSelection(v);
        setX(v);
        pId = v;
    };

    /*
    function updatePlans(event: React.ChangeEvent<HTMLInputElement>) {
        //
    }
    */

    React.useEffect(() => {
        console.log("plan changed");
    }, [p, x]);

    return (
        <div>
            <h3>Add a Plan</h3>
            <Button onClick={() => addPlan(pl)}>Add Plan</Button>
            <Button onClick={() => clearPlans(pl)}>Clear Plans</Button>
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
            <Form.Group controlId="changeTextBox">
                <Form.Label>
                    <b>Remove Plan:</b> (enter id)
                    <Form.Control
                        type="number"
                        defaultValue={plans[x].id}
                        //onChange={updatePlans}
                    ></Form.Control>
                </Form.Label>
            </Form.Group>
        </div>
    );
}
