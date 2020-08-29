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

  Cells(row: number, col: number){
    const islem : number[] = [-1,1];
    const arr : any[][] = [];
    for (let i = 0; i < 2; i++) {
      arr.push([row,col + islem[i]*horizontal]);
      arr.push([row - islem[i]*horizontal,col]);
      arr.push([row + islem[i]*cross,col + islem[i]*cross]);
      arr.push([row - islem[i]*cross,col + islem[i]*cross]);
    }
    return arr;
  }

  endControl(row: number, col: number,count : number,spaces: any[][]) {
    let flag : boolean = false;
    if (count == 1) {
      flag = true;
    }
    else {
      const arr : any[][] = this.Cells(row,col);
      for (let i = 0; i < arr.length; i++) {
        if (flag === true) {
          break;
        }
        else{
          if (this.fillControl(arr[i][0],arr[i][1],spaces)) {
            flag = true;
          }
        }
      }
    }
    return flag;
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
