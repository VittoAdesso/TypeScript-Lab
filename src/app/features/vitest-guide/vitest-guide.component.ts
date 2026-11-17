import { Component } from '@angular/core';
import {
  AAA_ANATOMY,
  FAKE_TIMERS_DESCRIPTION,
  FAKE_TIMERS_SNIPPET,
  FIRST_PRINCIPLES,
  MATCHERS_AND_EACH_SNIPPET,
  MOCKS_COMPARISON_LIST,
  SPY_ON_SNIPPET,
} from '@core/data/manual-content.data';
import { CodeViewerComponent } from '@shared/components/code-viewer/code-viewer.component';

@Component({
  selector: 'app-vitest-guide',
  standalone: true,
  imports: [CodeViewerComponent],
  templateUrl: './vitest-guide.component.html',
  styleUrl: './vitest-guide.component.scss',
})
export class VitestGuideComponent {
  readonly firstPrinciples = FIRST_PRINCIPLES;
  readonly aaaAnatomy = AAA_ANATOMY;
  readonly matchersSnippet = MATCHERS_AND_EACH_SNIPPET;
  readonly mocksComparison = MOCKS_COMPARISON_LIST;
  readonly spyOnSnippet = SPY_ON_SNIPPET;
  readonly fakeTimersDescription = FAKE_TIMERS_DESCRIPTION;
  readonly fakeTimersSnippet = FAKE_TIMERS_SNIPPET;
}
