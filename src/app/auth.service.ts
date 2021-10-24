import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loged: BehaviorSubject<boolean> ;
  url='https://routeegypt.herokuapp.com/';
  
  constructor(private http: HttpClient) { 
    if(localStorage.getItem('token'))
      this.loged=new BehaviorSubject<boolean>(true);
    else
      this.loged=new BehaviorSubject<boolean>(false);
  }

  signup(user:any):Observable<any>{
    return this.http.post(this.url+'signup',user);
  }

  signin(user:any):Observable<any>{
    return this.http.post(this.url+'signin',user);
  }
  
}
