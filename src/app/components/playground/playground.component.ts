import { Component, OnInit, HostListener } from '@angular/core';
import { GameService } from "../../services/game/game.service";
import { k } from "../../constants/game";

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

  finishBoxStyle:any;

  spaces: any[][];
  isFinished : boolean = true;
  constructor(
    private _game: GameService,
    ) { }

  ngOnInit(): void {
    this.spaces = this._game.createPlayGround();
    this.size = this.getSize();
    this.borderSize = this.size * 0.01;
    this.setStyle();
  }

  play(s, i, j) {
    if (s) {
      console.log('Bu alan dolu!');
    }
    else {

    }
  }

  restart(){
    this.spaces = this._game.createPlayGround();
  }

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
