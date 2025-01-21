import { Routes } from '@angular/router';
import {authGuard, ServiceAuthGuard} from './authentication/models/guards/auth.guard';
import { AdminComponent } from './authentication/components/admin/admin.component';
import { HomeComponent } from './authentication/components/home/home.component';
import { LoginComponent } from './authentication/components/login/login.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { CabComponent } from './authentication/components/servies/cab/cab.component';
import { FlightComponent } from './authentication/components/servies/flight/flight.component';
import { HotelComponent } from './authentication/components/servies/hotel/hotel.component';
import { ServiceProviderComponent } from './authentication/components/servies/service-provider/service-provider.component';
import { TourComponent } from './authentication/components/servies/tour/tour.component';
import { InfoComponent } from "./tour/components/info/info.component";
import { TourPlanComponent } from "./tour/components/tour-plan/tour-plan.component";
import {GalleryComponent} from "./tour/components/gallery/gallery.component";
import {CompareComponent} from "./tour/components/compare/compare.component";
import {LocationComponent} from "./tour/components/location/location.component";
import {TourHomeComponent} from "./tour/components/home/home.component";
import {AddtoursComponent} from "./tour/components/addtours/addtours.component"
import {ToursComponent} from "./tour/components/tours/tours.component";
import {BookComponent} from "./tour/components/book/book.component";
import {ManageBookingComponent} from "./tour/components/manage-booking/manage-booking.component";
import {ProviderRegisterComponent} from "./authentication/components/provider-register/provider-register.component";


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'provider-register', component: ProviderRegisterComponent },

  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'service-provider', component: ServiceProviderComponent, canActivate: [ServiceAuthGuard] },
  { path: 'cab', component: CabComponent, canActivate: [authGuard] },  // Updated route
  //{ path: 'flight', component: FlightComponent, canActivate: [authGuard] },  // Updated route
  //{ path: 'hotel', component: HotelComponent, canActivate: [authGuard] },  // Updated route
  //{ path: 'tour-package', component: TourComponent, canActivate: [authGuard] },  // Updated route
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: "tour/info/:id",
    component: InfoComponent,
    canActivate: [authGuard]
  },
  {
    path: "tour/tour-plan/:id",
    component: TourPlanComponent,
    canActivate: [authGuard]
  },
  {
    path: "tour/gallery/:id",
    component: GalleryComponent,
    canActivate: [authGuard]
  },
  {
    path: "tour/location/:id",
    component: LocationComponent,
    canActivate: [authGuard]
  },
  {
    path: "tour/compare",
    component: CompareComponent,
    canActivate: [authGuard]
  },
  {
    path: "tour",
    component: TourHomeComponent,
    canActivate: [authGuard]
  },
  {
    path:"tour/addtours",
    component:AddtoursComponent,
    canActivate: [ServiceAuthGuard]
  },
  {
    path:"tour/tours/:id",
    component:ToursComponent,
    canActivate: [authGuard]
  },
  {
    path:"tour/booking/:id",
    component:BookComponent,
    canActivate: [authGuard]
  },
  {
    path:"tour/manage",
    component:ManageBookingComponent,
    canActivate: [authGuard]
  }
];
