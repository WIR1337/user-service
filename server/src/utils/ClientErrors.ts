export class ClientError {
  status: number;
  message: string;
  errors: [] | string[];

  constructor(status: number, message: string, errors = []) {
    this.status = status;
    this.message = message;
    this.errors = errors;
  }

  static badRequest(errors = []) {
    return new ClientError(400, "Bad Request", errors);
  }
  static unAuth() {
    return new ClientError(401, "Unauthorized");
  }
  static noPermission() {
    return new ClientError(403, "Forbidden");
  }
  static notFound() {
    return new ClientError(404, "Not Found");
  }
  static conflict() {
    return new ClientError(409, "Conflict");
  }
}
