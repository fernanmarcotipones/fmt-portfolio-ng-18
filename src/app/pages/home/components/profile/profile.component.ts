import { Component, input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'fmt-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent extends BaseComponent {
  experienceData = input<any>(null);
  override onScrollToDo(): void {
    console.log(`Profile is inside of the viewport`);
  }

  getDescription(description: string): string {
    const experiences: any[] = this.experienceData().experiences || [];

    if (!experiences.length) return description.replace("{{experienceLength}}", "0 years");

    const mergedPeriods = this.mergeExperiencePeriods(experiences);
    const { years, months } = this.calculateExperience(mergedPeriods);

    let experienceText = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : "";
    if (months > 0) {
        experienceText += years > 0 ? ` and ${months} month${months > 1 ? 's' : ''}` : `${months} month${months > 1 ? 's' : ''}`;
    }

    return description.replace("{{experienceLength}}", experienceText);
  }
  
  private mergeExperiencePeriods(experiences: any[]): any[] {
    let periods = experiences.map(exp => ({
        start: new Date(exp.startDate),
        end: exp.endDate ? new Date(exp.endDate) : new Date()
    }));

    periods.sort((a, b) => a.start.getTime() - b.start.getTime());

    let mergedPeriods: { start: Date, end: Date }[] = [];

    for (let period of periods) {
        let last = mergedPeriods[mergedPeriods.length - 1];

        if (!last || period.start > last.end) {
            mergedPeriods.push(period);
        } else {
            last.end = period.end > last.end ? period.end : last.end;
        }
    }

    return mergedPeriods;
  }

  private calculateExperience(mergedPeriods: any[]): { years: number, months: number } {
    let totalMonths = 0;
    let extraDays = 0;

    mergedPeriods.forEach(period => {
        let start = period.start;
        let end = period.end;

        let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        let days = end.getDate() - start.getDate();

        totalMonths += months;
        extraDays += days;
    });

    if (extraDays > 0) {
        let lastEndDate = mergedPeriods[mergedPeriods.length - 1].end;
        let daysInLastMonth = new Date(lastEndDate.getFullYear(), lastEndDate.getMonth() + 1, 0).getDate();

        if (extraDays >= daysInLastMonth) {
            totalMonths += 1;
        }
    }

    return {
        years: Math.floor(totalMonths / 12),
        months: totalMonths % 12
    };
  }

}
