import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrl: './add-location.component.css'
})
export class AddLocationComponent {

  itemForm: FormGroup;

  successMsg$ : Observable<string> = of("");
  errorMsg$ : Observable<string> = of("");
  showMsg : boolean = false;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService){
    this.itemForm = this.formBuilder.group({
      city: ['', [Validators.required]],
      state: ['', [Validators.required]]
    })
  }

  onSubmit(){
    if(this.itemForm.valid){
      this.httpService.addLocation(this.itemForm.value).subscribe(
        (data: any)=>{
          this.successMsg$ = of("Location added successfully");
      }),
      (error: any)=>{
        this.errorMsg$ = of("Unable to add location!");
      }
      this.showMsg = true;
    }
    else 
    {
      alert("Form is invalid!!");
      this.itemForm.markAllAsTouched();
    }

    setTimeout(() => {
      this.showMsg = false;
      this.itemForm.reset();
    }, 1500);
  }


}
