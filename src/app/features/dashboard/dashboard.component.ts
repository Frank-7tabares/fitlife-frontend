import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ],
  template: `
    <div class="dashboard-container">
      <h1>Bienvenido a FitLife</h1>

      @if (authService.currentUser$ | async; as user) {
        <p class="subtitle">Hola, {{ user.email }}</p>
      }

      <div class="cards-grid">
        <mat-card class="dashboard-card" routerLink="/assessment">
          <mat-card-content>
            <mat-icon>assessment</mat-icon>
            <h3>Evaluación Física</h3>
            <p>Realiza tu evaluación de condición física</p>
          </mat-card-content>
        </mat-card>

        <mat-card class="dashboard-card" routerLink="/training">
          <mat-card-content>
            <mat-icon>fitness_center</mat-icon>
            <h3>Entrenamiento</h3>
            <p>Ve tu rutina activa</p>
          </mat-card-content>
        </mat-card>

        <mat-card class="dashboard-card" routerLink="/nutrition">
          <mat-card-content>
            <mat-icon>restaurant</mat-icon>
            <h3>Nutrición</h3>
            <p>Revisa tu plan nutricional</p>
          </mat-card-content>
        </mat-card>

        <mat-card class="dashboard-card" routerLink="/instructors">
          <mat-card-content>
            <mat-icon>people</mat-icon>
            <h3>Instructores</h3>
            <p>Encuentra tu instructor ideal</p>
          </mat-card-content>
        </mat-card>

        <mat-card class="dashboard-card" routerLink="/profile">
          <mat-card-content>
            <mat-icon>account_circle</mat-icon>
            <h3>Mi Perfil</h3>
            <p>Gestiona tu información personal</p>
          </mat-card-content>
        </mat-card>

        <mat-card class="dashboard-card" routerLink="/messages">
          <mat-card-content>
            <mat-icon>message</mat-icon>
            <h3>Mensajes</h3>
            <p>Chatea con tu instructor</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 8px;
    }
    .subtitle {
      color: #666;
      margin-bottom: 24px;
    }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
    }
    .dashboard-card {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .dashboard-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.15);
    }
    mat-icon {
      font-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      color: #3f51b5;
      margin-bottom: 8px;
    }
    h3 { margin-bottom: 4px; }
    p { color: #666; font-size: 0.9rem; }
  `]
})
export class DashboardComponent {
  constructor(public authService: AuthService) {}
}