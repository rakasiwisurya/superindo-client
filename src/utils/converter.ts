export const formatNumber = (value?: any) => {
  if (value) return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return value;
};

export const parseNumber = (value?: any) => {
  if (value) return value.replace(/,/g, "");
  return value;
};
