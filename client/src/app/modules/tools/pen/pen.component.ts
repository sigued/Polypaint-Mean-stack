import { Component } from '@angular/core';
import { DEFAULT_PEN_MAX_WIDTH, DEFAULT_PEN_MIN_WIDTH } from 'src/app/constant';
import { PenService } from 'src/app/services/pen.service';

@Component({
  selector: 'app-pen',
  templateUrl: './pen.component.html',
  styleUrls: ['./pen.component.scss'],
})
export class PenComponent {

  minValue: number;
  maxValue: number;

  constructor(private penService: PenService) {
    this.minValue = DEFAULT_PEN_MIN_WIDTH;
    this.maxValue = DEFAULT_PEN_MAX_WIDTH;
  }

  minValueChanged() {
    if ( this.minValue < this.maxValue ) {
      this.penService.setMinWidth(this.minValue);
    } else {
      this.minValue = this.maxValue - 1;
    }
  }

  maxValueChanged() {
    if ( this.minValue < this.maxValue ) {
      this.penService.setMaxWidth(this.maxValue);
    } else {

      this.penService.setMinWidth(this.minValue + 1);
    }
  }

}
