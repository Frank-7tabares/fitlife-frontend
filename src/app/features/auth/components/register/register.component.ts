import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
  template: `
    <div class="register-wrapper">

      <!-- Panel izquierdo -->
      <div class="left-panel">
        <div class="bubble b1"></div>
        <div class="bubble b2"></div>
        <div class="bubble b3"></div>
        <div class="bubble b4"></div>
        <div class="bubble b5"></div>

        <div class="left-content">
          <div class="logo">FL</div>
          <h1>FITLIFE</h1>
          <p>Únete y transforma tu vida con rutinas y planes personalizados.</p>
          <div class="features">
            <div class="feature-item">
              <mat-icon>fitness_center</mat-icon>
              <span>Rutinas personalizadas</span>
            </div>
            <div class="feature-item">
              <mat-icon>restaurant</mat-icon>
              <span>Planes nutricionales</span>
            </div>
            <div class="feature-item">
              <mat-icon>people</mat-icon>
              <span>Instructores expertos</span>
            </div>
          </div>
        </div>
        <div class="decoration-circle c1"></div>
        <div class="decoration-circle c2"></div>
      </div>

      <!-- Panel derecho -->
      <div class="right-panel">
        <div class="bubble-right br1"></div>
        <div class="bubble-right br2"></div>
        <div class="bubble-right br3"></div>
        <div class="bubble-right br4"></div>
        <div class="bubble-right br5"></div>

        <div class="form-container">
          <h2>Crear cuenta</h2>
          <p class="subtitle">Regístrate gratis en FitLife</p>

          @if (errorMessage) {
            <div class="error-banner">
              <mat-icon>error_outline</mat-icon>
              {{ errorMessage }}
            </div>
          }

          @if (successMessage) {
            <div class="success-banner">
              <mat-icon>check_circle_outline</mat-icon>
              {{ successMessage }}
            </div>
          }

          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            
              <div class="field-group">
                 <label>Nombre</label>
            <mat-form-field appearance="outline" class="full-width">
            <input matInput formControlName="first_name" placeholder="Juan">
            @if (registerForm.get('first_name')?.touched && registerForm.get('first_name')?.hasError('required')) {
          <mat-error>Requerido</mat-error>
                  }
                </mat-form-field>
              </div>

              
            

            <div class="field-group">
              <label>Correo electrónico</label>
              <mat-form-field appearance="outline" class="full-width">
                <input matInput formControlName="email"
                       type="email" placeholder="ejemplo@correo.com">
                @if (registerForm.get('email')?.touched && registerForm.get('email')?.hasError('required')) {
                  <mat-error>Email requerido</mat-error>
                }
                @if (registerForm.get('email')?.touched && registerForm.get('email')?.hasError('email')) {
                  <mat-error>Email inválido</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="field-group">
              <label>Contraseña</label>
              <mat-form-field appearance="outline" class="full-width">
                <input matInput formControlName="password"
                       [type]="hidePassword ? 'password' : 'text'"
                       placeholder="••••••••">
                
                @if (registerForm.get('password')?.touched && registerForm.get('password')?.hasError('required')) {
                  <mat-error>Contraseña requerida</mat-error>
                }
                @if (registerForm.get('password')?.touched && registerForm.get('password')?.hasError('minlength')) {
                  <mat-error>Mínimo 8 caracteres</mat-error>
                }
              </mat-form-field>
            </div>

            <button mat-raised-button class="submit-btn"
                    type="submit" [disabled]="registerForm.invalid || isLoading">
              {{ isLoading ? 'Registrando...' : 'Crear Cuenta' }}
            </button>
          </form>

          <div class="divider">
            <span>¿Ya tienes cuenta?</span>
          </div>

          <button mat-stroked-button class="login-btn"
                  routerLink="/auth/login">
            Iniciar sesión
          </button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .register-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      overflow: hidden;
      z-index: 100;
    }

    .left-panel {
      width: 45%;
      height: 100%;
      background: linear-gradient(135deg, #00838F 0%, #004D55 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .bubble {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      animation: floatUp linear infinite;
    }

    .b1 { width: 40px; height: 40px; left: 10%; animation-duration: 6s; animation-delay: 0s; }
    .b2 { width: 25px; height: 25px; left: 25%; animation-duration: 8s; animation-delay: 1.5s; }
    .b3 { width: 55px; height: 55px; left: 50%; animation-duration: 7s; animation-delay: 0.8s; }
    .b4 { width: 20px; height: 20px; left: 70%; animation-duration: 5s; animation-delay: 2s; }
    .b5 { width: 35px; height: 35px; left: 85%; animation-duration: 9s; animation-delay: 0.3s; }

    @keyframes floatUp {
      0%   { bottom: -60px; opacity: 0; transform: scale(0.5); }
      20%  { opacity: 1; }
      80%  { opacity: 0.6; }
      100% { bottom: 110%; opacity: 0; transform: scale(1.1); }
    }

    .left-content {
      position: relative;
      z-index: 2;
      color: white;
      padding: 48px;
      text-align: center;
    }

    .logo {
      width: 70px;
      height: 70px;
      border-radius: 20px;
      background: rgba(255,255,255,0.2);
      border: 2px solid rgba(255,255,255,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      font-weight: 900;
      margin: 0 auto 16px;
      letter-spacing: 2px;
    }

    .left-content h1 {
      font-size: 3rem;
      font-weight: 900;
      letter-spacing: 6px;
      margin-bottom: 12px;
    }

    .left-content p {
      font-size: 1rem;
      opacity: 0.85;
      line-height: 1.6;
      max-width: 260px;
      margin: 0 auto 32px;
    }

    .features {
      display: flex;
      flex-direction: column;
      gap: 16px;
      text-align: left;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255,255,255,0.1);
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 0.9rem;
    }

    .decoration-circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.05);
    }

    .c1 { width: 300px; height: 300px; bottom: -100px; right: -80px; }
    .c2 { width: 200px; height: 200px; top: -60px; left: -60px; }

    .right-panel {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #E8EDEE;
      padding: 24px 40px;
      position: relative;
      overflow: hidden;
    }

    .bubble-right {
      position: absolute;
      border-radius: 50%;
      background: rgba(0, 131, 143, 0.08);
      border: 1px solid rgba(0, 131, 143, 0.15);
      animation: floatUp linear infinite;
    }

    .br1 { width: 45px; height: 45px; left: 8%;  animation-duration: 7s;  animation-delay: 0.5s; }
    .br2 { width: 30px; height: 30px; left: 30%; animation-duration: 9s;  animation-delay: 2s; }
    .br3 { width: 60px; height: 60px; left: 55%; animation-duration: 6s;  animation-delay: 1s; }
    .br4 { width: 22px; height: 22px; left: 75%; animation-duration: 8s;  animation-delay: 0s; }
    .br5 { width: 38px; height: 38px; left: 90%; animation-duration: 10s; animation-delay: 3s; }

    .form-container {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 420px;
      background: white;
      padding: 28px 36px;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    }

    .form-container h2 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 4px;
    }

    .subtitle {
      color: #888;
      margin-bottom: 20px;
      font-size: 0.9rem;
    }

    .error-banner {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #ffebee;
      color: #c62828;
      padding: 10px 14px;
      border-radius: 10px;
      margin-bottom: 14px;
      font-size: 0.85rem;
      border-left: 4px solid #c62828;
    }

    .success-banner {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #e8f5e9;
      color: #2e7d32;
      padding: 10px 14px;
      border-radius: 10px;
      margin-bottom: 14px;
      font-size: 0.85rem;
      border-left: 4px solid #2e7d32;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .field-group { margin-bottom: 8px; }

    .field-group label {
      display: block;
      font-size: 0.82rem;
      font-weight: 600;
      color: #444;
      margin-bottom: 3px;
    }

    .full-width { width: 100%; }

    .submit-btn {
      width: 100%;
      height: 46px;
      background: #00838F !important;
      color: white !important;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 10px !important;
      margin-top: 8px;
    }

    .submit-btn:disabled {
      background: #b0bec5 !important;
    }

    .divider {
      text-align: center;
      margin: 16px 0;
      position: relative;
    }

    .divider::before, .divider::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 35%;
      height: 1px;
      background: #e0e0e0;
    }

    .divider::before { left: 0; }
    .divider::after { right: 0; }

    .divider span {
      font-size: 0.85rem;
      color: #aaa;
      padding: 0 12px;
    }

    .login-btn {
      width: 100%;
      height: 46px;
      border-color: #00838F !important;
      color: #00838F !important;
      border-radius: 10px !important;
      font-size: 0.95rem;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .register-wrapper {
        flex-direction: column;
        position: relative;
      }
      .left-panel {
        width: 100%;
        height: auto;
        min-height: 200px;
      }
      .features { display: none; }
      .left-content p { display: none; }
      .right-panel {
        height: auto;
        padding: 24px 16px;
      }
      .form-row { grid-template-columns: 1fr; }
    }
  `]
})
export class RegisterComponent {
  hidePassword = true;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  registerForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.nonNullable.group({
      first_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      setTimeout(() => {
        this.successMessage = '¡Cuenta creada! Redirigiendo al login...';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/auth/login']), 2000);
      }, 1000);
    }
  }
}