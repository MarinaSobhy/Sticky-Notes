import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm:any;
  responseMsg=null;

  constructor(private authService:AuthService ,  private router: Router ) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(null , [Validators.required ,Validators.email]),
      password: new FormControl(null , [Validators.required , Validators.minLength(4)]),
    });

    if(localStorage.getItem('token'))
      this.router.navigate(['/home'])
  }
  
  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }

  onSubmit() {
    this.authService.signin(this.signInForm.value).subscribe(result=>{
      this.responseMsg=result.message;
      console.log(result);
      if(result.message=='success'){
        localStorage.setItem('token', result.token);
        localStorage.setItem('userID', result.user._id);
        this.authService.loged.next(true);
        this.router.navigate(['/home']);
      }
    })
  }
}
