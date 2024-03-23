// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {
    binary_to_hex,
    BinToDec,
    decimal_to_binary,
    normalize_decimal,
    normalize_binary,
    getSign,
    getMantissa,
    getExponent,
    convert,
    error_check,
    checkSpecial,
} from './script';

/* 2. Conversion Tester */
/* 2.1 Decimal to Binary */
test('decToBin function', () => {
    // Test whole number input
    expect(decimal_to_binary(10)).toBe("1010");
    // Test decimal input
    expect(decimal_to_binary(10.625)).toBe("1010");
    // Test input with zero
    expect(decimal_to_binary(0)).toBe("0");
    // Test negative input
    expect(decimal_to_binary(-10)).toBe("1010");
});

/* 2.2 Binary to Decimal */
test('BinToDec function', () => {
    // Test valid binary input
    expect(BinToDec("101010")).toBe(42);
});

/* 3. Sign Tester */
describe('getSign function', () => {
    test('should return 1 for negative sign', () => {
        const result = getSign("-101010");
        expect(result).toBe("1");
    });
    test('should return 0 for non-negative sign', () => {
        const result = getSign("101010");
        expect(result).toBe("0");
    });
});

/* 4. Exponent Tester */
describe('getExponent function', () => {
    test('should return the correct exponent bits for positive exponent', () => {
        const result = getExponent("5"); // Example positive exponent
        expect(result).toBe('10000100'); // Expected result for 5
    });
    test('should return the correct exponent bits for negative exponent', () => {
        const result = getExponent("-5"); // Example negative exponent
        expect(result).toBe('01111010'); // Expected result for -5
    });
    test('should return the correct exponent bits for zero exponent', () => {
        const result = getExponent("0"); // Example zero exponent
        expect(result).toBe('01111111'); 
    });
});

/* 5. Mantissa Tester */
describe('getMantissa function', () => {
    test('should return the correct mantissa bits for positive input', () => {
      const result = getMantissa("0.75"); // Example input
      expect(result).toBe('11000000000000000000000'); // Expected result for the input
    });
  
    test('should return the correct mantissa bits for negative input', () => {
      const result = getMantissa("-0.625"); // Example input
      expect(result).toBe('10100000000000000000000'); // Expected result for the input
    });
});

/* 6. Normalize Decimal Tester */
describe('normalize_decimal function', () => {
    test('should return the normalized binary', () => {
        const result = normalize_decimal("101010", "101", 2);
        expect(result).toEqual(["101010.101", 2]);
    });
});

/* 7. Normalize Binary Tester */
describe('normalize_binary function', () => {
    test('should return the normalized binary', () => {
        const result = normalize_binary("101010", "101", 2);
        expect(result).toEqual(["101010.101", 2]);
    });
});

/* 8. Binary to Hex Converter Tester */
describe('binary_to_hex function', () => {
    test('should correctly convert binary to hex', () => {
      const binaryInput = '01000010000111000000000000000000'; // Example binary input
      const expectedResult = '421C0000'; // Expected result for the input
      const result = binary_to_hex(binaryInput);
      expect(result).toBe(expectedResult);
    });

    test('should correctly convert binary to hex', () => {
        const binaryInput = '10111101000111000000000000000000'; // Example binary input
        const expectedResult = 'BD1C0000'; // Expected result for the input
        const result = binary_to_hex(binaryInput);
        expect(result).toBe(expectedResult);
    })

    test('should correctly convert binary to hex', () => {
        const binaryInput = '11000101000111000000000000000000'; // Example binary input
        const expectedResult = 'C51C0000'; // Expected result for the input
        const result = binary_to_hex(binaryInput);
        expect(result).toBe(expectedResult);
    });
});

/* 9. Error Check Tester */
describe('error_check function', () => {
    test('should return true for valid input', () => {
        const result = error_check();
        expect(result).toBe(true);
    });
});

/* 10. Special Check Tester */
describe('checkSpecial function', () => {
    test('should return false for non-special case', () => {
        const result = checkSpecial("0", 5, "101010", "101", 0);
        expect(result).toBe(false);
    });
});

/* 11. Conversion Tester */
describe('convert function', () => {
    test('should correctly convert input', () => {
        
    });
});
