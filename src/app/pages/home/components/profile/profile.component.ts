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
}
