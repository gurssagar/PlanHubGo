import { Routes } from '@angular/router';
import { authGuard } from './authentication/models/guards/auth.guard';
import { AdminComponent } from './authentication/components/admin/admin.component';
import { HomeComponent } from './authentication/components/home/home.component';
import { LoginComponent } from './authentication/components/login/login.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { CabComponent } from './authentication/components/servies/cab/cab.component';
import { FlightComponent } from './authentication/components/servies/flight/flight.component';
import { HotelComponent } from './authentication/components/servies/hotel/hotel.component';
import { ServiceProviderComponent } from './authentication/components/servies/service-provider/service-provider.component';
import { TourComponent } from './authentication/components/servies/tour/tour.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'service-provider', component: ServiceProviderComponent, canActivate: [authGuard] },
  { path: 'cab', component: CabComponent, canActivate: [authGuard] },  // Updated route
  { path: 'flight', component: FlightComponent, canActivate: [authGuard] },  // Updated route
  { path: 'hotel', component: HotelComponent, canActivate: [authGuard] },  // Updated route
  { path: 'tour-package', component: TourComponent, canActivate: [authGuard] },  // Updated route
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
