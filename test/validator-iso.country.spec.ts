import { validateIsoCountry } from './examples/validator-iso-country';

describe('Validator ISO Country', () => {
  it('isoCountry should have 2 characters', () => {
    const isoCountry = 'PE';

    const valid = validateIsoCountry(isoCountry);

    expect(valid).toBe(true);
  });

  it('validation should back false if isoCountry is not include in the list', () => {
    const isoCountry = 'MX';

    const valid = validateIsoCountry(isoCountry);

    expect(valid).toBe(false);
  });

  it('US should be a valid isoCountry', () => {
    const isoCountry = 'US';

    const valid = validateIsoCountry(isoCountry);

    expect(valid).toBe(true);
  });
});
