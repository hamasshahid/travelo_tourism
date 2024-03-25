import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard, isLoginGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard, isLoginGuard],
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
