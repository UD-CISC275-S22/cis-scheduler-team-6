import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Plan } from "./planInterface";
import { Form } from "react-bootstrap";
import plan from "../src/plans_data.json";
let plans = plan.map((cPlan: Plan) => ({ ...cPlan }));

export function PlanF(): JSX.Element {
    const [p, setP] = useState<Plan[]>(plans);
    const [x, setX] = useState<number>(0);

    function addPlan(newPlan: Plan) {
        setP([...plans, newPlan]);
        plans.push(newPlan);
        setX(x + 1);
    }

    function clearPlans() {
        setP([]);
        setX(0);
        plans = [];
    }

    const pl: Plan = {
        id: plans.length,
        semesters: [],
        complete: false
    };

    return (
        <div>
            <h3>Add a Plan</h3>
            <Button onClick={() => addPlan(pl)}>Add Plan</Button>
            <Button onClick={() => clearPlans}>Clear Plans</Button>
            {
                <div>
                    <p>Plan ID: {p[x].id}</p>
                    <p>Semesters: {p[x].semesters}</p>
                    <p>Complete? {p[x].complete}</p>
                </div>
            }
            <b>Select Plan:</b>
            <select name="selectList" id="selectList">
                {plans.map((plan: Plan) => (
                    <option key={plan.id}> Plan {plan.id} </option>
                ))}
            </select>
            <Form.Group controlId="checkAnswer">
                <Form.Label>
                    <b>Remove Plan:</b> (enter id)
                </Form.Label>
                <Form.Control value={p[x].id} />
            </Form.Group>
        </div>
    );
}
