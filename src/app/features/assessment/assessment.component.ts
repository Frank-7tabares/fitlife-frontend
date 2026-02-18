import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div style="padding: 24px">
      <h1>Evaluación Física</h1>
      <p>Módulo en construcción...</p>
    </div>
  `
})
export class AssessmentComponent {}