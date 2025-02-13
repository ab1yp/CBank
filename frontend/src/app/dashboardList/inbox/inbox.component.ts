import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent {
constructor(private apiService: ApiService){}
  emails: any = []
  selectedEmail = {
    _id: '',
    senderId: '',
    receiverId: '',
    title: '',
    content: '',
    timestamp: ''
  }

  
  
  inbox = false;
  hiddenPage: string = 'hidden';
  currentPage = 'inbox';
  cardSelected = false;


  ngOnInit(): void {

    const receiverId: any = localStorage.getItem('receiverId')
    this.apiService.getEmails(receiverId).subscribe((data) => {
        this.emails = data;
    });

  }
  selectEmail(email: any){
    this.selectedEmail = {...email}
    this.inbox = true;
  }
    
}
