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
  selector: 'app-change-password',
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
          <mat-card-title>Cambiar Contraseña</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <app-error-message [message]="errorMessage" />

          <form [formGroup]="changeForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Contraseña actual</mat-label>
              <input matInput formControlName="current_password" type="password">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nueva contraseña</mat-label>
              <input matInput formControlName="new_password" type="password">
              @if (changeForm.get('new_password')?.hasError('minlength')) {
                <mat-error>Mínimo 8 caracteres</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Confirmar nueva contraseña</mat-label>
              <input matInput formControlName="confirm_password" type="password">
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit"
                    class="full-width" [disabled]="changeForm.invalid || isLoading">
              {{ isLoading ? 'Cambiando...' : 'Cambiar Contraseña' }}
            </button>
          </form>
        </mat-card-content>
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
  `]
})
export class ChangePasswordComponent {
  isLoading = false;
  errorMessage = '';
  changeForm;

  constructor(private fb: FormBuilder) {
    this.changeForm = this.fb.nonNullable.group({
      current_password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.changeForm.valid) {
      this.isLoading = true;
      console.log('Change password:', this.changeForm.getRawValue());
      this.isLoading = false;
    }
  }
}