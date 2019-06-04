import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../category';

@Component({
  selector: 'app-category-normal-view',
  templateUrl: './category-normal-view.component.html',
  styleUrls: ['./category-normal-view.component.css']
})
export class CategoryNormalViewComponent implements OnInit {
  categories: Array<Category>;
  constructor(private categoryservice: CategoryService) { }

  ngOnInit() {
    this.categoryservice.getCategories().subscribe(
      res =>{
          this.categories = res;
      },
      err =>{
          
      })
    }

  }


