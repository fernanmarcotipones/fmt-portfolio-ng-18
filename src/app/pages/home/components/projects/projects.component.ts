import { Component, input } from '@angular/core';

@Component({
  selector: 'fmt-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  data = input<any>(null);
}
