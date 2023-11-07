export class SocketError {
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  static badRequest(errors = []) {
    return new SocketError("Bad Request");
  }
  static unAuth() {
    return new SocketError("Unauthorized");
  }
  static noPermission() {
    return new SocketError("Forbidden");
  }
}


