import { Component, OnInit } from '@angular/core';
import { Giocatore } from 'src/app/common/giocatore';
import { Territorio } from 'src/app/common/territorio';
import { RegistroCombattimentoComponent } from '../registro-combattimento/registro-combattimento.component';
import { Router } from '@angular/router';
import { Partita } from 'src/app/common/partita';
import { Modalita } from 'src/app/common/modalita';
import { MapOperator } from 'rxjs/internal/operators/map';
import { DescrittorePedina } from 'src/app/common/descrittore-pedina';
import { Turno } from 'src/app/common/turno';
import { FullResponceService } from 'src/app/services/full-responce.service';
import { BoolPartita } from 'src/app/common/bool-partita';


@Component({
  selector: 'app-giocatore-list',
  templateUrl: './giocatore-list.component.html',
  styleUrls: ['./giocatore-list.component.css']
})
export class GiocatoreListComponent implements OnInit {

  giocatori: Giocatore[];
  territorio:Territorio;
  giocatore = new Giocatore()
  partita = new Partita();
  modalitaNome : String;
  mod = new Modalita();
  nRimescoli: number;
  bool : BoolPartita = new BoolPartita;
  
  coloreSet : String ;
  mazziere = new Giocatore();
  nomeMazziere : String = "";
  turni : Turno[];


  constructor(private giocatoreService: FullResponceService,private router: Router,
    ) {
    
  }

  ngOnInit() {
 
    this.giocatoreService.getAPIone('/getStatoPartita').subscribe(
      data=> {
        if(data >= 1){
          this.listGiocatori();
          this.bool.partitaCreata = true;
        }
        if(data >= 2){
          this.bool.fineGiocatori = true;
        }
        if(data >= 3){
          this.bool.mazziereCreato = true;
          this.getMazziere();
        }
          
        if(data >= 4){
          this.bool.turniCreato = true;
          this.getTurni();
        }
      },(error) => {    
      }
    )
    
 }
 

  listGiocatori(){
    this.giocatoreService.getAPI('/getGiocatori').subscribe(
      data=> {
        this.giocatori = data;
      },(error) => {    
        console.log(error);
      }
    )
  }

  addGiocatore():void{
    console.log(this.coloreSet)
    let descrittorePedina : DescrittorePedina = new DescrittorePedina();
    descrittorePedina.colore = this.coloreSet;
    this.giocatore.descrittorePedina=descrittorePedina;
    
    this.giocatoreService.addAPI(this.giocatore,"/addGiocatore")
    .subscribe((responce) => {console.log(responce);
    }, (error) => {
      console.log(error);
    });
    this.ngOnInit();
    this.ngOnInit();
    
  }

  deleteGiocatore(n:number){
    this.giocatoreService.getAPI('/deleteGiocatore/'+n).subscribe(
      data=> {
        this.giocatori = data;
      },(error) => {    
        console.log(error);
      }
    )
    this.ngOnInit();
  }

  endGiocatori(){
    let n:number;
    // salva in locale il numero di giocatori 
    this.giocatoreService.getAPIone('/nGiocatori/').subscribe(
      data=> {
        this.bool.fineGiocatori = true;
       },(error) => {    
        console.log(error);
      }
    )
    this.ngOnInit();
  }

  setMazziere(){
    // salva in locale chi è il mazziere
    if(this.nomeMazziere!=""){
      for(let g of this.giocatori){
        if(g.nome == this.nomeMazziere){
          this.giocatoreService.getAPIone('/setMazziere/'+this.nomeMazziere).subscribe(
            data=> {
              this.mazziere = data;
              this.bool.mazziereCreato = true;
            },(error) => {    
              console.log(error);
            }
          )
        }
      }
      if(this.bool.mazziereCreato == false)
        alert("Giocatore non valido")
      

    }
    else{
      this.giocatoreService.getAPIone('/setMazziere/').subscribe(
        data=> {
          this.mazziere = data;
          this.bool.mazziereCreato = true;
        },(error) => {    
          console.log(error);
        }
      )
    }

    this.ngOnInit();
  }

  getMazziere() {
    this.giocatoreService.getAPIone('/getMazziere/').subscribe(
      data=> {
        this.mazziere = data;
        this.bool.mazziereCreato = true;
      },(error) => {    
        console.log(error);
      }
    )
  }

  createTurni(){
    this.giocatoreService.getAPIone('/createTurni/').subscribe(
      data=> {
        this.turni = data;
        this.bool.turniCreato = true;
      },(error) => {    
        console.log(error);
      }
    )
    this.ngOnInit();
  }

  getTurni(){
    this.giocatoreService.getAPI('/getTurni/').subscribe(
      data=> {
        this.turni = data;
      },(error) => {    
        console.log(error);
      }
    )
    this.ngOnInit();
    }
    
}
