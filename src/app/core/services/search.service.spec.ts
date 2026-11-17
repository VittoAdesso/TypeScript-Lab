import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DOCUMENT } from '@angular/common';
import { Injector, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '@core/services/search.service';

describe('SearchService', () => {
  let service: SearchService;
  const navigateMock = vi.fn().mockResolvedValue(true);

  beforeEach(() => {
    navigateMock.mockClear();

    const injector = Injector.create({
      providers: [
        {
          provide: Router,
          useValue: { navigate: navigateMock },
        },
        {
          provide: DOCUMENT,
          useValue: document,
        },
      ],
    });

    service = runInInjectionContext(injector, () => new SearchService());
  });

  it('no debería devolver resultados si la consulta tiene menos de 2 caracteres', () => {
    service.setQuery('a');
    expect(service.isQueryActive()).toBe(false);
    expect(service.results()).toEqual([]);
  });

  it('debería encontrar bloques coincidentes para palabras clave como satisfies o spyOn', () => {
    service.setQuery('satisfies');
    expect(service.isQueryActive()).toBe(true);
    expect(service.results().length).toBeGreaterThan(0);
    expect(
      service.results().some((r) => r.moduleSlug === '3-typescript-pro' || r.moduleSlug === '6-retos-tdd')
    ).toBe(true);

    const spyHits = service.searchInstant('spyon');
    expect(spyHits.length).toBeGreaterThan(0);
  });

  it('debería limpiar la búsqueda y navegar a la ruta del módulo al seleccionar un resultado', async () => {
    service.setQuery('alias');
    const firstResult = service.results()[0];
    expect(firstResult).toBeDefined();

    if (firstResult) {
      await service.navigateToResult(firstResult);
      expect(service.query()).toBe('');
      expect(navigateMock).toHaveBeenCalledWith([`/modulo/${firstResult.moduleSlug}`]);
    }
  });
});
