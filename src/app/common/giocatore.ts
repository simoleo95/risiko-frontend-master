import { Territorio } from './territorio';
import { DescrittorePedina } from './descrittore-pedina';

export class Giocatore {
    id: number;
    nome:string;
    eta: number
    territori: Territorio[];
    cartaAssegnata: number;
    descrittorePedina : DescrittorePedina;
}
