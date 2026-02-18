import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, AuthResponse, LoginRequest } from './auth.models';
import { StorageService } from '../services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  login(email: string, password: string): Observable<AuthResponse> {
    const body: LoginRequest = { email, password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, body).pipe(
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

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}