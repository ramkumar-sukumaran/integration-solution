import { Component, OnInit } from '@angular/core';
// import {MatSidenavModule} from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  isNoteView = true;
  userId: string;
  constructor(private breakpointObserver: BreakpointObserver, private routerService: RouterService,
  private authService: AuthenticationService) {
    this.userId = this.authService.getLoggedUserId();
  }
  
  ngOnInit() {
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  loadNotes() {
    this.routerService.routeToNoteView();
  }
  
  loadCategory() {
    this.routerService.routeToCategoryNormalView();
  }
  onLogout(){
    this.authService.logout();
    this.routerService.routeToLogin();
  } 
  switchToListView() {
    this.isNoteView = false;
    this.routerService.routeToListView();
  }

  switchToNoteView() {
    this.isNoteView = true;
    this.routerService.routeToNoteView();
  }
  
}
