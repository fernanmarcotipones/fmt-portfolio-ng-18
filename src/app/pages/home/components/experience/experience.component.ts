import { Component } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'fmt-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent extends BaseComponent {
  override onScrollToDo(): void {
    console.log(`Experience is inside of the viewport`);
  }
}
