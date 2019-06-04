import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  url = 'http://localhost:9300/api/v1/note/';

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${ this.authService.getBearerToken() }`
    })
  };

  fetchNotesFromServer() {
    // http://localhost:8765/note-service/api/v1/note/{userId}
    // http://localhost:3000/api/v1/notes
    
    return this.http.get<Array<Note>>(`${ this.url }${ this.authService.getLoggedUserId() }`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${ this.authService.getBearerToken() }`)
    }).subscribe(data => {
      this.notes = data;
      this.notesSubject.next(this.notes) ;
    }, err => {}
    );
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    // /api/v1/note
    // http://localhost:3000/api/v1/notes
    const header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', `Bearer ${ this.authService.getBearerToken() }`)
        // .set('responseType','text')
    return this.http.post<Note>(`${ this.url }`, note, {
      headers: header
    }).pipe(
      tap(
        addednote => {
          this.notes.push(addednote);
          this.notesSubject.next(this.notes);
        }
      )
    );
  }

  editNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${ this.url }/${this.authService.getLoggedUserId()}/${ note.noteId }`, note, {
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${ this.authService.getBearerToken() }`)
    }).pipe(
      tap(editednote => {
        const choosennote = this.notes.find(notedata => notedata.noteId === editednote.noteId);
        // console.log('Note in the List :'+JSON.stringify(note));
        Object.assign(choosennote, editednote);
        this.notesSubject.next(this.notes);
      })
    );

  }
  deleteNote(note: Note): Observable<Note> {
    return this.http.delete<Note>(`${ this.url }${note.noteId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).pipe(tap(deletedcategory => {
      this.notes.splice(this.notes.indexOf(note), 1);
      //const note = this.notes.find(note => note.noteId == deletedNote.noteId);
      //Object.assign(note,deletedNote);

      this.notesSubject.next(this.notes);
    }))
  }
  getNoteById(noteId): Note {
    // console.log(' getNoteById -- '+ noteId);
    const id = parseInt(noteId, 10);
    const foundNote = this.notes.find(note => note.noteId === id);
    console.log(' found -- '+ foundNote);
    return foundNote;
  }
}
