import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Plan } from "../src/planI";
import { Form } from "react-bootstrap";

/*
let plans: Plan[] = [];
console.log("new plans");
const pl: Plan = {
    id: 0,
    semesters: [],
    complete: false
};
plans.push(pl);
const [p, setP] = useState<Plan>(pl);
*/

export function PlanF(): JSX.Element {
    let plans: Plan[] = [];
    console.log("new plans");
    const pl: Plan = {
        id: 0,
        semesters: [],
        complete: false
    };
    plans.push(pl);
    const [p, setP] = useState<Plan>(pl);

    function createPlan(plans: Plan[]): Plan[] {
        const pl: Plan = {
            id: p.id + 1,
            semesters: [],
            complete: false
        };
        plans.push(pl);
        setP(pl);
        return plans;
    }

    function removePlan(plans: Plan[]): Plan[] {
        plans.pop;
        setP(plans[plans.length - 1]);
        return plans;
    }

    /*
    function findP(id: number) {
        //if()
    }
    */

    return (
        <div>
            <Button onClick={() => (plans = createPlan(plans))}>
                Add Plan
            </Button>
            <Button onClick={() => (plans = removePlan(plans))}>
                Clear Plans
            </Button>
            {
                <div>
                    Plan ID: {p.id} Semesters: {p.semesters} Complete?{" "}
                    {p.complete}
                </div>
            }
            Select Plan
            <select name="selectList" id="selectList">
                <option value="option 1">Plan 1</option>
                <option value="option 2">Plan 2</option>
            </select>
            <Form.Group controlId="checkAnswer">
                <Form.Label>Plan To Remove: (enter id)</Form.Label>
                <Form.Control value={p.id} />
            </Form.Group>
        </div>
    );
}
