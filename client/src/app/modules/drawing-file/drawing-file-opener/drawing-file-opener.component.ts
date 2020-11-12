import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { SvgElement } from 'src/app/entity/svgElement';
import { DrawingFile } from 'src/app/model/drawingFile.model';
import { DrawingFileService } from 'src/app/services/common/drawingFile.service';
import { ModalManagerService } from 'src/app/services/common/modalManager.service';
import { DrawpageService } from 'src/app/services/drawpage.service';

@Component({
  selector: 'app-drawing-file-opener',
  templateUrl: './drawing-file-opener.component.html',
  styleUrls: ['./drawing-file-opener.component.scss'],
})

export class DrawingFileOpenerComponent implements OnInit, OnDestroy {

  drawingFiles: DrawingFile[];
  drawingFileServiceSubscription: Subscription;
  displayedColumns: string[] = ['image', 'name', 'tags', 'actionOpen', 'actionRemove'];
  dataSource: MatTableDataSource<DrawingFile>;
  isOnErrors: boolean;
  isOnErrorsSubscription: Subscription;
  displaySaverMessage: Observable<boolean> = this.drawingFileService.isLoading();
  drawingFileform: FormGroup;
  isOnErrorsLocal = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private drawingFileService: DrawingFileService, private drawpageService: DrawpageService,
              private modalManagerService: ModalManagerService, private formBuilder: FormBuilder) {

  }

  initForm(): void {
    this.drawingFileform = this.formBuilder.group({
      file: [null, Validators.required],
      fileName: '',
    });
  }

  onFileChange(event: any): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.drawingFileform.controls.fileName.setValue(event.target.files[0].name);
      const [file] = event.target.files;
      reader.readAsText(file);
      reader.onload = () => {
        this.drawingFileform.patchValue({
          file: reader.result,
        });
      };
    }
  }

  onSubmit(): void {
    this.isOnErrorsLocal = (!this.drawingFileService.validateDrawing((this.drawingFileform.value.file).split('endofouterhtml')[0]));
    if (!this.isOnErrorsLocal) {
      const drawingFile = new DrawingFile('', this.drawingFileform.value.fileName,
      (this.drawingFileform.value.file).split('endofouterhtml')[0], [],
      JSON.parse((this.drawingFileform.value.file).split('endofouterhtml')[1]) as SvgElement[]);
      this.open(drawingFile);
    }
  }

  open(drawingFile: DrawingFile): void {

    if (window.confirm('Do you want to open this drawing?')) {
      if (this.drawpageService.isEmpty ||
        window.confirm('The drawing zone is not empty. Opening a new drawing will remove everything present on the drawing zone.')) {
          this.drawpageService.cleanSVG();
          this.drawpageService.updateCurrentSvgContent(drawingFile.outerHtml);
          this.drawpageService.updateCurrentSvgElements(drawingFile.elementTab);
          this.drawpageService.isEmpty = false;
          this.onClose();
      }
    }

  }

  remove(drawingFile: DrawingFile): void {
    this.drawingFileService.deleteDrawingFile(drawingFile);
  }

  async ngOnInit() {
    this.drawingFileServiceSubscription = this.drawingFileService.drawingFileListSubject.subscribe(
      (drawFiles: DrawingFile[]) => {
        this.drawingFiles = drawFiles;
        this.dataSource = new MatTableDataSource(this.drawingFiles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    );
    this.drawingFileService.emitDrawingFiles();
    this.isOnErrorsSubscription = this.drawingFileService.isOnErrorSubject.subscribe(
      (isError: boolean) => {
        this.isOnErrors = isError;
      },
    );
    this.drawingFileService.emitErrors();
    this.initForm();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClose() {
    this.modalManagerService.onClose();
  }

  ngOnDestroy() {
    this.drawingFileService.getAllDrawingFiles();
    this.drawingFileServiceSubscription.unsubscribe();
    this.isOnErrorsSubscription.unsubscribe();
    this.modalManagerService.modalIsOpen = false;
  }

}
