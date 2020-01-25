import { Giocatore } from './giocatore';
import { Tabellone } from './tabellone';
import { Confine } from './confine';

export class Territorio {
    id:number;
    nome: string;
    valore: number;
    giocatore: Giocatore;
    tabellone: Tabellone;
    confini1:Confine[];
    confini2:Confine[];
    npedine: number;
}
