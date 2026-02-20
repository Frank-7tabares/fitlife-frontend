import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { TrainingService, Routine } from './training.service';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  template: `
    <div class="training-container">
      <h1>Mi Entrenamiento</h1>

      @if (isLoading) {
        <p>Cargando rutina...</p>
      } @else if (!routine) {
        <mat-card>
          <mat-card-content>
            <div class="empty-state">
              <mat-icon>fitness_center</mat-icon>
              <h3>No tienes una rutina activa</h3>
              <p>Completa tu evaluación física para recibir una rutina personalizada.</p>
            </div>
          </mat-card-content>
        </mat-card>
      } @else {
        <mat-card class="routine-card">
          <mat-card-header>
            <mat-card-title>Rutina Activa</mat-card-title>
            <mat-card-subtitle>
              Nivel: {{ routine.fitness_level }} |
              {{ routine.exercises.length }} ejercicios
            </mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <p class="goal">{{ routine.goal_description }}</p>
            <mat-divider></mat-divider>

            <mat-accordion class="exercises-list">
              @for (exercise of routine.exercises; track exercise.id; let i = $index) {
                <mat-expansion-panel>
                  <mat-expansion-panel-header>
                    <mat-panel-title>
                      {{ i + 1 }}. {{ exercise.name }}
                    </mat-panel-title>
                    <mat-panel-description>
                      {{ exercise.sets }} series x {{ exercise.reps }} reps
                    </mat-panel-description>
                  </mat-expansion-panel-header>

                  <div class="exercise-detail">
                    <p>{{ exercise.description }}</p>
                    <div class="exercise-stats">
                      <span><mat-icon>repeat</mat-icon> {{ exercise.sets }} series</span>
                      <span><mat-icon>fitness_center</mat-icon> {{ exercise.reps }} reps</span>
                      <span><mat-icon>timer</mat-icon> {{ exercise.rest_seconds }}s descanso</span>
                    </div>
                  </div>
                </mat-expansion-panel>
              }
            </mat-accordion>
          </mat-card-content>

          <mat-card-actions>
            <button mat-raised-button color="primary"
                    (click)="completeWorkout()" [disabled]="isCompleting">
              <mat-icon>check_circle</mat-icon>
              {{ isCompleting ? 'Guardando...' : 'Completar Entrenamiento' }}
            </button>
          </mat-card-actions>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .training-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 { margin-bottom: 24px; }
    .routine-card { margin-bottom: 16px; }
    .goal {
      color: #666;
      margin: 16px 0;
    }
    .exercises-list { margin-top: 16px; }
    .exercise-detail { padding: 8px 0; }
    .exercise-stats {
      display: flex;
      gap: 16px;
      margin-top: 8px;
      color: #666;
    }
    .exercise-stats span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    mat-icon { font-size: 1rem; width: 1rem; height: 1rem; }
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
export class TrainingComponent implements OnInit {
  routine: Routine | null = null;
  isLoading = false;
  isCompleting = false;

  constructor(
    private trainingService: TrainingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRoutine();
  }

  loadRoutine(): void {
    this.isLoading = true;
    this.trainingService.getActiveRoutine().subscribe({
      next: (data) => {
        this.routine = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  completeWorkout(): void {
    if (!this.routine) return;
    this.isCompleting = true;
    this.trainingService.completeWorkout({
      routine_id: this.routine.id,
      completed_at: new Date().toISOString(),
      notes: ''
    }).subscribe({
      next: () => {
        this.snackBar.open('¡Entrenamiento completado!', 'Cerrar', { duration: 3000 });
        this.isCompleting = false;
      },
      error: () => {
        this.snackBar.open('Error al guardar', 'Cerrar', { duration: 3000 });
        this.isCompleting = false;
      }
    });
  }
}