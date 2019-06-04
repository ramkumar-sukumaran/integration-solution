import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class RouterService {
  constructor( private route: Router, private location: Location) {
  }
  routeToDashboard() {
    this.route.navigate(['dashboard']);
  }

  routeToLogin() {
    this.route.navigate(['login']);
  }

  routeToEditNoteView(noteId) {
    this.route.navigate(['dashboard', {
      outlets: { noteEditOutlet: ['note', noteId, 'edit'] }
    }]);
  }

  routeBack() {
    this.location.back();
  }

  routeToNoteView() {
    this.route.navigate(['dashboard/view/noteview']);
  }

  routeToListView() {
    this.route.navigate(['dashboard/view/listview']);
  }

  routeToEditCategoryView(categoryId) {
    this.route.navigate(['dashboard', {
      outlets: { categoryEditOutlet: ['category', categoryId, 'edit'] }
    }]);
  }
  routeToCategoryView() {
    this.route.navigate(['dashboard/view/categoryview']);
  }
  routeToCategoryTaker() {
    this.route.navigate(['dashboard/view/categorycreate']);
  }
  routeToCategoryNormalView() {
    this.route.navigate(['dashboard/view/categorynormalview']);
  }
  routeToRegister() {
    this.route.navigate(['register']);
  }
}
