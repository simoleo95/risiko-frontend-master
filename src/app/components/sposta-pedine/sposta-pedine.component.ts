import { Component, OnInit } from '@angular/core';
import { Territorio } from 'src/app/common/territorio';
import { Router } from '@angular/router';
import { SpostaPedineService } from 'src/app/services/sposta-pedine.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { finalize } from 'rxjs/operators';
import { GiocatoreTurno } from 'src/app/common/giocatore-turno';

@Component({
  selector: 'app-sposta-pedine',
  templateUrl: './sposta-pedine.component.html',
  styleUrls: ['./sposta-pedine.component.css']
})
export class SpostaPedineComponent implements OnInit {

  constructor(
    private router: Router,
    private spostaPedineService: SpostaPedineService,
    private localStorageService: LocalStorageService
    ) { }
    
  partitaCreata: boolean = false;  
  territorio1: Territorio = new Territorio();
  territorio2:Territorio = new Territorio();
  pedine1: number;
  giocatoreTurno = new GiocatoreTurno();
  tComplete: boolean = false;
  tSpostaPedine = false;
  tInserisciPedine = false;
  territori:Territorio[];
  territoriUpdate : Territorio[];

  ngOnInit() {
    this.spostaPedineService.getAPIone('/getStatoPartita').subscribe(
      data=> {
        if(data >= 5)
        {
          this.partitaCreata = true;
          this.getGiocatoreTurno();
          this.listTerritori();
        }
        if(data ==6)
        this.tSpostaPedine = true
      },(error) => {    
        console.log(error);
      }
    )
    
      
  }

  inserisciPedine(){
    this.spostaPedineService.addAPI(this.territori,"/inserisciPedineTerritori")
    .subscribe(
      (responce) => {console.log(responce)}, (error) => {
      console.log(error);
    });
    this.fineTurno();
    this.ngOnInit();
  }

  spostaPedine(){
    console.log(this.territorio1,this.territorio2,this.pedine1)
    this.spostaPedineService.spostaPedine(this.territorio1, this.territorio2, this.pedine1);
    this.spostaPedineService.getAPI("/fineTurno")
    .subscribe(
      (responce) => {console.log(responce)}, (error) => {
      console.log(error);
      }); 
    this.router.navigateByUrl("/tabellone")
  }

  fineTurno(){
    this.spostaPedineService.getAPI("/fineTurno")
    .subscribe(
      (responce) => {console.log(responce)}, (error) => {
      console.log(error);
      }); 
      this.ngOnInit()
    }

    getGiocatoreTurno(){
      this.spostaPedineService.getAPIone('/getGiocatoreTurno').pipe(finalize(()=> this.tComplete=true)).subscribe(
        data=> {
          this.giocatoreTurno = data;
        }
      )

    }

    listTerritori(){
      this.spostaPedineService.getAPIone('/getGiocatoreTurno').pipe(finalize(()=> this.tComplete=true)).subscribe(
        data=> {
          this.giocatoreTurno = data;
          this.spostaPedineService.getAPI('/getTerritoriGiocatore/'+this.giocatoreTurno.turno.nomeGiocatore).subscribe(
            data=> {
              this.territori = data;             
            }
            )
        }
      )
    }
}

