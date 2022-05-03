import { course } from "./course";

export function CoursePool({
    Acourse,
    pool
}: {
    Acourse: course;
    pool: course[];
}): course[] {
    const newPool = [Acourse, ...pool];
    return newPool;
}
