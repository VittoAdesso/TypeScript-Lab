import { Component } from '@angular/core';
import { BASE_PROJECT_IDE_TABS } from '@core/data/manual-content.data';
import { FileTabsIdeComponent } from '@shared/components/file-tabs-ide/file-tabs-ide.component';

@Component({
  selector: 'app-base-project-ide',
  standalone: true,
  imports: [FileTabsIdeComponent],
  templateUrl: './base-project-ide.component.html',
  styleUrl: './base-project-ide.component.scss',
})
export class BaseProjectIdeComponent {
  readonly ideTabs = BASE_PROJECT_IDE_TABS;
}
