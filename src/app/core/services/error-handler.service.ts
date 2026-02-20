import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: HttpErrorResponse): string {
    let message = 'Ocurrió un error inesperado';

    if (error.status === 0) {
      message = 'Sin conexión al servidor';
    } else if (error.status === 400) {
      message = error.error?.detail || 'Datos inválidos';
    } else if (error.status === 401) {
      message = 'Sesión expirada, inicia sesión nuevamente';
    } else if (error.status === 403) {
      message = 'No tienes permisos para esta acción';
    } else if (error.status === 404) {
      message = 'Recurso no encontrado';
    } else if (error.status === 500) {
      message = 'Error interno del servidor';
    }

    this.snackBar.open(message, 'Cerrar', { duration: 4000 });
    return message;
  }
}