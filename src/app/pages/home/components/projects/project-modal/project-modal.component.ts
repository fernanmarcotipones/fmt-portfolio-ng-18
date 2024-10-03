import { Component, computed, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProfileService } from '../../../../../services/profile.service';

@Component({
  selector: 'fmt-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss'
})
export class ProjectModalComponent {
  private matDialog = inject(MatDialog);
  private data = inject(MAT_DIALOG_DATA);
  profileService = inject(ProfileService);
  
  project = signal<any>(this.data?.project);
  imagesLength = computed(() => this.project().images.length);
  currentIndex = 0;

  setActiveImage(index: number) {
    this.currentIndex = index;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.imagesLength()) % this.imagesLength();
    this.setActiveImage(this.currentIndex);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.imagesLength();
    this.setActiveImage(this.currentIndex);
  }

  getMonthDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate): new Date();
    const yearDiff: number = end.getFullYear() - start.getFullYear();
    const startDiff: number = yearDiff > 0 ? 12 - start.getMonth() : end.getMonth() - start.getMonth();
    const endDiff: number = yearDiff > 0 ? end.getMonth() + 1 : 0;
    const betweenDiff: number = yearDiff > 0 ? (yearDiff-1) * 12 : 0;
    const months: number = Number(startDiff + endDiff + betweenDiff);
    return months;
  }
  
  close() {
    this.matDialog.closeAll();
  }
}
