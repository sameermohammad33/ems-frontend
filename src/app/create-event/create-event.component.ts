import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  createEventForm; // Declare without initialization
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form in the constructor
    this.createEventForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      availableTickets: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.createEventForm.invalid || this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.createEvent(this.createEventForm.value).subscribe({
      next: () => {
        alert('Event created successfully!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err.message;
        alert(`Error: ${err.message}`);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}