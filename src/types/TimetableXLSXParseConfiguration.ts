import { XLSXCoordinate } from "./XLSXCoordinate";

export interface TimetableXLSXParseConfiguration {
  isToStation: boolean;
  hourCoordinateX: string;
  minutesCoordinateX: string[];
  isKaizuCoordinates?: XLSXCoordinate[];
  startCoordinate?: XLSXCoordinate;
  endCoordinate: XLSXCoordinate;
}