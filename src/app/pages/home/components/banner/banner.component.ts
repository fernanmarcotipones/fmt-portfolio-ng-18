import { Component } from '@angular/core';
import { BaseComponent } from '../base.component';
import { introImageAnimation } from '../animations';

@Component({
  selector: 'fmt-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  animations: [
    introImageAnimation,
  ],
})
export class BannerComponent extends BaseComponent {
  bannerBGPosition: string = '0px';
  bannerImagePosition: string = '0px';
  bannerOpacity: number = 100;
  override onScrollToDo(): void {
    this.bannerBGPosition = `calc(${this.scrollService.scrollPosition() / -2}px)`;
    this.bannerImagePosition = `calc(${this.scrollService.scrollPosition() / 2}px)`;
    this.bannerOpacity = 100 - (this.scrollService.scrollPosition() / 10);
    console.log(`Banner is inside of the viewport`);
  }
}
