import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safeHtml.pipe';

describe('SafeHtmlPipe', () => {
  let safeHtmlPipe: SafeHtmlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SafeHtmlPipe, ],
    });
    safeHtmlPipe = TestBed.get(SafeHtmlPipe);
    sanitizer = TestBed.get(DomSanitizer);
  });

  it('should be created', () => {
    expect(safeHtmlPipe).toBeTruthy();
  });

  it('should transform', () => {
      spyOn(sanitizer, 'bypassSecurityTrustHtml');
      safeHtmlPipe.transform('adv');
      expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('adv');
  });

});
