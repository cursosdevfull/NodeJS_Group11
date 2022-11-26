class Upload {
  /* save(file: File): string {
        console.log("file saved")
        return "file saved"
    } */

  uploadFile(file: File) {
    //this.save(file)
    this.saveFile(file);
  }

  saveFile(file: File): void {
    console.log("saveFile");
  }

  progress(): void {
    console.log("progress upload");
  }
}

class UploadAWS extends Upload {
  override save(file: File): string {
    console.log("file uploaded");
    return "file uploaded";
  }
}

const upload = new UploadAWS();
const file = new File(["data"], "data.txt", { type: "text/plaint" });

upload.uploadFile(file);
