import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Gallery';
  currentRoute:string;
  hide:boolean =  false;
  constructor(private userServices: UserService,private router: Router){
    this.router.events.pipe( filter((event: any) => event instanceof NavigationEnd) )
    .subscribe(event => { this.currentRoute = event.url });
    if(this.currentRoute = '/profile'){
      this.hide = true;
    }
  }
  ngOnInit(){
  this.userServices.getAuthUser()
  this.userServices.loggedUser.subscribe(user =>{
    if(user){
     // console.log("the user logged in ")
     // console.log(user)
    }
  },
  err =>{ console.log("the user not logged in yet")})
  }
}
