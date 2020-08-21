import { Component, OnInit, HostListener } from '@angular/core';
import { GameService } from "../../services/game/game.service";
import { SoundService } from "../../services/sound/sound.service";
import { k,horizontal,cross } from "../../constants/game";

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  size: number;
  borderSize: number;

  containerStyle: any;
  boxStyle: any;
  textStyle: any;

  spaces: any[][];
  goOnArray: any[];
  isFinished: boolean = false;

  count: number;
  constructor(
    private _game: GameService,
    private _sound: SoundService
  ) { }

  ngOnInit(): void {
    this.restart();
    this.goOnArray = localStorage.getItem('goOn') ? localStorage.getItem('goOn').split(':') : [];
    if (this.goOnArray.length != 0) {
      this.spaces = JSON.parse(this.goOnArray[1]);
      this.count = parseInt(this.goOnArray[0]);
    }
    this.size = this.getSize();
    this.borderSize = this.size * 0.01;
    this.setStyle();
  }
  
  restart() {
    this.isFinished = false;
    this.count = 0;
    this.spaces = this._game.createPlayGround();
  }

  play(val, row, col) {
    if (val) {
      this._sound.playWrong();
    }
    else {
      if (this.endControl(row, col)) {
        if (this.playControl(this.count, row, col)) {
          this._sound.playMove();

          this.count++
          this.spaces[row][col] = this.count;
          localStorage.setItem('goOn', this.count.toString() + ':' + JSON.stringify(this.spaces));
        }
        else {
          this._sound.playWrong();
        }
      }
      else {
        this.count++
        this.spaces[row][col] = this.count;
        this._sound.playSuccess();
        setTimeout(() => {
          localStorage.removeItem('goOn');
          this.isFinished = true;
        }, 1000);
      }
    }
  }

  setColor(val, row, col): string {
    return this._game.setColor(val,row,col,this.count,this.spaces);
  }

  playControl(count: number, row: number, col: number): boolean {
    return this._game.playControl(count,row,col,this.spaces);
  }

  fillControl(row: number, col: number): boolean {
    return this._game.fillControl(row,col,this.spaces);
  }

  endControl(row: number, col: number) {
    return this._game.endControl(row,col,this.count,this.spaces);
  }

  getIndex(key, arr: any[][]): any[] {
    return this._game.getIndex(key,arr);
  }

  // STYLE

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.size = this.getSize();
    this.borderSize = this.size * 0.01;
    this.setStyle();
  }

  getSize(): number {
    return window.innerWidth <= window.innerHeight ? window.innerWidth * k : window.innerHeight * k;
  }

  setStyle() {
    this.containerStyle = {
      'height': this.size + 'px',
      'width': this.size + 'px',
      'padding': this.borderSize + 'px',
      'border': this.borderSize + 'px solid #008db1'
    };
    this.boxStyle = {
      'height': (this.size - (this.borderSize * 4)) * 0.1 - this.borderSize + 'px',
      'width': (this.size - (this.borderSize * 4)) * 0.1 - this.borderSize + 'px',
      'margin': (this.borderSize * 0.5) + 'px',
      'line-height': this.borderSize * 8 + 'px',
      'cursor': 'pointer'
    };
    this.textStyle = {
      'font-size': this.borderSize * 6 + 'px'
    };
  }

}
