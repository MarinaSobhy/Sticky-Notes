import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logedIn:any;

  constructor(private router: Router , private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.loged.subscribe(x=>{
      this.logedIn=x;
    })
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    this.authService.loged.next(false);
    this.router.navigate(['/signin'])
  }

}
