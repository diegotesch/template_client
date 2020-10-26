import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiarioErrosComponent } from './components/diario-erros/diario-erros.component';
import { LoginSuccessComponent } from '@nuvem/angular-base';

const routes: Routes = [
    { path: '', loadChildren: './pages/dashboard/dashboard.module#DashboardModule'},
    { path: 'diario-erros', component: DiarioErrosComponent, data: { breadcrumb: 'Diário de Erros'} },
    { path: 'login-success', component: LoginSuccessComponent },
    { path: 'lideres', loadChildren: './pages/lideres/lideres.module#LideresModule' },
    { path: 'os', loadChildren: './pages/os/os.module#OsModule' },
    { path: 'projetos', loadChildren: './pages/projetos/projetos.module#ProjetosModule' },
    { path: 'sprints', loadChildren: './pages/sprints/sprints.module#SprintsModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
