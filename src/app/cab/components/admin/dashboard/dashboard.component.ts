import { Component ,OnInit} from '@angular/core';
import{RmTableComponent} from '../rm-table/rm-table.component';
import { AdminCabService } from '../../../services/admin-cab.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RmTableComponent,CommonModule],
  template: `
  <!--
    navbar  
-->
  <div class="navbar">
   <ul>
    <li><a class="current" href="/admin">Dashboard</a></li>
    <li><a href="/ride-manage">Rides</a></li>
    <li><a href="/customer">Customers</a></li>
    <li><a href="/employee">Employees</a></li>
  </ul>
  </div>
<!--
    quick cards 
-->
    <div class="quick-card">
    <div class="grid">
  <div class="card">
    <h1>78</h1>
    <p>
      Customers
    </p>
    <div class="shine"></div>
    <div class="background">
      <div class="tiles">
        <div class="tile tile-1"></div>
        <div class="tile tile-2"></div>
        <div class="tile tile-3"></div>
        <div class="tile tile-4"></div>

        <div class="tile tile-5"></div>
        <div class="tile tile-6"></div>
        <div class="tile tile-7"></div>
        <div class="tile tile-8"></div>

        <div class="tile tile-9"></div>
        <div class="tile tile-10"></div>
      </div>

      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
    </div>
  </div>
  <div class="card">
   <h1>{{totalCabs}}</h1>
    <p>
      Avaliable cabs
    </p>
    <div class="shine"></div>
    <div class="background">
      <div class="tiles">
        <div class="tile tile-1"></div>
        <div class="tile tile-2"></div>
        <div class="tile tile-3"></div>
        <div class="tile tile-4"></div>

        <div class="tile tile-5"></div>
        <div class="tile tile-6"></div>
        <div class="tile tile-7"></div>
        <div class="tile tile-8"></div>

        <div class="tile tile-9"></div>
        <div class="tile tile-10"></div>
      </div>

      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
    </div>
  </div>
  <div class="card">
    <h1>$100000</h1>
    <p>
      Earnings
    </p>
    <div class="shine"></div>
    <div class="background">
      <div class="tiles">
        <div class="tile tile-1"></div>
        <div class="tile tile-2"></div>
        <div class="tile tile-3"></div>
        <div class="tile tile-4"></div>

        <div class="tile tile-5"></div>
        <div class="tile tile-6"></div>
        <div class="tile tile-7"></div>
        <div class="tile tile-8"></div>

        <div class="tile tile-9"></div>
        <div class="tile tile-10"></div>
      </div>

      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
    </div>
  </div>
  <div class="card">
   <h1>{{totalEmployees}}</h1>
    <p>
      Employee
    </p>
    <div class="shine"></div>
    <div class="background">
      <div class="tiles">
        <div class="tile tile-1"></div>
        <div class="tile tile-2"></div>
        <div class="tile tile-3"></div>
        <div class="tile tile-4"></div>

        <div class="tile tile-5"></div>
        <div class="tile tile-6"></div>
        <div class="tile tile-7"></div>
        <div class="tile tile-8"></div>

        <div class="tile tile-9"></div>
        <div class="tile tile-10"></div>
      </div>

      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
    </div>
  </div>
</div>
    </div>
    <!--
    table 
-->
    
    <div class="table-div">
      <div>
  <!--for demo wrap-->
  <h1>BOOKED CABS</h1>
  <!-- <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
          <th>Cab</th>
          <th>pick-up</th>
          <th>Drop-off</th>
          <th>Charges</th>
          <th>Timing</th>
        </tr>
      </thead>
    </table
  </div> -->
  <app-rm-table></app-rm-table>
      </div>


    </div>
  `,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalCabs: number = 0;
  totalEmployees: number = 0;

  constructor(private adminService: AdminCabService) {}

  ngOnInit() {
    this.loadCounts();
  }

  private loadCounts() {
    // Get total cabs
    this.adminService.getCabCount().subscribe({
      next: (count) => {
        this.totalCabs = count;
      },
      error: (error) => {
        console.error('Error fetching cab count:', error);
        this.totalCabs = 0;
      }
    });

    // Get total employees
    this.adminService.getEmployeeCount().subscribe({
      next: (count) => {
        this.totalEmployees = count;
      },
      error: (error) => {
        console.error('Error fetching employee count:', error);
        this.totalEmployees = 0;
      }
    });
  }
}
