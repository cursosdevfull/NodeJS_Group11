import { sum } from './sum';

describe('Initial', () => {
  it('should be true', () => {
    // Preparación
    const a = true;
    const b = true;

    // Ejecución
    const result = a && b;

    // Verificación
    expect(result).toBe(true);
  });

  it('the sum of 1 and 2 should be 3', () => {
    const a = 1;
    const b = 2;

    const result = sum(a, b);

    expect(result).toBe(3);
  });
});
