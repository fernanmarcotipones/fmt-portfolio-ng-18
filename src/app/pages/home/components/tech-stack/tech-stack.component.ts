import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'fmt-tech-stack',
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss'
})
export class TechStackComponent {
  data = input<any>(null);
  techs = computed<any[]>(() => this.setupTechs(this.data()));

  setupTechs(data: any): any[] {
    let techs: any[] = [];
    let techObj: any = {};

    data?.projects?.forEach((project: any) => {
      project.techStack.forEach((tech: string) => {
        const dayUsed = project.endDate ?
          Math.round((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 3600 * 24)) :
          Math.round((new Date().getTime() - new Date(project.startDate).getTime()) / (1000 * 3600 * 24));
          techObj[tech] = (techObj[tech] || 0) + dayUsed;
      });
    });

    techs = Object.keys(techObj).map((tech: string) => (
      { name: tech, dayUsed: techObj[tech], imgUrl: `/assets/images/tech/${tech.toLocaleLowerCase()}.svg` }
    ));

    techs.sort((a: any, b: any) => b.dayUsed - a.dayUsed);

    return techs;
  }

  getTechWidth(dayUsed: number): number {
    if (!dayUsed) return 0;
    return Math.round(dayUsed / this.techs()[0].dayUsed * 100);
  }
}
