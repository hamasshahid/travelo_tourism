import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userData: any;
  constructor(
    private authService: AuthService
    ){
    this.authService.userData.subscribe((data) => {
      this.userData = data;
    });
  }

  logout(){
    this.authService.logout();
  }
}
