import { Component } from '@angular/core';
import{CtmDetailsComponent } from '../ctm-details/ctm-details.component';
import{CtmFormComponent} from '../ctm-form/ctm-form.component';
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CtmDetailsComponent,CtmFormComponent],
  template: `
  <!--
    navbar  
-->
     <!--
    navbar  
-->
  <div class="navbar">
   <ul>
    <li><a href="/admin">Dashboard</a></li>
    <li><a href="/ride-manage">Rides</a></li>
    <li><a class="current" href="/customer">Customers</a></li>
    <li><a href="/employee">Employees</a></li>
  </ul>
  </div>
  <div class="header">
  <button class="button-85" role="button" (click)="onaddclick()">Add User</button>
  </div>
<!--cards-->
<div class="details">
  <app-ctm-details class="cards-per"></app-ctm-details>
  <!-- <app-ctm-details class="card-per"></app-ctm-details>
  <app-ctm-details class="card-per"></app-ctm-details> -->
</div>
@if (isPopupVisible==true)
  {<app-ctm-form [onClose]="closePopup"></app-ctm-form>}

  `,
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  isPopupVisible = false;
  onaddclick(){
      this.isPopupVisible=true;
  }
  closePopup = () => {
    this.isPopupVisible = false;
  };
}
