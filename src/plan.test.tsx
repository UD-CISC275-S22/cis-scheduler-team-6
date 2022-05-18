import React from "react";
import { render } from "@testing-library/react";
import { PlanF, plans } from "./plan";
import { catalogHeader } from "./catalog";
import { catalogNumber } from "./catalog";

test("initial plans length is 1", () => {
    render(
        <PlanF
            options={catalogHeader}
            options2={catalogNumber}
            options3={catalogNumber[0]}
        ></PlanF>
    );
    console.log(plans.length);
    expect(plans.length).toBe(1);
});
