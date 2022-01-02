export  class User{
    id?:string;
    uid:string;
    firstName:string;
    lastName:string;
    email:string;
    password:string;

    constructor(firstName:string, lastName:string, email:string, password:string,uid?:string, id?:string){
        this.id = id;
        this.uid = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = lastName;
        this.password = password;
    }
}