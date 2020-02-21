import { Component, OnInit, HostBinding, Input, Output } from '@angular/core';
import { Tabellone } from 'src/app/common/tabellone';
import { Territorio } from 'src/app/common/territorio';
import { Confine } from 'src/app/common/confine';
import { RegistroCombattimentoComponent } from '../registro-combattimento/registro-combattimento.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FullResponceService } from 'src/app/services/full-responce.service';
import { StatoService } from 'src/app/services/stato.service';

@Component({
  selector: 'app-tabellone-list',
  templateUrl: './tabellone-list.component.html',
  styleUrls: ['./tabellone-list.component.css']
})
export class TabelloneListComponent implements OnInit {
  
  constructor(private tabelloneService: FullResponceService,
    private localStorageService: LocalStorageService,
    private statoService: StatoService
    ) { }

  territorio= new Territorio();
  private territori: Array<Territorio> = new Array();
  partitaCreata: boolean = false;
  confini: Confine[];

  async ngOnInit() {

    let stato = (await this.statoService.getStato());
    if(stato<7)
    await this.statoService.setOperazioni(7)
      if(stato == 7)        {      
        this.partitaCreata = true;
        this.listTerritori();
        }
 
      
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
