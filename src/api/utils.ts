export const formatFilters = (filters: any) => {
  const { challenge, unit, ...rest } = filters;
  let formatted: any = { ...rest };
  if (challenge) {
    formatted.challenge = challenge.id;
  }
  if (unit) {
    formatted.unit = unit.id;
  }
  return formatted;
};
