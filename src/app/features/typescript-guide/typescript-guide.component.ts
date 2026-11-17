import { Component } from '@angular/core';
import { TS_BASE_BLOCKS, TS_PRO_BLOCKS } from '@core/data/manual-content.data';
import { CodeViewerComponent } from '@shared/components/code-viewer/code-viewer.component';

@Component({
  selector: 'app-typescript-guide',
  standalone: true,
  imports: [CodeViewerComponent],
  templateUrl: './typescript-guide.component.html',
  styleUrl: './typescript-guide.component.scss',
})
export class TypescriptGuideComponent {
  readonly baseBlocks = TS_BASE_BLOCKS;
  readonly proBlocks = TS_PRO_BLOCKS;
}
