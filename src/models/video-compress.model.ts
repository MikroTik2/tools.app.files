export interface IVideoCompress {
     size_compressed: number;
     size_original: number;
     name: string;
     video_blob: Blob | string;
};