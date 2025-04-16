import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-available-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './available-events.component.html',
  styleUrls: ['./available-events.component.css']
})
export class AvailableEventsComponent implements OnInit {
  events: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.getAvailableEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.error('Failed to load events:', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  bookTickets(eventId: number): void {
    console.log('Booking tickets for event: ', eventId);
  }

}
