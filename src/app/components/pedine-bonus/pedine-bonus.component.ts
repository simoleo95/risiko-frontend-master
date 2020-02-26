import { Component, OnInit } from '@angular/core';
import { Territorio } from 'src/app/common/territorio';
import { ActivatedRoute, Router } from '@angular/router';
import { FullResponceService } from 'src/app/services/full-responce.service';
import { Giocatore } from 'src/app/common/giocatore';
import { GiocatoreTurno } from 'src/app/common/giocatore-turno';
import { CartaTerritorio } from 'src/app/common/carte-territorio';

@Component({
  selector: 'app-pedine-bonus',
  templateUrl: './pedine-bonus.component.html',
  styleUrls: ['./pedine-bonus.component.css']
})
export class PedineBonusComponent implements OnInit {

  territorio1: Territorio = new Territorio();
  territorio2:Territorio = new Territorio();
  giocTurno :GiocatoreTurno = new GiocatoreTurno();
  giocatore: Giocatore = new Giocatore();
  territori: Territorio[] = []
  nPedine: number;
  nPedineT: number;
  spostate: boolean = false;
  listCarte:CartaTerritorio[]=[]
  constructor(
    private route: ActivatedRoute,
    private pedineBonusService: FullResponceService,
    private router : Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
  
      this.pedineBonusService.getAPIone('/getNpedineTotal').subscribe(
        data=> {
          this.nPedine = data
          console.log(data)
        })
      });

      this.route.params.subscribe(params => {
        this.pedineBonusService.getAPIone('/getGiocatoreTurno').subscribe(
          data=> {
            this.giocTurno = data;
            this.pedineBonusService.getAPI('/getTerritoriGiocatore/'+this.giocTurno.turno.nomeGiocatore).subscribe(
              data1=> {
                this.territori = data1
                console.log(this.territori)
              })
          })
        });

      
  }


  inserisciPedine(t:String,i:number){
    for(let territorio of this.territori){
      if(territorio.nome==t){
        territorio.npedine=i
        console.log(territorio)
      }
    }

  }

  spostaPedine(){
    console.log(this.territori)
    this.pedineBonusService.addAPI(this.territori,"/addPedineBonus")
    .subscribe(
      (responce) => {
        console.log(responce);
        this.spostate = true;
      }, (error) => {
      console.log(error);
      }); 
      this.ngOnInit();
  }
  togliCarte(){
    console.log(this.territori)
    this.pedineBonusService.getAPIone("/togliCarte")
    .subscribe(
      (responce) => {
        console.log(responce);
      }, (error) => {
      console.log(error);
      }); 
      this.ngOnInit();
      this.router.navigateByUrl("bonus")
  }
}
