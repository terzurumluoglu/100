import { IGridItemStyle } from "./IGridItemStyle";
import { IGridStyle } from "./IGridStyle";
import { IFontSize } from "./IFontSize";

export interface IStyle {
    gridStyle: IGridStyle;
    gridItemStyle: IGridItemStyle;
    itemStyle: IFontSize;
    scoreFont: IFontSize;
    restartFont: IFontSize;
}
