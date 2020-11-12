import { Component, OnInit } from '@angular/core';
import { RectangleService } from 'src/app/services/rectangle.service';
import { SHAPE_TYPE_ARRAY } from '../../../entity/tool/toolList';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.scss'],
})

export class RectangleComponent implements OnInit {

  weight: number;
  shapeTypeArray: string[] = SHAPE_TYPE_ARRAY;
  typeRef: number;
  constructor(private rectangleService: RectangleService) {/** */ }

  set widthChanged(weight: number) {
    this.rectangleService.setWeight(weight.toString());
  }

  onTypeSelectionChange(value: number) {
    this.typeRef = value;
    this.rectangleService.setType(this.typeRef);
  }

  ngOnInit() {
    this.weight = 1;
    this.typeRef = 0;
  }

}
