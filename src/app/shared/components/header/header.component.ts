import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span class="brand">FitLife</span>
      <span class="spacer"></span>

      @if (authService.currentUser$ | async) {
        <button mat-button routerLink="/dashboard">Dashboard</button>
        <button mat-button routerLink="/assessment">Evaluación</button>
        <button mat-button routerLink="/training">Entrenamiento</button>
        <button mat-button routerLink="/nutrition">Nutrición</button>
        <button mat-icon-button routerLink="/messages">
          <mat-icon>notifications</mat-icon>
        </button>
        <button mat-icon-button routerLink="/profile">
          <mat-icon>account_circle</mat-icon>
        </button>
        <button mat-button (click)="logout()">Salir</button>
      }
    </mat-toolbar>
  `,
  styles: [`
    .brand {
      font-size: 1.4rem;
      font-weight: bold;
    }
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}