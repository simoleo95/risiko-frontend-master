import { Component, OnInit } from '@angular/core';
import { Territorio } from 'src/app/common/territorio';
import { Router } from '@angular/router';
import { SpostaPedineService } from 'src/app/services/sposta-pedine.service';

@Component({
  selector: 'app-sposta-pedine',
  templateUrl: './sposta-pedine.component.html',
  styleUrls: ['./sposta-pedine.component.css']
})
export class SpostaPedineComponent implements OnInit {

  constructor(
    private router: Router,
    private spostaPedineService: SpostaPedineService,
    ) { }
  territorio1: Territorio = new Territorio();
  territorio2:Territorio = new Territorio();
  pedine1: number;

  ngOnInit() {
  }

  spostaPedine(){
    console.log(this.territorio1,this.territorio2,this.pedine1)
    this.spostaPedineService.spostaPedine(this.territorio1, this.territorio2, this.pedine1);
    this.spostaPedineService.getAPI("/fineTurno")
    .subscribe(
      (responce) => {console.log(responce)}, (error) => {
      console.log(error);
      }); 
    this.router.navigateByUrl("/tabellone")
  }
}
