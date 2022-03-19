import * as XLSX from "xlsx";

import { Calendar } from "./types";
import { formatteDate } from "./formatter";
import { CalendarParser } from "./calendarParser";

/**
 * 任意の月のデータを取り出す.
 * @param calendars カレンダーのデータ一覧.
 * @param year 取り出したいデータの年.
 * @param month 取り出したいデータの月.
 * @returns 一致するデータ一覧.
 */
function dataForMonthIn(calendars: Calendar[], year: number, month: number): Calendar[] {
  const prefix = year.toString() + "-" + month.toString().padStart(2, "0");
  return calendars.filter((e) => e.date.includes(prefix));
}

/**
 * 任意の日付のデータを取り出す.
 * @param calendars カレンダーのデータ一覧.
 * @param year 取り出したいデータの年.
 * @param month 取り出したいデータの月.
 * @param date 取り出したいデータの日にち.
 * @returns 一致するデータ.
 */
function dataForDateIn(calendars: Calendar[], year: number, month: number, date: number): Calendar | undefined {
  const d = formatteDate(year, month, date);
  return calendars.find((e) => e.date === d)
}

test("カレンダーの xlsx ファイルをパースできること", () => {
  const book = XLSX.readFile("resource/calendar.xlsx");
  const sheet = book.Sheets[book.SheetNames[0]];

  const parser = new CalendarParser();
  const calendars = parser.parse(sheet);

  expect(dataForMonthIn(calendars, 2022, 4).length).toBe(30);
  expect(dataForMonthIn(calendars, 2022, 5).length).toBe(31);
  expect(dataForMonthIn(calendars, 2022, 6).length).toBe(30);
  expect(dataForMonthIn(calendars, 2022, 7).length).toBe(31);
  expect(dataForMonthIn(calendars, 2022, 8).length).toBe(31);
  expect(dataForMonthIn(calendars, 2022, 9).length).toBe(30);
  expect(dataForMonthIn(calendars, 2022, 10).length).toBe(31);
  expect(dataForMonthIn(calendars, 2022, 11).length).toBe(30);
  expect(dataForMonthIn(calendars, 2022, 12).length).toBe(31);
  expect(dataForMonthIn(calendars, 2023, 1).length).toBe(31);
  expect(dataForMonthIn(calendars, 2023, 2).length).toBe(28);
  expect(dataForMonthIn(calendars, 2023, 3).length).toBe(31);

  expect(calendars.filter((e) => e.diagram === "a'").length).toBe(3);
  expect(dataForDateIn(calendars, 2022, 5, 5)?.diagram).toBe("a'");
  expect(dataForDateIn(calendars, 2022, 10, 10)?.diagram).toBe("a'");
  expect(dataForDateIn(calendars, 2022, 11, 23)?.diagram).toBe("a'");

  expect(dataForDateIn(calendars, 2022, 6, 4)?.diagram).toBe("special");
  expect(dataForDateIn(calendars, 2022, 7, 24)?.diagram).toBe("special");
  expect(dataForDateIn(calendars, 2022, 7, 28)?.diagram).toBe("special");
  expect(dataForDateIn(calendars, 2022, 7, 29)?.diagram).toBe("special");
  expect(dataForDateIn(calendars, 2022, 8, 1)?.diagram).toBe("special");
  expect(dataForDateIn(calendars, 2022, 8, 2)?.diagram).toBe("special");
  expect(dataForDateIn(calendars, 2022, 8, 3)?.diagram).toBe("special");
  expect(dataForDateIn(calendars, 2022, 11, 4)?.diagram).toBe("special");
  expect(dataForDateIn(calendars, 2022, 11, 5)?.diagram).toBe("special");
  expect(dataForDateIn(calendars, 2022, 11, 6)?.diagram).toBe("special");
  expect(dataForDateIn(calendars, 2023, 1, 25)?.diagram).toBe("special");
  expect(dataForDateIn(calendars, 2023, 1, 26)?.diagram).toBe("special");
  expect(dataForDateIn(calendars, 2023, 1, 27)?.diagram).toBe("special");
  expect(dataForDateIn(calendars, 2023, 1, 30)?.diagram).toBe("special");
  expect(dataForDateIn(calendars, 2023, 1, 31)?.diagram).toBe("special");

  expect(dataForDateIn(calendars, 2022, 4, 29)?.diagram).toBe("suspension");
  expect(dataForDateIn(calendars, 2022, 5, 3)?.diagram).toBe("suspension");
  expect(dataForDateIn(calendars, 2022, 5, 4)?.diagram).toBe("suspension");
  expect(dataForDateIn(calendars, 2022, 7, 18)?.diagram).toBe("suspension");
  expect(dataForDateIn(calendars, 2022, 8, 11)?.diagram).toBe("suspension");
  expect(dataForDateIn(calendars, 2022, 9, 19)?.diagram).toBe("suspension");
  expect(dataForDateIn(calendars, 2022, 11, 3)?.diagram).toBe("suspension");
  expect(dataForDateIn(calendars, 2023, 1, 1)?.diagram).toBe("suspension");
  expect(dataForDateIn(calendars, 2023, 1, 2)?.diagram).toBe("suspension");
  expect(dataForDateIn(calendars, 2023, 1, 9)?.diagram).toBe("suspension");
  expect(dataForDateIn(calendars, 2023, 2, 11)?.diagram).toBe("suspension");
  expect(dataForDateIn(calendars, 2023, 2, 23)?.diagram).toBe("suspension");
  expect(dataForDateIn(calendars, 2023, 3, 21)?.diagram).toBe("suspension");
})