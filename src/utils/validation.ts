import { ZodType } from "zod";

export class Validation {

    static validation<T>(schema: ZodType, data: T): T {
      return schema.parse(data);
    }

}