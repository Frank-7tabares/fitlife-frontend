import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Instructor {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  specialization: string;
  experience_years: number;
  rating: number;
  bio: string;
}

@Injectable({ providedIn: 'root' })
export class InstructorsService {
  private apiUrl = `${environment.apiUrl}/api/instructors`;

  constructor(private http: HttpClient) {}

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.apiUrl);
  }

  getInstructor(id: string): Observable<Instructor> {
    return this.http.get<Instructor>(`${this.apiUrl}/${id}`);
  }

  assignInstructor(instructorId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${instructorId}/assign`, {});
  }

  rateInstructor(instructorId: string, rating: number, comment: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${instructorId}/rate`, { rating, comment });
  }
}