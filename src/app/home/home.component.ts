import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CreateEventComponent } from '../create-event/create-event.component';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CreateEventComponent,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role: string = '';
  events: any[] = [];
  isLoading: boolean = false;
  showCreateEventForm: boolean = false;
  showEvents: boolean = true;

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
    if (this.showCreateEventForm) {
      this.showEvents = false;
    }
  }

  showAvailableEvents(): void {
    this.showEvents = !this.showEvents;
    if (this.showEvents) {
      this.showCreateEventForm = false;
    }
  }

  bookEvent(eventId: number): void {
    console.log('Booking event:', eventId);
    // Add your booking logic here
    // Example: this.router.navigate(['/book', eventId]);
    alert(`Booking tickets for event ${eventId}`);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.router.navigate(['/login']);
  }
}
