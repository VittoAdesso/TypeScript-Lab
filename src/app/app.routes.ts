import { Routes } from '@angular/router';
import { MainShellComponent } from '@layout/main-shell/main-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: MainShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'modulo/1-documentacion-terminal',
      },
      {
        path: 'modulo/1-documentacion-terminal',
        loadComponent: () =>
          import('@features/docs-terminal/docs-terminal.component').then(
            (m) => m.DocsTerminalComponent
          ),
      },
      {
        path: 'modulo/2-arquitectura-alias',
        loadComponent: () =>
          import('@features/architecture-aliases/architecture-aliases.component').then(
            (m) => m.ArchitectureAliasesComponent
          ),
      },
      {
        path: 'modulo/3-typescript-pro',
        loadComponent: () =>
          import('@features/typescript-guide/typescript-guide.component').then(
            (m) => m.TypescriptGuideComponent
          ),
      },
      {
        path: 'modulo/4-vitest-testing',
        loadComponent: () =>
          import('@features/vitest-guide/vitest-guide.component').then(
            (m) => m.VitestGuideComponent
          ),
      },
      {
        path: 'modulo/5-proyecto-base',
        loadComponent: () =>
          import('@features/base-project-ide/base-project-ide.component').then(
            (m) => m.BaseProjectIdeComponent
          ),
      },
      {
        path: 'modulo/6-retos-tdd',
        loadComponent: () =>
          import('@features/tdd-challenges/tdd-challenges.component').then(
            (m) => m.TddChallengesComponent
          ),
      },
      {
        path: 'modulo/7-checklist-dod',
        loadComponent: () =>
          import('@features/quality-checklist/quality-checklist.component').then(
            (m) => m.QualityChecklistComponent
          ),
      },
      {
        path: 'vista-completa',
        loadComponent: () =>
          import('@features/full-manual-view/full-manual-view.component').then(
            (m) => m.FullManualViewComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'modulo/1-documentacion-terminal',
      },
    ],
  },
];
