import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private apiService: ApiService){}
  user: any = []
  onUser: any[] = [{
    userId: '',
    name: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    age: '',
    skills: [],
    experience: '',
    summary: '',
    profile: '',
  }]

  ngOnInit(): void {
    const userId: any = localStorage.getItem('receiverId');
    this.apiService.getUser(userId).subscribe((data) => {
      this.user = data
    })
  }
}
