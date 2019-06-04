import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Category } from '../category';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
@Injectable()
export class CategoryService {
  categories: Array<Category>;
  categoriesSubject: BehaviorSubject<Array<Category>>;
  url = 'http://localhost:9400/api/v1/category/';

  constructor(private authservice: AuthenticationService, private httpClient: HttpClient) {
    this.categories = [];
    this.categoriesSubject = new BehaviorSubject([]);

  }

  fetchCategoriesFromServer() {
    let category = new Category();
    category.categoryCreatedBy = this.authservice.getLoggedUserId();
    console.log("inside fectchCategoriesFromServer ");
    return this.httpClient.get<Category[]>(`${ this.url }`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
      .set('userId', `${ this.authservice.getLoggedUserId()}`)
    }).subscribe(categories => {
      this.categories = categories;
      this.categoriesSubject.next(this.categories);
    },
      (err: any) => {
        this.categoriesSubject.error(err);
      })
  }


  getCategories(): BehaviorSubject<Array<Category>> {
    return this.categoriesSubject;
  }

  addCategory(cat: Category): Observable<Category> {
    let authHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authservice.getBearerToken(),
      'Content-Type': 'application/json; charset=utf-8'
    });
    console.log("cat: ", cat);
    console.log("local stordage userid " + this.authservice.getLoggedUserId());
    cat.categoryCreatedBy = this.authservice.getLoggedUserId();
    return this.httpClient.post<Category>(`${ this.url }`, cat, {

      headers: authHeader
    }).pipe(tap(addedCategory => {
      console.log("addedCategory ", addedCategory);
      this.categories.push(cat);
      this.categoriesSubject.next(this.categories);
    }))
  }

  editCategory(cat: Category): Observable<Category> {
    return this.httpClient.put<Category>(`${ this.url }${cat.categoryId}`,cat, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(editedCategory => {
      console.log("editedCategory ", editedCategory);
      const cat = this.categories.find(note => cat.categoryId == editedCategory.categoryId);
      Object.assign(cat, editedCategory);
      this.categoriesSubject.next(this.categories);
    }))
  }


  deleteCategory(cat: Category): Observable<Category> {
    return this.httpClient.delete<Category>(`${ this.url }${cat.categoryId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(deletedcategory => {
      console.log("inside pipe of delet category ",this.categories);
      console.log("inside pipe of delet category ",deletedcategory);
      console.log("inside pipe of delet category ",cat);
      this.categories.splice(this.categories.indexOf(cat), 1);
      //const note = this.notes.find(note => note.noteId == deletedNote.noteId);
      //Object.assign(note,deletedNote);

      this.categoriesSubject.next(this.categories);
    }))
  }


  getCategoryById(categoryId): Category {
    const foundnote = this.categories.find(cat => cat.categoryId == categoryId);
    return foundnote;
  }
}




