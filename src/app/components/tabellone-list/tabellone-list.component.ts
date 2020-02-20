import { Component, OnInit, HostBinding, Input, Output } from '@angular/core';
import { Tabellone } from 'src/app/common/tabellone';
import { Territorio } from 'src/app/common/territorio';
import { Confine } from 'src/app/common/confine';
import { RegistroCombattimentoComponent } from '../registro-combattimento/registro-combattimento.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FullResponceService } from 'src/app/services/full-responce.service';

@Component({
  selector: 'app-tabellone-list',
  templateUrl: './tabellone-list.component.html',
  styleUrls: ['./tabellone-list.component.css']
})
export class TabelloneListComponent implements OnInit {
  
  constructor(private tabelloneService: FullResponceService,
    private localStorageService: LocalStorageService,
    ) { }

  territorio= new Territorio();
  private territori: Array<Territorio> = new Array();
  partitaCreata: boolean = false;
  confini: Confine[];

  ngOnInit() {

    this.tabelloneService.getAPIone('/getStatoPartita').subscribe(
      data=> {
           if(data == 6)
        {      
          this.partitaCreata = true;
          this.listTerritori();
        }
      },(error) => {    
        console.log(error);
      }
    )
 

  }



  listTerritori() {
    this.tabelloneService.getAPI('/getTerritori').subscribe(
      data => {
        this.territori=data
      }
    )
  }



  addTerritorio(){
    this.tabelloneService.addAPI(this.territorio,"/addTerritorio")
    .subscribe(
      (responce) => {console.log(responce)}, (error) => {
      console.log(error);
    });  
    this.ngOnInit();this.ngOnInit();
  }

 



}
