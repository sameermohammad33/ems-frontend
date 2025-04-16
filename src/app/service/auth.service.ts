import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const apiUrl = 'http://localhost:8099/EMS';

interface LoginResponse {
  user: any;
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  // Helper method to get headers with token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


  login(credentials: { name: string; email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${apiUrl}/User/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.accessToken);
        localStorage.setItem('user_id', response.user.userId);
        localStorage.setItem('role', response.user.role);
        this.loggedIn.emit(true);
      })
    );
  }

  register(userData: { name: string; email: string; password: string; role: string; contactNumber: string }): Observable<any> {
    return this.http.post(`${apiUrl}/User/register`, userData, { responseType: 'text' });
  }

  getAvailableEvents(): Observable<any[]> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.get<any[]>(`${apiUrl}/Event/viewAll`, { headers }).pipe(
        catchError(error => {
          console.error('Error fetching events:', error);
          return throwError(() => this.handleError(error));
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  createEvent(eventData: any): Observable<any> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.post(`${apiUrl}/Event/create`, eventData, { 
        headers,
        observe: 'response'
      }).pipe(
        catchError(error => {
          console.error('Error creating event:', error);
          return throwError(() => this.handleError(error));
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  private handleError(error: any): Error {
    if (error.status === 403) {
      return new Error('Session expired. Please login again.');
    }
    return new Error(error.message || 'An unknown error occurred');
  }
  
}
