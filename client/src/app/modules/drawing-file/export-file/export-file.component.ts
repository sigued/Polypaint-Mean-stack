import { Component, OnDestroy, OnInit } from '@angular/core';
import { FORMAT_ARRAY } from 'src/app/entity/tool/toolList';
import { ModalManagerService } from 'src/app/services/common/modalManager.service';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { ExportFileService } from 'src/app/services/export-file.service';

@Component({
  selector: 'app-export-file',
  templateUrl: './export-file.component.html',
  styleUrls: ['./export-file.component.scss'],
})
export class ExportFileComponent implements OnInit, OnDestroy {

  formatTypeArray: string[];
  format: number;
  hide: boolean;

  constructor(private exportFileService: ExportFileService, private modalManagerService: ModalManagerService,
              private drawpageService: DrawpageService) { }

  ngOnInit() {
    this.formatTypeArray = FORMAT_ARRAY;
    this.hide = false;
  }

  exportFile(): void {
    this.exportFileService.loadImage(this.formatTypeArray[this.format]);
    this.onClose();
  }

  drawingExist(): boolean {
    return (Array.isArray(this.drawpageService.elementTab) ?
            this.drawpageService.elementTab.length !== 0 : false);
  }

  onFormatSelectionChange(value: number): void {
    this.format = value;
  }

  onClose(): void {
    this.modalManagerService.onClose();
  }

  toggle(): void {
    this.hide = !this.hide;
  }

  ngOnDestroy() {
    this.modalManagerService.modalIsOpen = false;
  }
}
