import { Component, ElementRef, HostListener, inject, input } from '@angular/core';
import { ScrollService } from '../../../services/scroll.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'fmt-base-component',
  template: '<ng-content></ng-content>'
})
export class BaseComponent {
  elementRef = inject(ElementRef);
  scrollService = inject(ScrollService);
  profileService = inject(ProfileService);
  data = input<any>(null);
  isInsideViewport: boolean = true;
  isOutsideViewport: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const componentTop = this.elementRef.nativeElement.offsetTop;
    const componentBottom = componentTop + this.elementRef.nativeElement.offsetHeight;
    this.isInsideViewport = this.scrollService.isInsideViewport(componentTop, componentBottom);
    this.isOutsideViewport = this.scrollService.isOutsideViewport(componentTop, componentBottom);

    if (this.isInsideViewport) this.onScrollToDo();
  }

  onScrollToDo(): void {}
}