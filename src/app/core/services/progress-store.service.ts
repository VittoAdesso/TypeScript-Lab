import { Injectable, computed, signal } from '@angular/core';
import { ALL_MILESTONE_IDS } from '@core/data/manual-content.data';
import { MilestoneId } from '@core/models/manual.models';

export const PROGRESS_STORAGE_KEY = 'ts_vitest_manual_progress_v1';

export type ProgressRecord = Readonly<Partial<Record<MilestoneId, boolean>>>;

@Injectable({
  providedIn: 'root',
})
export class ProgressStoreService {
  private readonly stateSignal = signal<ProgressRecord>(this.loadFromStorage());

  readonly state = this.stateSignal.asReadonly();
  readonly totalCount = signal<number>(ALL_MILESTONE_IDS.length).asReadonly();

  readonly completedCount = computed<number>(() => {
    const current = this.stateSignal();
    let count = 0;
    for (const id of ALL_MILESTONE_IDS) {
      if (current[id] === true) {
        count++;
      }
    }
    return count;
  });

  readonly percentage = computed<number>(() => {
    const total = this.totalCount();
    if (total === 0) return 0;
    return Math.round((this.completedCount() / total) * 100);
  });

  readonly detailText = computed<string>(() => {
    return `${this.completedCount()}/${this.totalCount()} hitos completados`;
  });

  isCompleted(id: MilestoneId): boolean {
    return Boolean(this.stateSignal()[id]);
  }

  setMilestone(id: MilestoneId, completed: boolean): void {
    this.stateSignal.update((current) => {
      const updated: ProgressRecord = {
        ...current,
        [id]: completed,
      };
      this.saveToStorage(updated);
      return updated;
    });
  }

  toggleMilestone(id: MilestoneId): boolean {
    const nextValue = !this.isCompleted(id);
    this.setMilestone(id, nextValue);
    return nextValue;
  }

  resetAll(): void {
    const empty: ProgressRecord = {};
    this.stateSignal.set(empty);
    this.saveToStorage(empty);
  }

  private loadFromStorage(): ProgressRecord {
    try {
      if (typeof localStorage === 'undefined') {
        return {};
      }
      const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (!raw) return {};
      const parsed: unknown = JSON.parse(raw);
      if (typeof parsed !== 'object' || parsed === null) {
        return {};
      }
      const record: Partial<Record<MilestoneId, boolean>> = {};
      for (const id of ALL_MILESTONE_IDS) {
        const value = (parsed as Record<string, unknown>)[id];
        if (typeof value === 'boolean') {
          record[id] = value;
        }
      }
      return record;
    } catch {
      return {};
    }
  }

  private saveToStorage(state: ProgressRecord): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state));
      }
    } catch {
      // Ignorar si el navegador o sandbox bloquea localStorage
    }
  }
}
