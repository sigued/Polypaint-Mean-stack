import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { MatDialogStub } from 'src/app/stubs/matDialog.stub';
import { MatDialogRefStub } from 'src/app/stubs/matDialogRef.stub';
import { ModalManagerService } from './modalManager.service';

describe('ModalManagerService', () => {

    let modalManagerService: ModalManagerService;
    let dialog: MatDialog;
    let dialogRef: MatDialogRef<any, MatDialogConfig>;

    beforeEach(async () => {
      TestBed.configureTestingModule({
        providers: [ModalManagerService, {provide: MatDialog, useClass: MatDialogStub},
          {provide: MatDialogRef, useClass: MatDialogRefStub}],
      });
      modalManagerService =  TestBed.get(ModalManagerService);
      dialog = TestBed.get(MatDialog);
      dialogRef = TestBed.get(MatDialogRef);
    });

    it('should have as modalisOpen undefined', () => {
      expect(modalManagerService.modalIsOpen).toBeUndefined();
    });

    it('should openDialog', () => {
      // tslint:disable-next-line: prefer-const
      let component: any;
      spyOn(dialog, 'open');
      modalManagerService.openDialog(component);
      expect(dialog.open).toHaveBeenCalled();
      expect(modalManagerService.modalIsOpen).toBeTruthy();
    });

    it('should onClose', () => {
      spyOn(dialogRef, 'close');
      modalManagerService.onClose();
      expect(modalManagerService.modalIsOpen).toBeFalsy();
      expect(dialogRef.close).toHaveBeenCalled();
    });

});
