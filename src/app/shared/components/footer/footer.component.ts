import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { LocalizationService } from '../../../core/services/localization.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
  constructor(public translation: LocalizationService) {}

  @ViewChild('toggler') toggler!: ElementRef<HTMLButtonElement>;

  activeSection: string = '';

    scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    if (this.toggler.nativeElement.offsetParent !== null) {
      this.toggler.nativeElement.click();
      this.activeSection = sectionId;
    }

    document.body.classList.remove('body--fixed');
  }
}