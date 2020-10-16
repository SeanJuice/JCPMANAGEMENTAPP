export class FileUpload {

    key: string;
    name: string;
    url: string;
    file: File;
    userId:string;
  
    constructor(file: File) {
        this.file = file;
    }
  }
  