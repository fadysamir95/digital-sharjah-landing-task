import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { LocalizationService } from '../../../../core/services/localization.service';

interface Initiative {
  index: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-leadership',
  imports: [CommonModule],
  templateUrl: './leadership.component.html',
  styleUrl: './leadership.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LeadershipComponent {
  constructor(private dataService: DataService, public translation: LocalizationService) {}
  
  initiatives: Initiative[] = [];
  activeIndex: number | null = null;

  ngOnInit(): void {
    this.dataService.getInitiatives().subscribe(data => {
      this.initiatives = data;
    });
  }

  toggleItem(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
