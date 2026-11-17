import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ToastService } from '@core/services/toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    vi.useFakeTimers();
    service = new ToastService();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('debería agregar una notificación toast y eliminarla automáticamente tras 2400ms', () => {
    expect(service.toasts().length).toBe(0);

    service.show('Código copiado al portapapeles', 'success');
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0]?.message).toBe('Código copiado al portapapeles');
    expect(service.toasts()[0]?.type).toBe('success');

    vi.advanceTimersByTime(2400);
    expect(service.toasts().length).toBe(0);
  });

  it('debería permitir descartar manualmente un toast por su id', () => {
    service.show('Aviso informativo', 'info');
    const created = service.toasts()[0];
    expect(created).toBeDefined();

    if (created) {
      service.dismiss(created.id);
      expect(service.toasts().length).toBe(0);
    }
  });
});
