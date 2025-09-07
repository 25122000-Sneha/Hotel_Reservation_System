import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  itemForm: FormGroup;

  successMsg$ : Observable<string> = of("");
  errorMsg$ : Observable<string> = of("");

  showMsg: boolean = false;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private authService : AuthService, private router : Router){
    this.itemForm = this.formBuilder.group({
      userName: ["", [Validators.required, this.noSpaceValidator]],
      password: ["", [Validators.required, this.passwordValidator]]
    });
      
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


  noSpaceValidator(control: AbstractControl) : {[key: string] : boolean} | null {
    let userNameVal = control.value as string;
    if(userNameVal.indexOf(' ') >= 1){
      return {invalidUsername : true};
    }
    else 
    return null;
  }


  onSubmit(){
    if(this.itemForm.valid){
      this.httpService.loginUser(this.itemForm.value).subscribe(
        (data: any) => {
          //console.log(data);
          //this.authService.saveUserName(data.userName);
          this.authService.saveToken(data.token);
          //this.authService.saveEmail(data.email);
          //this.authService.saveRole(data.role);
          //this.authService.saveUserId(data.userId);
          //this.router.navigateByUrl('/home')
          if(this.authService.getRole === 'Admin'){
            this.router.navigateByUrl('/view-hotels');
          }
          else{
            this.router.navigateByUrl('/search-hotel');
          }
          this.successMsg$ = of("User logged in successfully");
          setTimeout(()=>{
            window.location.reload();
          }, 500);
          
        },

        (error) => {
          this.errorMsg$ = of("Unable to login user");
        }
      );
      this.showMsg = true;
    }
    else{
      this.errorMsg$ = of("Error while logging in!!");
      this.itemForm.markAllAsTouched();
    }

    setTimeout(() => {
      this.showMsg = false;
      this.itemForm.reset();
    }, 1500);
  }

}
