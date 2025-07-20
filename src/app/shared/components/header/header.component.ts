import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalizationService } from '../../../core/services/localization.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  navigationItems = [
    { label: 'Home', link: '/' },
    { label: 'Our Vision', link: '/vision' },
    { label: 'Our Scope', link: '/scope' },
    { label: 'Services & Solutions', link: '/services' },
    { label: 'Initiatives', link: '/initiatives' },
    { label: 'Download Center', link: '/downloads' }
  ];

  isAccessibilityOpen = false;
  currentLanguage = 'en';
  selectedFont = 'normal';
  selectedContrast = 'default';
  isSticky = false;
  isNavOpen: boolean = false;
  activeSection: string = '';

  constructor(public translation: LocalizationService) {}

  @ViewChild('accessibilityWrapper', { static: true }) wrapperRef!: ElementRef;
  @ViewChild('toggler') toggler!: ElementRef<HTMLButtonElement>;

  switchLanguage(): void {
    const newLang = this.translation.getCurrentLang() === 'en' ? 'ar' : 'en';
    this.translation.setLanguage(newLang);
  }

  get currentLang() {
    return this.translation.getCurrentLang();
  }

  toggleAccessibility() {
    this.isAccessibilityOpen = !this.isAccessibilityOpen;
  }

  @HostListener('document:click', ['$event.target'])

  onClickOutside(target: HTMLElement) {
    if (
      this.isAccessibilityOpen &&
      this.wrapperRef &&
      !this.wrapperRef.nativeElement.contains(target)
    ) {
      this.isAccessibilityOpen = false;
    }
  }

  @HostListener('window:scroll', [])

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;

    if (this.isNavOpen) {
      document.body.classList.add('body--fixed');
    } else {
      document.body.classList.remove('body--fixed');
    }
  }

  fontSizes = [
    { label: 'A--', value: 'xsmall' },
    { label: 'A-', value: 'small' },
    { label: 'A', value: 'normal' },
    { label: 'A+', value: 'large' },
    { label: 'A++', value: 'xlarge' },
  ];

  contrastModes = [
    { label: 'One Portal Colors', value: 'default' },
    { label: 'Color Blind', value: 'colorblind' },
    { label: 'Green Weeknes', value: 'greenweakness' },
  ];

  setFontSize(size: string) {
    this.selectedFont = size;
    const root = document.documentElement;
    let fontSize = '16px';

    switch (size) {
      case 'xsmall': fontSize = '12px'; break;
      case 'small': fontSize = '14px'; break;
      case 'normal': fontSize = '16px'; break;
      case 'large': fontSize = '18px'; break;
      case 'xlarge': fontSize = '20px'; break;
    }

    root.style.setProperty('font-size', fontSize);
  }

  applyContrastMode(mode: string) {
    const body = document.body;
    body.classList.remove('colorblind', 'greenweakness');
    if (mode !== 'default') {
      body.classList.add(mode);
    }
  }

  triggerScreenReader() {
    const text = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }

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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isSticky = scrollTop > 50;

    const sectionIds = [
      'hero-slider-section',
      'vision-section',
      'scope-section',
      'services-section',
      'initiatives-section',
      'download-section'
    ];

    for (let id of sectionIds) {
      const section = document.getElementById(id);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          this.activeSection = id;
          break;
        }
      }
    }
  }
}