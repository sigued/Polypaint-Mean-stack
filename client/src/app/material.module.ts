import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatOptionModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [
    MatMenuModule,
    MatSliderModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSliderModule,
    MatRadioModule,
    MatTabsModule,
  ],
  exports: [
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatOptionModule,
    MatSliderModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatTabsModule,
    MatRadioModule,
    MatSliderModule,
  ],
})
export class MaterialModule {/** */ }
