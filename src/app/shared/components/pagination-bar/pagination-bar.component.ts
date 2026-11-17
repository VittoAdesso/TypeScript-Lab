import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MODULES_LIST } from '@core/data/manual-content.data';
import { ModuleInfo } from '@core/models/manual.models';
import { filter } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pagination-bar',
  standalone: true,
  templateUrl: './pagination-bar.component.html',
  styleUrl: './pagination-bar.component.scss',
})
export class PaginationBarComponent {
  private readonly router = inject(Router);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)),
    { initialValue: null }
  );

  readonly activeModuleIndex = computed<number>(() => {
    this.currentUrl();
    const url = this.router.url;
    const idx = MODULES_LIST.findIndex((m) => url.includes(m.slug));
    return idx;
  });

  readonly isFullManualView = computed<boolean>(() => {
    this.currentUrl();
    return this.router.url.includes('vista-completa');
  });

  readonly currentModule = computed<ModuleInfo | undefined>(() => {
    const idx = this.activeModuleIndex();
    return idx >= 0 ? MODULES_LIST[idx] : MODULES_LIST[0];
  });

  readonly prevModule = computed<ModuleInfo | undefined>(() => {
    const idx = this.activeModuleIndex();
    return idx > 0 ? MODULES_LIST[idx - 1] : undefined;
  });

  readonly nextModule = computed<ModuleInfo | undefined>(() => {
    const idx = this.activeModuleIndex();
    return idx >= 0 && idx < MODULES_LIST.length - 1 ? MODULES_LIST[idx + 1] : undefined;
  });

  async goToPrev(): Promise<void> {
    const prev = this.prevModule();
    if (prev) {
      await this.router.navigate([prev.route]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  async goToNext(): Promise<void> {
    const next = this.nextModule();
    if (next) {
      await this.router.navigate([next.route]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
