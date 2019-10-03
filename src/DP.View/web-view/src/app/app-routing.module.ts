import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/dashboard-module/dashboard.module').then(m => m.DashboardModule) },
  { path: 'inss', loadChildren: () => import('./modules/inss-module/inss.module').then(m => m.InssModule) },
  { path: 'impostos', loadChildren: () => import('./modules/impostos-module/imposto.module').then(m => m.ImpostoModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
