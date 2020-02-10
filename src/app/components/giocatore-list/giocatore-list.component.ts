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
  constructor(private giocatoreService: GiocatoreService,private router: Router,
    private localStorageService: LocalStorageService) {
    
  }

  ngOnInit() {
    if(this.localStorageService.retriveInfo()){
    this.listGiocatori();
    this.partitaCreata = true;
  }
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

  addPartita():void{
    /*
    this.mod.nrimescoli=this.nRimescoli;
    this.mod.nomeM = this.modalitaNome
    this.partita.modalitaB = this.mod;
  
    this.giocatoreService.addAPI(this.partita,"/addPartita")
    .subscribe(
      (responce) => {console.log(responce)}, (error) => {
      console.log(error);
    }); 
    */
    this.partitaCreata = true;
    this.ngOnInit(); 
  }


}
