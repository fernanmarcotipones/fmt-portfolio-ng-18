import { Component, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { ScrollService } from '../../services/scroll.service';
import { ComponentsModule } from './components/components.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ComponentsModule],
  providers: [ProfileService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  profileService = inject(ProfileService);
  private subscriptions: Subscription[] = [];
  private scrollService = inject(ScrollService);
  data = signal<any>(null);
  isLoading: boolean = true;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.scrollService.setupScrollService(event);
  }

  ngOnInit(): void {
    const profileSub: Subscription = this.profileService
      .fetchData()
      .subscribe(data => {
        if (!data) return;
        setTimeout(() => {
          this.data.set(this.profileService.data());
          this.isLoading = false;
          console.log('data', this.data());
        }, 2000);
    });

    this.subscriptions.push(profileSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
