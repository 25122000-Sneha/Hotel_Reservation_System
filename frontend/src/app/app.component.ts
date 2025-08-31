import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn : boolean = false;
  userName: string | null;
  email : string | null;
  roleName: string | null;
  showPostRoom: boolean = false;
  hotelId: any;

  constructor(private authService : AuthService, private router: Router, private location: Location, private route : ActivatedRoute){
    this.isLoggedIn = this.authService.getLoginStatus;
    console.log(this.isLoggedIn);
    
    this.userName = this.authService.getUserName;
    this.email = this.authService.getEmail;
    this.roleName = this.authService.getRole;
    console.log(this.roleName);
    
    if(this.isLoggedIn == false){
      this.router.navigateByUrl("/home");
    }
  }

  ngOnInit(){
    this.router.events
    .pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
      this.showPostRoom = event.urlAfterRedirects.includes('/rooms');
    });

      this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let currentRoute = this.route.root;
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
      }
      this.hotelId = currentRoute.snapshot.paramMap.get('hotelId');
    });
    
  }

  goBack(){
    this.location.back();
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
