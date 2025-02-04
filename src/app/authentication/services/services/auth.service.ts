import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import { map } from 'rxjs/operators'; // Import map operator
import { RegisterPostData, User } from '../../models/interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerUser(userData: any) {
    return this.http.put(`${this.baseUrl}/3`, userData);
  }

  getUserDetails(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(`${this.baseUrl}/3`);

  }

  // Check if email already exists in mock database
  isEmailUnique(email: string): Observable<boolean> {
    return this.http.get<{users: User[]}>(`${this.baseUrl}/3`).pipe(
        map(response => !response.users.some(user => user.email === email))
    );
  }
  getId() {
    return this.http.get(`${this.baseUrl}/7`).pipe(
      map(response => {
        const users: any = response;
        const employee: any = 'cabEmployee';
        const tobe = users[employee].map((user: any) => user.id);
        return tobe;
      })
    );
  }
}
