import { Injectable } from '@angular/core';
import { FullResponceService } from './full-responce.service';
import { HttpClient } from '@angular/common/http';
import { Territorio } from '../common/territorio';
import { Combattimento } from '../common/combattimento';
import { Confine } from '../common/confine';

@Injectable({
  providedIn: 'root'
})
export class RegistroCombattimentoService extends FullResponceService{
  private _combattimento = new Combattimento();
  private _territorioA = new Territorio();
  private _territorioD = new Territorio();
  private _confinanti = false;
  private url:string
  private _confini = new Array<Confine>();

  constructor(private httpClient:HttpClient, 
    private tabelloneService: FullResponceService, private confineService: FullResponceService){
    super(httpClient)
  }

  public addCombattimento(terrA:Territorio, terrD:Territorio, nomeGiocatoreTurno:String){
 
        this.url = '/getTerritorioNome/'+terrA.nome
        this.tabelloneService.getAPIone(this.url).subscribe(
          data=> {
            this._territorioA = data;
            // il territorio deve essere del giocatore in turno 
            if(this._territorioA.giocatore.nome == nomeGiocatoreTurno)
            {
              this.url = '/getTerritorioNome/'+terrD.nome
              this.tabelloneService.getAPIone(this.url).subscribe(
                data=> {
                  this._territorioD = data;
                  this.confineService.getAPI("/getVicini/"+this._territorioA.id).subscribe(
                    data=>{
                      this._confini = data
                      for(let temp of this._confini){
                        // i territori devono essere vicini e non dello stesso giocatore
                        if(this._territorioD.id == temp.territorio2.id && 
                        this._territorioA.giocatore.id != this._territorioD.giocatore.id){
                          this._combattimento.territorioAttaccante = this._territorioA;
                          this._combattimento.territorioDifensore = this._territorioD;
                          this._combattimento.risultato = "In corso";
                          this.tabelloneService.addAPI(this._combattimento,"/addCombattimento")
                          .subscribe(
                            (responce) => {console.log(responce)}, (error) => {
                            console.log(error);
                          }); 
                          this._confinanti = true
                        }
                      }
                      if(this._confinanti == false)
                      alert("Errore territori")
                    })     
                })
            }
            else
            alert("Territorio non valido")
          }) 
        return this._combattimento;
    }

}
