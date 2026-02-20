import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  gender: string;
  weight: number;
  height: number;
  fitness_goal: string;
}

export interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  weight: number;
  height: number;
  fitness_goal: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient) {}

  getMyProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/me`);
  }

  updateProfile(data: UpdateProfileRequest): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/me`, data);
  }
}