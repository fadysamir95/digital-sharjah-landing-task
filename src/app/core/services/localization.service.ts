import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import en from '../../../assets/i18n/en.json';
import ar from '../../../assets/i18n/ar.json';
import { BehaviorSubject } from 'rxjs';

type TranslationKeys = keyof typeof en;
type LanguageCode = 'en' | 'ar';
type Translations = Record<LanguageCode, Record<TranslationKeys, string>>;

@Injectable({ providedIn: 'root' })
export class LocalizationService {
  private lang: LanguageCode = 'en';
  private translations: Translations = { en, ar };
  private langChangeSubject = new BehaviorSubject<LanguageCode>(this.lang);
  public onLangChange$ = this.langChangeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setLanguage(lang: LanguageCode): void {
    this.lang = lang;

    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }

    // Notify all subscribers of the language change
    this.langChangeSubject.next(lang);
  }

  getCurrentLang(): LanguageCode {
    return this.lang;
  }

  translate(key: TranslationKeys): string {
    return this.translations[this.lang][key] || key;
  }
}