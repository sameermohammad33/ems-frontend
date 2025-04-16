import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Event } from '../models/event.model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AvailableEventsComponent } from '../available-events/available-events.component';
import { CreateEventComponent } from '../create-event/create-event.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CreateEventComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role: string = '';
  events: any[] = [];
  isLoading = false;
  showCreateEventForm = false;
  showEvents = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.role = localStorage.getItem('role') || '';
      if (this.role === 'USER') {
        this.fetchEvents();
      }
    }
  }

  fetchEvents(): void {
    this.isLoading = true;
    this.authService.getAvailableEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        this.isLoading = false;
      }
    });
  }

  createEvent(): void {
    this.showCreateEventForm = !this.showCreateEventForm;
  }

  showAvailableEvents(): void {
    this.showEvents = !this.showEvents;
  }

  bookEvent(eventId: number): void {
    console.log('Booking event:', eventId);
    // Implement booking logic
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.router.navigate(['/login']);
  }
}