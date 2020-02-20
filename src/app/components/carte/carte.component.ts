import { Component, OnInit } from '@angular/core';
import { CarteTerritorio } from 'src/app/common/carte-territorio';
import { FullResponceService } from 'src/app/services/full-responce.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { GiocatoreTurno } from 'src/app/common/giocatore-turno';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {

  carteTerritorio: CarteTerritorio[];
  partitaCreata : boolean = false;
  giocatoreTurno = new GiocatoreTurno;
  tComplete = false;
  constructor(
    private carteService: FullResponceService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.carteService.getAPIone('/getStatoPartita').subscribe(
      data=> {
        if(data == 6)
        {
          this.listCarteTerritorio();
          this.partitaCreata = true;
        }
      },(error) => {    
        console.log(error);
      }
    )
    
  }


  listCarteTerritorio(){
    this.carteService.getAPIone('/getGiocatoreTurno').pipe(finalize(()=> this.tComplete=true)).subscribe(
      data=> {
        this.giocatoreTurno = data;
        this.carteService.getAPI('/getCarteTerritorio/'+this.giocatoreTurno.turno.nomeGiocatore).subscribe(
          data=> {
            this.carteTerritorio = data;
          }
        )

      }
    )
  }
}
