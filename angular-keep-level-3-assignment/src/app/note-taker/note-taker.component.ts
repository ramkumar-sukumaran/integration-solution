import { Component, OnInit, ViewChild } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { FormGroupDirective } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {
  errMessage: string;
  note: Note;
  notes: Array<Note>;
  states: Array<string> = ['not-started', 'started', 'completed'];

  constructor(private notesService: NotesService, private authService: AuthenticationService) {
    this.note = new Note();
    this.notes = [];
  }
  ngOnInit() {
    this.notesService.getNotes().subscribe(
      data => this.notes = data,
      err => this.errMessage = err.message
    );
  }
  addNote() {
    // console.log(" Notes :: "+ this.noteForm.value.title + this.noteForm.value.text);
    if (this.note.noteTitle && this.note.noteContent) {
      // this.notes.push(this.note);
      this.note.noteCreatedBy=this.authService.getLoggedUserId();
      this.notesService.addNote(this.note).subscribe(
        data => {
          // this.notes.push(data);
          },
        err => {
          this.errMessage = err.message;
        }
      );
      this.note = new Note();

    }else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }
}
