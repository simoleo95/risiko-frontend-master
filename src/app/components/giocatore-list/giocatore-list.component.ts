import { Component, OnInit } from '@angular/core';
import { Giocatore } from 'src/app/common/giocatore';
import { Territorio } from 'src/app/common/territorio';
import { GiocatoreService } from 'src/app/services/giocatore.service';
import { RegistroCombattimentoComponent } from '../registro-combattimento/registro-combattimento.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-giocatore-list',
  templateUrl: './giocatore-list.component.html',
  styleUrls: ['./giocatore-list.component.css']
})
export class GiocatoreListComponent implements OnInit {

  giocatori: Giocatore[];
  territorio:Territorio;
  giocatore = new Giocatore()
  mySubscription: any;
  
  constructor(private giocatoreService: GiocatoreService,private router: Router) {
    
  }

  ngOnInit() {
    this.listGiocatori();
  }
 

  listGiocatori(){
    this.giocatoreService.getAPI('/getGiocatori').subscribe(
      data=> {
        this.giocatori = data;
      },(error) => {    
        console.log(error);
      }
    )
  }

  addGiocatore():void{
    this.giocatoreService.addAPI(this.giocatore,"/addGiocatore")
    .subscribe((responce) => {console.log(responce);
    }, (error) => {
      console.log(error);
    });
    this.ngOnInit();
    this.ngOnInit();
  }

  deleteGiocatore(n:number){
    this.giocatoreService.getAPI('/deleteGiocatore/'+n).subscribe(
      data=> {
        this.giocatori = data;
      },(error) => {    
        console.log(error);
      }
    )

    this.ngOnInit();
  }
  

}
