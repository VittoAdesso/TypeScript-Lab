import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeService } from '@core/services/theme.service';
import { Injector, runInInjectionContext } from '@angular/core';
import { DOCUMENT } from '@angular/common';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.add('dark');

    const injector = Injector.create({
      providers: [
        {
          provide: DOCUMENT,
          useValue: document,
        },
      ],
    });

    service = runInInjectionContext(injector, () => new ThemeService());
  });

  it('debería iniciar en modo oscuro por defecto (isDark = true)', () => {
    expect(service.isDark()).toBe(true);
  });

  it('debería alternar entre modo oscuro y claro con toggleTheme()', () => {
    service.toggleTheme();
    expect(service.isDark()).toBe(false);

    service.toggleTheme();
    expect(service.isDark()).toBe(true);
  });

  it('debería permitir fijar el modo explícitamente con setDark()', () => {
    service.setDark(false);
    expect(service.isDark()).toBe(false);

    service.setDark(true);
    expect(service.isDark()).toBe(true);
  });
});
