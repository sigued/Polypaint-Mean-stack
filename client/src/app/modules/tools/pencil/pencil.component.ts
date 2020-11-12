import { Component, OnInit } from '@angular/core';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { PencilBrushService } from 'src/app/services/pencilBrush.service';
import { TEXTURES_ARRAY } from '../../../entity/tool/toolList';

@Component({
  selector: 'app-pencil',
  templateUrl: './pencil.component.html',
  styleUrls: ['./pencil.component.scss'],
})
export class PencilComponent implements OnInit {

  textureArray: string[] = TEXTURES_ARRAY;
  toolActive: number;
  textureRef: number;
  width: number;

  constructor(private pencilBrushService: PencilBrushService, public drawpageService: DrawpageService) {/** */ }

  ngOnInit() {
    this.width = parseInt(this.pencilBrushService.width, 16);
    this.textureRef = 0;
  }

  onTextureSelectionChange(value: number) {
    this.textureRef = value;
    this.pencilBrushService.setTextureRef(this.textureRef);
  }

  widthChanged(width: number) {
    this.pencilBrushService.setWidth(width.toString());
  }

}
