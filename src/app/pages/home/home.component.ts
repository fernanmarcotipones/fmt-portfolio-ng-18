import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
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
  private subscriptions: Subscription[] = [];
  private profileService = inject(ProfileService);
  data = signal<any>(null);
  isLoading: boolean = true;

  ngOnInit(): void {
    const profileSub: Subscription = this.profileService
      .fetchData()
      .subscribe(data => {
        if (!data) return;
        setTimeout(() => {
          this.data.set(this.profileService.data());
          this.isLoading = false;
          console.log('data', this.data());
        }, 3000);
    });

    this.subscriptions.push(profileSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
