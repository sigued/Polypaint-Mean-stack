import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DEFAULT_PATH_STROKEWIDTH } from 'src/app/constant';
import { BucketToolService } from 'src/app/services/bucket-tool.service';
import { DrawpageService } from 'src/app/services/drawpage.service';

@Component({
  selector: 'app-bucket-tool',
  templateUrl: './bucket-tool.component.html',
  styleUrls: ['./bucket-tool.component.scss'],
})
export class BucketToolComponent implements OnInit {
  strokeWidth: number;
  strokeWidthSubscription: Subscription;

  constructor(private bucketToolService: BucketToolService, private drawPageService: DrawpageService) {/** */}

  ngOnInit() {
    this.strokeWidth = DEFAULT_PATH_STROKEWIDTH;
    this.drawPageService.setActive(15);

    this.strokeWidthSubscription = this.bucketToolService.strokeWidthSubject.subscribe(
      (width: number) => {
        this.strokeWidth = width;
      },
    );
  }

  set widthChanged(width: number) {
    this.bucketToolService.setWidth(width);
  }

}
