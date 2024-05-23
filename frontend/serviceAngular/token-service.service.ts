import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {
  private readonly storage = window.sessionStorage;

  constructor() {}

  public setToken(token: string) {
    this.storage.setItem("token", token);
  }

  public getToken(): string | null {
    return this.storage.getItem("token");
  }

  public getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userId = Number(tokenPayload.nameid);
      if (!isNaN(userId)) {
        return userId;
      }
    }
    return null;
  }


  public getUsername(): string | null {
    const token = this.getToken();
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.unique_name;
    }
    return null;
  }

  public getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.role;
    }
    return null;
  }

  public getAssociationId(): string | null {
    const token = this.getToken();
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.actort;
    }
    return null;
  }
}
