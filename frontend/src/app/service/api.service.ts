import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { SigninComponent } from '../signin/signin.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  private usersApiUrl = 'https://cbank.onrender.com/users';
  private emailsApiUrl = 'https://cbank.onrender.com/emails';
  private operatorsApiUrl = 'https://cbank.onrender.com/operators';
  constructor(private http: HttpClient) {}
  


  getEmails(receiverId: any){
    return this.http.get(`${this.emailsApiUrl}/receiverId/${receiverId}`)
  }

  createUser(user: any){
    return this.http.post(this.usersApiUrl, user)
  }


  getUsers(){
    return this.http.get<any[]>(this.usersApiUrl)
  }
  

  
  
  saveEditing(id: any, editedUser: any){
    return this.http.put(`${this.usersApiUrl}/${id}`, editedUser);
  }
  
  
  deleteUser(id: string){
    return this.http.delete(`${this.usersApiUrl}/${id}`);
  }


  checkUser(email: string){
    return this.http.get<any[]>(`${this.usersApiUrl}/email/${email}`)
  }
  
  signinDataEmail(email: any){
    return this.http.get(`${this.usersApiUrl}/signin/email/${email}`)
  }
  signinDataPassword(password: string){
    return this.http.get(`${this.usersApiUrl}/signin/passwords/${password}`)
  }
  
  getreceiverId(email: string){
    return this.http.get<any[]>(`${this.usersApiUrl}/signin/receiverId/${email}`)
  }
  getOperator(receiverId: any){
    return this.http.get(`${this.operatorsApiUrl}/receiverId/${receiverId}`)
  }
  getUser(userId: string){
    return this.http.get(`${this.usersApiUrl}/user/${userId}`)
  }
  
}
