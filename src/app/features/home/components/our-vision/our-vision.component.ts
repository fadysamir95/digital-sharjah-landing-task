import { Component, ViewEncapsulation } from '@angular/core';
import { LocalizationService } from '../../../../core/services/localization.service';

@Component({
  selector: 'app-our-vision',
  imports: [],
  templateUrl: './our-vision.component.html',
  styleUrl: './our-vision.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class OurVisionComponent {
  constructor(public translation: LocalizationService) {}
}