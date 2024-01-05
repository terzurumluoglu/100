import { Component, OnInit, HostListener } from '@angular/core';
import { IAvailableCell, IFontSize, IGridItemStyle, IGridStyle } from "@models";
import { GameService, SoundService, StyleService } from "@services";

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  
  count: number;
  spaces: any[][];
  isFinished: boolean = false;

  gridStyle: IGridStyle;
  gridItemStyle: IGridItemStyle;
  itemStyle: IFontSize;
  scoreFont: IFontSize;
  restartFont: IFontSize;

  constructor(
    private gameService: GameService,
    private soundService: SoundService,
    private readonly styleService: StyleService,
  ) { }

  ngOnInit(): void {
    this.restart();
    this.setStyle();
  }

  restart() {
    this.isFinished = false;
    this.count = 0;
    this.spaces = this.gameService.createPlayGround();
  }

  play = (val: number, row: number, col: number) => {
    if (val) {
      this.soundService.wrong();
    } else {
      this.gameService.generateAvailableCells(this.count, row, col, this.spaces);
      const availableCells: IAvailableCell = this.gameService.availableCells;

      if (!!availableCells[this.count + 1].length) {
        if (availableCells[this.count].some(s => s[0] === row && s[1] === col)) {
          this.soundService.move();
          this.count++;
          this.spaces[row][col] = this.count;
        } else {
          this.soundService.wrong();
        }
      } else {
        this.count++
        this.spaces[row][col] = this.count;
        this.soundService.success();
        setTimeout(() => {
          this.isFinished = true;
        }, 1000);
      }
    }
  }

  setColor(val: any, row: any, col: any): string {
    return this.styleService.setColor(val, row, col, this.count);
  }

  // STYLE
  @HostListener('window:resize', ['$event'])
  onResize(_: any) {
    this.setStyle();
  }

  setStyle() {
    const { gridItemStyle, gridStyle, itemStyle, restartFont, scoreFont } = this.styleService.setStyle();
    this.gridItemStyle = gridItemStyle;
    this.gridStyle = gridStyle;
    this.itemStyle = itemStyle;
    this.restartFont = restartFont;
    this.scoreFont = scoreFont;
  }
}
