import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { cuteToast } from "src/assets/alerts/cute-alert";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  attempts: number = 0;
  hidePassword = true;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
      isRememberMe: false
    });
  }

  login() {
    if (this.attempts < 4) {
      if(this.loginForm.valid) {
      this.attempts++;
      const user = this.loginForm.value;
      this.authService.loginUser(user).then((response) => {
        this.router.navigate(['/home']);
      }).catch((error) => {
        cuteToast({ type: 'warning', message: error, timer: 5000, });
      });
    }else{
      cuteToast({ type: 'warning', message: 'Please fill all the fields', timer: 5000, });
    }
    } else {
      cuteToast({ type: 'error', message: 'Your Account has locked', timer: 5000, });
    }
  }

  getLoginControl(controlName: string) {
    return this.loginForm.get(controlName);
  }
}
