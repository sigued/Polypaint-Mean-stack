
import { Component, OnInit } from '@angular/core';
import { SELECT_OPTION_ARRAY } from 'src/app/entity/tool/toolList';
import { HandlerselectionService } from 'src/app/services/handlerselection.service';
import { SelectService } from 'src/app/services/select.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  selectOptions: string[] = SELECT_OPTION_ARRAY;
  constructor(public handlerSelectionService: HandlerselectionService, public selectService: SelectService) {}

  ngOnInit() { /** */}

  buttonClicked(index: number) {
    this.handlerSelectionService.handleSelection(index);
  }

  selectAll() {
    this.handlerSelectionService.selectAll();
  }
}
