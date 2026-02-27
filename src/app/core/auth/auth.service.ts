import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../services/storage.service';

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user_id: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {
    const token = this.storage.getAccessToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.currentUserSubject.next({
        id: payload.sub,
        email: '',
        role: payload.role
      });
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        this.storage.setAccessToken(response.access_token);
        this.storage.setRefreshToken(response.refresh_token);
        this.currentUserSubject.next({
          id: response.user_id,
          email: response.email,
          role: response.role
        });
      })
    );
  }

  register(full_name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { full_name, email, password }).pipe(
      tap(response => {
        this.storage.setAccessToken(response.access_token);
        this.storage.setRefreshToken(response.refresh_token);
        this.currentUserSubject.next({
          id: response.user_id,
          email: response.email,
          role: response.role
        });
      })
    );
  }

  logout(): void {
    this.storage.clearTokens();
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.storage.getAccessToken();
  }
}