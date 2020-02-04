import { Component, OnInit } from '@angular/core';
import { Combattimento } from 'src/app/common/combattimento';
import { Territorio } from 'src/app/common/territorio';
import { TabelloneListComponent } from '../tabellone-list/tabellone-list.component';
import { RegistroCombattimentoService } from 'src/app/services/registro-combattimento.service';
import { AttaccoService } from 'src/app/services/attacco.service';
import { Attacco } from 'src/app/common/attacco';
import { Router, ActivatedRoute } from '@angular/router';
import { CombattimentoService } from 'src/app/services/combattimento.service';
import { delay } from 'rxjs/operators';
import { GiroService } from 'src/app/services/giro.service';
import { GiocatoreTurno } from 'src/app/common/giocatore-turno';
import { Giocatore } from 'src/app/common/giocatore';


@Component({
  selector: 'app-registro-combattimento',
  templateUrl: './registro-combattimento.component.html',
  styleUrls: ['./registro-combattimento.component.css']
})
export class RegistroCombattimentoComponent implements OnInit {
  // input passati dall'utente
  territorioPassA = new Territorio();
  territorioPassD = new Territorio();
  pedineAttaccante: number;
  pedineDifensore: number;
  // usati per visualizzare 
  combattAttuale: Combattimento;
  combattimenti: Combattimento[];
  attacchi: Attacco[];
  // usati per creare nuovi attacchi e combattimenti
  combattimento = new Combattimento();
  attacco = new Attacco();
  giocatoreTurno = new GiocatoreTurno();

  lastCombattimento = new Combattimento();
  isCollapsed = false;
  boolCarta = true;
  boolComb=true;



  constructor(private registroService: RegistroCombattimentoService,
    private attaccoService: AttaccoService,
    private router: Router,
    private route: ActivatedRoute,
    private combattimentoService: CombattimentoService,
    private giroService: GiroService) { }
    

  ngOnInit() {
    this.listCombattimenti();
    this.getGiocatoreTurno();
  }

  

  listCombattimenti(){
    this.registroService.getAPI('/getCombattimenti').subscribe(
      data=> {
        this.combattimenti = data;
      }
    )
  }


  addCombattimento(){
    this.combattimento = this.registroService.addCombattimento(
      this.territorioPassA, this.territorioPassD, this.giocatoreTurno.turno.nomeGiocatore);
  } 

  fineTurno(){
  this.giroService.getAPI("/fineTurno")
  .subscribe(
    (responce) => {console.log(responce)}, (error) => {
    console.log(error);
    }); 
  }

  getGiocatoreTurno(){
    this.registroService.getAPIone('/getGiocatoreTurno').subscribe(
      data=> {
        this.giocatoreTurno = data;
      }
    )
  }

  assegnaCarta(giocatore: Giocatore){
    console.log(giocatore)
    this.attaccoService.addAPI(giocatore,"/assegnaCarta")
    .subscribe(
      (responce) => {console.log(responce)}, (error) => {
      console.log(error);
    });

    this.router.navigateByUrl("carte")  
  }


}
