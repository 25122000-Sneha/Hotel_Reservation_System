import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';

declare var paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  bookingDetails: any;
  pricePerNight: number = 0.0;
  totalCost: number = 0.0;
  showPaymentOptions = false;
  paypalRendered = false;

  public payPalConfig?: IPayPalConfig;

  constructor(private httpService: HttpService, private router: Router){

  }

  ngOnInit(){
    const data = sessionStorage.getItem("pendingBooking");

    this.bookingDetails = JSON.parse(data ?? "Error occured in parsing");
    console.log(this.bookingDetails);

    this.getRoomCost();
    
  }

  getRoomCost(){
    this.httpService.getRoomPrice(this.bookingDetails.room.roomId)
    .subscribe({
      next: (data: any) => {
        this.pricePerNight = data;
        console.log(this.pricePerNight);
        this.calculateBookingCost();
      }
    })
  }

  calculateBookingCost(){
    let checkInDate = new Date(this.bookingDetails.checkInDate);
    let checkOutDate = new Date(this.bookingDetails.checkOutDate);
    
    checkInDate.setHours(0, 0, 0, 0);
    checkOutDate.setHours(0, 0, 0, 0);
    let oneDayInMs = 24*60*60*1000;
    let noOfDays = Math.round((checkOutDate.getTime() - checkInDate.getTime())/oneDayInMs);
    console.log("Price per night: "+this.pricePerNight);
    
    console.log(("Days: "+ noOfDays));
    
    this.totalCost = noOfDays * this.pricePerNight;
    console.log(this.totalCost);
    
  }



  onProceedToPay() {
    this.showPaymentOptions = true;

    setTimeout(() => {
      if (!this.paypalRendered) {
        //this.renderPayPal();
        this.initConfig();
        this.paypalRendered = true;
      }
    }, 0); 
  }




  // renderPayPal() {
  //   paypal.Buttons({
  //     style: {
  //   layout: 'vertical',
  //   color: 'gold',
  //   shape: 'rect',
  //   label: 'paypal'
  // },
  // fundingSource: paypal.FUNDING.PAYPAL,
  //     createOrder: (data: any, actions: any) => {
  //       return actions.order.create({
  //         purchase_units: [{
  //           amount: {
  //             value: this.totalCost.toFixed(2) // must be string
  //           }
  //         }]
  //       });
  //     },
  //     onApprove: (data: any, actions: any) => {
  //       return actions.order.capture().then((details: any) => {
  //         //alert('Payment successful by ' + details.payer.name.given_name);
  //         this.finalizeBooking();
  //       });
  //     },
  //     onError: (err: any) => {
  //       console.error('PayPal error:', err);
  //       alert("Payment failed!");
  //     }
  //   }).render('#paypal-button-container');
  // }



  initConfig() {
      const currency = 'USD';
      console.log("Setting paypal config..");
      
      this.payPalConfig = {
      currency: currency,
      clientId: 'Aaj-2u4wUojAjtbrmxFNdOqn5i8nngF41PX4-OJYyBhOWegcdNMxZ8UtWYOoQpIkoEVNoDWtKSCX_2Wz',
      createOrderOnClient: (data) => {
        console.log("Inside createOrderOnClient...");
        return <ICreateOrderRequest>{
        
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: this.totalCost.toFixed(2)
            }
            
          }
        ]
      }},
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        return actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
        
      },
      onClientAuthorization: (data) => {
        console.log('✅ onClientAuthorization - Payment completed:', data);
        this.bookingDetails.paymentId = data.id;
        this.finalizeBooking();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
        alert("Payment failed!");
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
    }



  
  
  finalizeBooking(){
    this.httpService.confirmBooking(this.bookingDetails)
    .subscribe({
      next: (data:any) => {
        alert("Booking confirmed!");
        sessionStorage.removeItem("pendingBooking");
        window.location.href = "/payment-success";
      },
      error: (err: any) => {
        alert("Failed to complete booking");
      }
    })
  }


}
