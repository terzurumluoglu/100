import { Component, OnInit, HostListener } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
    this.spaces = this.createPlayGround();
    this.size = this.getSize();
    this.borderSize = this.size * 0.01;
    this.setStyle();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.size = this.getSize();
    this.borderSize = this.size * 0.01;
    this.setStyle();
  }

  getSize(): number {
    const k: number = 0.75;
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
    }
  }

  createPlayGround() {
    let a: any[][] = new Array(10);
    for (let i = 0; i < 10; i++) {
      a[i] = new Array(10);
    }
    return a;
  }

}
