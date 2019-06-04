import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../services/category.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-category-taker',
  templateUrl: './category-taker.component.html',
  styleUrls: ['./category-taker.component.css']
})
export class CategoryTakerComponent implements OnInit {

  public cat: Category;
  
  errMessage: string;
  public category : Category;
  
  constructor(private categoryService:CategoryService, private authService: AuthenticationService) {
    this.cat = new Category();
    
   // this.categoryService.fetchcategoriesFromServer(localStorage.getItem("userId"));
  }
  
  ngOnInit(){

  }
  addCategory() {
    //this.noteList.push(this.note);
    //console.log(this.note);

    if (this.cat.categoryId !== '' && this.cat.categoryName !== '' 
      && this.cat.categoryDescription !== '' ){
      this.cat.categoryCreatedBy = this.authService.getLoggedUserId();
      this.categoryService.addCategory(this.cat).subscribe(
        data => { console.log("inside data of addcatgeory ",data)},
        err => {
          console.log("err object in addCategory ",err);
          this.errMessage = err.error;
          ;
        }
      )
      this.cat = new Category();
    }
    else {
      this.errMessage = "All the fields are required.. Please fill and continue";
    }
  }
}
