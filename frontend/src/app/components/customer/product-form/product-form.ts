import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { CategoryDto, CategoryService } from '../../../services/category-service';
import { ProductService, ProductDto, CreateProductPayload } from '../../../services/product-service';
import { environment } from '../../../../environments/environment';

export interface ProductData {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  condition: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit {
  productForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isEditMode: boolean = false;
  categories: CategoryDto[] = [];
  categoriesTouched: boolean = false;

  conditionOptions = [
    { value: 'nuevo', label: 'Nuevo' },
    { value: 'usado', label: 'Usado' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductForm>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDto | null,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().then(categories => {
      this.categories = categories;
    });

    this.isEditMode = !!this.data?.id;

    // Importante: usar copias para evitar mutar el objeto inyectado
    const initialCategories = this.data?.categories ? [...this.data.categories] : [];

    this.productForm = this.fb.group({
      name: [this.data?.name || '', [Validators.required, Validators.maxLength(100)]],
      description: [this.data?.description || '', [Validators.required, Validators.maxLength(500)]],
      price: [this.data?.price || '', [Validators.required, Validators.min(0.01)]],
      stock: [this.data?.stock || '', [Validators.required, Validators.min(0)]],
      condition: [this.data?.isNew ? 'nuevo' : 'usado', Validators.required],
      categories: [initialCategories, Validators.required]
    });

    if (this.data?.imageUrl) {
      this.imagePreview = `${environment.apiBaseUrl}${this.data.imageUrl}`;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Preview de la imagen
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.valid) {
      try {
        const formValues = this.productForm.value;
        
        // Construir el objeto ProductDto
        const product: ProductDto = {
          name: formValues.name,
          description: formValues.description,
          price: formValues.price,
          stock: formValues.stock,
          isNew: formValues.condition === 'nuevo',
          categories: formValues.categories as CategoryDto[],
        };

        // Si estamos editando, incluir el ID
        if (this.data?.id) {
          product.id = this.data.id;
        }

        // Crear el payload
        const payload: CreateProductPayload = {
          product,
          image: this.selectedFile
        };

        // Enviar al backend
        if (this.data?.id) {
          const updatedProduct = await this.productService.updateProduct(this.data.id, payload);
          //console.log('Producto actualizado:', updatedProduct);
          this.dialogRef.close(updatedProduct);
        } else {
          const createdProduct = await this.productService.createProduct(payload);
          //console.log('Producto creado:', createdProduct);
          this.dialogRef.close(createdProduct);
        }
      } catch (error) {
        console.error('Error al crear producto:', error);
        // Aquí podrías mostrar un snackbar con el error
      }
    } else {
      // Marcar todos los campos como touched para mostrar errores
      this.categoriesTouched = true;
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
    }
  }

  getErrorMessage(fieldName: string): string {
    const control = this.productForm.get(fieldName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('maxLength')) {
      return `Máximo ${control.errors?.['maxLength'].requiredLength} caracteres`;
    }
    if (control?.hasError('min')) {
      return `El valor mínimo es ${control.errors?.['min'].min}`;
    }
    return '';
  }

  toggleCategory(categoryId: number): void {
    const currentCategories = [...(this.productForm.get('categories')?.value as CategoryDto[])];
    const index = currentCategories.findIndex(cat => cat.id === categoryId);
    this.categoriesTouched = true;

    if (index >= 0) {
      // Si ya está seleccionada, la removemos
      currentCategories.splice(index, 1);
    } else {
      // Si no está seleccionada, la agregamos
      const category = this.categories.find(cat => cat.id === categoryId);
      if (category) {
        currentCategories.push(category);
      }
    }
    //console.log('Categorías seleccionadas:', currentCategories);
    this.productForm.patchValue({ categories: currentCategories });
  }

  isCategorySelected(categoryId: number): boolean {
    const currentCategories = this.productForm.get('categories')?.value as CategoryDto[];
    return currentCategories.some(cat => cat.id === categoryId);
  }
}
