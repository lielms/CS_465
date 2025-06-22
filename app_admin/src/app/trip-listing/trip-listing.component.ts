import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  standalone: true,
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService],
  imports: [CommonModule, TripCardComponent]
})

export class TripListingComponent implements OnInit {
  
  trips!: Trip[];
  message: string = '';

  constructor (
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
    ) {  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getStuff(): void {
    this.tripDataService.getTrips()
    .subscribe({
      next: (value: any) => {
        this.trips = value;
        if(value.length > 0)
        {
          this.message = 'There are ' + value.length + ' trips available';
        }
        else{
          this.message = 'There were no trips retrieve from the database';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
