import { EnemyInstance } from '../enemy-instance';
import { Player } from './../player';
import { Component, HostListener, OnInit } from '@angular/core';
import { Coin } from '../coin';

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
  NO_INITIAL_LIVES = 3;

  MAX_NO_COINS = 5;
  MIN_NO_COINS = 2;
  /* End config game */

  player: Player = new Player(this.NO_INITIAL_LIVES);
  playerWidth = 128;

  // Enemies
  enemies: EnemyInstance[] = [];
  noEnemies = 0;
  maxEnemyDistance = 1000;

  // Coins
  coins: Coin[] = [];
  noCoins = 0;
  maxCoinDistance = 1000;

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

  generateEnemies(): void {
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
  }

  generateCoins(): void {
    // generate coins
    this.noCoins = Math.ceil(
      Math.random() * (this.MAX_NO_COINS - this.MIN_NO_COINS + 1) +
        this.MIN_NO_COINS
    );
    console.log('Avem ' + this.noCoins + ' monede');
    for (let i = 0; i < this.noCoins; i++) {
      let coin = new Coin('Silver_', 21, 30);
      coin.posOx = Math.random() * this.maxCoinDistance + this.playerWidth;
      this.coins.push(coin);
    }
  }

  ngOnInit(): void {
    this.generateEnemies();
    this.generateCoins();

    this.makeEnemiesMove();
    this.gameplay();
  }

  destroyElement(elements: any[], i: number): void {
    elements.splice(i, 1);
  }

  checkCollisions() {
    // for (let enemy of this.enemies) {
    for (let i = 0; i < this.enemies.length; i++) {
      let thereIsCollision = this.checkCollision(this.player, this.enemies[i]);
      if (thereIsCollision) {
        this.player.noLives--;
        this.destroyElement(this.enemies, i);
        console.log('No lives: ' + this.player.noLives);
      }
    }
    // check collision with coins
    for (let i = 0; i < this.coins.length; i++) {
      let thereIsCollision = this.checkCollision(this.player, this.coins[i]);
      if (thereIsCollision) {
        this.player.score++;
        this.destroyElement(this.coins, i);
        console.log('Score: ' + this.player.score);
      }
    }
  }

  gameplay(): void {
    this.checkCollisions();
    // ...

    requestAnimationFrame(() => {
      this.gameplay();
    });
  }

  checkCollision(player: Player, something: any): boolean {
    /*
      player: left: player.posOx; right: player.posOx + player.width
      enemy: left: enemy.posOx; right: enemy.posOx + enemy.width
    */

    // margine dreapta jucator > margine stanga inamic
    // && margine stanga jucator < margine dreapta inamic
    // [ player ]
    //       ( enemy )
    if (
      player.posOx + player.width > something.posOx &&
      player.posOx < something.posOx + something.width
    ) {
      console.error('coliziune din dreapta!');
      return true;
    }
    // margine stanga jucator < margine dreapta inamic
    // && margine dreapta jucator > margine stanga inamic
    //       [ player  ]
    // ( enemy )
    if (
      player.posOx < something.posOx + something.width &&
      player.posOx + player.width > something.posOx
    ) {
      // 0 < 150 + 128
      console.error('coliziune din stanga!');
      return true;
    }
    // alte verificari
    return false;
  }

  // read right arrow press
  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    console.log('s-a apasat tasta: ' + event.key);
    switch (event.key) {
      case 'ArrowRight':
        if (!this.player.isDecelerating) {
          // e cazul sa-l rotesc?
          if (!this.player.looksRight) {
            this.player.looksRight = true;
          }
          // schimba sprite
          this.player.incrementSprite();

          // muta-l mai la dreapta
          // this.player.posOx += 5; // fara acceleratie

          this.player.velocityX =
            this.player.velocityX + this.player.acceleration;
          if (this.player.velocityX > this.player.maxSpeed) {
            this.player.velocityX = this.player.maxSpeed;
          }
          console.log('Velocity: ' + this.player.velocityX);
          this.player.posOx = this.player.posOx + this.player.velocityX;
        }
        break;
      case 'ArrowLeft':
        console.log(
          'am apasat left; isdecelerating = ',
          this.player.isDecelerating
        );
        if (!this.player.isDecelerating) {
          console.log(
            'am intrat; isdecelerating = ',
            this.player.isDecelerating
          );
          // e cazul sa-l rotesc?
          if (this.player.looksRight) {
            this.player.looksRight = false;
          }
          // schimba sprite
          this.player.incrementSprite();

          // muta-l mai la stanga
          // this.player.posOx -= 5; // fara acceleratie

          this.player.velocityX =
            this.player.velocityX + this.player.acceleration;
          if (this.player.velocityX > this.player.maxSpeed) {
            this.player.velocityX = this.player.maxSpeed;
          }
          console.log('Velocity: ' + this.player.velocityX);
          this.player.posOx = this.player.posOx - this.player.velocityX;
        }
        break;
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent): void {
    let intervalDecelerare: any;
    console.log('s-a eliberat tasta: ' + event.key);
    switch (event.key) {
      case 'ArrowRight':
        // this.player.velocityX = 0;
        this.player.isDecelerating = true;
        intervalDecelerare = setInterval(() => {
          // schimba sprite
          this.player.incrementSprite();

          // deceleram
          this.player.velocityX =
            this.player.velocityX - this.player.deceleration;
          console.log(
            'Mai merg un pic (velocityX = ' +
              this.player.velocityX +
              '); isDecelerating = ' +
              this.player.isDecelerating
          );
          if (this.player.velocityX <= 0) {
            this.player.velocityX = 0;
            this.player.isDecelerating = false;
            clearInterval(intervalDecelerare);
          }

          // mutam player-ul
          this.player.posOx = this.player.posOx + this.player.velocityX;
        }, 30);

        // TODO: replace with running sprite
        break;
      case 'ArrowLeft':
        // this.player.velocityX = 0;
        this.player.isDecelerating = true;
        intervalDecelerare = setInterval(() => {
          // schimba sprite
          this.player.incrementSprite();

          // deceleram
          this.player.velocityX =
            this.player.velocityX - this.player.deceleration;
          console.log(
            'Mai merg un pic (velocityX = ' + this.player.velocityX + ')'
          );
          if (this.player.velocityX <= 0) {
            this.player.velocityX = 0;
            this.player.isDecelerating = false;
            clearInterval(intervalDecelerare);
          }

          // mutam player-ul
          this.player.posOx = this.player.posOx - this.player.velocityX;
        }, 30);

        break;
    }
  }
}
