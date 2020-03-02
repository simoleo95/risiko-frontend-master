import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FullResponceService } from './services/full-responce.service';
import { GiocatoreTurno } from './common/giocatore-turno';
import { Partita } from './common/partita';
import { Modalita } from './common/modalita';
import { LocalStorageService } from './services/local-storage.service';
import { StatoService } from './services/stato.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private statoService: StatoService
  ){}

  tabellone:boolean=false;
  combattimento:boolean=false
  spostaPedine:boolean=false;
  carte:boolean=false;
  bonus:boolean=false;
  partita: boolean = true;
  giocatori: boolean=false;
  
  async ngOnInit(): Promise<void> {
    let stato = (await this.statoService.getStato());
   // if(stato=>1){
      this.giocatori=true;

    //}
    //if(stato>3)
    this.bonus=true;
    //if(stato>4)
    this.carte=true;
    //if(stato>5)
    this.spostaPedine=true;
    //if(stato>6) {
      this.combattimento=true;
      this.tabellone=true;
    //}
  }



}
