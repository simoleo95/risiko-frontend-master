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
import { SpostaPedineComponent } from './components/sposta-pedine/sposta-pedine.component';
import { PartitaComponent } from './components/partita/partita.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalStorageService } from './services/local-storage.service';


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
    SpostaPedineComponent,
    PartitaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    IgxRadioModule,
    StorageServiceModule

  ],

  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
