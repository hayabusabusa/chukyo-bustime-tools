import { TimetableFormatter } from "../formatter";
import { JSONOutput } from "../output";
import { TimetableXSLXParser } from "../parser";

/**
 * 時刻表の xlsx ファイルからデータを抜き出す UseCase.
 */
export class TimetableUseCase {
  /**
   * 時刻表の xlsx ファイルからデータを抜き出して JSON ファイルに出力する.
   */
  async execute() {
    const jsonOutput = new JSONOutput('./outputs');
    const parser = new TimetableXSLXParser(
      new TimetableFormatter(),
    );

    const diaAToCollege = parser.parseForEachDia({
      isToStation: false,
      hourCoordinateX: "A",
      minutesCoordinateX: "B",
      startCoordinate: {
        x: "A",
        y: 4,
      },
      endCoordinate: {
        x: "B",
        y: 30,
      },
    });

    await jsonOutput.output(diaAToCollege, "diaAToCollege");

    const diaAToStation = parser.parseForEachDia({
      isToStation: true,
      hourCoordinateX: "F",
      minutesCoordinateX: "G",
      startCoordinate: {
        x: "F",
        y: 4,
      },
      endCoordinate: {
        x: "G",
        y: 30,
      },
    });

    await jsonOutput.output(diaAToStation, "diaAToStation");

    const diaBToCollege = parser.parseForEachDia({
      isToStation: true,
      hourCoordinateX: "A",
      minutesCoordinateX: "B",
      startCoordinate: {
        x: "A",
        y: 34,
      },
      endCoordinate: {
        x: "B",
        y: 61,
      },
    });

    await jsonOutput.output(diaBToCollege, "diaBToCollege");

    const diaBToStation = parser.parseForEachDia({
      isToStation: true,
      hourCoordinateX: "F",
      minutesCoordinateX: "G",
      startCoordinate: {
        x: "F",
        y: 34,
      },
      endCoordinate: {
        x: "G",
        y: 61,
      },
    });

    await jsonOutput.output(diaBToStation, "diaBToStation");

    const diaCToCollege = parser.parseForEachDia({
      isToStation: true,
      hourCoordinateX: "A",
      minutesCoordinateX: "B",
      startCoordinate: {
        x: "A",
        y: 64,
      },
      endCoordinate: {
        x: "B",
        y: 87,
      },
    });

    await jsonOutput.output(diaCToCollege, "diaCToCollege");

    const diaCToStation = parser.parseForEachDia({
      isToStation: true,
      hourCoordinateX: "F",
      minutesCoordinateX: "G",
      startCoordinate: {
        x: "F",
        y: 64,
      },
      endCoordinate: {
        x: "G",
        y: 87,
      },
    });

    await jsonOutput.output(diaCToStation, "diaCToStation");

    const diaADashToCollege = parser.parseForEachDia({
      isToStation: true,
      hourCoordinateX: "A",
      minutesCoordinateX: "B",
      startCoordinate: {
        x: "A",
        y: 93,
      },
      endCoordinate: {
        x: "B",
        y: 120,
      },
    });

    await jsonOutput.output(diaADashToCollege, "diaADashToCollege");

    const diaADashToStation = parser.parseForEachDia({
      isToStation: true,
      hourCoordinateX: "F",
      minutesCoordinateX: "G",
      startCoordinate: {
        x: "F",
        y: 93,
      },
      endCoordinate: {
        x: "G",
        y: 120,
      },
    });

    await jsonOutput.output(diaADashToStation, "diaADashToStation");

    const diaSpecialToCollege = parser.parseForEachDia({
      isToStation: true,
      hourCoordinateX: "A",
      minutesCoordinateX: "B",
      startCoordinate: {
        x: "A",
        y: 124,
      },
      endCoordinate: {
        x: "B",
        y: 151,
      },
    });

    await jsonOutput.output(diaSpecialToCollege, "diaSpecialToCollege");

    const diaSpecialToStation = parser.parseForEachDia({
      isToStation: true,
      hourCoordinateX: "F",
      minutesCoordinateX: "G",
      startCoordinate: {
        x: "F",
        y: 124,
      },
      endCoordinate: {
        x: "G",
        y: 151,
      },
    });

    await jsonOutput.output(diaSpecialToStation, "diaSpecialToStation");
  }
}