export const dateFormatter = (value) => {
  if (!value) return;
  const date = new Date(value);
  return date.toLocaleDateString("en-GB"); //dd/mm/yyyy
};
