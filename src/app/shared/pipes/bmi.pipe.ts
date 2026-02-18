import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bmi',
  standalone: true
})
export class BmiPipe implements PipeTransform {
  transform(weight: number, height: number): string {
    if (!weight || !height) return '-';
    const bmi = weight / Math.pow(height / 100, 2);
    return bmi.toFixed(1);
  }
}