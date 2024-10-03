import { Component, computed, inject, input } from '@angular/core';
import { ProfileService } from '../../../../services/profile.service';

@Component({
  selector: 'fmt-tech-stack',
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss'
})
export class TechStackComponent {
  profileService = inject(ProfileService);
  data = input<any>(null);
  techs = computed<any[]>(() => this.data()?.techs);

  getTechWidth(dayUsed: number): number {
    if (!dayUsed) return 0;
    return Math.round(dayUsed / this.techs()[0].dayUsed * 100);
  }
}
