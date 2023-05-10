import { Student } from "./Student.js"
import {Token} from "./MyDecorator.js"

@Token({course:"CS572", canProgram:true})
export class DE_Student extends Student {

}