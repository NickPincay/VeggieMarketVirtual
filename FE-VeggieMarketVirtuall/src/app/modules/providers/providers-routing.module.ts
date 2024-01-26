import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComunidadListComponent } from './pages/comunidad-list/comunidad-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'table-comunidad', component: ComunidadListComponent },
      { path: '**', redirectTo: 'table-comunidad' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
