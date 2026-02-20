import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AssessmentService, AssessmentResult } from './assessment.service';
import { FitnessCategoryPipe } from '../../shared/pipes/fitness-category.pipe';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatIconModule,
    MatDividerModule,
    FitnessCategoryPipe
  ],
  template: `
    <div class="assessment-container">
      <h1>Evaluación Física</h1>

      @if (result) {
        <mat-card class="result-card">
          <mat-card-header>
            <mat-card-title>Resultados de tu Evaluación</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="result-grid">
              <div class="result-item">
                <span class="label">Puntaje</span>
                <span class="value primary">{{ result.fitness_score }}</span>
              </div>
              <div class="result-item">
                <span class="label">Categoría</span>
                <span class="value">{{ result.fitness_score | fitnessCategory }}</span>
              </div>
              <div class="result-item">
                <span class="label">Edad Real</span>
                <span class="value">{{ result.real_age }} años</span>
              </div>
              <div class="result-item">
                <span class="label">Edad Corporal</span>
                <span class="value">{{ result.body_age }} años</span>
              </div>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" (click)="result = null">
              Nueva Evaluación
            </button>
          </mat-card-actions>
        </mat-card>
      } @else {
        <mat-stepper orientation="vertical" #stepper>
          <mat-step [stepControl]="basicForm" label="Datos Básicos">
            <form [formGroup]="basicForm">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Edad</mat-label>
                <input matInput formControlName="age" type="number">
                @if (basicForm.get('age')?.hasError('required')) {
                  <mat-error>Edad requerida</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Peso (kg)</mat-label>
                <input matInput formControlName="weight" type="number">
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Altura (cm)</mat-label>
                <input matInput formControlName="height" type="number">
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Género</mat-label>
                <mat-select formControlName="gender">
                  <mat-option value="M">Masculino</mat-option>
                  <mat-option value="F">Femenino</mat-option>
                </mat-select>
              </mat-form-field>

              <div class="step-actions">
                <button mat-raised-button color="primary" matStepperNext
                        [disabled]="basicForm.invalid">
                  Siguiente
                </button>
              </div>
            </form>
          </mat-step>

          <mat-step [stepControl]="activityForm" label="Actividad Física">
            <form [formGroup]="activityForm">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Nivel de actividad actual</mat-label>
                <mat-select formControlName="activity_level">
                  <mat-option value="sedentary">Sedentario</mat-option>
                  <mat-option value="light">Actividad ligera</mat-option>
                  <mat-option value="moderate">Actividad moderada</mat-option>
                  <mat-option value="active">Muy activo</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Días de ejercicio por semana</mat-label>
                <mat-select formControlName="exercise_days">
                  <mat-option [value]="0">0 días</mat-option>
                  <mat-option [value]="1">1 día</mat-option>
                  <mat-option [value]="2">2 días</mat-option>
                  <mat-option [value]="3">3 días</mat-option>
                  <mat-option [value]="4">4 días</mat-option>
                  <mat-option [value]="5">5+ días</mat-option>
                </mat-select>
              </mat-form-field>

              <div class="step-actions">
                <button mat-button matStepperPrevious>Atrás</button>
                <button mat-raised-button color="primary" matStepperNext
                        [disabled]="activityForm.invalid">
                  Siguiente
                </button>
              </div>
            </form>
          </mat-step>

          <mat-step label="Confirmar">
            <p>¿Estás listo para enviar tu evaluación?</p>
            <div class="step-actions">
              <button mat-button matStepperPrevious>Atrás</button>
              <button mat-raised-button color="primary"
                      (click)="onSubmit()" [disabled]="isLoading">
                {{ isLoading ? 'Enviando...' : 'Enviar Evaluación' }}
              </button>
            </div>
          </mat-step>
        </mat-stepper>
      }
    </div>
  `,
  styles: [`
    .assessment-container {
      padding: 24px;
      max-width: 700px;
      margin: 0 auto;
    }
    h1 { margin-bottom: 24px; }
    .full-width {
      width: 100%;
      margin-bottom: 12px;
    }
    .step-actions {
      display: flex;
      gap: 8px;
      margin-top: 16px;
    }
    .result-card { margin-top: 16px; }
    .result-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      padding: 16px 0;
    }
    .result-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .label {
      font-size: 0.85rem;
      color: #666;
      margin-bottom: 4px;
    }
    .value {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .value.primary { color: #3f51b5; }
  `]
})
export class AssessmentComponent {
  isLoading = false;
  result: AssessmentResult | null = null;
  basicForm;
  activityForm;

  constructor(
    private fb: FormBuilder,
    private assessmentService: AssessmentService
  ) {
    this.basicForm = this.fb.nonNullable.group({
      age: [0, [Validators.required, Validators.min(10), Validators.max(100)]],
      weight: [0, Validators.required],
      height: [0, Validators.required],
      gender: ['', Validators.required]
    });

    this.activityForm = this.fb.nonNullable.group({
      activity_level: ['', Validators.required],
      exercise_days: [0, Validators.required]
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    const data = {
      responses: [
        { question_id: 'age', value: Number(this.basicForm.value.age) },
        { question_id: 'weight', value: Number(this.basicForm.value.weight) },
        { question_id: 'height', value: Number(this.basicForm.value.height) }
      ]
    };

    this.assessmentService.submitAssessment(data).subscribe({
      next: (res) => {
        this.result = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}