import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loadingService.loading$ | async) {
      <div class="loading-overlay">
        <div class="loading-content">

          <!-- Pesa animada en SVG -->
          <div class="dumbbell-wrapper">
            <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" class="dumbbell">
              <!-- Plato izquierdo exterior -->
              <rect x="2" y="10" width="10" height="40" rx="3" fill="#00838F"/>
              <!-- Plato izquierdo interior -->
              <rect x="14" y="15" width="7" height="30" rx="2" fill="#00838F" opacity="0.8"/>
              <!-- Barra -->
              <rect x="21" y="26" width="78" height="8" rx="4" fill="#004D55"/>
              <!-- Plato derecho interior -->
              <rect x="99" y="15" width="7" height="30" rx="2" fill="#00838F" opacity="0.8"/>
              <!-- Plato derecho exterior -->
              <rect x="108" y="10" width="10" height="40" rx="3" fill="#00838F"/>
            </svg>
          </div>

          <p class="loading-text">Cargando<span class="dots">...</span></p>
        </div>
      </div>
    }
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(232, 237, 238, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .loading-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
    }

    .dumbbell-wrapper {
      animation: lift 1s ease-in-out infinite alternate;
    }

    .dumbbell {
      width: 120px;
      height: 60px;
      filter: drop-shadow(0 8px 16px rgba(0, 131, 143, 0.3));
    }

    @keyframes lift {
      from {
        transform: translateY(0px) rotate(-8deg);
      }
      to {
        transform: translateY(-20px) rotate(8deg);
      }
    }

    .loading-text {
      font-size: 1.1rem;
      font-weight: 600;
      color: #004D55;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .dots {
      display: inline-block;
      animation: blink 1.2s steps(3, end) infinite;
      width: 24px;
      overflow: hidden;
      vertical-align: bottom;
    }

    @keyframes blink {
      0%  { width: 0; }
      33% { width: 8px; }
      66% { width: 16px; }
      100%{ width: 24px; }
    }
  `]
})
export class LoadingSpinnerComponent {
  constructor(public loadingService: LoadingService) {}
}