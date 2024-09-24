import { Component, computed, input, signal, inject } from '@angular/core';
import { ProfileService } from '../../../../services/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectModalComponent } from './project-modal/project-modal.component';

@Component({
  selector: 'fmt-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private profileService = inject(ProfileService);
  private matDialog = inject(MatDialog);

  data = input<any>(null);
  searchText = signal<string>('');
  techs = computed<any[]>(() => this.profileService.data()?.techStackData?.techs);
  filters = signal<string[]>([]);
  projects = computed<any[]>(() => this.setupProjects(this.data(), this.searchText(), this.filters()));

  setupProjects(data: any, searchText: string, filters: string[]): any[] {
    let projects: any[] = data?.projects || [];
    projects = projects.filter((project: any) => this.isProjectMatched(searchText, filters, project));
    return projects.sort((a: any, b: any) => b.startDate.localeCompare(a.startDate));
  }

  setupFilters(techs: any[]): string[] {
    const filters: string[] = [];
    techs.forEach((tech: any) => filters.push(tech.name));
    return filters;
  }

  clearFilter(): void {
    this.filters.set([]);
  }

  toggleFilter(techName: string): void {
    const newFilters: string[] = [...this.filters()];

    newFilters.includes(techName) ?
    newFilters.splice(newFilters.indexOf(techName), 1) :
    newFilters.push(techName);

    this.filters.set(newFilters);
  }

  isProjectMatched(searchText: string, filters: string[], project: any): boolean {
    let isSearchMatched: boolean = true;
    let isFilterMatched: boolean = true;

    if (filters.length) {
      isFilterMatched = filters.some((filter: string) => project.techStack.includes(filter));
    }
    
    if (searchText) {
      const searchTextLowerCase: string = searchText.toLowerCase();
      const isTitleMatched: boolean = project.title.toLowerCase().includes(searchTextLowerCase);
      const isTechMatched: boolean = project.techStack.some((tech: string) => tech.toLowerCase().includes(searchTextLowerCase));
      isSearchMatched = isTitleMatched || isTechMatched;
    }

    return isSearchMatched && isFilterMatched;
  }

  openProjectModal(project: any): void {
    this.matDialog.open(ProjectModalComponent, {
      width: '80vw',
      height: '80vh',
      maxWidth: '80vw',
      data: { project }
    });
  }
}
