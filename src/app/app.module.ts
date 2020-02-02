import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GiocatoreListComponent } from './components/giocatore-list/giocatore-list.component';
import { TabelloneListComponent } from './components/tabellone-list/tabellone-list.component';
import { RegistroCombattimentoComponent } from './components/registro-combattimento/registro-combattimento.component';
import { RouterModule, Routes } from '@angular/router';
import { AttaccoComponent } from './components/attacco/attacco.component';
import { AppRoutingModule } from './app-routing.module';
import { LancioComponent } from './components/lancio/lancio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxRadioModule } from 'igniteui-angular';
import { CarteComponent } from './components/carte/carte.component';

const appRoutes: Routes = [
  { path: '/attacco', component: AttaccoComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    GiocatoreListComponent,
    TabelloneListComponent,
    RegistroCombattimentoComponent,
    AttaccoComponent,
    LancioComponent,
    CarteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    IgxRadioModule

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
