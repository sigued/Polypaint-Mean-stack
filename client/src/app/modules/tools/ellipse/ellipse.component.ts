import { Component, OnInit } from '@angular/core';
import { SHAPE_TYPE_ARRAY } from 'src/app/entity/tool/toolList';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { EllipseService } from 'src/app/services/ellipse.service';

@Component({
  selector: 'app-ellipse',
  templateUrl: './ellipse.component.html',
  styleUrls: ['./ellipse.component.scss'],
})
export class EllipseComponent implements OnInit {
  shapeTypeArray: string[] = SHAPE_TYPE_ARRAY;
  typeRef: number;
  weight: number;

  constructor(private ellipseService: EllipseService, private drawPageService: DrawpageService) {
   }

  ngOnInit() {
    this.weight = 1;
    this.typeRef = 0;
    this.drawPageService.setActive(4);
  }

  onTypeSelectionChange(value: number): void {
    this.typeRef = value;
    this.ellipseService.setType(this.typeRef);
  }

  set widthChanged(weight: number) {
    this.ellipseService.setWeight(weight.toString());
  }

}
