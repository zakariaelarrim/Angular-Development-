import { TemplateService } from './../services/template.service';
import { Template } from './../Models/template.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
templates:Template[] = null;
  constructor(private templateServices:TemplateService) { }

  async ngOnInit() {
    await (await this.templateServices.getAllTemplates()).subscribe(items =>{
      if(items != null){
        this.templates = items;
      }else{
        this.templates = null
      }
    })
  }

}
