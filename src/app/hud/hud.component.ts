import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.css'],
})
export class HudComponent {
  @Input() score: number;
  @Input() lives: number;

  constructor() {
    this.score = 0;
    this.lives = 0;
  }
}
