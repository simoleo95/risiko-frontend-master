import { Component, OnInit } from '@angular/core';
import { Combattimento } from 'src/app/common/combattimento';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FullResponceService } from 'src/app/services/full-responce.service';
import { Territorio } from 'src/app/common/territorio';
import { RegistroCombattimentoService } from 'src/app/services/registro-combattimento.service';
import { Attacco } from 'src/app/common/attacco';
import { Risultato } from 'src/app/common/risultato';

@Component({
  selector: 'app-attacco',
  templateUrl: './attacco.component.html',
  styleUrls: ['./attacco.component.css']
})
export class AttaccoComponent implements OnInit {
  id$: number;
    // input passati dall'utente
    territorioPassA = new Territorio();
    territorioPassD = new Territorio();
    combattimento = new Combattimento();
    pedineAttaccante: number;
    pedineDifensore: number;
    attacco = new Attacco;
    attacchi: Attacco[];
    nRegola:number;

    risultati: Risultato[];
    newAttacco = true;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private attaccoService: FullResponceService,
    private registroService: RegistroCombattimentoService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id$ = params['id'];
  
        this.registroService.getAPIone('/getCombattimento/'+this.id$).subscribe(
          data=> {
            this.combattimento = data;  
            if(this.combattimento.risultato == "Concluso"){
              this.newAttacco = false;
            }     
          }
        )
         //console.log(`${id}`);
      });
      this.listAttacchi();
      this.listRisultati();
  }

  listAttacchi(){
    this.attaccoService.getAPI('/getAttacchiFromCombattimento/'+this.id$).subscribe(
      data=> {
        this.attacchi = data;
        
      },(error) => {    
        console.log(error);
      }
    )
  }

  listRisultati(){
    this.attaccoService.getAPI('/getRisultati/').subscribe(
      data=> {
        this.risultati = data;
      },(error) => {    
        console.log(error);
      }
    ) 
  }

  addBattaglia(){
    if(this.pedineAttaccante >= this.combattimento.territorioAttaccante.npedine)
    {
      alert("Pedine non valido")
    }
    else{
      this.attacco.pedineAttacco= this.pedineAttaccante;
      this.attacco.pedineDifesa = this.pedineDifensore;
      console.log(this.nRegola)
      this.attacco.nRegola = this.nRegola;
      console.log(this.attacco)
      this.attaccoService.addAPI(this.attacco,"/addAttacco")
      .subscribe(
        (responce) => {console.log(responce)}, (error) => {
        console.log(error);
      });
    }

    this.ngOnInit();
 
  }

}
