import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit {
  userName: string = '';
  userRole: string = '';
  roleImagePath: string = '';
  roleDisplayName: string = '';

  private roleNames: { [key: string]: string } = {
    'customer': 'Cliente',
    'moderator': 'Moderador',
    'logistics': 'Logística',
    'admin': 'Administrador'
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.authUser();
    
    if (!user) {
      // Si no hay usuario, redirigir a login
      this.router.navigate(['/login']);
      return;
    }

    this.userName = `${user.firstName} ${user.lastName}`;
    this.userRole = user.role;
    this.roleDisplayName = this.roleNames[user.role] || user.role;
    this.roleImagePath = `images/${user.role}-home.svg`;
  }
}
