import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { SigninComponent } from '../signin/signin.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  private usersApiUrl = 'http://localhost:3000/users'; // تأكد أن المنفذ صحيح
  private emailsApiUrl = 'http://localhost:3000/emails'; // تأكد أن المنفذ صحيح
  private operatorsApiUrl = 'http://localhost:3000/operators'; // تأكد أن المنفذ صحيح
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
