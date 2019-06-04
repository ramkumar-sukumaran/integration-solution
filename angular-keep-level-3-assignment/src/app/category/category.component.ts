import { Component, OnInit,Input } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Category } from '../category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input()
  category : Category;
  
  constructor(private routerService: RouterService) { }

  ngOnInit() {
  }

  openEditView() {
    this.routerService.routeToEditCategoryView(this.category.categoryId);
  }

}
