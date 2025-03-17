import { CalendarFormatter } from "../formatter"
import { JSONOutput } from "../output";
import { CalendarXSLXParser } from "../parser";
import { calendarXLSXParseDefaultConfiguration } from "../types";

export class CalendarUseCase {
    async execute() {
        const jsonOutput = new JSONOutput('./outputs');
        const formatter = new CalendarFormatter();
        const parser = new CalendarXSLXParser(formatter);

        const calendars = parser.parseForCalendar(calendarXLSXParseDefaultConfiguration);

        await jsonOutput.output(calendars, 'calendars');
    }
}