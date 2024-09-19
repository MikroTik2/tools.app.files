export function compressionPercentage(original: number, compressed: number): number {
     const percentageReduction = ((original - compressed) / original) * 100;
     return parseInt(percentageReduction.toFixed(2));
};