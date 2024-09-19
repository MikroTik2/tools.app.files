import { ref } from 'vue';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { FileTypeMap } from '@/data/constant';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { parseDimensions, parseDuration, parseFPS } from '@/helpers/command-parse.helper';

type TypeDimension = {
     width: number;
     height: number;
}

interface IVideoConvertToGif {
     size_original: number;
     gif_blob: string;
     name: string;
};

interface IVideoCompress {
     size_compressed: number;
     size_original: number;
     name: string;
     video_blob: any;
};

interface IVideoInfo {
     name: string;
     size: number;
     last_modified: number | string;
     type: string;
     duration_in_seconds: number;
     video_codec: string;
     audio_codec: string;
     fps: number | null;
     dimensions: TypeDimension;
};

export const loading = ref<boolean>(false);
export const progression = ref<number | null>(null);

export const videoConvertToGif = ref<IVideoConvertToGif>({
     size_original: 0,
     gif_blob: '',
     name: '',
});

export const videoInfo = ref<IVideoInfo>({
     name: '',
     size: 0,
     last_modified: 0,
     type: '',
     duration_in_seconds: 0,
     video_codec: '',
     audio_codec: '',
     dimensions: { width: 0, height: 0 },
     fps: 0,
});

export const videoCompress = ref<IVideoCompress>({
     size_compressed: 0,
     size_original: 0,
     name: '',
     video_blob: '',
});

export class FFmpegService {
     private baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm';
     private ffmpeg = new FFmpeg();

     public async optimizeFileSize(file: File) {
          this.reset();
          loading.value = true;

          try {
               this.ffmpeg.on('progress', ({ progress }) => {
                    progression.value = progress;
               });

               await this.loadFFmpeg();
               await this.ffmpeg.writeFile(file.name, await fetchFile(file));

               await this.ffmpeg.exec([
                    '-i',
                    file.name,
                    '-c:v',
                    'libx264',
                    '-tag:v',
                    'avc1',
                    '-movflags',
                    'faststart',
                    '-crf',
                    '30',
                    '-preset',
                    'superfast',
                    '-progress',
                    '-',
                    '-v',
                    '',
                    '-y',
                    'output.mp4',
               ]);

               const data = await this.readFile('output.mp4');

               videoCompress.value.size_original = file.size;
               videoCompress.value.name = file.name;
               videoCompress.value.size_compressed = data.length;
               videoCompress.value.video_blob = await this.getFileUrl('.', 'output', 'mp4');
          } catch (e) {
               throw e;
          } finally {
               loading.value = false;
          };
     };

     public async convertToGif(file: File) {
          this.reset();
          loading.value = true;

          try {
               this.ffmpeg.on('progress', ({ progress }) => {
                    progression.value = progress;
               });

               await this.loadFFmpeg();
               await this.ffmpeg.writeFile(file.name, await fetchFile(file));

               await this.ffmpeg.exec(['-i', file.name, 'output.gif']);

               const data = await this.readFile('output.gif');

               videoConvertToGif.value.size_original = data.length;
               videoConvertToGif.value.name = 'output.gif';
               videoConvertToGif.value.gif_blob = await this.getFileUrl('.', 'output', 'gif');
          } catch (e) {
               throw e;
          } finally {
               loading.value = false;
          };
     };

     public async getFileDetails(file: File) {
          this.reset();
          loading.value = true;

          try {
               await this.loadFFmpeg();
               this.ffmpeg.on('log', ({ message }) => {
                    this.extractFileInfo(message, file);
               });

               await this.ffmpeg.writeFile(file.name, await fetchFile(file));
               await this.ffmpeg.exec([`-i`, file.name, `-hide_banner`, `-v`, `verbose`]);
          } catch (e) {
               throw e;
          } finally {
               loading.value = false;
          }
     }

     public reset() {
          videoInfo.value = {
               name: '',
               size: 0,
               last_modified: 0,
               type: '',
               duration_in_seconds: 0,
               video_codec: '',
               audio_codec: '',
               dimensions: { width: 0, height: 0 },
               fps: 0,
          };

          videoConvertToGif.value = {
               size_original: 0,
               gif_blob: '',
               name: '',
          };

          videoCompress.value = {
               size_compressed: 0,
               size_original: 0,
               name: '',
               video_blob: '',
          };
          loading.value = false;
          progression.value = null;
     }

     public async readFile(file: string) {
          return this.ffmpeg.readFile(file);
     }

     public async getFileBuffer(file: string, name: string, format: string) {
          const localPath = `${file}/${name}.${format}`;
          return this.ffmpeg.readFile(localPath);
     }

     public async getFileBlob(file: string, name: string, format: string) {
          const fileBuffer = await this.getFileBuffer(file, name, format);
          return new Blob([fileBuffer], { type: FileTypeMap[format as keyof typeof FileTypeMap] });
     }

     public async getFileUrl(file: string, name: string, format: string) {
          const fileBlob = await this.getFileBlob(file, name, format);
          return window.URL.createObjectURL(fileBlob);
     }

     public async getFile(file: string, name: string, format: string) {
          const fileBuffer = await this.getFileBuffer(file, name, format);
          return new File([fileBuffer], `${name}.${format}`, {
               type: FileTypeMap[format as keyof typeof FileTypeMap],
          });
     }

     private async loadFFmpeg() {
          await this.ffmpeg.load({
               coreURL: await toBlobURL(`${this.baseURL}/ffmpeg-core.js`, 'text/javascript'),
               wasmURL: await toBlobURL(`${this.baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
               workerURL: await toBlobURL(
                    `${this.baseURL}/ffmpeg-core.worker.js`,
                    'text/javascript',
               ),
          });
     }

     private extractFileInfo(message: string, file: File) {
          if (message.includes('Duration:')) {
               videoInfo.value.duration_in_seconds = parseDuration(
                    message.split('Duration:')[1].split(',')[0].trim(),
               );
          }

          if (message.includes('Stream #')) {
               if (message.includes('Video:')) {
                    const videoCodec = message.split('Video:')[1].split(' ')[1].split(',')[0];
                    videoInfo.value.video_codec = videoCodec;
                    videoInfo.value.dimensions = parseDimensions(message);
                    videoInfo.value.fps = parseFPS(message);
                    videoInfo.value = {
                         ...videoInfo.value,
                         name: file.name,
                         size: file.size,
                         last_modified: new Date(file.lastModified).toLocaleString('ru-RU'),
                         type: file.type,
                    };
               }

               if (message.includes('Audio:')) {
                    videoInfo.value.audio_codec =
                         message.split('Audio:')[1].split(' ')[1] || 'No Audio';
               }
          }
     }
}

export const ffmpegService = new FFmpegService();
