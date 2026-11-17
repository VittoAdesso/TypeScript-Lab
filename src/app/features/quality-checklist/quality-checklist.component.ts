import { Component, inject } from '@angular/core';
import { QUALITY_CHECKLIST_ITEMS } from '@core/data/manual-content.data';
import { ChecklistItem } from '@core/models/manual.models';
import { ProgressStoreService } from '@core/services/progress-store.service';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-quality-checklist',
  standalone: true,
  templateUrl: './quality-checklist.component.html',
  styleUrl: './quality-checklist.component.scss',
})
export class QualityChecklistComponent {
  readonly progressStore = inject(ProgressStoreService);
  private readonly toastService = inject(ToastService);

  readonly checklistItems = QUALITY_CHECKLIST_ITEMS;

  onToggleItem(item: ChecklistItem, event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const checked = inputEl.checked;
    this.progressStore.setMilestone(item.id, checked);
    if (checked) {
      this.toastService.show('¡Hito completado y guardado!', 'success');
    }
  }
}
