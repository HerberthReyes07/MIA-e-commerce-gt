import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PendingRequestViewDto } from '../../../services/product-moderation-request-service';

@Component({
  selector: 'app-reject-request-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './reject-request-dialog.html',
  styleUrl: './reject-request-dialog.css'
})
export class RejectRequestDialog {
  readonly data: PendingRequestViewDto = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<RejectRequestDialog>);
  
  rejectionReason: string = '';

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    if (this.rejectionReason.trim()) {
      this.dialogRef.close({
        confirmed: true,
        reason: this.rejectionReason.trim()
      });
    }
  }

  isReasonValid(): boolean {
    return this.rejectionReason.trim().length > 0;
  }
}
