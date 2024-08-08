import { EnemyInstance } from '../enemy-instance';
import { Player } from './../player';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css'],
})
export class ScreenComponent implements OnInit {
  /* Start config game */
  MIN_NO_ENEMIES = 3;
  MAX_NO_ENEMIES = 6;
  INTERVAL_MOVE_ENEMIES = 500;
  /* End config game */

  player: Player = new Player();
  enemies: EnemyInstance[] = [];
  noEnemies = 0;
  maxEnemyDistance = 1000;
  playerWidth = 128;

  constructor() {}

  moveEntity(entity: any, leftToRight: boolean, howMuch: number): void {
    if (leftToRight) {
      entity.posOx += howMuch;
    } else {
      entity.posOx -= howMuch;
    }

    entity.walkSprite++;
    if (entity.walkSprite > 8) entity.walkSprite = 1;
  }

  makeEnemiesMove(): void {
    setInterval(() => {
      // deplasez
      for (let enemy of this.enemies) {
        this.moveEntity(enemy, enemy.looksRight, 5);
      }
    }, this.INTERVAL_MOVE_ENEMIES);
  }

  ngOnInit(): void {
    // generate enemies
    this.noEnemies = Math.ceil(
      Math.random() * (this.MAX_NO_ENEMIES - this.MIN_NO_ENEMIES + 1) +
        this.MIN_NO_ENEMIES
    ); // [1; 20]
    // [0; 1) * (6 - 3 + 1) + 3 => [0; 4) + 3 => [3; 7)
    console.log('Avem ' + this.noEnemies + ' inamici');
    for (let i = 0; i < this.noEnemies; i++) {
      let enemy = new EnemyInstance();
      // make it swordsman or wizard
      enemy.type = Math.round(Math.random());
      // move to random position
      enemy.posOx = Math.random() * this.maxEnemyDistance + this.playerWidth; // [0; 1) * 200 + 128 => [0; 200) + 128 => [128; 328)
      // make it look left or right
      // TODO: make it short-hand
      let looksRnd = Math.random();
      if (looksRnd < 0.5) enemy.looksRight = true;
      else enemy.looksRight = false;
      this.enemies.push(enemy);
    }
    this.makeEnemiesMove();
  }

  // read right arrow press
  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    console.log('s-a apasat tasta: ' + event.key);
    switch (event.key) {
      case 'ArrowRight':
        // e cazul sa-l rotesc?
        if (!this.player.looksRight) {
          this.player.looksRight = true;
        }
        // schimba sprite
        this.player.walkSprite++;
        if (this.player.walkSprite > 8) this.player.walkSprite = 0;
        // muta-l mai la dreapta
        this.player.posOx += 5;
        break;
      case 'ArrowLeft':
        // e cazul sa-l rotesc?
        if (this.player.looksRight) {
          this.player.looksRight = false;
        }
        // schimba sprite
        this.player.walkSprite++;
        if (this.player.walkSprite > 8) this.player.walkSprite = 0;
        // muta-l mai la stanga
        this.player.posOx -= 5;
        break;
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent): void {
    console.log('s-a eliberat tasta: ' + event.key);
  }
}
