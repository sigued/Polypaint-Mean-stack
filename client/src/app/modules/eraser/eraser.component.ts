import { Component, OnInit } from '@angular/core';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { EraserService } from 'src/app/services/eraser.service';

@Component({
  selector: 'app-eraser',
  templateUrl: './eraser.component.html',
  styleUrls: ['./eraser.component.scss'],
})
export class EraserComponent implements OnInit {
  private width: number;

  constructor(private eraserService: EraserService, private drawpageService: DrawpageService) { /**/ }

  ngOnInit() {
    this.width = 10;
    this.eraserService.setWidth = this.width;
    this.drawpageService.setActive(9);
  }

  set widthChanged(width: number) {
    this.eraserService.setWidth = width;
  }

}
