// this will validate the conference dates and return a "TechMeet 2024" status for events in December



export const useConferenceValidator = (date: string) => {
  const parsedDate = new Date(date);
  const isDecember = parsedDate.getMonth() === 11;
  if (isDecember) {
    return "TechMeet 2024";
  } else {
    return "";
  }
};
