import { Component } from '@angular/core';
import {
  ALIAS_EXPLANATION_INTRO,
  ALIAS_RULES,
  CONFIG_FILE_TABS,
  FOLDER_TREE_SNIPPET,
  INIT_COMMANDS_SNIPPET,
} from '@core/data/manual-content.data';
import { CodeViewerComponent } from '@shared/components/code-viewer/code-viewer.component';
import { FileTabsIdeComponent } from '@shared/components/file-tabs-ide/file-tabs-ide.component';

@Component({
  selector: 'app-architecture-aliases',
  standalone: true,
  imports: [CodeViewerComponent, FileTabsIdeComponent],
  templateUrl: './architecture-aliases.component.html',
  styleUrl: './architecture-aliases.component.scss',
})
export class ArchitectureAliasesComponent {
  readonly initSnippet = INIT_COMMANDS_SNIPPET;
  readonly folderTreeSnippet = FOLDER_TREE_SNIPPET;
  readonly aliasIntroHtml = ALIAS_EXPLANATION_INTRO;
  readonly aliasRules = ALIAS_RULES;
  readonly configTabs = CONFIG_FILE_TABS;
}
