export class Regola {
    valore: number;
    check: boolean;
    name: String;

    constructor(v: number, c:boolean, n:String){
        this.name = n;
        this.check = c;
        this.valore = v;
    }
}
