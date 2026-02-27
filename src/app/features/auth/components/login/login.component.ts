import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="login-wrapper">

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
          <p>Tu camino hacia una vida más saludable comienza aquí.</p>
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
          <h2>Bienvenido de nuevo</h2>
          <p class="subtitle">Inicia sesión para continuar</p>

          @if (errorMessage) {
            <div class="error-banner">
              <mat-icon>error_outline</mat-icon>
              {{ errorMessage }}
            </div>
          }

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="field-group">
              <label>Correo electrónico</label>
              <mat-form-field appearance="outline" class="full-width">
                <input matInput formControlName="email"
                       type="email" placeholder="Correo Electrónico">
                @if (loginForm.get('email')?.touched && loginForm.get('email')?.hasError('required')) {
                  <mat-error>Email requerido</mat-error>
                }
                @if (loginForm.get('email')?.touched && loginForm.get('email')?.hasError('email')) {
                  <mat-error>Email inválido</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="field-group">
              <label>Contraseña</label>
              <mat-form-field appearance="outline" class="full-width">
                <input matInput formControlName="password"
                       [type]="hidePassword ? 'password' : 'text'"
                       placeholder="Contraseña">
                
                @if (loginForm.get('password')?.touched && loginForm.get('password')?.hasError('required')) {
                  <mat-error>Contraseña requerida</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="forgot-row">
              <a routerLink="/auth/reset-password">¿Olvidaste tu contraseña?</a>
            </div>

            <button mat-raised-button class="submit-btn"
                    type="submit" [disabled]="loginForm.invalid || isLoading">
              {{ isLoading ? 'Ingresando...' : 'Iniciar Sesión' }}
            </button>
          </form>

          <div class="divider">
            <span>¿No tienes cuenta?</span>
          </div>

          <button mat-stroked-button class="register-btn"
                  routerLink="/auth/register">
            Crear cuenta gratis
          </button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .login-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      overflow: hidden;
      z-index: 100;
    }

    /* === PANEL IZQUIERDO === */
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

    /* === PANEL DERECHO === */
    .right-panel {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #E8EDEE;
      padding: 40px;
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

    /* === FORMULARIO === */
    .form-container {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 400px;
      background: white;
      padding: 36px;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    }

    .form-container h2 {
      font-size: 1.8rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 6px;
    }

    .subtitle {
      color: #888;
      margin-bottom: 28px;
      font-size: 0.95rem;
    }

    .error-banner {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #ffebee;
      color: #c62828;
      padding: 12px 16px;
      border-radius: 10px;
      margin-bottom: 20px;
      font-size: 0.9rem;
      border-left: 4px solid #c62828;
    }

    .field-group { margin-bottom: 16px; }

    .field-group label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      color: #444;
      margin-bottom: 6px;
    }

    .full-width { width: 100%; }

    .forgot-row {
      text-align: right;
      margin-bottom: 24px;
    }

    .forgot-row a {
      color: #00838F;
      font-size: 0.85rem;
      text-decoration: none;
      font-weight: 500;
    }

    .forgot-row a:hover { text-decoration: underline; }

    .submit-btn {
      width: 100%;
      height: 48px;
      background: #00838F !important;
      color: white !important;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 10px !important;
    }

    .submit-btn:disabled {
      background: #b0bec5 !important;
    }

    .divider {
      text-align: center;
      margin: 20px 0;
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

    .register-btn {
      width: 100%;
      height: 48px;
      border-color: #00838F !important;
      color: #00838F !important;
      border-radius: 10px !important;
      font-size: 0.95rem;
      font-weight: 600;
    }

    /* === RESPONSIVE === */
    @media (max-width: 768px) {
      .login-wrapper {
        flex-direction: column;
        position: relative;
      }
      .left-panel {
        width: 100%;
        height: auto;
        min-height: 220px;
      }
      .features { display: none; }
      .left-content p { display: none; }
      .right-panel {
        height: auto;
        min-height: calc(100vh - 220px);
        padding: 32px 20px;
      }
    }
  `]
})
export class LoginComponent {
  hidePassword = true;
  isLoading = false;
  errorMessage = '';
  loginForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const { email, password } = this.loginForm.getRawValue();
      this.authService.login(email, password).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () => {
          this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
          this.isLoading = false;
        }
      });
    }
  }
}