import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NutritionService, NutritionPlan } from './nutrition.service';

@Component({
  selector: 'app-nutrition',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDividerModule,
    MatProgressBarModule
  ],
  template: `
    <div class="nutrition-container">
      <h1>Plan Nutricional</h1>

      @if (isLoading) {
        <p>Cargando plan nutricional...</p>
      } @else if (!plan) {
        <mat-card>
          <mat-card-content>
            <div class="empty-state">
              <mat-icon>restaurant</mat-icon>
              <h3>No tienes un plan nutricional</h3>
              <p>Completa tu evaluación física para recibir un plan personalizado.</p>
            </div>
          </mat-card-content>
        </mat-card>
      } @else {
        <!-- Resumen diario -->
        <mat-card class="summary-card">
          <mat-card-header>
            <mat-card-title>Resumen Diario</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="macros-grid">
              <div class="macro-item">
                <span class="macro-value">{{ plan.daily_calories }}</span>
                <span class="macro-label">Calorías</span>
                <mat-progress-bar mode="determinate" [value]="70" color="primary"></mat-progress-bar>
              </div>
              <div class="macro-item">
                <span class="macro-value">{{ plan.protein_grams }}g</span>
                <span class="macro-label">Proteína</span>
                <mat-progress-bar mode="determinate" [value]="60" color="accent"></mat-progress-bar>
              </div>
              <div class="macro-item">
                <span class="macro-value">{{ plan.carbs_grams }}g</span>
                <span class="macro-label">Carbohidratos</span>
                <mat-progress-bar mode="determinate" [value]="50"></mat-progress-bar>
              </div>
              <div class="macro-item">
                <span class="macro-value">{{ plan.fat_grams }}g</span>
                <span class="macro-label">Grasas</span>
                <mat-progress-bar mode="determinate" [value]="40" color="warn"></mat-progress-bar>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Comidas del día -->
        <h2>Comidas de Hoy</h2>
        <div class="meals-grid">
          @for (meal of plan.meals; track meal.id) {
            <mat-card class="meal-card">
              <mat-card-header>
                <mat-card-title>{{ meal.name }}</mat-card-title>
                <mat-card-subtitle>{{ meal.meal_type }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="meal-macros">
                  <span>🔥 {{ meal.calories }} kcal</span>
                  <span>💪 {{ meal.protein }}g proteína</span>
                  <span>🍞 {{ meal.carbs }}g carbos</span>
                  <span>🥑 {{ meal.fat }}g grasas</span>
                </div>
                <mat-divider></mat-divider>
                <ul class="ingredients">
                  @for (ingredient of meal.ingredients; track ingredient) {
                    <li>{{ ingredient }}</li>
                  }
                </ul>
              </mat-card-content>
            </mat-card>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .nutrition-container {
      padding: 24px;
      max-width: 900px;
      margin: 0 auto;
    }
    h1 { margin-bottom: 24px; }
    h2 { margin: 24px 0 16px; }
    .summary-card { margin-bottom: 24px; }
    .macros-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      padding: 16px 0;
    }
    .macro-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }
    .macro-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #3f51b5;
    }
    .macro-label {
      font-size: 0.85rem;
      color: #666;
      margin-bottom: 4px;
    }
    .meals-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    .meal-macros {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 0.85rem;
      margin-bottom: 12px;
    }
    .ingredients {
      padding-left: 16px;
      margin-top: 8px;
      color: #666;
      font-size: 0.9rem;
    }
    .empty-state {
      text-align: center;
      padding: 32px;
      color: #666;
    }
    .empty-state mat-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      margin-bottom: 16px;
    }
  `]
})
export class NutritionComponent implements OnInit {
  plan: NutritionPlan | null = null;
  isLoading = false;

  constructor(private nutritionService: NutritionService) {}

  ngOnInit(): void {
    this.loadPlan();
  }

  loadPlan(): void {
    this.isLoading = true;
    this.nutritionService.getMyPlan().subscribe({
      next: (data) => {
        this.plan = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}