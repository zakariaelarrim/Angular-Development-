import { UserService } from './../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild('form') form:NgForm  
  constructor(private userServices:UserService) { }

  ngOnInit() {
  }
  async onSubmit(){
    if(this.form){
       const user:User = this.form.value;
       console.log(user)
       let result = await this.userServices.signUp(user);
       console.log("the result of the sign up user is :", result)
    }
    // -------
  }
}
