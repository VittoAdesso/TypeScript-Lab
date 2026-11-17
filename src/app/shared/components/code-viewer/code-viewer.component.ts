import { DOCUMENT } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CodeLanguage } from '@core/models/manual.models';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-code-viewer',
  standalone: true,
  templateUrl: './code-viewer.component.html',
  styleUrl: './code-viewer.component.scss',
})
export class CodeViewerComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly toastService = inject(ToastService);
  private readonly document = inject(DOCUMENT);

  readonly code = input.required<string>();
  readonly lang = input<CodeLanguage>('typescript');

  readonly highlightedHtml = computed<SafeHtml>(() => {
    const raw = this.code();
    const language = this.lang();
    const escaped = this.escapeHtml(raw);
    const tokenized = this.highlightSyntax(escaped, language);
    return this.sanitizer.bypassSecurityTrustHtml(tokenized);
  });

  async copyCode(): Promise<void> {
    const plainText = this.code();
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(plainText);
        this.toastService.show('Código copiado al portapapeles', 'success');
        return;
      }
    } catch {
      // Fallback al método clásico si el permiso clipboard falla
    }

    const textarea = this.document.createElement('textarea');
    textarea.value = plainText;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    this.document.body.appendChild(textarea);
    textarea.select();
    try {
      const ok = this.document.execCommand('copy');
      if (ok) {
        this.toastService.show('Código copiado al portapapeles', 'success');
      } else {
        this.toastService.show('No se pudo copiar automáticamente', 'info');
      }
    } catch {
      this.toastService.show('Error al copiar al portapapeles', 'info');
    } finally {
      this.document.body.removeChild(textarea);
    }
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  private highlightSyntax(escapedCode: string, lang: CodeLanguage): string {
    if (lang === 'text' || lang === 'bash') {
      return escapedCode;
    }

    const tokenRegex =
      /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b(import|export|from|type|interface|const|let|var|function|return|if|else|switch|case|default|for|of|in|while|try|catch|throw|new|class|constructor|private|public|readonly|async|await|extends|implements|satisfies|asserts|is|typeof|keyof|infer|as|void|never|unknown|any|boolean|string|number|true|false|null|undefined)\b|\b(describe|it|expect|vi|beforeEach|afterEach|Promise|Date|Error|Record|Partial|Omit|Pick|Readonly|Math|console|Map)\b|\b(\d+(?:\.\d+)?)\b/g;

    return escapedCode.replace(
      tokenRegex,
      (
        match: string,
        comment?: string,
        str?: string,
        kw?: string,
        builtin?: string,
        num?: string
      ): string => {
        if (comment) return `<span class="tok-comment">${comment}</span>`;
        if (str) return `<span class="tok-string">${str}</span>`;
        if (kw) return `<span class="tok-keyword">${kw}</span>`;
        if (builtin) return `<span class="tok-type">${builtin}</span>`;
        if (num) return `<span class="tok-number">${num}</span>`;
        return match;
      }
    );
  }
}
