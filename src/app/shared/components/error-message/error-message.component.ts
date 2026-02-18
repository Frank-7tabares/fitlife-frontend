import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    @if (message) {
      <div class="error-container">
        <mat-icon>error_outline</mat-icon>
        <span>{{ message }}</span>
      </div>
    }
  `,
  styles: [`
    .error-container {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #f44336;
      padding: 8px;
      border-radius: 4px;
      background: #fdecea;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() message: string = '';
}