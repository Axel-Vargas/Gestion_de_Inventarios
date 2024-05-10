import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private USER_KEY = 'user';

  constructor() {}

  getUser(): any | null {
    if (typeof localStorage !== 'undefined') {
      const userString = localStorage.getItem(this.USER_KEY);
      return userString ? JSON.parse(userString) : null;
    }
    return null;
  }

  getUserName(): string | null {
    if (typeof localStorage !== 'undefined') {
      const userString = localStorage.getItem(this.USER_KEY);
      const userData = userString ? JSON.parse(userString) : null;
      return userData ? userData.usuario : null;
    }
    return null;
  }

  setUser(user: any): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  removeUser(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.USER_KEY);
    }
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  isUserAdmin(): boolean {
    const user = this.getUser();
    return user && user.rol === '1';
  }
}