import { Component } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'fmt-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent extends BaseComponent {
  override onScrollToDo(): void {
    console.log(`Profile is inside of the viewport`);
  }

  getDescription(description: string, startDate: string): string {
    const start = new Date(startDate); // Parse ISO date string
    const now = new Date();
  
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    let experienceLength = '';
    if (years > 0) {
      experienceLength += `${years} year${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
      if (experienceLength) experienceLength += ' and ';
      experienceLength += `${months} month${months > 1 ? 's' : ''}`;
    }
  
    return description.replace('{{experienceLength}}', experienceLength);
  }
  
}
