import { Component, input } from '@angular/core';

@Component({
  selector: 'fmt-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  data = input<any>(null);
}
