import * as bcrypt from 'bcryptjs';

export class CipherService {
  static encrypt(text: string): Promise<string> {
    return bcrypt.hash(text, 10);
  }

  static compare(text: string, textHashed: string): Promise<boolean> {
    return bcrypt.compare(text, textHashed);
  }
}
