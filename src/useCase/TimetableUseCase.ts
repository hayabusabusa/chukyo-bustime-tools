import { TimetableFormatter } from "../formatter";
import { JSONOutput } from "../output";
import { TimetableXSLXParser, TimetableReturnXSLXParser } from "../parser";

/**
 * 時刻表の xlsx ファイルからデータを抜き出す UseCase.
 */
export class TimetableUseCase {
  /**
   * 時刻表の xlsx ファイルからデータを抜き出して JSON ファイルに出力する.
   */
  async execute() {
    const jsonOutput = new JSONOutput('./outputs');
    const formatter = new TimetableFormatter();
    const parser = new TimetableXSLXParser(formatter);
    const returnParser = new TimetableReturnXSLXParser(formatter);

    const diaAToCollege = parser.parseForEachDia({
      isToStation: false,
      hourCoordinateX: "A",
      minutesCoordinateX: [
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L"
      ],
      startCoordinate: {
        x: "A",
        y: 4,
      },
      endCoordinate: {
        x: "L",
        y: 30,
      },
    });

    await jsonOutput.output(diaAToCollege, "diaAToCollege");

    const diaAToStation = parser.parseForEachDia({
      isToStation: true,
      hourCoordinateX: "U",
      minutesCoordinateX: [
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "AA",
        "AB",
        "AC",
        "AD"
      ],
      isKaizuCoordinates: [
        {
          x: "V",
          y: 21
        },
        {
          x: "W",
          y: 21
        },
        {
          x: "X",
          y: 21
        },
        {
          x: "Y",
          y: 21
        },
        {
          x: "Z",
          y: 21
        },
        {
          x: "AA",
          y: 21
        },
        {
          x: "V",
          y: 23
        },
        {
          x: "W",
          y: 23
        },
        {
          x: "X",
          y: 23
        },
        {
          x: "Y",
          y: 23
        },
        {
          x: "Z",
          y: 23
        },
         {
          x: "AA",
          y: 23
        },
        {
          x: "V",
          y: 25
        },
        {
          x: "W",
          y: 25
        },
        {
          x: "X",
          y: 25
        },
        {
          x: "Y",
          y: 25
        },
        {
          x: "V",
          y: 27
        },
        {
          x: "W",
          y: 27
        },
        {
          x: "X",
          y: 27
        },
        {
          x: "V",
          y: 29
        },
        {
          x: "W",
          y: 29
        },
        {
          x: "X",
          y: 29
        },
      ],
      startCoordinate: {
        x: "U",
        y: 4,
      },
      endCoordinate: {
        x: "AD",
        y: 30,
      },
    });

    await jsonOutput.output(diaAToStation, "diaAToStation");

    const diaAToStationReturn = returnParser.parseForEachDiaOnlyReturn({
      startCoordinate: {
        x: "A",
        y: 4,
      },
      endCoordinate: {
        x: "L",
        y: 7,
      },
      collegeHourCoordinateX: "A",
      collegeMinutesCoordinateX: [
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L"
      ],
      dropLast: 8,
    })

    await jsonOutput.output(diaAToStationReturn, "diaAToStationReturn");

    const diaBToCollege = parser.parseForEachDia({
      isToStation: false,
      hourCoordinateX: "A",
      minutesCoordinateX: [
        "B",
        "C",
        "D",
        "E",
        "F",
      ],
      startCoordinate: {
        x: "A",
        y: 34,
      },
      endCoordinate: {
        x: "F",
        y: 61,
      },
    });

    await jsonOutput.output(diaBToCollege, "diaBToCollege");

    const diaBToStation = parser.parseForEachDia({
      isToStation: true,
      hourCoordinateX: "U",
      minutesCoordinateX: [
        "V",
        "W",
        "X",
        "Y",
      ],
      isKaizuCoordinates: [
        {
          x: "V",
          y: 51
        },
        {
          x: "W",
          y: 51
        },
        {
          x: "X",
          y: 51
        },
        {
          x: "Y",
          y: 51
        },
        {
          x: "V",
          y: 53
        },
        {
          x: "W",
          y: 53
        },
        {
          x: "X",
          y: 53
        },
        {
          x: "Y",
          y: 53
        },
        {
          x: "V",
          y: 55
        },
        {
          x: "W",
          y: 55
        },
        {
          x: "X",
          y: 55
        },
        {
          x: "Y",
          y: 55
        },
        {
          x: "V",
          y: 57
        },
        {
          x: "W",
          y: 57
        },
        {
          x: "V",
          y: 59
        },
        {
          x: "W",
          y: 59
        },
      ],
      startCoordinate: {
        x: "U",
        y: 34,
      },
      endCoordinate: {
        x: "Z",
        y: 61,
      },
    });

    await jsonOutput.output(diaBToStation, "diaBToStation");

    const diaCToCollege = parser.parseForEachDia({
      isToStation: false,
      hourCoordinateX: "A",
      minutesCoordinateX: [
        "B",
        "C",
        "D",
        "E",
        "F",
      ],
      startCoordinate: {
        x: "A",
        y: 64,
      },
      endCoordinate: {
        x: "F",
        y: 87,
      },
    });

    await jsonOutput.output(diaCToCollege, "diaCToCollege");

    const diaCToStation = parser.parseForEachDia({
      isToStation: true,
      hourCoordinateX: "U",
      minutesCoordinateX: [
        "V",
        "W",
        "X",
        "Y",
      ],
      isKaizuCoordinates: [
        {
          x: "V",
          y: 81
        },
        {
          x: "W",
          y: 81
        },
        {
          x: "X",
          y: 81
        },
        {
          x: "V",
          y: 83
        },
        {
          x: "W",
          y: 83
        },
        {
          x: "X",
          y: 83
        },
        {
          x: "V",
          y: 85
        },
        {
          x: "W",
          y: 85
        },
      ],
      startCoordinate: {
        x: "U",
        y: 64,
      },
      endCoordinate: {
        x: "Y",
        y: 87,
      },
    });

    await jsonOutput.output(diaCToStation, "diaCToStation");

    const diaADashToCollege = parser.parseForEachDia({
      isToStation: false,
      hourCoordinateX: "A",
      minutesCoordinateX: [
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
      ],
      startCoordinate: {
        x: "A",
        y: 93,
      },
      endCoordinate: {
        x: "K",
        y: 120,
      },
    });

    await jsonOutput.output(diaADashToCollege, "diaADashToCollege");

    const diaADashToStation = parser.parseForEachDia({
      isToStation: true,
      hourCoordinateX: "U",
      minutesCoordinateX: [
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "AA",
        "AB",
        "AC",
        "AD"
      ],
      isKaizuCoordinates: [
        {
          x: "V",
          y: 110
        },
        {
          x: "W",
          y: 110
        },
        {
          x: "X",
          y: 110
        },
        {
          x: "Y",
          y: 110
        },
        {
          x: "Z",
          y: 110
        },
        {
          x: "AA",
          y: 110
        },
        {
          x: "V",
          y: 112
        },
        {
          x: "W",
          y: 112
        },
        {
          x: "X",
          y: 112
        },
        {
          x: "Y",
          y: 112
        },
        {
          x: "Z",
          y: 112
        },
        {
          x: "AA",
          y: 112
        },
        {
          x: "V",
          y: 114
        },
        {
          x: "W",
          y: 114
        },
        {
          x: "X",
          y: 114
        },
        {
          x: "Y",
          y: 114
        },
        {
          x: "V",
          y: 116
        },
        {
          x: "W",
          y: 116
        },
        {
          x: "X",
          y: 116
        },
        {
          x: "V",
          y: 118
        },
        {
          x: "W",
          y: 118
        },
        {
          x: "X",
          y: 118
        },
      ],
      startCoordinate: {
        x: "U",
        y: 93,
      },
      endCoordinate: {
        x: "AD",
        y: 120,
      },
    });

    await jsonOutput.output(diaADashToStation, "diaADashToStation");

    const diaADashToStationReturn = returnParser.parseForEachDiaOnlyReturn({
      startCoordinate: {
        x: "A",
        y: 93,
      },
      endCoordinate: {
        x: "K",
        y: 96,
      },
      collegeHourCoordinateX: "A",
      collegeMinutesCoordinateX: [
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
      ],
      dropLast: 8,
    })

    await jsonOutput.output(diaADashToStationReturn, "diaADashToStationReturn");

    const diaSpecialToCollege = parser.parseForEachDia({
      isToStation: false,
      hourCoordinateX: "A",
      minutesCoordinateX: [
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
      ],
      startCoordinate: {
        x: "A",
        y: 124,
      },
      endCoordinate: {
        x: "L",
        y: 151,
      },
    });

    await jsonOutput.output(diaSpecialToCollege, "diaSpecialToCollege");

    const diaSpecialToStation = parser.parseForEachDia({
      isToStation: true,
      hourCoordinateX: "U",
      minutesCoordinateX: [
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "AA",
        "AB",
        "AC",
      ],
      isKaizuCoordinates: [
        {
          x: "V",
          y: 141
        },
        {
          x: "W",
          y: 141
        },
        {
          x: "X",
          y: 141
        },
        {
          x: "Y",
          y: 141
        },
        {
          x: "Z",
          y: 141
        },
        {
          x: "AA",
          y: 141
        },
        {
          x: "V",
          y: 143
        },
        {
          x: "W",
          y: 143
        },
        {
          x: "X",
          y: 143
        },
        {
          x: "V",
          y: 145
        },
        {
          x: "W",
          y: 145
        },
        {
          x: "X",
          y: 145
        },
        {
          x: "V",
          y: 147
        },
        {
          x: "W",
          y: 147
        },
        {
          x: "V",
          y: 149
        },
        {
          x: "W",
          y: 149
        },
      ],
      startCoordinate: {
        x: "U",
        y: 124,
      },
      endCoordinate: {
        x: "AC",
        y: 151,
      },
    });

    await jsonOutput.output(diaSpecialToStation, "diaSpecialToStation");
  }
}