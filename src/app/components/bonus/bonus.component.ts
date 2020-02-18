import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FullResponceService } from 'src/app/services/full-responce.service';
import { CarteTerritorio } from 'src/app/common/carte-territorio';
import { finalize } from 'rxjs/operators';
import { GiocatoreTurno } from 'src/app/common/giocatore-turno';


@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css']
})
export class BonusComponent implements OnInit {

  carteTerritorio: CarteTerritorio[];
  partitaCreata : boolean = false;
  tComplete = false;
  giocatoreTurno: GiocatoreTurno = new GiocatoreTurno();



  constructor(
    private localStorageService: LocalStorageService,
    private bonusService: FullResponceService
  ) { }

  ngOnInit() {
    if(this.localStorageService.retriveInfo() && this.localStorageService.getPartita()[3]!= undefined)
    {
      this.partitaCreata = true;
    }
    
    this.listCarteTerritorio();
  }

  
  listCarteTerritorio(){

    this.bonusService.getAPIone('/getGiocatoreTurno').pipe(finalize(()=> this.tComplete=true)).subscribe(
      data=> {
        this.giocatoreTurno = data;
            this.bonusService.getAPI('/getCarteTerritorio/'+this.giocatoreTurno.turno.nomeGiocatore).subscribe(
            data=> {
            console.log(data)
            this.carteTerritorio = data;
      }
    )
      }
    )
  }


   

}
