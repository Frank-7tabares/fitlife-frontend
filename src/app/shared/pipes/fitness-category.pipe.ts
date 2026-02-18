import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fitnessCategory',
  standalone: true
})
export class FitnessCategoryPipe implements PipeTransform {
  transform(score: number): string {
    if (score >= 90) return 'Élite';
    if (score >= 75) return 'Avanzado';
    if (score >= 50) return 'Intermedio';
    if (score >= 25) return 'Principiante';
    return 'Sin datos';
  }
}