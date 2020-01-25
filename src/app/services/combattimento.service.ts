import { Injectable } from '@angular/core';
import { FullResponceService } from './full-responce.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CombattimentoService extends FullResponceService{
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }
}
