import { Component, OnInit } from '@angular/core';
import { PolygonService } from 'src/app/services/polygon.service';
import { SHAPE_TYPE_ARRAY } from '../../../entity/tool/toolList';

@Component({
  selector: 'app-polygon',
  templateUrl: './polygon.component.html',
  styleUrls: ['./polygon.component.scss'],
})
export class PolygonComponent implements OnInit {
  weight: number;
  nbSide: number;
  typeRef: number;
  typeArray: string[] = SHAPE_TYPE_ARRAY;

  constructor( private polygoneService: PolygonService) {/** */ }

  set widthChanged(weight: number) {
    this.polygoneService.setWeight = weight;
  }

  nbSideChanged() {
    this.polygoneService.setNbSide = this.nbSide;
  }

  typeChanged(value: number) {
    this.typeRef = value;
    this.polygoneService.setType = this.typeRef;
  }

  ngOnInit() {
    this.nbSide = 3;
    this.weight = 1;
    this.typeRef = 0;
  }

}
