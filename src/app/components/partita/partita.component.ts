import { Component, OnInit } from '@angular/core';
import { Partita } from 'src/app/common/partita';
import { Modalita } from 'src/app/common/modalita';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FullResponceService } from 'src/app/services/full-responce.service';


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
    private giocatoreService : FullResponceService) { }

  ngOnInit() {

    if(this.localStorageService.retriveInfo())
    {
      this.partita = this.localStorageService.getPartita()[0].title;
      this.partitaCreata = true;
    }
      
  }

  addPartita(){
        
    this.mod.nrimescoli=this.nRimescoli;
    this.mod.nomeM = this.modalitaNome
    this.partita.modalitaB = this.mod;
  
    this.giocatoreService.addAPI(this.partita,"/addPartita")
    .subscribe(
      (responce) => {console.log(responce)}, (error) => {
      console.log(error);
    }); 
    
    this.partitaCreata = true;
    const newTodo = this.partita; 
    this.localStorageService.storeOnLocalStorage(newTodo);
  }

}

