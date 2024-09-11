import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { ProfileService } from '../../../services/profile.service';
import { ProfileComponent } from './profile/profile.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';
import { FormsModule } from '@angular/forms';
import { TechStackComponent } from './tech-stack/tech-stack.component';

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
    TechStackComponent,
  ],
  exports: [
    BannerComponent,
    ProfileComponent,
    ExperienceComponent,
    ProjectsComponent,
    TechStackComponent,
  ],
  providers: [
    ProfileService,
  ]
})
export class ComponentsModule { }