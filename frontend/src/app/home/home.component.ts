import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  constructor(private apiService: ApiService){}
  emails: any[] = []
  user: any = {}
  userId: any = localStorage.getItem('receiverId');
  
  inbox = false;
  hiddenPage: string = 'hidden';
  currentPage = 'home';
  cardSelected = false;
  ngOnInit(): void {
      this.apiService.getUser(this.userId).subscribe(user => {
        this.user = user
        alert(JSON.stringify(user))
      })
  }
  exit(){
    localStorage.clear()
    location.href = '/signin'
  }
  hiddenPageFunc(page: string) {
    this.currentPage = page;
  }
  
    
}

