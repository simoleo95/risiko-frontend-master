import { Component, OnInit } from '@angular/core';
import { Giocatore } from 'src/app/common/giocatore';
import { Territorio } from 'src/app/common/territorio';
import { GiocatoreService } from 'src/app/services/giocatore.service';
import { RegistroCombattimentoComponent } from '../registro-combattimento/registro-combattimento.component';
import { Router } from '@angular/router';
import { Partita } from 'src/app/common/partita';
import { Modalita } from 'src/app/common/modalita';
import { MapOperator } from 'rxjs/internal/operators/map';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DescrittorePedina } from 'src/app/common/descrittore-pedina';
import { Turno } from 'src/app/common/turno';


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
  partitaCreata:boolean = false;
  fineGiocatori: boolean = false;
  mazziereCreato : boolean = false;
  turniCreato: boolean = false;
  coloreSet : String ;
  mazziere = new Giocatore();
  nomeMazziere : String = "";
  turni : Turno[];


  constructor(private giocatoreService: GiocatoreService,private router: Router,
    private localStorageService: LocalStorageService) {
    
  }

  ngOnInit() {
    if(this.localStorageService.retriveInfo()){
    this.listGiocatori();
    this.partitaCreata = true;
    if(this.localStorageService.getPartita()[1]!=undefined)
    if(this.localStorageService.getPartita()[1].title!=0)
      this.fineGiocatori = true;
    if(this.localStorageService.getPartita()[2]!=undefined){
      this.mazziereCreato = true;
      this.mazziere = this.localStorageService.getPartita()[2].title
    }
    if(this.localStorageService.getPartita()[3]!= undefined)
      this.turniCreato = true; 
  }
  this.getTurni()
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
        n = data;
        this.fineGiocatori = true;
        this.localStorageService.storeOnLocalStorage(n)
      },(error) => {    
        console.log(error);
      }
    )
    this.ngOnInit();
  }

  getMazziere(){
    // salva in locale chi è il mazziere
    if(this.nomeMazziere!=""){
      for(let g of this.giocatori){
        if(g.nome == this.nomeMazziere){
          this.giocatoreService.getAPIone('/getMazziere/'+this.nomeMazziere).subscribe(
            data=> {
              this.mazziere = data;
              this.localStorageService.storeOnLocalStorage(data)
              this.mazziereCreato = true;
            },(error) => {    
              console.log(error);
            }
          )
        }
      }
      if(this.mazziereCreato == false)
        alert("Giocatore non valido")
      

    }
    else{
      this.giocatoreService.getAPIone('/getMazziere/').subscribe(
        data=> {
          this.mazziere = data;
          this.localStorageService.storeOnLocalStorage(data)
          this.mazziereCreato = true;
        },(error) => {    
          console.log(error);
        }
      )
    }

  }

  createTurni(){
    this.giocatoreService.getAPIone('/createTurni/').subscribe(
      data=> {
        this.turni = data;
        this.turniCreato = true;
        this.localStorageService.storeOnLocalStorage(data)
        console.log(data)
      },(error) => {    
        console.log(error);
      }
    )
  }

  getTurni(){
    this.giocatoreService.getAPI('/getTurni/').subscribe(
      data=> {
        console.log(data)
        this.turni = data;
      },(error) => {    
        console.log(error);
      }
    )
    }
}
