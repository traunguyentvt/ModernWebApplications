import { DE_Student } from "./DE_Student.js";
let tv = new DE_Student(1, "TV", 4.0);
// console.log(tv.id);
// console.log(tv.getName());
// console.log(tv.gpa);
// for (const key in tv) {
//     console.log(key);
// }
console.log(tv["id"]);
console.log(tv["course"]);
if (tv["canProgram"]) {
    tv["program"]();
}
else {
    console.log("Don't worry you will learn from this course");
}
