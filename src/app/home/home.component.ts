import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { NoteService } from '../note.service';
import { NgControl } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  addNoteForm:any;
  editNoteForm:any;
  noteID:any;
  userData={
    userID:localStorage.getItem('userID'),
    token:localStorage.getItem('token')
  }
  notes:any=[];
  constructor(private router: Router , private noteService:NoteService ) { }

  ngOnInit(): void {
    if(!localStorage.getItem('token'))
      this.router.navigate(['/signin'])

    this.getAllNotes();

    this.addNoteForm= new FormGroup({
      title: new FormControl(),
      desc: new FormControl(),
    });

    this.editNoteForm= new FormGroup({
      title: new FormControl(null),
      desc: new FormControl(null),
    });

  }
  getAllNotes(){
    this.noteService.getNotes(this.userData).subscribe(res=>{
      this.notes=res.Notes;
    })
  }
  show(id:any,index:number){
    this.noteID=id;
    this.editNoteForm.controls.title.setValue(this.notes[index].title);
    this.editNoteForm.controls.desc.setValue(this.notes[index].desc);
  }
  addNote() {
    let note ={
      title:this.addNoteForm.value.title,
      desc:this.addNoteForm.value.desc,
      citizenID:localStorage.getItem('userID'),
      token:localStorage.getItem('token')
    }
    this.noteService.addNote(note).subscribe(res=>{
      this.getAllNotes();
    })
  }
  updateNote() {
    let note ={
      title:this.editNoteForm.value.title,
      desc:this.editNoteForm.value.desc,
      token:localStorage.getItem('token'),
      NoteID:this.noteID
    }
    this.noteService.updateNote(note).subscribe(res=>{
      this.getAllNotes();
    })
  }
  deleteNote(id:any){
    let note ={
      token:localStorage.getItem('token'),
      NoteID:id
    }
    this.noteService.deleteNote(note).subscribe(res=>{
      this.getAllNotes();
    })
  }
}
