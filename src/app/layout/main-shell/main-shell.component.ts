import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { HERO_BANNER, MODULES_LIST } from '@core/data/manual-content.data';
import { ModuleInfo, SearchIndexEntry } from '@core/models/manual.models';
import { ProgressStoreService } from '@core/services/progress-store.service';
import { SearchService } from '@core/services/search.service';
import { ThemeService } from '@core/services/theme.service';
import { ToastService } from '@core/services/toast.service';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { PaginationBarComponent } from '@shared/components/pagination-bar/pagination-bar.component';
import { ToastContainerComponent } from '@shared/components/toast-container/toast-container.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    PaginationBarComponent,
    ToastContainerComponent,
    ConfirmModalComponent,
  ],
  templateUrl: './main-shell.component.html',
  styleUrl: './main-shell.component.scss',
})
export class MainShellComponent {
  readonly progressStore = inject(ProgressStoreService);
  readonly searchService = inject(SearchService);
  readonly themeService = inject(ThemeService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  readonly hero = HERO_BANNER;
  readonly modules = MODULES_LIST;

  readonly isMobileSidebarOpen = signal<boolean>(false);
  readonly isResetModalOpen = signal<boolean>(false);
  readonly lastModuleRoute = signal<string>(MODULES_LIST[0]!.route);

  private readonly navEndSignal = toSignal(
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)),
    { initialValue: null }
  );

  readonly isFullManualView = computed<boolean>(() => {
    const evt = this.navEndSignal();
    const url = evt ? evt.urlAfterRedirects : this.router.url;
    if (!url.includes('vista-completa')) {
      const matched = MODULES_LIST.find((m) => url.includes(m.slug));
      if (matched) {
        this.lastModuleRoute.set(matched.route);
      }
    }
    return url.includes('vista-completa');
  });

  openMobileSidebar(): void {
    this.isMobileSidebarOpen.set(true);
  }

  closeMobileSidebar(): void {
    this.isMobileSidebarOpen.set(false);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchService.setQuery(target.value);
  }

  async onSelectSearchResult(entry: SearchIndexEntry): Promise<void> {
    this.closeMobileSidebar();
    await this.searchService.navigateToResult(entry);
  }

  onNavClick(_module: ModuleInfo): void {
    this.closeMobileSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async toggleFullViewMode(): Promise<void> {
    this.closeMobileSidebar();
    if (this.isFullManualView()) {
      await this.router.navigate([this.lastModuleRoute()]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      await this.router.navigate(['/vista-completa']);
      this.toastService.show('Mostrando todo el manual en una sola vista', 'info');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  openResetModal(): void {
    this.isResetModalOpen.set(true);
  }

  closeResetModal(): void {
    this.isResetModalOpen.set(false);
  }

  confirmResetProgress(): void {
    this.progressStore.resetAll();
    this.isResetModalOpen.set(false);
    this.toastService.show('Progreso reiniciado a 0%', 'info');
  }
}
