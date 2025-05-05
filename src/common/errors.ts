class RequiredParameterError extends Error {
    constructor(msg: string) {
      super(`${msg}`)
  
      this.name = 'RequiredParameterError'
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, RequiredParameterError)
      }
    }
  }
  
  class UniqueConstraintError extends Error {
    statusCode: number
    constructor(msg: string, statusCode = 409) {
      super(msg)
  
      this.name = 'UniqueConstraintError'
      this.statusCode = statusCode
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, UniqueConstraintError)
      }
    }
  }
  
  class InvalidPropertyError extends Error {
    statusCode: number
    constructor(msg: string, statusCode = 400) {
      super(msg)
  
      this.name = 'InvalidPropertyError'
      this.statusCode = statusCode
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, InvalidPropertyError)
      }
    }
  }
  
  class UnauthorizedError extends Error {
    statusCode: number
    constructor(msg: string, statusCode = 401) {
      super(msg)
      this.name = 'UnauthorizedError'
      this.statusCode = statusCode
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, UnauthorizedError)
      }
    }
  }
  
  class DatabaseError extends Error {
    statusCode: number
    constructor(msg: string, statusCode = 503) {
      super(msg)
      this.name = 'MongoDBError'
      this.statusCode = statusCode
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, DatabaseError)
      }
    }
  }
  
  
  
  
  class BadRequestError extends Error {
    statusCode: number
    constructor(msg: string, statusCode = 400) {
      super(msg)
  
      this.name = 'BadRequestError'
      this.statusCode = statusCode
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, BadRequestError)
      }
    }
  }
  
  class AuthorizationError extends Error {
    statusCode: number
    constructor(msg: string, statusCode = 401) {
      super(msg)
  
      this.name = 'AuthorizationError'
      this.statusCode = statusCode
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, AuthorizationError)
      }
    }
  }
  
  class NotFoundError extends Error {
    statusCode: number
    constructor(msg: string, statusCode = 404) {
      super(msg)
  
      this.name = 'NotFoundError'
      this.statusCode = statusCode
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, NotFoundError)
      }
    }
  }
  
  export {
    RequiredParameterError,
    InvalidPropertyError,
    UniqueConstraintError,
    UnauthorizedError,
    DatabaseError,
    BadRequestError,
    AuthorizationError,
    NotFoundError,
  }
  