import { Injectable } from '@angular/core';
import { FullResponceService } from './full-responce.service';
import { HttpClient } from '@angular/common/http';
import { Territorio } from '../common/territorio';
import { GiocatoreTurno } from '../common/giocatore-turno';

@Injectable({
  providedIn: 'root'
})
export class SpostaPedineService extends FullResponceService{

  terr1 : Territorio = new Territorio();
  terr2 : Territorio = new Territorio();
  giocaToreTurno : GiocatoreTurno = new GiocatoreTurno();
  constructor(httpClient:HttpClient,
    private territorioService: FullResponceService,
    private confineService: FullResponceService) {
    super(httpClient);
   }

   spostaPedine(territorio1:Territorio, territorio2:Territorio, pedine:number){
    
    this.territorioService.getAPIone('/getTerritorioNome/'+territorio1.nome).subscribe(
      data=> {
        this.terr1 = data;
        this.territorioService.getAPIone('/getTerritorioNome/'+territorio2.nome).subscribe(
          data=> {
            this.terr2 = data;

            this.territorioService.getAPIone('/getGiocatoreTurno/').subscribe(
              data=> {
                this.giocaToreTurno = data;
                
                if(this.giocaToreTurno.turno.nomeGiocatore==this.terr1.giocatore.nome && 
                  this.giocaToreTurno.turno.nomeGiocatore==this.terr2.giocatore.nome)
                {
                  if(this.terr1.npedine>pedine)
                  {
                  this.territorioService.getAPI('/areVicini/'+this.terr1.id+"/"+this.terr2.id).subscribe(
                  data=> {
                    this.territorioService.getAPI('/spostaPedine/'+this.terr1.id+"/"+this.terr2.id+"/"+pedine).subscribe(
                      data=> {
                      }
                      )
                  }
                  )
                }
                else(alert("Pedine non valide"))
              }
              else{alert("territori non corretti")}
          })
          }
        )
     
      }
    )


   }
}
