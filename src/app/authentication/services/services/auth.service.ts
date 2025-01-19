import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import map operator
import { RegisterPostData, User } from '../../models/interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  registerUser(postData: RegisterPostData) {
    return this.http.post(`${this.baseUrl}/users`, postData);
  }

  getUserDetails(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}/users?email=${email}&password=${password}`
    );
  }

  // Check if email already exists in mock database
  isEmailUnique(email: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`).pipe(
      map(users => users.length === 0) // Using the map operator here
    );
  }
}
