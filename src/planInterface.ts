import { Semester } from "./semesterlnterface";

//plan interface
//contains an array of semesters which will contain an array of courses
export interface Plan {
    name: string;
    id: number;
    semesters: Semester[];
    complete: boolean;
}
