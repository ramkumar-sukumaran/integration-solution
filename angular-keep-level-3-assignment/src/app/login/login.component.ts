import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { User } from '../user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  public submitMessage: string;
  public bearerToken: any;

  // @ViewChild(FormGroupDirective)
  // formgroudirective: FormGroupDirective;

  constructor(private authenticationService: AuthenticationService,
      private routerService: RouterService
  ) {

  }

  loginSubmit() {
    // console.log("user name :: "+ this.loginForm.value.username + this.loginForm.value.password);

    const userObj: User = new User();
    userObj.userId = this.username.value;
    userObj.userName = this.username.value;
    userObj.userPassword = this.password.value;
    if ( this.username.hasError('required') || this.password.hasError('required')) {
      this.submitMessage = 'Username and Password both are required fields';
    }else {
      this.authenticationService.authenticateUser(userObj)
      .subscribe(res => {
        console.log("res  :: "+ res['token']);
        this.bearerToken = res['token'];
        this.authenticationService.setBearerToken(this.bearerToken);
        this.authenticationService.setLoggedUserId(userObj.userId);
        this.routerService.routeToDashboard();
      },
      err => {
        if (err.status === 404) {
          // console.log('404 ----' + err.message);
          this.submitMessage = err.message;
        }else {
          // console.log(err.error.message);
          this.submitMessage = err.error.message;
        }
      }
      );
    }
    // this.formgroudirective.resetForm();
  }

  loadRegister(){
    this.routerService.routeToRegister();
  }

}
