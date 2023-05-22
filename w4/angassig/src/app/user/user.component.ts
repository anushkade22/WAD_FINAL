import { Component } from '@angular/core';

@Component({
  //selector: 'app-root',
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  title = 'Registration form';

  displayname="";
  displayaddress="";
  displaycontact="";
  displayemail="";

  getValue(name:string,address:string,contact:string,email:string){
    this.displayname=name;
    this.displayaddress=address;
    this.displaycontact=contact;
    this.displayemail=email;
    sessionStorage.setItem("name",name)
    sessionStorage.setItem("address",address)
    sessionStorage.setItem("contact",contact)
    sessionStorage.setItem("email",email);
  }
}
