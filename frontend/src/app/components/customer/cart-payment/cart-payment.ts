import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CartDetailsDto, CartService } from '../../../services/cart-service';
import { CreditCardService, CreditCardDto } from '../../../services/credit-card-service';
import { OrderService } from '../../../services/order-service';
import { SnackbarService } from '../../../services/snackbar-service';
import { ImageService } from '../../../services/image-service';

@Component({
  selector: 'app-cart-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './cart-payment.html',
  styleUrl: './cart-payment.css'
})
export class CartPayment implements OnInit {
  cartItems: CartDetailsDto[] = [];
  savedCards: CreditCardDto[] = [];
  isLoadingCart = false;
  isLoadingCards = false;

  // Forms
  cardSelectionForm: FormGroup;
  newCardForm: FormGroup;

  // UI state
  selectedPaymentMethod: 'saved' | 'new' = 'saved';
  selectedSavedCardId: number | null = null;
  saveNewCard = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cartService: CartService,
    private cardService: CreditCardService,
    private orderService: OrderService,
    private snackbarService: SnackbarService,
    private imageService: ImageService
  ) {
    // Form para selección de método de pago
    this.cardSelectionForm = this.fb.group({
      paymentMethod: ['saved', Validators.required]
    });

    // Form para nueva tarjeta
    this.newCardForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardHolder: ['', Validators.required],
      expirationDate: [null, Validators.required],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      alias: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.loadCartDetails(),
      this.loadSavedCards()
    ]);
  }

  async loadCartDetails(): Promise<void> {
    this.isLoadingCart = true;
    try {
      this.cartItems = await this.cartService.getCartDetails();
    } catch (err) {
      console.error('Error al cargar carrito:', err);
      this.cartItems = [];
    } finally {
      this.isLoadingCart = false;
    }
  }

  async loadSavedCards(): Promise<void> {
    this.isLoadingCards = true;
    try {
      this.savedCards = await this.cardService.getCreditCards();
      // Si no hay tarjetas guardadas, forzar a usar nueva
      if (this.savedCards.length === 0) {
        console.log('No hay tarjeras guardadas');
        this.selectedPaymentMethod = 'new';
        this.cardSelectionForm.patchValue({ paymentMethod: 'new' });
      }
    } catch (err) {
      console.error('Error al cargar tarjetas:', err);
      this.savedCards = [];
      this.selectedPaymentMethod = 'new';
    } finally {
      this.isLoadingCards = false;
    }
  }

  getImageUrl(imagePath: string): string {
    return this.imageService.getImageUrl(imagePath);
  }

  getItemTotal(item: CartDetailsDto): number {
    return item.productPrice * item.quantity;
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + this.getItemTotal(item), 0);
  }

  onPaymentMethodChange(method: 'saved' | 'new'): void {
    this.selectedPaymentMethod = method;
  }

  selectSavedCard(cardId: number): void {
    this.selectedSavedCardId = cardId;
  }

  isStep2Valid(): boolean {
    if (this.selectedPaymentMethod === 'saved') {
      return this.selectedSavedCardId !== null;
    } else {
      return this.newCardForm.valid;
    }
  }

  goBackToCart(): void {
    this.router.navigate(['/mi-carrito']);
  }

  async processPayment(): Promise<void> {
    // TODO: Implementar lógica de pago cuando el backend esté listo
    /* console.log('Procesando pago...');
    console.log('Método:', this.selectedPaymentMethod); */

    let cardData: CreditCardDto | null = null;

    if (this.saveNewCard) {
      cardData = {
        id: 0, // El ID se generará en el backend
        cardNumber: this.newCardForm.value.cardNumber,
        cardHolder: this.newCardForm.value.cardHolder,
        expirationDate: this.formatExpirationDate(this.newCardForm.value.expirationDate),
        cvv: this.newCardForm.value.cvv,
        alias: this.newCardForm.value.alias
      };
    }

    try {
      const order = await this.orderService.placeOrder(cardData);
      console.log('Orden realizada:', order);
      this.cartService.clearCart(); // Limpiar el carrito después de la orden
      this.goBackToCart();
      this.snackbarService.showSuccess("Compra realizada con éxito");
    } catch (err) {
      console.error('Error al realizar la orden:', err);
    }

  }

  maskCardNumber(cardNumber: string): string {
    if (!cardNumber || cardNumber.length < 4) return '****';
    return '**** **** **** ' + cardNumber.slice(-4);
  }

  // Formatea la fecha del datepicker a MM/YY para enviar al backend
  formatExpirationDate(date: Date | null): string {
    if (!date) return '';
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${year}`;
  }

  // Método para manejar la selección de mes y año en el datepicker
  setMonthAndYear(normalizedMonthAndYear: Date, datepicker: any): void {
    const ctrlValue = normalizedMonthAndYear;
    this.newCardForm.patchValue({ expirationDate: ctrlValue });
    datepicker.close();
  }
}
