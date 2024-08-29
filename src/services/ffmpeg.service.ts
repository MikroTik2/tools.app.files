import type { IVideoCompress } from '@/models/video-compress.model';
import type { IVideoInfo } from '@/models/video-info.model';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { FileTypeMap } from '@/data/constant';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { ref } from 'vue';

export const video = ref<string | null>(null);
export const isLoading = ref<boolean>(false);
export const progression = ref<number | null>(null);
export const videoInfo = ref<IVideoInfo>({
     name: '',
     size: 0,
     lastModified: 0,
     type: '',
     durationInSeconds: 0,
     videoCodec: '',
     audioCodec: '',
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

     public async compressionFile(file: File) {
          this.reset()
          isLoading.value = true;

          this.ffmpeg.on('progress', ({ progress }) => {
               progression.value = progress
          });

          await this.loadFFmpeg();
          await this.ffmpeg.writeFile(file.name, await fetchFile(file))

          await this.ffmpeg.exec([
               '-i', file.name, '-c:v', 'libx264', '-tag:v', 'avc1', '-movflags', 'faststart', '-crf', '30', '-preset', 'superfast', '-progress', '-', '-v', '', '-y', 'output.mp4'
          ]);

          const data = await this.readFile("output.mp4");

          videoCompress.value.size_original = file.size;
          videoCompress.value.name = file.name;
          videoCompress.value.size_compressed = data.length;

          const blob = await this.getFileBlob('.', 'output', 'mp4');
          videoCompress.value.video_blob = blob;

          const url = await this.getFileUrl('.', 'output', 'mp4');
          video.value = url;
          isLoading.value = false;
     };

     public async infoFile(file: File) {
          this.reset()
          isLoading.value = true;

          await this.loadFFmpeg();
          this.ffmpeg.on('log', ({ message: msg }) => {
               if (msg.includes('Duration:')) {
                    const duration = msg.split('Duration:')[1].split(',')[0].trim();
                    videoInfo.value.durationInSeconds = this.parseDuration(duration);
               };

               if (msg.includes('Stream #')) {
                    if (msg.includes('Video:')) {
                         videoInfo.value.videoCodec = msg.split('Video:')[1].split(' ')[1].split(',')[0];
                         videoInfo.value.dimensions = this.parseDimensions(msg);
                         videoInfo.value.fps = this.parseFPS(msg);
                         videoInfo.value.name = file.name;
                         videoInfo.value.size = file.size.toLocaleString();
                         videoInfo.value.lastModified = new Date(file.lastModified).toLocaleString('ru-RU', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                         });

                         videoInfo.value.type = file.type;
                    };
               
                    if (msg.includes('Audio:')) {
                         videoInfo.value.audioCodec = msg.split('Audio:')[1].split(' ')[1];
                    } else {
                         videoInfo.value.audioCodec = 'No Audio';
                    };
               };
          });

          await this.ffmpeg.writeFile(file.name, await fetchFile(file));
          await this.ffmpeg.exec([`-i`, file.name, `-hide_banner`, `-v`, `verbose`]);

          isLoading.value = false;
     };

     public async reset() {
          video.value = null;
          videoInfo.value = {
               name: '',
               size: 0,
               lastModified: 0,
               type: '',
               durationInSeconds: 0,
               videoCodec: '',
               audioCodec: '',
               dimensions: { width: 0, height: 0 },
               fps: 0,
          };
          videoCompress.value = {
               size_compressed: 0,
               size_original: 0,
               name: '',
               video_blob: '',
          };
          isLoading.value = false;
          progression.value = null;
     };

     public async readFile(file: string) {
          return this.ffmpeg.readFile(file);
     };

     public async getFileBuffer(file: string, name: string, format: string) {
          const localPath = `${file}/${name}.${format}`;
          return this.ffmpeg.readFile(localPath);
     };
  
     public async getFileBlob(file: string, name: string, format: string) {
          const fileBuffer = await this.getFileBuffer(file, name, format);
          return new Blob([fileBuffer], { type: FileTypeMap[format as keyof typeof FileTypeMap] });
     };
  
     public async getFileUrl(file: string, name: string, format: string) {
          const fileBlob = await this.getFileBlob(file, name, format);
          return window.URL.createObjectURL(fileBlob);
     };
  
     public async getFile(file: string, name: string, format: string) {
          const fileBuffer = await this.getFileBuffer(file, name, format);
          return new File([fileBuffer], `${name}.${format}`, { type: FileTypeMap[format as keyof typeof FileTypeMap] });
     };

     private async loadFFmpeg() {
          await this.ffmpeg.load({
               coreURL: await toBlobURL(`${this.baseURL}/ffmpeg-core.js`, 'text/javascript'),
               wasmURL: await toBlobURL(`${this.baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
               workerURL: await toBlobURL(
                   `${this.baseURL}/ffmpeg-core.worker.js`,
                   'text/javascript',
               ),
          });
     };

     private parseDuration(duration: string) {
          const [hours, minutes, seconds] = duration.split(':').map(parseFloat)
          return hours * 3600 + minutes * 60 + seconds
     };

     private parseDimensions(log: string) {
          const match = log.match(/(\d{2,4})x(\d{2,4})/);
      
          if (match) {
              const width = parseInt(match[1], 10);
              const height = parseInt(match[2], 10);
              return { width, height };
          };
      
          throw new Error('Dimensions not found in the log message');
     };

     private parseFPS(log: string) {
          const match = log.match(/(\d+)\s*fps/)
          return match ? parseInt(match[1], 10) : null
     };
};

export const ffmpegService = new FFmpegService();