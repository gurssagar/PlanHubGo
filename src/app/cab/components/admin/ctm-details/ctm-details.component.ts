import { Component } from '@angular/core';

@Component({
  selector: 'app-ctm-details',
  standalone: true,
  imports: [],
  template: `
  <div class="container">
  <div class="card">
<!--
  <div class="img-s">
          <div class="img-type" *ngIf="riderDetails.gender=="female"; else elseblock">
            <img src="https://img.freepik.com/free-vector/young-woman-white_25030-39527.jpg?ga=GA1.1.1791716734.1735568001&semt=ais_hybrid" alt="Person" class="card__image">
          </div>
          <ng-template #elseblock>
           <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-set-different-poses-white-background-illustration_632498-657.jpg?t=st=1737467782~exp=1737471382~hmac=a845e58aa5439d44333e68a93e9d7fcd8894250bb9f8512c0ee16277e2f93b0f&w=740" alt="Person" class="card__image">
          </ng-template>
        </div>
        -->
    <img src="https://img.freepik.com/free-vector/young-woman-white_25030-39527.jpg?ga=GA1.1.1791716734.1735568001&semt=ais_hybrid" alt="Person" class="card__image">
    <p class="card__name">Lily-Grace Colley</p>
    <p class="card__email">LilyGraceColley.email.com</p>
    <p class="card__email">9875056332</p>
    <div class="age">
    <p class="card__email">23 y/o</p>
    <p class="card__email">Female</p>
    </div>
    <button class="btn draw-border">Edit</button>
    <button class="btn draw-border">Delete</button>

  </div>
</div>

  `,
  styleUrl: './ctm-details.component.css'
})
export class CtmDetailsComponent {

}
