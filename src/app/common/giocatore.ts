import { Territorio } from './territorio';

export class Giocatore {
    id: number;
    nome:string;
    eta: number
    territori: Territorio[];
    cartaAssegnata: number;
    colore: String;
}
