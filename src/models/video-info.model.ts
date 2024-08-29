export interface IVideoInfo {
     name: string,
     size: number | string,
     lastModified: number | string,
     type: string,
     durationInSeconds: number,
     videoCodec: string,
     audioCodec: string,
     dimensions: { width: number, height: number },
     fps: number | null,
};