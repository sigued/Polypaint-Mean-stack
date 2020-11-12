import { Component, OnInit } from '@angular/core';
import { ALIGN_ARRAY, FONT_FAMILLY_ARRAY } from 'src/app/entity/tool/toolList';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {

  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  fontStyle: string;
  checked: boolean;
  fontFamillyArray: string[] = FONT_FAMILLY_ARRAY;
  aligns: string[] = ALIGN_ARRAY;
  alignRef: string;

  ngOnInit() {
    this.fontFamily = this.fontFamillyArray[0];
    this.fontSize = 50;
    this.fontWeight = '';
    this.fontStyle = '';
    this.checked = false;
  }

  constructor(private textService: TextService) {
  }

  set changeFontFamily(font: number) {
    this.textService.setFontFamily(FONT_FAMILLY_ARRAY[font]);
  }

  changeFontSize() {
    this.textService.setFontSize(this.fontSize);
  }

  onCheckBold(e: any) {
    this.checked = e.target.checked;
    (this.checked) ? this.textService.setFontWeight('bold') :
      this.textService.setFontWeight('');
  }

  onCheckItalic(e: any) {
    this.checked = e.target.checked;
    (this.checked) ? this.textService.setFontStyle('italic') :
      this.textService.setFontStyle('');
  }

  onCheckLeft(e: any) {
    this.checked = e.target.checked;
    (this.checked) ? this.textService.setTextAlign('start') :
      this.textService.setTextAlign('');
  }

  onCheckCenter(e: any) {
    this.checked = e.target.checked;
    (this.checked) ? this.textService.setTextAlign('middle') :
      this.textService.setTextAlign('');
  }

  onCheckRight(e: any) {
    this.checked = e.target.checked;
    (this.checked) ? this.textService.setTextAlign('end') :
      this.textService.setTextAlign('');
  }

  onAlignChange(align: string) {
    this.alignRef = align;
    this.textService.setTextAlign(this.alignRef);
  }
}
