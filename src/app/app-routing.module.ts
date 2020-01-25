import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttaccoComponent } from './components/attacco/attacco.component';
import { RegistroCombattimentoComponent } from './components/registro-combattimento/registro-combattimento.component';
import { GiocatoreListComponent } from "./components/giocatore-list/giocatore-list.component";
import { TabelloneListComponent } from './components/tabellone-list/tabellone-list.component';
import { AppComponent } from './app.component';
import { LancioComponent } from './components/lancio/lancio.component';

const routes: Routes = [
  {path: 'attacco' , component: AttaccoComponent},
  {path: 'attacco/:id' , component: AttaccoComponent},
  {path: 'registro-combattimento' , component: RegistroCombattimentoComponent},
  {path: 'registro-combattimento/*' , component: RegistroCombattimentoComponent},
  {path: 'giocatore-list' , component: GiocatoreListComponent},
  {path: 'tabellone' , component: TabelloneListComponent},
  {path: 'lancio/:id', component: LancioComponent},


  { path: '',  redirectTo: '/tabellone', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }