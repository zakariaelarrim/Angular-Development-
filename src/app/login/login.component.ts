import { NgForm } from '@angular/forms';
import { UserService } from './../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
@ViewChild('form') form:NgForm
  constructor(private userServices:UserService) { }

  ngOnInit() {
  }
  async onSubmit(){
  if(this.form){
    let result
    await this.userServices.singIn(this.form.value.email, this.form.value.password).then(res =>{ result = res}, err =>{result = false});
    if(result){
      document.defaultView.location.reload();
    }else{
       console.log("invalide email or password")
    }
  }
  }
}
