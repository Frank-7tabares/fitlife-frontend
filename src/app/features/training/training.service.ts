import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  rest_seconds: number;
  description: string;
}

export interface Routine {
  id: string;
  goal_description: string;
  fitness_level: string;
  exercises: Exercise[];
  created_at: string;
}

export interface WorkoutCompletion {
  routine_id: string;
  completed_at: string;
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  getActiveRoutine(): Observable<Routine> {
    return this.http.get<Routine>(`${this.apiUrl}/routines/active`);
  }

  getRoutineHistory(): Observable<Routine[]> {
    return this.http.get<Routine[]>(`${this.apiUrl}/routines/history`);
  }

  completeWorkout(data: WorkoutCompletion): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/workouts/complete`, data);
  }
}