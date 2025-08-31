import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { ViewHotelsComponent } from './view-hotels/view-hotels.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './guards/auth.guard';
import { ViewRoomsComponent } from './view-rooms/view-rooms.component';
import { PostRoomComponent } from './post-room/post-room.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { SearchHotelComponent } from './search-hotel/search-hotel.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { ViewReservationsComponent } from './view-reservations/view-reservations.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "add-location", component: AddLocationComponent, canActivate: [AuthGuard], data: {role: "Admin"}},
  { path: "add-hotel", component: AddHotelComponent, canActivate: [AuthGuard], data: {role: "Admin"} },
  { path: "view-hotels", component: ViewHotelsComponent, canActivate: [AuthGuard], data: {role: "Admin"} },
  { path: "hotels/:hotelId/rooms", component: ViewRoomsComponent,  canActivate: [AuthGuard], data: {roles: ["Admin", "Customer"]}},
  { path: "hotels/:hotelId/post-room", component: PostRoomComponent, canActivate: [AuthGuard], data: {role: "Admin"} },
  { path: "manage-users", component: ManageUsersComponent, canActivate: [AuthGuard], data: {role: "Admin"} },
  { path: "view-reservations", component: ViewReservationsComponent, canActivate: [AuthGuard], data: {role: "Admin"} },
  { path: "search-hotel", component: SearchHotelComponent, canActivate: [AuthGuard], data: {role: "Customer"} },
  { path: "rooms/:roomId/book-room", component: BookRoomComponent, canActivate: [AuthGuard], data: {role: "Customer"} },
  { path: "payment", component: PaymentComponent, canActivate: [AuthGuard], data: {role: "Customer"} },
  { path: "payment-success", component: PaymentSuccessComponent, canActivate: [AuthGuard], data: {role: "Customer"} },
  { path: "error", component: ErrorComponent},
  { path: "", redirectTo: "/home", pathMatch: 'full'},
  { path: "**", redirectTo: "/home", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
