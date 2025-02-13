import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.css'
})


export class OperatorsComponent {
  constructor(private apiService: ApiService){}
  operators: any = [];
  onOperator = {
    _id: '',
    senderId: '',
    recivedId: '',
    title: '',
    content: '',
    startTime: '',
    endTime: '',
    estimatedTime: ''
    
  }
  ngOnInit(): void {
    const receiverId: any = localStorage.getItem('receiverId')
    this.apiService.getOperator(receiverId).subscribe((data) => {
        this.operators = data;
    });
}
}
