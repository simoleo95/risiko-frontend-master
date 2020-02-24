import { Component, OnInit } from '@angular/core';
import { CarteTerritorio } from 'src/app/common/carte-territorio';
import { FullResponceService } from 'src/app/services/full-responce.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { GiocatoreTurno } from 'src/app/common/giocatore-turno';
import { finalize } from 'rxjs/operators';
import { CarteObiettivo } from 'src/app/common/carte-obiettivo';
import { StatoService } from 'src/app/services/stato.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

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
  carteComplete = false;
  carteObiettivo : CarteObiettivo[] =[]
  sceltaCarte : Number[] = []
  jolly :Number = 0;
  cartaObiettivo: CarteObiettivo = new CarteObiettivo();

  constructor(
    private carteService: FullResponceService,
    private statoService: StatoService,
    private appComponent: AppComponent,
    private router: Router,
  ) { }

  async ngOnInit() {
    let stato = (await this.statoService.getStato());
    if(stato<5)
    await this.statoService.setOperazioni(5)
        if(stato == 5)
        {
          this.listCarteObiettivo();
          this.listCarteTerritorio();
          this.partitaCreata = true;
          }
          if(stato==7){
            this.listCarteTerritorioGiocatore();
            this.listCarteObiettivoGiocatore();
            this.carteComplete = true;

          }

  }



  listCarteObiettivo(){
      this.carteService.getAPIone('/getCarteObiettivo').subscribe(
      data=> {
          for(let t of data){
            this.carteObiettivo.push(t)
          }
    })
  }

  listCarteTerritorio(){
    this.carteService.getAPI('/getCarteTerritorio/').subscribe(
      data=> {
        this.carteTerritorio = data;
      }
    )
  }


  togliJolly(){
    this.jolly = 1;
  }

  assegnaCarteTerritorio(){
    return new Promise((resolve, reject) => {
      this.carteService.getAPI('/assegnaCarteTerritorio/'+this.jolly).subscribe(
        data=> {
          console.log(data)
        }
      )
      resolve();
    })

  }

  assegnaCarteObiettivo(){
    return new Promise((resolve, reject) => {
    this.carteService.getAPI('/assegnaCarteObiettivo/').subscribe(
      data=> {
        console.log(data)
      }
    )
    resolve();
  })
  }

  async assegnaCarte(){
    await this.assegnaCarteObiettivo();
    await this.assegnaCarteTerritorio();
    this.ngOnInit();
  }

  listCarteTerritorioGiocatore(){
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
  listCarteObiettivoGiocatore(){
    this.carteService.getAPIone('/getGiocatoreTurno').pipe(finalize(()=> this.tComplete=true)).subscribe(
      data=> {
        this.giocatoreTurno = data;
        this.carteService.getAPIone('/getCartaObiettivo/'+this.giocatoreTurno.turno.nomeGiocatore).subscribe(
          data=> {
            this.cartaObiettivo = data;
          }
        )

      }
    )
  }
}
