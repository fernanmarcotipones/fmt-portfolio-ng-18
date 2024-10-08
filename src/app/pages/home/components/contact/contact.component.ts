import { Component } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'fmt-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent extends BaseComponent {
  override onScrollToDo(): void {
    console.log(`Contact is inside of the viewport`);
  }
}
