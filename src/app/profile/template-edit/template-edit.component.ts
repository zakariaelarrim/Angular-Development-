import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../../services/user.service';
import { TemplateService } from './../../services/template.service';
import { Template } from './../../Models/template.model';
import { NgForm } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { User } from '../../Models/user.model';

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.css']
})
export class TemplateEditComponent implements OnInit {
  extension = 'Illustration';
  sourceRequired = false;
  image: File = null;
  imageFile = null;
  source: File = null;
  sourceFile = null;
  isFinishe;
  isUploadFile = false;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  user:User = null;
  @ViewChild('formTemplate') form: NgForm
  constructor(private storage: AngularFireStorage, private templateServices:TemplateService,  private userServices:UserService) { }

  ngOnInit() {
    this.userServices.loggedUser.subscribe(user =>{
      if(user){ this.user = user[0];}
      else{ this.user = null;}
    })
  }
  onExtChange() {
    if (this.extension == 'ai' || this.extension == 'psd') {
      this.sourceRequired = true;
    }else{
      this.sourceRequired = false;
    }
  }
  OnSubmit() {
    console.log(this.form.value)
    let template = new Template(this.form.value.title,this.form.value.description,this.form.value.extension,"",(this.user.firstName+" "+this.user.lastName),this.user.id)
    template.description = this.form.value.description;
    if(!this.sourceRequired){
      // upload image template 
      this.uploadFile(res =>{
        if(res == true){ 
          console.log("Image uploaded successfully");
          template.image = this.imageFile.path;
          template.source = null;
          console.log(template);
          // create new template 
          this.templateServices.addNewTemplate(template).then(res =>{
            this.restAll();
          });
        }else{
          console.error("Failed to upload image");
        }
      },this.imageFile, this.image);
    }else{
      // upload image template
      this.uploadFile(res =>{
        if(res == true){ 
          console.log("Image uploaded successfully");
          template.image = this.imageFile.path;
          // upload file source temppate 
          this.uploadFile(fileRes =>{
            if(fileRes == true){
              console.log("File Source uploaded successfully");
              template.source = this.sourceFile.path;
              console.log(template);
              // create new template 
              this.templateServices.addNewTemplate(template).then(res =>{
                this.restAll();
              });
            }else{
              console.error("Failed to upload File Source");
            }
          },this.sourceFile, this.source)
        }else{
          console.error("failed to upload image");
        }
      },this.imageFile, this.image);
    }
  }
  restAll(){
    this.form.reset();
            this.image = null;
            this.imageFile = null;
            this.source = null;
            this.sourceFile = null;
  }
  async uploadFile(callback, file, content: File) {
    // create file path
    let path = `Files/${Date.now()}_${file.name}`;

    // upload file 
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, content);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();

    // get upload file state value
    this.percentage.subscribe(async (a) => {
      file.percentage = a;
      if (a == 100) {
        this.isUploadFile = true;
      }
    }, error => {
      this.isUploadFile = false;
      console.log("your upload is failed");
    });

    // get download Url of the file
    await this.snapshot.subscribe(async () => {
      file.path = await this.storage.ref(path).getDownloadURL().toPromise();
      callback(true);
    }, err => {
      callback(false);
    })

  }

  onImageChange(event) {
    if (event.target.files[0]) {
      this.image = event.target.files[0];
      this.imageFile = { percentage: 0, path: '', name: event.target.files[0].name };
    } else { this.image = null; this.imageFile = null; }

  }
  onFileSourceChange(event) {
    if (event.target.files[0]) {
      this.source = event.target.files[0];
      this.sourceFile = { percentage: 0, path: '', name: event.target.files[0].name };
    } else { this.source = null; this.sourceFile = null; }

  }

}
