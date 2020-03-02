import { Territorio } from './territorio';
import { DescrittorePedina } from './descrittore-pedina';

export class DescrittoreGiocatore {
    id: number;
    nome:String;
    eta: number
    territori: Territorio[];
    cartaAssegnata: number;
    descrittorePedina : DescrittorePedina;
    bonusAssegnato: number;

}
