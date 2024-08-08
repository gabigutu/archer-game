import { Square } from './../square';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  noCols: number;
  noRows: number;
  noTiles: number;
  tiles: Square[];
  noTilesShown: number;
  constructor() {
    this.noCols = 6;
    this.noRows = 4;
    this.noTiles = this.noCols * this.noRows;
    this.tiles = [];
    this.noTilesShown = 0;
  }

  private shuffle(a: Square, b: Square): number {
    // console.log('acum compar ' + a + ' cu ' + b);
    let rnd = Math.random(); // [0; 1)
    if (rnd < 0.5) return -1;
    else return 1;
  }

  hideAll(): void {
    for (let tile of this.tiles) {
      // hide tile
      tile.visible = false;
    }
  }

  areEqual(): void {
    let firstVisible = null;
    let secondVisible = null;
    for (let tile of this.tiles) {
      if (tile.visible) {
        if (firstVisible == null) {
          firstVisible = tile;
        } else {
          secondVisible = tile;
          if (firstVisible.value == secondVisible.value) {
            firstVisible.blocked = true;
            secondVisible.blocked = true;
          }
        }
      }
    }
  }

  clickedSomeCell(): void {
    console.log('s-a dat click pe o celula');
    this.noTilesShown++;
    if (this.noTilesShown >= 2) {
      this.areEqual();

      setTimeout(() => {
        this.hideAll();
      }, 2 * 1000);
    }
  }

  ngOnInit(): void {
    let noPairs = this.noTiles / 2;
    for (let i = 0; i < noPairs; i++) {
      // i = [0; 12)
      this.tiles[i * 2] = new Square(i + 1, false);
      this.tiles[i * 2 + 1] = new Square(i + 1, false);
    }
    // tiles = [1, 1, 2, 2, 3, 3, ..., 12, 12] (len = 24)
    console.log(this.tiles);
    this.tiles.sort(this.shuffle);
    // tiles = [5, 1, 3, 5, 7, 1, ... 12, 9] (len = 24)
    console.log(this.tiles);
  }
}
