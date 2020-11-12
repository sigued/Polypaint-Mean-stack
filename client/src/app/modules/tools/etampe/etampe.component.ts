import { Component, OnInit } from '@angular/core';
import { EtampeService } from 'src/app/services/etampe.service';
import {COMPLETE_ANGLE, ZERO_ANGLE} from '../../../constant';
import { STAMP_ARRAY } from '../../../entity/tool/toolList';

@Component({
  selector: 'app-etampe',
  templateUrl: './etampe.component.html',
  styleUrls: ['./etampe.component.scss'],
})
export class EtampeComponent implements OnInit {
  echelle: number;
  rotationAngle: number;
  stampArray: string[] = STAMP_ARRAY;
  stampRef: number;
  stampActive: number;

  constructor(private stampService: EtampeService, ) {/** */ }

  ngOnInit() {
   this.stampService.rotationAngleSubject.subscribe(
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
   this.echelle = this.stampService.echelle;
   this.onStampSelectionChange(0);
  }

  scaleChanged(echelle: number) {
    this.stampService.setEchelle(echelle / 100);
  }

  rotationAngleChanged(rotationAngle: number) {
    this.stampService.setRotationAngle(rotationAngle);
  }

  onStampSelectionChange(value: number) {
    this.stampRef = value;
    this.stampService.setStampRef(this.stampRef);
    this.stampService.setActiveStamp(this.stampArray[this.stampRef]);
  }

}
