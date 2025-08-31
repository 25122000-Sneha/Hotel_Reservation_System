import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {
  userList$ : Observable<any[]> = of([]);
  successMsg$ : Observable<String> = of("");
  errorMsg$: Observable<String> = of("");

  constructor(private httpService: HttpService){
    
  }

  ngOnInit(){
    this.getAllUsers();
  }

  getAllUsers() : void {
    this.userList$ = this.httpService.getAllUsers();
  }

  deleteUser(userId: any){
    //console.log(userId);
    this.httpService.deleteUser(userId).subscribe({
      next: (data: any) => {
        this.successMsg$ = of("User deleted successfully"); 
        this.successMsg$ = of("");
        this.getAllUsers();
      },
      error: (error: any) => {
        if(error.status === 400){
          this.errorMsg$ = of("User Id doesn't exist!");
          this.errorMsg$ = of("");
        }
        else{
          this.successMsg$ = of("Unable to delete user!");
          this.errorMsg$ = of("");
        }
      } 
  })
    
  }
}
