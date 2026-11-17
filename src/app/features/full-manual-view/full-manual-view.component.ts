import { Component } from '@angular/core';
import { ArchitectureAliasesComponent } from '@features/architecture-aliases/architecture-aliases.component';
import { BaseProjectIdeComponent } from '@features/base-project-ide/base-project-ide.component';
import { DocsTerminalComponent } from '@features/docs-terminal/docs-terminal.component';
import { QualityChecklistComponent } from '@features/quality-checklist/quality-checklist.component';
import { TddChallengesComponent } from '@features/tdd-challenges/tdd-challenges.component';
import { TypescriptGuideComponent } from '@features/typescript-guide/typescript-guide.component';
import { VitestGuideComponent } from '@features/vitest-guide/vitest-guide.component';

@Component({
  selector: 'app-full-manual-view',
  standalone: true,
  imports: [
    DocsTerminalComponent,
    ArchitectureAliasesComponent,
    TypescriptGuideComponent,
    VitestGuideComponent,
    BaseProjectIdeComponent,
    TddChallengesComponent,
    QualityChecklistComponent,
  ],
  templateUrl: './full-manual-view.component.html',
  styleUrl: './full-manual-view.component.scss',
})
export class FullManualViewComponent {}
