import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { ViewHotelsComponent } from './view-hotels/view-hotels.component';
import { ErrorComponent } from './error/error.component';
import { AuthInterceptor } from '../services/auth.interceptor';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { Router } from '@angular/router';
import { ViewRoomsComponent } from './view-rooms/view-rooms.component';
import { PostRoomComponent } from './post-room/post-room.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { SearchHotelComponent } from './search-hotel/search-hotel.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { ViewReservationsComponent } from './view-reservations/view-reservations.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { NgxPayPalModule } from 'ngx-paypal';

export function authInterceptorFactory(authService: AuthService) {
  return new AuthInterceptor(authService);
}

export function authGuardFactory(authService: AuthService, router: Router){
  return new AuthGuard(authService, router);
}

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent,
    AddLocationComponent,
    AddHotelComponent,
    ViewHotelsComponent,
    ErrorComponent,
    ViewRoomsComponent,
    PostRoomComponent,
    ManageUsersComponent,
    SearchHotelComponent,
    BookRoomComponent,
    ViewReservationsComponent,
    PaymentComponent,
    PaymentSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPayPalModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useFactory: authInterceptorFactory,
      multi: true,
      deps: [AuthService]
     },
     {
      provide: AuthGuard,
      useFactory: authGuardFactory,
      deps: [AuthService, Router]
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
