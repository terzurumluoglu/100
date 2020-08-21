import { Injectable } from '@angular/core';
import { horizontal, cross } from 'src/app/constants/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  createPlayGround(): any[][] {
    let playGround: any[][] = new Array(10);
    for (let i = 0; i < 10; i++) {
      playGround[i] = new Array(10);
    }
    return playGround;
  }

  playControl(count: number, row: number, col: number,spaces : any[][]): boolean {
    count = count + 1;
    let dizi: number[] = this.getIndex(count - 1, spaces);
    if (count == 1) {
      return true;
    }
    else if ((dizi[0] == row && (dizi[1] + horizontal == col || dizi[1] - horizontal == col))) {
      return true;
    }
    else if ((dizi[1] == col && (dizi[0] + horizontal == row || dizi[0] - horizontal == row))) {
      return true;
    }
    else if (((dizi[0] - cross) == row && (dizi[1] - cross) == col) || ((dizi[0] - cross) == row && (dizi[1] + cross) == col) || ((dizi[0] + cross) == row && (dizi[1] + cross) == col) || ((dizi[0] + cross) == row && (dizi[1] - cross) == col)) {
      return true;
    }
    else {
      return false;
    }
  }

  fillControl(row: number, col: number, spaces: any[][]): boolean {
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      return false;
    }
    else {
      if (spaces[row][col] == null) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  setColor(val, row, col, count: number,spaces : any[][]): string {
    if (val != null) {
      if (val == count) {
        return '#1CB5C7';
      } else {
        return '#737C85';
      }
    }
    else if (this.playControl(count, row, col,spaces)) {
      return '#F95F53';
    } else {
      return '#17536F';
    }
  }

  endControl(row: number, col: number,count : number,spaces: any[][]) {
    if (count == 1) {
      return true;
    }
    else {
      if (this.fillControl(row, col + horizontal,spaces) || this.fillControl(row, col - horizontal,spaces) || this.fillControl(row - horizontal, col,spaces) || this.fillControl(row + horizontal, col,spaces) || this.fillControl(row - cross, col - cross,spaces) ||
        this.fillControl(row - cross, col + cross,spaces) || this.fillControl(row + cross, col - cross,spaces) || this.fillControl(row + cross, col + cross,spaces)) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  getIndex(key, arr: any[][]): any[] {
    for (let i: number = 0; i < arr.length; i++) {
      var index = arr[i].indexOf(key);
      if (index > -1) {
        return [i, index];
      }
    }
  }
}
