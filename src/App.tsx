import React from "react";
import "./App.css";
import { CoursesSelect } from "./courseDropdown";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
            <p>
                Edit <code>src/App.tsx</code> and save. This page will
                automatically reload.
            </p>
            <p>Isaac Lewis</p>
            <p>Alexander Trunzo</p>
            <p>Yuchen Zhang</p>
            <CoursesSelect
                options={["BISC", "CISC", "MATH"]}
                options2={["101", "202", "303"]}
            ></CoursesSelect>
        </div>
    );
}

export default App;
