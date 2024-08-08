import { Square } from './../square';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent {
  @Input() square: Square | null;
  @Output() clickedCellEmitter: EventEmitter<any>;
  constructor() {
    this.square = null;
    this.clickedCellEmitter = new EventEmitter();
  }

  clickedCell(): void {
    console.log('ai dat click');
    if (this.square) this.square.visible = true;
    this.clickedCellEmitter.emit();
  }
}
