import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// import { AuthService } from './api/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, ) {}

  notImplmentedUserTypes = [4, 5, 6, 7, 8];

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // if (!this.authService.isTokenExpired) {
    //   this.checkImplemented();
    //   return true;
    // } else {
    //   if (this.authService.rawToken) {
    //     this.router.navigate(['auth/login']);
    //     return false;
    //   } else {
    //     this.router.navigate(['']);
    //     return false;
    //   }
    // }
    return true;
  }

  // this is temporary to stop user types that are not supproted to log in (there are no screens for these users)
  checkImplemented() {
    // if (this.notImplmentedUserTypes.includes(this.authService.roleId)) {
    //   this.router.navigate(['/auth/tbi']);
    // }
  }
}
