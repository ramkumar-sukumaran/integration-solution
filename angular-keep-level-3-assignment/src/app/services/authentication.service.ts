import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  constructor(private httpService: HttpClient) {

  }
  url = 'http://localhost:9102/api/v1/auth';
  authenticateUser(data) {
    // http://localhost:3000/auth/v1 
    return this.httpService.post('http://localhost:9102/api/v1/auth/login', data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }
  
  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }
  setLoggedUserId(userId) {
    localStorage.setItem('userId', userId);
  }
  getLoggedUserId() {
    return localStorage.getItem('userId');
  }
  
  isUserAuthenticated(token): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // http://localhost:3000/auth/v1/isAuthenticated 
      // http://localhost:8765/userauthentication-service/api/v1/auth/isAuthenticated
      this.httpService.post('http://localhost:9102/api/v1/auth/isAuthenticated', {}, 
      {
        // headers: new HttpHeaders().set('Authorization', `Bearer ${this.getBearerToken()}`)
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${ this.getBearerToken() }`
        })
      }).subscribe(res => {
        // console.log("is user auth :: "+ JSON.stringify(res) );
        resolve(res['isAuthenticated']);
      },
    err => {
      reject(err);
    });
    });
  }

  register(userData){
    // console.log("inside userData "+JSON.stringify(userData));
    return this.httpService.post('http://localhost:9102/api/v1/auth/register',userData);
  }
  logout(){
    localStorage.removeItem("userId");
    localStorage.removeItem("bearerToken");
  }
}
