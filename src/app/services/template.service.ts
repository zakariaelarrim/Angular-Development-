import { Template } from './../Models/template.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  colName = 'templates';
  constructor(private db: AngularFirestore) { }


  async getAllTemplates() {
    return await this.db.collection(this.colName).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Template;
        //data.id = a.payload.doc.id;
        return data;
      })
    }));
  }
 getUserTemplates(userId:string) {
    return this.db.collection(this.colName, ref => ref.where("userId" , "==", userId)).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Template;
        //data.id = a.payload.doc.id;
        return data;
      })
    }));
  }
  addNewTemplate(template: Template) {
    return this.db.collection(this.colName).add({ ...template });
  }
  async updateTemplate(tempId: string, template: Template) {
    return await this.db.collection(this.colName).doc(tempId).update(template);
  }
  async deleteTemplate(tempId: string) {
    return await this.db.collection(this.colName).doc(tempId).delete;
  }




}
