import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AssessmentRequest {
  responses: { question_id: string; value: number }[];
}

export interface AssessmentResult {
  id: string;
  fitness_score: number;
  fitness_category: string;
  body_age: number;
  real_age: number;
  age_difference: number;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class AssessmentService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  submitAssessment(data: AssessmentRequest): Observable<AssessmentResult> {
    return this.http.post<AssessmentResult>(`${this.apiUrl}/assessments`, data);
  }

  getMyAssessments(): Observable<AssessmentResult[]> {
    return this.http.get<AssessmentResult[]>(`${this.apiUrl}/assessments/my`);
  }

  getLatestAssessment(): Observable<AssessmentResult> {
    return this.http.get<AssessmentResult>(`${this.apiUrl}/assessments/my/latest`);
  }
}