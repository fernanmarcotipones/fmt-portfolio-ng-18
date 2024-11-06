import { AfterViewInit, Component, computed } from '@angular/core';
import { BaseComponent } from '../base.component';
import { bannerSectionAnimation, logoBannerAnimation } from '../animations';

@Component({
  selector: 'fmt-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  animations: [
    logoBannerAnimation,
    bannerSectionAnimation,
  ],
})
export class BannerComponent extends BaseComponent implements AfterViewInit {
  bannerBGPosition: string = '0px';
  bannerImagePosition: string = '0px';
  bannerOpacity: number = 100;
  typeSpeed: number = 10;
  totalAnimationDuration: number = 0;
  logoAnimationDuration: number = 1000;
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
    }, this.logoAnimationDuration);

    setTimeout(() => {
      this.profileService.isBannerLoaded.set(true);
    }, this.totalAnimationDuration + this.logoAnimationDuration);
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
      this.totalAnimationDuration += animationDuration;

      const charsData: any[] = [];
      text.split('').forEach((char: string, charIndex: number) => {
        const charAnimationDuration: number = animationDuration / text?.length;
        const charAnimationDelay: number = animationDelay + (charAnimationDuration * charIndex);
        const charObject: any = { charAnimationDuration, charAnimationDelay };
        const charStyle: any = this.getTypeCharAnimationStyle(charObject);
        const charData: any = { char, charStyle };
        const isLast: boolean = index === bannerTexts.length - 1 && charIndex === text?.length - 1;
        if(isLast) charData['blinkStyle'] = this.getTypeBlinkAnimationStyle(charObject);
        charsData.push(charData);
      })

      const textData: any = { text, charsData, animationDuration };
      bannerTextsData.push(textData);
    });

    this.totalAnimationDuration = this.totalAnimationDuration * 1000;
    return bannerTextsData;
  }

  getTypeCharAnimationStyle(charData: any): any {
    if(!charData) return null;

    const style: any = {
      'animation-duration': `${charData.charAnimationDuration}s`,
      'animation-delay': `${charData.charAnimationDelay}s`,
    };

    return style;
  }

  getTypeBlinkAnimationStyle(charData: any): any {
    if(!charData) return null;

    const style: any = {
      'animation-duration': `0.5s`,
      'animation-timing-function': 'steps(12)',
      'animation-iteration-count': '4',
      'animation-delay': `${charData.charAnimationDelay}s`,
    };

    return style;
  }
}
