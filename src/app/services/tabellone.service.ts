import { Injectable } from '@angular/core';
import { FullResponceService } from './full-responce.service';
import { HttpClient } from '@angular/common/http';
import { Territorio } from '../common/territorio';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TabelloneService extends FullResponceService{
 
  private territori: Territorio[];
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }
  public getAPI(urlP :string): Observable<Territorio[]> {
    let baseUrl = 'http://localhost:8080/api';
    let urlF = baseUrl+urlP

    return this.httpClient.get<Territorio[]>(urlF).pipe(
      map(response => response)
    ); 
  }
  
  public getNome(urlP :string): Observable<Territorio> {
    let baseUrl = 'http://localhost:8080/api';
    let urlF = baseUrl+urlP

    return this.httpClient.get<Territorio>(urlF).pipe(
      map(response => response)
    );

  }

  }

