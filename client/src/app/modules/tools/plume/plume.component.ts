import { Component, OnInit } from '@angular/core';
import { COMPLETE_ANGLE, DEFAULT_FEATHER_WIDTH, ZERO_ANGLE } from 'src/app/constant';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { PlumeService } from 'src/app/services/plume.service';

@Component({
  selector: 'app-plume',
  templateUrl: './plume.component.html',
  styleUrls: ['./plume.component.scss'],
})
export class PlumeComponent implements OnInit {
  width: number;
  rotationAngle: number;

  constructor(private plumeService: PlumeService, public drawpageService: DrawpageService) {}

  ngOnInit() {
    this.width = DEFAULT_FEATHER_WIDTH;
    this.rotationAngle = ZERO_ANGLE;

    this.plumeService.rotationAngleSubject.subscribe(
      (angle: number) => {
        if (angle > COMPLETE_ANGLE) {
          this.rotationAngle = COMPLETE_ANGLE;
        } else if (angle < ZERO_ANGLE) {
          this.rotationAngle = ZERO_ANGLE;
        } else {
          this.rotationAngle = angle;
        }
      },
    );
   }

  widthChanged() {
    this.plumeService.setWidth(this.width);
  }

  rotationAngleChanged() {
    this.plumeService.setRotationAngle(this.rotationAngle);
  }
}
