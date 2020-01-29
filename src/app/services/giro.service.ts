import { Injectable } from '@angular/core';
import { FullResponceService } from './full-responce.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GiroService extends FullResponceService{

  constructor(httpClient: HttpClient) {
    super(httpClient);
   }
}
