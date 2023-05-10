export class Student {
    id;
    name; //String is a class, string is a primative type
    #gpa; //#gpa = private _gpa
    set gpa(gpa) {
        this.#gpa = gpa;
    }
    get gpa() {
        return this.#gpa;
    }
    getName() {
        return this.name;
    }
    constructor(id, name, gpa) {
        this.id = id;
        this.name = name;
        this.gpa = gpa;
    }
}
