import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hidePassword = true;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ){
    this.loginForm = this.formBuilder.group({
      email: '',
      pass: '',
      isRememberMe: false
    });
  }

  login(){
    const user = this.loginForm.value;
    console.log(user);
  }
}
