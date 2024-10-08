import { Component, computed, inject, input } from '@angular/core';
import { ProfileService } from '../../../../services/profile.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'fmt-tech-stack',
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss'
})
export class TechStackComponent extends BaseComponent {
  techs = computed<any[]>(() => this.data()?.techs);

  override onScrollToDo(): void {
    console.log(`Experience is inside of the viewport`);
  }

  getTechWidth(dayUsed: number): number {
    if (!dayUsed) return 0;
    return Math.round(dayUsed / this.techs()[0].dayUsed * 100);
  }
}
