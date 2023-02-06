export const validateIsoCountry = (isoCountry: string) => {
  const isoCountries = ['PE', 'CO', 'CL', 'UY', 'AR', 'US', 'PA'];

  if (isoCountry.length !== 2) {
    return false;
  }

  if (!isoCountries.includes(isoCountry)) {
    return false;
  }

  return true;
};
