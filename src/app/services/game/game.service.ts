import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  createPlayGround() : any[][] {
    let playGround: any[][] = new Array(10);
    for (let i = 0; i < 10; i++) {
      playGround[i] = new Array(10);
    }
    return playGround;
  }
}
