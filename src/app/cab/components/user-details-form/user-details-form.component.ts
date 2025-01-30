import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-details-form',
  template: `
    <div class="form-popup">
      <form (ngSubmit)="onSubmit($event)"> <div *ngIf="submitted && !name" class="error">Name is required</div>
        <label for="name">Name:</label>
        <input type="text" id="name" [(ngModel)]="name" name="name" required /> 

        <label for="email">Email:</label>
        <input type="email" id="email" [(ngModel)]="email" name="email" required /> 

        <button type="submit">Submit</button>
        <button type="button" (click)="onClose()">Cancel</button>
      </form>
    </div>
  `,
  styleUrls: ['./user-details-form.component.css']
})
export class UserDetailsFormComponent {
  @Output() formSubmit = new EventEmitter<{ name: string; email: string }>();
  @Output() close = new EventEmitter<void>();
  submitted = false;
  name: string = '';
  email: string = '';

//  constructor(private router: Router) {}
  onSubmit(event: Event) {
    event.preventDefault();
    this.formSubmit.emit({ name: this.name, email: this.email });
  }

  onClose() {
    this.close.emit();
  }
}

