import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { PlanF } from "./plan";
import { catalogHeader, catalogNumber } from "./catalog";

test("renders the course name somewhere", () => {
    render(<App />);
    const linkElement = screen.getByText(/CISC275/i);
    expect(linkElement).toBeInTheDocument();
});

//does course get added to semester

describe("Course Component tests", () => {
    beforeEach(() => {
        render(
            <PlanF
                options={catalogHeader}
                options2={catalogNumber}
                options3={catalogNumber[0]}
            />
        );
    });
    test("The initial course list is empty", () => {
        const CurrentCourses = screen.queryAllByRole("listitem");
        expect(CurrentCourses).toHaveLength(0);
    });
    test("There are 7 buttons.", () => {
        const adders = screen.queryAllByRole("button");
        expect(adders).toHaveLength(7);
    });
    test("Adding a course works", () => {
        const addcourse = screen.queryAllByRole("button")[0];
        addcourse.click();
        const CurrentCourses = screen.queryAllByRole("listitem");
        expect(CurrentCourses).toHaveLength(1);
        expect(CurrentCourses[0].textContent).toEqual(addcourse.textContent);
    });
    //Does clear courses work
    test("Clearing the courses works", () => {
        const [, second, third, fourth, fifth, , clear] =
            screen.queryAllByRole("button");
        third.click();
        second.click();
        fifth.click();
        let currentCourse = screen.queryAllByRole("listitem");
        expect(currentCourse).toHaveLength(3);
        expect(currentCourse[0].textContent).toEqual(third.textContent);
        expect(currentCourse[1].textContent).toEqual(second.textContent);
        expect(currentCourse[2].textContent).toEqual(fifth.textContent);
        clear.click();
        currentCourse = screen.queryAllByRole("listitem");
        expect(currentCourse).toHaveLength(0);
        fourth.click();
        currentCourse = screen.queryAllByRole("listitem");
        expect(currentCourse).toHaveLength(1);
        expect(currentCourse[0].textContent).toEqual(fourth.textContent);
    });

    //Does edit Work
    test("Can switch into Edit Mode", () => {
        const switchButton = screen.getByRole("checkbox");
        switchButton.click();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(screen.getAllByRole("checkbox")).toHaveLength(2);
    });
    test("Editing the name and student status changes the text", () => {
        const switchButton = screen.getByRole("checkbox");
        switchButton.click();
        const nameBox = screen.getByRole("textbox");
        userEvent.type(nameBox, "Ada Lovelace");
        const studentBox = screen.getByRole("checkbox", { name: /student/i });
        studentBox.click();
        switchButton.click();
        expect(
            screen.getByText(/Ada Lovelace is not a student/i)
        ).toBeInTheDocument();
    });

    //Does set to default work

    //Do buttons update after changing course department/course

});

//Does course get removed from semester
