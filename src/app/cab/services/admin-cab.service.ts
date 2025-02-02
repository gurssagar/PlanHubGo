// admin-cab.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the map operator
import { CabCardDetails } from '../model/cabcard-details';
import { Employee } from '../model/employee';
import { AnyPtrRecord } from 'node:dns';

@Injectable({ providedIn: 'root' })
export class AdminCabService {
  private apiUrl = 'http://localhost:3000/7';
  private employeeApiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createNewCab(cabData: CabCardDetails): Observable<CabCardDetails> {
    return this.http.post<CabCardDetails>(this.apiUrl, cabData);
  }

  createEmployee(employeeData: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeeApiUrl, employeeData);
  }

   getCabCount(){
    return this.http.get<CabCardDetails[]>(this.apiUrl)
  }

  getEmployeeCount(){
    return this.http.get<Employee[]>(this.apiUrl)
  }
  getEmployeeList(): Observable<any> {
  return this.http.get(this.apiUrl)
}
  
  updateEmployee(employeeId: string, employeeData: Employee): Promise<Employee> {
    return this.http.put<Employee>(`${this.employeeApiUrl}/${employeeId}`, employeeData).toPromise().then(employee => {
      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    });
  }
  
  deleteEmployee(employeeId: string): Promise<void> {
    return this.http.delete<void>(`${this.employeeApiUrl}/${employeeId}`).toPromise();
  }
}
