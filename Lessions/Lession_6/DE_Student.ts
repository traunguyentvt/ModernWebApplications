import { Token } from "./MyDecorator.js";
import { Student } from "./student.js";

@Token({course:"CS572", canProgram:true})
export class DE_Student extends Student {

}