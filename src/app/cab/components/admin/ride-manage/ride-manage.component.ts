import { Component } from '@angular/core';
import { RmTableComponent } from '../rm-table/rm-table.component';
import {CabFormComponent} from '../cab-form/cab-form.component';
@Component({
  selector: 'app-ride-manage',
  standalone: true,
  imports: [RmTableComponent,CabFormComponent],
  template: `
  <!--
    navbar  
-->
<div class="navbar">
   <ul>
    <li><a href="/admin">Dashboard</a></li>
    <li><a class="current" href="/ride-manage">Rides</a></li>
    <li><a href="/customer">Customers</a></li>
    <li><a href="/employee">Employees</a></li>
  </ul>
  </div> 

  <!--
    types of ride 
-->
    <h1 class="h1-table">ALL RIDES</h1>
    <div class="ride-types">
    <div class="container">
 <div class="wrapper">
   <div class="banner-image"> </div>
   <h1 class="h1-card">SUV</h1>
   <p>Ideal for group travel, airport<br/>
   transfers, and premium rides.</p>
  </div>
    </div>
    <div class="container">
 <div class="wrapper">
   <div class="banner-image1"> </div>
   <h1 class="h1-card">Luxury</h1>
   <p>High-end service for corporate<br/>
   clients, special occasions</p>
  </div>
    </div>
    <div class="container">
 <div class="wrapper">
   <div class="banner-image2"> </div>
   <h1 class="h1-card">Hatchback</h1>
   <p>Cost-effective, perfect for short<br/>
   rides, and everyday commutes.</p>
  </div>
    </div>
    
    
</div>
<div class="ride-types">
<div class="container">
 <div class="wrapper">
   <div class="banner-image3"> </div>
   <h1 class="h1-card">Van</h1>
   <p>Spacious, perfect for carrying a<br/>
   lots of people.</p>
  </div>
    </div>
    <div class="container">
 <div class="wrapper">
   <div class="banner-image4"> <img src="" alt=""></div>
   <h1 class="h1-card">Sedan</h1>
   <p>Sleek, comfy, good for families<br/>
   and long drives.</p>
  </div>
    </div>
    <div class="container">
 <div class="wrapper">
   <div class="banner-image5"> </div>
   <h1 class="h1-card">Ola</h1>
   <p>Convenient, app-based ride,  <br/>
   best for getting around.</p>
  </div>
    </div>
</div>
    <!--table-1-->
    <div class="table-header"><h1 class="h1-table">all cabs</h1>
    <div class="bcon"><button class="button-85" role="button" (click)="onaddclick()"><h4>ADD CAB</h4></button></div></div>
    <app-rm-table></app-rm-table>
    @if (isPopupVisible==true)
       {<app-cab-form [onClose]="closePopup"></app-cab-form>}
  

  `,
  styleUrl: './ride-manage.component.css'
})
export class RideManageComponent {
isPopupVisible = false;
onaddclick(){
    this.isPopupVisible=true;
}
closePopup = () => {
  this.isPopupVisible = false;
};
}
