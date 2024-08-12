export class Coin {
  faceNo: number;
  prefix: string;
  startFaceNo: number;
  maxFaceNo: number;

  width = 64;
  height = 64;

  posOx: number = 0;

  constructor(prefix: string, startFaceNo: number, maxFaceNo: number) {
    this.prefix = prefix; // Silver_
    this.startFaceNo = startFaceNo; // 21
    this.maxFaceNo = maxFaceNo; // 30

    this.faceNo = startFaceNo;
  }

  incrementFaceNo(): void {
    this.faceNo++;
    if (this.faceNo > this.maxFaceNo) {
      this.faceNo = this.startFaceNo;
    }
  }

  filename(): string {
    return this.prefix + this.faceNo;
  }
}
