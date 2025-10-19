import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductForm } from '../product-form/product-form';
import { ProductDetails } from '../product-details/product-details';
import { ProductDto, ProductService } from '../../../services/product-service';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../../services/snackbar-service';

@Component({
  selector: 'app-my-products',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './my-products.html',
  styleUrl: './my-products.css'
})
export class MyProducts implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'stock', 'isNew', 'creationDate', 'lastUpdatedDate', 'reviewStatus', 'actions'];
  dataSource: MatTableDataSource<ProductDto>;
  isProductsEmpty = false;

  readonly dialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private snackbarService: SnackbarService) {
    this.dataSource = new MatTableDataSource<ProductDto>([]);
  }

  async ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Cargar productos desde el backend
    try {
      const products = await this.productService.getMyProducts();
      this.dataSource.data = products;

      if (products.length === 0) {
        this.isProductsEmpty = true;
      }

    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openProductForm(product?: ProductDto) {
    // Evitar mutar el objeto original si el usuario cancela: clonar
    const dataClone = product
      ? {
        ...product,
        categories: Array.isArray(product.categories) ? [...product.categories] : []
      }
      : null;

    const dialogRef = this.dialog.open(ProductForm, {
      width: '600px',
      data: dataClone
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          const products = await this.productService.getMyProducts();
          this.dataSource.data = products;

          if (product) {
            this.snackbarService.showSuccess('Producto actualizado correctamente', 3000, 'center');
          } else {
            this.snackbarService.showSuccess('Producto creado correctamente', 3000, 'center');
          }
        } catch (error) {
          console.error('Error al recargar productos:', error);
        }
      }
    });
  }

  openProductDetail(product: ProductDto) {
    // Cargar último estado desde backend por id, y abrir diálogo con los datos
    this.productService.getProductById(product.id!)
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

  getConditionLabel(isNew: boolean): string {
    return isNew ? 'Nuevo' : 'Usado';
  }

  getReviewStatusLabel(status: number): string {
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
}
