import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { LocalizationService } from '../../../../core/services/localization.service';

interface CardsData {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconColored: string;
  index: string;
  isHovered: boolean;
}

@Component({
  selector: 'app-our-scope',
  imports: [CommonModule],
  templateUrl: './our-scope.component.html',
  styleUrl: './our-scope.component.scss',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OurScopeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('swiperElement') swiperRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private dataService: DataService, public translation: LocalizationService) { }

  cards: CardsData[] = [];
  currentSlideIndex = 0;
  private swiper: any;

  ngOnInit(): void {
    this.dataService.getCards().subscribe(data => {
      this.cards = data;
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const swiperElement = this.swiperRef?.nativeElement;

    customElements.whenDefined('swiper-container').then(() => {
      if (typeof swiperElement.initialize === 'function') {
        const direction = this.translation.getCurrentLang() === 'ar' ? 'rtl' : 'ltr';
        Object.assign(swiperElement, {
          slidesPerView: 1,
          effect: 'slide',
          navigation: {
            nextEl: '.scope-swiper-button-next-custom',
            prevEl: '.scope-swiper-button-prev-custom',
          },
          breakpoints: {
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1440: {
              slidesPerView: 3,
            }
          },
          autoplay: {
            delay: 5000,
            disableOnInteraction: true,
          },
        });
        console.log(swiperElement);
        swiperElement.initialize();
        this.swiper = swiperElement.swiper;

        // React to language changes and update direction
        this.translation.onLangChange$.subscribe(lang => {
          const direction = lang === 'ar' ? 'rtl' : 'ltr';
          if (this.swiper) {
            this.swiper.changeLanguageDirection(direction);
          }
        });
      } else {
        console.log(typeof swiperElement.initialize);
        console.error('swiperElement.initialize is not a function — Web Component is not upgraded');
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
      const swiperElement = this.swiperRef.nativeElement;
      if (swiperElement.swiper) {
        swiperElement.swiper.destroy();
      }
    }
  }

  onSlideChange(event: any): void {
    this.updatePagination();
  }

  trackBySlideId(index: number, slide: CardsData): number {
    return slide.id;
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
}