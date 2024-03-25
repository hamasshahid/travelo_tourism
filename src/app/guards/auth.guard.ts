import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class authGuard {
    constructor(
        private router: Router,
    ) { }

    canActivate() {
      const user = localStorage.getItem('userEmail');
      if (user) {
        return true;
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
}

@Injectable({
    providedIn: 'root',
})
export class isLoginGuard {
    constructor(
        private router: Router,
    ) { }
  
    canActivate() {
      const email = localStorage.getItem('userEmail');
      if (email) {
        return true;
      } else {
        this.router.navigate(['/auth/login']);
        return true;
      }
    }
  }