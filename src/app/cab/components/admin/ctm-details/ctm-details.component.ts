import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../model/employee';
import { AdminCabService } from '../../../services/admin-cab.service';
import { FormsModule } from '@angular/forms';
import { CommonModule,  } from '@angular/common';

@Component({
  selector: 'app-ctm-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container">
      <div class="card" *ngFor="let employee of paginatedEmployees">
        <img
          [src]="employee.Gender === 'Female'?'https://img.freepik.com/free-vector/young-woman-white_25030-39527.jpg?ga=GA1.1.1791716734.1735568001&semt=ais_hybrid':'../../../../../assets/Young_man.jpg'"
          alt="Person"
          class="card__image"
        />
        <p class="card__name">{{ employee.EmployeeName }}</p>
        <p class="card__email">{{ employee.EmployeeEmail }}</p>
        <p class="card__email">{{ employee.phone }}</p>
        <div class="age">
          <p class="card__email">{{ getAge(employee.DOB) }} y/o</p>
          <p class="card__email">{{ employee.Gender }}</p>
        </div>
        <button class="btn draw-border" (click)="openEditModal(employee)">
          Edit
        </button>
        <button class="btn draw-border" (click)="deleteEmployee(employee.id)">
          Delete
        </button>
      </div>
    </div>
    <!-- Pagination Controls -->
    <div class="pagination-container">
      <div class="pagination-controls">
        <button 
          class="pagination-button" 
          [class.disabled]="currentPage === 1"
          (click)="changePage(currentPage - 1)" 
          [disabled]="currentPage === 1"
        >
          ←
        </button>
        
        <div class="page-numbers">
          @for (pageNum of getPageNumbers(); track pageNum) {
            <button 
              class="page-number" 
              [class.active]="pageNum === currentPage"
              (click)="changePage(pageNum)"
            >
              {{ pageNum }}
            </button>
          }
        </div>

        <button 
          class="pagination-button" 
          [class.disabled]="currentPage === totalPages"
          (click)="changePage(currentPage + 1)" 
          [disabled]="currentPage === totalPages"
        >
          →
        </button>
      </div>
      <div class="page-info">
        Page {{ currentPage }} of {{ totalPages }}
      </div>
    </div>

    <!-- Edit Modal -->
    <div *ngIf="isEditModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" (click)="closeEditModal()">&times;</span>
        <h2>Edit Employee Details</h2>
        <form (ngSubmit)="saveEmployeeDetails()">
          <div class="form-group">
            <label for="EmployeeName">Employee Name:</label>
            <input
              type="text"
              id="EmployeeName"
              name="EmployeeName"
              [(ngModel)]="editedEmployee.EmployeeName"
              required
            />
          </div>
          <div class="form-group">
            <label for="EmployeeEmail">Employee Email:</label>
            <input
              type="email"
              id="EmployeeEmail"
              name="EmployeeEmail"
              [(ngModel)]="editedEmployee.EmployeeEmail"
              required
            />
          </div>
          <div class="form-group">
            <label for="phone">Phone:</label>
            <input
              type="number"
              id="phone"
              name="phone"
              [(ngModel)]="editedEmployee.phone"
              required
            />
          </div>
          <div class="form-group">
            <label for="employementType">Employment Type:</label>
            <input
              type="text"
              id="employementType"
              name="employementType"
              [(ngModel)]="editedEmployee.employementType"
              required
            />
          </div>
          <div class="form-group">
            <label for="DOB">Date of Birth:</label>
            <input
              type="text"
              id="DOB"
              name="DOB"
              [(ngModel)]="editedEmployee.DOB"
              required
            />
          </div>
          <div class="form-group">
            <label for="Gender">Gender:</label>
            <input
              type="text"
              id="Gender"
              name="Gender"
              [(ngModel)]="editedEmployee.Gender"
              required
            />
          </div>
          <button type="submit" class="save-btn">Save</button>
        </form>
      </div>
    </div>
  `,
  styleUrl: './ctm-details.component.css',
})
export class CtmDetailsComponent implements OnInit {
  employees: Employee[] = [];
  paginatedEmployees: Employee[] = [];
  currentPage = 1;
  pageSize = 4;
  totalPages = 1;
  isEditModalOpen = false;
  editedEmployee: Employee = {} as Employee;

  constructor(private adminCabService: AdminCabService) {}

  ngOnInit(): void {
    this.loadEmployeeData();
  }

  loadEmployeeData() {
    this.adminCabService
      .getEmployeeList()
      .then((employees) => {
        this.employees = employees;
        this.totalPages = Math.ceil(this.employees.length / this.pageSize);
        this.updatePaginatedEmployees();
      })
      .catch((error) => console.error('Error fetching employees:', error));
  }
  updatePaginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEmployees = this.employees.slice(startIndex, endIndex);
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedEmployees();
    }
  }
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, this.currentPage - 2);
      let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  openEditModal(employee: Employee) {
    this.editedEmployee = { ...employee };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  saveEmployeeDetails() {
    this.adminCabService
      .updateEmployee(this.editedEmployee.id, this.editedEmployee)
      .then(() => {
        console.log('Employee details updated successfully');
        this.closeEditModal();
        this.loadEmployeeData();
      })
      .catch((error) => console.error('Error updating employee', error));
  }

  deleteEmployee(employeeId: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.adminCabService
        .deleteEmployee(employeeId)
        .then(() => {
          console.log(`Employee with ID: ${employeeId} deleted successfully`);
          this.loadEmployeeData();
        })
        .catch((error) => {
          console.error(
            `Error deleting employee with ID: ${employeeId}`,
            error
          );
        });
    }
  }
  getAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
