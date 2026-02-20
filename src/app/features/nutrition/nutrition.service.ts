import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Meal {
  id: string;
  name: string;
  meal_type: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
}

export interface NutritionPlan {
  id: string;
  daily_calories: number;
  protein_grams: number;
  carbs_grams: number;
  fat_grams: number;
  meals: Meal[];
}

@Injectable({ providedIn: 'root' })
export class NutritionService {
  private apiUrl = `${environment.apiUrl}/api/nutrition`;

  constructor(private http: HttpClient) {}

  getMyPlan(): Observable<NutritionPlan> {
    return this.http.get<NutritionPlan>(`${this.apiUrl}/plan`);
  }

  getDailyMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.apiUrl}/meals/today`);
  }
}