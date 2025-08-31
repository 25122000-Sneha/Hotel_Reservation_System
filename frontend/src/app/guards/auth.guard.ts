import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router){}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //     console.log(route.data['role']);
  //     const expectedRole = route.data['role'];
  //     const loggedInUserRole = this.authService.getRole as string;

  //     if(expectedRole !== loggedInUserRole){
  //       this.router.navigateByUrl('/error');
  //       return false;
  //     }
  //     else
  //     return true;
  // }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const singleRole = route.data['role'];        
    const multipleRoles = route.data['roles'];    
    const loggedInUserRole = this.authService.getRole as string; 

    // Combine both into a single array
    const allowedRoles: string[] = multipleRoles || (singleRole ? [singleRole] : []);

    console.log('Allowed roles:', allowedRoles);
    console.log('User role:', loggedInUserRole);

    if (!allowedRoles.includes(loggedInUserRole)) {
      this.router.navigateByUrl('/error');
      return false;
    }

    return true;
  }

};
