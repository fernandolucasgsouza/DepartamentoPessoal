import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { FeriasModule } from './ferias';


const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/ferias/ferias.module#FeriasModule'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    RouterModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
