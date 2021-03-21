/* eslint-disable @typescript-eslint/interface-name-prefix */
interface IErroResponse {
  [key: string]: string;
}

class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly errors: IErroResponse[];

  constructor(message: string, statusCode = 400, errors: IErroResponse[] = []) {
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export default AppError;
