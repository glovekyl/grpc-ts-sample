abstract class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class DatabaseError extends BaseError {
  name = 'DatabaseError';
  constructor(err: Error, message?: string) {
    super(message ?? err.message);
  }
}

export class NotFoundError extends BaseError {
  name = 'NotFoundError';
  constructor(message: string) {
    super(message);
  }
}