import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  
  constructor(private router: Router, private authService: AuthService) {}

  login() {
    // TODO ir al backend
    // obtener un usuario

    this.authService.login().subscribe((usuario) => {
      if (usuario.id) {
        this.router.navigate(['./heroes']);
      }
    });
  }
}
