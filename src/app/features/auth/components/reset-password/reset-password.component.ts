import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ErrorMessageComponent
  ],
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-card-title>Recuperar Contraseña</mat-card-title>
          <mat-card-subtitle>Te enviaremos un enlace a tu email</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          @if (submitted) {
            <p class="success-message">
              ✅ Si el email existe, recibirás instrucciones para restablecer tu contraseña.
            </p>
          } @else {
            <app-error-message [message]="errorMessage" />
            <form [formGroup]="resetForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Email</mat-label>
                <input matInput formControlName="email" type="email">
                @if (resetForm.get('email')?.hasError('email')) {
                  <mat-error>Email inválido</mat-error>
                }
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit"
                      class="full-width" [disabled]="resetForm.invalid || isLoading">
                {{ isLoading ? 'Enviando...' : 'Enviar enlace' }}
              </button>
            </form>
          }
        </mat-card-content>

        <mat-card-actions>
          <a mat-button routerLink="/auth/login">Volver al login</a>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }
    .auth-card {
      width: 100%;
      max-width: 400px;
      padding: 16px;
    }
    .full-width {
      width: 100%;
      margin-bottom: 12px;
    }
    .success-message {
      color: #4caf50;
      padding: 16px 0;
    }
  `]
})
export class ResetPasswordComponent {
  isLoading = false;
  errorMessage = '';
  submitted = false;
  resetForm;

  constructor(private fb: FormBuilder) {
    this.resetForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      this.isLoading = true;
      setTimeout(() => {
        this.submitted = true;
        this.isLoading = false;
      }, 1000);
    }
  }
}