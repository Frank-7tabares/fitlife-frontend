import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly ACCESS_TOKEN = 'access_token';
  private readonly REFRESH_TOKEN = 'refresh_token';

  setAccessToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}