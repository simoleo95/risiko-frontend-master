import { RegistroCombattimento } from './registro-combattimento';
import { Territorio } from './territorio';
import { GiocatoreTurno } from './giocatore-turno';


export class Combattimento {
    id: number;
    risultato:string;
    registroCombattimento: RegistroCombattimento;
    territorioAttaccante: Territorio;
    territorioDifensore: Territorio;
    giocatoreInTurno: GiocatoreTurno;
    cartaAssegnata:number;
}
