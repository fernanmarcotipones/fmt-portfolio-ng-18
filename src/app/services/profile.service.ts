import { HttpClient } from "@angular/common/http";
import { inject, Injectable, Signal, signal } from '@angular/core';
import { Observable, tap } from "rxjs";
import { clone, cloneDeep } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  data = signal<any>(null);
  private dummyDataUrl: string = 'assets/data/data.json';
  private http = inject(HttpClient);

  fetchData(): Observable<any> {
    return this.http.get(this.dummyDataUrl)
      .pipe(
        tap(data => this.setupData(data))
      )
  }

  setupData(data: any): any {
    const bannerData = (cloneDeep(data?.bannerData));
    const profileData = cloneDeep(data?.profileData);
    const experienceData = cloneDeep(data?.experienceData);
    const projectData = cloneDeep(data?.projectData);
    const techStackData = this.setupTechStackData(data?.projectData, data?.techStackData);
    const contactData = cloneDeep(data?.contactData);
    const newData = { bannerData, profileData, experienceData, projectData, techStackData, contactData };
    this.data.set(newData);
    return newData;
  }

  setupTechStackData(projectData: any, techStackData: any): any {
    if (!projectData) return techStackData;

    let techData: any = cloneDeep(techStackData);
    let projectTechs: any = {};

    projectData?.projects?.forEach((project: any) => {
      project.techStack.forEach((tech: string) => {
        const dayUsed = project.endDate ?
          Math.round((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 3600 * 24)) :
          Math.round((new Date().getTime() - new Date(project.startDate).getTime()) / (1000 * 3600 * 24));
          projectTechs[tech] = (projectTechs[tech] || 0) + dayUsed;
      });
    });
    
    Object.keys(projectTechs).forEach((techName: string) => {
      const tech: any = techData.techs.find((tech: any) => tech.name.toLocaleLowerCase() === techName.toLocaleLowerCase());

      if (tech) {
        tech.dayUsed = projectTechs[techName];
      } else {
        const techObj: any = {
          name: techName,
          dayUsed: projectTechs[techName],
          imgUrl: this.getTechImgUrl(techName),
          link: `https://www.google.com/search?q=${techName}`
        }
        techData.techs.push(techObj);
      }
    });

    techData.techs.sort((a: any, b: any) => b.dayUsed - a.dayUsed);
    return techData;
  }

  getTechImgUrl(techName: string): string {
    return `assets/images/tech/${techName.toLocaleLowerCase()}.svg`
  }

  openLink(link: string): void {
    if (!link) return;
    window.open(link, "_blank");
  }
}