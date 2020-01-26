import { RegistroCombattimento } from './registro-combattimento';
import { Territorio } from './territorio';
import { GiocatoreInTurno } from './giocatore-in-turno';

export class Combattimento {
    id: number;
    risultato:string;
    registroCombattimento: RegistroCombattimento;
    territorioAttaccante: Territorio;
    territorioDifensore: Territorio;
    giocatoreInTurno: GiocatoreInTurno;
}
