import { Injectable } from '@angular/core';
import { PLAY_GROUND } from "@constants";
import { IAvailableCell } from "@models";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  availableNumbers: number[] = Array(PLAY_GROUND.SIZE).fill(0).map((_: number, i: number) => i);
  availableCells: IAvailableCell = {};

  constructor() {
    this.availableCells[0] = Array(100).fill(undefined).map((_: undefined, i: number) => [(i - i % 10) / 10, i % 10]);
  }

  createPlayGround(): any[][] {
    return Array(PLAY_GROUND.SIZE).fill(undefined).map(() => Array(PLAY_GROUND.SIZE).fill(undefined));
  }

  isNumberAvailable = (row: number, col: number, spaces: number[][]): boolean => {
    return [row, col].every((num: number) => this.availableNumbers.includes(num)) && !spaces[row][col];
  }

  generateAvailableCells = (count: number, row: number, col: number, spaces: number[][]) => {
    const nums: number[] = [-1, 1];
    const arr: number[][] = [];
    nums.forEach((num: number) => {
      this.isNumberAvailable(row, col + num * PLAY_GROUND.HORIZONTAL_VERTICAL, spaces) && arr.push([row, col + num * PLAY_GROUND.HORIZONTAL_VERTICAL]);
      this.isNumberAvailable(row + num * PLAY_GROUND.HORIZONTAL_VERTICAL, col, spaces) && arr.push([row + num * PLAY_GROUND.HORIZONTAL_VERTICAL, col]);
      this.isNumberAvailable(row + num * PLAY_GROUND.CROSS, col + num * PLAY_GROUND.CROSS, spaces) && arr.push([row + num * PLAY_GROUND.CROSS, col + num * PLAY_GROUND.CROSS]);
      this.isNumberAvailable(row - num * PLAY_GROUND.CROSS, col + num * PLAY_GROUND.CROSS, spaces) && arr.push([row - num * PLAY_GROUND.CROSS, col + num * PLAY_GROUND.CROSS]);
    });
    this.availableCells[count + 1] = arr;
  }
}
