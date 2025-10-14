import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Auth } from '../auth';
import { MatIconModule } from '@angular/material/icon';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {

  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');

  hide = signal(true);

  constructor(private auth: Auth) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
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

  async onSubmitLogin() {
    if (this.email.valid && this.password.valid) {
      try {
        await this.auth.login(this.email.value!, this.password.value!);
        console.log('Login successful');
        // Aquí puedes agregar navegación al dashboard
      } catch (error) {
        console.error('Login error:', error);
        // Aquí puedes mostrar mensaje de error al usuario
      }
    } /*else {
      // Marcar los campos como touched para mostrar errores
      this.email.markAsTouched();
      this.password.markAsTouched();
    }*/
  }

}
