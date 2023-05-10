import { DE_Student } from "./DE_Student.js";
let tv = new DE_Student(1, "tv", 4.0);
// for (const key in tv) {
//     console.log(tv[key]);
// }
console.log(tv["course"]);
if (tv["canProgram"]) {
    tv["program"]();
}
else {
    console.log("Don't worry you will learn after this course");
}
