import { Component } from '@angular/core';
import { DEFAULT_LINE_JUNCTION_DIAMETER, DEFAULT_LINE_WIDTH, ZERO } from 'src/app/constant';
import { DASHED_LINE_ARRAY, LINE_JUNCTION_ARRAY } from 'src/app/entity/tool/toolList';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { LineService } from 'src/app/services/line.service';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
})
export class LineComponent {

  lineJunctionArray: string[] = LINE_JUNCTION_ARRAY;
  dashedLineArray: string[] = DASHED_LINE_ARRAY;

  width: string;
  junctionDiameter: string;
  junctionType: number;
  dashedLine: number;

  constructor(private lineService: LineService, public drawpageService: DrawpageService) { /** */ }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.width = DEFAULT_LINE_WIDTH;
    this.junctionDiameter = DEFAULT_LINE_JUNCTION_DIAMETER;
    this.junctionType = ZERO;
    this.dashedLine = ZERO;
  }

  junctionTypeChanged(value: number) {
    this.junctionType = value;
    this.lineService.setJunctionType(this.junctionType);
  }

  diameterChanged() {
    this.lineService.setJunctionDiametre(this.junctionDiameter);
  }

  dashedLineChanged(dash: number) {
    this.dashedLine = dash;
    this.lineService.setDashed(this.dashedLine);
  }

  set widthChanged(width: string) {
    this.lineService.setWidth(width);
  }
}
