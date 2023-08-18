import { CustomError } from "./custom.error";

export class DateFull extends CustomError {
  statusCode = 401;

  constructor() {
    super("Date full");
    Object.setPrototypeOf(this, DateFull.prototype);
  }
  serializeErrors() {
    return [{ message: "Given Dates unavailable " }];
  }
}
//
