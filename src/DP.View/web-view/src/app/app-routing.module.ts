import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/dashboard-module/dashboard.module').then(m => m.DashboardModule) },
  { path: 'calcula-ferias', loadChildren: () => import('./modules/ferias-module/ferias.module').then(m => m.FeriasModule) },
  { path: 'historico', loadChildren: () => import('./modules/impostos-module/imposto.module').then(m => m.ImpostoModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
