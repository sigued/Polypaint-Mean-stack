import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MagnestismService } from 'src/app/services/magnetism.service';
import { MagnestismServiceStub } from 'src/app/stubs/magnetismService.stub';
import { MagnetismComponent } from './magnetism.component';

describe('MagnetismComponent', () => {
  let component: MagnetismComponent;
  let fixture: ComponentFixture<MagnetismComponent>;
  let magnestismService: MagnestismService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagnetismComponent ],
      imports: [FormsModule, ReactiveFormsModule ],
      providers: [{ provide: MagnestismService, useClass: MagnestismServiceStub}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagnetismComponent);
    component = fixture.componentInstance;
    magnestismService = TestBed.get(MagnestismService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initForm', () => {
    component.initForm();
    expect(component.magnestismForm).toBeDefined();
  });

  it('should store', () => {
    const event: any = {
      target: {
        checked: false,
      },
    };
    component.store(event);
    expect(magnestismService.isActivated).toBeFalsy();
  });

  it('should getActivationStatus', () => {
    expect(component.getActivationStatus()).toEqual(magnestismService.isActivated);
  });

  it('should changeCorner', () => {
    const event: any = {
      target: {
        value: 'Top Left',
      },
    };
    component.changeCorner(event);
    expect(component.magnestismForm.value.corner).toEqual('Top Left');
  });
});
