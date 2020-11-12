import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RGBA_WHITE_COLOR } from 'src/app/constant';
import { DrawingZoneParameters } from 'src/app/model/drawingZoneParameters.model';
import { DrawingZoneParametersService } from 'src/app/services/common/drawingZoneParameters.service';
import { ModalManagerService } from 'src/app/services/common/modalManager.service';
import { DrawpageService } from 'src/app/services/drawpage.service';

@Component({
  selector: 'app-new-drawing',
  templateUrl: './new-drawing.component.html',
  styleUrls: ['./new-drawing.component.scss'],
})
export class NewDrawingComponent implements OnInit, OnDestroy {

  paletteIsUsing: boolean;
  newDrawingform: FormGroup;
  hexIsChecked = false;
  rgbaIsChecked = false;
  color = RGBA_WHITE_COLOR;
  rgb: string;

  constructor(private formBuilder: FormBuilder, public drawingZoneParametersService: DrawingZoneParametersService,
              private drawpageService: DrawpageService, private modalManagerService: ModalManagerService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.newDrawingform = this.formBuilder.group({
      height: [window.innerHeight, [Validators.required, Validators.min(0), Validators.max(4000)]],
      width: [window.innerWidth, [Validators.required, Validators.min(0), Validators.max(4000)]],
      backgroundColor: [RGBA_WHITE_COLOR, [Validators.required, Validators.minLength(13), Validators.maxLength(21)]],
      hexaIsChecked: false,
      rgbIsChecked: false,
      backgroundColorHexa: '',
    });
  }

  onNotify(rgba: string): void {
    this.paletteIsUsing = false;
    this.color = rgba;
    this.newDrawingform.controls.backgroundColor.setValue(rgba);
  }

  openPalette(): void {
    this.paletteIsUsing = true;
  }

  get heightError() { return this.newDrawingform.controls.height.errors; }
  get widthError() { return this.newDrawingform.controls.width.errors; }
  get backgroundColorError() { return this.newDrawingform.controls.backgroundColor.errors; }
  get backgroundColorHexaError() { return this.newDrawingform.controls.backgroundColorHexa.errors; }

  convertHEXtoRGBA(hexa: string): void {
    if (hexa.charAt(0) === '#') {
      hexa = hexa.substring(1, 7);
    }
    const rPart: number = parseInt(hexa.substring(0, 2), 16);
    const gPart: number = parseInt(hexa.substring(2, 4), 16);
    const bPart: number = parseInt(hexa.substring(4, 6), 16);
    this.color = `rgba(${rPart},${gPart},${bPart}, 1)`;
  }

  onSubmitForm(): void {
    if (this.drawpageService.isEmpty ||
      window.confirm('La zone de dessin n\'est pas vide. La creation d\'un nouveau dessin entrainera la perte de votre travail.')) {
      this.drawpageService.cleanSVG();
      const formValue = this.newDrawingform.value;
      if (this.hexIsChecked) {
        this.convertHEXtoRGBA(formValue.backgroundColorHexa);
      }
      const newdrawingZoneParameters: DrawingZoneParameters = {
        height: formValue.height,
        width: formValue.width,
        backgroundColor: this.color,
      };
      this.drawpageService.hasBeenSet = true;
      this.drawingZoneParametersService.setDrawingZoneParameters(newdrawingZoneParameters);
    }
    this.onClose();
  }

  onCheck(e: any): void {
    this.rgbaIsChecked = e.target.checked;
    this.hexIsChecked = e.target.checked;
    if (this.hexIsChecked) {
      this.newDrawingform.controls.backgroundColor.disable();
      this.newDrawingform.controls.backgroundColorHexa.setValidators([Validators.required,
        Validators.minLength(6), Validators.maxLength(9)]);
    } else {
      this.newDrawingform.controls.backgroundColor.enable();
      this.newDrawingform.controls.backgroundColorHexa.setValidators(null);
    }
    this.newDrawingform.controls.backgroundColorHexa.updateValueAndValidity();
  }

  onClose(): void {
    this.modalManagerService.onClose();
  }

  onResize(): void {
    if (this.newDrawingform.controls.height.pristine) {
      this.newDrawingform.controls.height.setValue(window.innerHeight);
    }
    if (this.newDrawingform.controls.width.pristine) {
      this.newDrawingform.controls.width.setValue(window.innerWidth);
    }
  }

  ngOnDestroy() {
    this.modalManagerService.modalIsOpen = false;
  }
}
