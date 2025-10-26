import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ProductDto } from '../../../services/product-service';
import { ProductModerationRequestService } from '../../../services/product-moderation-request-service';
import { ImageService } from '../../../services/image-service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails {
  readonly data: ProductDto = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ProductDetails>);
  private imageService = inject(ImageService);
  rejectionReason: string | null = null;

  constructor(private productModerationRequestService: ProductModerationRequestService) {

    if (this.data.reviewStatus === 3) {
      this.productModerationRequestService.getLatestRequestForProduct(this.data.id!).then(latestRequest => {
        if (latestRequest) {
          this.rejectionReason = latestRequest.rejectionReason || null;
        }
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  getConditionLabel(isNew: boolean | undefined): string {
    if (isNew === undefined || isNew === null) return '-';
    return isNew ? 'Nuevo' : 'Usado';
  }

  getReviewStatusLabel(status?: number): string {
    switch (status) {
      case 1: return 'Pendiente';
      case 2: return 'Aprobado';
      case 3: return 'Rechazado';
      default: return 'Desconocido';
    }
  }

  formatDate(dateStr?: string): string {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  }

  getImageUrl(imagePath?: string): string {
    return this.imageService.getImageUrl(imagePath);
  }

}
