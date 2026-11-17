import { Component, computed, signal } from '@angular/core';
import {
  DOC_CATEGORIES,
  EXTRA_TERMINAL_CARDS,
  TERMINAL_COMMANDS,
} from '@core/data/manual-content.data';
import { TerminalCmd, TerminalCmdId } from '@core/models/manual.models';
import { CodeViewerComponent } from '@shared/components/code-viewer/code-viewer.component';

@Component({
  selector: 'app-docs-terminal',
  standalone: true,
  imports: [CodeViewerComponent],
  templateUrl: './docs-terminal.component.html',
  styleUrl: './docs-terminal.component.scss',
})
export class DocsTerminalComponent {
  readonly docCategories = DOC_CATEGORIES;
  readonly terminalCommands = TERMINAL_COMMANDS;
  readonly extraCards = EXTRA_TERMINAL_CARDS;

  readonly selectedCommandId = signal<TerminalCmdId>('typecheck');

  readonly activeCommand = computed<TerminalCmd>(() => {
    const id = this.selectedCommandId();
    const found = this.terminalCommands.find((c) => c.id === id);
    return found ?? this.terminalCommands[0]!;
  });

  selectCommand(id: TerminalCmdId): void {
    this.selectedCommandId.set(id);
  }
}
