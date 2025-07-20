import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { LocalizationService } from '../../../../core/services/localization.service';

interface Service {
  title: string;
  description: string;
  icon: string;
  category: string;
}
@Component({
  selector: 'app-one-connected-government',
  imports: [CommonModule],
  templateUrl: './one-connected-government.component.html',
  styleUrl: './one-connected-government.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class OneConnectedGovernmentComponent {
  constructor(private dataService: DataService, public translation: LocalizationService) {}
  
  services: Service[] = [];
  activeCategory: string = 'All';
  categories: string[] = [
    'All',
    'Digital Infrastructure',
    'Operations Management',
    'Government Experience',
    'Training & Assessment',
  ];

  ngOnInit(): void {
    this.dataService.getServices().subscribe(data => {
      this.services = data;
    });
  }

  get filteredServices(): Service[] {
    if (this.activeCategory === 'All') {
      return this.services;
    }

    return this.services.filter(service => service.category === this.activeCategory);
  }

  setCategory(category: string): void {
    this.activeCategory = category;
  }
}