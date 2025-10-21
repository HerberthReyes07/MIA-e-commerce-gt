import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeDto, EmployeeRegisterDto, UserService } from '../../../services/user-service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  hide = signal(true);

  positionOptions = [
    { value: 'moderator', label: 'Moderador' },
    { value: 'logistics', label: 'Logística' },
    { value: 'admin', label: 'Administrador' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeForm>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDto | null,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data?.id;
    this.form = this.fb.group({
      firstName: [this.data?.firstName || '', [Validators.required, Validators.maxLength(50)]],
      lastName: [this.data?.lastName || '', [Validators.required, Validators.maxLength(50)]],
      email: [this.data?.email || '', [Validators.required, Validators.email, Validators.maxLength(100)]],
      position: [this.data?.position || '', [Validators.required]],
      phone: [this.data?.phone || '', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]],
      password: [''] // solo requerido en creación
    });

    if (!this.isEditMode) {
      this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(100)]);
    } else {
      // Deshabilitar el campo position en modo edición
      this.form.get('position')?.disable();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      const v = this.form.value;
      if (this.isEditMode && this.data?.id) {
        const payload: EmployeeDto = {
          id: this.data.id,
          firstName: v.firstName,
          lastName: v.lastName,
          email: v.email,
          position: v.position,
          phone: v.phone
        };
        const updated = await this.userService.updateEmployee(payload);
        this.dialogRef.close(updated);
      } else {
        const payload: EmployeeRegisterDto = {
          firstName: v.firstName,
          lastName: v.lastName,
          email: v.email,
          position: v.position,
          phone: v.phone,
          password: v.password
        };
        const created = await this.userService.createEmployee(payload);
        this.dialogRef.close(created);
      }
    } catch (err) {
      console.error('Error al guardar empleado:', err);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(field: string): string {
    const c = this.form.get(field);
    if (!c) return '';
    if (c.hasError('required')) return 'Este campo es requerido';
    if (c.hasError('email')) return 'Correo no válido';
    if (c.hasError('minlength')) return `Mínimo ${c.getError('minlength').requiredLength} caracteres`;
    if (c.hasError('maxlength')) return `Máximo ${c.getError('maxlength').requiredLength} caracteres`;
    return '';
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
