import { 
  CalendarUseCase,
  TimetableUseCase
} from "./useCase";

async function main() {
  const timetableUseCase = new TimetableUseCase();
  await timetableUseCase.execute();
  
  const calendarUseCase = new CalendarUseCase();
  await calendarUseCase.execute();
};

main();