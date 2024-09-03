import { Component, input } from '@angular/core';

@Component({
  selector: 'fmt-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  data = input<any>(null);
}
