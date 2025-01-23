import { Component } from '@angular/core';
import { UserinfoComponent } from '../userinfo/userinfo.component';
import {TourService} from "../../../tour/components/tour.service";
import {AuthService} from "../../services/services/auth.service";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
      UserinfoComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    emaildata:any=[]
        email:any;
        name:string="";
        age:number=0;
        gender:string="";
        role:string="";
        id:string='';
        password:string="";
        constructor( private authService: AuthService){}
        ngOnInit(): void {
            this.email = localStorage.getItem('email');
            this.authService.getUserDetails().subscribe(data => {
                this.emaildata = data.users;
                this.emaildata.forEach((user:any) => {
                    if (user.email === this.email) {
                        this.name = user.fullName;
                        this.age = user.age;
                        this.gender = user.gender;
                        this.role = user.role;
                        this.id = user.id;
                        this.password = user.password;
                    }
                });

            });
        }
}
