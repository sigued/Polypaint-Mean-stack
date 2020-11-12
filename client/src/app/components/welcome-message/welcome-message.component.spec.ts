import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalManagerService } from 'src/app/services/common/modalManager.service';
import { ModalManagerServiceStub } from 'src/app/stubs/modalManagerService.stub';
import { WelcomeMessageComponent } from './welcome-message.component';

describe('WelcomeMessageComponent', () => {
  let component: WelcomeMessageComponent;
  let fixture: ComponentFixture<WelcomeMessageComponent>;
  let modalManagerService: ModalManagerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeMessageComponent ],
      providers: [{provide: ModalManagerService, useClass: ModalManagerServiceStub}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeMessageComponent);
    modalManagerService = TestBed.get(ModalManagerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
      expect(component).toBeTruthy();
    });

  it('should set display value to block when localstorage.getitem is null', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    fixture.detectChanges();
    expect(component.displayValue).toEqual('block');
  });

  it('should set display value to block when localstorage.getitem is false', () => {
    spyOn(localStorage, 'getItem').and.returnValue('False');
    fixture.detectChanges();
    expect(component.displayValue).toEqual('block');
  });

  it('should set display value to none when localstorage.getitem is true', () => {
    component.item = 'true';
    spyOn(localStorage, 'getItem').and.returnValue('true');
    fixture = TestBed.createComponent(WelcomeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.displayValue).toEqual('none');
    expect(modalManagerService.modalIsOpen).toBeFalsy();
    });

  it('should return the display value as "none"', () => {
    component.fermer();
    expect(component.displayValue).toEqual('none');
    expect(modalManagerService.modalIsOpen).toBeFalsy();
    });

  it('when event target value checked is true value should store true', () => {
        let expectedKey = '';
        let expectedValue = '';
        spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
          expectedKey = key;
          expectedValue = value;
        });
        const event: any = {
          target: {
            checked: true,
          },
        };
        component.store(event);
        expect(expectedKey).toEqual('log2990');
        expect(expectedValue).toEqual('True');
    });

  it('when event target value checked is false value should store false', () => {
      let expectedKey = '';
      let expectedValue = '';
      spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
        expectedKey = key;
        expectedValue = value;
      });
      const event: any = {
        target: {
          checked: false,
        },
      };
      component.store(event);
      expect(expectedKey).toEqual('log2990');
      expect(expectedValue).toEqual('False');
  });

  });
