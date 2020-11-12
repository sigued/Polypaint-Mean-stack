import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { WelcomeMessageComponent } from './components/welcome-message/welcome-message.component';
import { MaterialModule } from './material.module';
import { ColorModule } from './modules/color/color.module';
import { DrawingFileModule } from './modules/drawing-file/drawing-file.module';
import { MagnetismModule } from './modules/magnetism/magnetism.module';
import { NewDrawingModule } from './modules/new-drawing/new-drawing.module';
import { PageDetailModule } from './modules/page-detail/page-detail.module';
import { ToolsModule } from './modules/tools/tools.module';
import { UserguideComponent } from './modules/userguide/userguide.component';
import { UndoRedoCommand } from './services/command/undoRedoCommand';
import { DrawingFileService } from './services/common/drawingFile.service';
import { DrawingZoneParametersService } from './services/common/drawingZoneParameters.service';
import { ModalManagerService } from './services/common/modalManager.service';
import { GridService } from './services/grid.service';
import { MagnestismService } from './services/magnetism.service';
import { RectangleService } from './services/rectangle.service';
import { ToolService } from './services/tool.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeMessageComponent,
    UserguideComponent,
  ],
  imports: [
    BrowserModule,
    NewDrawingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    ToolsModule,
    MaterialModule,
    FormsModule,
    ColorModule,
    PageDetailModule,
    DrawingFileModule,
    MagnetismModule,
  ],
  exports: [
    BrowserModule,
    ToolsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  entryComponents: [UserguideComponent],
  providers: [ToolService, DrawingZoneParametersService, RectangleService, DrawingFileService, ModalManagerService, UndoRedoCommand,
    MagnestismService, GridService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
