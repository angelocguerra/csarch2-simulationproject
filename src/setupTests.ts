// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// convert.test.ts
import { decToBin, checkBinary, checkDecimal, normalize, convert2binary, getSignBit, getExponentBits, getMantissaBits, convertToHex } from './convert';

/* 1. Inputs Tester */
 /* 1.1  Binary Input  */
    test('checkBinary function', () => {
        // Test valid binary input
        expect(checkBinary('101010', 2)).toBe(true);
        // Test invalid binary input with non-binary characters
        expect(checkBinary('12345', 2)).toBe(false);
        // Test invalid binary input with non-binary characters and decimal point ((To Be Normalized))
        expect(checkBinary('10.101', 2)).toBe(true);
        // Test invalid binary input with characters outside the binary range
        expect(checkBinary('10102', 2)).toBe(false);
    });

 /* 1.2 Decimal Input */
    test('checkDecimal function', () => {
        // Test valid decimal input
        expect(checkDecimal('12345', 10)).toBe(true);
        // Test decimal input with a decimal point
        expect(checkDecimal('123.45', 10)).toBe(true);
        // Test invalid decimal input with characters other than digits and decimal point
        expect(checkDecimal('12A45', 10)).toBe(false);
        // Test invalid decimal input with wrong base
        expect(checkDecimal('12345', 2)).toBe(false);
    });

/* 2. Conversion Tester */
 /* 2.1 Decimal to Binary  */
    test('decToBin function', () => {
        // Test whole number input
        expect(decToBin(10)).toBe(1010);
        // Test decimal input
        expect(decToBin(10.625)).toBe(1010.101);
        // Test input with zero
        expect(decToBin(0)).toBe(0);
        // Test negative input
        expect(decToBin(-10)).toBe(-1010);
        // Test input with large decimal places
        expect(decToBin(0.1)).toBeCloseTo(0.000110011001100110011, 10);
    });

  /* 2.2 Binary to Decimal */
  test('convert2binary function', () => {
        // Test positive decimal entry and positive exponent
        expect(convert2binary(10, 10, 2)).toEqual([1010, 2, 0]);
        // Test positive decimal entry and negative exponent
        expect(convert2binary(10, 10, -2)).toEqual([0.1, 10, -2]);
        // Test negative decimal entry and positive exponent
        expect(convert2binary(-10, 10, 2)).toEqual([-1010, 2, 0]);
        // Test negative decimal entry and negative exponent
        expect(convert2binary(-10, 10, -2)).toEqual([-0.1, 10, -2]);
        // Test base 2 entry and positive exponent
        expect(convert2binary(10, 2, 2)).toEqual([10, 2, 2]);
        // Test base 2 entry and negative exponent
        expect(convert2binary(10, 2, -2)).toEqual([10, 2, -2]);
    });

/* 3. Sign Tester */
describe('getSignBit function', () => {
    test('should return 1 for negative sign', () => {
        const result = getSignBit('-');
        expect(result).toBe(1);
    });
    test('should return 0 for non-negative sign', () => {
        const result = getSignBit('+');
        expect(result).toBe(0);
    });
    test('should return 0 for non-sign characters', () => {
        const result = getSignBit('0');
        expect(result).toBe(0);
    });
});

/* 4. Exponent Tester */
describe('getExponentBits function', () => {
    test('should return the correct exponent bits for positive exponent', () => {
        const result = getExponentBits(5); // Example positive exponent
        expect(result).toBe('10000100'); // Expected result for 5
    });
    test('should return the correct exponent bits for negative exponent', () => {
        const result = getExponentBits(-5); // Example negative exponent
        expect(result).toBe('01111010'); // Expected result for -5
    });
    test('should return the correct exponent bits for zero exponent', () => {
        const result = getExponentBits(0); // Example zero exponent
        expect(result).toBe('01111111'); // Expected result for 0
    });/* 
    test('should return the correct exponent bits for exp >= 127', () => {
        const result = getExponentBits(127); // Example exponent >= 127
        expect(result).toBe('11111110'); // Expected result for exp >= 127
      });
    test('should return the correct exponent bits for exp < -128', () => {
        const result = getExponentBits(-130); // Example exponent < -128
        expect(result).toBe('00000000'); // Expected result for exp < -128
      }); */
});

/* 5. Mantissa Tester: */
describe('getMantissaBits function', () => {
    test('should return the correct mantissa bits for positive input', () => {
      const result = getMantissaBits(0.75); // Example input
      expect(result).toBe('11000000000000000000000'); // Expected result for the input
    });
  
    test('should return the correct mantissa bits for negative input', () => {
      const result = getMantissaBits(-0.625); // Example input
      expect(result).toBe('10100000000000000000000'); // Expected result for the input
    });
  });


/* 6. Binary to Hexadecimal Tester */
describe('convertToHex function', () => {
    test('should correctly convert binary to hex', () => {
      const binaryInput = '01000010000111000000000000000000'; // Example binary input
      const expectedResult = '421C0000'; // Expected result for the input
      const result = convertToHex(binaryInput);
      expect(result).toBe(expectedResult);
    });

    test('should correctly convert binary to hex', () => {
        const binaryInput = '10111101000111000000000000000000'; // Example binary input
        const expectedResult = 'BD1C0000'; // Expected result for the input
        const result = convertToHex(binaryInput);
        expect(result).toBe(expectedResult);
    })

    test('should correctly convert binary to hex', () => {
        const binaryInput = '11000101000111000000000000000000'; // Example binary input
        const expectedResult = 'C51C0000'; // Expected result for the input
        const result = convertToHex(binaryInput);
        expect(result).toBe(expectedResult);
    });
  });