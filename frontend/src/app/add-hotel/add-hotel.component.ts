import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.css'
})
export class AddHotelComponent {
  itemForm: FormGroup;
  locationList$: Observable<any[]> = of([]);
  success$ : Observable<String> = of("");
  error$ : Observable<String> = of("");
  showMsg: boolean = false;

  imageFile: File | null = null;
  imageError: boolean = false;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService){
    this.itemForm = this.formBuilder.group({
      hotelName: ["", [Validators.required]],
      description: ["", [Validators.required]],
      address: ["", [Validators.required]],
      locationId: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required, this.phoneNumberValidator]],
      emailId: ["", [Validators.required, this.emailValidator]],
      rating: ["", [Validators.required, Validators.min(0), Validators.max(5)]],
      file: [null, [Validators.required]]
    })
  }

  ngOnInit(){
    this.getAllLocations();
  }

  getAllLocations(): void {
    this.locationList$ = this.httpService.getAllLocations();
    
  }

  emailValidator(control: AbstractControl) : {[key: string] : boolean} | null {
    let emailRegex = /^[A-Za-z\d._%+-]+@[A-Za-z\d._]+\.[A-Za-z]{2,}$/
    let emailVal = control.value;
    if(!emailRegex.test(emailVal)){
      return {invalidEmail: true};
    }
    else 
    return null;

  }

  phoneNumberValidator(control: AbstractControl) : {[key: string] : boolean} | null {
    let phoneNumberValue = control.value;
    let phoneNumberRegex = /^[7,8,9][0-9]{9}$/
    if(!phoneNumberRegex.test(phoneNumberValue)){
      return { invalidPhoneNumber : true};
    }
    else
    return null;
  }

  onFileSelected(event: any){
    this.imageFile = event.target.files[0];
    //console.log(this.imageFile);
    
  }
  
  onSubmit(){
    
    if(this.itemForm.invalid || !this.imageFile){
      this.error$ = of("Please fill all fields and upload image!");
      return;
    }
    else{
      const formData = new FormData();
      formData.append('file', this.imageFile);
      formData.append('hotelName', this.itemForm.get('hotelName')?.value);
      formData.append('description', this.itemForm.get('description')?.value);
      formData.append('address', this.itemForm.get('address')?.value);
      formData.append('locationId', this.itemForm.get('locationId')?.value);
      formData.append('phoneNumber', this.itemForm.get('phoneNumber')?.value);
      formData.append('emailId', this.itemForm.get('emailId')?.value);
      formData.append('rating', this.itemForm.get('rating')?.value);
      
      this.httpService.addHotel(formData).subscribe(
        (data: any) => {
          this.success$ = of("Hotel added  successfully");
        },
        (error) => {
          this.error$ = of("Failed to add hotel!");
        });
      
    }
    

    setTimeout(() => {
      this.showMsg = false;
      console.log(this.itemForm.value.location);
      this.itemForm.reset();
      this.imageFile = null;
    }, 2000);
  }


}
