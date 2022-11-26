interface IUpload {
  save(file: File): void;
}

class Upload implements IUpload {
  save(file: File): void {
    this.progress(file);
    console.log("file uploaded");
  }

  private progress(file: File) {
    console.log("progress");
  }
}

const upload: IUpload = new Upload();
const file = new File(["data"], "data.txt", { type: "text/plain" });
upload.save(file);
