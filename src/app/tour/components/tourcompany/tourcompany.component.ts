import {Component, OnInit} from '@angular/core';
import {TourService} from "../tour.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
@Component({
  selector: 'app-tourcompany',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule

  ],
  templateUrl: './tourcompany.component.html',
  styleUrl: './tourcompany.component.css'
})
export class TourcompanyComponent implements OnInit{
  constructor(private fb: FormBuilder,private tourService: TourService) {
    this.tourCompanyForm = this.fb.group({
      nameOfCompany: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      website: ['', Validators.required],
      registrationId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  tourCompanyForm: FormGroup;
  companies: any;
  crud:number = 0;
  finalRecord:any=[];
  addPreviousValue(){

  }
  editcrud(){
    this.crud=2;
  }
  createcrud(){
    this.crud=1;
  }
  viewcrud(){
    this.crud=0;
  }

  onSubmit(){
    if (this.tourCompanyForm.valid) {
      console.log(this.tourCompanyForm.value);
      this.finalRecord=[...this.companies,this.tourCompanyForm.value];
     this.tourService.addTourCompany(this.finalRecord).subscribe(
        (response) => {
          console.log('Tour company created successfully!', response);
          this.tourCompanyForm.reset();
        },
        (error) => {
          console.error('Error creating tour company:', error);
        }
      );
    }
  }
  ngOnInit(): void {
    this.tourService.getTourCompanies().subscribe(data => {
        this.companies = data;
        console.log(this.companies);
        console.log(this.crud)

    })
  }
}
