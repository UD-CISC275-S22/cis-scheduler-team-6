import { course } from "./course";

//semester interface
export interface Semester {
    id: number;
    courses: course[];
    credits: number;
}
