import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttaccoService } from 'src/app/services/attacco.service';
import { Risultato } from 'src/app/common/risultato';

@Component({
  selector: 'app-lancio',
  templateUrl: './lancio.component.html',
  styleUrls: ['./lancio.component.css']
})
export class LancioComponent implements OnInit {

  id$: number;
  risultati: Risultato[];
  constructor(    
    private route: ActivatedRoute,
    private attaccoService: AttaccoService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id$ = params['id'];
  
        this.attaccoService.getAPIone('/getRisultatiFromAttacco/'+this.id$).subscribe(
          data=> {
            this.risultati = data;         
          }
        )

      });

  }

}
