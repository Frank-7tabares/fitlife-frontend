import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileService, Profile } from './profile.service';
import { BmiPipe } from '../../shared/pipes/bmi.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule,
    BmiPipe
  ],
  template: `
    <div class="profile-container">
      <h1>Mi Perfil</h1>

      @if (isLoading) {
        <p>Cargando perfil...</p>
      } @else if (profile) {
        <div class="profile-layout">
          <!-- Tarjeta de resumen -->
          <mat-card class="summary-card">
            <mat-card-content>
              <div class="avatar">
                {{ profile.first_name[0] }}{{ profile.last_name[0] }}
              </div>
              <h2>{{ profile.first_name }} {{ profile.last_name }}</h2>
              <p class="email">{{ profile.email }}</p>
              <mat-divider></mat-divider>
              <div class="stats">
                <div class="stat">
                  <span class="stat-value">{{ profile.weight }} kg</span>
                  <span class="stat-label">Peso</span>
                </div>
                <div class="stat">
                  <span class="stat-value">{{ profile.height }} cm</span>
                  <span class="stat-label">Altura</span>
                </div>
                <div class="stat">
                  <span class="stat-value">{{ profile.weight | bmi: profile.height }}</span>
                  <span class="stat-label">IMC</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Formulario de edición -->
          <mat-card class="edit-card">
            <mat-card-header>
              <mat-card-title>Editar Información</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
                <div class="form-row">
                  <mat-form-field appearance="outline">
                    <mat-label>Nombre</mat-label>
                    <input matInput formControlName="first_name">
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Apellido</mat-label>
                    <input matInput formControlName="last_name">
                  </mat-form-field>
                </div>

                <div class="form-row">
                  <mat-form-field appearance="outline">
                    <mat-label>Peso (kg)</mat-label>
                    <input matInput formControlName="weight" type="number">
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Altura (cm)</mat-label>
                    <input matInput formControlName="height" type="number">
                  </mat-form-field>
                </div>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Objetivo fitness</mat-label>
                  <mat-select formControlName="fitness_goal">
                    <mat-option value="lose_weight">Bajar de peso</mat-option>
                    <mat-option value="gain_muscle">Ganar músculo</mat-option>
                    <mat-option value="maintain">Mantener peso</mat-option>
                    <mat-option value="improve_endurance">Mejorar resistencia</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Género</mat-label>
                  <mat-select formControlName="gender">
                    <mat-option value="M">Masculino</mat-option>
                    <mat-option value="F">Femenino</mat-option>
                  </mat-select>
                </mat-form-field>

                <button mat-raised-button color="primary" type="submit"
                        [disabled]="profileForm.invalid || isSaving">
                  {{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}
                </button>
              </form>
            </mat-card-content>
          </mat-card>
        </div>
      }
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 24px;
      max-width: 900px;
      margin: 0 auto;
    }
    h1 { margin-bottom: 24px; }
    .profile-layout {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 24px;
    }
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #3f51b5;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      font-weight: bold;
      margin: 0 auto 16px;
    }
    .summary-card { text-align: center; }
    h2 { margin-bottom: 4px; }
    .email { color: #666; margin-bottom: 16px; }
    .stats {
      display: flex;
      justify-content: space-around;
      margin-top: 16px;
    }
    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .stat-value {
      font-size: 1.2rem;
      font-weight: bold;
      color: #3f51b5;
    }
    .stat-label {
      font-size: 0.8rem;
      color: #666;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .full-width { width: 100%; }
    mat-form-field { width: 100%; margin-bottom: 8px; }
  `]
})
export class ProfileComponent implements OnInit {
  profile: Profile | null = null;
  isLoading = false;
  isSaving = false;
  profileForm;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.nonNullable.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birth_date: [''],
      gender: [''],
      weight: [0, Validators.required],
      height: [0, Validators.required],
      fitness_goal: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.profileService.getMyProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.profileForm.patchValue(data);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isSaving = true;
      this.profileService.updateProfile(this.profileForm.getRawValue()).subscribe({
        next: (data) => {
          this.profile = data;
          this.snackBar.open('Perfil actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.isSaving = false;
        },
        error: () => {
          this.snackBar.open('Error al actualizar perfil', 'Cerrar', { duration: 3000 });
          this.isSaving = false;
        }
      });
    }
  }
}