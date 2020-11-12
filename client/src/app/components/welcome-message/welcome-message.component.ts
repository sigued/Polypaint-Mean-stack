import { Component, OnInit } from '@angular/core';
import { UserguideComponent } from 'src/app/modules/userguide/userguide.component';
import { ModalManagerService } from 'src/app/services/common/modalManager.service';

@Component({
  selector: 'app-welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.scss'],
})
export class WelcomeMessageComponent implements OnInit {

  displayValue: string | null;
  item: string | null;
  constructor(private modalManagerService: ModalManagerService) {

    this.displayValue = null;
    this.item = null;
  }

  fermer(): void {
    this.displayValue = 'none';
    this.modalManagerService.modalIsOpen = false;
  }

  store(e: any): void {
    localStorage.setItem('log2990', (e.target.checked) ? 'True' : 'False');
  }

  ngOnInit() {
    this.item = localStorage.getItem('log2990');
    this.displayValue = (this.item == null || this.item === 'False') ? 'block' : 'none';
    this.modalManagerService.modalIsOpen = this.displayValue === 'block';
  }

  openDialogUserguide(): void {
    this.displayValue = 'none';
    this.modalManagerService.openDialog(UserguideComponent);
  }
}
