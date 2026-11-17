export type CodeLanguage = 'typescript' | 'json' | 'bash' | 'text';

export type ModuleSlug =
  | '1-documentacion-terminal'
  | '2-arquitectura-alias'
  | '3-typescript-pro'
  | '4-vitest-testing'
  | '5-proyecto-base'
  | '6-retos-tdd'
  | '7-checklist-dod';

export type ModuleBadgeColor = 'indigo' | 'emerald' | 'amber' | 'cyan';

export interface ModuleInfo {
  readonly index: number;
  readonly roman: string;
  readonly partLabel: string;
  readonly slug: ModuleSlug;
  readonly route: `/modulo/${ModuleSlug}`;
  readonly shortTitle: string;
  readonly fullTitle: string;
  readonly subtitle: string;
  readonly badgeColor: ModuleBadgeColor;
}

export interface DocLink {
  readonly label: string;
  readonly url: string;
  readonly isPrimary?: boolean;
  readonly isAlternative?: boolean;
}

export interface DocCategory {
  readonly badge: string;
  readonly badgeTheme: 'blue' | 'emerald';
  readonly title: string;
  readonly links: readonly DocLink[];
}

export type TerminalCmdId = 'typecheck' | 'test' | 'coverage' | 'build';

export interface TerminalCmd {
  readonly id: TerminalCmdId;
  readonly buttonLabel: string;
  readonly accentColor: 'indigo' | 'emerald' | 'cyan' | 'amber';
  readonly output: string;
  readonly explanationHtml: string;
}

export interface ExtraCommandCard {
  readonly title: string;
  readonly command: string;
  readonly lang: CodeLanguage;
}

export interface AliasRuleItem {
  readonly title: string;
  readonly descriptionHtml: string;
  readonly theme: 'indigo' | 'emerald';
}

export interface IdeFileTab {
  readonly id: string;
  readonly label: string;
  readonly lang: CodeLanguage;
  readonly code: string;
  readonly isTestFile?: boolean;
}

export interface SpecialTypeComparison {
  readonly name: 'any' | 'unknown' | 'void' | 'never';
  readonly summary: string;
  readonly theme: 'rose' | 'emerald' | 'sky' | 'purple';
}

export interface TsCodeBlock {
  readonly id: string;
  readonly titleHtml: string;
  readonly description?: string;
  readonly searchable: string;
  readonly lang: CodeLanguage;
  readonly code: string;
  readonly specialTypes?: readonly SpecialTypeComparison[];
}

export interface PrincipleBullet {
  readonly term: string;
  readonly definitionHtml: string;
}

export interface Challenge {
  readonly id: 'reto-1' | 'reto-2' | 'reto-3' | 'reto-4' | 'reto-5';
  readonly badge: string;
  readonly badgeTheme: 'indigo' | 'amber' | 'emerald';
  readonly title: string;
  readonly searchable: string;
  readonly criteriaHtmlList: readonly string[];
  readonly hintSummary: string;
  readonly hintContentHtml: string;
}

export interface ChecklistItem {
  readonly id: 'dod-1' | 'dod-2' | 'dod-3' | 'dod-4' | 'dod-5' | 'dod-6';
  readonly titleHtml: string;
  readonly descriptionHtml: string;
}

export type MilestoneId = Challenge['id'] | ChecklistItem['id'];

export interface SearchIndexEntry {
  readonly id: string;
  readonly moduleSlug: ModuleSlug;
  readonly partCode: string;
  readonly title: string;
  readonly keywords: string;
}

export interface ToastItem {
  readonly id: number;
  readonly message: string;
  readonly type: 'success' | 'info';
}
