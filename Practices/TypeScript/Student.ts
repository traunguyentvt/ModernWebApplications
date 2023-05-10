
export class Student {
    id : number;
    private name : string;
    #gpa : number;

    get gpa() : number {
        return this.#gpa;
    }
    set gpa(gpa:number) {
        this.#gpa = gpa;
    }

    getName() :string {
        return this.name;
    }

    constructor(id:number, name:string, gpa:number) {
        this.id = id;
        this.name = name;
        this.#gpa = gpa;
    }
}