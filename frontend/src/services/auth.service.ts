import { Injectable } from '@angular/core';

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

  saveUserName(userName: string){
    sessionStorage.setItem('userName', userName);
  }

  get getUserName(): string | null{
    return sessionStorage.getItem('userName');
  }

  saveEmail(email: string){
    sessionStorage.setItem('email', email);
  }

  get getEmail(): string | null{
    return sessionStorage.getItem('email');
  }

  saveRole(role: string){
    sessionStorage.setItem('role', role);
  }

  get getRole(): string | null{
    return sessionStorage.getItem('role');
  }

  saveUserId(id: any){
    sessionStorage.setItem('userId', id);
  }

  get getUserId(): any | null{
    return sessionStorage.getItem('userId');
  }

  get getLoginStatus() : boolean {
    return !!sessionStorage.getItem('token');
  }

  logout() : void {
    sessionStorage.clear();
  }
}
