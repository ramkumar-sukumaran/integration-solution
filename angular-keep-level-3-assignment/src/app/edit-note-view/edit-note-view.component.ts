import { Component, Inject, Input } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';
import { Validators } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  constructor(private dialofRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notesService: NotesService) {
  }

  ngOnInit() {
    // console.log('edit note view :: note data -- '+ JSON.stringify(this.data.noteId))
    this.note = this.notesService.getNoteById(this.data.noteId);
    // console.log(' note data -- '+ this.note.text)
  }

  onSave() {
    this.notesService.editNote(this.note).subscribe(
      data => {
        this.dialofRef.close();
      },
      err => {
        if ( err.status === 404) {
          this.errMessage = err.message;
        }else {
          this.errMessage = err.error.message;
        }
      }
    );
  }
  onDelete() {
    this.notesService.deleteNote(this.note).subscribe((editNote) => {
      this.dialofRef.close();
    },
    err => {
      // this.dialofRef.close();
      if (err.status === 404) {
        this.errMessage = err.error;
      }
      else {
        this.errMessage = err.error;
      }
    })
  }
}
