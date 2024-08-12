import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-coin-element',
  templateUrl: './coin-element.component.html',
  styleUrls: ['./coin-element.component.css'],
})
export class CoinElementComponent {
  @Input() coin: any;
}
