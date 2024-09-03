import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { ProfileService } from '../../../services/profile.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    BannerComponent,
  ],
  exports: [
    BannerComponent,
  ],
  providers: [
    ProfileService,
  ]
})
export class ComponentsModule { }