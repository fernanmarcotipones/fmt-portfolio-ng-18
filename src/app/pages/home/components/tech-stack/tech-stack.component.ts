import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'fmt-tech-stack',
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss'
})
export class TechStackComponent {
  data = input<any>(null);
  techs = computed<any[]>(() => this.data()?.techs);

  getTechWidth(dayUsed: number): number {
    if (!dayUsed) return 0;
    return Math.round(dayUsed / this.techs()[0].dayUsed * 100);
  }

  openLink(link: string): void {
    window.open(link, "_blank");
  }
}
