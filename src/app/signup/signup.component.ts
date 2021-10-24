import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 
  signUpForm:any;
  responseMsg=null;
  constructor( private authService:AuthService ,private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      first_name: new FormControl(null , [Validators.required]),
      last_name: new FormControl(null , [Validators.required]),
      age: new FormControl(null , [Validators.required ]),
      email: new FormControl(null , [Validators.required ,Validators.email]),
      password: new FormControl(null , [Validators.required , Validators.minLength(4)]),
    });
    if(localStorage.getItem('token'))
      this.router.navigate(['/home'])
  }
  get first_name() { return this.signUpForm.get('first_name'); }
  get last_name() { return this.signUpForm.get('last_name'); }
  get age() { return this.signUpForm.get('age'); }
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }

  onSubmit() {
    this.authService.signup(this.signUpForm.value).subscribe(result=>{
      this.responseMsg=result.message;
    })
  }
  
}
