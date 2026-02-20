import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { InstructorsService, Instructor } from './instructors.service';

@Component({
  selector: 'app-instructors',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  template: `
    <div class="instructors-container">
      <h1>Instructores Disponibles</h1>

      @if (isLoading) {
        <p>Cargando instructores...</p>
      } @else if (instructors.length === 0) {
        <mat-card>
          <mat-card-content>
            <p>No hay instructores disponibles en este momento.</p>
          </mat-card-content>
        </mat-card>
      } @else {
        <div class="instructors-grid">
          @for (instructor of instructors; track instructor.id) {
            <mat-card class="instructor-card">
              <mat-card-header>
                <div mat-card-avatar class="instructor-avatar">
                  {{ instructor.first_name[0] }}{{ instructor.last_name[0] }}
                </div>
                <mat-card-title>{{ instructor.first_name }} {{ instructor.last_name }}</mat-card-title>
                <mat-card-subtitle>{{ instructor.specialization }}</mat-card-subtitle>
              </mat-card-header>

              <mat-card-content>
                <p class="bio">{{ instructor.bio }}</p>
                <div class="info-row">
                  <mat-icon>star</mat-icon>
                  <span>{{ instructor.rating }}/5</span>
                  <mat-icon>work</mat-icon>
                  <span>{{ instructor.experience_years }} años exp.</span>
                </div>
              </mat-card-content>

              <mat-card-actions>
                <button mat-raised-button color="primary"
                        (click)="assignInstructor(instructor)">
                  Seleccionar
                </button>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .instructors-container {
      padding: 24px;
    }
    h1 { margin-bottom: 24px; }
    .instructors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }
    .instructor-card {
      transition: transform 0.2s;
    }
    .instructor-card:hover {
      transform: translateY(-4px);
    }
    .instructor-avatar {
      background: #3f51b5;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }
    .bio {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 8px;
    }
    .info-row {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #666;
      font-size: 0.9rem;
    }
    mat-icon { font-size: 1rem; width: 1rem; height: 1rem; }
  `]
})
export class InstructorsComponent implements OnInit {
  instructors: Instructor[] = [];
  isLoading = false;

  constructor(
    private instructorsService: InstructorsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadInstructors();
  }

  loadInstructors(): void {
    this.isLoading = true;
    this.instructorsService.getInstructors().subscribe({
      next: (data) => {
        this.instructors = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  assignInstructor(instructor: Instructor): void {
    this.instructorsService.assignInstructor(instructor.id).subscribe({
      next: () => {
        this.snackBar.open(
          `Instructor ${instructor.first_name} asignado correctamente`,
          'Cerrar',
          { duration: 3000 }
        );
      },
      error: () => {
        this.snackBar.open('Error al asignar instructor', 'Cerrar', { duration: 3000 });
      }
    });
  }
}