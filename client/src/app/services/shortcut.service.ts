import { Injectable } from '@angular/core';
import { DrawpageService } from './drawpage.service';
import { GridService } from './grid.service';
import { LineService } from './line.service';
import { MagnestismService } from './magnetism.service';
import { SvgClickhandlerService } from './svgclickhandler.service';

enum keyboardShortcuts { pencil = 'c', pencilBrush = 'w', feather = 'p', pen = 'y', spray = 'a',
rectangle = '1', ellipse = '2', polygon= '3', line = 'l', text = 't',
colorApplicator = 'r', paintBucket = 'b', eraser = 'e', pipette = 'i', stamps= 'o',
select = 's', grid = 'g', magnetism = 'm', delete = 'Backspace', escape = 'Escape', minus = '-', plus = '+'}

@Injectable({
  providedIn: 'root',
})

export class ShortcutService {
  constructor(private drawPageService: DrawpageService, private  gridService: GridService,
              private svgClickHandler: SvgClickhandlerService, private lineService: LineService,
              private magnestismService: MagnestismService) {}

  selectTool(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    switch (event.key) {
        case keyboardShortcuts.pencil:
          this.drawPageService.setActive(0);
          break;
        case keyboardShortcuts.pencilBrush:
          this.drawPageService.setActive(1);
          break;
        case keyboardShortcuts.rectangle:
          this.drawPageService.setActive(2);
          break;
        case keyboardShortcuts.line:
          this.drawPageService.setActive(3);
          break;
        case keyboardShortcuts.ellipse:
          this.drawPageService.setActive(4);
          break;
        case keyboardShortcuts.polygon:
          this.drawPageService.setActive(5);
          break;
        case keyboardShortcuts.select:
          this.drawPageService.setActive(8);
          break;
        case keyboardShortcuts.eraser:
          this.drawPageService.setActive(9);
          break;
        case keyboardShortcuts.pen:
          this.drawPageService.setActive(10);
          break;
        case keyboardShortcuts.text:
          this.drawPageService.setActive(11);
          break;
        case keyboardShortcuts.grid:
          this.gridService.setAttributes();
          break;
        case keyboardShortcuts.minus:
          this.gridService.decreaseWidthAndHeight();
          break;
        case keyboardShortcuts.plus:
          this.gridService.increaseWidthAndHeight();
          break;
        case keyboardShortcuts.pipette:
          this.svgClickHandler.setActive(7);
          this.drawPageService.setActive(7);
          break;
        case keyboardShortcuts.colorApplicator:
          this.svgClickHandler.setActive(14);
          this.drawPageService.setActive(14);
          break;
        case keyboardShortcuts.delete:
          this.lineService.backspaceClicked(this.drawPageService.render);
          break;
        case keyboardShortcuts.escape:
          this.lineService.escapeClicked();
          break;
        case keyboardShortcuts.feather:
          this.drawPageService.setActive(13);
          break;
        case keyboardShortcuts.magnetism:
          this.magnestismService.isActivated = !this.magnestismService.isActivated;
          break;
        case keyboardShortcuts.spray:
          this.drawPageService.setActive(12);
          break;
        case keyboardShortcuts.stamps:
          this.drawPageService.setActive(6);
          break;
        case keyboardShortcuts.paintBucket:
          this.drawPageService.setActive(15);
          break;
      }
    }
}
