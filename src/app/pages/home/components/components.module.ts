import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { ProfileService } from '../../../services/profile.service';
import { ProfileComponent } from './profile/profile.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    BannerComponent,
    ProfileComponent,
    ExperienceComponent,
    ProjectsComponent,
  ],
  exports: [
    BannerComponent,
    ProfileComponent,
    ExperienceComponent,
    ProjectsComponent,
  ],
  providers: [
    ProfileService,
  ]
})
export class ComponentsModule { }