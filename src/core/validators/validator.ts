import { validate } from 'class-validator';

export class Validator {
  static async use(obj: any) {
    const errors = await validate(obj);

    if (errors.length > 0) {
      const messagesError = errors.map((error) => {
        const list = [];
        for (const el in error.constraints) {
          list.push(error.constraints[el]);
        }
        return list;
      });

      return messagesError.flat();
    } else {
      return null;
    }
  }
}
