import { Component, OnInit, Inject } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-category-view',
  templateUrl: './edit-category-view.component.html',
  styleUrls: ['./edit-category-view.component.css']
})
export class EditCategoryViewComponent implements OnInit {

  cat: Category;
  
  errMessage: string;

  onSave() {
    this.categoryService.editCategory(this.cat).subscribe((editedNote) => {
      this.matDialogRef.close();
      //console.log("editedNote ",editedNote);
    },
    err => {
      this.matDialogRef.close();
      if (err.status === 404) {
        this.errMessage = err.error;
      }
      else {
        this.errMessage = err.error;
      }
    })
  }

  onDelete() {
    this.categoryService.deleteCategory(this.cat).subscribe((editedcategory) => {
      this.matDialogRef.close();
    },
    err => {
      this.matDialogRef.close();
      if (err.status === 404) {
        this.errMessage = err.error;
      }
      else {
        this.errMessage = err.error;
      }
    })
  }


  constructor(private matDialogRef: MatDialogRef<EditCategoryViewComponent>,
    private routerService: RouterService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit() {
    this.cat = this.categoryService.getCategoryById(this.data.catid);
    console.log("Inside ngOnit of category view component file ",this.cat);
  }

  ngOnDestroy() {
    this.routerService.routeToCategoryNormalView();
  }
}
