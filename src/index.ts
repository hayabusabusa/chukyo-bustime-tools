import { TimetableUseCase } from "./useCase";

async function main() {
  const timetableUseCase = new TimetableUseCase();
  await timetableUseCase.execute();
};

main();