import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  itemForm: FormGroup;

  user: any = {};

  showMsg: boolean = false;
  successMsg$ : Observable<string> = of("");
  errorMsg$ : Observable<string> = of("");
  
  constructor(private formBuilder: FormBuilder, private httpService : HttpService){
    this.itemForm = this.formBuilder.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required, this.passwordValidator]],
      confirmPassword: ["", [Validators.required, this.passwordValidator]]
    }, {validators : this.passwordMatchValidator});
  }

  passwordValidator(control : AbstractControl) : {[key: string] : boolean} | null {
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])([a-zA-Z\d!@#%$%^&*]){8,}$/;
    let passwordValue = control.value as string;
    if(!passwordRegex.test(passwordValue)){
      return {invalidPassword : true};
    }
    else
    return null;
  }


  passwordMatchValidator(form : FormGroup) : {[key: string] : boolean} | null {
    let passwordVal = form.get('password')?.value;
    let confirmPasswordVal = form.get('confirmPassword')?.value;
    if(passwordVal !== confirmPasswordVal){
      return {nomatch : true};
    }
    else 
    return null;
  }

  

  onSubmit(){
    if(this.itemForm.valid){
      let found: boolean = false;
      this.httpService.getAllUsers().subscribe((data: any) => {
        for(let user of data){
          if(user.userName == this.itemForm.value.userName){
            found = true;
            this.httpService.updateUser(user.userId, {
              userId: user.userId,
              userName: user.userName,
              password: this.itemForm.value.password,
              email: user.email,
              role: user.role
            }).subscribe(() => {
              this.successMsg$ = of("Password updated successfully!");
            });
          }
        }
        if( found == false){
          this.successMsg$ = of("Username does not exist!");
        }
        
      },
      (error) => {
        this.errorMsg$ = of("Unable to update password!");
      }
    )
    }
  }


}
