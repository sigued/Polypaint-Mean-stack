import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) {/** */}

    transform(style: string): SafeHtml {
        style = style.replace(/width=\"\d+\"/, 'width=\"75\"');
        style = style.replace(/height=\"\d+\"/, 'height=\"75\" viewBox=\"0 0 1200 700\"');
        return this.sanitizer.bypassSecurityTrustHtml(style);
    }

}
