import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PendingRequestViewDto, ProductModerationRequestService } from '../../../services/product-moderation-request-service';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../../services/product-service';
import { ProductDetails } from '../../customer/product-details/product-details';
import { RejectRequestDialog } from '../reject-request-dialog/reject-request-dialog';
import { SnackbarService } from '../../../services/snackbar-service';
import { ConfirmDialog } from '../../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-my-pending-requests',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './my-pending-requests.html',
  styleUrl: './my-pending-requests.css'
})
export class MyPendingRequests implements AfterViewInit {
  displayedColumns: string[] = ['productName', 'ownerName', 'ownerEmail', 'productPrice', 'productStock', 'productIsNew', 'requestDate', 'status', 'actions'];
  dataSource: MatTableDataSource<PendingRequestViewDto>;
  isRequestsEmpty = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private moderationService: ProductModerationRequestService, private productService: ProductService, private dialog: MatDialog, private snackbarService: SnackbarService) {
    this.dataSource = new MatTableDataSource<PendingRequestViewDto>([]);
  }

  async ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Cargar solicitudes pendientes desde el backend
    try {
      const requests = await this.moderationService.getAllMyPendingRequests();
      this.dataSource.data = requests;
      console.log('Solicitudes pendientes cargadas:', requests);

      if (requests.length === 0) {
        this.isRequestsEmpty = true;
      }
    } catch (error) {
      console.error('Error al cargar solicitudes pendientes:', error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getConditionLabel(isNew: boolean): string {
    return isNew ? 'Nuevo' : 'Usado';
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 1: return 'Pendiente';
      case 2: return 'Aprobado';
      case 3: return 'Rechazado';
      default: return 'Desconocido';
    }
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  }

  viewRequestDetail(request: PendingRequestViewDto) {
    this.productService.getProductById(request.productId)
      .then((full) => {
        this.dialog.open(ProductDetails, {
          width: '700px',
          data: full
        });
      })
      .catch((err) => {
        console.error('No se pudieron cargar los detalles del producto', err);
      });
  }

  approveRequest(request: PendingRequestViewDto) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        title: 'Aprobar Solicitud',
        message: `¿Estás seguro de aprobar el producto "${request.productName}"?`,
        confirmText: 'Aprobar',
        cancelText: 'Cancelar',
        confirmColor: 'accent',
        icon: 'check_circle'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.moderationService.updateRequestStatus({ id: request.requestId, status: 2 })
          .then(() => {
            // Remover la solicitud aprobada de la tabla localmente
            this.dataSource.data = this.dataSource.data.filter(r => r.requestId !== request.requestId);
            this.isRequestsEmpty = this.dataSource.data.length === 0;

            // Reajustar la paginación si hace falta
            this.dataSource.paginator?.firstPage();
            this.snackbarService.showSuccess('Solicitud aprobada con éxito', 3000, 'center');
          })
          .catch((err) => {
            console.error('Error al aprobar la solicitud:', err);
          });
      }
    });
  }

  rejectRequest(request: PendingRequestViewDto) {
    const dialogRef = this.dialog.open(RejectRequestDialog, {
      width: '500px',
      data: request
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.confirmed) {
        this.moderationService.updateRequestStatus({
          id: request.requestId,
          status: 3,
          rejectionReason: result.reason
        })
          .then(() => {
            // Remover la solicitud rechazada de la tabla localmente
            this.dataSource.data = this.dataSource.data.filter(r => r.requestId !== request.requestId);
            this.isRequestsEmpty = this.dataSource.data.length === 0;

            // Reajustar la paginación si hace falta
            this.dataSource.paginator?.firstPage();
            this.snackbarService.showSuccess('Solicitud rechazada con éxito', 3000, 'center');
          })
          .catch((err) => {
            console.error('Error al rechazar la solicitud:', err);
          });
      }
    });
  }
}
