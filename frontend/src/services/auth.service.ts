import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface MyJwtPayload {
  sub: string;
  role: string;
  exp?: number;
  iat?: number;
  email: string;
  userId: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  saveToken(token: string){
    sessionStorage.setItem('token', token);
  }

  getToken() : string | null{
    return sessionStorage.getItem('token');
  }

  // saveUserName(userName: string){
  //   sessionStorage.setItem('userName', userName);
  // }

  get getUserName(): string | null{
    //return sessionStorage.getItem('userName');
    const token = this.getToken();
    if(token){
      const decoded: any = jwtDecode<MyJwtPayload>(token);
      return decoded.sub;
    }
    return null;
  }

  // saveEmail(email: string){
  //   sessionStorage.setItem('email', email);
  // }

  get getEmail(): string | null{
    //return sessionStorage.getItem('email');
    const token = this.getToken();
    if(token){
      const decoded = jwtDecode<MyJwtPayload>(token);
      return decoded.email;
    }
    return null;
  }

  // saveRole(role: string){
  //   sessionStorage.setItem('role', role);
  // }

  get getRole(): string | null{
    //return sessionStorage.getItem('role');
    const token = this.getToken();
    if(token){
      const decoded = jwtDecode<MyJwtPayload>(token);
      return decoded.role;
    }
    return null;
  }

  // saveUserId(id: any){
  //   sessionStorage.setItem('userId', id);
  // }

  get getUserId(): any | null{
    //return sessionStorage.getItem('userId');
    const token = this.getToken();
    if(token){
      const decoded = jwtDecode<MyJwtPayload>(token);
      return decoded.userId;
    }
    return null;
  }

  get getLoginStatus() : boolean {
    return !!sessionStorage.getItem('token');
  }

  logout() : void {
    sessionStorage.clear();
  }
}
