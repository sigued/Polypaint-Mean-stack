import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSliderModule } from '@angular/material';
import { BucketToolService } from 'src/app/services/bucket-tool.service';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { GridService } from 'src/app/services/grid.service';
import { MagnestismService } from 'src/app/services/magnetism.service';
import { BucketToolServiceStub } from 'src/app/stubs/bucketToolService.stub';
import { DrawpageServiceStub } from 'src/app/stubs/drawpageService.stub';
import { BucketToolComponent } from './bucket-tool.component';

describe('BucketToolComponent', () => {
  let component: BucketToolComponent;
  let fixture: ComponentFixture<BucketToolComponent>;
  let bucketToolService: BucketToolService;
  let drawpageService: DrawpageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketToolComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      imports: [MatSliderModule, ],
      providers: [MagnestismService, GridService, {provide: DrawpageService, useClass: DrawpageServiceStub},
        {provide: BucketToolService, useClass: BucketToolServiceStub}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketToolComponent);
    component = fixture.componentInstance;
    bucketToolService = TestBed.get(BucketToolService);
    drawpageService = TestBed.get(DrawpageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when widthChanged is called', () => {
    spyOn(bucketToolService, 'setWidth');
    component.widthChanged = 50;
    expect(bucketToolService.setWidth).toHaveBeenCalledWith(50);
  });

  it('when ngOnInit is called ', () => {
    spyOn(drawpageService, 'setActive');
    component.ngOnInit();
    component.widthChanged = 50;
    expect(drawpageService.setActive).toHaveBeenCalledWith(50);
  });
});
