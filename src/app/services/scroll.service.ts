import { computed, Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  scrollPosition = signal<number>(0);
  viewPortTop = signal<number>(window.scrollY);
  viewPortBottom = computed<number>(() => this.viewPortTop() + window.innerHeight);

  setupScrollService(event: any): void {
    this.viewPortTop.set(window.scrollY);
    this.scrollPosition.set(event.target.documentElement.scrollTop);
  }

  isInsideViewport(componentTop: number,componentBottom: number): boolean {
    const isTopInsideViewport: boolean = this.viewPortTop() <= componentTop && componentTop < this.viewPortBottom();
    const isBottomInsideViewport: boolean = this.viewPortTop() <= componentBottom && componentBottom < this.viewPortBottom();
    const isInsideViewport: boolean = isTopInsideViewport || isBottomInsideViewport;
    return isInsideViewport;
  }

  isOutsideViewport(componentTop: number,componentBottom: number): boolean {
    return !this.isInsideViewport(componentTop, componentBottom);
  }
}