import { Semester } from "../src/semester";

//plan interface
//contains an array of semesters which will contain an array of courses
export interface Plan {
    id: number;
    semesters: Semester[];
    complete: boolean;
}
