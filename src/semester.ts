import { course } from "../src/course";

//semester interface
export interface Semester {
    id: number;
    courses: course[];
    credits: number;
}
