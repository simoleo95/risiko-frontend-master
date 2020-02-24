import { Injectable } from '@angular/core';
import { FullResponceService } from './full-responce.service';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class StatoService {
  out :String =""

  setOperazioni(soglia: number) {
     return new Promise((resolve, reject) => {
       this.out = ""
      if(soglia==1)
        this.out = this.out+"prima crea partita "
      if(soglia==2)
        this.out = this.out+"prima definisci giocatori "
      if(soglia==3)
        this.out = this.out+"prima definisci mazziere "
      if(soglia==4)
        this.out = this.out+"prima determina turno "  
      if(soglia==5)
        this.out = this.out+"prima setta i bonus "  
      if(soglia==6)
        this.out = this.out+"prima assegna carte"    
      if(soglia==7)
        this.out = this.out+"prima sposta le pedine "  
      alert(this.out)
   
       resolve()
     })
  }

  private stato:Number;
  constructor(private statoSerice: FullResponceService,
   ) {
   }

   public getStato(){
    return new Promise((resolve, reject) => {
      this.statoSerice.getAPIone('/getStatoPartita').subscribe(
        data=> {
                  this.stato = data;
                  resolve(this.stato)
  
        })
       
        
       
    }) 

   }
}
