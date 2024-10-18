import { AfterViewInit, Component, computed } from '@angular/core';
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
export class BannerComponent extends BaseComponent implements AfterViewInit {
  bannerBGPosition: string = '0px';
  bannerImagePosition: string = '0px';
  bannerOpacity: number = 100;
  state: string = 'start';
  animationDuration: number = 3;
  bannerTexts = computed<string[]>(() => {
    const firstName: string = this.data()?.firstName || '';
    const lastName: string = this.data()?.lastName || '';
    const position: string = this.data()?.position || '';
    return [firstName, lastName, position];
  });

  override onScrollToDo(): void {
    this.bannerBGPosition = `calc(${this.scrollService.scrollPosition() / -2}px)`;
    this.bannerImagePosition = `calc(${this.scrollService.scrollPosition() / 2}px)`;
    this.bannerOpacity = 100 - ((this.scrollService.scrollPosition() / this.componentBottom) * 100);
    console.log(`Banner is inside of the viewport`);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.state = 'end';
    }, 500);
  }

  getTypeBeforeAnimationStyle(text: string, index: number): any {
    if(!text) return null;
    const animationDelay: number = index * this.animationDuration;
    const style: any = {
      'animation-delay': `${animationDelay}s`,
      'animation-timing-function': `steps(${text.length})`,
    };
    return style;
  }

  getTypeAfterAnimationStyle(text: string, index: number, isLast: boolean): any {
    if(!text) return null;
    const animationDelay: number = index * this.animationDuration;
    const blinkSpeed: number = 0.5;
    const blinkDuration: number = isLast ? (this.animationDuration / blinkSpeed) * 2 : (this.animationDuration / blinkSpeed);
    const style: any = {
      'animation-delay': `${animationDelay}s`,
      'animation-timing-function': `steps(${text.length}), steps(${text.length})`,
      'animation-iteration-count': `1, ${blinkDuration}`,
    };
    return style;
  }
}
