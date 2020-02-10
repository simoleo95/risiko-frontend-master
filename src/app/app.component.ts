import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FullResponceService } from './services/full-responce.service';
import { GiocatoreTurno } from './common/giocatore-turno';
import { Partita } from './common/partita';
import { Modalita } from './common/modalita';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit(): void {
    

  }



}
