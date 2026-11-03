export default class SalaError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'SalaError';
    this.status = status;
  }
}
