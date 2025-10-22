import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService, EmployeeDto } from '../../../services/user-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeForm } from '../employee-form/employee-form';
import { SnackbarService } from '../../../services/snackbar-service';
import { AxiosService } from '../../../services/axios-service';

@Component({
  selector: 'app-employees-management',
  standalone: true,
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
  templateUrl: './employees-management.html',
  styleUrl: './employees-management.css'
})
export class EmployeesManagement implements AfterViewInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'position', 'phone', 'registrationDate', 'actions'];
  dataSource: MatTableDataSource<EmployeeDto> = new MatTableDataSource<EmployeeDto>([]);
  isEmpty = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog, private http: AxiosService, private snackbarService: SnackbarService) {}

  async ngAfterViewInit(): Promise<void> {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    try {
      const employees = await this.userService.getAllEmployees();
      this.dataSource.data = employees;
      this.isEmpty = employees.length === 0;
    } catch (err) {
      console.error('Error al cargar empleados:', err);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEmployeeForm(employee?: EmployeeDto) {
    //console.log('Empleado para editar:', employee);
    const dataClone = employee ? { ...employee } : null;
    const dialogRef = this.dialog.open(EmployeeForm, {
      width: '650px',
      data: dataClone
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          const employees = await this.userService.getAllEmployees();
          this.dataSource.data = employees;
          this.isEmpty = employees.length === 0;
          this.paginator.firstPage();

          if (employee) {
            this.snackbarService.showSuccess('Empleado actualizado correctamente');
          } else {
            this.snackbarService.showSuccess('Empleado creado correctamente');
          }

        } catch (err) {
          console.error('Error al recargar empleados:', err);
          const message = this.http.getErrorMessage(err);
          this.snackbarService.showError('Error al recargar empleados: ' + message);
        }
      }
    });
  }

  formatDate(dateStr?: string): string {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  }

  getPositionLabel(position: string): string {
    switch (position) {
      case 'logistics': return 'Logística';
      case 'moderator': return 'Moderador';
      case 'admin': return 'Administrador';
      default: return 'Desconocido';
    }
  }

}
