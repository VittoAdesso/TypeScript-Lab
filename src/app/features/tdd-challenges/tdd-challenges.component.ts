import { Component, inject } from '@angular/core';
import { TDD_CHALLENGES } from '@core/data/manual-content.data';
import { Challenge } from '@core/models/manual.models';
import { ProgressStoreService } from '@core/services/progress-store.service';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-tdd-challenges',
  standalone: true,
  templateUrl: './tdd-challenges.component.html',
  styleUrl: './tdd-challenges.component.scss',
})
export class TddChallengesComponent {
  readonly progressStore = inject(ProgressStoreService);
  private readonly toastService = inject(ToastService);

  readonly challenges = TDD_CHALLENGES;

  onToggleChallenge(challenge: Challenge, event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const checked = inputEl.checked;
    this.progressStore.setMilestone(challenge.id, checked);
    if (checked) {
      this.toastService.show('¡Hito completado y guardado!', 'success');
    }
  }
}
