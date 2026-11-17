import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

const THEME_STORAGE_KEY = 'ts_vitest_manual_theme_v1';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly darkSignal = signal<boolean>(this.loadInitialTheme());

  readonly isDark = this.darkSignal.asReadonly();

  constructor() {
    this.syncDomAndStorage(this.darkSignal());

    try {
      effect(() => {
        const dark = this.darkSignal();
        this.syncDomAndStorage(dark);
      });
    } catch {
      // Fallback cuando se instancia en un Injector aislado sin ChangeDetectionScheduler
    }
  }

  toggleTheme(): void {
    const next = !this.darkSignal();
    this.darkSignal.set(next);
    this.syncDomAndStorage(next);
  }

  setDark(isDark: boolean): void {
    this.darkSignal.set(isDark);
    this.syncDomAndStorage(isDark);
  }

  private syncDomAndStorage(dark: boolean): void {
    const root = this.document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    this.persistTheme(dark);
  }

  private loadInitialTheme(): boolean {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === 'light') return false;
        if (stored === 'dark') return true;
      }
    } catch {
      // Fallback en entornos sin acceso a localStorage
    }
    return true;
  }

  private persistTheme(isDark: boolean): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
      }
    } catch {
      // Ignorar si localStorage está bloqueado
    }
  }
}
