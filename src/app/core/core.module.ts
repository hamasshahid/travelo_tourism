import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './components/home/home.component';
import { authGuard, isLoginGuard } from '../guards/auth.guard';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  providers: [authGuard, isLoginGuard]
})
export class CoreModule { }
