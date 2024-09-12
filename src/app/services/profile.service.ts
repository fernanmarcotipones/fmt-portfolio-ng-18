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
    const techStackData = this.setupTechStackData(data?.projectData);
    const contactData = cloneDeep(data?.contactData);
    const newData = { bannerData, profileData, experienceData, projectData, techStackData, contactData };
    this.data.set(newData);
    return newData;
  }

  setupTechStackData(projectData: any): any {
    if (!projectData) return null;

    let techData: any;
    let techArr: any[] = [];
    let techObj: any = {};

    projectData?.projects?.forEach((project: any) => {
      project.techStack.forEach((tech: string) => {
        const dayUsed = project.endDate ?
          Math.round((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 3600 * 24)) :
          Math.round((new Date().getTime() - new Date(project.startDate).getTime()) / (1000 * 3600 * 24));
          techObj[tech] = (techObj[tech] || 0) + dayUsed;
      });
    });

    techArr = Object.keys(techObj).map((tech: string) => (
      { name: tech, dayUsed: techObj[tech], imgUrl: `/assets/images/tech/${tech.toLocaleLowerCase()}.svg` }
    ));

    techArr.sort((a: any, b: any) => b.dayUsed - a.dayUsed);

    techData = {
      techs: cloneDeep(techArr)
    }

    return techData;
  }
}