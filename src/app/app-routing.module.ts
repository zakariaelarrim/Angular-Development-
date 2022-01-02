import { InfoComponent } from './profile/info/info.component';
import { TemplateEditComponent } from './profile/template-edit/template-edit.component';
import { TemplateListComponent } from './profile/template-list/template-list.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { VideosComponent } from './videos/videos.component';
import { ImagesComponent } from './images/images.component';
import { ImageComponent } from './image/image.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'image', component:ImageComponent},
  {path:'login', component:LoginComponent},
  {path:'sign-up', component:SignUpComponent},
  {path:'profile', component:ProfileComponent, children:[
    {path:'info', component:InfoComponent},
    {path:'templates', component:TemplateListComponent},
    {path:'edit', component:TemplateEditComponent}
  ]},
  {path:'images', component:ImagesComponent},
  {path:'videos', component:VideosComponent},
  {path:'about', component:AboutComponent},
  {path:'contact', component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
