import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { LocalizationService } from '../../../../core/services/localization.service';

interface DownloadItem {
  title: string;
  description: string;
  date: string;
  link: string;
}

@Component({
  selector: 'app-download-center',
  imports: [CommonModule],
  templateUrl: './download-center.component.html',
  styleUrl: './download-center.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DownloadCenterComponent {
  constructor(private dataService: DataService, public translation: LocalizationService) {}

  downloadItems: DownloadItem[] = [];

  ngOnInit(): void {
    this.dataService.getDownloadItems().subscribe(data => {
      this.downloadItems = data;
    });
  }
}