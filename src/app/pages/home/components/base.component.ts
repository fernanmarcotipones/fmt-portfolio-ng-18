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
  componentTop: number = 0;
  componentBottom: number = 0;
  isInsideViewport: boolean = true;
  isOutsideViewport: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.componentTop = this.elementRef.nativeElement.offsetTop;
    this.componentBottom = this.componentTop + this.elementRef.nativeElement.offsetHeight;
    this.isInsideViewport = this.scrollService.isInsideViewport(this.componentTop, this.componentBottom);
    this.isOutsideViewport = this.scrollService.isOutsideViewport(this.componentTop, this.componentBottom);

    if (this.isInsideViewport) this.onScrollToDo();
  }

  onScrollToDo(): void {}
}