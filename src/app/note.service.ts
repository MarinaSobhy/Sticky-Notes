import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  url='https://routeegypt.herokuapp.com/';

  constructor(private http: HttpClient) { }

  addNote(note:any):Observable<any>{
    return this.http.post(this.url+'addNote',note);
  }
  getNotes(userData:any):Observable<any>{
    return this.http.post(this.url+'getUserNotes',userData);
  }
  updateNote(newNote:any):Observable<any>{
    return this.http.put(this.url+'updateNote',newNote);
  }
  deleteNote(note:any):Observable<any>{
    const options = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
      }),
      body: note
    };
    return this.http.delete(this.url+'deleteNote',options)
  }

}
