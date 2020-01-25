import { Component, OnInit } from '@angular/core';
import { Combattimento } from 'src/app/common/combattimento';
import { Territorio } from 'src/app/common/territorio';
import { TabelloneListComponent } from '../tabellone-list/tabellone-list.component';
import { RegistroCombattimentoService } from 'src/app/services/registro-combattimento.service';
import { AttaccoService } from 'src/app/services/attacco.service';
import { Attacco } from 'src/app/common/attacco';
import { Router, ActivatedRoute } from '@angular/router';
import { CombattimentoService } from 'src/app/services/combattimento.service';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-registro-combattimento',
  templateUrl: './registro-combattimento.component.html',
  styleUrls: ['./registro-combattimento.component.css']
})
export class RegistroCombattimentoComponent implements OnInit {
  // input passati dall'utente
  territorioPassA = new Territorio();
  territorioPassD = new Territorio();
  pedineAttaccante: number;
  pedineDifensore: number;
  // usati per visualizzare 
  combattAttuale: Combattimento;
  combattimenti: Combattimento[];
  attacchi: Attacco[];
  // usati per creare nuovi attacchi e combattimenti
  combattimento = new Combattimento();
  attacco = new Attacco();

  lastCombattimento = new Combattimento();
  isCollapsed = false;



  constructor(private registroService: RegistroCombattimentoService,
    private attaccoService: AttaccoService,
    private router: Router,
    private route: ActivatedRoute,
    private combattimentoService: CombattimentoService) { }
    

  ngOnInit() {
    this.listCombattimenti();
    //this.listAttacchi();
  }

  

  listCombattimenti(){
    this.registroService.getAPI('/getCombattimenti').subscribe(
      data=> {
        console.log(data)
        this.combattimenti = data;
        
      }
    )
  }

  listAttacchi(){
    this.registroService.getAPI('/getAttacchi').subscribe(
      data=> {
        this.attacchi = data;      
      }
    )
  }

  addCombattimento(){
      this.combattimento = this.registroService.addCombattimento(this.territorioPassA, this.territorioPassD);


}



}
