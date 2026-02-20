import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar class="footer">
      <span>© 2026 FitLife — Trabajo Final Sena</span>
    </mat-toolbar>
  `,
  styles: [`
    .footer {
  background-color: #E8EDEE !important;
  color: #004D55 !important;
  justify-content: center;
  font-size: 0.85rem;
  position: fixed;
  bottom: 0;
  width: 100%;
    }
  `]
})
export class FooterComponent {}