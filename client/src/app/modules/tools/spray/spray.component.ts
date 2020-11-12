import { Component, OnInit } from '@angular/core';
import { SprayService } from 'src/app/services/spray.service';

@Component({
  selector: 'app-spray',
  templateUrl: './spray.component.html',
  styleUrls: ['./spray.component.scss'],
})
export class SprayComponent implements OnInit {
  radius: number;
  quantity: number;

  constructor(private sprayService: SprayService) { }

  ngOnInit() {
    this.radius = 7;
    this.quantity = 1;
  }

  set radiusChanged(radius: number) {
    this.sprayService.setRadius = radius;
  }

  set quantityChanged(quantity: number) {
    this.sprayService.setQuantity = quantity;
  }
}
