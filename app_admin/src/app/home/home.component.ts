import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ CommonModule ]
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}


