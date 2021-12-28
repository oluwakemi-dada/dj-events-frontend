export const formatDateForInput = (date: string) => {
  const formatted = new Date(date).toISOString().slice(0, 10);
  return formatted;
};
