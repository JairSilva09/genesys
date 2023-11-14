import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean{
    if(localStorage.getItem('login-token')){
      const token = localStorage.getItem('login-token');  
      const payload = window.btoa(token!.split('.')[1]);
      // console.log(payload);
      // const parsePayload = JSON.parse(payload);
      // return (parsePayload.exp > Date.now())
      return true;      
    } else {
      return false;
    }    
  }
}
