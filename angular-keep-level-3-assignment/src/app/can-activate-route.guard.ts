import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  bearerToken: string;

  constructor(private authService: AuthenticationService,
    private routerService: RouterService) {
      this.bearerToken = '';
    }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.bearerToken = this.authService.getBearerToken();
      // console.log('this.bearerToken == '+ this.bearerToken)
      const resboolean = this.authService.isUserAuthenticated(this.bearerToken);
      console.log('resboolean --- '+ resboolean)
      return resboolean.then((status) => {
        // console.log('status == '+ status)
        if (!status) {
          this.routerService.routeToLogin();
        }
        return status;
      });
  }
}
