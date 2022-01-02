import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../Models/user.model';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
loggedUser = new BehaviorSubject<any>(null);
  constructor(private db:AngularFirestore,private auth:AngularFireAuth) { }

 async signUp(user:User){
    let result = false;
   await this.auth.createUserWithEmailAndPassword(user.email, user.password).then(async res =>{
     user.uid = res.user.uid;
     await this.db.collection('users').add(user).then(resUser =>{
        if(resUser){
          result = true;
        }
      });
    }, error =>{
      console.log(error.message)
    })
    return result;
   
  }
  async singIn(email:string, passowrd:string):Promise<Boolean>{
    let result = false;
    await this.auth.signInWithEmailAndPassword(email,passowrd).then( res =>{
      if(res){
        localStorage.setItem('user', JSON.stringify(res.user));
        const user = JSON.parse(localStorage.getItem('user'))
        result =  true;
      }else{
        result = false;
      }
    });
    return result;
    
  }

  getAuthUser(){
    const curUser = JSON.parse(localStorage.getItem('user'));
    if(curUser){
        this.db.collection('users', ref => ref.where('uid', '==', curUser.uid)).snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as User;
          //data.id = a.payload.doc.id;
          return {...data};
        });
      }))
      .subscribe(user=>{
        if(user){
          this.loggedUser.next(user)
        }else{ this.loggedUser.next(null);}
      })
    }
    
    
  }
  getUsers() {
    return this.db.collection('users').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        //data.id = a.payload.doc.id;
        return data;
      })
    }));
  }
  getUser(userId: string) {
    return this.db.collection('users', ref => ref.where('userId', '==', userId)).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        //data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  logOut(){
    localStorage.removeItem('user');
    this.loggedUser.next(null);
  }
}
