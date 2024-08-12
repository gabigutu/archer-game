export class Player {
  walkSprite = 0;
  noWalkSprites = 8;
  posOx = 0;
  width = 128;

  noLives = 0;
  score = 0;

  looksRight = true;
  isDecelerating = false;

  velocityX = 0;
  acceleration = 0.5;
  deceleration = 1;
  maxSpeed = 12;

  constructor(noLives: number) {
    this.noLives = noLives;
  }

  incrementSprite(): void {
    this.walkSprite++;
    if (this.walkSprite >= this.noWalkSprites) this.walkSprite = 0;
  }
}
