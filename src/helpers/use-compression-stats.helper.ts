export function useCompressionStats(original: number, compression: number): number {
     const percentageReduction = ((original - compression) / original) * 100;
     return parseInt(percentageReduction.toFixed(2));
}
