import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Ng5SliderModule } from 'ng5-slider';
import { MaterialModule } from 'src/app/material.module';
import { PageDetailModule } from '../page-detail/page-detail.module';
import { BucketToolComponent } from './bucket-tool/bucket-tool.component';
import { EllipseComponent } from './ellipse/ellipse.component';
import { EtampeComponent } from './etampe/etampe.component';
import { LineComponent } from './line/line.component';
import { PenComponent } from './pen/pen.component';
import { PencilComponent } from './pencil/pencil.component';
import { PlumeComponent } from './plume/plume.component';
import { PolygonComponent } from './polygon/polygon.component';
import { RectangleComponent } from './rectangle/rectangle.component';
import { SelectComponent } from './select/select.component';
import { SprayComponent } from './spray/spray.component';
import { TextComponent } from './text/text.component';
import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsComponent } from './tools.component';

@NgModule({
  declarations: [ToolsComponent, PencilComponent, RectangleComponent, LineComponent,
    EllipseComponent, PolygonComponent, EtampeComponent, SelectComponent, PenComponent, TextComponent,
    PlumeComponent, SprayComponent, BucketToolComponent, ],
  imports: [
    CommonModule,
    ToolsRoutingModule,
    MaterialModule,
    PageDetailModule,
    Ng5SliderModule,
  ],
  exports: [
    ToolsComponent,
    MaterialModule,
  ],
})
export class ToolsModule { }
