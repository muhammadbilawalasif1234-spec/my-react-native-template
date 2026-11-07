type Translations = {
  [key: string]: {
    [phraseKey: string]: string;
  };
};

class LocalizationManager {
  private currentLocale: string = 'en';
  private translations: Translations = {
    en: {
      welcome: 'Welcome to App-Kit!',
      settings: 'Settings',
      loading: 'Loading...',
    },
    ur: {
      welcome: 'پہ خوش آمدید App-Kit!',
      settings: 'ترتیبات',
      loading: 'لوڈ ہو رہا ہے...',
    },
  };

  /**
   * Set current active language
   */
  public setLocale(locale: string): void {
    if (this.translations[locale]) {
      this.currentLocale = locale;
      console.log(`[LocalizationManager] Language changed to: ${locale}`);
    } else {
      console.warn(`[LocalizationManager] Locale "${locale}" not supported.`);
    }
  }

  /**
   * Get translated string by key
   */
  public t(key: string): string {
    const langTranslations = this.translations[this.currentLocale] || this.translations['en'];
    return langTranslations[key] || this.translations['en'][key] || key;
  }

  /**
   * Add custom translations dynamically
   */
  public addTranslations(newTranslations: Translations): void {
    this.translations = {
      ...this.translations,
      ...newTranslations,
    };
  }

  public getCurrentLocale(): string {
    return this.currentLocale;
  }
}

export const localizationManager = new LocalizationManager();