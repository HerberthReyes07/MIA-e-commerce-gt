import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  
  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string, duration: number = 3000, horizontalPosition: MatSnackBarHorizontalPosition = 'end') {
    this.snackBar.open(message, 'Cerrar', {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
  }

  showError(message: string, duration: number = 5000, horizontalPosition: MatSnackBarHorizontalPosition = 'end') {
    this.snackBar.open(message, 'Cerrar', {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  }

  showWarning(message: string, duration: number = 4000, horizontalPosition: MatSnackBarHorizontalPosition = 'end') {
    this.snackBar.open(message, 'Cerrar', {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: 'top',
      panelClass: ['snackbar-warning']
    });
  }

  showInfo(message: string, duration: number = 3000, horizontalPosition: MatSnackBarHorizontalPosition = 'end') {
    this.snackBar.open(message, 'Cerrar', {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: 'top',
      panelClass: ['snackbar-info']
    });
  }
}
