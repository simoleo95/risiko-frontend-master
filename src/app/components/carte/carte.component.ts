import { Component, OnInit } from '@angular/core';
import { CarteTerritorio } from 'src/app/common/carte-territorio';
import { FullResponceService } from 'src/app/services/full-responce.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {

  carteTerritorio: CarteTerritorio[];
  partitaCreata : boolean = false;
  constructor(
    private carteService: FullResponceService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    if(this.localStorageService.retriveInfo() && this.localStorageService.getPartita()[3]!= undefined)
      {this.listCarteTerritorio();
      this.partitaCreata = true;
    }
    
  }

  listCarteTerritorio(){
    this.carteService.getAPI('/getCarteTerritorio').subscribe(
      data=> {
        this.carteTerritorio = data;
      }
    )
  }
}
