import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'accent' | 'warn';
  icon?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css'
})
export class ConfirmDialog {
  readonly data: ConfirmDialogData = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ConfirmDialog>);

  // Valores por defecto
  get title(): string {
    return this.data.title || 'Confirmar acción';
  }

  get message(): string {
    return this.data.message || '¿Estás seguro de realizar esta acción?';
  }

  get confirmText(): string {
    return this.data.confirmText || 'Confirmar';
  }

  get cancelText(): string {
    return this.data.cancelText || 'Cancelar';
  }

  get confirmColor(): 'primary' | 'accent' | 'warn' {
    return this.data.confirmColor || 'primary';
  }

  get icon(): string {
    return this.data.icon || 'help_outline';
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
