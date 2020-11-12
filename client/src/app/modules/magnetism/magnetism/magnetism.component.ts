import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MagnestismService } from 'src/app/services/magnetism.service';

@Component({
  selector: 'app-magnetism',
  templateUrl: './magnetism.component.html',
  styleUrls: ['./magnetism.component.scss'],
})
export class MagnetismComponent implements OnInit {

  magnestismForm: FormGroup;
  isActivated: boolean;
  corners: string[] = ['Top Left', 'Top Center', 'Top Right',
  'Bottom Left', 'Bottom Center', 'Bottom Right', 'Left Center', 'Right Center'];
  constructor(private formBuilder: FormBuilder, private magnestismService: MagnestismService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.magnestismForm = this.formBuilder.group({
      corner: [this.magnestismService.corner, [Validators.required]],
    });
  }

  store(e: any): void {
    this.magnestismService.isActivated = e.target.checked;
  }

  getActivationStatus(): boolean {
    return this.magnestismService.isActivated;
  }

  changeCorner(e: any): void {
    this.magnestismForm.controls.corner.setValue(e.target.value, {
      onlySelf: true,
    });
    this.magnestismService.corner = this.magnestismForm.value.corner;
  }

}
