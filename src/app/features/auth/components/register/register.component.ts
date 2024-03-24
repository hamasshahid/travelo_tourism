import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { cuteToast } from "src/assets/alerts/cute-alert";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hidePassword = true;
  hideConfirmPassword = true;

  registrationForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ){
    this.registrationForm = this.formBuilder.group({
      profileImg: '',
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', [Validators.required, this.passwordMatchValidator]],
      terms: [false, Validators.requiredTrue]
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const imageBase64String = reader.result as string;
        this.registrationForm.patchValue({
          profileImg: imageBase64String
        });
      };
      reader.readAsDataURL(file);
    }
  }

  getRegistrationControl(controlName: string) {
    return this.registrationForm.get(controlName);
  }

  registerUser(){
    const user = this.registrationForm.value;
      this.authService.registerUser(user).then((response) => {
        cuteToast({ type: 'success', message: "User Successfully Registed.", timer: 5000, });
        this.registrationForm.reset({
          profileImg: '',
          fName: '',
          lName: '',
          email: '',
          pass: '',
          confirmPass: '',
          terms: false
        });
      }).catch((error) => {
      cuteToast({ type: 'error', message: error, timer: 5000, });
      });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.get('pass');
    const confirmPassword = control;  
    return password && confirmPassword && password.value === confirmPassword.value ? null : { 'passwordMismatch': true };
  };
}
