import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { response } from 'express';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  constructor (private apiService: ApiService){}
  userData = {
    email:  'arnyasirpullissery@gmail.com',
    password: 'Abadi@2008'
  }
  checkbox = false;
  passtype = 'password';
  signinStateError = false;
  signinStateForm = true;
  updatePassType(): void {
    if (this.checkbox === true){
      this.passtype = 'text'
    }else if (this.checkbox === false){
      this.passtype = 'password'
    }
  }
  toSignup(){
    this.signinStateError = false;
    this.signinStateForm = true;
  }
  send(){
  this.apiService.checkUser(this.userData.email).subscribe((data) => {
    if (data){
      this.signinStateError = true;
      this.signinStateForm = false;
    }else{
      this.apiService.signinDataEmail(this.userData.email).subscribe((emailData) => {
        this.apiService.signinDataPassword(this.userData.password).subscribe((passwordData) => {
          const passwords: any = passwordData
          const email: any = emailData
          alert(email)
          alert(passwordData)

          const isEmailPresent = passwords.some(
            (item: { email: any; password: any; }) => item.email === email.email && item.password === email.password
          );

          if (isEmailPresent){
            this.apiService.getreceiverId(this.userData.email).subscribe( (id) => {
              const receiverId: any = id;
              localStorage.setItem('receiverId', receiverId);
            })
            location.href='/home'
          
          }else{
            alert(JSON.stringify(emailData) === JSON.stringify(passwordData))

            this.signinStateError = true;
            this.signinStateForm = false;
          }
         });
       });
      }
    }
  )}
   
  }
function userSigninSuccess() {
  location.href = 'userlist'

}

