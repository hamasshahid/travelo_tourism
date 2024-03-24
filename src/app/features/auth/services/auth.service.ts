import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authAPIs } from 'src/app/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: any): Promise<any> {
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

  loginUser(user: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const users = await this.getRegisterUsers()
      const isUserExist = users.find((u: any) => u.email === user.email);
      if (isUserExist) {
        if(user?.isRememberMe){
          localStorage.setItem('user', JSON.stringify(user));
        }
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

}
