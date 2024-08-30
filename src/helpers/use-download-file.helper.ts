export function useDownloadFile(href: string, name: string): void {
     const downloadElement = document.createElement('a');
     downloadElement.href = href;

     downloadElement.download = name;
     document.body.appendChild(downloadElement);
     downloadElement.click();
     document.body.removeChild(downloadElement);

     window.URL.revokeObjectURL(href);
     downloadElement.href = '';
}
