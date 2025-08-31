import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-post-room',
  templateUrl: './post-room.component.html',
  styleUrl: './post-room.component.css'
})
export class PostRoomComponent {
  
  itemForm : FormGroup;
  currentHotelId: any;
  successMsg$ : Observable<String> = of("");
  errorMsg$ : Observable<String> = of("");
  showMsg : boolean = false;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private route : ActivatedRoute){
    this.itemForm = this.formBuilder.group({
      roomNumber: ["", [Validators.required]],
      roomType: ["", [Validators.required]],
      rate: [0.00, [Validators.required]],
      status: ["", [Validators.required]]
    });
  }

  ngOnInit(){
    this.currentHotelId = this.route.snapshot.paramMap.get('hotelId');
  }

  onSubmit(){
    if(this.itemForm.valid){
      this.httpService.postRoom(this.itemForm.value, this.currentHotelId).subscribe(
        (data: any) => {
          this.successMsg$ = of("Room added successfully!");
        },
        (error : any) => {
          this.errorMsg$ = of("Unable to add room");
        }
      )
      this.showMsg = true;
    }
    else{
      alert("Form is invalid!!");
    }

    setTimeout(() => {
      this.showMsg = false;
      this.itemForm.reset();
    }, 1500);
  }

  
}
