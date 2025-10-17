import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService, RegisterDto } from '../../../services/auth-service';
import { AxiosService } from '../../../services/axios-service';
import { SnackbarService } from '../../../services/snackbar-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  readonly firstName = new FormControl('', [Validators.required]);
  readonly lastName = new FormControl('', [Validators.required]);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  readonly address = new FormControl('', [Validators.required]);
  readonly phone = new FormControl('', [Validators.required]);

  firstNameErrorMessage = signal('');
  lastNameErrorMessage = signal('');
  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');
  addressErrorMessage = signal('');
  phoneErrorMessage = signal('');
  hide = signal(true);

  constructor(private axios: AxiosService, private auth: AuthService, private router: Router, private snackbar: SnackbarService) {

    merge(this.firstName.statusChanges, this.firstName.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateFirstNameErrorMessage());

    merge(this.lastName.statusChanges, this.lastName.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateLastNameErrorMessage());

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());

    merge(this.address.statusChanges, this.address.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateAddressErrorMessage());

    merge(this.phone.statusChanges, this.phone.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePhoneErrorMessage());
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  updateFirstNameErrorMessage() {
    if (this.firstName.hasError('required')) {
      this.firstNameErrorMessage.set('El nombre es obligatorio');
    }
  }

  updateLastNameErrorMessage() {
    if (this.lastName.hasError('required')) {
      this.lastNameErrorMessage.set('El apellido es obligatorio');
    }
  }

  updateEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.emailErrorMessage.set('El email es obligatorio');
    } else if (this.email.hasError('email')) {
      this.emailErrorMessage.set('El email no es válido');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.passwordErrorMessage.set('La contraseña es obligatoria');
    } else if (this.password.hasError('minlength')) {
      this.passwordErrorMessage.set('La contraseña debe tener al menos 6 caracteres');
    } else {
      this.passwordErrorMessage.set('');
    }
  }

  updateAddressErrorMessage() {
    if (this.address.hasError('required')) {
      this.addressErrorMessage.set('La dirección es obligatoria');
    }
  }

  updatePhoneErrorMessage() {
    if (this.phone.hasError('required')) {
      this.phoneErrorMessage.set('El teléfono es obligatorio');
    }
  }

  async onSubmitRegister() {

    if (this.firstName.valid && this.lastName.valid && this.email.valid
      && this.password.valid && this.address.valid && this.phone.valid) {
      try {
        const registerData: RegisterDto = {
          firstName: this.firstName.value!,
          lastName: this.lastName.value!,
          email: this.email.value!,
          password: this.password.value!,
          address: this.address.value!,
          phone: this.phone.value!
        };

        await this.auth.register(registerData);
        console.log('Registration successful');
        // Redirigir al home del cliente
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Register error:', error);
        const message = this.axios.getErrorMessage(error);
        this.snackbar.showError("Error en el registro: " + message);
      }
    }

  }

}
