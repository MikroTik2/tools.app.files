export function parseDuration(duration: string) {
     const [hours, minutes, seconds] = duration.split(':').map(parseFloat);
     return hours * 3600 + minutes * 60 + seconds;
};

export function parseDimensions(log: string) {
     const match = log.match(/(\d{2,4})x(\d{2,4})/);

     if (match) {
          const width = parseInt(match[1], 10);
          const height = parseInt(match[2], 10);
          return { width, height };
     };

     throw new Error('Dimensions not found in the log message');
};

export function parseFPS(log: string) {
     const match = log.match(/(\d+)\s*fps/);
     return match ? parseInt(match[1], 10) : null;
};