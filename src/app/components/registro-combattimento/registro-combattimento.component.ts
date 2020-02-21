import { Component, OnInit } from '@angular/core';
import { Combattimento } from 'src/app/common/combattimento';
import { Territorio } from 'src/app/common/territorio';
import { TabelloneListComponent } from '../tabellone-list/tabellone-list.component';
import { RegistroCombattimentoService } from 'src/app/services/registro-combattimento.service';
import { Attacco } from 'src/app/common/attacco';
import { Router, ActivatedRoute } from '@angular/router';
import { delay, finalize } from 'rxjs/operators';
import { GiocatoreTurno } from 'src/app/common/giocatore-turno';
import { Giocatore } from 'src/app/common/giocatore';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FullResponceService } from 'src/app/services/full-responce.service';
import { StatoService } from 'src/app/services/stato.service';


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
  tComplete: boolean = false;
  cComplete: boolean = false;
  // usati per creare nuovi attacchi e combattimenti
  combattimento = new Combattimento();
  attacco = new Attacco();
  giocatoreTurno = new GiocatoreTurno();

  lastCombattimento = new Combattimento();
  isCollapsed = false;
  boolCarta = true;
  boolComb=true;
  partitaCreata : boolean = false;



  constructor(private registroService: RegistroCombattimentoService,
    private attaccoService: FullResponceService,
    private router: Router,
    private route: ActivatedRoute,
    private combattimentoService: FullResponceService,
    private giroService: FullResponceService,
    private localStorageService: LocalStorageService,
    private statoService: StatoService) { }
    

  async ngOnInit() {

    let stato = (await this.statoService.getStato());
    if(stato<6)
    await this.statoService.setOperazioni(6)
 
        if(stato >= 6)
        {
          this.getGiocatoreTurno();
          this.listCombattimenti();
          this.partitaCreata = true;
        }

  }

  

  listCombattimenti(){
    this.registroService.getAPI('/getCombattimenti').pipe(finalize(()=> this.cComplete=true)).subscribe(
      data=> {
        this.combattimenti = data;
      }
    )
  }



  addCombattimento(){
    this.combattimento = this.registroService.addCombattimento(
      this.territorioPassA, this.territorioPassD, this.giocatoreTurno.turno.nomeGiocatore);
      this.cComplete = false;
    this.ngOnInit() 
      
     
  } 

  fineTurno(){
  this.giroService.getAPI("/fineTurno")
  .subscribe(
    (responce) => {console.log(responce)}, (error) => {
    console.log(error);
    }); 
    this.tComplete = false;
    this.ngOnInit()
  }

  getGiocatoreTurno(){
    this.registroService.getAPIone('/getGiocatoreTurno').pipe(finalize(()=> this.tComplete=true)).subscribe(
      data=> {
        this.giocatoreTurno = data;
      }
    )
  }

  assegnaCarta(giocatore: Giocatore){
    console.log(giocatore)
    this.attaccoService.addAPI(giocatore,"/consegnaCartaPerCombattimento")
    .subscribe(
      (responce) => {console.log(responce)}, (error) => {
      console.log(error);
    });

    this.router.navigateByUrl("carte")  
  }


  }

