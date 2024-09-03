export const currencyFormatter = (value) => {
  if (!value) return "Rp 0";
  const number = Number(value);
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};
