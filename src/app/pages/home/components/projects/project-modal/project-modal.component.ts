import { Component, computed, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'fmt-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss'
})
export class ProjectModalComponent {
  private matDialog = inject(MatDialog);
  private data = inject(MAT_DIALOG_DATA);
  
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

  close() {
    this.matDialog.closeAll();
  }

  getTechImgUrl(techName: string): string {
    return `assets/images/tech/${techName.toLocaleLowerCase()}.svg`
  }
}
