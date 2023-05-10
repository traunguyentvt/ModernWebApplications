export class Student {
    id;
    name;
    #gpa;
    get gpa() {
        return this.#gpa;
    }
    set gpa(gpa) {
        this.#gpa = gpa;
    }
    getName() {
        return this.name;
    }
    constructor(id, name, gpa) {
        this.id = id;
        this.name = name;
        this.#gpa = gpa;
    }
}
