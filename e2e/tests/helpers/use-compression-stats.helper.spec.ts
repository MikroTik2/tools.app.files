import { test, expect } from '@playwright/test';
import { useCompressionStats } from '../../../src/helpers/use-compression-stats.helper';

test.describe('useCompressionStats', () => {
     test('must calculate the percentage reduction correctly', () => {
          const original = 1000;
          const compression = 750;
          const result = useCompressionStats(original, compression);
          expect(result).toBe(25.00);
     });

     test('should correctly handle the case where the compressed size is equal to the original', () => {
          const original = 500;
          const compression = 500;
          const result = useCompressionStats(original, compression);
          expect(result).toBe(0.00);
     });

     test('should correctly handle the case where the compressed size is 0', () => {
          const original = 1000;
          const compression = 0;
          const result = useCompressionStats(original, compression);
          expect(result).toBe(100.00);
     });
});
