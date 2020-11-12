import { Component, OnInit } from '@angular/core';

enum showGifs {pencil = 0, pencilBrush = 1, pen = 2, feather = 3, spray = 4, line = 5, rectangle = 6, ellipse = 7, polygon = 8,
  colorApplicator = 9, pipette = 10, paintBucket = 11, text = 12, stamps = 13, select = 14, eraser = 15 }

@Component({
  selector: 'app-userguide',
  templateUrl: './userguide.component.html',
  styleUrls: ['./userguide.component.scss'],
})

export class UserguideComponent implements OnInit {

  showPencil = false;
  showPolygon = false;
  showPencilBrush = false;
  showPaintBucket = false;
  showPen = false;
  showFeather = false;
  showRectangle = false;
  showEllipse = false;
  showPipette = false;
  showApplicator = false;
  showText = false;
  showLine = false;
  showSelect = false;
  showSpray = false;
  showStamps = false;
  showEraser = false;

  ngOnInit() {
    this.showPencil = true;
  }

  displayGif(value: number) {
    this.deactivateAll();
    switch (value) {
      case showGifs.pencil:
        this.showPencil = ! this.showPencil;
        break;
      case showGifs.pencilBrush:
        this.showPencilBrush = ! this.showPencilBrush;
        break;
      case showGifs.pen:
        this.showPen = ! this.showPen;
        break;
      case showGifs.feather:
        this.showFeather = ! this.showFeather;
        break;
      case showGifs.spray:
        this.showSpray = ! this.showSpray;
        break;
      case showGifs.line:
        this.showLine = ! this.showLine;
        break;
      case showGifs.rectangle:
        this.showRectangle = ! this.showRectangle;
        break;
      case showGifs.ellipse:
        this.showEllipse = ! this.showEllipse;
        break;
      case showGifs.polygon:
        this.showPolygon = ! this.showPolygon;
        break;
      case showGifs.colorApplicator:
        this.showApplicator = ! this.showApplicator;
        break;
      case showGifs.pipette:
        this.showPipette = ! this.showPipette;
        break;
      case showGifs.paintBucket:
        this.showPaintBucket = ! this.showPaintBucket;
        break;
      case showGifs.text:
        this.showText = ! this.showText;
        break;
      case showGifs.stamps:
        this.showStamps = ! this.showStamps;
        break;
      case showGifs.select:
        this.showSelect = ! this.showSelect;
        break;
      case showGifs.eraser:
        this.showEraser = ! this.showEraser;
        break;
    }
  }

  deactivateAll(): void {
    this.showPencil = false;
    this.showPencilBrush = false;
    this.showPaintBucket = false;
    this.showPen = false;
    this.showFeather = false;
    this.showRectangle = false;
    this.showEllipse = false;
    this.showPipette = false;
    this.showApplicator = false;
    this.showText = false;
    this.showLine = false;
    this.showSelect = false;
    this.showSpray = false;
    this.showStamps = false;
    this.showPolygon = false;
    this.showEraser = false;
  }

}
