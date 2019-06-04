import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';
import { ActivatedRoute } from '@angular/router';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent {
  noteId: number;
  constructor(private dialog: MatDialog,
    private routerService: RouterService,
    private activatedRoute: ActivatedRoute ) {
      this.activatedRoute.params.subscribe(params => {
        // console.log('params ... '+ params.noteId);
        this.noteId = params.noteId;
        // console.log('note opener passing data ... '+ this.noteId);
      });

      this.dialog.open(EditNoteViewComponent, {
        data: {
          noteId: this.noteId
        }
      }).afterClosed().subscribe(result => {
        // console.log('inside after closed note opener ' );
        this.routerService.routeBack();
      });
    }
}
