import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { DrawingFileService } from 'src/app/services/common/drawingFile.service';
import { ModalManagerService } from 'src/app/services/common/modalManager.service';
import { DrawpageService } from 'src/app/services/drawpage.service';

@Component({
  selector: 'app-drawing-file-saver',
  templateUrl: './drawing-file-saver.component.html',
  styleUrls: ['./drawing-file-saver.component.scss'],
})
export class DrawingFileSaverComponent implements OnInit, OnDestroy {

  newDrawingFileform: FormGroup;
  isOnErrors: boolean;
  isOnErrorsSubscription: Subscription;
  isSaveOnLocal = false;
  hide = false;
  outerHtlm: string;
  displaySaverMessage: Observable<boolean> = this.drawingFileService.isLoading();
  constructor(private drawingFileService: DrawingFileService, private drawpageService: DrawpageService,
              private formBuilder: FormBuilder, private modalManagerService: ModalManagerService) {/** */ }

  ngOnInit() {
    this.initForm();
    this.isOnErrorsSubscription = this.drawingFileService.isOnErrorSubject.subscribe(
      (isError: boolean) => {
        this.isOnErrors = isError;
      },
    );
    this.drawingFileService.emitErrors();
    this.outerHtlm = this.drawpageService.getCurrentSvgContent();
  }

  initForm() {
    this.newDrawingFileform = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      outerHtlm: [this.drawpageService.isEmpty ? '' : this.drawpageService.getCurrentSvgContent(),
                    [Validators.required, Validators.minLength(1)]],
      elementTab: [this.drawpageService.isEmpty ? '' : JSON.stringify(this.drawpageService.elementTab),
                    [Validators.required, Validators.minLength(1)]],
      tags: this.formBuilder.array([]),
    });
  }

  get nameError() { return this.newDrawingFileform.controls.name.errors; }
  get outerHtlmError() { return this.newDrawingFileform.controls.outerHtlm.errors; }
  get hasBeenTouched() { return !this.newDrawingFileform.controls.name.pristine; }

  async onSaveDrawFileServer() {
    await this.drawingFileService.addNewDrawingFile(this.newDrawingFileform.value.name, this.newDrawingFileform.value.outerHtlm,
      this.newDrawingFileform.value.tags ? this.newDrawingFileform.value.tags : [], this.newDrawingFileform.value.elementTab);
    if (!this.isOnErrors) {
      this.onClose();
    }
  }

  onSaveDrawFileLocal() {
    this.drawingFileService.saveDrawingFileLocal(this.newDrawingFileform.value.name, this.newDrawingFileform.value.outerHtlm,
      this.newDrawingFileform.value.elementTab);
    this.onClose();
  }

  async onSaveDrawFile() {
    this.onSwitch();
    this.isSaveOnLocal ? this.onSaveDrawFileLocal() : await this.onSaveDrawFileServer();
  }

  getTags(): FormArray {
    return this.newDrawingFileform.controls.tags as FormArray;
  }

  onAddTags() {
    const newTagControl = this.formBuilder.control('', Validators.required);
    this.getTags().push(newTagControl);
  }
  onDeleteTags(index: number) {
    this.getTags().removeAt(index);
  }

  onClose() {
    this.modalManagerService.onClose();
  }

  store(e: any) {
    this.isSaveOnLocal = e.target.checked;
    e.target.checked ? this.getTags().disable() : this.getTags().enable();
  }

  onSwitch() {
    this.hide = !this.hide;
  }

  ngOnDestroy() {
    this.modalManagerService.modalIsOpen = false;
    this.isOnErrorsSubscription.unsubscribe();
  }
}
