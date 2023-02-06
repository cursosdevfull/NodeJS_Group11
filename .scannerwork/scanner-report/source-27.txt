import { S3Client } from '@aws-sdk/client-s3';
import { Request } from 'express';
import multer from 'multer';
import multer_s3 from 'multer-s3';
import yenv from 'yenv';

const env = yenv();

export class UploadBuilder {
  private _fieldName: string;
  private _maxSize: number;
  private _allowedMimeTypes: string[];
  private _destination: string;
  private _isPublic: boolean;

  get fieldName(): string {
    return this._fieldName;
  }

  addFieldName(value: string): UploadBuilder {
    this._fieldName = value;
    return this;
  }

  get maxSize(): number {
    return this._maxSize;
  }

  addMaxSize(value: number): UploadBuilder {
    this._maxSize = value;
    return this;
  }

  get allowedMimeTypes(): string[] {
    return this._allowedMimeTypes;
  }

  addAllowedMimeTypes(value: string[]): UploadBuilder {
    this._allowedMimeTypes = value;
    return this;
  }

  get destination(): string {
    return this._destination;
  }

  addDestination(value: string): UploadBuilder {
    this._destination = value;
    return this;
  }

  get isPublic(): boolean {
    return this._isPublic;
  }

  addIsPublic(value: boolean): UploadBuilder {
    this._isPublic = value;
    return this;
  }

  build(): UploadOptions {
    return new UploadOptions(this);
  }
}

export class UploadOptions {
  readonly fieldName: string;
  readonly maxSize: number;
  readonly allowedMimeTypes: string[];
  readonly destination: string;
  readonly isPublic: boolean;

  constructor(builder: UploadBuilder) {
    this.fieldName = builder.fieldName;
    this.maxSize = builder.maxSize;
    this.allowedMimeTypes = builder.allowedMimeTypes;
    this.destination = builder.destination;
    this.isPublic = builder.isPublic;
  }
}

export class Upload {
  static save(options: UploadOptions) {
    console.log('options', options);
    return multer({
      limits: { fileSize: options.maxSize },
      storage: multer_s3({
        s3: new S3Client({}),
        bucket: env.BUCKET,
        acl: options.isPublic ? 'public-read' : 'private',
        metadata(req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req: Request, file, cb) {
          const mimeType = file.mimetype;
          const isFileAllowed = options.allowedMimeTypes.includes(mimeType);

          if (!isFileAllowed) {
            return cb(new Error('File type not allowed'), null);
          }

          const partsFileName = file.originalname.split('.');
          const extension = partsFileName[partsFileName.length - 1];
          const fileName = `${options.destination}/${Date.now()}.${extension}`;
          req.body[options.fieldName] = fileName;
          cb(null, fileName);
        },
      }),
    }).single(options.fieldName);
  }
}
