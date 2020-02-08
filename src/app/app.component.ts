import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FullResponceService } from './services/full-responce.service';
import { GiocatoreTurno } from './common/giocatore-turno';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecommerce';



  ngOnInit(): void {

    
  }
}
