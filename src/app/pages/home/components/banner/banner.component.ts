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
  typeSpeed: number = 10;
  totalAnimationDuration: number = 0;
  isLogoAnimationDone: boolean = false;
  bannerTextsData = computed<any[]>(() => {
    const firstName: string = this.data()?.firstName || '';
    const lastName: string = this.data()?.lastName || '';
    const position: string = this.data()?.position || '';
    const bannerTexts: string[] = [firstName, lastName, position];
    return this.getBannerTextsData(bannerTexts);
  });

  override onScrollToDo(): void {
    this.bannerBGPosition = `calc(${this.scrollService.scrollPosition() / -2}px)`;
    this.bannerImagePosition = `calc(${this.scrollService.scrollPosition() / 2}px)`;
    this.bannerOpacity = 100 - ((this.scrollService.scrollPosition() / this.componentBottom) * 100);
    console.log(`Banner is inside of the viewport`);
  }

  ngAfterViewInit(): void {
    this.setupAnimationTimings();
  }

  setupAnimationTimings(): void {
    setTimeout(() => {
      this.isLogoAnimationDone = true;
    }, 700);

    setTimeout(() => {
      this.profileService.isBannerLoaded.set(true);
    }, this.totalAnimationDuration * 1000);
  }

  getBannerTextsData(bannerTexts: string[]): any[] {
    if(!bannerTexts || !bannerTexts.length) return [];

    const bannerTextsData: any[] = [];

    let currentDelay: number = 0;
    this.totalAnimationDuration = 0;

    bannerTexts.forEach((text: string, index: number) => {
      if (!text) {
        bannerTextsData.push(null);
        return;
      }

      currentDelay += index !== 0 ? bannerTextsData[index-1]?.animationDuration : 0;
      const animationDuration: number = text.length / this.typeSpeed;
      const animationDelay: number = currentDelay;
      const blinkSpeed: number = 0.5;
      const blinkIteration: number = index === bannerTexts.length - 1 ?
        Math.round(animationDuration / blinkSpeed) + 3 :
        Math.round(animationDuration / blinkSpeed);
      this.totalAnimationDuration += animationDuration;

      const bannerTextObject: any = { text, animationDuration, animationDelay, blinkSpeed, blinkIteration };
      bannerTextsData.push(bannerTextObject);
    });

    return bannerTextsData;
  }

  getTypeBeforeAnimationStyle(textData: any): any {
    if(!textData) return null;

    const style: any = {
      'animation-duration': `${textData.animationDuration}s`,
      'animation-delay': `${textData.animationDelay}s`,
      'animation-timing-function': `steps(${textData.text?.length})`,
    };

    return style;
  }

  getTypeAfterAnimationStyle(textData: any, isLast: boolean): any {
    if(!textData) return null;

    const style: any = {
      'animation-duration': `${textData.animationDuration}s, ${textData.blinkSpeed}s`,
      'animation-delay': `${textData.animationDelay}s`,
      'animation-timing-function': `steps(${textData.text?.length}), steps(${textData.text?.length})`,
      'animation-iteration-count': `1, ${textData.blinkIteration}`,
    };

    if (isLast) style['height'] = '50%';

    return style;
  }
}
