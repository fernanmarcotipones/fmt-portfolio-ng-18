import { Component, computed, input, signal, effect } from '@angular/core';

@Component({
  selector: 'fmt-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  data = input<any>(null);
  filterText = signal<string>('');
  projects = computed(() => this.setupProjects(this.data(), this.filterText()));

  setupProjects(data: any, filterText: string): any[] {
    let projects: any[] = data?.projects || [];
    if (filterText) {
      projects = projects.filter((project: any) => this.isProjectMatched(filterText, project));
    }
    return projects.sort((a: any, b: any) => b.startDate.localeCompare(a.startDate));
  }

  isProjectMatched(filterText: string, project: any): boolean {
    const filterTextLowerCase: string = filterText.toLowerCase();
    const isTitleMatched: boolean = project.title.toLowerCase().includes(filterTextLowerCase);
    const isTechMatched: boolean = project.techStack.some((tech: string) => tech.toLowerCase().includes(filterTextLowerCase));
    return isTitleMatched || isTechMatched;
  }
}
