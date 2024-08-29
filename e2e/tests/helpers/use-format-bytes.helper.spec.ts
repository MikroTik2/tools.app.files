import { test, expect } from '@playwright/test';
import { humanFileSize } from '../../../src/helpers/use-format-bytes';

test.describe('humanFileSize', () => {
  test('should convert bytes to human-readable format with default units', () => {
    expect(humanFileSize(1023)).toBe('1023 B');
    expect(humanFileSize(1024)).toBe('1.0 kB');
    expect(humanFileSize(1048576)).toBe('1.0 MB');
    expect(humanFileSize(1073741824)).toBe('1.0 GB');
  });

  test('should convert bytes to human-readable format with SI units', () => {
    expect(humanFileSize(1000, true)).toBe('1.0 kB');
    expect(humanFileSize(1000000, true)).toBe('1.0 MB');
    expect(humanFileSize(1000000000, true)).toBe('1.0 GB');
  });

  test('should handle edge cases', () => {
    expect(humanFileSize(0)).toBe('0 B');
    expect(humanFileSize(500, false, 0)).toBe('500 B');
    expect(humanFileSize(999999, true, 2)).toBe('1.00 MB');
  });
});
