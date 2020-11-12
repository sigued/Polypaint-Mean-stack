import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { SvgClickhandlerService } from 'src/app/services/svgclickhandler.service';
import { TOOLS_ARRAY } from '../../entity/tool/toolList';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent implements OnInit, OnDestroy {

  toolActive: number;
  toolArray: string[] = TOOLS_ARRAY;
  activeSubscription: Subscription;

  constructor(private drawpageService: DrawpageService, private svgClickHandler: SvgClickhandlerService) {}

  ngOnInit() {
    this.toolActive = this.drawpageService.active;

    this.activeSubscription = this.drawpageService.activeSubject.subscribe(
      (active: number) => {
        this.toolActive = active;
      },
    );
  }

  onActiveSelectionChange(value: number) {
    this.toolActive = value;
    this.drawpageService.setActive(value);
    this.svgClickHandler.setActive(value);
    this.drawpageService.deselectAll();
  }

  ngOnDestroy(): void {
    this.activeSubscription.unsubscribe();
  }
}
