
const talk = require("./talk");
talk.greeting("TV");
talk.intro();

let question = require("./talk/question");
const answer = question.ask("What is the meaning of life?");
console.log(answer);


//let can be re-assigned, const can not be re-assigned, const is constant
let name = "TV-LV";
name = "AYE-TV";
console.log(name);

const name1 = "TV";
// name1 = "MYE";
console.log(name1);