import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserguideComponent } from './userguide.component';

describe('UserguideComponent', () => {
  let component: UserguideComponent;
  let fixture: ComponentFixture<UserguideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserguideComponent ],
      imports: [ MatSidenavModule, MatButtonModule, MatIconModule, MatListModule,
        RouterModule, BrowserAnimationsModule, RouterTestingModule, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when ngOnit is called', () => {
    component.ngOnInit();
    expect(component.showPencil).toBeTruthy();
  });

  it('should be displayGif Pencil', () => {
    component.displayGif(0);
    expect(component.showPencil).toBeTruthy();
  });

  it('should be displayGif PencilBrush', () => {
    component.displayGif(1);
    expect(component.showPencilBrush).toBeTruthy();
  });

  it('should be displayGif Pen', () => {
    component.displayGif(2);
    expect(component.showPen).toBeTruthy();
  });

  it('should be displayGif Feather', () => {
    component.displayGif(3);
    expect(component.showFeather).toBeTruthy();
  });

  it('should be displayGif Spray', () => {
    component.displayGif(4);
    expect(component.showSpray).toBeTruthy();
  });

  it('should be displayGif Line', () => {
    component.displayGif(5);
    expect(component.showLine).toBeTruthy();
  });

  it('should be displayGif Rectangle', () => {
    component.displayGif(6);
    expect(component.showRectangle).toBeTruthy();
  });
  it('should be displayGif Ellipse', () => {
    component.displayGif(7);
    expect(component.showEllipse).toBeTruthy();
  });

  it('should be displayGif Polygon', () => {
    component.displayGif(8);
    expect(component.showPolygon).toBeTruthy();
  });

  it('should be displayGif Color Applicator', () => {
    component.displayGif(9);
    expect(component.showApplicator).toBeTruthy();
  });

  it('should be displayGif Pipette', () => {
    component.displayGif(10);
    expect(component.showPipette).toBeTruthy();
  });

  it('should be displayGif PaintBucket', () => {
    component.displayGif(11);
    expect(component.showPaintBucket).toBeTruthy();
  });

  it('should be displayGif Text', () => {
    component.displayGif(12);
    expect(component.showText).toBeTruthy();
  });

  it('should be displayGif Stamps', () => {
    component.displayGif(13);
    expect(component.showStamps).toBeTruthy();
  });

  it('should be displayGif Select', () => {
    component.displayGif(14);
    expect(component.showSelect).toBeTruthy();
  });

  it('should be displayGif Eraser', () => {
    component.displayGif(15);
    expect(component.showEraser).toBeTruthy();
  });

  it('when deactivateAll is called', () => {
    component.deactivateAll();
    expect(component.showApplicator).toBeFalsy();
    expect(component.showPencil).toBeFalsy();
    expect(component.showPencilBrush).toBeFalsy();
    expect(component.showPen).toBeFalsy();
    expect(component.showSpray).toBeFalsy();
    expect(component.showFeather).toBeFalsy();
    expect(component.showEllipse).toBeFalsy();
    expect(component.showRectangle).toBeFalsy();
    expect(component.showPaintBucket).toBeFalsy();
    expect(component.showStamps).toBeFalsy();
    expect(component.showSelect).toBeFalsy();
    expect(component.showEraser).toBeFalsy();
    expect(component.showLine).toBeFalsy();
    expect(component.showPolygon).toBeFalsy();
    expect(component.showText).toBeFalsy();
  });

});
