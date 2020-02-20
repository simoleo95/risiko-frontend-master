import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FullResponceService {

  private baseUrl = 'http://localhost:8080/api';
  constructor(private _httpClient: HttpClient) { }

  public getAPI(urlP :string): Observable<any[]> {
    let urlF = this.baseUrl+urlP

    return this._httpClient.get<Object[]>(urlF).pipe(
      map(response => response)
    );
  }


  public getAPIone(urlP :string): Observable<any> {
    let urlF = this.baseUrl+urlP

    return this._httpClient.get<Object>(urlF).pipe(
      map(response => response)
    );
  }

  public addAPI(obj: Object, urlP:string){
    let urlF = this.baseUrl+urlP
    let body = JSON.stringify(obj);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this._httpClient.post(urlF,body,httpOptions);
  }


}

