export const sum = (data: any[], key: string) => {
  return data.reduce((accumulator, chart) => accumulator + chart[key], 0);
};
