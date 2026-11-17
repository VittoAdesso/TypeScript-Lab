import { describe, it, expect, beforeEach } from 'vitest';
import {
  PROGRESS_STORAGE_KEY,
  ProgressStoreService,
} from '@core/services/progress-store.service';

describe('ProgressStoreService', () => {
  let service: ProgressStoreService;

  beforeEach(() => {
    localStorage.clear();
    service = new ProgressStoreService();
  });

  it('debería iniciar en 0% con 0/11 hitos completados si localStorage está vacío', () => {
    expect(service.totalCount()).toBe(11);
    expect(service.completedCount()).toBe(0);
    expect(service.percentage()).toBe(0);
    expect(service.detailText()).toBe('0/11 hitos completados');
  });

  it('debería marcar un hito, actualizar el porcentaje y persistir en localStorage', () => {
    service.setMilestone('reto-1', true);
    service.setMilestone('dod-1', true);

    expect(service.isCompleted('reto-1')).toBe(true);
    expect(service.isCompleted('dod-1')).toBe(true);
    expect(service.completedCount()).toBe(2);
    expect(service.percentage()).toBe(Math.round((2 / 11) * 100));

    const storedRaw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    expect(storedRaw).toBeTruthy();

    const reloadedService = new ProgressStoreService();
    expect(reloadedService.completedCount()).toBe(2);
    expect(reloadedService.isCompleted('reto-1')).toBe(true);
  });

  it('debería alternar el estado con toggleMilestone y reiniciar todo con resetAll', () => {
    const firstToggle = service.toggleMilestone('reto-3');
    expect(firstToggle).toBe(true);
    expect(service.isCompleted('reto-3')).toBe(true);

    const secondToggle = service.toggleMilestone('reto-3');
    expect(secondToggle).toBe(false);
    expect(service.isCompleted('reto-3')).toBe(false);

    service.setMilestone('reto-5', true);
    expect(service.completedCount()).toBe(1);

    service.resetAll();
    expect(service.completedCount()).toBe(0);
    expect(service.percentage()).toBe(0);
  });
});
