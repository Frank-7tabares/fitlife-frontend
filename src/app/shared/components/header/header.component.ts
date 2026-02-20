import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span class="brand" routerLink="/dashboard">FitLife</span>
      <span class="spacer"></span>

      @if (authService.currentUser$ | async) {
        <button mat-button routerLink="/dashboard">Dashboard</button>
        <button mat-button routerLink="/assessment">Evaluación</button>
        <button mat-button routerLink="/training">Entrenamiento</button>
        <button mat-button routerLink="/nutrition">Nutrición</button>
        <button mat-button routerLink="/instructors">Instructores</button>

        <button mat-icon-button routerLink="/messages"
          [matBadge]="(notificationService.unreadCount$ | async) || null"
          matBadgeColor="warn">
          <mat-icon>notifications</mat-icon>
        </button>

        <button mat-icon-button [matMenuTriggerFor]="userMenu">
          <mat-icon>account_circle</mat-icon>
        </button>

        <mat-menu #userMenu="matMenu">
          <button mat-menu-item routerLink="/profile">
            <mat-icon>person</mat-icon>
            Mi Perfil
          </button>
          <button mat-menu-item routerLink="/auth/change-password">
            <mat-icon>lock</mat-icon>
            Cambiar Contraseña
          </button>
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            Cerrar Sesión
          </button>
        </mat-menu>
      }
    </mat-toolbar>
  `,
  styles: [`
    .brand {
      font-size: 1.4rem;
      font-weight: bold;
      cursor: pointer;
    }
    .spacer { flex: 1 1 auto; }
  `]
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.notificationService.loadUnreadCount();
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}