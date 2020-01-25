import { RegistroCombattimento } from './registro-combattimento';
import { Territorio } from './territorio';

export class Combattimento {
    id: number;
    risultato:string;
    registroCombattimento: RegistroCombattimento;
    territorioAttaccante: Territorio;
    territorioDifensore: Territorio;
}
