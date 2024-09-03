import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { ProfileService } from '../../../services/profile.service';
import { ProfileComponent } from './profile/profile.component';
import { ExperienceComponent } from './experience/experience.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    BannerComponent,
    ProfileComponent,
    ExperienceComponent,
  ],
  exports: [
    BannerComponent,
    ProfileComponent,
    ExperienceComponent,
  ],
  providers: [
    ProfileService,
  ]
})
export class ComponentsModule { }