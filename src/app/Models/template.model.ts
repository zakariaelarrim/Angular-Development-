import { DatePipe } from "@angular/common";

export class Template{
    id?:string;
    userId:string;
    userName:string;
    title:string;
    description:string;
    extension:string;
    image:string;
    source?:string;
    createAt:string = new DatePipe('en-US').transform(Date.now(), 'medium');
    views:number = 0;
    downloads:number = 0;
    display:boolean = true;

    constructor(title:string, description:string, extension:string, image:string, userName:string, userId:string, source?:string, id?:string){
        this.title = title;
        this.userId = userId;
        this.userName = userName;
        this.description = description;
        this.extension = extension;
        this.image = image;
        this.source = source;
        this.createAt = new DatePipe('en-US').transform(Date.now(), 'medium');
        this.views = 0;
        this.downloads = 0;
    }

}