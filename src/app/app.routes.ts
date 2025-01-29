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
import {DashboardComponent} from "./authentication/components/dashboard/dashboard.component";

import {TourcompanyComponent} from "./tour/components/tourcompany/tourcompany.component";
import {ShowcompanyComponent} from "./tour/components/showcompany/showcompany.component";
import {AdminDashboardComponent} from "./tour/components/admin-dashboard/admin-dashboard.component";

import { AboutComponent } from './hotels/components/about/about.component';
import { ContactComponent } from './hotels/components/contact/contact.component';
import { SectionComponent } from './hotels/components/section/section.component';
import { SearchResultsComponent } from './hotels/components/search-results/search-results.component';
import { BookingFormComponent } from './hotels/components/booking-form/booking-form.component';
import { PageComponent } from './hotels/components/page/page.component';
import { HotelRoomComponent } from './hotels/components/hotel-room/hotel-room.component';
import { BookingHistoryComponent } from './hotels/components/booking-history/booking-history.component';
import { AdSidebarComponent } from './hotels/components/admin-panel/ad-sidebar/ad-sidebar.component';
import { AdminPanelComponent } from './hotels/components/admin-panel/admin-panel.component';
import { AdHotelDeatilsComponent } from './hotels/components/admin-panel/ad-hotel-deatils/ad-hotel-deatils.component';
import { AdRoomDeatilsComponent } from './hotels/components/admin-panel/ad-room-deatils/ad-room-deatils.component';
import { AdminBookingDetailsComponent } from './hotels/components/admin-panel/ad-booking-details/ad-booking-details.component';
import { ServiceHotelComponent } from './hotels/components/service-provider-panel/s-hotel/s-hotel.component';
import { LocationComponent as location } from './hotels/components/location/location.component';
import { ServiceProviderComponent as serviceProvider } from './hotels/components/service-provider-panel/service-provider/s-provider.component';



export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'provider-register', component: ProviderRegisterComponent },
  { path:'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

  { path: 'hotel', component: SectionComponent, canActivate: [authGuard] },  
  { path: 'search-results', component: SearchResultsComponent, canActivate: [authGuard] },
  { path: 'location', component: location, canActivate: [authGuard] }, 
  { path: 'hotel/room/:roomId/booking-form', component: BookingFormComponent, canActivate: [authGuard] },
  {
    path: 'page', component: PageComponent, canActivate: [authGuard],
    children: [
      { path: 'hotel-room/:hotelId', 
        component: HotelRoomComponent, canActivate: [authGuard] },
    ]
  },
  { path: 'booking-history', component: BookingHistoryComponent, canActivate: [authGuard] },
  { path: 'ad-sidebar', component: AdSidebarComponent, canActivate: [authGuard]},
  {
    path: 'admin-panel', component: AdminPanelComponent, canActivate: [authGuard],
    children: [
      { path: 'ad-hotel-deatils', component: AdHotelDeatilsComponent, canActivate: [authGuard] },
      { path: 'ad-room-details', component: AdRoomDeatilsComponent, canActivate: [authGuard] },
      { path: 'ad-booking-history', component: AdminBookingDetailsComponent, canActivate: [authGuard]},
    ]
  },
  {
    path: 's-provider', component: serviceProvider, canActivate: [ServiceAuthGuard],
    children: [
      {
        path: 'service-hotel',
        component: ServiceHotelComponent, canActivate: [ServiceAuthGuard],
      },
    ]
  },

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
  },
  {
    path:'tour/tourcompany',
    component:TourcompanyComponent,
    canActivate: [authGuard]
  },
  {
    path:'tour/showcompany',
    component:ShowcompanyComponent,
    canActivate: [authGuard]
  },
  {
    path:'admins',
    component:AdminDashboardComponent,
  },

];
