import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { dir } from 'console';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  signupStateForm = true;
  signupStateSuccess = false;
  signupStateError = false;
  signupStatePassword = false;
  constructor (private apiService: ApiService) {}
  newUser = {
    name: '',
    email: '',
    password: ''
  }
  cpassword = ''
  passtype = 'password';
  checkbox = false;
  toSignup(){
    this.signupStateForm = true;
    this.signupStateSuccess = false;
    this.signupStateError = false;
    this.signupStatePassword = false;
  }
  send() {
    if(this.newUser.password === this.cpassword){
      this.apiService.checkUser(this.newUser.email).subscribe((data) => {
        if(data){
          this.apiService.createUser(this.newUser).subscribe();
          this.signupStateForm = false;
          this.signupStateSuccess = true;
          this.signupStateError = false;
          this.signupStatePassword = false;
  
        }else{
          this.signupStateForm = false;
          this.signupStateSuccess = false;
          this.signupStateError = true;
          this.signupStatePassword = false;
        }
  
      })
    }else{
          this.signupStateForm = false;
          this.signupStateSuccess = true;
          this.signupStateError = false;
          this.signupStatePassword = true;
    }
    
  }

  updatePassType(): void {
    if (this.checkbox === true){
      this.passtype = 'text'
    }else if (this.checkbox === false){
      this.passtype = 'password'
    }
  }
  
}
  


