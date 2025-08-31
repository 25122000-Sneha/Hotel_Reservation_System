import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  itemForm: FormGroup;

  successMsg$ : Observable<string> = of("");
  errorMsg$ : Observable<string> = of("");

  showMsg: boolean = false;

  constructor(private httpService: HttpService, private formBuilder: FormBuilder){
    this.itemForm = this.formBuilder.group({
      userName : ["", [Validators.required, this.noSpaceValidator]],
      password: ["", [Validators.required, this.passwordValidator]],
      email: ["", [Validators.required, this.emailValidator]],
      role: ["", [Validators.required]]
    });

  }

  passwordValidator(control : AbstractControl) : {[key: string] : boolean} | null {
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])([a-zA-Z\d!@#%$%^&*]){8,}$/;
    let passwordValue = control.value;
    if(!passwordRegex.test(passwordValue)){
      return {invalidPassword : true};
    }
    else
    return null;
  }

  noSpaceValidator(control: AbstractControl) : {[key: string] : boolean} | null {
    let usernameVal = control.value as string;
    if(usernameVal.indexOf(' ')>=1){
      return {invalidUsername : true};
    }
    else 
    return null;
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


  onSubmit() {
    if(this.itemForm.valid){
      this.httpService.registerUser(this.itemForm.value).subscribe(
        (data: any) => {
          this.successMsg$ = of("User has been registered successfully")
        },
        (error) => {
          if(error.status == 400){
            this.errorMsg$ = of("User already exists!");
          }
          else {
            this.errorMsg$ = of("Unable to register user!")
          }
        }

      )
      this.showMsg = true;
    }
    else 
    {
      this.itemForm.markAllAsTouched();
    }

    setTimeout(() => {
      this.showMsg = false;
      this.itemForm.reset();
    }, 1500);
  }




}
