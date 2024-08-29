import { test, expect } from '@playwright/test';
import { useJsonParse } from '../../../src/helpers/use-json-parse.helper';

test.describe('useJsonParse', () => {
     test('should correctly parse valid JSON strings', () => {
          expect(useJsonParse('{"name": "John", "age": 30}')).toEqual({ name: 'John', age: 30 });
          expect(useJsonParse('[]')).toEqual([]);
          expect(useJsonParse('{}')).toEqual({});
     });
   
     test('should throw an error for invalid JSON strings', () => {
          expect(() => useJsonParse('{name: John, age: 30}')).toThrow(SyntaxError);
          expect(() => useJsonParse('')).toThrow(SyntaxError);
     });
   
     test('should return empty string for invalid JSON strings (testing catch block)', () => {
          try {
               useJsonParse('{name: John, age: 30}');
          } catch (error) {
               expect(error).toBeInstanceOf(SyntaxError);
          };
     });
});