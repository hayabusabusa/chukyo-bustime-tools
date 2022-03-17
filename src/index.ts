import * as XLSX from "xlsx";

import { CalendarParser } from "./parsers";
import { outputJSON } from "./output";

const main = () => {
  const book = XLSX.readFile("resource/calendar.xlsx");
  const sheetName = book.SheetNames.at(0);
  
  if (sheetName == null) {
    console.log("Sheet name not found.");
    return;
  }

  const sheet = book.Sheets[sheetName];
  const parser = new CalendarParser();
  const calendars = parser.parse(sheet);

  outputJSON(calendars, "calendar");
};

main();