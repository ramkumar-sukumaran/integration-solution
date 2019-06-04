import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';
import { EditCategoryViewComponent } from '../edit-category-view/edit-category-view.component';

@Component({
  selector: 'app-edit-category-opener',
  templateUrl: './edit-category-opener.component.html',
  styleUrls: ['./edit-category-opener.component.css']
})
export class EditCategoryOpenerComponent implements OnInit {
  categoryId : string;
  constructor(private dialog:MatDialog,
    private activatedRoute:ActivatedRoute,
    private routerService:RouterService) 
    { 
      this.activatedRoute.params.subscribe(params =>
        this.categoryId=params.categoryid);

        this.dialog.open(EditCategoryViewComponent,{
          data:{
            catid:this.categoryId
          }
        }).afterClosed().subscribe(result => {
          this.routerService.routeBack();
        });
    }

  ngOnInit() {
  }

}
