import { Template } from './../../Models/template.model';
import { TemplateService } from './../../services/template.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {
user:User;
templates:Template[] = null;
  constructor(private userService:UserService, private templateServices:TemplateService) { }

  async ngOnInit(){
   await this.userService.loggedUser.subscribe(user =>{
      if(user){ this.user = user[0];
        (this.templateServices.getUserTemplates(this.user.id))
        .subscribe(templates =>{
          if(templates != null){ this.templates = templates; console.log(this.templates)}
        }, error =>{ this.templates = null; console.error("failed to get the templates")});
      }
      else{ this.user = null;}
    });

    (await this.templateServices.getAllTemplates()).subscribe( data =>{
      console.log(data);
    }, error =>{
      console.log("failed to laod the data");
    })
  }

  onChange(index){
    let template = this.templates[index];
    template.display = !template.display;
    this.templateServices.updateTemplate(template.id, template).then(res =>{
     // -------- hello 
    });
  }
onDelete(templateId){
  alert("delete");
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
     
      this.templateServices.deleteTemplate(templateId).then(res =>{
         Swal.fire(
        'Deleted!',
        'Your Template has been deleted.',
        'success'
      );
      }, error =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'}
        );
      })
    }
  });
}
}
