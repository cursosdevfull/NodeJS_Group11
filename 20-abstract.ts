abstract class Upload {
  abstract newFileName: string;

  constructor() {
    this.progress();
  }

  uploadFile(file: File) {
    console.log("New FileName", this.newFileName);
    this.saveFile(file);
  }

  abstract saveFile(file: File): void;

  progress(): void {
    console.log("progress upload");
  }

  startUpload() {
    console.log("start upload");
  }
}

class UploadAWS extends Upload {
  newFileName: string;

  saveFile(file: File) {
    console.log("File saved");
  }

  override progress() {
    super.progress();
    console.log("override progress");
  }

  constructor() {
    super();
    super.progress();
    this.newFileName = "newName.txt";
  }
}

const upload = new UploadAWS();
//const up = new Upload()
const file = new File(["data"], "data.txt", { type: "text/plaint" });

upload.uploadFile(file);
