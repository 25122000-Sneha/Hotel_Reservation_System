import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

declare var paypal: any;

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrl: './book-room.component.css'
})
export class BookRoomComponent {

  itemForm: FormGroup;
  loggedInUserId: any;
  currentRoomId: any;
  successMsg$ : Observable<String> = of("");
  errorMsg$: Observable<String> = of("");
  showMsg: boolean = false;

  showPayPalButton = false;
  paypalRendered = false;
  
  


  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private authService: AuthService, private route: ActivatedRoute, private router: Router){
    this.itemForm = this.formBuilder.group({
      checkInDate: ["", [Validators.required, this.dateValidator]],
      checkOutDate: ["", [Validators.required, this.dateValidator]],
      noOfGuests: [0, [Validators.required]]
    })
  }

  ngOnInit(){
    //this.getUserId();
  }

  getUserId(){
    this.loggedInUserId = this.authService.getUserId;
    console.log(this.loggedInUserId);
    return this.loggedInUserId;
    
  }

  dateValidator(control: AbstractControl) : ValidationErrors | null {

    const today = new Date();
    const selectedDate = new Date(control.value);

    if(selectedDate < today){
      return {invalidDate: true};
    }
    else 
    return null;

  }


  

  // onSubmit(){
  //   if(this.itemForm.valid){
  //     this.currentRoomId = this.route.snapshot.paramMap.get('roomId');
  //     console.log(this.currentRoomId);
      
  //   this.httpService.bookRoom({
  //     user: {
  //       userId: this.getUserId()
  //     },
  //     room: {
  //       roomId: this.currentRoomId
  //     },
  //     checkInDate: this.itemForm.value.checkInDate,
  //     checkOutDate: this.itemForm.value.checkOutDate,
  //     noOfGuests: this.itemForm.value.noOfGuests
  //   })
  //   .subscribe({
  //     next: (data: any) => {
  //       this.successMsg$ = of("Room is available for booking ");
  //     },
  //     error: (err: any) => {
  //       this.errorMsg$ = of(err.error?.error || "Could not book room");
  //     }

  //   })
  //   this.showMsg = true;
    
  //   }
  //   else{
  //     this.errorMsg$ = of("Error while logging in!!");
  //     this.itemForm.markAllAsTouched();
  //   }

  //   setTimeout(() => {
  //     this.showMsg = false;
  //     this.itemForm.reset();
  //   }, 2500);

    

  // }


  onSubmit(){
    if(this.itemForm.valid){
      this.currentRoomId = this.route.snapshot.paramMap.get('roomId');
      console.log(this.currentRoomId);
      const bookingDetails = {
        user: {
          userId: this.getUserId()
        },
        room:{
          roomId: this.currentRoomId
        },
        checkInDate: this.itemForm.value.checkInDate,
        checkOutDate: this.itemForm.value.checkOutDate,
        noOfGuests: this.itemForm.value.noOfGuests,
        paymentId: null
      };

      this.httpService.bookRoom(bookingDetails)
      .subscribe({
        next: (data: any) => {
          sessionStorage.setItem("pendingBooking", JSON.stringify(bookingDetails));
          this.successMsg$ = of("Room available for booking");
          this.showMsg = true;
          setTimeout(() => {
            this.successMsg$ = of("");
            this.router.navigateByUrl("/payment");
          }, 2500);
          
        },
        error: (err: any) => {
          this.errorMsg$ = of(err.error?.error || "Could not book room");
          this.showMsg = true;
        }
      })


    }
    else{
      this.errorMsg$ = of("Error while logging in!!");
      this.itemForm.markAllAsTouched();
    }

    setTimeout(() => {
      this.showMsg = false;
      this.itemForm.reset();
    }, 2500);
  }


  

}
