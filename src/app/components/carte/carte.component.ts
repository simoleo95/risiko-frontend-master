import { Component, OnInit } from '@angular/core';
import { CarteTerritorio } from 'src/app/common/carte-territorio';
import { FullResponceService } from 'src/app/services/full-responce.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {

  carteTerritorio: CarteTerritorio[];
  constructor(
    private carteService: FullResponceService
  ) { }

  ngOnInit() {
    this.listCarteTerritorio();
  }

  listCarteTerritorio(){
    this.carteService.getAPI('/getCarteTerritorio').subscribe(
      data=> {
        this.carteTerritorio = data;
      }
    )
  }
}
