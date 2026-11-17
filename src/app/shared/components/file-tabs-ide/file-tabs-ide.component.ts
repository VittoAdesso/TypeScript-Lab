import { Component, computed, effect, input, signal } from '@angular/core';
import { IdeFileTab } from '@core/models/manual.models';
import { CodeViewerComponent } from '@shared/components/code-viewer/code-viewer.component';

@Component({
  selector: 'app-file-tabs-ide',
  standalone: true,
  imports: [CodeViewerComponent],
  templateUrl: './file-tabs-ide.component.html',
  styleUrl: './file-tabs-ide.component.scss',
})
export class FileTabsIdeComponent {
  readonly tabs = input.required<readonly IdeFileTab[]>();
  readonly variant = input<'config' | 'ide'>('ide');
  readonly headerLabel = input<string>('');

  readonly activeTabId = signal<string>('');

  readonly activeTab = computed<IdeFileTab | undefined>(() => {
    const list = this.tabs();
    const currentId = this.activeTabId();
    return list.find((t) => t.id === currentId) ?? list[0];
  });

  constructor() {
    effect(() => {
      const list = this.tabs();
      const first = list[0];
      if (first && !this.activeTabId()) {
        this.activeTabId.set(first.id);
      }
    });
  }

  selectTab(id: string): void {
    this.activeTabId.set(id);
  }
}
