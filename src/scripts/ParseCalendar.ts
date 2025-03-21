import { 
    CalendarUseCase,
} from "../useCase";

async function main() {
    const calendarUseCase = new CalendarUseCase();
    await calendarUseCase.execute();
}

main();