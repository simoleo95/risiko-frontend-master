import { Injectable } from '@angular/core';
import { FullResponceService } from './full-responce.service';
import { HttpClient } from '@angular/common/http';
import { Combattimento } from '../common/combattimento';

@Injectable({
  providedIn: 'root'
})
export class AttaccoService extends FullResponceService{

  constructor(httpClient: HttpClient) {
    super(httpClient)
   }

  getAttacco(combattimento: Combattimento, pedineAttaccante: number
    , pedineDifensore: number): any {

  }


}
