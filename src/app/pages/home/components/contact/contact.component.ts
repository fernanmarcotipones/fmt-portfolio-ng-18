import { Component, input } from '@angular/core';

@Component({
  selector: 'fmt-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  data = input<any>(null);
}
