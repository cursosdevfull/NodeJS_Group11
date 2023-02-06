import { err, ok, Result } from 'neverthrow';
import { validate as uuidValidate } from 'uuid';

import { IdInvalidException } from '../exceptions/domain.exception';

export type IdResult = Result<IdVO, IdInvalidException>;

export class IdVO {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): IdResult {
    if (!uuidValidate(value)) {
      return err(new IdInvalidException(value));
    }
    return ok(new IdVO(value));
  }

  getValue(): string {
    return this.value;
  }
}
