import { Component, OnInit } from '@angular/core';
import { Territorio } from 'src/app/common/territorio';
import { Router } from '@angular/router';
import { SpostaPedineService } from 'src/app/services/sposta-pedine.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { finalize } from 'rxjs/operators';
import { GiocatoreTurno } from 'src/app/common/giocatore-turno';
import { CartaTerritorio } from 'src/app/common/carte-territorio';
import { StatoService } from 'src/app/services/stato.service';
import { Giocatore } from 'src/app/common/giocatore';

@Component({
  selector: 'app-sposta-pedine',
  templateUrl: './sposta-pedine.component.html',
  styleUrls: ['./sposta-pedine.component.css']
})
export class SpostaPedineComponent implements OnInit {

  constructor(
    private router: Router,
    private spostaPedineService: SpostaPedineService,
    private statoService: StatoService
        ) { }
  
  giocatore:Giocatore = new Giocatore();      
  partitaCreata: boolean = false;  
  territorio1: Territorio = new Territorio();
  territorio2:Territorio = new Territorio();
  pedine1: number;
  giocatoreTurno = new GiocatoreTurno();
  tComplete: boolean = false;
  tSpostaPedine = false;
  tInserisciPedine = false;
  cTerritori:CartaTerritorio[];
  territoriUpdate : Territorio[];
  nPedine:Number;
  pedineDaInserire:Number =0;

  async ngOnInit() {
    let stato = (await this.statoService.getStato());
    if(stato<6)
    await this.statoService.setOperazioni(6)  
        if(stato >= 5 && stato!=7)
        {
          this.partitaCreata = true;
          this.getGiocatoreTurno();
          this.listCarteTerritori();
          this.getPedineDaInserire()
        }
        if(stato ==8)
        this.tSpostaPedine = true
   
      
  }

  inserisciPedine(t:String,i:Number){
    if((i>0&&!t.startsWith("Jolly"))|| t.startsWith("Jolly")){
      this.spostaPedineService.getAPIone("/addPedineIniziali/"+t+"/"+i)
      .subscribe(
        (responce) => {console.log(responce)}, (error) => {
        console.log(error);
      });
    }
    else
    alert("Inserisci almeno una pedina in ogni territorio")
    this.ngOnInit();
  }


  getPedineDaInserire(){
    this.spostaPedineService.getAPIone("/nGiocatori")
    .subscribe(
      (data:number) => {
        let n :number = data
        this.spostaPedineService.getAPIone("/nPedineIniziali/"+n)
        .subscribe(
          (data) => {
            this.pedineDaInserire = data;
          }, (error) => {
          console.log(error);
        });

      }, (error) => {
      console.log(error);
    });


    this.spostaPedineService.getAPIone("/nPedineIniziali/3")
    .subscribe(
      (data) => {
        this.pedineDaInserire = data;
      }, (error) => {
      console.log(error);
    });
    //this.ngOnInit();
  }

  spostaPromise(){
    return new Promise((resolve, reject) => {
      this.spostaPedineService.spostaPedine(this.territorio1, this.territorio2, this.pedine1);
      resolve()
    })
  }

  async spostaPedine(){
    
    await this.spostaPromise()
    await this.router.navigateByUrl("/tabellone")
    this.ngOnInit()
    
  }


  convalidaPedine(){
    this.spostaPedineService.getAPI("/convalidaPedine")
    .subscribe(
      (responce) => {console.log(responce)}, (error) => {
      console.log(error);
      }); 
      this.ngOnInit();
      this.ngOnInit();
  }

  fineTurno(){
    return new Promise((resolve, reject) => {
      this.spostaPedineService.getAPI("/fineTurno")
      .subscribe(
        (responce) => {console.log(responce)}, (error) => {
        console.log(error);
        }); 
      resolve()
    })
  }



    getGiocatoreTurno(){
      this.spostaPedineService.getAPIone('/getGiocatoreTurno').pipe(finalize(()=> this.tComplete=true)).subscribe(
        data=> {
          this.giocatoreTurno = data;
          this.spostaPedineService.getAPIone('/getGiocatore/'+this.giocatoreTurno.turno.nomeGiocatore).subscribe(
            data=> {
              this.giocatore = data;
            }
          )
        }
      )

    }

    listCarteTerritori(){
      this.spostaPedineService.getAPIone('/getGiocatoreTurno').pipe(finalize(()=> this.tComplete=true)).subscribe(
        data=> {
          this.giocatoreTurno = data;
          this.spostaPedineService.getAPI('/getCarteTerritorio/'+this.giocatoreTurno.turno.nomeGiocatore).subscribe(
            data=> {
              this.cTerritori = data;             
            }
            )
        }
      )
    }



}

