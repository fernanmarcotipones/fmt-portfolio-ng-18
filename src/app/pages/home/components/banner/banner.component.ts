import { Component } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'fmt-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent extends BaseComponent {
  bannerBGPosition: string = '0px';
  override onScrollToDo(): void {
    this.bannerBGPosition = `calc(${this.scrollService.scrollPosition() / -2}px)`;
    console.log(`Banner is inside of the viewport`);
  }
}
