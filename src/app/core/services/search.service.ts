import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MODULES_LIST, SEARCH_INDEX_ENTRIES } from '@core/data/manual-content.data';
import { ModuleInfo, SearchIndexEntry } from '@core/models/manual.models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly querySignal = signal<string>('');

  readonly query = this.querySignal.asReadonly();

  readonly isQueryActive = computed<boolean>(() => {
    return this.querySignal().trim().length >= 2;
  });

  readonly results = computed<readonly SearchIndexEntry[]>(() => {
    const normalized = this.querySignal().trim().toLowerCase();
    if (normalized.length < 2) {
      return [];
    }
    return SEARCH_INDEX_ENTRIES.filter((entry) => {
      const haystack = `${entry.keywords} ${entry.title}`.toLowerCase();
      return haystack.includes(normalized);
    }).slice(0, 6);
  });

  setQuery(rawQuery: string): void {
    this.querySignal.set(rawQuery);
  }

  clear(): void {
    this.querySignal.set('');
  }

  searchInstant(rawQuery: string): readonly SearchIndexEntry[] {
    const normalized = rawQuery.trim().toLowerCase();
    if (normalized.length < 2) {
      return [];
    }
    return SEARCH_INDEX_ENTRIES.filter((entry) => {
      const haystack = `${entry.keywords} ${entry.title}`.toLowerCase();
      return haystack.includes(normalized);
    }).slice(0, 6);
  }

  getModuleForEntry(entry: SearchIndexEntry): ModuleInfo | undefined {
    return MODULES_LIST.find((m) => m.slug === entry.moduleSlug);
  }

  async navigateToResult(entry: SearchIndexEntry): Promise<void> {
    this.clear();
    const targetRoute = `/modulo/${entry.moduleSlug}`;
    await this.router.navigate([targetRoute]);

    setTimeout(() => {
      const element = this.document.getElementById(entry.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('search-pulse');
        setTimeout(() => {
          element.classList.remove('search-pulse');
        }, 1800);
      }
    }, 90);
  }
}
