import { Component } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
  errMessage: string;
  notes: Array<Note> = [];
  // counter: number = 0;
  constructor(private notesService: NotesService) {
    this.notes = [];
  }
  ngOnInit() {
    this.getNotes();
  }
  getNotes() {
    this.notesService.getNotes().subscribe(
      data => {
        // console.log("note view:: fetching data :: " + this.counter + ' === ' + data);
        this.notes = data;
        // this.counter = this.counter + 1;
      },
      err => this.errMessage = err.error.message
    );
  }
}
