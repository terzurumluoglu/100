import { Injectable } from '@angular/core';
import { COLORS, PLAY_GROUND } from '@constants';
import { IFontSize, IGridItemStyle, IGridStyle, IStyle } from '@models';
import { GameService } from '@services';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor(
    private readonly gameService: GameService,
  ) { }

  getSize(): number {
    const { innerHeight, innerWidth } = window;
    const width: number = innerWidth <= innerHeight ? innerWidth : innerHeight;
    return width * PLAY_GROUND.RATIO;
  }

  setStyle(): IStyle {
    const size: number = this.getSize();

    const gridStyle: IGridStyle = {
      width: `${size}px`,
      padding: `${size * 0.02}px`,
      gap: `${size * 0.01}px`,
      "border-width": `${size * 0.01}px`,
    };

    const gridItemStyle: IGridItemStyle = {
      height: `${size}px`,
      gap: `${size * 0.01}px`,
    };

    const itemStyle: IFontSize = {
      "font-size": `${size * 0.06}px`,
    };

    const scoreFont: IFontSize = {
      "font-size": `${size * 0.5}px`,
    };

    const restartFont: IFontSize = {
      "font-size": `${size * 0.1}px`,
    };

    return { gridStyle, gridItemStyle, itemStyle, scoreFont, restartFont };
  }

  setColor(val: any, row: any, col: any, count: number): string {
    if (val) {
      if (val === count) {
        return COLORS.ACTIVE
      } else {
        return COLORS.AGED;
      }
    } else {
      if (this.gameService.availableCells[count].some(s => s[0] === row && s[1] === col)) {
        return COLORS.AVAILABLE;
      } else {
        return COLORS.UNAVAILABLE;
      }
    }
  }
}
