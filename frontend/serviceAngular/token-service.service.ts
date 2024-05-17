import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class TokenServiceService {
  
  private readonly storage =window.sessionStorage;
  
  constructor() {
  }
  
  public setToken(token: string){
    this.storage.setItem("token", token);
  }
  
  public getToken() {
    return this.storage.getItem("token")
  }
  
  public getUserRole(): string | null {
    const token = this.getToken();
    if(token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.role;
    }
    return null;
  }
}

