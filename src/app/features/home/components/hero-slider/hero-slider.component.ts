import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, HostListener, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { LocalizationService } from '../../../../core/services/localization.service';

interface SlidesData {
  id: number;
  video?: string;
  image?: string;
  title: string;
  description: string;
  paginationLabel: string;
  paginationDescription: string;
  statistic: {
    value: string;
    label: string;
  };
  sections: {
    title: string;
    description: string;
  }[];
}

interface PointsData {
  left: string | number;
  bottom: string | number;
  visible: boolean;
  value: string;
  label: string;
}

@Component({
  selector: 'app-hero-slider',
  imports: [CommonModule],
  templateUrl: './hero-slider.component.html',
  styleUrl: './hero-slider.component.scss',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeroSliderComponent implements AfterViewInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private dataService: DataService, public translation: LocalizationService) { }

  @ViewChild('swiperEl') swiperRef!: ElementRef;

  slides: SlidesData[] = [];
  points: PointsData[] = [];
  currentSlideIndex = 0;
  private swiper: any;

  ngOnInit(): void {
    this.dataService.getSlides().subscribe(data => {
      this.slides = data;
    });

    this.dataService.getPoints().subscribe(data => {
      this.points = data;
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const swiperEl = this.swiperRef?.nativeElement;
    if (!swiperEl) return;

    customElements.whenDefined('swiper-container').then(() => {

      if (typeof swiperEl.initialize === 'function') {
        const direction = this.translation.getCurrentLang() === 'ar' ? 'rtl' : 'ltr';
        Object.assign(swiperEl, {
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          speed: 800,
          effect: 'slide',
          navigation: {
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          },
          on: {
            slideChange: () => {
              this.updatePagination();
            }
          },
          autoplay: {
            delay: 5000,
            disableOnInteraction: true,
          },
        });
        swiperEl.initialize();
        this.swiper = swiperEl.swiper;

        // React to language changes and update direction
        this.translation.onLangChange$.subscribe(lang => {
          const direction = lang === 'ar' ? 'rtl' : 'ltr';
          if (this.swiper) {
            this.swiper.changeLanguageDirection(direction);
          }
        });
      } else {
        console.log(typeof swiperEl.initialize);
        console.error('swiperEl.initialize is not a function — Web Component is not upgraded');
      }
    });
  }

  updatePagination() {
    if (this.swiper) {
      this.currentSlideIndex = this.swiper.realIndex ?? this.swiper.activeIndex;
    }
  }

  ngOnDestroy(): void {
    if (this.swiperRef?.nativeElement) {
      const swiperEl = this.swiperRef.nativeElement;
      if (swiperEl.swiper) {
        swiperEl.swiper.destroy();
      }
    }
  }

  onSlideChange(event: any): void {
    console.log('Slide changed:', event);
    this.updatePagination();
  }

  goToSlide(index: number) {
    if (this.swiper) {
      this.swiper.slideTo(index);
    }
  }

  goPrev(): void {
    if (this.swiper) {
      this.swiper.slidePrev();
    }
  }

  goNext(): void {
    if (this.swiper) {
      this.swiper.slideNext();
    }
  }

  trackBySlideId(index: number, slide: SlidesData): number {
    return slide.id;
  }

  toggleCard(index: number) {
    this.points[index].visible = !this.points[index].visible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Hide all cards
    this.points.forEach((point) => {
      point.visible = false;
    });
  }

  getAdjustedBottom(bottom: string | number): string {
    if (typeof bottom === 'string') {
      if (bottom.endsWith('%')) {
        const value = parseFloat(bottom);
        return `${value + 5}%`;
      } else if (bottom.endsWith('px')) {
        const value = parseFloat(bottom);
        return `${value + 5}px`;
      }
      // Fallback for unrecognized units
      return bottom;
    } else if (typeof bottom === 'number') {
      return `${bottom + 5}px`;
    }
    return '0px';
  }

  getAdjustedLeft(left: string | number): string {
    if (typeof left === 'string') {
      if (left.endsWith('%')) {
        const value = parseFloat(left);
        return `${value - 2}%`;
      } else if (left.endsWith('px')) {
        const value = parseFloat(left);
        return `${value - 2}px`;
      }
      // Fallback for unrecognized units
      return left;
    } else if (typeof left === 'number') {
      return `${left - 2}px`;
    }
    return '0px';
  }
}