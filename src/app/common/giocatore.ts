import { Territorio } from './territorio';
import { DescrittorePedina } from './descrittore-pedina';
import { DescrittoreGiocatore } from './descrittore-giocatore';

export class Giocatore {
    id: number;
    nome:String;
    descrittoreGiocatore: DescrittoreGiocatore;
}
