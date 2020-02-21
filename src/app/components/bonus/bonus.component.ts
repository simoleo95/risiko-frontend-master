import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FullResponceService } from 'src/app/services/full-responce.service';
import { CarteTerritorio } from 'src/app/common/carte-territorio';
import { finalize, map } from 'rxjs/operators';
import { GiocatoreTurno } from 'src/app/common/giocatore-turno';
import { Territorio } from 'src/app/common/territorio';
import { Regola } from 'src/app/common/regola';
import { Bonus } from 'src/app/common/bonus';
import { BoolPartita } from 'src/app/common/bool-partita';
import { StatoService } from 'src/app/services/stato.service';



@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css']
})
export class BonusComponent implements OnInit {

  carteTerritorio: CarteTerritorio[];
  tComplete = false;
  giocatoreTurno: GiocatoreTurno = new GiocatoreTurno();
  territori: Territorio[];
  out : String[];
  listBonus : Bonus[] = [];
  bool : BoolPartita = new BoolPartita()

  public regoleT =  [{
    valore: 1,
    check: false,
    name: "n territori"
}, {
    valore: 2,
    check: false,
    name: "continenti"
},
{
  valore: 3,
  check: false,
  name: "valore"
}];


public regoleC = [{
  valore: 1,
  check: false,
  name: "tris diverso"
}, {
  valore: 2,
  check: false,
  name: "tris uguale"
},
{
valore: 3,
check: false,
name: "tris con jolly"
}];

  onChkChangeT(regolaT) {
    this.regoleT[regolaT.valore-1].check = !this.regoleT[regolaT.valore-1].check;
  } 
  onChkChangeC(regolaC) {
    this.regoleC[regolaC.valore-1].check = !this.regoleC[regolaC.valore-1].check;
  } 


  constructor(
    private localStorageService: LocalStorageService,
    private bonusService: FullResponceService,
    private statoService: StatoService
  ) { }

  async ngOnInit() {
    let stato = (await this.statoService.getStato());
    if(stato<4)
    await this.statoService.setOperazioni(4)
    

        if(stato >= 4)
        {
          this.listCarteTerritorio();
          this.bool.partitaCreata = true;
          
          this.getGiocatoreTurno();
          this.listTerritori();
        
        }
        if(stato >= 5 ){
          this.bool.bonusCreato = true;
          this.getBonus();
        }
  }

  
  getGiocatoreTurno(){
    this.bonusService.getAPIone('/getGiocatoreTurno').pipe(finalize(()=> this.tComplete=true)).subscribe(
      data=> {
        this.giocatoreTurno = data;

      }
    )
  }

listCarteTerritorio(){

  this.bonusService.getAPIone('/getGiocatoreTurno').pipe(finalize(()=> this.tComplete=true)).subscribe(
    data=> {
      this.giocatoreTurno = data;
      this.bonusService.getAPI('/getCarteTerritorio/'+this.giocatoreTurno.turno.nomeGiocatore).subscribe(
        data=> {
        this.carteTerritorio = data;
    }
    )
    }
  )

}

  listTerritori(){

    this.bonusService.getAPIone('/getGiocatoreTurno').pipe(finalize(()=> this.tComplete=true)).subscribe(
      data=> {
        this.giocatoreTurno = data;
        this.bonusService.getAPI('/getTerritoriGiocatore/'+this.giocatoreTurno.turno.nomeGiocatore).subscribe(
          data=> {
          this.territori = data;
    }
    )
  
      }
    )
  }

  addBonus(){
    
    this.out=[""];
 
    for(let a of this.regoleT){
      if (a.check==true){
        this.out.push(a.name)
      }
    }
    for(let a of this.regoleC){
      if (a.check==true){
        this.out.push(a.name)
      }
    }

    this.bonusService.addAPI(this.out, '/addBonus/')    .subscribe(
      (responce) => {console.log(responce); this.bool.bonusCreato = true}, (error) => {
      console.log(error);
    });
    this.bool.bonusCreato=true;
  }
   
  getBonus(){
    this.bonusService.getAPIone('/getBonus').subscribe(
      (data)=>{
        
        for(let d of data)
          this.listBonus.push(new Bonus(d))
        console.log(this.listBonus)   
      }
    )
  }
  
}
