import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GridService } from 'src/app/services/grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {

  widthControl = new FormControl('', [Validators.required, Validators.min(5), Validators.max(50)]);
  heightControl = new FormControl('', [Validators.required, Validators.min(5), Validators.max(50)]);
  width: number;
  height: number;
  opacity: number;

  constructor(private gridService: GridService) { }

  ngOnInit() {
    this.width = this.gridService.width;
    this.height = this.gridService.height;
    this.opacity = this.gridService.opacity;
  }

  triggerResizeHeight(): void {
    this.gridService.setHeight(this.height);
  }

  triggerResizeWidth(): void {
    this.gridService.setWidth(this.width);
  }

  set opacityChanged(opacity: number) {
      this.gridService.setOpacity(opacity);
  }

  getActivationStatus(): boolean {
    return this.gridService.checked;
  }

  onCheck(e: any): void {
    this.gridService.checked = e.target.checked;
    if (!this.gridService.checked) {
      this.gridService.setWidth(0);
      this.gridService.setHeight(0);
      this.gridService.setOpacity(0);
    } else {
      this.gridService.setWidth(10);
      this.gridService.setHeight(10);
      this.gridService.setOpacity(5);
    }
  }
}
