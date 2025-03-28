import { XLSXCoordinate } from "./XLSXCoordinate";

export interface TimetableXLSXParseConfiguration {
  isToStation: boolean;
  hourCoordinateX: string;
  minutesCoordinateX: string;
  startCoordinate?: XLSXCoordinate;
  endCoordinate: XLSXCoordinate;
}