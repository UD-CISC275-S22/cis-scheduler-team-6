import React from "react";
import { render } from "@testing-library/react";
import { PlanF, plans } from "./plan";
import { catalogHeader } from "./catalog";
import { catalogNumber } from "./catalog";

test("initial plans is created", () => {
    render(
        <PlanF
            options={catalogHeader}
            options2={catalogNumber}
            options3={catalogNumber[0]}
        ></PlanF>
    );
    expect(plans.length).toBe(1);
});

test("initial plan has 0 semesters", () => {
    render(
        <PlanF
            options={catalogHeader}
            options2={catalogNumber}
            options3={catalogNumber[0]}
        ></PlanF>
    );
    expect(plans[0].semesters.length).toBe(0);
});
