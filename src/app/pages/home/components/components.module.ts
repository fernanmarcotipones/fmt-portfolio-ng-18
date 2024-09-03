import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { ProfileService } from '../../../services/profile.service';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    BannerComponent,
    ProfileComponent,
  ],
  exports: [
    BannerComponent,
    ProfileComponent,
  ],
  providers: [
    ProfileService,
  ]
})
export class ComponentsModule { }