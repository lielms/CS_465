import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent implements OnInit {
  public formError: string = '';
  public credentials = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() { }

  public onLoginSubmit(evt: Event): void {
    evt.preventDefault();
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
      return;
    } else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    const newUser = {
      email: this.credentials.email
    } as User;
    this.authenticationService.login(newUser, this.credentials.password)
      .then((value) => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['list-trips']);
        } else {
          this.formError = 'Login failed. Please try again.';
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        this.formError = 'There was a problem logging in.';
      });
    }
}