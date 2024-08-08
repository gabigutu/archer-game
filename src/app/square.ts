export class Square {
  value: number;
  visible: boolean;
  blocked: boolean;
  score: number; // TODO: add score

  constructor(value: number, visible: boolean) {
    this.value = value;
    this.visible = visible;
    this.blocked = false;
    this.score = 1;
  }
}
