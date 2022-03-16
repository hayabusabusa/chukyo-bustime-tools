import * as XLSX from "xlsx";

import { CalendarParser } from "./parsers";

const main = () => {
  const book = XLSX.readFile("book.xlsx");
  const sheetName = book.SheetNames.at(0);
  
  if (sheetName == null) {
    console.log("Sheet name not found.");
    return;
  }

  const sheet = book.Sheets[sheetName];
  const parser = new CalendarParser();
  const calendars = parser.parse(sheet);

  console.log(calendars);
};

main();