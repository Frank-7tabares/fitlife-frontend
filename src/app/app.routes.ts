import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'assessment',
    loadComponent: () => import('./features/assessment/assessment.component').then(m => m.AssessmentComponent),
    canActivate: [authGuard]
  },
  {
    path: 'instructors',
    loadComponent: () => import('./features/instructors/instructors.component').then(m => m.InstructorsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'training',
    loadComponent: () => import('./features/training/training.component').then(m => m.TrainingComponent),
    canActivate: [authGuard]
  },
  {
    path: 'nutrition',
    loadComponent: () => import('./features/nutrition/nutrition.component').then(m => m.NutritionComponent),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'messages',
    loadComponent: () => import('./features/messages/messages.component').then(m => m.MessagesComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/dashboard' }
];