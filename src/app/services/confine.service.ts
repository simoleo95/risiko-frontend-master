import { Injectable } from '@angular/core';
import { FullResponceService } from './full-responce.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfineService extends FullResponceService{

  constructor(private httpClient: HttpClient) {
    super(httpClient);
   }
}
