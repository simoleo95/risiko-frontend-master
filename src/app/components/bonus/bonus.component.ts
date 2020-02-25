import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FullResponceService } from 'src/app/services/full-responce.service';
import { CartaTerritorio } from 'src/app/common/carte-territorio';
import { finalize, map } from 'rxjs/operators';
import { GiocatoreTurno } from 'src/app/common/giocatore-turno';
import { Bonus } from 'src/app/common/bonus';
import { BoolPartita } from 'src/app/common/bool-partita';
import { StatoService } from 'src/app/services/stato.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css']
})
export class BonusComponent implements OnInit {

  carteTerritorio: CartaTerritorio[];
  carteTerritorioScelte: CartaTerritorio[];
  tComplete = false;
  giocatoreTurno: GiocatoreTurno = new GiocatoreTurno();
  carteTerritori: CartaTerritorio[];
  out : String[];
  listBonus : Bonus[] = [];
  bool : BoolPartita = new BoolPartita();
  bonusTerritori: number=0;
  bonusCarte : number=0;
  nPed: number =0;


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


  constructor(
    private localStorageService: LocalStorageService,
    private bonusService: FullResponceService,
    private statoService: StatoService,
    private router: Router
  ) { }

  async ngOnInit() {
    let stato = (await this.statoService.getStato());
    if(stato<4)
    await this.statoService.setOperazioni(4)
    
        if(stato == 4 || stato>=8)
        {
          this.listCarteTerritorio();
          this.bool.partitaCreata = true;
        
          this.getGiocatoreTurno();
          this.listTerritori();
        
        }
        if(stato >= 8 ){
          this.bool.bonusCreato = true;
          this.getBonus();
        }
  }

  onChkChangeT(regolaT) {
    this.regoleT[regolaT.valore-1].check = !this.regoleT[regolaT.valore-1].check;
  } 
  onChkChangeC(regolaC) {
    this.regoleC[regolaC.valore-1].check = !this.regoleC[regolaC.valore-1].check;
  } 

  usaBonus(){
    let carteOut: CartaTerritorio[]=[];
    for(let c of this.carteTerritorioScelte)
      if(c.nome!='')
      carteOut.push(c)
    if(carteOut.length==3){
      this.bonusService.addAPI(carteOut, '/usaBonus').subscribe(
        (responce) => {
          console.log(responce);
           this.bonusCarte=responce
           this.nPed = this.bonusTerritori + this.bonusCarte;
           console.log("totale "+this.nPed)
          }, (error) => {
        console.log(error);
      });
    }
    else
    alert("inserisci 3 carte per volta")
    
    this.ngOnInit();
    this.ngOnInit();
  }
  


  getGiocatoreTurno(){
    this.bonusService.getAPIone('/getGiocatoreTurno').pipe(finalize(()=> this.tComplete=true)).subscribe(
      data=> {
        this.giocatoreTurno = data;
      })
  }

listCarteTerritorio(){

  this.bonusService.getAPIone('/getGiocatoreTurno').pipe(finalize(()=> this.tComplete=true)).subscribe(
    data=> {
      this.giocatoreTurno = data;
      this.bonusService.getAPI('/getCarteTerritorio/'+this.giocatoreTurno.turno.nomeGiocatore).subscribe(
        data=> {
        this.carteTerritorio = data;
        this.carteTerritorioScelte = data;
        })
    })
  }

deleteCarteScelte(c:CartaTerritorio){
  for(let i=0; i< this.carteTerritorioScelte.length;i++)
    if(this.carteTerritorioScelte[i].nome==c.nome){
      this.carteTerritorioScelte[i].nome= '';
      this.carteTerritorioScelte[i].simbolo= '';
    }     
}

  listTerritori(){
    this.bonusService.getAPIone('/getGiocatoreTurno').pipe(finalize(()=> this.tComplete=true)).subscribe(
      data=> {
        this.giocatoreTurno = data;
        this.bonusService.getAPI('/getCarteTerritorio/'+this.giocatoreTurno.turno.nomeGiocatore).subscribe(
          data=> {
          this.carteTerritori = data;
          })
      })
    }

  async addBonus(){
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
    this.ngOnInit();
    this.ngOnInit();
  }

  
  getBonusTerritori(){
    this.bonusService.getAPIone('/getBonusTerritori').subscribe(
      (responce) => {this.bonusTerritori=responce; console.log("territori: ",responce)}, (error) => {
      console.log(error);
    });
  }

  getBonus(){
    this.bonusService.getAPIone('/getBonus').subscribe(
      (data)=>{
        for(let d of data)
          this.listBonus.push(new Bonus(d))
      })
  }
  
}
