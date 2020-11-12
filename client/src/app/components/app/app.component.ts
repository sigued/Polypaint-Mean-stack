import { Component, HostListener } from '@angular/core';
import { DrawingFileOpenerComponent } from 'src/app/modules/drawing-file/drawing-file-opener/drawing-file-opener.component';
import { DrawingFileSaverComponent } from 'src/app/modules/drawing-file/drawing-file-saver/drawing-file-saver.component';
import { ExportFileComponent } from 'src/app/modules/drawing-file/export-file/export-file.component';
import { NewDrawingComponent } from 'src/app/modules/new-drawing/new-drawing.component';
import { UserguideComponent } from 'src/app/modules/userguide/userguide.component';
import { UndoRedoCommand } from 'src/app/services/command/undoRedoCommand';
import { ModalManagerService } from 'src/app/services/common/modalManager.service';
import { HandlerselectionService } from 'src/app/services/handlerselection.service';
import { ShortcutService } from 'src/app/services/shortcut.service';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  disable: boolean;
  constructor(private modalManagerService: ModalManagerService, private shortCutService: ShortcutService,
              private undoRedoCommandService: UndoRedoCommand, private handlerSelectionService: HandlerselectionService,
              private textService: TextService) {
                this.disable = true;
              }

  @HostListener('document:keydown', ['$event']) keyboardShortcut(event: KeyboardEvent) {
    if (!this.modalManagerService.modalIsOpen) {
      if (event.ctrlKey && event.code === 'KeyO') {
        this.eventHandling(event);
        this.open(0);
      } else if (event.ctrlKey && event.code === 'KeyS') {
        this.eventHandling(event);
        this.open(1);
      } else if (event.ctrlKey && event.code === 'KeyG') {
        this.eventHandling(event);
        this.open(2);
      } else if (event.ctrlKey && event.code === 'KeyE') {
        this.eventHandling(event);
        this.open(3);
      } else if (event.ctrlKey && event.shiftKey && event.code === 'KeyZ') {
          this.undoRedoCommandService.redo();
      } else if (event.ctrlKey && event.code === 'KeyZ') {
        this.undoRedoCommandService.undo();
      } else if (event.ctrlKey && event.code === 'KeyA') {
        this.handlerSelectionService.selectAll();
        this.eventHandling(event);
      } else if (event.ctrlKey && event.code === 'KeyC') {
        this.handlerSelectionService.copy();
        this.eventHandling(event);
      } else if (event.ctrlKey && event.code === 'KeyX') {
        this.handlerSelectionService.cut();
        this.eventHandling(event);
      } else if (event.ctrlKey && event.code === 'KeyV') {
        this.handlerSelectionService.paste();
        this.eventHandling(event);
      } else if (event.ctrlKey && event.code === 'KeyD') {
        this.handlerSelectionService.duplicate();
        this.eventHandling(event);
      } else if (event.code === 'Backspace') {
        this.shortCutService.selectTool(event);
        this.handlerSelectionService.remove();
        this.eventHandling(event);
      } else {
        (this.textService.isEditing) ? this.textService.editText(event) : this.shortCutService.selectTool(event);
      }
    }
  }

  eventHandling(event: KeyboardEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  disabledUndo(): boolean {
    return this.disable = this.undoRedoCommandService.undoDisabled();
  }

  disabledRedo(): boolean {
    return this.disable = this.undoRedoCommandService.redoDisabled();
   }

  undo() {
    this.undoRedoCommandService.undo();
  }

  redo() {
    this.undoRedoCommandService.redo();
  }

  open(value: number): void {
    switch (value) {
      case 0:
        this.modalManagerService.openDialog(NewDrawingComponent);
        break;
      case 1:
        this.modalManagerService.openDialog(DrawingFileSaverComponent);
        break;
      case 2:
        this.modalManagerService.openDialog(DrawingFileOpenerComponent);
        break;
      case 3:
        this.modalManagerService.openDialog(ExportFileComponent);
        break;
      case 4:
        this.modalManagerService.openDialog(UserguideComponent);
        break;
    }
  }

}
