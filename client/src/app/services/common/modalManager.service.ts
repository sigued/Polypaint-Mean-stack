import { Optional } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';

export class ModalManagerService {

    modalIsOpen: boolean;
    constructor(@Optional() private dialogRef: MatDialogRef<any, MatDialogConfig>,
                @Optional() private dialog: MatDialog,
    ) {}

    openDialog(component: any): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        this.modalIsOpen = true;
        this.dialogRef = this.dialog.open(component, dialogConfig);
    }
    onClose(): void {
        this.modalIsOpen = false;
        this.dialogRef.close();
      }
}
