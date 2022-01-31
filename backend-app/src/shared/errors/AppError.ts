export class AppError {
  constructor(public message: string, public statusCode?: number) {
    this.message = message;
    this.statusCode = 400;
  }
}
