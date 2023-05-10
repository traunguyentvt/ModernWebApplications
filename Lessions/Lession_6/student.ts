
export class Student {
    id : number;
    private name : string; //String is a class, string is a primative type
    #gpa : number; //#gpa = private _gpa

    set gpa(gpa : number) {
        this.#gpa = gpa;
    }
    get gpa() : number {
        return this.#gpa;
    }

    getName() : string {
        return this.name;
    }

    constructor(id : number, name : string, gpa : number) {
        this.id = id;
        this.name = name;
        this.gpa = gpa;
    }
}