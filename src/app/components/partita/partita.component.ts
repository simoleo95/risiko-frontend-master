import { Component, OnInit } from '@angular/core';
import { Partita } from 'src/app/common/partita';
import { Modalita } from 'src/app/common/modalita';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FullResponceService } from 'src/app/services/full-responce.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-partita',
  templateUrl: './partita.component.html',
  styleUrls: ['./partita.component.css']
})


export class PartitaComponent implements OnInit {
  partita = new Partita();
  modalitaNome : String;
  mod = new Modalita();
  nRimescoli: number;
  partitaCreata:boolean = false;
  constructor(private localStorageService: LocalStorageService,
    private giocatoreService : FullResponceService,
    private router: Router) { }

    public regolaRinforzi =  {
      check: 0,
      name: "regola speciale"
  };

  ngOnInit() {

    this.giocatoreService.getAPIone('/getStatoPartita').subscribe(
      data=> {
        if(data>=1){
          this.partitaCreata = true;
          this.giocatoreService.getAPIone('/getPartita').subscribe(
            data=> {
              this.mod = data.modalitaB;
              this.partita = data;
            })

        }
      
    })
  }

  onChkChange(regolaRinforzi) {
    this.regolaRinforzi.check = (this.regolaRinforzi.check+1)%2
    console.log(this.regolaRinforzi)
  } 

  addPartita(){
    this.mod.nrimescoli=this.nRimescoli;
    this.mod.nomeM = this.modalitaNome
    this.partita.modalitaB = this.mod;
    this.partita.modalitaB.regolaRinforzi = this.regolaRinforzi.check;


    this.giocatoreService.addAPI(this.partita,"/addPartita")
    .subscribe(
      (responce) => {
      this.partitaCreata = true;


      this.router.navigateByUrl("giocatore-list");}, (error) => {
        alert("Errore inserimento partita")
      console.log(error);
    }); 
    
  
  }

  

}

