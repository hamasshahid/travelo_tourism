import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { authAPIs } from 'src/app/endpoints';
import { LoginUser, RegisterUser, User } from '../authInterfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: BehaviorSubject<User> = new BehaviorSubject<User>({
    profileImg: '',
    fName: '',
    lName: '',
    email: '',
  });
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  registerUser(user: RegisterUser): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const users = await this.getRegisterUsers()
      const isUserExist = users.find((u: any) => u.email === user.email);
      if (isUserExist) {
        reject('User already exist');
        return;
      }
      this.http.post<any>(authAPIs.userRegistration, user).subscribe((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  loginUser(user: LoginUser): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const users = await this.getRegisterUsers()
      const isUserExist = users.find((u: any) => u.email === user.email);
      if (isUserExist && isUserExist.pass === user.pass) {
        this.userData.next(isUserExist);
        localStorage.setItem('userEmail', JSON.stringify(user.email));
        resolve('User logged in successfully');
        return;
      }else{
        reject('Invalid Credentials');
      }
    });
  }

  getRegisterUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(authAPIs.userRegistration).subscribe((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  logout(){
    this.userData.next({
      profileImg: '',
      fName: '',
      lName: '',
      email: '',
    });
    localStorage.removeItem('userEmail');
    this.router.navigate(['/auth/login']);
  }
}
