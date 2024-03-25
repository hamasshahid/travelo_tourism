export interface User {
    profileImg: string;
    fName: string;
    lName: string;
    email: string;
  }
  
  export interface RegisterUser extends User {
    pass: string;
    confirmPass: string;
    terms: boolean;
  }
  
  export interface LoginUser {
    email: string;
    pass: string;
  }