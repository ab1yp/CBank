import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  inbox = false;
  hiddenSection: string = 'hidden';
  currentSection = 'account';
  cardSelected = false;
  
  hiddenSectionFunc(section: string) {
    this.currentSection = section;
  }
    
}
