import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BannerComponent } from './banner/banner.component';
import { ProfileComponent } from './profile/profile.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectModalComponent } from './projects/project-modal/project-modal.component';
import { TechStackComponent } from './tech-stack/tech-stack.component';
import { ContactComponent } from './contact/contact.component';

import { ProfileService } from '../../../services/profile.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
  ],
  declarations: [
    BannerComponent,
    ProfileComponent,
    ExperienceComponent,
    ProjectsComponent,
    TechStackComponent,
    ContactComponent,
    ProjectModalComponent,
  ],
  exports: [
    BannerComponent,
    ProfileComponent,
    ExperienceComponent,
    ProjectsComponent,
    TechStackComponent,
    ContactComponent,
    ProjectModalComponent,
  ],
  providers: [
    ProfileService,
  ]
})
export class ComponentsModule { }