import { Injectable, signal } from '@angular/core';
import { ToastItem } from '@core/models/manual.models';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly itemsSignal = signal<readonly ToastItem[]>([]);
  private nextId = 1;

  readonly toasts = this.itemsSignal.asReadonly();

  show(message: string, type: 'success' | 'info' = 'success'): void {
    const id = this.nextId++;
    const item: ToastItem = { id, message, type };
    this.itemsSignal.update((current) => [...current, item]);

    setTimeout(() => {
      this.dismiss(id);
    }, 2400);
  }

  dismiss(id: number): void {
    this.itemsSignal.update((current) => current.filter((t) => t.id !== id));
  }
}
