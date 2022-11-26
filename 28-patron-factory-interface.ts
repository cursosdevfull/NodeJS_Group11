interface IUpload {
  save(file: File): void;
}

abstract class AUpload {
  abstract save(file: File): void;
}

class FactoryUploadAWS implements IUpload {
  save(file: File): void {
    this.startProgress();
    setTimeout(() => this.endProgress(), 2000);
  }

  startProgress() {
    console.log("Uploading file to AWS");
  }

  endProgress() {
    console.log("file uploaded");
  }
}

class FactoryUploadAzure implements IUpload {
  save(file: File): void {
    this.progress();
  }

  progress() {
    console.log("file uploaded to Azure");
  }
}

class FactoryUploadGCP implements IUpload {
  save(file: File): void {
    this.progress();
  }

  progress() {
    console.log("file uploaded to GCP");
  }
}

const upload: IUpload = new FactoryUploadGCP();
upload.save(new File(["data"], "data.txt", { type: "text/plain" }));
